# Cross-platform feature and scenario review

## CHG-20261113-CN-LONGMAN-ALPHA

The domestic Alpha can show Oxford and Longman in order on Windows, macOS, Linux, Android, iPhone and iPad when connected to an enabled service. Windows synthetic coverage exercises both sections and local HTTP lookup. Native host acceptance remains pending on all six platforms, including touch and iPad Split View. Global has no entry. The lookup uses the existing account scope and cancellation path, with no local dictionary, sync state or source mtime writes.

## CHG-20261112-NOTEBOOK-NAVIGATOR-MENUS

Both editions conditionally support Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS through Notebook Navigator's optional file and folder Menus API. A vault without that API uses the existing Obsidian menus. Navigator controls its own ordering. Position commands invoked from either menu update the existing synchronized state for Obsidian File Explorer. Batch commands require an effective multi-file selection from Navigator.

Native acceptance is pending on all six platforms. Desktop retest covers right-click and multiple selection. Android, iPhone and iPad retest covers the touch context menu and label fit, including iPad split view. Windows synthetic coverage exercises late API availability, menu construction for a note, attachment, folder and multiple files, action targeting, duplicate prevention and callback cleanup when either plugin reloads.

Windows Node 26.12.1 reported 383 passed and one skipped. Both regional builds and dependency isolation checks passed. The China community lint reported zero errors and 12 existing warnings.

The integration is vault-local and uses the existing Client handlers. Desktop-only APIs, new background or lock behavior, offline recovery changes, migrations and server changes are out of scope. Older clients keep the native menu and existing data format in mixed-version use. Code rollback removes the Navigator entries. Existing identity, vault, content, key, progress and source-mtime rules continue to apply.

## CHG-20261112-CN-RECEIVE-START
## CHG-20261112-CN-DICTIONARY-STYLE

Conditional support remains the same: Windows, macOS and Linux use the editor popover; Android, iPhone/iOS and iPad/iPadOS use the editor sheet. The light and dark palettes, wrapping, scroll limits and mobile touch targets are defined in the shared styles. The focused Windows tests passed and the local, CN and Global builds succeeded. The updated isolated Windows vault opened and its service returned a real word lookup and sentence translation. Native visual acceptance remains pending: Windows rejected screen capture and input, and macOS, Linux, Android, iPhone and iPad devices were unavailable. No new native capability, persistence, protocol, identity or network behavior was introduced; lifecycle and upgrade/rollback boundaries are unchanged.

## CHG-20261112-CN-DICTIONARY-CARD

Windows Obsidian 1.15.0: selected Access and opened the popover in the isolated vault. The live test endpoint verified both IPA fields, noun/verb/adjective grouping, forms and bilingual examples after normalizing the provider response. Focused Windows tests and the local, China and Global builds passed; the Global build has no translation entry.

Windows, macOS and Linux desktop use the editor popover. Android, iPhone/iOS and iPad/iPadOS use the editor sheet. Support is conditional on the China translation service enabling the dictionary. Missing entries and older servers use the translation path. The card handles narrow widths with wrapping and a scrollable results area. Native touch, narrow screens, clipboard, background/lock/restart and physical checks on macOS, Linux, Android, iPhone and iPad remain pending. Editor changes, sign-out and closing the card use the existing request cancellation path. Offline failure uses the existing retry control. Upgrade and rollback require no persisted state or sync protocol changes. The feature sends the selected word after a click, reads the result as text and leaves note content, keys, sync progress and source mtime intact.

## CHG-20261112-CN-TRANSLATION-POPOVER

| Platform | Support | Acceptance for this change |
| --- | --- | --- |
| Windows desktop | Obsidian Markdown editor with CN translation service. Round selection icon and anchored translation card. | The isolated Obsidian 1.15.0 test window opened with the updated build. Baidu returned HTTP 200 through the test service. Native selection and card rendering are unverified because Windows rejected input from the desktop controller. |
| macOS desktop | Same desktop editor path. | Native placement, keyboard focus and pop-out window behavior unverified. |
| Linux desktop | Same desktop editor path. | Native placement and keyboard behavior unverified. |
| Android | Existing selection toolbar, menu and command open the updated sheet. | Native touch and narrow-screen layout unverified. |
| iPhone/iOS | Same mobile editor path. | Native touch, safe areas and lock/foreground behavior unverified. |
| iPad/iPadOS | Same mobile editor path. | Native keyboard, rotation and Split View unverified. |

Synthetic tests cover click-to-request, source display, plain-text results, Escape focus restoration, cancellation and the mobile entry. Local and regional builds pass their isolation checks. Narrow windows, touch and keyboard placement still need native acceptance. The feature uses the existing foreground request, offline retry, account and vault checks and cancellation behavior. The UI has no persisted state or sync protocol changes for restart, mixed versions, upgrade or rollback. Translation reads selections without writing Markdown, keys, sync progress or source mtime. Reading view has no translation entry.


## CHG-20261112-CN-SELECTION-TRANSLATION

Windows Node 26.12.1 completed 379 tests with one skipped integration test on rerun. An initial concurrent run had one note-priority ordering failure, which passed on the focused and full reruns. WSL Node 26.12.1 passed all 11 translation and note-priority tests. Both edition builds and isolation checks passed, including the China-only command and request in built JavaScript.

| Platform | Support | Native acceptance |
| --- | --- | --- |
| Windows desktop | Conditional on the Obsidian Markdown editor and an enabled CN translation service. Inline CodeMirror button, editor menu and command. | Unverified in Obsidian. Synthetic editor and DOM verified on Windows. |
| macOS desktop | Same desktop paths. | Unverified in Obsidian. Check pop-out windows and clipboard. |
| Linux desktop | Same desktop paths. | Unverified in Obsidian. WSL is synthetic coverage. |
| Android | Conditional on an active Markdown editor selection and enabled CN service. Selection toolbar, command and menu where the host supplies them. Bottom sheet. | Unverified. Check touch selection retention, small screens, clipboard and Android transport. |
| iPhone/iOS | Same mobile paths. | Unverified. Check touch selection, safe area, lock and foreground return. |
| iPad/iPadOS | Same mobile paths, including keyboard command. | Unverified. Check Split View, orientation, keyboard selection and lock. |

Reading view and Global have no translation entry. Desktop narrow windows and keyboard use and mobile touch and rotation remain native checks. File changes, hidden documents, sign-out and unload cancel the result UI. A request may already have reached a provider before cancellation. Offline errors require an explicit retry. Reboot does not restore pending translations or results. Client builds with no matching server route report that translation is unavailable. Mixed client versions keep the existing sync protocol. No note or vault file is written. Translation neither loads vault keys nor enters sync progress or changes source mtime. Results and selected text are kept in memory only by the Client.

## CHG-20261110-GLOBAL-LANGUAGE-ORDER

Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS use the China Alpha cloud path independently of WebRTC negotiation. LAN acceleration remains conditional on host WebRTC support, device permissions and an available peer. The regression holds an active signaling request open and verifies that cloud startup can proceed, and that a fresh device pause prevents the pending offer from opening a link. There is no layout, touch, native background or lock-screen change. Existing account and notebook binding, restart and cancellation, mixed versions, upgrade and rollback, Markdown priority, and source modification-time paths are used. Native acceptance and foreground latency after this change remain unverified on all six platforms.

## CHG-20261112-CN-CHANGE-WATCH

Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS have conditional foreground support in China Alpha with the capable primary service. The existing timer handles background, unsupported routes, older servers and connection failures. An ordinary sync reconciles changes on foreground resume, reconnect, and periodic audits. Account and notebook switches invalidate pending notifications. There is no new interface or data format. Native latency, background and lock behavior are unverified on each platform. Automated coverage exercises the wake path, workspace isolation, abort, replay, timeout, fallback, content order and original modification times.

## CHG-20261112-SYNC-FEED-CADENCE

Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS use the shared elapsed-time rule while Obsidian can run synchronization. Screen layout and touch are outside the change. The same feed and checkpoint formats support mixed versions, upgrades, and rollback. Account and vault binding, recovery, encryption and original modification times use the existing paths. Automated coverage exercises cancellation and restart, failed receives, source modification times, Markdown order, and the timed scan. Device-level performance, network recovery, and foreground, background and lock behavior remain unverified for this change.

## CHG-20261112-SYNC-SCAN-POLLING

The shared synchronization engine applies this change to both editions on Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS when Obsidian permits execution. The same batch rule uses the existing per-platform batch size. The local regression checks request counts, Markdown and attachment order, cancellation/restart, and original modification time. No physical-device acceptance has been performed for this patch. The iPad reported activity on the installed version before the fix.

Screen layout and touch controls are outside this engine change. Foreground/background, lock, restart and offline recovery retain the host and existing checkpoints. Mixed versions and upgrades or rollback use the existing feed and state format. The change introduces no new account or vault state and uses the existing encryption, content and source-mtime paths.

## CHG-20261109-DESKTOP-STATUS-BAR-STEADY

Both editions use a fixed-width desktop status item that adapts to the viewport. Long status text remains available by hovering over the item. The desktop bar samples progress once per second. The settings overview and manual synchronization feedback keep their existing delivery paths and actual counts.

Windows Node 26.12.1 passed 377 tests with one skip. The progress regression checks timer coalescing, latest counts, immediate error and overview updates, stale account suppression and the mobile path. Windows Chromium and WebKit reproduced the old shift with Obsidian 1.15 host CSS, then passed 288 combined layout checks with 400–1920 px windows, 12–24 px fonts and both text directions. Both regional builds and isolation checks passed. China Community lint reported zero errors and seven existing warnings. Browser checks use synthetic DOM and do not establish native acceptance.

| Platform | Support | Native acceptance |
| --- | --- | --- |
| Windows desktop | Conditional on the Obsidian status bar | User-confirmed on 2026-11-09 after delivery of China Hub Alpha 1.1.7-alpha.2. The bar stays in place when the number of digits changes, and the completion status appears immediately. Narrow windows, enlarged text, error/stop and unload were not separately reported. |
| macOS desktop | Conditional on the Obsidian status bar | Native host and themes unverified. |
| Linux desktop | Conditional on the Obsidian status bar | Native host and themes unverified. |
| Android | Desktop bar not applicable | Existing settings feedback is used. Native behavior for this change was not retested. |
| iPhone/iOS | Desktop bar not applicable | Existing settings feedback is used. Native behavior for this change was not retested. |
| iPad/iPadOS | Desktop bar not applicable | Existing settings feedback is used. Native behavior for this change was not retested. |

Remaining native coverage includes narrow desktop windows, enlarged status text, immediate failure and cancellation of pending progress on stop or unload. Desktop lifecycle matters only to the pending display timer. Mobile touch and lock behavior for the desktop bar are not applicable. Offline recovery, mixed-version clients and upgrades or rollback keep existing sync and storage behavior. The bar introduces no persisted state, network work, account/vault data changes or changes to encryption, progress accounting or source mtime.

## CHG-20261109-NOTE-TOOLS-SIDEBAR-RESTORE

The user reports repeated internal search IDs in the iPad drawer that resolve on tap. After layout readiness, load only the enabled Recent and Note Search sidebar views without opening the drawer or selecting a tab. The same public workspace API applies to the six supported hosts in both editions.

