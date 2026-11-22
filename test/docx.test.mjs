import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { writeFile } from 'node:fs/promises';
import test from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { strToU8, unzipSync, zipSync } from 'fflate';
import { JSDOM } from 'jsdom';
import { freshSalt, packNote, unlockWorkspace } from '../src/codec.js';
import { blankDocx, checkDocxRoundTrip, docxName, inspectDocx } from '../src/docx.js';
import { NotebookSynchronizer, emptyState } from '../src/synchronizer.js';

test('a new DOCX has a portable name, an empty body and no filename inserted into the body', () => {
	const { window } = new JSDOM();
	try {
		assert.equal(docxName(' 项目计划.DOCX '), '项目计划.docx');
		for (const name of ['', '../Escape', 'con', 'LPT1.txt', 'com¹', '.docx', 'name.', 'path\\name'])
			assert.equal(docxName(name), undefined, name);
		const parts = inspectDocx(blankDocx(), window.DOMParser);
		assert.equal(parts.readOnly, false);
		assert.equal(parts.xml.get('word/document.xml').documentElement.textContent, '');
	} finally { window.close(); }
});

test('DOCX validation protects embedded data and refuses remote drawing resources and password containers', () => {
	const { window } = new JSDOM();
	const inspect = bytes => inspectDocx(bytes.buffer, window.DOMParser);
	try {
		const files = unzipSync(new Uint8Array(blankDocx()));
		files['word/embeddings/sample.bin'] = Uint8Array.of(4, 2);
		const source = inspect(zipSync(files));
		checkDocxRoundTrip(source, source);
		files['word/embeddings/sample.bin'] = Uint8Array.of(4, 3);
		assert.throws(() => checkDocxRoundTrip(source, inspect(zipSync(files))), /preservation/u);
		files['word/_rels/document.xml.rels'] = strToU8('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" TargetMode="External" Target="https://example.com/image.png"/></Relationships>');
		assert.throws(() => inspect(zipSync(files)), /unsupported/u);
		assert.throws(() => inspect(Uint8Array.of(0xd0, 0xcf, 0x11, 0xe0)), /protected/u);
	} finally { window.close(); }
});

const sdk = `
export class TFolder { isRoot() { return this.path === ''; } }
export class TFile {}
export const Platform = { isMobile: false };
export class Notice { constructor(message) { throw new Error(message); } }
export class FuzzySuggestModal {}
export class Modal {
	constructor(app) { this.contentEl = app.document.createElement('div'); app.document.body.append(this.contentEl); }
	setTitle() {}
	open() { this.onOpen(); }
	close() { this.onClose(); }
}
export class EditableFileView {
	constructor(leaf) { this.contentEl = leaf.contentEl; }
	async onOpen() {}
	async onClose() {}
	registerEvent() {}
}
`;
const hook = registerHooks({ resolve(specifier, context, next) {
	return specifier === 'obsidian' ? { url: 'data:text/javascript,' + encodeURIComponent(sdk), shortCircuit: true } : next(specifier, context);
} });
const { TFile, TFolder } = await import('obsidian');
const { registerDocxEditor } = await import('../src/docx-view.js');
hook.deregister();

async function waitFor(check) {
	for (let attempt = 0; attempt < 100; attempt++) {
		const result = check();
		if (result) return result;
		await delay(20);
	}
	assert.fail('Timed out waiting for the editor');
}

