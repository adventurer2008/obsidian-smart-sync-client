import * as Obsidian from 'obsidian';
import { DOCX_MAX_BYTES, blankDocx, checkDocxRoundTrip, docxName, inspectDocx, sameBytes } from './docx.js';
import { edition } from './edition.js';
import { locale, t } from './i18n.js';

const viewType = `${edition.id}-docx`;
const isDocx = file => file instanceof Obsidian.TFile && /\.docx$/iu.test(file.path);
const knownErrors = new Set(['large', 'protected', 'unsupported', 'preservation', 'conflict', 'busy', 'openFailed', 'saveFailed']);
const errorText = (error, fallback) => t(`docx.${knownErrors.has(error?.message) ? error.message : fallback}`);

export function registerDocxEditor(owner) {
	const { EditableFileView, FuzzySuggestModal, Modal, Notice, Platform, TFolder } = Obsidian;
	const { vault, workspace } = owner.app;
	if (!EditableFileView || !vault.readBinary || !vault.createBinary || !vault.modifyBinary || !workspace.getLeaf) return;

	async function open(file) {
		if (owner.stopped || vault.getAbstractFileByPath(file.path) !== file) return;
		try {
			const existing = workspace.getLeavesOfType(viewType).find(leaf => leaf.getViewState().state?.file === file.path);
			const leaf = existing ?? workspace.getLeaf('tab');
			if (!existing) await leaf.setViewState({ type: viewType, active: true, state: { file: file.path } });
			await workspace.revealLeaf(leaf);
		} catch { new Notice(t('docx.openFailed')); }
	}

	class DocxNameModal extends Modal {
		onOpen() {
			this.setTitle(t('docx.new'));
			const form = this.contentEl.createEl('form', { cls: 'smart-sync-docx-name' });
			const label = form.createEl('label', { text: t('docx.name') });
			const input = label.createEl('input', { type: 'text' });
			input.required = true;
			const message = form.createDiv({ attr: { role: 'status' } });
			const create = form.createEl('button', { text: t('docx.create'), type: 'submit', cls: 'mod-cta' });
			form.addEventListener('submit', event => {
				event.preventDefault();
				if (create.disabled) return;
				const name = docxName(input.value);
				if (!name) { message.setText(t('docx.invalidName')); return; }
				const folder = this.folder;
				const path = folder.isRoot() ? name : `${folder.path}/${name}`;
				const foldedName = name.normalize('NFC').toLowerCase();
				if (vault.getAbstractFileByPath(path) ||
					folder.children?.some(child => child.name.normalize('NFC').toLowerCase() === foldedName)) {
					message.setText(t('docx.exists'));
					return;
				}
				create.disabled = true;
				void (async () => {
					try {
						if (owner.stopped || (!folder.isRoot() && vault.getAbstractFileByPath(folder.path) !== folder))
							throw Error('folder');
						const file = await vault.createBinary(path, blankDocx());
						this.close();
						await open(file);
					} catch {
						message.setText(t(vault.getAbstractFileByPath(path) ? 'docx.exists' : 'docx.createFailed'));
						create.disabled = false;
					}
				})();
			});
			input.focus();
		}
		onClose() { this.contentEl.empty(); }
	}

	let naming;
	const create = folder => {
		naming?.close();
		naming = new DocxNameModal(owner.app);
		naming.folder = folder;
		naming.open();
	};

	class DocxView extends EditableFileView {
		generation = 0;
		getViewType() { return viewType; }
		getIcon() { return 'file-text'; }
		getDisplayText() { return this.file?.basename ?? t('docx.open'); }
		canAcceptExtension(extension) { return extension.toLowerCase() === 'docx'; }

		async onOpen() {
			await super.onOpen();
			this.registerEvent(vault.on('modify', file => {
				const session = this.session;
				if (!session || session.file !== file || session.writing) return;
				if (session.changes !== session.saved) this.status.setText(t('docx.conflict'));
				else void this.onLoadFile(file);
			}));
			this.registerEvent(vault.on('delete', file => {
				if (this.session?.file === file) this.status.setText(t('docx.conflict'));
			}));
		}

		async onLoadFile(file) {
			this.clearEditor();
			const generation = this.generation;
			this.contentEl.classList.add('smart-sync-docx');
			const controls = this.contentEl.createDiv({ cls: 'smart-sync-docx-controls' });
			const save = controls.createEl('button', { text: t('docx.save'), type: 'button', cls: 'mod-cta' });
			save.disabled = true;
			const status = controls.createSpan({ text: t('docx.loading'), attr: { role: 'status', 'aria-live': 'polite' } });
			this.status = status;
			const target = this.contentEl.createDiv({ cls: 'smart-sync-docx-editor' });
			const current = () => generation === this.generation && this.file === file && !owner.stopped;
			try {
				if (!isDocx(file)) throw Error('openFailed');
				if (file.stat.size > DOCX_MAX_BYTES) throw Error('large');
				const buffer = await vault.readBinary(file);
				if (!current()) return;
				const Parser = target.ownerDocument.defaultView.DOMParser;
				const inspection = inspectDocx(buffer, Parser);
				const [{ DocxEditor }, { createElement, createRef }, { createRoot }, { locales }, { setGoogleFontsEnabled }] = await Promise.all([
					import('@eigenpal/docx-editor-react'), import('react'), import('react-dom/client'),
					import('@eigenpal/docx-editor-i18n'), import('@eigenpal/docx-editor-core'),
				]);
				if (!current()) return;
				setGoogleFontsEnabled(false);
				const ref = createRef();
				const session = { file, buffer, inspection, changes: 0, saved: 0, ready: false };
				this.session = session;
				const updateSave = () => { save.disabled = !session.ready || inspection.readOnly || session.saving || session.changes === session.saved; };
				const saveFile = async () => {
					if (!current() || save.disabled) return;
					session.saving = true;
					updateSave();
					status.setText(t('docx.saving'));
					const revision = session.changes;
					try {
						const output = await ref.current?.save({ selective: true });
						if (!current()) return;
						if (!output) throw Error('saveFailed');
						const checked = inspectDocx(output, Parser);
						checkDocxRoundTrip(session.inspection, checked);
						if (owner.running || owner.docxWrite) throw Error('busy');
						const path = file.path;
						const write = async () => {
							if (vault.getAbstractFileByPath(path) !== file || file.stat.size !== session.buffer.byteLength)
								throw Error('conflict');
							const disk = await vault.readBinary(file);
							if (!current() || file.path !== path || vault.getAbstractFileByPath(path) !== file ||
								!sameBytes(new Uint8Array(disk), new Uint8Array(session.buffer))) throw Error('conflict');
							if (!sameBytes(new Uint8Array(disk), new Uint8Array(output))) {
								session.writing = true;
								try { await vault.modifyBinary(file, output); }
								finally { session.writing = false; }
							}
						};
						const pending = write();
						owner.docxWrite = pending;
						try { await pending; }
						finally { if (owner.docxWrite === pending) owner.docxWrite = undefined; }
						session.buffer = output;
						session.inspection = checked;
						session.saved = revision;
						if (current()) status.setText(t(session.changes === revision ? 'docx.saved' : 'docx.unsaved'));
					} catch (error) {
						if (current()) status.setText(errorText(error, 'saveFailed'));
					} finally {
						session.saving = false;
						if (current()) updateSave();
					}
				};
				save.addEventListener('click', () => void saveFile());
				target.addEventListener('keydown', event => {
					if (!event.altKey && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
						event.preventDefault();
						event.stopPropagation();
						void saveFile();
					}
				}, { capture: true });
				this.root = createRoot(target);
				this.root.render(createElement(DocxEditor, {
					ref, documentBuffer: buffer, readOnly: inspection.readOnly, showFileOpen: false, showHelpMenu: false,
					showOutlineButton: false, disableFindReplaceShortcuts: true, initialZoom: Platform.isMobile ? 0.65 : 1,
					colorMode: this.contentEl.ownerDocument.body.classList.contains('theme-dark') ? 'dark' : 'light',
					documentName: file.basename, documentNameEditable: false, i18n: locales[locale],
					onEditorViewReady: () => {
						if (!current()) return;
						session.ready = true;
						updateSave();
						status.setText(t(inspection.readOnly ? 'docx.readOnly' : 'docx.ready'));
					},
					onChange: () => {
						if (!current() || !session.ready || inspection.readOnly) return;
						session.changes++;
						updateSave();
						if (!session.saving) status.setText(t('docx.unsaved'));
					},
					onSave: () => { void saveFile(); },
					onError: () => { if (current()) status.setText(t('docx.openFailed')); },
				}));
			} catch (error) {
				if (current()) status.setText(errorText(error, 'openFailed'));
			}
		}

		clearEditor() {
			this.generation++;
			this.root?.unmount();
			this.root = undefined;
			this.session = undefined;
			this.contentEl.empty();
		}

		async onUnloadFile() { this.clearEditor(); }
		async onClose() { this.clearEditor(); await super.onClose(); }
	}

	owner.registerView(viewType, leaf => new DocxView(leaf));
	const registerExtension = () => {
		if (owner.stopped || !owner.registerExtensions) return;
		try { owner.registerExtensions(['docx'], viewType); } catch { /* The explicit open action is still available. */ }
	};
	if (workspace.onLayoutReady) workspace.onLayoutReady(registerExtension);
	else registerExtension();
	owner.registerEvent(workspace.on('file-menu', (menu, file) => {
		if (file instanceof TFolder) menu.addItem(item => item.setTitle(t('docx.new')).setIcon('file-plus').onClick(() => create(file)));
		if (isDocx(file)) menu.addItem(item => item.setTitle(t('docx.open')).setIcon('file-text').onClick(() => open(file)));
	}));
	owner.addCommand({ id: 'new-word-document', name: t('docx.new'), callback: () => create(workspace.getActiveFile()?.parent ?? vault.getRoot()) });
	class DocxPicker extends FuzzySuggestModal {
		getItems() { return vault.getFiles().filter(isDocx); }
		getItemText(file) { return file.path; }
		onChooseItem(file) { void open(file); }
	}
	let picker;
	owner.addCommand({ id: 'open-word-document', name: t('docx.open'), callback() {
		picker?.close();
		picker = new DocxPicker(owner.app);
		picker.setPlaceholder(t('docx.find'));
		picker.open();
	} });
	owner.register(() => { naming?.close(); picker?.close(); });
}
