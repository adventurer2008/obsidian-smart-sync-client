import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registerHooks } from 'node:module';
registerHooks({ resolve(specifier, context, next) { return specifier === 'obsidian' ? { url: new URL('./obsidian-double.mjs', import.meta.url).href, shortCircuit: true } : next(specifier, context); } });
globalThis.window = globalThis;
globalThis.__SMART_SYNC_EDITION__ = { edition: 'global', id: 'smart-sync-global', locale: 'en' };
const { default: Sync } = await import('../src/plugin.js');

test('Global never queues or uploads diagnostic telemetry, including a legacy queued report', async () => {
	const row = { id: 'synthetic', status: 'failed' };
	const subject = { data: { taskOutbox: [row], tasks: [row] }, diagnosticPending: 1,
		scheduleDiagnostics() { assert.fail('Telemetry was scheduled'); },
		ensureCurrent() { assert.fail('Telemetry drain was entered'); } };
	const api = new Proxy({}, { get() { assert.fail('Telemetry API was accessed'); } });
	Sync.prototype.queueDiagnostic.call(subject, { id: 'another', status: 'done' }, api);
	Sync.prototype.scheduleDiagnostics.call(subject, api);
	await Sync.prototype.flushDiagnostics.call(subject, api, { automatic: true });
	await Sync.prototype.flushDiagnostics.call(subject, api);
	await Sync.prototype.drainDiagnostics.call(subject, api);
	assert.equal(subject.diagnosticPending, 0);
	assert.deepEqual(subject.data.tasks, [row]);
	assert.deepEqual(subject.data.taskOutbox, [row]);
});

test('Global Android transport keeps a local diagnostic without enqueuing a remote report', async () => {
	const data = { localId: 'synthetic', settings: { origin: 'https://sync.smartsync.cc', workspace: 'synthetic' }, taskOutbox: [] };
	const subject = { data, manifest: { version: '1.1.4' }, queueDiagnostic: Sync.prototype.queueDiagnostic,
		saveData: async value => assert.equal(value, data) };
	const event = { stage: 'native-selected', at: 200000, durationMs: 20, traceId: crypto.randomUUID() };
	await Sync.prototype.recordAndroidTransportDiagnostic.call(subject, event, JSON.stringify([data.localId, data.settings.origin, data.settings.workspace]));
	assert.deepEqual(data.androidTransportDiagnostics, [event]);
	assert.deepEqual(data.taskOutbox, []);
});
