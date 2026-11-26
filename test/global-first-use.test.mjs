import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';

globalThis.window = {};
globalThis.__SMART_SYNC_EDITION__ = {
    edition: 'global', id: 'smart-sync-global', locale: 'en', serviceOrigin: 'https://sync.smartsync.cc',
};
registerHooks({ resolve(specifier, context, next) {
    return specifier === 'obsidian'
        ? { url: new URL('./obsidian-double.mjs', import.meta.url).href, shortCircuit: true }
        : next(specifier, context);
} });
const { default: Plugin, IndependentSettings } = await import('../src/plugin.js');

function guest() {
    const calls = [];
    const plugin = {
        app: {},
        data: { localId: 'guest', settings: { origin: 'https://sync.smartsync.cc', workspace: '' } },
        secret: () => '',
        globalEnrollment: async (...args) => calls.push(args),
        enrollment: async () => calls.push('sign-in'),
        openBilling: async (...args) => calls.push(args),
    };
    return { plugin, calls };
}

test('Global Sync now offers distinct free enrollment, existing login and public plans actions', async () => {
    const expected = [[false, true], 'sign-in', [undefined, false, true]];
    for (const [index, route] of expected.entries()) {
        const { plugin, calls } = guest();
        const dialog = await Plugin.prototype.synchronizeManually.call(plugin);
        assert.equal(dialog.title, 'Get started with Smart Sync');
        assert.match(dialog.contentEl.children[0].text, /first sign-in creates a Free account/);
        const buttons = dialog.contentEl.settings.map(row => row.controls[0]);
        assert.deepEqual(buttons.map(button => button.text), [
            'Start for free', 'Sign in to an existing account', 'View paid plans',
        ]);
        assert.deepEqual(calls, []);
        await buttons[index].click();
        await buttons[index].click();
        assert.deepEqual(calls, [route]);
    }
});

test('Global plan preview opens the public pricing page without an account or purchase session', async context => {
    const { plugin, calls } = guest();
    plugin.purchaseSession = () => assert.fail('Preview must not use a purchase session');
    plugin.accountApi = () => assert.fail('Preview must not create a billing ticket');
    context.mock.method(globalThis, 'fetch', () => assert.fail('Preview hands the route to the system browser'));
    const originalWindow = globalThis.window;
    globalThis.window = { open: (...args) => calls.push(args) };
    context.after(() => { globalThis.window = originalWindow; });
    const openBilling = Plugin.prototype.openBilling.bind(plugin);
    await openBilling();
    await openBilling(undefined, true, true);
    assert.deepEqual(calls, ['sign-in']);
    await openBilling(undefined, false, true);
    assert.deepEqual(calls, [
        'sign-in', ['https://pay.smartsync.cc/pay/plans#lang=en', '_blank', 'noopener,noreferrer'],
    ]);
    plugin.stopped = true;
    await openBilling(undefined, false, true);
    assert.equal(calls.length, 2);
});


test('signed-out Global settings show the welcome actions above the overview and hide them after sign-in', async () => {
    const { plugin, calls } = guest();
    Object.assign(plugin.data.settings, { direction: 'both', interval: 60, excludedExtensions: [], configuration: {} });
    Object.assign(plugin, { manifest: { version: 'synthetic' }, status: { text: '' }, statusListeners: new Set() });
    const definitions = () => IndependentSettings.prototype.getSettingDefinitions.call({ owner: plugin, expanded: new Set() });
    const rows = definitions();
    const welcome = rows.find(row => row.name === 'Get started with Smart Sync');
    assert.ok(welcome);
    assert.ok(rows.indexOf(welcome) < rows.findIndex(row => row.cls === 'smart-sync-overview-group'));
    const buttons = [];
    welcome.render({
        setDesc: text => assert.match(text, /first sign-in creates a Free account/),
        addButton(build) {
            const button = {
                setButtonText(text) { this.text = text; },
                setCta() { this.primary = true; },
                onClick(click) { this.click = click; },
            };
            build(button);
            buttons.push(button);
        },
    });
    assert.deepEqual(buttons.map(({ text }) => text), ['Start for free', 'Sign in to an existing account', 'View paid plans']);
    assert.equal(buttons[0].primary, true);
    await buttons[0].click();
    await buttons[1].click();
    await buttons[2].click();
    assert.deepEqual(calls, [[false, true], 'sign-in', [undefined, false, true]]);
    plugin.accountAuthorized = true;
    await buttons[0].click();
    assert.equal(calls.length, 3);
    assert.ok(!definitions().some(row => row.name === welcome.name));
});