| Platform | Support | Native acceptance |
| --- | --- | --- |
| Windows desktop | Conditional on supported Obsidian host | Fixed behavior unverified in the native host. |
| macOS desktop | Conditional on supported Obsidian host | Fixed behavior unverified in the native host. |
| Linux desktop | Conditional on supported Obsidian host | Fixed behavior unverified in the native host. |
| Android | Conditional on supported Obsidian host | Touch drawer and restart unverified. |
| iPhone/iOS | Conditional on supported Obsidian host | Touch drawer and restart unverified. |
| iPad/iPadOS | Conditional on supported Obsidian host | User-confirmed on 2026-11-09 after delivery of China Hub Alpha 1.1.7-alpha.1: the Note Search title appears before tapping it after restart and looks normal after foreground return. Icon, prior panel selection, Split View and return after lock were not separately reported. |

Remaining native coverage includes a fresh layout, Split View and return after lock, plus the unverified hosts above. The entry is local and has no network dependency, background task, storage migration or cross-device protocol. Upgrade and rollback reuse the same view IDs and vault-local state. Account and vault isolation, sync progress, encrypted content, keys and source mtime are outside this UI change.

## CHG-20261107-CN-116-STABLE

China 1.1.6 promotes the delivered 1.1.6-alpha.1 with version-only metadata. All six platforms (Windows, macOS, Linux desktop, Android, iPhone/iOS, iPad/iPadOS) retain conditional support and unverified native installation, pairing and accessibility acceptance. Exact main.js/styles.css equality and a manifest version-only comparison bind reused Windows/WSL, browser and live compatibility evidence; promotion adds no device coverage. No new lifecycle, network, identity/vault, schema, mixed-version or rollback behavior is introduced. Keep local settings, secrets, checkpoints, content and source mtime when updating; existing Alpha and Stable assets remain available.

## CHG-20261107-CN-116-ALPHA1

China 1.1.6-alpha.1 combines hidden closed-order text, account-only pairing guidance and narrow identity layout fixes. Failed plan refresh remains visible and clears after recovery. Windows, macOS and Linux desktop, Android, iPhone/iOS and iPad/iPadOS are conditionally supported in Obsidian 1.12.7 or newer; native installation, real pairing and screen-reader acceptance on all six remain unverified. Windows/WSL checks and browser geometry are recorded separately and cannot replace native acceptance.

Review narrow/touch/enlarged fonts, disconnected/account-only/connected roles, account/vault isolation and offline plan refresh. Pairing still requires explicit vault selection and confirmation; no automatic connection or permission changes. Existing mixed-version protocol, content, encryption, checkpoints and source mtime remain unchanged. Upgrade replaces only program files and keeps local state; older Alpha and Stable assets remain available. Background/lock/reboot introduce no new behavior and are outside these presentation and entry-guidance changes.

## CHG-20261107-COMMUNITY-WARNING-REMEDIATION

Scoped CSS now uses ordinary selector priority instead of !important and keeps the narrow identity information wrapper in the layout/accessibility tree rather than display:contents. Full-width identity values and a following action row may make narrow cards taller. Hidden payment actions, enlarged labels, title visibility, LAN summaries and existing settings remain available. CONTRIBUTING.md adds contributor guidance without runtime behavior.

| Platform | Support | Native acceptance for this change |
| --- | --- | --- |
| Windows desktop | Conditional on supported Obsidian host | Unverified; Windows Chromium/WebKit models and Node checks pass, not native installation acceptance. |
| macOS desktop | Conditional on supported Obsidian host | Unverified; Windows WebKit does not establish macOS acceptance. |
| Linux desktop | Conditional on supported Obsidian host | Unverified; no native Linux desktop run. |
| Android | Conditional foreground UI in supported host | Unverified; narrow touch/layout models only. |
| iPhone/iOS | Conditional foreground UI in supported host | Unverified; WebKit models are not a physical iPhone. |
| iPad/iPadOS | Conditional foreground UI in supported host | Unverified; tablet/resize models are not physical split-view acceptance. |

CN/Global each pass 144 affected-layout cases / 928 inspections; Global adds 80 cases for all ten languages at 32px, 320/1280px widths, legacy/modern host contracts, light/dark themes, hidden/available payment controls and programmatic keyboard focus. These do not prove screen-reader behavior, custom-theme overrides or native keyboard navigation. Both builds/isolation and 27 focused billing/language tests pass. CSS triggers !important and display:contents are absent from source and built regional CSS; official rescan is pending the next publication. Seven reviewed network/safety-path lint warnings remain.

No new native API, background/lock/reboot, network recovery or protocol path is introduced; those scenarios are outside this presentation-only change. Mixed versions remain protocol-compatible. Updating/reverting CSS does not migrate data or alter identities, vault boundaries, keys, checkpoints, content or source mtime. No installed vault, Server or published asset was changed.

## CHG-20261107-GLOBAL-PAYMENT-INHERIT-LANGUAGE

Global Alpha.6 uses the existing plugin language fragment for the paired payment UI; Client runtime is unchanged. Windows/macOS/Linux desktop, Android, iPhone/iOS and iPad/iPadOS are conditionally supported through the existing browser handoff. All six native installations, touch/layout, foreground/background/lock/reboot, offline recovery and merchant return paths remain unverified for this change. Browser fixtures cover language selection, blocked storage, refresh, and old preferences; they do not establish native acceptance. No sync, identity, vault isolation, encryption, progress, original mtime or schema change. Previous Client versions without a language hint use browser defaults; reverting the payment UI may restore its language selector.

## CHG-20261106-GLOBAL-SUBSCRIPTION-MANAGEMENT

Requirement: Global Manage plan is always available, opening subscription management and order history. After confirmed renewal cancellation a new plan can be purchased immediately; successful payment replaces the old paid period with no credit/refund/carryover. The paired Server/UI is required in the next Alpha; a Client-only package does not deliver that behavior. China and synchronization content, encryption, keys, progress and original modification times are unchanged.

| Platform | Support | This change's native acceptance |
| --- | --- | --- |
| Windows desktop | Conditional: existing HTTPS/browser handoff | Unverified; Node/desktop browser automation is separate. |
| macOS desktop | Conditional: existing HTTPS/browser handoff | Unverified; Windows WebKit is not macOS. |
| Linux desktop | Conditional: existing HTTPS/browser handoff | Unverified. |
| Android | Conditional: existing mobile handoff/fallback | Unverified; modeled narrow layouts are not Android. |
| iPhone / iOS | Conditional: existing mobile handoff/fallback | Unverified; modeled WebKit is not iPhone. |
| iPad / iPadOS | Conditional: existing mobile handoff/fallback | Unverified; modeled widths are not iPad. |

Verification: Node v26.12.1 focused Client billing suites 31/31; paired Global critical suite 169/169, zero failures/skips. Both regional builds and closure checks pass. Windows Chromium/WebKit model 427 subscription/order states at narrow/desktop widths and enlarged fonts; final support-label translations have 70 additional narrow Chromium states. Chromium covers ten languages; WebKit covers English/Chinese/German/Russian. Models check document/button overflow and touch-target sizing, not physical-device support or real charges. No Alpha published in this task; the next Alpha still requires paired runtime and deployment/release gates.

Narrow/touch/enlarged-font layouts and keyboard access are applicable; no new native desktop API. Existing identity-bound tickets/fallback and payment-state rereads handle re-entry; real offline/background/lock/reboot, session expiry, native provider return and rotation/split-view are pending. Mixed-version Clients remain subject to Server cancellation/consent guards; an old Server conservatively refuses early repurchase. No schema migration; newer payment events and replacement blocks must survive rollback. Do not restore old paid time or overwrite newer payment events. No installed-vault or real payment operation is performed here.

## CHG-20261105-CN-FULL-PRODUCTION — China 1.1.5 delivery

China 1.1.5 has completed the full paired validation and real staging/production release flow, anonymous official asset checks, domestic download mirror and actual maintained Hub loader/download/hash/manifest/tamper checks. Fixed Client source is 2393a5c8653a70317dcaf002822fc58c5f6653f2; this entry changes documentation only. China keeps wujie-sync identity, domestic sign-in, billing and storage. Shared notes-first processing, safe account closure, readable failures, localized encryption UI, browser fallback and wrapping reach China without changing content/key/progress/source-mtime contracts. Overseas service rollout is separately owned.

| Platform | Support and evidence | Native boundary |
| --- | --- | --- |
| Windows desktop | Conditional shared features; full local automation and 832 browser cases / 5,120 inspections passed | No formal vault installation. Initial directory-rename EPERM failures retained alongside unchanged full-size successful retries; cause unresolved |
| macOS desktop | Conditional shared engine and UI | New China package not physically verified on macOS |
| Linux desktop | Conditional shared engine and UI; WSL automated checks and the same full browser matrix passed | WSL does not certify native desktop Obsidian |
| Android | Conditional host-allowed foreground synchronization and guarded browser handoff | New China native bridge, touch/rotation, lifecycle and update checks pending |
| iPhone/iOS | Conditional host-allowed foreground synchronization and guarded browser handoff | WebKit models and earlier Global feedback do not certify the new China package |
| iPad/iPadOS | Conditional host-allowed foreground synchronization and guarded browser handoff | Native split view, focus/handoff and lifecycle pending; do not infer acceptance from iPhone |

Narrow/touch/large-font geometry is modeled on Chromium/WebKit; no new desktop-native API is introduced. Background/lock/reboot behavior is bounded by the host, without unlimited mobile background promises. Automated reconnect, device revocation, legacy/mixed protocol and original-mtime cases passed within their recorded fixtures; native mixed-device updates remain unverified. Code-only rollback keeps each device's data.json, keys and progress and cannot undo cloud deletion/payment facts. Prior China capacity failure remains; this functional release is not a new capacity certification.

## CHG-20261105-GLOBAL-USER-PRODUCTION-ACCEPTANCE

On2026-11-05 the user reports production login and payment-page testing passed on iOS and Android. Mark that reported native scope accepted, superseding prior blanket unverified statements only for it. Specific Google/GitHub/email methods, successful charge/entitlement/refund, sign-out/closure and exceptional lifecycle flows were not enumerated. Device/build versions and iPhone versus iPad were not specified; do not separately certify both Apple device families. Windows/macOS/Linux desktop and distinct iPad acceptance gain no new result from this report. Earlier explicitly reported passes retain their own scopes. Evidence and limits: global-user-production-acceptance-2026-11-05.md. Documentation only; no runtime/layout/content/key/progress/source-mtime change.

## CHG-20261105-GLOBAL-CRITICAL-FLOWS

Requirement: Google/GitHub/email login, sign-out, account closure and payment form one mandatory Global workflow gate maintained privately with the Server. Public Client adds online/offline tests of the actual signOut method, including credential/session/billing cleanup and pending-auth identity isolation. Windows/WSL each pass 121 combined checks (67 Client); synthetic Node/Obsidian/provider/Stripe adapters do not certify native acceptance. Windows/macOS/Linux desktop and Android/iPhone/iPad retain conditional existing paths; current all-method/payment native full journeys are unverified on all six. Prior user-reported ordinary flows retain only their reported acceptance. Narrow/touch, split view, provider return/cancel, background/lock/restart, disconnected sign-out/relogin and mixed-version account/vault isolation require physical follow-up. No new API/layout, schema or content/key/progress/source-mtime change. Upgrade/rollback are test-only and never restore business data; private release tooling is not shipped in the public plugin.

