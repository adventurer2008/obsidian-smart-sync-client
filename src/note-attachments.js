import { hex } from './codec.js';
import { formatStorageSize, t } from './i18n.js';

const maxBytes = 32 * 1024 * 1024;
const maxFiles = 128;
const overhead = 28; // 12-byte IV and 16-byte AES-GCM authentication tag
const imageTypes = new Map([
	['png', 'image/png'], ['jpg', 'image/jpeg'], ['jpeg', 'image/jpeg'], ['gif', 'image/gif'],
	['webp', 'image/webp'], ['avif', 'image/avif'], ['bmp', 'image/bmp'],
]);
const encoder = new TextEncoder();
const markdown = path => /\.md$/iu.test(path);
const safePath = path => typeof path === 'string' && !/[\\:]/u.test(path) && ![...path].some(char => char.charCodeAt(0) < 32) &&
	path.split('/').every(part => part && part !== '.' && part !== '..' && !part.startsWith('.'));
const digest = async bytes => hex(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
const error = (key, params) => Error(t(`encryption.${key}`, params));
export const attachmentPackagePath = id => `wujie-locked-${id}.wujie-lock`;

export function findNoteAttachments(app, snapshot) {
	const cache = app.metadataCache;
	const metadata = cache?.getFileCache(snapshot.file);
	if (!metadata) throw error('attachmentIndex');
	const attachments = new Map();
	const refs = [...metadata.embeds ?? [], ...metadata.links ?? [], ...metadata.frontmatterLinks ?? []];
	for (const match of snapshot.original.matchAll(/!\[\[([^\]\r\n]+)\]\]|!\[[^\]\r\n]*\]\(\s*(<[^>\r\n]+>|[^\s)]+)[^\r\n)]*\)/gu)) {
		const section = metadata.sections?.find(({ position }) => position.start.offset <= match.index && position.end.offset >= match.index + match[0].length);
		if (section?.type === 'code' || /^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(match[1] ?? match[2].replace(/^<|>$/gu, ''))) continue;
		if (!refs.some(ref => ref.original === match[0] || ref.original === match[0].slice(1))) throw error('attachmentIndex');
	}
	for (const ref of refs) {
		const href = ref.link.split('#')[0].split('|')[0];
		if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/iu.test(href)) continue;
		if (ref.position) {
			const { start, end } = ref.position;
			if (snapshot.original.slice(start.offset, end.offset) !== ref.original) throw error('attachmentIndex');
		}
		const file = cache.getFirstLinkpathDest(href, snapshot.path);
		if (!file) {
			if (metadata.embeds?.includes(ref) || /\.[^./]+$/u.test(href) && !markdown(href))
				throw error('attachmentMissing', { path: href });
			continue;
		}
		if (markdown(file.path)) continue;
		if (!safePath(file.path) || file.path.endsWith('.wujie-lock')) throw error('attachmentChanged', { path: file.path });
		attachments.set(file.path, file);
	}
	checkShared(app, snapshot.path, attachments.keys());
	return [...attachments.values()];
}

function checkShared(app, source, paths) {
	const wanted = new Set(paths);
	if (!wanted.size) return;
	for (const file of app.vault.getMarkdownFiles()) {
		if (file.path === source) continue;
		const cache = app.metadataCache.getFileCache(file);
		if (!cache) throw error('attachmentIndex');
		for (const ref of [...cache.embeds ?? [], ...cache.links ?? [], ...cache.frontmatterLinks ?? []]) {
			const dest = app.metadataCache.getFirstLinkpathDest(ref.link.split('#')[0].split('|')[0], file.path);
			if (dest && wanted.has(dest.path)) throw error('attachmentShared', { path: dest.path, note: file.path });
		}
	}
}

export function parseAttachmentManifest(value) {
	const manifest = JSON.parse(value);
	if (typeof manifest?.text !== 'string' || ![false, true].includes(manifest.restoring) ||
		!Array.isArray(manifest.entries) || !manifest.entries.length || manifest.entries.length > maxFiles)
		throw error('invalidContent');
	let offset = 0;
	const paths = new Set();
	for (const entry of manifest.entries) {
		if (!safePath(entry.path) || markdown(entry.path) || paths.has(entry.path) || entry.path.endsWith('.wujie-lock') ||
			!Number.isSafeInteger(entry.size) || entry.size < 0 || !Number.isSafeInteger(entry.mtime) || entry.mtime < 0 ||
			!Number.isSafeInteger(entry.ctime) || entry.ctime < 0 || entry.offset !== offset || !/^[a-f\d]{64}$/u.test(entry.hash))
			throw error('invalidContent');
		paths.add(entry.path);
		offset += entry.size + overhead;
		if (offset > maxBytes + maxFiles * overhead) throw error('invalidContent');
	}
	return { ...manifest, size: offset };
}

const cipherParams = (id, entry, iv) => ({
	name: 'AES-GCM', iv, additionalData: encoder.encode(JSON.stringify(['wujie-attachment-2', id, entry.path, entry.offset, entry.size, entry.hash])),
});

