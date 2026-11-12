import * as ObsidianSdk from 'obsidian';
import { showTooltip } from '@codemirror/view';
import { containsLockedText } from './note-crypto.js';

const { Modal, Notice, Platform, editorInfoField } = ObsidianSdk;
const languages = {
	'zh-Hans': '简体中文', en: '英语', ja: '日语', ko: '韩语', fr: '法语',
	de: '德语', es: '西班牙语', ru: '俄语', pt: '葡萄牙语',
};
const selectionLimit = 1000;
const title = '翻译所选文字';
const dictionaryWord = /^[a-z]+(?:['’-][a-z]+)*$/i;

function selectionText(file, text) {
	return /\.md$/i.test(file?.path ?? '') && text?.trim() && !containsLockedText(text) ? text : '';
}

function button(container, label) {
	return container.createEl('button', { text: label, attr: { type: 'button' } });
}

function iconButton(container, label, icon, cls) {
	const control = container.createEl('button', { cls, attr: { type: 'button', 'aria-label': label, title: label } });
	if (ObsidianSdk.setIcon) ObsidianSdk.setIcon(control, icon);
	else control.setText(label);
	return control;
}

function addTranslationMascot(container) {
	container.createEl('span', { cls: 'smart-sync-translation-mascot', attr: { 'aria-hidden': 'true' } });
}

function errorMessage(error) {
	switch (error?.status) {
		case 401:
		case 403: return '请登录无界同步后重试。';
		case 404: return '当前服务暂未开放翻译。';
		case 429: return '翻译达到用量上限或服务繁忙，请稍后重试。';
		default: return '翻译失败，请检查网络或稍后重试。';
	}
}

function renderDictionary(output, entry, text) {
	output.empty();
	const card = output.createDiv({ cls: 'smart-sync-dictionary' });
	const hero = card.createDiv({ cls: 'smart-sync-dictionary-hero' });
	hero.createDiv({ cls: 'smart-sync-dictionary-kicker', text: '英汉词典' });
	hero.createEl('div', { cls: 'smart-sync-dictionary-word', text: entry.word || text.trim() });
	if (entry.uk || entry.us) {
		const phonetics = hero.createDiv({ cls: 'smart-sync-dictionary-phonetics' });
		if (entry.uk) phonetics.createEl('span', { text: '英 /' + entry.uk.replace(/^\/|\/$/g, '') + '/' });
		if (entry.us) phonetics.createEl('span', { text: '美 /' + entry.us.replace(/^\/|\/$/g, '') + '/' });
	}
	const groups = new Map();
	for (const { part, meaning } of entry.definitions) {
		const group = groups.get(part) ?? [];
		group.push(meaning);
		groups.set(part, group);
	}
	card.createDiv({ cls: 'smart-sync-dictionary-label', text: '释义' });
	const definitions = card.createEl('dl', { cls: 'smart-sync-dictionary-definitions' });
	for (const [part, meanings] of groups) {
		definitions.createEl('dt', { text: part || '释义' });
		definitions.createEl('dd', { text: meanings.join('；') });
	}
	if (entry.forms?.length) {
		card.createDiv({ cls: 'smart-sync-dictionary-label', text: '词形' });
		const forms = card.createDiv({ cls: 'smart-sync-dictionary-forms' });
		for (const { label, value } of entry.forms) forms.createEl('span', { text: label ? label + ' ' + value : value });
	}
	if (entry.examples?.length) {
		card.createDiv({ cls: 'smart-sync-dictionary-label', text: '例句' });
		const examples = card.createEl('ol', { cls: 'smart-sync-dictionary-examples' });
		for (const { source, translation } of entry.examples) {
			const example = examples.createEl('li', { text: source });
			if (translation) example.createDiv({ cls: 'smart-sync-dictionary-example-translation', text: translation });
		}
	}
}

function renderTranslation(container, text, request, close) {
	const doc = container.ownerDocument;
	const header = container.createDiv({ cls: 'smart-sync-translation-header' });
	addTranslationMascot(header);
	header.createDiv({ cls: 'smart-sync-translation-source', text, attr: { dir: 'auto' } });
	const dismiss = iconButton(header, '关闭翻译', 'x', 'smart-sync-translation-dismiss');
	const output = container.createDiv({
		cls: 'smart-sync-translation-output', attr: { role: 'status', 'aria-live': 'polite', dir: 'auto' },
	});
	const controls = container.createDiv({ cls: 'smart-sync-translation-controls' });
	const target = controls.createEl('select', { attr: { 'aria-label': '目标语言' } });
	for (const [code, label] of Object.entries(languages))
		target.createEl('option', { text: label, attr: { value: code } });
	const letters = text.match(/\p{L}/gu)?.length ?? 0;
	target.value = !/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(text) &&
		(text.match(/\p{Script=Han}/gu)?.length ?? 0) > letters / 2 ? 'en' : 'zh-Hans';
	const copy = button(controls, '复制译文');
	const retry = button(controls, '重试');
	let current, translation;
	const run = async () => {
		current?.abort();
		const controller = new AbortController();
		current = controller;
		translation = undefined;
		copy.hidden = true;
		retry.hidden = true;
		output.setText(target.value === 'zh-Hans' && dictionaryWord.test(text.trim()) ? '正在查询…' : '正在翻译…');
		try {
			const result = await request(text, target.value, controller.signal);
			if (controller.signal.aborted) return;
			if (result.dictionary) {
				renderDictionary(output, result.dictionary, text);
				return;
			}
			translation = result.translation;
			output.setText(translation);
			copy.hidden = false;
		} catch (error) {
			if (controller.signal.aborted) return;
			output.setText(errorMessage(error));
			retry.hidden = false;
		}
	};
	copy.addEventListener('click', async () => {
		if (!translation) return;
		const controller = current;
		try {
			await doc.defaultView.navigator.clipboard.writeText(translation);
			if (!controller.signal.aborted) new Notice('已复制译文。');
		} catch {
			if (!controller.signal.aborted) new Notice('无法访问剪贴板，可选中译文手动复制。');
		}
	});
	target.addEventListener('change', () => void run());
	retry.addEventListener('click', () => void run());
	dismiss.addEventListener('click', () => close(true));
	const onVisibility = () => { if (doc.hidden) close(); };
	doc.addEventListener('visibilitychange', onVisibility);
	void run();
	return () => {
		current?.abort();
		translation = undefined;
		doc.removeEventListener('visibilitychange', onVisibility);
		container.empty();
	};
}

function translationTooltip(open) {
	return showTooltip.compute(['selection', 'doc'], state => {
		const { main, ranges } = state.selection;
		if (ranges.length !== 1 || main.empty || main.to - main.from > selectionLimit) return null;
		const file = state.field(editorInfoField, false)?.file;
		const text = selectionText(file, state.sliceDoc(main.from, main.to));
		if (!text) return null;
		return {
			pos: main.head, above: true, clip: true, offset: { x: 4, y: 6 },
			create(view) {
				const doc = view.dom.ownerDocument;
				const dom = doc.win.createDiv();
				dom.addClass('smart-sync-translation-tooltip');
				const trigger = dom.createEl('button', { cls: 'smart-sync-translation-trigger', attr: {
					type: 'button', 'aria-label': title, title,
				} });
				addTranslationMascot(trigger);
				trigger.setAttribute('aria-expanded', 'false');
				let close;
				trigger.addEventListener('mousedown', event => event.preventDefault());
				trigger.addEventListener('click', () => { close = open(text, dom, trigger); });
				return { dom, destroy: () => close?.() };
			},
		};
	});
}

export function registerNoteTranslation(owner) {
	class TranslationModal extends Modal {
		constructor(app, text, request, onClose) {
			super(app);
			Object.assign(this, { text, request, afterClose: onClose });
		}
		onOpen() {
			this.setTitle('翻译');
			this.modalEl.addClass('smart-sync-translation-modal');
			if (Platform.isMobile) this.containerEl?.addClass('smart-sync-translation-sheet');
			this.cleanup = renderTranslation(this.contentEl, this.text, this.request, () => this.close());
		}
		onClose() {
			this.cleanup?.();
			this.cleanup = this.text = undefined;
			this.afterClose();
		}
	}
	const workspace = owner.app.workspace;
	const key = () => owner.secret('account') || owner.secret('access');
	let closeActive;
	const close = () => closeActive?.();
	const open = (text, anchor, trigger) => {
		if (!text || owner.stopped) return;
		if (text.length > selectionLimit) return new Notice('请选中不超过 1000 字符的文字。');
		const secret = key();
		if (!secret) return new Notice('请登录无界同步后使用翻译。');
		close();
		const { localId, settings: { origin, workspace: vault } } = owner.data;
		const current = () => !owner.stopped && owner.data.localId === localId &&
			owner.data.settings.origin === origin && owner.data.settings.workspace === vault && key() === secret;
		const request = async (text, target, signal) => {
			if (!current()) throw Object.assign(Error('Translation context changed'), { status: 401 });
			const api = owner.workspaceApi(origin, secret);
			api.signal = signal;
			const word = text.trim();
			const lookup = target === 'zh-Hans' && word.length <= 64 && dictionaryWord.test(word);
			const input = { text, target };
			let result;
			try {
				result = await api.request('POST', 'account/translate', lookup ? { ...input, dictionary: true } : input);
			} catch (error) {
				// Older translation servers require exactly two request fields.
				if (!lookup || error?.status !== 400 || signal.aborted || !current()) throw error;
				result = await api.request('POST', 'account/translate', input);
			}
			if (!current()) throw Object.assign(Error('Translation context changed'), { status: 401 });
			if (lookup && Array.isArray(result?.dictionary?.definitions) && result.dictionary.definitions.length)
				return { dictionary: result.dictionary };
			if (typeof result?.translation !== 'string' || !result.translation.trim() || result.translation.length > 12000)
				throw Error('Invalid translation response');
			return result;
		};
		if (!anchor) {
			const modal = new TranslationModal(owner.app, text, request, () => {
				if (closeActive === closeModal) closeActive = undefined;
			});
			const closeModal = () => modal.close();
			closeActive = closeModal;
			modal.open();
			return;
		}
		const panel = anchor.createDiv({ cls: 'smart-sync-translation-panel', attr: { role: 'group', 'aria-label': '划词翻译' } });
		const doc = anchor.ownerDocument;
		const focusPanel = doc.activeElement === trigger;
		trigger.hidden = true;
		trigger.setAttribute('aria-expanded', 'true');
		const outside = event => { if (!anchor.contains(event.target)) closePanel(); };
		const escape = event => { if (event.key === 'Escape') closePanel(anchor.contains(doc.activeElement)); };
		const closePanel = (restoreFocus = false) => {
			if (closeActive !== closePanel) return;
			closeActive = undefined;
			cleanup();
			panel.remove();
			trigger.hidden = false;
			trigger.setAttribute('aria-expanded', 'false');
			doc.removeEventListener('pointerdown', outside, true);
			doc.removeEventListener('keydown', escape, true);
			if (restoreFocus) trigger.focus();
		};
		const cleanup = renderTranslation(panel, text, request, closePanel);
		closeActive = closePanel;
		doc.addEventListener('pointerdown', outside, true);
		doc.addEventListener('keydown', escape, true);
		if (focusPanel) panel.querySelector('.smart-sync-translation-dismiss')?.focus();
		return closePanel;
	};
	owner.addCommand({
		id: 'translate-selection', name: title,
		editorCheckCallback(checking, editor, info) {
			const text = selectionText(info?.file, editor.getSelection());
			if (!text) return false;
			if (!checking) open(text);
			return true;
		},
	});
	if (workspace.on) {
		owner.registerEvent(workspace.on('editor-menu', (menu, editor, info) => {
			const text = selectionText(info?.file, editor.getSelection());
			if (text) menu.addItem(item => item.setTitle(title).setIcon('languages').onClick(() => open(text)));
		}));
		owner.registerEvent(workspace.on('file-open', close));
	}
	if (!Platform.isMobile && editorInfoField) owner.registerEditorExtension?.(translationTooltip(open));
	return {
		close,
		addMobileAction(toolbar, editor, file) {
			const trigger = button(toolbar, '翻译');
			trigger.addEventListener('pointerdown', event => event.preventDefault());
			trigger.addEventListener('click', () => open(selectionText(file, editor.getSelection())));
		},
	};
}