## CHG-20261105-GLOBAL-STAGING-SPLIT-FULL-RELEASE

Global candidate 1.1.5 collects the maintained Alpha.4 fixes for full local/remote release validation. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS keep their individually recorded support guards and native acceptance gaps; infrastructure migration and Windows/WSL checks do not prove physical acceptance. Global staging moves to host02 with its own existing test identity/database/R2/Stripe configuration, while production stays on01 and China production is untouched. Global deployment scripts and targets are independent of domestic deployment entry points; safe test code may be shared. Reconnection, source mtime, mixed versions, encryption, account/vault isolation, narrow/touch layouts and background/lock/restart remain required checks according to impact. No production failover is activated; the five-minute recovery proposal is separately documented privately and remains unverified until drilled.

## CHG-20261104-GLOBAL-ALPHA-UI-AUTH

User-authorized Global Alpha 1.1.5-alpha.1 delivers the settings cleanup and browser sign-in recovery changes below. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS retain conditional host support and individually unverified repaired-candidate physical acceptance. The user will test iPad sign-in return and repeated settings refresh. Exact snapshot: 344 synthetic passes, one optional Server integration skip; both edition builds/isolation passed. Anonymous public artifact hashes verified, old 1.1.4 retained, no installed vault or service restarted. Hosted protocol and remote CI were not rerun for this Alpha, and no real-device or Wujie Hub installation is marked passed. Installation/rollback and full delivery evidence: global-alpha-ui-auth-2026-11-04.md.

## CHG-20261104-AUTH-RESUME-RETRY

Requirement: iPad Google sign-in leaves the login dialog waiting after returning, but manual Check sign-in succeeds (user report, installed version unspecified). This confirms manual completion works on the reported device, not the exact automatic-check failure. Source inspection identifies permanent polling cancellation after a transient error; synthetic regression reproduces and fixes that path. Global browser sign-in now retains bounded retry, reacts to focus/visibility/pageshow/online events and starts a check immediately. Hidden periodic checks pause; visible recovery resets backoff. Repeated return events share one in-flight check and one workspace selection. Expired flows, changed local identity/service and explicit authorization rejection stop automatic checking. Inline email verification and China login are preserved.

| Platform | Implementation/support | Physical acceptance |
| --- | --- | --- |
| Windows | Conditional: shared DOM events and foreground polling | Fix unverified in native host; synthetic checks only |
| macOS | Conditional: shared DOM events and foreground polling | Unverified; no device test |
| Linux desktop | Conditional: shared DOM events and foreground polling | Unverified; no desktop host test |
| Android | Conditional: checks resume when host execution returns | Unverified; no device test; do not infer failure from iPad |
| iPhone/iOS | Conditional: checks resume when host execution returns | Unverified; no device test; do not infer failure from iPad |
| iPad/iPadOS | Conditional: checks resume when host execution returns | Original issue/manual workaround user-reported; repaired candidate unverified |

No new layout/native desktop API; existing narrow-screen/touch controls remain and require native checks. Synthetic cases cover transient outage without return events, return after hidden state, network recovery, duplicate foreground events, expiry, changed vault identity, terminal rejection and disposal. Physical lock/background/foreground, process termination/restart and mixed-device flows remain unverified. No promise of polling while the OS suspends the host. Existing saved pending authorization can still be recovered by reopening sign-in within its expiry. Account/vault/service verification remains required before storing credentials; no encryption key, body, progress or source-mtime changes. Upgrade/rollback uses existing artifacts and OAuth storage format, with no migration or installation in this change.

Windows Node 26.12.1 validation: 344 tests passed, 1 optional local-Server integration test skipped; both edition builds and isolation checks passed. Community lint: 0 errors, 7 warnings in unchanged fetch/config-path code. These results are synthetic/build evidence, not native mobile acceptance or official Community approval.

## CHG-20261104-SETTINGS-DANGER-CLEANUP

Requirement: remove duplicate Danger zone entries during settings refresh and keep reused section headings current. Shared host DOM cleanup supports both regional editions and legacy/declarative settings; no native platform API is added. Regression checks cover repeated render without prior cleanup, late disposal, removal of danger-row styling before reuse, one remaining deletion action and changing account/preferences group labels. Existing deletion identity proof and final confirmation remain required.

| Platform | Implementation/support | Physical acceptance |
| --- | --- | --- |
| Windows | Conditional: shared Obsidian settings DOM | Unverified for this candidate; screenshot reports the original defect |
| macOS | Conditional: shared Obsidian settings DOM | Unverified; no physical host available in this check |
| Linux desktop | Conditional: shared Obsidian settings DOM | Unverified; no physical host check |
| Android | Conditional: shared Obsidian settings DOM | Unverified; narrow-screen/touch and resume pending |
| iPhone/iOS | Conditional: shared Obsidian settings DOM | Unverified; narrow-screen/touch and resume pending |
| iPad/iPadOS | Conditional: shared Obsidian settings DOM | Unverified; touch/split-view and resume pending |

Existing wrapping and 44px touch controls remain. Foreground/settings refresh is covered synthetically; background/lock/restart requires native acceptance. No new network request or persisted state is introduced, so offline recovery, mixed-version synchronization and upgrade/rollback formats are unaffected. Account/vault isolation, encryption keys, note bodies, sync progress and source mtime are unchanged. Rollback uses the previous plugin artifacts; no installed plugin is replaced in this change. Synthetic Windows checks do not constitute acceptance on any physical platform.

Validation on Windows with Node 26.12.1: full suite 339 passed, 1 skipped (the optional local-Server integration fixture); both regional builds and edition-isolation checks passed. Community lint completed with 0 errors and 7 warnings in unchanged fetch/config-path code; it is not official review. No installation or publication performed.

## CHG-20261104-GLOBAL-COMMUNITY-SUBMIT

Global remote diagnostic upload is disabled uniformly on Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS; local logs and explicit local export remain. Synthetic checks verify legacy outbox rejection, direct drain rejection and retained Android local diagnostics. Fresh physical acceptance is unverified on all six platforms. Timer cleanup uses the shared window API. No new layout/touch/native controls are introduced; lifecycle and offline retries cannot upload diagnostics. Account/vault isolation, mixed-version synchronization, encrypted bodies, source mtime and upgrade/rollback formats are unchanged. Existing preview snapshots are reproducible; no installed candidate or service is replaced by this preparation.

## CHG-20261104-GITHUB-COMMUNITY-PREP

Source delivery and Community preparation do not install a candidate on Windows, macOS, Linux desktop, Android, iPhone/iOS or iPad/iPadOS; fresh physical acceptance is unverified for all six. Pending-creation cleanup uses the shared host secret API and preserves origin/vault isolation when stored state is malformed. Synthetic tests cover cleanup/retry; native secure storage, touch/narrow layouts, browser return, lock/background/restart, offline recovery and mixed-version scenarios remain separate release checks. No source mtime, note body or encryption-format changes. No service deployment, binary publication or automatic upgrade; rollback retains the prior installed artifacts.

## CHG-20261104-REGIONAL-PARITY

Both China and Global use cloud-first account deletion with their own existing identity proof. Windows/macOS/Linux desktop/Android/iPhone/iPad are conditionally supported through shared Obsidian controls and online APIs; fresh physical acceptance is unverified for each. China has no new browser/email dependency; Global retains its system-browser/email path. Exact regional/staging authorities, account changes and old-service rejection are covered by synthetic tests. Wrapping/44px controls remain; native narrow-screen/touch, lock/background/restart, offline recovery and mixed-device acceptance remain pending. No local note body, key migration, progress or source mtime changes. Details: regional-parity-2026-11-04.md. No production deployment or release.

## CHG-20261103-GLOBAL-MOBILE-DEFERRED

User explicitly defers Android/PC mixed-device acceptance until production, with personal participation. Android installation, sign-in and synchronization remain NOT PERFORMED. No production promotion or real billing authorized. Credential-free plugin ZIP and three isolated synthetic PC notes prepared; formal vault untouched. Windows ordinary acceptance remains user-reported; macOS, desktop Linux, Android, iPhone and iPad physical acceptance remains unverified. Follow-up must cover body/source mtime, attachments, encryption, conflicts, offline/restart/background/lock and account/vault isolation.

## CHG-20261103-GLOBAL-ACCEPTANCE-AUDIT

2026-11-03: the user reports the overseas PC end-to-end flow passed, excluding payment, in the existing Windows Global-Test-Vault context. This supersedes older pending Windows ordinary-flow observations for the user's tested candidate. The report has no per-case or bundle-hash inventory; do not infer abnormal-network, quotas, lifecycle, mixed-version or every encryption operation passed individually. macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS still lack separate physical acceptance. Stripe user acceptance is outstanding; earlier agent sandbox evidence remains separate. See global-acceptance-audit-2026-11-03.md.

## CHG-20261103-ENCRYPTION-ENGLISH

Shared encryption controls use edition-localized labels and errors on Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS. All six remain unverified for native presentation of this candidate; Windows and WSL synthetic checks are not physical-device acceptance. Existing touch sheets and wrapping controls are retained; narrow-screen, touch, accessibility and long English labels require native checks. This text-only change does not alter lock/background/restart behavior, offline recovery, mixed-version ciphertext compatibility, account/vault isolation, synchronization or source mtime. The prior isolated plugin bundle is retained for rollback. No China installation or public release.

## CHG-20261103-GLOBAL-INLINE-EMAIL

Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS are conditionally supported through shared host UI and HTTPS requests. Email fields use email/numeric input hints and one-time-code autocomplete; controls wrap and have 44px minimum touch height. No desktop-only API. Physical six-platform, touch and lifecycle acceptance is pending; Windows/WSL synthetic checks do not replace it. Codes stay in dialog memory, not saved settings; interrupted/restarted flows can request another code under existing server throttles. Offline and changed/expired contexts fail safely. Old clients keep browser email login; rollback retains those routes and requires the previous bundle. No note body, encryption key, source mtime or CN behavior changes.

## CHG-20261103-GLOBAL-AUTH-REFRESH

Global account refresh is conditionally supported on Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS using the existing system-browser and host settings APIs. Synthetic tests check verified-account refresh, recovered flows and duplicate result checks; physical hosts, narrow-screen/touch, background/lock and network recovery remain unverified. Expired or changed account/vault contexts remain rejected. No synchronization, note body, source mtime or China login changes. Older plugins retain the stale-view issue; the previous isolated bundle is retained for rollback.

## CHG-20261103-GLOBAL-PUBLIC-PREVALIDATION

Global pending creation survives lost replies and restart using a short, vault-local Obsidian secret-storage identifier. It is bound to service/account/name; exact server replay returns the existing vault even at the Free cap. Passwords are never written to plugin data.json. Explicit sign-out ends the pending local operation; sign in and inspect existing cloud vaults before starting again. Deleted identifiers never recreate a vault. Older clients lack durable replay and must be upgraded for this behavior.

| Platform | Status | Acceptance boundary |
| --- | --- | --- |
| Windows | Conditional; synthetic checks passed | Node 26 tests/build; actual host reload denied access, user reload required |
| macOS | Conditional; unverified | Physical secure storage, browser return and restart not exercised |
| Linux desktop | Conditional; unverified | WSL validates code only |
| Android | Conditional; unverified | Touch/narrow screen, secret storage, background/lock/restart pending |
| iPhone/iOS | Conditional; unverified | Physical secure storage, lifecycle and browser return pending |
| iPad/iPadOS | Conditional; unverified | Physical touch/split view, storage and lifecycle pending |

