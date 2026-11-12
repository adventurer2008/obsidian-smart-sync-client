import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { after, test } from 'node:test';
import { JSDOM, VirtualConsole } from 'jsdom';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM('<!doctype html><body></body>', { pretendToBeVisual: true, virtualConsole });
const { window } = dom;
const { document } = window;
for (const key of ['window', 'document', 'Window', 'Element', 'Document', 'MutationObserver', 'HTMLElement', 'Node', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
	const value = { window, document }[key] ?? window[key];
	Object.defineProperty(globalThis, key, { configurable: true, value: ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(key) ? value.bind(window) : value });
}
document.win = window;
window.Range.prototype.getClientRects = () => [];
window.Range.prototype.getBoundingClientRect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
window.HTMLElement.prototype.addClass = function (name) { this.classList.add(name); };
window.HTMLElement.prototype.empty = function () { this.replaceChildren(); };
window.HTMLElement.prototype.setText = function (text) { this.textContent = text; };
window.HTMLElement.prototype.createEl = function (tag, options = {}) {
	const element = document.createElement(tag);
	for (const [name, value] of Object.entries(options.attr ?? {})) element.setAttribute(name, value);
	if (options.text) element.textContent = options.text;
	if (options.cls) element.className = options.cls;
	return this.appendChild(element);
};
window.HTMLElement.prototype.createDiv = function (options) { return this.createEl('div', options); };
window.createDiv = () => document.createElement('div');
registerHooks({ resolve(specifier, context, next) {
	return specifier === 'obsidian' ? { url: new URL('./encryption-dom-sdk.mjs', import.meta.url).href, shortCircuit: true } : next(specifier, context);
} });
const { registerNoteTranslation } = await import('../src/translation.js');
const { Platform, Menu, editorInfoField, modals } = await import('./encryption-dom-sdk.mjs');
const file = { path: 'fixture.md', stat: { mtime: 1577836800123 } };
const tick = () => new Promise(resolve => setImmediate(resolve));
after(() => { window.close(); assert.deepEqual(errors, []); });

function ownerFixture() {
	const handlers = new Map(), requests = [];
	const owner = {
		app: { workspace: { on: (event, callback) => handlers.set(event, callback) } },
		data: { localId: 'fixture', settings: { origin: 'https://sync.example.invalid', workspace: 'fixture' } },
		secret: name => name === 'account' ? 'synthetic-key' : '',
		addCommand(command) { this.command = command; },
		registerEvent() {},
		registerEditorExtension(extension) { this.extension = extension; },
		workspaceApi(origin, key) {
			return { request(method, path, input) {
				return new Promise((resolve, reject) => requests.push({ origin, key, method, path, input, signal: this.signal, resolve, reject }));
			} };
		},
	};
	const actions = registerNoteTranslation(owner);
	return { owner, handlers, requests, dispose: actions.close, addMobileAction: actions.addMobileAction };
}

test('desktop selection waits for a click and renders only the translation as plain text', async () => {
	const { owner, requests, dispose } = ownerFixture();
	globalThis.encryptionEditorInfo = { file };
	const text = 'Prefix Translate this. Suffix';
	const view = new EditorView({ parent: document.body, state: EditorState.create({
		doc: text, extensions: [editorInfoField, owner.extension],
	}) });
	try {
		view.dispatch({ selection: { anchor: 7, head: 22 } });
		assert.equal(requests.length, 0);
		view.dom.querySelector('.smart-sync-translation-trigger').click();
		assert.deepEqual(requests[0].input, { text: 'Translate this.', target: 'zh-Hans' });
		assert.equal(requests[0].path, 'account/translate');
		requests[0].resolve({ translation: '<b>译文</b>' });
		await tick();
		const output = view.dom.querySelector('.smart-sync-translation-output');
		assert.equal(output.textContent, '<b>译文</b>');
		assert.equal(output.childElementCount, 0);
		let copied;
		Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: { writeText: async value => { copied = value; } } });
		[...view.dom.querySelectorAll('button')].find(button => button.textContent === '复制译文').click();
		await tick();
		assert.equal(copied, '<b>译文</b>');
		assert.equal(view.state.doc.toString(), text);
		assert.equal(file.stat.mtime, 1577836800123);
		view.dispatch({ selection: { anchor: 0 } });
		assert.equal(requests[0].signal.aborted, true);
		assert.equal(view.dom.querySelector('.smart-sync-translation-output'), null);
	} finally { dispose(); view.destroy(); }
});

test('mobile command/menu preserves the chosen text, supports explicit retry and closes on file change', async () => {
	Platform.isMobile = true;
	const { owner, handlers, requests, dispose, addMobileAction } = ownerFixture();
	try {
		assert.equal(owner.extension, undefined);
		let selection = '中文句子';
		const editor = { getSelection: () => selection };
		assert.equal(owner.command.editorCheckCallback(true, editor, { file }), true);
		assert.equal(requests.length, 0);
		const menu = new Menu();
		handlers.get('editor-menu')(menu, editor, { file });
		selection = '';
		menu.items[0].callback();
		assert.deepEqual(requests[0].input, { text: '中文句子', target: 'en' });
		const modal = modals.at(-1);
		requests[0].reject(new TypeError('Offline'));
		await tick();
		const retry = [...modal.contentEl.querySelectorAll('button')].find(button => button.textContent === '重试');
		assert.equal(retry.hidden, false);
		retry.click();
		assert.equal(requests.length, 2);
		handlers.get('file-open')();
		assert.equal(requests[1].signal.aborted, true);
		requests[1].resolve({ translation: 'late result' });
		await tick();
		assert.equal(modal.modalEl.isConnected, false);
		const toolbar = document.createElement('div');
		selection = 'toolbar text';
		addMobileAction(toolbar, editor, file);
		toolbar.querySelector('button').click();
		assert.deepEqual(requests[2].input, { text: selection, target: 'zh-Hans' });
		assert.equal(owner.command.editorCheckCallback(true, { getSelection: () => '⟦wujie-lock:v1:locked⟧' }, { file }), false);
	} finally { dispose(); Platform.isMobile = false; }
});
