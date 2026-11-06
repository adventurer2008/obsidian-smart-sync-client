# Smart Sync Client

Shared Client source for Wujie Sync (China) and Smart Sync (Global). [简体中文](README.zh-CN.md).

## Scope

This is the Client development repository. Regional builds share the synchronization runtime, with separate identities and service configuration. China includes account login, free-plan enrollment, purchase and renewal entry with server-verified payment status. Global includes ten interface languages, Google/GitHub/email sign-in and account-assigned USD checkout through Stripe or Dodo Payments. Its service, storage and account data are independent. Installable Global packages and [operation manual](https://github.com/adventurer2008/obsidian-smart-sync-release-global/blob/main/USER-GUIDE.md) are available from its regional distribution; source publication does not establish Community approval.

Server source, internal archives, deployment tools and private acceptance evidence are maintained privately. The public synthetic tests do not replace Client/Server integration, production, official Community review or physical-device acceptance.

## Build and test

Use Node 26.12.1:

```sh
npm ci --ignore-scripts
npm test
npm run build:all
npm run check:editions
npm ci --prefix tools/community-lint --ignore-scripts
npm run build:cn
npm run check:community
```

Regional outputs are in artifacts/cn and artifacts/global. The default build is for local development. These commands do not install plugins, deploy services or publish Releases. Windows and Linux CI run the same checks; a lint result does not constitute Community approval.

The synthetic three-device position integration test also needs a local Server checkout. Set `SMART_SYNC_SERVER_DIR` to that checkout and run `node --test test/note-positions-integration.test.mjs`. Without that explicit path, this integration test is skipped; it does not access a hosted service or a real vault.

## Notes-first synchronization (since 1.1.4)

Full and incremental synchronization prioritize Markdown notes (`.md`, case insensitive) before attachments for uploads and downloads. Necessary directory, rename and deletion dependencies keep their safe ordering. Notes can become available before embedded images/PDFs finish downloading. Existing attachment download policies still apply. New queued Markdown edits can take priority at file/batch boundaries; an active transfer is allowed to finish safely.

Receiving first inspects encrypted metadata in bounded windows, so this improves body-transfer priority rather than guaranteeing shorter total synchronization time. Pending files survive interrupted reordered progress in the existing retry queue. Mobile systems can suspend the application; remaining work continues when the host resumes and synchronization runs again. All-platform physical-device acceptance remains pending; see [the platform review](docs/validation/cross-platform-feature-matrix.md).

## Accounts, network and privacy

Synchronization needs an approved account and the matching regional service. Content and paths are encrypted on the client; the service handles account/workspace identifiers, enrollment email, notebook/device labels, timestamps, ciphertext sizes, reported local vault byte totals and measurement times, and opaque identifiers. Keep the encryption passphrase safe; external login does not replace it. China plan prices and purchase notices appear at checkout; renewal is manual and does not enable automatic charges. Avoid running multiple sync providers on the same vault without resolving their interaction.

Global diagnostics stay on the device and can be exported manually; the Global client does not upload diagnostic telemetry. Device presence and local vault-size reports support the user's device-management and peer-discovery features. Server request logs and account metadata are described in the regional privacy policy. Enabling Windows launch at login explicitly creates a shortcut in the current user's Startup folder outside the vault; disabling that setting removes its owned shortcut.

[China installation and distribution](https://github.com/adventurer2008/obsidian-smart-sync-release-cn) · [China privacy](https://github.com/adventurer2008/obsidian-smart-sync-release-cn/blob/main/PRIVACY.md) · [Global downloads and manual](https://github.com/adventurer2008/obsidian-smart-sync-release-global) · [Global privacy](https://smartsync.cc/privacy/). See the Global distribution for the current stable release; official Community listing is a separate process.

## License and provenance

Copyright (c) 2026 lihy. New Client candidates after the existing 0.1.81 release use [Apache License 2.0](LICENSE). Existing releases through 0.1.81 retain their original MIT terms and assets. Dependency licenses remain in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Apache-2.0 permits commercial reuse; it grants no hosted-service access or Server rights.

[PROVENANCE.json](PROVENANCE.json) records the source snapshot and unchanged runtime/resource hashes. Regional distribution names are updated under CHG-20261021-06. This source publication does not issue a new plugin version or replace installed binaries.

## Host compatibility

On desktop, Advanced → Run in background with tray icon (immediately after Enable note search) is on by default. Closing a vault window keeps it running behind the branded tray icon; click the icon to restore the window or use its menu to close only that vault; other open vaults keep running. Turning the switch off restores normal closing. This does not configure launch at login or hide the window on startup. Mobile does not show this setting. Hosts without usable Electron tray support retain normal closing.

Windows Alpha candidates add a separate **Advanced → Launch to tray at login** switch, off by default. Explicitly enabling it creates a current-user Startup shortcut for this vault's exact host ID and also enables its background tray. Its marked startup URI opens this vault and hides it only after its tray is available; ordinary launches remain visible. Existing synchronization settings and manual-stop state are retained. Disable login startup before disabling the tray, uninstalling or reverting to a version without this feature. Plugin unload/restart does not delete an enabled startup shortcut. Other platforms do not display the switch. Synthetic tests do not substitute for a real Windows logout/reboot acceptance check.

Version 1.0.5 supports Obsidian 1.12.7 and newer through shared legacy and declarative settings definitions. Offline installation does not provide offline cloud synchronization. Native-host acceptance is recorded separately from synthetic tests.

Custom Obsidian user-data profiles cannot enable launch at login because the host may route a warm startup URI to another instance; normal tray operation remains available. Native default-profile login acceptance is still pending.

User device management: https://user.wujiesync.cc/ . Downloads: https://user.wujiesync.cc/download/ . Existing synchronization settings and legacy download compatibility are retained.

## Global interface languages (unreleased candidate)

The Global source candidate supports English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German, French, Spanish, Brazilian Portuguese and Russian. It follows Obsidian by default; a device/vault-local choice applies after reloading the plugin or restarting Obsidian once sync finishes. Unknown languages fall back to English. Brands remain unchanged. Non-English translations await native review; physical platform acceptance is tracked in docs/validation/cross-platform-feature-matrix.md. Existing stable 1.1.5 downloads are unchanged. China retains its regional interface.