No desktop-only entry was added. Offline/restart recovery, account/service isolation and quota replay have synthetic coverage; physical mixed-version, lock/background and narrow-screen acceptance remains pending. Existing synchronization, content and original source-mtime behavior is unchanged. Previous isolated bundle retained for rollback; rollback removes durable replay support.

Requirement: CHG-20261029-CROSS-PLATFORM-REQUIREMENT, user instruction2026-10-29. This is a mandatory review for each feature, not a claim that every device has passed acceptance. Update the affected rows when behavior or verification changes. A build or simulated platform flag is not physical device acceptance; WSL is not desktop Linux UI acceptance.

## Per-change record

### CHG-20261103-GLOBAL-HEADING — Global settings subtitle

Requirement: show the Global Smart Sync heading once by removing its duplicate subtitle. Retain the version, sidebar identity and China description. Shared settings definitions cover both legacy and declarative rendering; no new controls or native APIs are introduced.

| Platform | Implementation/support | Physical acceptance |
| --- | --- | --- |
| Windows | Supported by shared settings renderer | Unverified: no native Obsidian layout check in this change |
| macOS | Supported by shared settings renderer | Unverified: no macOS host check |
| Desktop Linux | Supported by shared settings renderer | Unverified: no Linux host check |
| Android | Supported by shared settings renderer | Unverified: physical narrow-screen/touch layout |
| iPhone/iOS | Supported by shared settings renderer | Unverified: physical narrow-screen/touch layout |
| iPad/iPadOS | Supported by shared settings renderer | Unverified: physical tablet/split-view layout |

Scenario review: removing static text reduces header content on narrow screens and changes no touch targets. Native capability, foreground/background/lock/restart and offline recovery scenarios are not applicable to this static subtitle. Identity/vault isolation, mixed versions, encryption, progress, bodies and source mtimes are unaffected. No persisted-state change; upgrade and code-only rollback require no migration. Automated validation is recorded in CHANGELOG.md and does not establish physical-device acceptance.

### CHG-20261102-NOTES-FIRST — planned 1.1.4

Staging follow-up, CHG-20261102-114-STAGING-DELIVERY: fixed Client `ff05792` passed full 19-gate/11-job Windows/WSL release validation and actual staging disk body/source-mtime plus cold-receiver acceptance (12+5). Both full UI matrices passed 832 scenarios/5120 inspections. Nine public ordering/cache regressions are included; 24 small files retain the original 48-decryption ceiling using bounded authenticated metadata reuse. Six live-service groups additionally cover earlier attachment history, ordinary/batch and full/incremental ordering, process replacement and retained 1.1.3-engine continuation of the 1.1.4 retry state. These live ordering hosts are synthetic in-memory adapters; disk validation is provided separately by the standard probes. Windows-only and optional skips remain recorded; optional three-device pairing passed separately on Windows and WSL. No physical device acceptance is added to any platform row below, no production promotion or public release is performed, and mobile OS execution limits remain unchanged.

Requirement: full/incremental synchronization must prioritize `.md` bodies before attachments, including ordinary/batch and upload/download paths. Structural directory/rename/deletion dependencies are processed first in feed order; these may involve an attachment revision. Bounded manifest inspection precedes receiving and may add metadata requests before the first note. Batch read-ahead never crosses from notes to attachment bodies. Existing remote note edits and queued local Markdown edits can interrupt attachment work at safe boundaries. An already active transfer or speculative read need not be cancelled. New remote note creation discovered during a running cycle is not guaranteed immediate priority; the next feed cycle handles it. Notes can appear before their embedded attachments.

| Platform | Implementation/support | Physical acceptance |
| --- | --- | --- |
| Windows | Supported by shared engine; synthetic Node checks, not native-host acceptance | Unverified in Obsidian for this feature |
| macOS | Supported by shared engine; no Windows/native dependency | Unverified: no macOS host available in this run |
| Desktop Linux | Supported by shared engine; no desktop-specific API | Unverified: no physical Linux/Obsidian run; Windows results do not substitute |
| Android | Conditional shared support while Obsidian can execute; existing transport/attachment guards retained | Unverified: physical network, storage pressure and foreground/background/lock/restart |
| iPhone/iOS | Conditional shared support while Obsidian can execute; no new background capability | Unverified: physical iPhone lifecycle, network and storage |
| iPad/iPadOS | Conditional shared support while Obsidian can execute; same shared scheduling | Unverified: physical iPad lifecycle, network and storage |

Scenario review: no new UI controls, touch targets or native startup behavior, so new layout/touch/native API testing is not applicable. Existing task statuses continue through attachments; a failed receive is not reported as full success. Original bytes/source mtimes, encryption and attachment deferral remain required. Synthetic coverage includes full/incremental send/receive, batch boundaries, uppercase `.MD`, mixed-size bodies, local note publication ahead of remote attachment bodies, newer local edits at file boundaries, cancellation/process replacement after a reordered checkpoint, failed-note continuation and checkpoint failure before writes. Existing complete regressions cover LAN/streaming, scope/key isolation, conflicts, renames, tree deletions, resume and mixed/legacy behavior. No wire/schema change; existing format-3 pending receives preserve code-only rollback compatibility. Older devices keep their previous ordering, and device-local state/credentials must not be copied. Real multi-device mixed-binary and OS lock/reboot/offline recovery remain unverified on all platforms; process-replacement simulation is not physical lifecycle acceptance. No real vault, installed plugin, service or release modified.

Validation: Windows Node 26.12.1 full suite 304/304 passed, zero skips, with `SMART_SYNC_SERVER_DIR` explicitly pointing to the local Server fixture for isolated three-device integration. Eight new ordering/recovery tests pass; the 2048 mixed-file case retains exact byte/mtime checks and now requires Markdown-first application. CN/Global builds, both 26-module isolation checks and diff whitespace checks pass. Community lint: zero errors, seven existing warnings in untouched runtime files. Runtime ZIP was verified against the pinned official SHA256 list. No macOS/Linux/mobile physical device or Windows native-host acceptance was performed. Earlier exploratory Node 24 run had the expected changed-order assertions plus an empty early-scan progress regression; the latter was fixed by omitting an empty note-upload pass, and the final unweakened scan regression passes.

### CHG-20261029-PLAIN-COPY-FOLLOWUP

User-approved Chinese literal rewrites only. Windows/macOS/desktop Linux: shared messages with existing native LAN/tray capability guards; physical UI and narrow-window wrapping unverified. Android/iPhone/iOS/iPad/iPadOS: shared sync/configuration/history messages; tray remains unsupported/hidden, no new native controls; physical touch/narrow-screen rendering unverified. Existing synthetic checks and builds do not establish real-device acceptance. Lifecycle/background/reboot, disconnected recovery, mixed versions, account/vault isolation, upgrade/rollback, body, keys, progress and source mtime behavior are unchanged; new runtime scenario tests are not applicable to these literal edits. No installation or publication.

### CHG-20261029-PLAIN-STARTUP-COPY

Chinese startup label and missing-registration hint only; the tray dependency warning quotes the new label. Windows: existing guarded support, text regression passes; native reboot acceptance and the longer label's narrow-window rendering unverified. macOS and desktop Linux: startup remains unsupported/hidden; no native changes or physical UI verification. Android, iPhone/iOS and iPad/iPadOS: startup/tray controls remain unsupported/hidden; physical-device acceptance not performed. Existing synthetic settings checks cover Windows, macOS and mobile hiding; they do not establish physical acceptance. Touch targets, native lifecycle, network recovery, mixed versions, account/vault isolation, encryption, progress, source mtime and upgrade/rollback behavior are unchanged by literal-text edits. Other copy changes require user confirmation. No installed data or release changes.

Record the requirement/CHG, affected platform capabilities, device/layout/input scenarios, compatibility and recovery impact, checks actually executed, evidence and remaining gaps. For each of Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS, distinguish implemented shared behavior, guarded native behavior, unsupported/not applicable, and unverified. Give reasons rather than leaving a platform blank. Choose targeted tests according to affected behavior; mark unrelated scenarios not applicable. Alpha candidates may retain explicitly disclosed user-host checks; do not promote them to passed or imply formal release acceptance.

## Current recent-feature matrix

Snapshot2026-10-29, through1.1.2-alpha.6. Shared means the implementation is shared, not that all hosts were tested.

Follow-up: alpha.6 audit and repairs are documented in [cross-platform-audit-2026-10-29.md](cross-platform-audit-2026-10-29.md). Both complete runtime suites pass, including a paired synthetic three-device service run.84 notebook-dialog and72 shared-settings browser scenarios pass. This adds macOS/Linux copied-preference protection, actual local registration checks and moved/copied-vault ownership handling; physical-device acceptance remains pending as below.

| Feature | Windows | macOS | Desktop Linux | Android | iPhone/iOS | iPad/iPadOS | Evidence and gaps |
|---|---|---|---|---|---|---|---|
| Per-notebook cloud logical size | Shared | Shared | Shared | Shared | Shared | Shared | Synthetic summary/error/stale-response checks pass; real account/device rendering not accepted for every platform. |
| Compact notebook manager | Shared | Shared | Shared | Shared, touch | Shared, touch | Shared, touch |84 Chromium/WebKit cases cover phone/tablet/desktop sizes, enlarged text, landscape and light/dark themes;44px mobile target checks pass. Physical devices pending. |
| Reduced notebook/LAN explanatory text | Shared | Shared | Shared | Shared | Shared | Shared | Summary and legacy DOM checks pass; underlying fallback logic is unchanged. |
| Bounded prefetch/incremental logs/checkpoint optimization | Shared | Shared | Shared | Shared, runtime guarded | Shared, runtime guarded | Shared, runtime guarded | Windows/WSL synthetic byte/mtime/recovery and ordering coverage; no per-device end-to-end performance guarantee. |
| Background operation with tray | Guarded desktop native | Guarded desktop native | Guarded desktop native | Not applicable: control hidden | Not applicable: control hidden | Not applicable: control hidden | Window/tray lifecycle doubles pass; physical macOS/Linux tray/shell behavior pending. Mobile OS background suspension is not bypassed. |
| Launch current vault to tray at login | Implemented, explicit opt-in, default off | Unsupported: control hidden, no startup entry | Unsupported: control hidden, no startup entry | Unsupported: control hidden | Unsupported: control hidden | Unsupported: control hidden | Synthetic shortcut ownership/rollback, routing marker and tray reachability pass; real Windows logout/reboot/cold protocol dispatch pending. |

## Applicable scenario checklist

- Interface: narrow and large screens, touch targets, mouse/keyboard, enlarged font/zoom, scrolling/wrapping, dark/light themes; phone portrait/landscape and tablet split view where applicable.
- Native host: capability detection, missing APIs/permissions, safe visible fallback, window close vs vault close vs app exit, multiple windows/vaults, focus restoration and resource cleanup.
- Lifecycle: first launch, normal manual launch, supported OS login startup, sleep/wake, lock/unlock, mobile foreground/background, process termination and restart; do not promise unlimited mobile background execution.
- Synchronization: disconnection/reconnection, interrupted writes/commits, retries, cancellation, unchanged manual-stop intent, body and source mtime, memory/storage pressure where the change affects it.
- Identity and compatibility: account/vault switching, same-name vaults, revoked credentials, mixed versions and device classes, isolated device-local state, old state compatibility, upgrade and code-only rollback. Never copy one device's data.json or secrets to another.
- Unsupported platform: hide or clearly mark unavailable controls; ensure native initialization does not fail loading the shared synchronization functionality.

