import { EditorSelection, EditorState, StateField, Transaction } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin, WidgetType, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { TreeFragment } from '@lezer/common';
import { parser, Strikethrough, TaskList } from '@lezer/markdown';
import { NOTE_LIMIT } from './note-crypto.js';

const markdown = parser.configure([Strikethrough, TaskList]);
const parsed = StateField.define({
	create: state => markdown.parse(state.doc.toString()),
	update(tree, transaction) {
		if (!transaction.docChanged) return tree;
		const changes = [];
		transaction.changes.iterChangedRanges((fromA, toA, fromB, toB) => changes.push({ fromA, toA, fromB, toB }));
		return markdown.parse(transaction.newDoc.toString(), TreeFragment.applyChanges(TreeFragment.addTree(tree), changes));
	},
});

const inlineStyles = new Map([
	['StrongEmphasis', Decoration.mark({ tagName: 'strong' })],
	['Emphasis', Decoration.mark({ tagName: 'em' })],
	['Strikethrough', Decoration.mark({ tagName: 's' })],
	['InlineCode', Decoration.mark({ tagName: 'code' })],
]);
const quoteStyle = Decoration.line({ class: 'wujie-editor-quote' });
const codeStyle = Decoration.line({ class: 'wujie-editor-code' });
const markerStyle = Decoration.mark({ class: 'wujie-editor-marker' });
const hidden = Decoration.replace({});
const bullet = Decoration.replace({ widget: new class extends WidgetType {
	toDOM(view) {
		const span = view.dom.ownerDocument.createElement('span');
		span.textContent = '•';
		return span;
	}
}() });

function previewDecorations(view) {
	const { doc, selection } = view.state;
	const { from, to } = view.viewport;
	const decorations = [], lineStyles = new Set();
	const isActive = node => selection.ranges.some(range => range.from <= node.to && range.to >= node.from);
	const line = (offset, decoration) => {
		const start = doc.lineAt(offset).from;
		if (start < from || start > to) return;
		const key = `${start}:${decoration.spec.class}`;
		if (lineStyles.has(key)) return;
		lineStyles.add(key);
		decorations.push(decoration.range(start));
	};
	view.state.field(parsed).iterate({ from, to, enter(ref) {
		const { name, node } = ref;
		const heading = /^ATXHeading([1-6])$/u.exec(name);
		if (heading) line(node.from, Decoration.line({ class: `wujie-editor-h${heading[1]}` }));
		if (name === 'QuoteMark') line(node.from, quoteStyle);
		if (name === 'FencedCode' || name === 'CodeBlock') {
			for (let number = doc.lineAt(Math.max(from, node.from)).number; number <= doc.lineAt(Math.min(to, node.to)).number; number++)
				line(doc.line(number).from, codeStyle);
			return false;
		}
		const style = inlineStyles.get(name);
		if (style) decorations.push(style.range(node.from, node.to));
		const parent = node.parent;
		if (!parent) return;
		if (name === 'ListMark' && parent.parent?.name === 'BulletList') {
			const issued = doc.lineAt(node.from);
			decorations.push((isActive(issued) ? markerStyle : bullet).range(node.from, node.to));
			return;
		}
		const inlineMarker = ['EmphasisMark', 'StrikethroughMark', 'CodeMark'].includes(name) && inlineStyles.has(parent.name);
		const headingMarker = name === 'HeaderMark' && /^ATXHeading[1-6]$/u.test(parent.name);
		const quoteMarker = name === 'QuoteMark';
		if (!inlineMarker && !headingMarker && !quoteMarker) return;
		const end = (quoteMarker || headingMarker && node.from === parent.from) && doc.sliceString(node.to, node.to + 1) === ' '
			? node.to + 1 : node.to;
		const scope = quoteMarker || headingMarker ? doc.lineAt(node.from) : parent;
		decorations.push((isActive(scope) ? markerStyle : hidden).range(node.from, end));
	} });
	return Decoration.set(decorations, true);
}

const livePreview = ViewPlugin.fromClass(class {
	constructor(view) { this.decorations = previewDecorations(view); }
	update(update) {
		if (update.docChanged || update.selectionSet || update.viewportChanged)
			this.decorations = previewDecorations(update.view);
	}
}, { decorations: plugin => plugin.decorations });

function toggleInline(view, marker) {
	view.dispatch(view.state.changeByRange(range => {
		const { from, to } = range, width = marker.length;
		const text = view.state.sliceDoc(from, to);
		const shift = offset => EditorSelection.range(range.anchor + offset, range.head + offset);
		if (from >= width && view.state.sliceDoc(from - width, from) === marker &&
			view.state.sliceDoc(to, to + width) === marker) {
			return { changes: [{ from: from - width, to: from }, { from: to, to: to + width }],
				range: shift(-width) };
		}
		return { changes: { from, to, insert: marker + text + marker },
			range: shift(width) };
	}));
	view.focus();
	return true;
}

function toggleLines(view, prefix) {
	const { doc, selection } = view.state;
	const { from, to } = selection.main;
	const first = doc.lineAt(from).number, last = doc.lineAt(to > from ? to - 1 : to).number;
	const lines = Array.from({ length: last - first + 1 }, (_, index) => doc.line(index + first));
	const remove = lines.every(line => line.text.startsWith(prefix));
	view.dispatch({ changes: lines.map(line => remove ? { from: line.from, to: line.from + prefix.length }
		: { from: line.from, insert: prefix }), userEvent: 'input.format' });
	view.focus();
}

export function createSecureEditor(parent, text, { label, onChange, onLimit }) {
	let replacing = false;
	const view = new EditorView({
		parent,
		root: parent.getRootNode(),
		state: EditorState.create({ doc: text, extensions: [
			parsed, livePreview, EditorView.lineWrapping, history(),
			keymap.of([
				{ key: 'Mod-b', run: editor => toggleInline(editor, '**') },
				{ key: 'Mod-i', run: editor => toggleInline(editor, '*') },
				...historyKeymap, ...defaultKeymap,
			]),
			EditorView.contentAttributes.of({ 'aria-label': label, spellcheck: 'false', autocomplete: 'off',
				autocorrect: 'off', autocapitalize: 'off' }),
			EditorState.transactionFilter.of(transaction => {
				if (replacing || !transaction.docChanged ||
					new TextEncoder().encode(transaction.newDoc.toString()).length <= NOTE_LIMIT) return transaction;
				onLimit();
				return [];
			}),
			EditorView.updateListener.of(update => {
				if (update.docChanged && !replacing) onChange(update.state.doc.toString());
			}),
		] }),
	});
	return {
		view,
		format(marker, lines) { if (lines) toggleLines(view, marker); else toggleInline(view, marker); },
		replace(text) {
			const before = view.state.doc.toString();
			if (text === before) return;
			const from = text.startsWith(before) ? before.length : 0;
			replacing = true;
			try { view.dispatch({ changes: { from, to: before.length, insert: text.slice(from) },
				annotations: Transaction.addToHistory.of(false) }); }
			finally { replacing = false; }
		},
		destroy() {
			view.setState(EditorState.create());
			view.destroy();
		},
	};
}