test('folder menu creates and opens a DOCX, real editor writes changes and preserves externally updated bytes', async t => {
	const styles = registerHooks({ resolve(specifier, context, next) {
		return specifier.endsWith('.css') ? { url: 'data:text/javascript,export%20{}', shortCircuit: true } : next(specifier, context);
	} });
	t.after(() => styles.deregister());
	const { window } = new JSDOM('<!doctype html><body></body>', { pretendToBeVisual: true });
	const { document } = window;
	const canvas = { measureText: text => ({ width: text.length * 8 }) };
	window.HTMLCanvasElement.prototype.getContext = () => canvas;
	window.HTMLElement.prototype.scrollIntoView = () => {};
	window.Range.prototype.getClientRects = () => [];
	window.Range.prototype.getBoundingClientRect = () => new window.DOMRect();
	window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
	Object.defineProperty(document, 'fonts', { value: Object.assign(new window.EventTarget(), {
		check: () => true, load: async () => [], ready: Promise.resolve(),
	}) });
	const globals = { window, document, DOMParser: window.DOMParser, XMLSerializer: window.XMLSerializer,
		Event: window.Event, CustomEvent: window.CustomEvent, Node: window.Node, Element: window.Element,
		DocumentFragment: window.DocumentFragment, MouseEvent: window.MouseEvent, DOMRect: window.DOMRect,
		MutationObserver: window.MutationObserver, ResizeObserver: class { observe() {} disconnect() {} },
		requestAnimationFrame: window.requestAnimationFrame.bind(window), cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
		getComputedStyle: window.getComputedStyle.bind(window), navigator: window.navigator };
	for (const key of Object.getOwnPropertyNames(window).filter(key => /^(?:HTML|SVG).*Element$/u.test(key))) globals[key] = window[key];
	const previous = Object.fromEntries(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
	for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
	let view;
	t.after(() => {
		view?.clearEditor();
		window.close();
		for (const [key, descriptor] of Object.entries(previous)) {
			if (descriptor) Object.defineProperty(globalThis, key, descriptor);
			else delete globalThis[key];
		}
	});
	const element = window.HTMLElement.prototype;
	const make = function (tag, options = {}) {
		const node = document.createElement(tag);
		if (options.text) node.textContent = options.text;
		if (options.cls) node.className = options.cls;
		if (options.type) node.type = options.type;
		for (const [key, value] of Object.entries(options.attr ?? {})) node.setAttribute(key, value);
		this.append(node);
		return node;
	};
	element.createEl = make;
	element.createDiv = function (options) { return make.call(this, 'div', options); };
	element.createSpan = function (options) { return make.call(this, 'span', options); };
	element.setText = function (text) { this.textContent = text; };
	element.empty = function () { this.replaceChildren(); };

	let file, bytes, writes = 0, create;
	const events = new Map();
	const folder = Object.assign(new TFolder(), { path: 'Projects' });
	const leaf = {
		contentEl: document.body.appendChild(document.createElement('div')),
		async setViewState({ state }) {
			view.file = vault.getAbstractFileByPath(state.file);
			await view.onLoadFile(view.file);
		},
	};
	const vault = {
		getAbstractFileByPath: path => path === file?.path ? file : path === folder.path ? folder : null,
		createBinary: async (path, content) => {
			bytes = content;
			file = Object.assign(new TFile(), { path, basename: '项目计划', extension: 'docx', stat: { size: bytes.byteLength, mtime: 123 } });
			return file;
		},
		readBinary: async () => bytes.slice(0),
		modifyBinary: async (changed, content) => {
			assert.equal(changed, file);
			bytes = content;
			file.stat = { size: bytes.byteLength, mtime: 456 };
			writes++;
		},
	};
	const workspace = { getLeaf: () => leaf, getLeavesOfType: () => [], revealLeaf() {},
		on(name, listener) { events.set(name, listener); }, onLayoutReady: callback => callback() };
	const owner = {
		app: { document, workspace, vault }, register() {}, registerEvent() {}, addCommand() {},
		registerExtensions(extensions) { assert.deepEqual(extensions, ['docx']); },
		registerView(type, factory) { view = factory(leaf); },
	};
	registerDocxEditor(owner);
	events.get('file-menu')({ addItem: callback => callback({ setTitle() { return this; }, setIcon() { return this; }, onClick(action) { create = action; } }) }, folder);
	create();
	const form = document.querySelector('form');
	form.querySelector('input').value = '项目计划';
	form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
	const save = await waitFor(() => document.querySelector('.smart-sync-docx-controls button'));
	await waitFor(() => {
		assert.notEqual(view.status.textContent, '无法打开此 Word 文档。', leaf.contentEl.textContent.slice(0, 600));
		return view.session?.ready;
	});
	assert.equal(file.path, 'Projects/项目计划.docx');
	assert.equal(view.getDisplayText(), '项目计划');
	assert.equal(save.disabled, true);
	assert.equal(file.stat.mtime, 123);
	const blankFixture = bytes;

	const editor = document.querySelector('[contenteditable="true"]');
	assert.ok(editor);
	const current = editor.querySelector('p') ?? editor;
	current.textContent = 'Edited in Obsidian';
	await waitFor(() => !save.disabled);
	save.click();
	await waitFor(() => writes === 1 && save.disabled);
	const saved = inspectDocx(bytes, window.DOMParser);
	assert.match(saved.xml.get('word/document.xml').documentElement.textContent, /Edited in Obsidian/u);
	assert.equal(file.stat.mtime, 456);
	if (process.env.SMART_SYNC_DOCX_WORD_FIXTURE) {
		await writeFile(process.env.SMART_SYNC_DOCX_WORD_FIXTURE + '-blank.docx', new Uint8Array(blankFixture));
		await writeFile(process.env.SMART_SYNC_DOCX_WORD_FIXTURE + '-edited.docx', new Uint8Array(bytes));
	}

	const source = new Uint8Array(bytes);
	const scope = 'synthetic-word';
	const keys = await unlockWorkspace('isolated word fixture', freshSalt());
	const packet = await packNote(keys, scope, file.path, source, undefined, undefined, 'file', file.stat.mtime);
	const objects = new Map(packet.objects.map(object => [object.address, object.body]));
	let received;
	const sync = new NotebookSynchronizer({
		api: { workspace: scope, load: async id => objects.get(id), feed: async after => ({
			entries: after ? [] : [{ sequence: 1, note: packet.id, manifest: packet.manifest, removed: false }], more: false,
		}) },
		keys, state: emptyState(), direction: 'receive', attachmentLimit: source.byteLength + 1, save: async () => {},
		host: { list: async () => [], read: async () => null, write: async (...args) => { received = args; } },
	});
	await sync.run();
	assert.deepEqual(received.slice(0, 3), [file.path, source, 456]);

	(editor.querySelector('p') ?? editor).textContent = 'Unsaved local edit';
	await waitFor(() => !save.disabled);
	bytes = blankDocx();
	file.stat = { size: bytes.byteLength, mtime: 789 };
	save.click();
	await waitFor(() => document.querySelector('[aria-live="polite"]').textContent.includes('原文件'));
	assert.equal(writes, 1);
	assert.equal(file.stat.mtime, 789);
});
