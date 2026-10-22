import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registerHooks } from 'node:module';
globalThis.window = { open() {} };
registerHooks({ resolve(specifier, context, next) {
    return specifier === 'obsidian' ? { url: new URL('./obsidian-double.mjs', import.meta.url).href, shortCircuit: true } : next(specifier, context);
} });
globalThis.__SMART_SYNC_EDITION__ = { edition: 'cn', development: true, stagingOrigin: 'http://127.0.0.1:24819' };
const { default: Plugin } = await import('../src/plugin.js');

test('purchase entry uses account auth, pins HTTPS origin and never opens a late response for another account', async () => {
    const opened = []; window.open = (...args) => opened.push(args);
    let key = 'synthetic-key', next;
    const api = { origin: 'https://sync.example.invalid', request: async (method, path, body) => {
        assert.equal(method, 'POST'); assert.equal(path, 'billing/entry'); assert.deepEqual(body, {});
        return next();
    } };
    const plugin = { data: { localId: 'one', settings: { origin: api.origin } }, secret: () => key, accountApi: async () => api };
    next = async () => ({ url: 'https://sync.wujiesync.cc/pay/plans#ticket=' + 'a'.repeat(43) });
    await Plugin.prototype.openBilling.call(plugin, true);
    assert.equal(opened[0][0], 'https://sync.wujiesync.cc/pay/orders#ticket=' + 'a'.repeat(43));
    assert.equal(opened[0][2], 'noopener,noreferrer');
    next = async () => ({ url: 'https://untrusted.example.invalid/plans#ticket=' + 'a'.repeat(43) });
    await assert.rejects(Plugin.prototype.openBilling.call(plugin), /Invalid purchase entry/);
    next = async () => ({ url: 'https://sync.wujiesync.cc/pay/plans?extra=1#ticket=' + 'a'.repeat(43) });
    await assert.rejects(Plugin.prototype.openBilling.call(plugin), /Invalid purchase entry/);
    next = async () => { key = 'changed-account'; return { url: 'https://sync.wujiesync.cc/pay/plans#ticket=' + 'b'.repeat(43) }; };
    await Plugin.prototype.openBilling.call(plugin);
    assert.equal(opened.length, 1);
});

test('purchase entry isolates local simulation, staging and production origins', async () => {
    const opened = []; window.open = url => opened.push(url);
    for (const [origin, purchase] of [
        ['http://127.0.0.1:42560', 'http://127.0.0.1:42560'],
        ['http://127.0.0.1:24819', 'https://sync.wujiesync.cc/pay-test'],
        ['https://sync.wujiesync.cc', 'https://sync.wujiesync.cc/pay'],
    ]) {
        let destination = purchase;
        const plugin = { data: { localId: 'synthetic', settings: { origin } }, secret: () => 'synthetic',
            accountApi: async () => ({ origin, request: async () => ({ url: destination + '/plans#ticket=' + 'a'.repeat(43) }) }) };
        await Plugin.prototype.openBilling.call(plugin);
        assert.equal(opened.at(-1), purchase + '/plans#ticket=' + 'a'.repeat(43));
        destination = purchase === 'https://sync.wujiesync.cc/pay' ? 'https://sync.wujiesync.cc/pay-test' : 'https://sync.wujiesync.cc/pay';
        await assert.rejects(Plugin.prototype.openBilling.call(plugin), /Invalid purchase entry/);
    }
});