export async function stageNoteAttachments(vault, id, key, text, files, verifyPath = async () => {}) {
	const total = files.reduce((size, file) => size + file.stat.size, 0);
	if (total > maxBytes || files.length > maxFiles) throw error('attachmentLimit', { limit: formatStorageSize(maxBytes) });
	const bytes = new Uint8Array(total + overhead * files.length);
	const entries = [];
	let offset = 0;
	for (const file of files) {
		const { size, mtime, ctime } = file.stat;
		const path = file.path;
		await verifyPath(path);
		const clear = new Uint8Array(await vault.readBinary(file));
		try {
			if (clear.length !== size || file.stat.mtime !== mtime || file.path !== path) throw error('attachmentChanged', { path });
			const entry = { path, offset, size, mtime, ctime, hash: await digest(clear) };
			const iv = crypto.getRandomValues(new Uint8Array(12));
			bytes.set(iv, offset);
			bytes.set(new Uint8Array(await crypto.subtle.encrypt(cipherParams(id, entry, iv), key, clear)), offset + iv.length);
			entries.push(entry);
			offset += size + overhead;
		} finally { clear.fill(0); }
	}
	const value = JSON.stringify({ text, restoring: false, entries });
	const manifest = parseAttachmentManifest(value);
	const file = await vault.createBinary(attachmentPackagePath(id), bytes.buffer);
	try {
		await verifyNoteAttachments(vault, id, key, manifest);
	} catch (problem) {
		await vault.delete(file, true);
		throw problem;
	}
	return { value, manifest, file };
}

export async function readAttachmentPackage(vault, id, manifest) {
	const file = vault.getAbstractFileByPath(attachmentPackagePath(id));
	if (!file?.stat || file.stat.size !== manifest.size) throw error('attachmentPackageMissing');
	const bytes = new Uint8Array(await vault.readBinary(file));
	if (bytes.length !== manifest.size) throw error('invalidContent');
	return bytes;
}

export async function decryptAttachment(bytes, id, key, entry) {
	const { offset, size } = entry;
	const iv = bytes.subarray(offset, offset + 12);
	try {
		return new Uint8Array(await crypto.subtle.decrypt(cipherParams(id, entry, iv), key,
			bytes.subarray(offset + 12, offset + size + overhead)));
	} catch { throw error('invalidContent'); }
}

async function verifyNoteAttachments(vault, id, key, manifest) {
	const bytes = await readAttachmentPackage(vault, id, manifest);
	for (const entry of manifest.entries) {
		const clear = await decryptAttachment(bytes, id, key, entry);
		clear.fill(0);
	}
	return bytes;
}

async function checkOriginal(vault, entry) {
	const file = vault.getAbstractFileByPath(entry.path);
	if (!file) {
		if (await vault.adapter.exists(entry.path)) throw error('attachmentChanged', { path: entry.path });
		return null;
	}
	if (file.stat?.size !== entry.size || file.stat.mtime !== entry.mtime) throw error('attachmentChanged', { path: entry.path });
	const clear = new Uint8Array(await vault.readBinary(file));
	try {
		if (await digest(clear) !== entry.hash || file.path !== entry.path || file.stat.mtime !== entry.mtime)
			throw error('attachmentChanged', { path: entry.path });
	} finally { clear.fill(0); }
	return file;
}

export async function finishAttachmentLock(app, source, id, key, manifest, active, remove) {
	const { vault } = app;
	const bytes = await verifyNoteAttachments(vault, id, key, manifest);
	if (manifest.restoring) throw error('attachmentRestoring');
	const existing = [];
	for (const entry of manifest.entries) if (await checkOriginal(vault, entry)) existing.push(entry);
	checkShared(app, source, existing.map(entry => entry.path));
	for (const entry of existing) {
		const file = await checkOriginal(vault, entry);
		if (!active()) throw error('writeContextChanged');
		if (file) await remove(file);
		if (await vault.adapter.exists(entry.path)) throw error('attachmentChanged', { path: entry.path });
	}
	return bytes;
}

export async function restoreNoteAttachments(vault, id, key, manifest, active, verifyPath = async () => {}) {
	const bytes = await verifyNoteAttachments(vault, id, key, manifest);
	for (const entry of manifest.entries) {
		await verifyPath(entry.path, true);
		await checkOriginal(vault, entry);
	}
	for (const entry of manifest.entries) {
		if (await checkOriginal(vault, entry)) continue;
		const clear = await decryptAttachment(bytes, id, key, entry);
		try {
			await verifyPath(entry.path, true);
			if (!active()) throw error('writeContextChanged');
			await vault.createBinary(entry.path, clear.buffer, { mtime: entry.mtime, ctime: entry.ctime });
		} finally { clear.fill(0); }
	}
}

export function attachmentPreviewType(path) {
	return imageTypes.get(path.split('.').at(-1).toLowerCase());
}