## Current issues/acceptance gaps to communicate

1. Windows startup is not yet physically accepted after logout/reboot; a brief host window appearance and cold URI timing remain user-host integration questions. Fail visible if the tray is unavailable.
2. macOS and desktop Linux tray behavior has no physical acceptance evidence. The Windows startup feature is intentionally unavailable there; it is not a completed cross-platform startup implementation.
3. Android/iOS/iPadOS recent UI and performance behavior needs actual devices. Desktop/WSL results do not establish mobile memory, background or touch acceptance.
4. Disable the Windows startup switch before uninstalling or rolling back to an older plugin that does not support its custom launch handler. Plugin unload/restart intentionally preserves the startup shortcut; code-only rollback does not automatically remove it.

These gaps do not mean a defect has been reproduced on each platform. If a defect or material new risk is found, report it with its trigger, affected devices/versions, data impact, workaround and verification status, then address it without silently removing features.

## Native follow-up: local alpha.7

Windows A/B native tray and isolation checks are recorded in windows-native-startup-2026-10-29.md. Custom profiles are now refused for login registration because the host warm CLI pipe can route across profiles; ordinary trays remain available. Default-profile cold startup and OS login/reboot remain unverified. This does not change the unsupported status of login startup on macOS/Linux/Android/iOS/iPadOS, or establish their physical-device acceptance.


## CHG-20261029-PORTAL-INTEGRATION: replace existing entries only
Windows/macOS/Linux desktop/Android/iPhone/iPad: guarded support through the existing purchase action; physical-device browser handoff/touch/lifecycle unverified. No new controls. CN Alpha production new-purchase/renew actions open the read-only pay URL without credentials, query or fragment; new real payments are disabled there. Existing orders and Stable/Global/local/staging behavior remain. No account/vault, OS, content, progress or source-mtime changes. User/download entry is not a plugin button. Restricted-network denial does not affect synchronization. Synthetic UI checks do not substitute for real devices.

## CHG-20261029-ANDROID-FALLBACK — Alpha.9

Windows/macOS/desktop Linux/iPhone/iOS/iPad/iPadOS: new transport disabled; original fetch path retained, physical acceptance not performed. Android: guarded native compatibility after a network failure and signed authority validation; connection mode memory-only, same HTTPS authority, no settings migration or failed-write replay. Synthetic cancellation, isolation, body/mtime and diagnostics tests only; actual tablet WebView/native connectivity, TLS, lifecycle and full synchronization are pending. Host requestUrl buffers replies and cannot cancel its underlying operation; delayed results are ignored with four-operation cap. Server TLS evidence applies only to tagged requests that reach the TLS endpoint. UI/narrow-screen changes are not part of this change; upgrade/code-only rollback retain configuration and keys.



## 1.1.2 portal integration correction

Supersedes the read-only alpha.8 proposal: existing purchase/order controls perform real authenticated operations against the new pay domain; staging retains its isolated pay-test business path. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS: guarded shared browser handoff and user webpage/download support; physical host acceptance is unverified on all six. No new user/download buttons. User web login keys stay in page memory, never URLs/storage; the same authorization, notebook and device isolation applies. Narrow/touch, network recovery and enlarged text must be checked proportionately. Upgrade/code-only rollback preserves per-device data.json and keys; old URLs remain until explicit cleanup. These web changes add no OS startup/background capability. Windows/WSL/synthetic results are not mobile acceptance.


## 1.1.2-alpha.10 — CHG-20261029-ALPHA10-FULL-PORTALS

Requirements: the user requests the entire in-flight release, including independent real pay and manage, as one Alpha.10 candidate for production and staging. Includes all registered unpublished Client work already collected in ec59e71: notebook usage and compact settings, startup/tray ownership, guarded Android Alpha native transport, real authenticated purchase/renew/order handoff to the new pay origin, and retained legacy ticket compatibility. Existing controls are replaced, with no new user-center/download controls. User web/download and Wujie Hub addresses use the new user domain; legacy routes remain until explicit later cleanup. Alpha is real business. Preserve per-device data.json, credentials, checkpoints, isolation and source mtimes. Full Windows/WSL and staged service acceptance remain mandatory; physical mobile/desktop hosts and real merchant payment/refund acceptance are separately unverified. No completed production switch or publication is claimed here.

Windows/macOS/Linux/Android/iOS/iPadOS retain their recorded guards and unverified physical-host boundaries. Alpha.10 enables only the previously authorized Android Alpha transport branch; stable behavior is unchanged. Narrow/touch, lifecycle/network recovery, mixed versions, account/vault boundaries and code-only rollback remain acceptance requirements; web-domain switching adds no mobile background capability.

## CHG-20261029-MOBILE-PLUGIN-TOMBSTONE

Requirement: removed plugin manifests must not repeatedly fail receiving on mobile. Windows/macOS/Linux desktop: supported shared tombstone path; Android/iPhone/iOS/iPad/iPadOS: guarded support, skip installation compatibility validation only for authenticated removal records. Live plugin installation compatibility checks remain. Synthetic mobile/desktop regression covers absent manifest/code, following note/source mtime and checkpoint restart; physical hosts on all six platforms remain unverified. No UI/touch changes; narrow-screen interaction is not applicable to this engine-only fix. Network/background/lock/reboot behavior is unchanged and real-device recovery remains unverified. No protocol/schema changes; mixed versions keep wire compatibility but older mobile clients retain this failure. Identity/vault scope, keys, encryption, deletion conflict safeguards and data.json remain unchanged. Code-only rollback preserves state but restores the old failure. Source-only fix: no release, service restart or production-vault edits.


## Stable 1.1.2 — CHG-20261029-112-STABLE

The user reported Alpha.10 tests passed and approved stable publication including the startup copy and six additional plain-language hints. This does not identify every tested device or scenario, so it is not a six-platform physical acceptance claim.

| Platform | Stable behavior and applicability | Acceptance boundary |
| --- | --- | --- |
| Windows | Shared sync, approved Chinese copy, notebook UI, real billing handoff and guarded desktop tray; login-to-tray explicit opt-in/default off, custom profiles refused | Full fixed-candidate Windows checks required; actual OS login/reboot remains separately unverified |
| macOS | Shared sync/copy/UI/billing; Windows startup entry hidden; tray capability guarded | No new physical-host evidence; copied Windows settings must not block supported actions |
| Desktop Linux | Shared sync/copy/UI/billing; Windows startup entry hidden; tray capability guarded | WSL results are not physical Linux desktop/Obsidian acceptance |
| Android | 1.1.2 recognized stable metadata now enables the same guarded native compatibility previously exercised in Alpha; deleted-plugin records bypass installation checks only when removed | User-reported Alpha.10 acceptance retained without inventing specific phone/tablet coverage; final stable device/network/background/lock/restart checks remain separately recorded |
| iPhone/iOS | Shared sync/copy/UI/billing; Android native path and Windows startup hidden/inactive | Desktop WebKit is not iPhone physical acceptance; foreground/background restrictions remain |
| iPad/iPadOS | Shared sync/copy/UI/billing; narrow/split-view wrapping retained; Android native path and Windows startup inactive | Viewport simulation is not iPad physical acceptance; actual multitasking/lifecycle remains separately verified |

No new breakpoint or control is introduced by the wording changes, but longer hints/startup text need the maintained narrow/touch, enlarged-text and dark/light matrix. Stable promotion keeps identity/vault scope, mixed-version protocol, encrypted contents, keys and original mtimes. Upgrade/rollback changes program files only and preserves each device's data.json/progress; rollback to older mobile code can restore the deleted-plugin failure. The native version gate rejects unknown/missing metadata and preserves caller-supplied transport; no failed write is automatically replayed.


## Stable 1.1.3 — CHG-20261029-SYNC-RESPONSIBILITY

Purchasing, renewal and plan reads use the canonical payment service directly. Retired sync browser/business endpoints fail closed without redirection; sync/authentication/device protocols remain. The user webpage is served independently and invokes only the account/notebook/device APIs it needs. Operator-closed unpaid orders show a terminal label without resume-payment actions. Upgrade preserves each device's data.json, keys and sync checkpoints; old clients need an update for purchasing and plan reads.

| Platform | Support and checks | Physical acceptance |
| --- | --- | --- |
| Windows | Shared HTTPS/native host integration; pinned unit/integration and full UI automation passed | Not performed this release |
| macOS | Guarded shared sync and standard HTTPS handoff; Windows-only startup remains hidden | Unverified |
| Desktop Linux | Shared implementation; WSL checks passed, distinct from desktop Obsidian | Unverified |
| Android | Shared protocol plus identity-verified native payment fallback in the stable build; unknown versions fail safely | Foreground/background, lock, restart and network recovery remain unverified on devices; staging payment subpath native fallback not claimed |
| iPhone/iOS | Shared HTTPS and Obsidian handoff; existing native feature guards retained | Unverified; desktop WebKit is simulation |
| iPad/iPadOS | Shared HTTPS and narrow/split-view layout | Unverified on physical iPad |

Fixed Windows/WSL UI matrices passed 832 cases and 5120 inspections each. Synthetic scope/isolation, mixed versions and source-mtime checks are not physical-device acceptance. No new OS startup/tray capability is introduced. Code rollback retains local state but older servers may lack the new payment identity endpoint; never silently re-enable retired URLs as a fallback. Shared host/database and maintenance coordination remain; independent programs do not imply complete failure isolation.

## Global workflow parity — CHG-20261102-GLOBAL-PARITY

Requirement: retain the maintained CN Client features and interaction flow in the English Global build, using independent Global service and payment origins. Complete catalog resources, localized failures, progress/application text and the same plan-card/payment entry workflow. Do not change CN production or publish a new plugin Release. Global managed-web sign-in is English; post-login manage/user pages remain Chinese by the user's explicit exception.

| Target | Status | Evidence and remaining acceptance |
| --- | --- | --- |
| Windows | Conditional; physical Obsidian unverified | Pinned-runtime synthetic suites and builds; no installation or formal vault migration |
| macOS | Unverified | No physical host; platform guards retained |
| Linux desktop | Unverified | WSL tests are runtime/protocol evidence, not physical desktop acceptance |
| Android | Unverified | Existing native transport/authority isolation retained; real checkout handoff, suspension/lock and reconnect pending |
| iPhone/iOS | Unverified | Compiler compatibility target retained; physical browser/app return and background acceptance pending |
| iPad/iPadOS | Unverified | Physical touch/split-view and lifecycle acceptance pending |

Assess mixed-version account/vault isolation, offline recovery, safe upgrade/rollback and source modification times using the existing regression suite. English completeness and build success do not prove all-device production readiness. Existing vault contents, secret namespaces, retained progress and original mtime rules remain unchanged.

## CHG-20261102-GLOBAL-PRICING

Requirement: user adds Global Free50MB/3vaults/3device authorizations and configurable paid caps, monthly list prices unchanged/annual20%off. Recognize global-free in the existing billing card and show its50MB title; CN free100MB presentation remains. Targeted Global tests3/3 and both regional builds passed. Server enforces limits; no formal Client Release. Multi-language following Obsidian is separately planned, not implemented (GLOBAL-LANGUAGE-PLAN).


## Global new-account sign-in candidate — CHG-20261102-GLOBAL-SOCIAL-AUTH

Requirement: user approved Google, GitHub and email-code registration and explicitly excludes old-user migration/compatibility because Global has not launched. Global enrollment opens the system browser, keeps the PKCE verifier in device-local secret storage, resumes the same unexpired flow and requires verified account/device identity before saving credentials. Cancellation, expiry, region/local-device changes and already-connected vaults prevent stale writes. Provider buttons reflect server configuration; email-code fallback and manual checking remain available when enabled. Existing encrypted-vault selection/password creation is preserved. CN enrollment is retained; no CN running service change, public release or real billing.

Pinned Node 26.12.1 full Windows suite passed 310/310. WSL passed 309 with one platform-specific skip. CN/Global builds and both 26-module closure checks passed. These are synthetic/runtime checks; no real Google/GitHub account, SMTP inbox, browser layout or physical Obsidian acceptance has passed. The server candidate needs OAuth client configuration and deployment before this Client is installed. The current isolated test vault has not been overwritten with this candidate.

| Platform | Status | Remaining acceptance |
| --- | --- | --- |
| Windows | Conditional implementation; physical host unverified | External-browser return, secret storage, cancellation/restart and real provider login |
| macOS | Unverified | Physical host, system browser and secret storage |
| Linux desktop | Unverified | WSL checks do not validate desktop Obsidian |
| Android | Unverified | Touch, background/lock/restart, browser return and offline recovery |
| iPhone/iOS | Unverified | Real browser/app return, secure storage and lifecycle |
| iPad/iPadOS | Unverified | Touch/split view, browser return and lifecycle |

Device authorizations are server-enforced and revocable; a browser billing session consumes no device slot. Mixed candidate/server versions hide unconfigured providers and fail safely without a legacy-login fallback. Source-mtime, ciphertext, account/vault isolation and existing sync progress remain governed by maintained tests. No schema/content conversion or formal-vault migration. Expired flows require restarting sign-in; background execution is not guaranteed. Multilingual following of Obsidian remains planning-only.
## CHG-20261103-GLOBAL-AUTH-ROUTES

Global Google/GitHub/email sign-in: corrected the shared payment transport's route guard to permit only the four approved Global auth endpoints. Windows and WSL synthetic transport tests pass 13/13 each; WSL is not Linux desktop acceptance. Windows Obsidian candidate is installed only in the isolated test vault, with native reload/browser return still pending. macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS remain unverified on physical devices. Narrow-screen/touch, background/lock/restart and offline/resume remain unverified; existing PKCE expiry and account/vault context guards are retained. CN transport rejection is tested. No synchronization or source-mtime path changes; mixed old Global candidates retain the known missing-login limitation until upgraded. Prior candidate is retained for rollback, though rolling back restores the defect.
## CHG-20261103-GLOBAL-AUTH-UI

Global login presentation uses theme variables, 46px provider buttons, text labels independent of decorative brand icons, a polite status region and narrow-container wrapping. Google and GitHub marks are bundled; GitHub masking includes the WebKit prefix for older supported Safari/WebView engines. Windows browser simulation at 320px and light/dark web rendering are checked; this does not verify native Obsidian rendering. Windows native reload, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS remain unverified for this presentation. Background/lock/restart, offline recovery and mixed versions retain existing authorization guards but have no new physical acceptance. The existing account/vault binding and original content/mtime paths are unchanged. The preceding candidate is retained for rollback. Actual brand assets do not require third-party image network access.

## CHG-20261103-GLOBAL-SECRET-ID

Follow-up: Windows native Obsidian connected an existing cloud vault; no sync round was initiated. The earlier pending native retry is now verified for connection only.

## CHG-20261103-READABLE-ERRORS

### CHG-20261103-DELETE-VERIFY-UI

Global deletion verification now has explicit purpose-specific English copy. Windows native observation confirms the old wording was misleading; following the user's completed flow the UI is signed out and the service confirms closure. This is not a fresh registration-to-deletion run entirely operated by the agent. New-copy native reload remains pending. Windows and WSL each pass the 19 focused error/auth/connection tests; the verification-dialog regression returns to deletion without vault selection or credential replacement. macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS are conditionally supported through the existing browser flow but physically unverified. Narrow-screen/touch and lock/background/restart remain unverified; wrapping paragraphs and existing expiring/context-bound flows remain. No note, key, protocol, mtime or CN changes. Prior isolated candidate is retained for rollback.

Windows has native connection evidence and synthetic error/retry coverage; exact new error presentation after reload remains pending. macOS and desktop Linux are conditionally supported via shared APIs but physically unverified; WSL is synthetic evidence only. Android, iPhone/iOS and iPad/iPadOS are conditionally supported via shared APIs; native layout, touch/narrow-screen, lock/background and restart acceptance are unverified. No desktop-only control was added. Persistent form errors use paragraph wrapping and a polite status region. Network cancellation and account/vault isolation are tested synthetically. Creation retry caches a received success only within the open form; lost responses and older candidates retain the documented limitation. Prior candidate is retained for rollback. Existing full synthetic regression covers body and original source mtime. No China installation or cloud deletion is performed.

### Original secret-ID validation record

Global secure-storage identifiers now fit Obsidian's 64-character limit with a real UUID; China keeps its existing identifiers. Windows synthetic first-connection, restart, per-vault isolation and credential cleanup are checked, including reproduction of the previous failure. Windows native retry remains pending; macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS remain unverified on physical devices. The shared secure-storage API is used on all six platforms; no desktop-only API or UI was added. Narrow-screen/touch layout is unchanged. Background/lock and offline recovery were not newly exercised; failed sign-in must reuse an existing cloud vault rather than creating more. Mixed old Global builds retain the defect; rollback requires the retained prior bundle and does not constitute successful connection acceptance. No cloud data, local note content, sync progress or source mtime is migrated.

## CHG-20261103-GLOBAL-ACCOUNT-LIFECYCLE

Global Account → Danger zone → Delete account is conditional on an authenticated account and a supported Global server; CN gains no new deletion or social-login UI. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS are conditionally supported using the system browser, online identity verification and server-side deletion; physical acceptance is unverified on all six categories. Windows/WSL synthetic tests do not establish native acceptance.

The server rechecks zero vaults and completed cleanup, recent identity proof and exact confirmation. Reauthentication uses existing Google/GitHub/email PKCE routes without another device grant, handles device-cap exhaustion, and preserves the current encrypted-vault connection. Pending callbacks and dialogs are bound to their local account context. Offline, expired, canceled or changed contexts fail safely; no deletion success is inferred from a lost response. Background/lock/restart retain expiring device-local flow storage, but physical lifecycle/recovery tests remain pending. Danger-zone controls wrap and have 44px minimum touch height; native narrow-screen, touch, keyboard and accessibility tests remain unverified. Local note bodies and source mtimes are not changed by this feature. Older Global candidates cannot bypass the new cloud-cleanup prerequisite; they must upgrade to use deletion. The previous isolated plugin bundle is retained; a backend rollback after real deletion must retain the identity-closure guard and billing cleanup, never restore deleted identities from an old database.
## CHG-20261104-MOBILE-BILLING-LINK — storage upgrade browser handoff

Requirement: latest-plugin iOS user reports Get more storage silently does nothing. Existing code awaits account and billing-entry requests before window.open; WebKit transient activation can expire before asynchronous completion (https://webkit.org/blog/13862/the-user-activation-api/). This is a plausible cause, not a device-confirmed diagnosis. Mobile now shows a native user-tapped browser link after existing exact-origin/path/ticket validation. Desktop retains its existing opening behavior. No account identifiers are stored in these records.

| Platform | Support / acceptance |
| --- | --- |
| Windows | Existing desktop opening retained; synthetic checks only, native host unverified this change |
| macOS | Existing desktop opening retained; physical host unverified |
| Linux desktop | Existing desktop opening retained; physical host unverified |
| Android | Guarded mobile native-link flow; physical host unverified |
| iPhone/iOS | Guarded mobile native-link flow; reported defect, fix awaiting physical retest |
| iPad/iPadOS | Guarded mobile native-link flow; physical host unverified |

Narrow-screen/touch: one labeled native link in the existing modal; actual touch/layout unverified. Background/lock/restart: link is single-use and locally expires after 90 seconds (service tickets last 120 seconds); close and reopen to obtain a fresh entry. Network errors continue through existing feedback; there is no automatic payment retry or offline checkout. Repeated tapping, dialog close, account/origin switch and expiry reject stale links. Mixed-client versions and rollback do not change service contracts or stored data; older clients retain the reported risk. Identity/vault isolation, encryption, sync body/progress/source mtime and desktop native capabilities are unchanged. No host installation, service deployment or plugin Release performed. CHG-20261104-MOBILE-BILLING-DEFER: user schedules this fix for the Alpha after the next Alpha; exclude it from the immediately upcoming Alpha and verify candidate source/artifact contents at freezing. All six physical platform families remain unverified.

Executed on Windows Node 26: full suite 347 tests, 346 passed / 1 explicitly skipped integration test (external Server path not configured), zero failures; both regional builds and isolation checks passed. Community lint completed with zero errors and seven existing warnings (fetch/config-path); physical acceptance remains pending.
## CHG-20261104-GLOBAL-MOBILE-ALPHA — publication retry

Global 1.1.5-alpha.2 is now published and discoverable using the maintained Hub's actual combined-feed loader/download implementation. Windows anonymous HTTPS verification checks all three install-file hashes and manifest identity/version, rejects synthetic corruption, and independently confirms ZIP hash. Server verifies all eight published files; existing history, service process identities and Caddy configuration retained. This supersedes the earlier deferred schedule/incomplete-upload status for this fix. Windows/macOS/Linux/Android/iPhone/iPad native Hub installation and repaired billing handoff remain physically unverified; shared feed/contract verification is not iOS acceptance. See global-mobile-alpha-2026-11-04.md.
## CHG-20261104-GLOBAL-USER-DEVICE-ACCEPTANCE — user-reported login and deletion

On 2026-11-04 the user explicitly reports physical iOS, Android and Windows login/deletion testing passed. These reported workflows now have user acceptance; prior blanket unverified statements are superseded only for that reported scope. Screenshots show the post-cloud-vault-deletion disconnected/stopped state with local notes kept, and one visible collapsed Danger zone. They do not separately prove account closure or content/mtime hashes. iOS device subtype and exact installed build were not supplied; do not independently mark both iPhone and iPad models tested. macOS/Linux and unreported scenarios remain pending. Storage-upgrade opening and compact pricing layout are not included in this report. Evidence and privacy boundaries: global-user-device-acceptance-2026-11-04.md. Documentation only; no new account operation, test execution, installation or deployment.
## CHG-20261104-AUTH-DELETE-EXCEPTIONS

User-reported storage entry/layout, ordinary iOS/Android/Windows complete synchronization and interruption recovery now have user acceptance; detailed destructive/login exception coverage remains separate. Repaired account-bound sign-in/reauthentication, lost claim/vault-list completion, newer-flow preservation, canceled late picker and closed/queued delete confirmation cases are exercised with synthetic host fixtures and loopback services. These are conditionally shared across Windows/macOS/Linux desktop/Android/iPhone/iPad; only Windows/WSL automated runtime checks are claimed here, not new physical six-platform acceptance. Existing manual-check UI is exposed during pending inline completion, with no CSS/native API change. Background/lock/restart, touch and native scheduler limits remain unverified for the repair; cloud deletion proof, encrypted body, keys, progress and source mtime are preserved. New local reauthentication metadata contains a credential hash only; old pending reauthentication restarts safely, with no service protocol migration. No release, deployment or real-account mutation. Full evidence: auth-delete-exceptions-2026-11-04.md.
## CHG-20261105-GLOBAL-ALPHA3

Global 1.1.5-alpha.3 publishes the login/deletion exception repairs for user retesting. Exact snapshot: Windows 355/355, WSL 354 passed/one Windows-native skip; local paired service integration ran on both, and both regional builds/closure checks passed. Anonymous production downloads and actual maintained Hub loader/download/hash/manifest checks passed, preserving older packages. Static download publication did not restart application services or alter accounts/vaults. Windows/macOS/Linux desktop/Android/iPhone/iPad remain conditionally supported; prior ordinary user-reported flows remain accepted, repaired exception/native update/lifecycle cases require per-device confirmation. No new OS-native API or CSS; existing foreground recovery and touch/manual-check boundaries remain as documented. Upgrade can require restarting an old pending deletion verification; program-file rollback does not undo cloud operations. Checklist and exact source/version/hash: global-alpha3-2026-11-05.md.
## CHG-20261105-GLOBAL-ALPHA4 — direct-first storage browser opening

Mobile no longer always presents My plan before opening. Global prepares a validated account/vault/origin-bound 90-second in-memory plan ticket while loading settings, then consumes it synchronously on click; background preparation never navigates, enrolls or charges. Mobile first tries opening directly, observes blur/hidden/pagehide, and only offers its native-link fallback on a thrown error or absent handoff acknowledgement after 1.5s while still live/visible. Null noopener/native return is ambiguous, not an automatic failure. Android/iPhone/iPad need physical bridge/focus/split-view testing; a side-by-side browser or slow launch may give no acknowledgement and still cause the fallback. Windows/macOS/Linux desktop retain their direct path; Windows/WSL checks do not certify native six-platform behavior. Identity change, expiry, sign-out/unload and repeated attempts invalidate prior monitors/tickets; no content/key/progress/source-mtime or server/Stripe contract changes. Existing narrow-screen/touch controls remain. Old-client/mixed-version APIs and code-only rollback remain compatible. User explicitly authorizes publishing alpha.4 after verification. Full evidence: global-alpha4-2026-11-05.md.

## CHG-20261105-GLOBAL-ENGLISH-ACTION-WRAP

Global release validation reproduces clipped Sign out of this account / Manage devices labels at the430px iPhone-large modeled viewport with32px interface text, both legacy/current host contracts. Account/device actions now wrap within their control width and grow vertically while preserving minimum touch targets. All six platform families retain conditional shared CSS support; Windows/WSL Chromium/WebKit matrices provide browser geometry evidence only. Physical Windows/macOS/Linux/Android/iPhone/iPad large-font/touch/rotation checks remain unverified. No native API, lifecycle, account/vault/encryption/body/progress/source-mtime or mixed-version protocol changes. The wrapping rule also applies outside container queries, so older hosts receive the same safe text wrapping; actual legacy hosts still require independent acceptance. Code-only program rollback restores prior layout; domestic production is untouched. Full corrected-candidate matrix results follow separately.


## CHG-20261105-GLOBAL-ENGLISH-ACTION-WRAP — delivery evidence

Global 1.1.5 is published from the fixed runtime source 4643be73e0a87b614c68db15ffc83c734177a159. Full paired local validation, Windows/WSL jobs and actual staging/production body/source-mtime and cold-receiver checks passed. The additional Global English matrix passed 832 cases / 5,120 inspections with 0 failures on each Windows/WSL platform, across Chromium/WebKit, modeled legacy/current host rendering, narrow/fold/rotate/desktop viewports and enlarged fonts. This confirms the reproduced 430px / 32px account/device label clipping is repaired in those modeled browser paths. The actual maintained Hub parser/download/manifest/hash/tamper path and anonymous stable downloads pass; no formal vault was installed or migrated by this delivery.

| Platform | Exact repaired-build acceptance |
| --- | --- |
| Windows | Automated runtime/browser checks pass; native Obsidian large-font/handoff acceptance remains unverified |
| macOS | Shared guarded CSS/runtime support; physical acceptance remains unverified |
| Linux desktop | WSL runtime/browser evidence only; native Linux desktop acceptance remains unverified |
| Android | Existing conditional mobile path and safe wrapping; physical large-font/browser-return checks remain unverified |
| iPhone/iOS | Existing conditional mobile path and safe wrapping; physical Safari/Obsidian handoff/lifecycle checks remain unverified |
| iPad/iPadOS | Existing conditional mobile path and safe wrapping; physical split-view/lock/return checks remain unverified |

Earlier user-reported ordinary iOS/Android/Windows flows retain their recorded scope; no unnamed iOS subtype is promoted to both iPhone and iPad acceptance. The one separately authorized staging mailbox-delivery check passes; real Google/GitHub consent, hosted-card flow and native six-platform acceptance remain separate. No new native API, sync/body/key/progress/source-mtime contract or background behavior is introduced by the CSS fix. Program-file rollback restores the old layout without undoing cloud operations.


## CHG-20261106-GLOBAL-DOCS-I18N

English documentation refresh for published Global 1.1.5; no runtime changes or new locales. Windows/macOS/Linux desktop/Android/iPhone/iPad retain their existing conditional host support and separately recorded acceptance. Manual distinguishes guarded desktop tray, Windows-only startup and mobile foreground/browser-return limits. Documentation/build/link checks do not constitute new physical-device acceptance. Native APIs, background/lock/reboot, offline synchronization, mixed-version interoperability, account/vault isolation, content, keys, checkpoints and source mtime are unchanged; new runtime scenario testing is not applicable to this text-only change. Static narrow/touch layout and actual device accessibility remain separate checks. Website/doc rollback restores prior text only.

## CHG-20261106-GLOBAL-I18N

Ten Global locales, local device/vault preference and reload-only switching; China stays isolated.

| Platform | Support and verification for this change |
| --- | --- |
| Windows | Shared implementation; Node tests and modeled browser layout passed; physical Obsidian acceptance pending |
| macOS | Shared implementation; physical host and browser-return acceptance unverified |
| Linux desktop | Shared implementation; WSL Node tests passed; physical Linux desktop acceptance unverified |
| Android | Conditional foreground/browser handoff support retained; real touch, font scaling and lifecycle acceptance unverified |
| iPhone/iOS | Conditional foreground/browser handoff support retained; physical Safari/Obsidian return and lifecycle acceptance unverified |
| iPad/iPadOS | Conditional support retained; physical split-view, touch, font scaling and lifecycle acceptance unverified |

Windows Client 368/368; WSL 367 passed/one Windows-specific skip; final locale/parity checks 34/34; both builds/closure checks passed. Synthetic three-device integration ran with isolated Server. Modeled Windows browser settings layout: ten languages × two host models, all sections expanded at 280px/32px, no button clipping or whole-page overflow. This is not native Obsidian acceptance. Mother-tongue review and physical six-platform touch/font/lifecycle/low-memory checks remain pending. Catalogs work offline; network/auth/payment recovery contracts are unchanged. No automatic reload during sync. Language is outside synchronized settings, preserving mixed-device/account/vault isolation. No new native API, body/key/checkpoint/source-mtime change. Older binaries safely ignore the preference; code rollback does not reverse cloud actions. No plugin Release or customer-service runtime deployment in this change.


## CHG-20261106-GLOBAL-116-QUICK — release candidate

Global1.1.6 includes the ten-language interface and a separately deployed dual-provider USD payment service. Windows/browser, Windows/WSL synthetic and native ARM service checks are executed against frozen sources by private release tools. Native Windows Obsidian, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS remain unverified for the new language/payment combination; prior user reports retain only their original scope. Desktop browser handoff and mobile foreground/browser availability remain conditions. Mixed versions preserve data and ignore unknown local language settings; code rollback cannot undo completed payments or cloud actions. Background, lock/restart, real offline return and physical touch/large-font acceptance are pending. No note content, encryption key, progress/checkpoint or source-mtime semantics change. China behavior remains separately checked; its published version is not changed by this Global release.

## CHG-20261106-GLOBAL-APP-LOCALE-AUDIT

Presentation-only audit of 858 English message keys plus Global billing literals in all ten languages. Existing confirmation validation words are retained; translated hints now match them. Offline resources preserve brands/parameters. China labels/region, 100 MB quota and deletion phrase are separately tested; all 781 Chinese domestic message values match the previous source. No synchronized setting, connection, body, key, checkpoint or original-mtime change. Both regional builds/closure checks and 65 targeted Client tests pass. New plugin binaries have not been installed or released.

| Platform | Executed scope and boundary |
| --- | --- |
| Windows | Node tests/builds and in-app browser modeling; native Obsidian confirmation/tray acceptance not executed |
| macOS | Shared offline resources; physical Obsidian/browser acceptance not executed |
| Linux desktop | Shared resources; physical Linux host acceptance not executed |
| Android | Existing foreground/browser handoff unchanged; real touch, font scaling, background/lock/reopen not executed |
| iPhone/iOS | Existing foreground/browser handoff unchanged; physical Safari/Obsidian lifecycle not executed |
| iPad/iPadOS | Existing responsive UI unchanged; physical split-view, touch and lifecycle not executed |

Hosted login/plans/orders/checkout fixtures modeled ten languages at 320/390/1440px, 120 cases without document overflow or clipped buttons. Synthetic rendering is not six-platform physical acceptance. Browser error translation triggers no extra request. Mixed-version vaults keep their existing local language selection and synchronization protocol. No native capability, migration, updater or downgrade action was added; code rollback cannot undo completed payments or cloud actions.

Community lint: zero errors, seven pre-existing warnings in unchanged fetch/config-path modules. The deliberate low-minimum SDK probe still detects 144 unsupported-API errors. Warnings were not suppressed or fixed through unrelated sync changes.
## CHG-20261106-LANGUAGE-ROW-SIMPLIFY

CHG-20261107-PAIRING-ACCOUNT-ROLE: CN and Global share recipient/approver logic. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS conditionally support existing device and account management controls; the signed-in/no-vault role now offers device management and explicit vault selection before approval. No automatic connection, vault choice, pairing grant or account deletion is performed. Narrow/touch and translated enlarged-font guidance use existing wrapping controls; native visual/touch checks on all six platforms remain unverified. Pairing expiry, offline recovery, lifecycle/background/lock/reboot, mixed-version protocol and encryption envelope remain unchanged and are not newly accepted. Account/vault isolation and explicit connection confirmation remain required; account deletion does not require local vault connection. No persisted schema, migration, sync content/key/progress/source-mtime change; rollback restores prior entry routing. Browser/unit checks cannot establish physical acceptance. No Alpha publication or production account operations.

CHG-20261106-GLOBAL-PLAN-LARGE-FONT: user confirms iPad language alignment works in alpha.3; Android enlarged-font screenshot shows the plan card squeezed beside its management button. Global plan information now keeps a readable content basis and moves its action to the next line when necessary; remove generic capacity/renewal prose, preserve actionable notices and all management functions. Windows/macOS/Linux/Android/iPhone/iPad conditionally support these shared CSS/DOM controls. Only iPad language alignment has user acceptance; Android large-font correction and other native layout cases remain pending physical retest. Narrow/touch, font enlargement, rotation/split-view are applicable browser checks; background/offline/mixed-version synchronization, key/content/progress/source-mtime and migration are unaffected and not retested by this presentation-only change.

Alpha.4 candidate verification: 64 actual-settings browser cases pass in Chromium/WebKit, modern and legacy host contracts, widths 320/390/768/1024 and fonts 16/24/32/40. The legacy container shares Global/common classes; both selectors are covered. Check readable plan width, wrapped action placement, complete plan fields, omitted generic help and no horizontal overflow. Windows/WSL billing and i18n suites pass 18 each; Global build and dependency isolation pass. These checks do not establish physical Android/iOS/iPadOS/macOS/Linux/Windows enlarged-font acceptance. Native rotation/split-view and touch remain pending user retest; no native API or lifecycle change.

Alpha.4 delivery: 19 anonymous paths verified; actual Hub recent-release selection and three-file download/hash verification pass, synthetic tamper rejected. Preserve Stable and 182 previous files; production service runtime and process generations unchanged. User must still confirm native Android enlarged-font layout after updating; retain local data.json and vault files.

CHG-20261106-LANGUAGE-ROW-MOBILE-CASCADE: alpha.2 failed actual user acceptance on iPad and Android (still stacked). The original browser fixture omitted smart-sync-common; adding the actual ancestor reproduces a mobile 768px/16px failure. The scoped language-row selector now overrides the higher-specificity generic mobile column rule. Windows/macOS/Linux/Android/iPhone/iPad remain conditionally supported; browser geometry is separate from all six unperformed physical-device checks. Only presentation changes: no sync, identity/vault, body/key/progress/source-mtime, persistence, network, lifecycle or migration changes. Existing physical-device failures are not reclassified as passed until user verification.

Alpha.3 verification: actual native-group ancestor 720 Chromium/WebKit geometry cases pass; legacy flat-group ancestor 48 cases pass. Windows/WSL language tests 6/6 each, Global build and dependency isolation pass. Published Alpha.3 verified at 19 anonymous paths, previous 176 files and production service generations retained. Physical iPad/Android and other four native platforms remain pending user retest; no backend or real-vault operation.

CHG-20261106-LANGUAGE-ROW-RESPONSIVE: the Global language row uses available container width and content sizing: left label/right dropdown on one line, or left aligned label/dropdown on consecutive lines. Conditional CSS support on Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS; all six physical Obsidian checks remain unverified. Assess narrow/touch, enlarged fonts, translations, rotation and split view through browser geometry separately from native acceptance. No native API, lifecycle or network logic changes; background/lock/reboot/offline recovery and mixed-version synchronization are not applicable to this presentation change. No persisted format or upgrade migration; code-only rollback restores prior layout without changing language choice, identity/vault isolation, content, keys, progress or source mtime. No Alpha publication in this change.

Verification: Windows/WSL language suite 6/6 each; Global build and closure checks pass. Chromium and WebKit with actual Obsidian 1.15 CSS pass 720 geometry cases (ten languages, widths 240/320/390/640/768/1024px, fonts 16/24/32px, desktop/mobile classes). Checks establish same-line right alignment, wrapped left alignment and no horizontal document overflow; 338 cases wrap. Physical-device touch, rotation and split-view acceptance remains pending.

Delivery update: user-authorized 1.1.8-alpha.2 is published through Global Alpha, with 19 anonymous HTTPS paths verified and previous Alpha/Stable assets retained. Production runtime and service generations remain unchanged; no backend deployment, database migration or installed-vault modification. Physical six-platform acceptance remains pending user testing after updating the three program files while retaining data.json.

CHG-20261106-GLOBAL-CURRENT-PLAN-ALPHA: Global 1.1.8-alpha.1 is distributed through the Alpha feed with the existing production service, production database and live Stripe. Windows/WSL payment and language fixtures pass 63 each; production runtime and Live mode are verified. Physical Windows/macOS/Linux/Android/iPhone/iPad installation, hosted payment, touch, background/lock/restart and offline recovery remain unverified. The user explicitly omits unaffected synchronization large-file/cold-receiver and full settings-geometry tests for this Alpha; these are not passed checks. Stable 1.1.7 and prior Alpha packages remain. The matching Server verifies unpaid Stripe status and confirmed closure before replacement; Dodo cannot replace an order whose closure cannot be confirmed. Preserve local data.json and vault data when updating the three program files.

Global language row: omit help text only. Per user correction, restore the original dropdown default: saved preference or Follow Obsidian when absent/automatic; retain explicit choices and existing save/reload behavior. Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS are conditionally supported through the existing host dropdown; all six native-device checks remain unverified. Narrow/touch layout loses a paragraph with no new controls or native APIs. Background/lock/restart, offline recovery, mixed versions and upgrade/rollback behavior are unchanged and not retested; no schema or network change. China, identity/vault isolation, content, keys, progress and source mtime are unaffected. Windows synthetic language regression is separate from physical acceptance; no release performed.

## CHG-20261106-PLAN-HIDE-CLOSED-ORDER

User requirement: do not show closed orders in the My plan card; they can be mistaken for termination of an active plan. Both editions hide expired order notices and empty status rows, preserving active plan information, pending/uncertain payments, refunds and independent order history. Shared DOM rendering is conditionally supported on Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS; native acceptance on all six platforms is unverified for this change. Targeted synthetic model/DOM tests on Windows do not replace native acceptance. Removing a text row introduces no new narrow-screen/touch controls or desktop APIs. Background/lock/reboot, offline recovery, mixed versions and upgrade/rollback retain existing behavior and are not retested: only local presentation changes, no persisted schema. Identity/vault isolation, content, keys, progress and source mtime are unaffected. No deployment or Release performed.
Verification: Windows targeted billing-card, billing-entry and billing-capacity suites pass (23 tests), including active and inactive plans with closed orders and the mounted hidden status row.

## CHG-20261106-GLOBAL-SUBSCRIPTION-ALPHA5

Global Alpha.5 published with paired Server 0.1.45. Full candidate checks and 11 Windows/WSL jobs pass; each platform's Global critical suite is 169/169 and Global UI is 832 cases/5120 inspections. Actual staging and production isolated body/source-mtime and cold/restart checks pass, and official download/maintained Hub hashes and tamper rejection pass. Client unit gate retains one explicitly skipped paired-service case (526 pass/one skip); separate integration gates execute independently. Initial WSL Git cache portability failure is resolved without application changes. Windows content environment 2 had a rename EPERM before the isolated successful retry; its root cause remains unconfirmed.

Windows, macOS, Linux desktop, Android, iPhone/iOS and iPad/iPadOS remain conditionally supported via existing Obsidian/browser paths; all six native installations, hosted payment, touch, lock/background/reboot and network recovery remain unverified by this run. Browser Chromium/WebKit and WSL are separate evidence. Server account isolation and smaller-plan/late-callback behavior have synthetic coverage; no real merchant cancellation, charge or refund is automatically executed. Update only three program files, retain data.json/keys/progress/vaults. Code rollback cannot restore already replaced subscription periods or revive old entitlements, and must preserve current provider blocks/events/database. Desktop-only APIs are not introduced by this browser feature.
# CHG-20261107-GLOBAL-118-STABLE-PROMOTION

The user reports Alpha.6 testing passed and authorizes Stable 1.1.8. No platform or device details were supplied, so this is user Alpha acceptance without a six-platform certification. This promotion changes version metadata only; synchronization, pairing protocol and native capabilities are unchanged. Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS retain their documented conditional support and existing native verification gaps. Background/lock/restart, offline recovery, mixed-device real pairing and native Hub installation are not newly marked passed. Preserve local configuration, encryption keys, checkpoints, vault isolation and source modification times; existing rollback limitations remain.

CHG-20261113-CN-OXFORD-ALPHA: China Alpha adds hosted lookup for English words and recognized short phrases. Conditional support through the existing Obsidian editor/menu paths on Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS. Prior Windows lab testing is separate from hosted native Alpha acceptance, which is pending on all six. Native touch/narrow layout, rotation and offline recovery are pending. Dismissal cancels the view request; account or vault switches discard stale results. No background service, local dictionary data, audio or persisted format; lock/reboot changes are not applicable. Stable uses its original lookup path. Program rollback preserves vault contents, keys, checkpoints and source mtime.

## CHG-20261113-CN-TRANSLATION-TOGGLE

The default-on China switch uses the shared settings renderer on Windows, macOS, desktop Linux, Android, iPhone/iOS and iPad/iPadOS. Windows DOM fixtures cover the desktop position, mobile visibility, save failure, immediate action visibility and cancellation. Native Obsidian acceptance is pending on all six platforms, including narrow layouts and touch. The preference is stored per local vault and device. Upgrade defaults existing profiles on, and older builds ignore the new preference. No native APIs, background task, network retry behavior, synchronized setting or data migration is added. The switch does not change note content, source mtime, keys or synchronization state.

## CHG-20261113-OVERVIEW-REOPEN

The overview uses existing Obsidian secret storage and shared settings controls on Windows, macOS, Linux, Android, iPhone and iPad. A synthetic close and reopen with requests offline verifies the cached email, notebook name and cloud usage. Tests verify cancellation on settings disposal, separation from synchronization cancellation and rejection after a credential change or authorization denial. The cache is local to the device and vault. Older builds ignore it. The changes use existing controls and do not add layout breakpoints, touch gestures or background work. Native reopen, device lock, network recovery and mixed-version behavior have not been verified on physical devices.

## CHG-20261113-READING-TRANSLATION

CHG-20261113-READING-TRANSLATION-MENU: The existing desktop reading selection context menu also offers translation on Windows, macOS and desktop Linux when the China translation preference is on. Windows synthetic DOM covers the integrated menu and no lookup before activation. Native verification is pending on all three desktops. Android, iPhone and iPad use the reading selection button and sheet; this desktop context menu does not apply to touch. The menu stores nothing and the same eligibility checks exclude encrypted and embedded sections. Upgrade keeps the existing switch; rollback removes the menu item. Background, mixed-version sync and note mtime are unaffected by this menu action.

China edition reading mode uses the rendered Markdown selection. Windows, macOS and desktop Linux show the existing card by the selection. Android, iPhone and iPad open the existing translation sheet after a tap. Support is conditional on Obsidian exposing the selection in a Markdown reading pane. Encrypted sections, embedded notes, PDFs and the Global edition have no reading entry. The Windows DOM fixture exercises both desktop and mobile branches, the translation switch and cancellation. Native acceptance is pending on all six platforms, including touch handles, pop-out windows, narrow panes and rotation. Window hiding clears the view; offline retry uses the existing request. Background sync, device pairing and mixed-version synchronization are outside this change. The existing local preference applies on upgrade and rollback. Notes and their source modification times are read-only in this flow.
