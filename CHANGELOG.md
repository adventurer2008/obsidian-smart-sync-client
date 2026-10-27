# Source change record

## 1.0.11 release preparation — CHG-20261027-111-RELEASE

Requirement: the user authorized production delivery of the two completed unpublished repairs: phone/Pad on-open attachment resolution and maximized host settings width. The requested ultra profile cannot accept changes to attachment resolution in src/synchronizer.js or file-open lifecycle code; retain the existing classifier and use full validation for this combined candidate. Freeze complete source and regression inputs, preserve all user functions, encryption and original modification times. Prepare China 1.0.11; Global stays gated. Production, public publication and physical-device acceptance remain separate until verified.

## 1.0.11 planned — CHG-20261027-NEXT-RELEASE-SCOPE — Consolidate unpublished repairs

Release assignment (2026-10-27): the user requested preparing all unpublished changes together for the next version. China 1.0.10 is already publicly released. Queue the complete ON-OPEN-ATTACHMENTS phone/Pad deferred short-link and restored-note repair, its regressions, and the FULLSCREEN-SETTINGS host-width repair for Client 1.0.11. Include their complete successor implementations and final combined validation before freezing the candidate. Current checks remain synthetic; physical phone/Pad and real-host acceptance remain pending. Public README/user-guide encryption/contact revisions are documentation work, not a new runtime feature. This is scheduling only: do not change version metadata, install, publish, deploy or overwrite 1.0.10 assets.

## Unreleased — CHG-20261027-ON-OPEN-ATTACHMENTS — Resolve missing attachment short links

Requirement: the user reported that opening notes on both phone and Pad left embedded images missing with Download when opening notes selected. Deferred attachments do not exist in the local metadata link index. Resolve their shortest links against the cloud attachment inventory, preferring the note-relative path, then the vault path, then a unique path suffix. Retain ambiguity protection across pending and already downloaded files; do not guess between duplicate names. Handle the active note when the workspace layout is restored, alongside the existing file-open event. Preserve manual Stop, direction/scope guards and the existing authenticated download and original-mtime path.

Validation: synthetic mobile plugin lifecycle checks cover both missing embedded images, file-open, restored active note and avoiding duplicate downloads. Resolver checks cover encoded spaces, aliases, explicit relative paths, local/root precedence, duplicate names, external links and parent traversal. Physical phone/Pad acceptance and the actual cloud presence of the reported images remain unverified. Source repair only; no installation, publication, version change or service deployment.


## Unreleased — CHG-20261027-FULLSCREEN-SETTINGS — Respect the host settings pane width

Requirement: after1.0.10 the user reported that a maximized Obsidian1.14.5 settings window collapses the plugin into a narrow vertical strip. The host already centers settings through percentage-based inline padding; limiting the same padded root to960px subtracts that padding from an artificially capped box. Let the plugin settings root fill its host pane, retaining host padding and inner group/card layouts. Preserve all actions, responsive breakpoints and synchronization behavior.

Validation: a fixture using installed Obsidian1.14.5 CSS and the actual modal/sidebar/content-pane hierarchy reproduced the failure at1792px: root960px within1508px available, overview152px wide and a clipped Sync now action. The fix fills1508px and restores the host's normal700px content width. 288 Chromium/WebKit cases cover normal/maximized/4K widths, mobile widths, legacy/native-row-reuse hosts,13/16/24/32px text and light/dark themes; each checks idle, maximizing during sync and restoring/stopping. Another24 maximized cases include native implicit header grouping and verify the brand header remains present. All312 cases passed, as did214 Client tests, both regional builds/isolation and Community lint (0 errors,5 existing warnings). Earlier layout fixtures lacked the host's outer settings padding, so their passes did not cover this defect. Browser fixtures are synthetic and do not replace real-host acceptance. No installation, publication, version change, service deployment or replacement of1.0.10 assets.

## 1.0.10 release preparation — CHG-20261027-ULTRA-RELEASE-EXEC

Requirement: the user explicitly authorized implementing and testing ultra release tooling and delivering today's complete1.0.10 scope through it. Include settings refresh node replacement/disclosure state, narrow-cover action wrapping, enlarged mobile fonts/iPad toolbar and tray save-deferral/early teardown. Today explicitly includes the reviewed host-lifecycle exception; retain tray tests and recorded isolated native-Electron evidence. Preserve full unit checks, targeted body/source-mtime and Stop integration, regional builds/isolation, source/artifact CI binding and staging/production/public verification. Omitted heavy jobs are recorded as omitted, never passed. This preparation does not itself confirm publication or physical-device acceptance.

## 1.0.10 planned — CHG-20261027-SETTINGS-REFRESH-MATRIX — Replace custom nodes on native refresh

Release scope confirmation (2026-10-27): the user explicitly requested including all of these fixes with the other changes in1.0.10. Include pairing-hint and LAN-details cleanup, current-state/disclosure preservation, narrow-foldable action wrapping, both repeated-row regressions and the completed responsive verification. Combine with the previously assigned tray save-deferral and enlarged-font/iPad toolbar repairs. The user also asked whether an expedited release flow exists; the existing quick profile omits only two local Client large-file content-churn runs and requires approval for this release. This inquiry does not itself select that omission. Retain final fixed-candidate verification and all remaining publication gates.

Requirement: the user supplied screenshots of repeated six-digit pairing instructions and distorted/stale LAN details after Sync now, then requested broader Apple/vivo/Huawei/Xiaomi, foldable, tablet, small/large-screen and font-size layout checks. Native Obsidian 1.14.5 reuses keyed Setting rows, calls the previous cleanup and clears controls, but retains custom row children. Remove stale pairing hints and LAN details before rendering replacements; dispose those nodes on cleanup. Preserve details disclosure state even when a pending toggle event has not fired, and ignore late events from disposed details. Keep only the current connection state and one details block. At container widths below 320px, allow device actions a full row so enlarged labels do not clip on narrow foldable covers. Preserve all pairing/sync actions and original modification times.

Validation: both new repeated-row regressions reproduced duplicates before their fixes. Fixed Node26.12.1 combined Client tests214/214, both regional builds/isolation and Community lint (zero errors, five existing warnings) passed. 456 real-browser synthetic-host cases passed across Chromium and Windows WebKit, 19 viewport profiles (280–1440px), legacy/native-reuse lifecycles, actual UI fonts16/24/32px and light/dark themes. Each checks idle, Sync now plus repeated refresh, expanded details plus refresh, Stop and completion (2280 state inspections). Another120 live fold/rotate viewport transitions during synchronization passed, preserving disclosure state and current LAN state. Checks cover duplicate custom nodes, stale state, horizontal overflow, clipped action labels, wide-toolbar alignment and mobile button heights of at least44px. A first harness incorrectly invoked non-function render returns as cleanup; align its behavior with the observed host contract before the final clean matrix. The matrix found and drove the narrow-cover action fix. This is synthetic SDK/data and desktop browser-engine coverage, not acceptance on physical iPhone/vivo/Huawei/Xiaomi devices or native Obsidian sessions. Queue with the already authorized1.0.10 scope; no publication, installation, version change or service deployment.

## 1.0.10 planned — CHG-20261027-110-SCOPE

Release assignment (2026-10-27): the user requested the tray save-deferral fix together with all other unreleased changes in Client 1.0.10. Queue d719e60 (vault close intent through host saves and early tray teardown), afa342d (enlarged mobile text and iPad toolbar alignment), and the in-progress native device-row refresh pairing-hint deduplication with its regression. Include complete successor implementations and tests when freezing the candidate; do not omit an item because it originated in another chat. Preserve existing functionality, full identities, pairing guidance, 44px mobile targets and original modification times. Pending work is not yet accepted by this assignment.

This records release scope only. Keep current version metadata and published 1.0.9 assets unchanged; no installation, publication or service deployment. Retain the recorded synthetic/native-Electron versus real-Obsidian acceptance boundaries, and validate the final combined committed candidate during release preparation.


## 1.0.10 planned — CHG-20261027-23 — Consolidate unpublished Client changes

Requirements: U428/R438; DEC419. The user accepted the responsive repair and requested including it together with all other unpublished changes in1.0.10. Queue CHG22 mobile font/iPad alignment repairs, TRAY-SAVE-DEFERRAL vault-local close after deferred host saves and the pending native-settings pairing-hint refresh repair. Reused native device rows remove the previous custom pairing hint before rendering the current connected/disconnected instruction, retaining one hint across repeated refreshes. The new regression exercises both account states over repeated renders.

Validation: fixed Node26.12.1 combined Client suite213/213 passed; regional builds/isolation and the160 responsive cases are recorded under CHG22. Real mobile and two-vault Obsidian acceptance remain pending. This is release scheduling and source consolidation; version metadata remains1.0.9 until release preparation. No publication, installation, service deployment or replacement of existing release assets. Server has no new unpublished runtime change in this inventory.

## 1.0.10 planned — CHG-20261027-22 — Responsive overview with enlarged mobile text

Requirements: U427/R437; DEC418. The user reported a lowered Sync records button on iPad 1.0.9 and supplied phone screenshots at different system font sizes showing vertically squeezed device labels, excessive stacking and split action labels. Align action groups at their top edge, constrain feedback within the manual group and reserve toolbar width from current UI font metrics. On narrow containers, put identity labels/actions before a full-width value row; wrap whole action buttons when space runs out. Reserve intrinsic width for the device label and wrap device actions instead. Keep full values, pairing guidance, accessible feedback, all existing routes and 44px mobile targets. Notebook text follows the host UI font; plan headings balance wrapping.

Validation: Node26.12.1 both regional builds/isolation and diff whitespace checks passed. 160 real-browser synthetic-host cases cover legacy/modern containers, phone320/390, iPad1024, PC1440, actual UI text16/20/24/28/32px and idle/success/error/long feedback. No checked element overflow, vertical device label, same-row button misalignment or mobile target below44px; iPad/PC action buttons remain on one row. Earlier synthetic large-font checks incorrectly let the native mobile class override the fixture font variables; the fixture now drives the host preferred font size and reads the actual computed label font. At very large text/narrow widths, whole actions and values may wrap intentionally. Physical mobile acceptance remains pending; source fix only, no installation/publication or version change.

## 1.0.10 planned — CHG-20261027-TRAY-SAVE-DEFERRAL — Finish vault close after host saves

Requirement: on 2026-10-27 the user confirmed that the released 1.0.9 tray menu Close this vault still left both tray icons. The host can prevent the first unload while awaiting save promises and then close again. Do not interpret will-prevent-unload alone as cancellation: retain the explicit close intent through that retry. An explicit tray restore or close error restores normal background behavior; repeated close clicks during pending saves do not start another attempt. Destroy this vault's tray during pagehide/unload while renderer-to-main calls still work, with closed/dispose retained as fallback. Never force-destroy the production window or quit other vaults.

Validation: two added regressions fail on the released implementation and pass with the fix; 212/212 combined Client tests, both regional builds/isolation and Community lint (zero errors, five existing warnings) passed under Node26.12.1. An isolated native Electron43.7.7 runtime test using real BrowserWindows, Tray objects, remote calls and deferred beforeunload saves reproduced the old stuck window/tray, then verified the fix waits for the save, closes only its window, destroys its tray before closed and preserves the other window/tray. This is a synthetic Electron harness, not a real Obsidian vault session. Real-user two-vault acceptance remains pending. No version change, installation, publication or service deployment. Unrelated concurrent styles.css changes are excluded from this fix.


## 1.0.9 release preparation — CHG-20261027-109-RELEASE

Requirement: on 2026-10-27 the user authorized all planned changes plus per-user application history in one quick production release. Include the final accepted integrated settings overview, inline connection details, compact paired devices, bounded LAN contention waiting/cache reuse and vault-local tray closing; pair Server 0.1.35 for application history under matching user details. Preserve encryption, all existing actions and original modification times. Quick validation omits only the two approved local content-churn rounds; all other paired, staging, production and public artifact gates remain. Preparation is not publication; physical acceptance remains separate.

## 1.0.9 planned — CHG-20261027-21 — Integrated responsive settings overview

Requirements: U426/R436; DEC417. The user accepted the whole-page design on phone, iPad and PC, explicitly retained the six-digit pairing hint and requested implementation in1.0.9. Replace the rejected CHG19 inline/ellipsis identity layout with a declared SDK overview group: full notebook/account values, device actions and pairing guidance, live sync status/space, one consistent sync/Stop/records toolbar and an inline connection-details footer. Retain a separate live billing card and all six existing folded settings groups; move direction to Sync preferences without changing its controls. Do not move SDK-owned rows after rendering or introduce a second runtime settings implementation.

Full values wrap instead of truncating; the rejected reveal-only identity modal is removed. Account/notebook scope guards, listeners/disposal, manual-stop semantics, pairing, sync records, billing actions and all existing controls remain. The new group uses the same declarative definitions for legacy and modern hosts and theme variables with mobile44px targets. Only the actual synced state receives the synced badge color.

Validation: Node26.12.1 current combined working-tree Client suite210/210, both regional builds/isolation and Community lint zero errors/five existing warnings passed. A targeted regression calls all seven identity/sync routes, verifies pairing guidance and direction retention; existing listener/timer cleanup tests remain. Thirty-two real-browser checks use HTML generated from the actual Client definitions and legacy/modern synthetic SDK rendering with installed Obsidian1.14.5 CSS: phone viewports320/390, iPad1024, PC1440; actual pane widths272/342/720/960; light/dark and16/24px text. No row/button overflow; full email retained with no ellipsis, six folded groups retained, mobile controls at least44px; connection details opens in place. Generated fixture programs/HTML/screenshots stay outside the repository. These are synthetic host checks, not physical-device acceptance. Parallel LAN/tray work was present during the combined210-test run and is not staged in this UI commit. No installation/publication/version-metadata change; this supersedes the previous CHG19 delivery hold with the accepted implementation.

## 1.0.9 planned — CHG-20261027-TRAY-VAULT-CLOSE

Release assignment (2026-10-27): the user explicitly requested including this fix in the next version. Queue the vault-local tray close implementation, bilingual labels and regressions for Client 1.0.9 alongside the other planned changes after released 1.0.8. Preserve the validation limits below. This assignment does not publish, install, deploy or replace existing release assets.

Requirement: on 2026-10-27 the user reported that choosing Exit on one of two vault tray icons closed both vaults. Each icon belongs to its vault; close only that BrowserWindow through the normal host save/unload path instead of calling application-wide app.quit(). Label the action Close this vault in both languages and clarify the setting. Retain application/system shutdown handling and restore interception when unload is cancelled or close throws. Preserve other vaults and original modification times.

Validation: Node 24.14.0 local checks passed: 209/209 Client tests (including shared-application two-vault, cancellation/error and existing tray checks), both regional builds and edition isolation. Release-required Node 26.12.1 verification remains pending; these checks are not release acceptance. Physical two-vault Obsidian acceptance remains pending. No installation, publication or service deployment.


## 1.0.9 planned — CHG-20261027-20 — Prefer LAN through brief transfer contention

Release assignment (2026-10-27): the user explicitly requested including this LAN optimization in the next version together with the other planned changes. Queue the complete implementation and regressions for Client 1.0.9 after released 1.0.8. Retain the validation below and pending physical phone/iPad acceptance. This records release scope only; no immediate publication, installation, service deployment or replacement of existing release assets.

Requirement: on 2026-10-27 the user requested reducing cloud fallbacks while their phone and iPad synchronize simultaneously, despite healthy LAN connections and no synchronization errors. The existing sender immediately reports a miss when another object is sending, note preparation is busy or both note leases are occupied. Wait up to 500 ms for temporary capacity, capped at four waiters per link and sixteen queued note preparations overall; retain the two active note leases, wire protocol, permissions and cloud fallback. Raise the raw-object initial response allowance from 700 to 1500 ms within the existing 2000 ms peer-probe budget. Remember only digest-verified LAN ciphertext in the existing 16 MiB memory cache and reuse local cached objects before probing peers. Queue release, disconnect, Stop, direction restrictions and cycle cancellation prevent late preparation; an aborted digest check cannot refill a closed cache. Missing or stale content still uses authenticated cloud downloads; encryption, source modification times and attachment selection remain enforced. This cannot supply content that no connected peer possesses.

Validation: fixed Node 26.12.1 Client suite 207/207, both regional builds/isolation and Community lint (zero errors, five existing warnings) passed. Five added regressions cover four concurrent object requests under backpressure, phone/iPad sessions sharing a source, bounded cloud fallback under sustained contention, sender restrictions/Stop and receiver cancellation while queued. Existing content/digest/mtime, corruption, streaming and resume tests remain. A synthetic before/after run of four 96,000-byte objects with 40 ms backpressure changed fallbacks from 3 to 0, cloud bytes from 288,000 to 0 and LAN bytes from 96,000 to 384,000, with identical received bytes. This is local synthetic evidence, not physical phone/iPad acceptance. No installation, publication, service deployment or version change.

## Unreleased — CHG-20261027-19 — Single-line identity information

Requirements: U425/R435; DEC416. The user requested compact account, notebook and device information and asked whether iPad, phone and desktop can support it. Give each block its own inline label/value/action row across both host containers. Long values ellipsize without removal; pointer/Enter/Space opens a read-only full-value modal, scoped to the current identity and detached on view cleanup. Device pairing instructions remain in the existing Add device flow and are hidden from the compact overview row. Retain existing action routes, 44px mobile targets, safe wrapping at large text and all synchronization functions.

Validation: fixed Node26.12.1 Client tests202/202 and both regional builds/isolation passed. A focused regression exercises full-value pointer/keyboard access, stale-scope refusal and cleanup. Sixteen real local-browser fixture combinations across modern/legacy containers, actual pane widths320/390/600/about749px and16/24px text found no row/button overflow and mobile controls at least44px. Default text keeps each identity block in one row; enlarged text may wrap safely. Pure synthetic preview, not physical iPad/phone acceptance. No publication or installation.

## Unreleased — CHG-20261027-18 — Inline connection details

Requirements: U424/R434; DEC415. The user approved showing only connection state on the settings homepage and folding transfer counters into details, and asked where details would be. Add a native Connection details disclosure immediately below the existing LAN status, opening in place rather than navigating elsewhere. Default closed; retain the current open state across view refreshes. Keep measured LAN/cloud payloads and fallback counters in the disclosure and explain that fallback means switching to cloud, not rolling back notes. Preserve live updates, identity/disposal guards and synchronization behavior. Six LAN/settings regressions and both regional builds/isolation passed. Initial test expected only the six settings groups; refine its selector to those unchanged groups and separately assert the new disclosure/default state/preserved open state. Source and synthetic preview only; no installation or publication.

## 1.0.9 planned — CHG-20261027-17 — Compact paired-device summaries

Requirements: U423/R433; DEC414. The user requested placing Paired devices and Refresh on one header row and showing only the vault measurement timestamp in device summaries, then requested a screenshot. Put the existing refresh action in the native modal title (retain a fallback for test/older hosts), remove duplicate visible activity time while preserving its full value in device details, and flow state, vault size/measurement and revoke action inline where width permits. Keep one full-width card per device, safe narrow wrapping, online/offline/unknown values, all revoke permissions/confirmations and mobile 44px refresh target. Three device/vault regressions and both regional builds/isolation passed; local screenshot uses synthetic devices, not physical-host acceptance. Not published or installed.

User preview refinement: align the revoke action to the trailing edge of every card. Use a wrapping flex row and an automatic inline margin so the action stays right-aligned even when it moves onto another line. Preserve summary content, permissions and confirmations. Synthetic preview verified and regional builds passed; no publication.

User acceptance and release assignment (2026-10-27): the user approved the final compact device preview, including title/Refresh on one row, one visible measurement timestamp and right-aligned revoke actions, and requested delivery with the next version. Queue the complete CHG-20261027-17 change for 1.0.9 after released 1.0.8; no standalone deployment, installation or replacement of existing assets. This records visual preview acceptance, not physical-device or production acceptance. Documentation-only assignment; existing verification retained.


## 1.0.8 release preparation — CHG-20261027-15

Requirements: U422/R432; DEC413. The user authorized all implemented unreleased changes for a quick China production release: shared overview inset, compact wide-mobile layout, concise Sync records actions and references; pair Server0.1.34 for the approved compact operator UI and application actions, and include the existing public note-encryption documentation. Quick approval skips only the two local content-churn large-file rounds; retain focused regression, remaining integration/integrity tests, build/source checks, all Windows/WSL paired jobs and staging/production/public gates. Preserve every existing function and original modification time. Preparation is not publication; physical-device layout acceptance remains separate.

## Unreleased — CHG-20261027-14 — Compact synchronization actions and rename records

Requirements: U421/R431; DEC412. The user requested renaming the Chinese Sync tasks and records entry to Sync records and reducing loose spacing in the narrow preview. Update its shared label, command/title and Chinese status references. Make the manual-sync/Stop group and records group compact inline actions in both legacy/modern containers, remove their separating borders and full-width empty rows, and reduce mobile identity-row gaps. Retain all actions, responsive wrapping and mobile 44px touch targets. No publication or replacement of released 1.0.7 assets.

## Unreleased — CHG-20261027-13 — Inset settings overview content

Requirements: U420/R430; DEC411. After updating to 1.0.7 the user reported that settings content sits too close to the left card edge on desktop and iPad. Overview row styling removes horizontal padding; add a shared, bounded 16–24px inline inset to both modern and legacy overview containers. Preserve controls, mobile wrapping, original modification times and synchronization behavior. This is a follow-up source fix; do not replace published 1.0.7 assets or deploy automatically. Browser/layout and build verification recorded after execution; physical iPad acceptance remains separate.

Additional user iPad screenshot shows that unconditional mobile column rows and full-width action rows waste horizontal space. At an actual overview content width of at least 560px, restore side-by-side information/controls and allow synchronization actions to share a line. Narrow phone/split panes retain stacked controls and all mobile controls retain their touch targets. Use pane width rather than device identity or whole-window width.

## 1.0.7 release preparation — CHG-20261027-10

Requirements: U416/R426; DEC407. The user authorized including all implemented unreleased changes in a full China production release. Include mobile settings layout, Stop-drain attachment policy persistence, incremental inventory and durable commit recovery; pair with Server 0.1.33 for the approved concise mail and purchase storage notice, plus concise public documentation from fixed private tools. Preserve original modification times and existing features. Full fixed-candidate Windows/WSL, staging, production and anonymous public asset verification remain required. iPad acceptance was reported passed by the user; vivo policy/mobile layout physical checks remain pending, not synthetic passes. This preparation is not publication.

Commit assignment (2026-10-27; CHG-20261027-02/03): the user explicitly requested committing all five pending files and including both fixes, their regression tests and this record in 1.0.7. Revalidated the combined current tree with Node 26.12.1: 201/201 Client tests, both regional builds and isolation checks passed; Community lint has zero errors and five existing warnings. Physical phone/vivo acceptance remains pending. This source commit does not install, publish, deploy or replace 1.0.6 assets; version metadata is assigned during release preparation.

## 1.0.7 planned — CHG-20261027-04 — Incremental inventory and durable commit recovery

Release assignment — U411/R421; DEC402; CHG-20261027-05: on 2026-10-27 the user requested inclusion in the next release. Queue both incremental inventory and commit recovery for 1.0.7 alongside the existing planned fixes. Preserve the recorded performance/correctness boundaries and original modification times. This assignment does not publish or install a version, deploy a service or replace released 1.0.6 assets.

Requirements: U410/R420; DEC401. The user requested incremental scanning and commit recovery while retaining existing functions and original modification times, with tests and a measured before/after comparison. Independently implement the mechanisms without copying third-party source.

Automatic cycles reuse a bounded, event-guided inventory for known modified files, with full inventory on startup, structural/policy/remote changes, errors and a 60-second audit. Manual/configuration scans, deletion checks and pre-publication body/time rechecks remain. Persist a bounded intent before publishing ordinary/batch uploads or deletions; reconcile uncertain results using authenticated existing revision history after restart. Reuse lightweight configuration persistence and retain checkpoint batching. Recovery repairs metadata without writing local content or replacing original modification times.

Validation: Node 26.12.1 Client tests passed (Windows 201; WSL 200 plus one platform skip), both regional builds/isolation passed, Community lint has zero errors and five existing warnings. Integration regressions cover real loopback service/disk checkpoint restart, lost replies, single/batch deletion, conflicts, rename, cancellation, 512 MiB convergence and original times; one Windows transient rename failure passed unchanged on retry, and WSL build-fixture platform configuration was corrected before retesting. Synthetic 10,000-file warm-inventory medians fell by about 86–87% for one/three edits; cold 500-file batching cost about 9% more, and forced individual publication cost about 109% more. These are local synthetic measurements, not mobile/public-network acceptance. No installation, version change, release or deployment.

## 1.0.7 planned — CHG-20261027-03 — Persist attachment policy after stopping

Requirement: on 2026-10-27 the user reported that their vivo phone continued downloading all attachments and the selector returned to Always, even after pressing Stop and selecting On note open. The source rejects policy changes while the asynchronous Stop operation is still draining, and the selector previously left the rejected value visible without reporting the error. This is a confirmed source defect consistent with the report; the phone's exact event timing has not been captured.

Reserve policy changes while Stop drains, wait for its completion, serialize policy saves and prevent a new synchronization cycle until persistence finishes. On storage failure restore the prior policy, feed cursor and pending review plan. Disable the selector while applying, restore its saved value and show an error on rejection. Preserve explicit manual resumption, downloaded copies, note-open downloads and original modification times. Queue with the existing 1.0.7 work; do not replace installed or published 1.0.6 assets.

Validation: 184 Client synthetic tests passed with Node 26.12.1, including Stop-drain selection, policy persistence across restart/manual resume, blocked resume during saving, storage-failure rollback and selector error feedback. Both regional builds and isolation checks passed; Community lint reported zero errors and five existing warnings. Physical vivo acceptance remains pending. No installation, publication or service deployment.

## 1.0.7 planned — CHG-20261027-02 — Mobile settings layout repair

Release assignment: on 2026-10-27 the user requested inclusion in the next release after installed 1.0.6. Queue this fix for 1.0.7; do not publish immediately or replace 1.0.6 assets. CHG-20261027-02 distinguishes this repair from the private 1.0.6 delivery receipt numbered CHG-20261027-01.

Requirement: user Android screenshots of installed 1.0.6 show clipped account/library buttons, a wrapped Sync now label and large empty identity rows; the user requested a fix. Reset text/control flex bases for mobile column rows, stack identity controls within the pane, give action rows full width and wrap whole manual-action buttons instead of splitting their labels. Preserve desktop layout, mobile touch targets and all controls. This patch does not replace published 1.0.6 assets or install/publish a new version. Physical-device acceptance remains pending.

Validation: 181 Client tests, both regional builds and isolation checks passed; Community lint has zero errors and five existing warnings. A local Chrome fixture using the installed Obsidian 1.14.5 host stylesheet exercised 48 layout combinations across legacy/modern containers, mobile/desktop, 320/390/600/768 px viewports and 16/24 px fonts, with additional mobile column overrides. Mobile cases keep controls inside the pane, identity rows bounded, and the two manual-action labels on one line with at least 44 px touch targets. The previous stylesheet reproduced clipped controls and a split Sync now label in the modern mobile fixture. This is synthetic layout evidence, not acceptance on the reporting Android phone or its theme/WebView.

## 1.0.6 cumulative delivery — CHG-20261026-24

Requirements: U401/R411; U403/R413; U404/R414; DEC392/394/395. The user explicitly included the completed background-tray and compact-task-panel changes in the current production delivery. Preserve persistent manual-stop semantics while a window is hidden or restored. Run unified fixed-candidate verification before release; earlier preview acceptance and synthetic checks are not production proof.

## 1.0.6 candidate — CHG-20261026-23 — Keep the window alive on close

Requirements: U403/R413; DEC394. User native-test feedback on 2026-10-26: clicking X exits the test host despite the enabled background-tray switch. Remote main-process close listeners are asynchronous and cannot alone cancel renderer unload. Add a synchronous capture-phase beforeunload listener to the owning renderer, stop subsequent unload handlers, and retain the main-process listener for the host's delayed-close path. Remove both on disable/unload; explicit tray Quit marks quitting before requesting application quit. Add a regression that delivers renderer unload before remote close notification. The previous synthetic event-emitter tests did not model this ordering; their passing results were not native acceptance. Preserve other in-progress candidate changes and do not publish a release.

Validation: 181/181 Client tests, both regional builds and isolation checks passed; Community lint has zero errors and five existing warnings. In the isolated Obsidian 1.14.5 Windows test profile, a real click on the window X hid the window while its process remained alive beyond the host's delayed-close interval. Updated the same offline preview vault. Tray-click restore, explicit native Quit and actual OS shutdown remain separate manual acceptance; no release or deployment.

User acceptance (2026-10-26): after testing the repaired preview, the user confirmed “测试通过”. Record the requested tray behavior as manually accepted in this Windows preview. This does not establish actual OS shutdown, other desktop platforms or production/release acceptance.

## 1.0.6 candidate — CHG-20261026-22 — Compact task panel

Requirements: U404/R414; DEC395. User screenshot feedback on 2026-10-26 requests a concise synchronization task panel. Move local-record/privacy and diagnostic-retention explanations into a collapsed Record details section below the records. Shorten the cycle summary while preserving progress counts, failures, bytes, running-total uncertainty, deferred-attachment scope, actions and error visibility. No installation or release.

## 1.0.6 candidate — CHG-20261026-21 — Branded background tray

Requirement: U403/R413; DEC394. Add a desktop-only switch immediately after Enable note search in Advanced, enabled by default on Obsidian startup. Closing a vault window hides it to a tray icon using the existing brand logo and keeps background work running. Clicking the icon restores that vault; its menu can show the window or quit Obsidian. Disable/unload restores any hidden window, removes listeners/icon and restores throttling. Preserve ordinary application quit and system shutdown. Unsupported hosts retain normal window closing. Do not configure Windows login startup (user clarification), hide windows on launch, change synchronization stop state, install plugins or publish a release. Synthetic verification and native-host acceptance are recorded separately.

Validation: Node 26.12.1 Client suite passed 180/180 synthetic tests, including close/restore, quit/shutdown, multiple vaults, setup failure, cleanup, settings order/mobile exclusion and persistence rollback. Both regional builds and dependency-isolation checks passed; Community lint reported zero errors and five existing warnings. Native Obsidian tray appearance, actual window lifecycle and OS shutdown acceptance remain unperformed. No installation, deployment or release.

## 1.0.6 candidate — CHG-20261026-20 — Quick stop beside Sync now

Requirements: U402/R412; DEC393. Place Stop immediately after Sync now in the same control row, including narrow panes. Invoke the same persistent stop operation as the task panel, show the stopping state while durable work drains, disable duplicate stops and retain manual-only resumption. Dispose the status listener with its settings view.

## 1.0.6 candidate refinement — CHG-20261026-19

Requirements: U400/R410; U401/R411; DEC391/392. Keep folded settings after common actions in the modern flex container and give ordinary rows consistent flat styling. Stop the earlier local-only candidate before deployment; fix and validate a new immutable candidate.

## 1.0.6 release preparation — CHG-20261026-18

Requirements: U401/R411; DEC392. The user authorized cumulative China production delivery of the unreleased 1.0.6 changes below, paired with Server 0.1.32 for its pending foldable purchase-page layout. Run the full local and paired verification plan, staging and production acceptance, and immutable public asset checks. Preparation does not itself confirm publication or physical-device acceptance.

## 1.0.6 candidate — CHG-20261026-17 — Responsive desktop, mobile and foldable layouts

Requirements: U400/R410; DEC391. Adapt settings, plugin dialogs and task panels to their available pane width, including wide mobile windows and narrow split panes. Wrap actions, constrain long text and controls, use adaptive device-card columns, and retain 44 px mobile controls. Preserve all settings and operations. Fourteen synthetic legacy/modern layout cases cover 320/390/600/768/960 px panes, enlarged text and dark colors with no measured horizontal overflow. Physical phone/foldable host validation remains pending. No installation or release.

## 1.0.6 candidate — CHG-20261026-16 — Keep manually stopped synchronization stopped

Requirements: U399/R409; DEC390. Persist manual stop across timers, change notifications, foreground/network events and restarts. Suppress background peer setup and automatic on-open attachment downloads while stopped. Explicit Sync now or Retry resumes without changing the selected synchronization direction. Retain safe draining of writes/checkpoints and completed work; failed persistence leaves the automatic stop in place. Client synthetic tests (172), regional builds, isolation and lint passed (zero errors, five existing warnings). No installation or release.

## 1.0.6 candidate — CHG-20261026-15 — Isolate failed receives with durable retries

Requirements: U398/R408; DEC389. Continue later receives after a file-specific failure, checkpoint its opaque revision and authenticated destination before advancing the feed cursor, and retry it after restart. Prefer newer revisions and tombstones, preserve original modification times and completed task results, and show a remaining-retry count instead of reporting full success. Protect affected upload paths; defer uploads when a failed manifest leaves the destination unknown. Authorization, cancellation, service/key/plan changes and checkpoint failures still stop safely. Physical iPad failures and a subsequently observed HTTP 409 upload conflict remain under investigation; this candidate is not installed, released or deployed.

## 1.0.6 candidate — CHG-20261026-14 — Faster local search feedback

Requirements: U397/R407; DEC388. Replace serial body reads with at most four concurrent reads, show a bounded first page of partial matches during scanning, and compile query matchers once. Apply folder/tag/date filters before reading text and avoid body reads for title-only searches. Keep AND/phrase matching, ranking, pagination, original modification-time filters, cancellation, encryption masking and the memory-only 24 MiB text cache. Windows Client tests (163), Windows/WSL search/recent regressions (16), regional builds, isolation and lint passed (zero errors, five existing warnings). Native-vault throughput and appearance remain unverified; no installation or release.

## 1.0.6 candidate — CHG-20261026-13 — Default note tools to left sidebar tabs

Requirements: U396/R406; DEC387. Create recent-files and local note-search views in the left sidebar tab strip, beside the standard navigation tabs, on first layout restoration or explicit opening when no view exists. Preserve restored user placement, feature switches, command access and duplicate prevention; do not activate or reveal startup tabs. No installation or release.

## 1.0.6 candidate — CHG-20261026-11/12 — Simplify device cards

Requirements: U394/R404; DEC385; U395/R405; DEC386. The user assigned this change to 1.0.6. Remove the introductory paragraph, shorten status and size labels, and show compact month/day and minute timestamps. Keep device IDs, account-authorization details, full timestamps and size scope in hover details; retain the short ID for unnamed devices. Preserve current-device identification, last reported offline sizes, missing-data states, refresh and revocation. No release or deployment.

## 1.0.6 candidate — CHG-20261026-09/10 — Legacy settings layout

Requirements: U392/R402; DEC383; U393/R403; DEC384. The user confirmed settings open on Obsidian 1.12.7 but reported uneven cards, account/billing collisions and misaligned sections, then requested an immediate styles.css patch and inclusion in 1.0.6. Restore a full-width vertical layout only for the flat legacy settings container; align account, plan and device rows, keep primary actions together and stack folded sections consistently. Preserve theme variables, narrow-screen wrapping and every existing control. Deliver the standalone local stylesheet for installed 1.0.5; keep published 1.0.5 assets immutable. Reserve 1.0.6 as a candidate; no new release or service deployment is performed by this change.

## 1.0.5 — Production delivery verified (2026-10-26)

Requirements: U387/R397; U388/R398; U389/R399; U390/R400; U391/R401. Delivered Obsidian 1.12.7 settings compatibility, general mobile desktop-only plugin exclusion and per-device vault size reporting. The approved quick local profile, retained Windows/WSL paired checks, paired Server migration, staging/production body and source-mtime probes, mail receipt and eleven anonymous release-asset hashes passed. Native 1.12.7 and physical iPad acceptance remain unperformed. [China 1.0.5 release](https://github.com/adventurer2008/obsidian-smart-sync-release-cn/releases/tag/1.0.5).

## 1.0.5 candidate — CHG-20261026-04 — Obsidian 1.12.7 settings compatibility

Requirements: U388/R398; DEC379; U389/R399; DEC380; U390/R400; DEC381; U391/R401; DEC382. The user reported a blank settings tab with the latest offline plugin on Obsidian 1.12.7 and requested compatibility, then authorized a new version containing all unpublished changes. Render the existing shared settings definitions through the legacy display entry point on older hosts; keep the modern host renderer, settings, collapsed sections and refresh actions. Dispose listeners and timers on refresh, close and unload. Lower the new candidate's minimum app version to 1.12.7 without altering published compatibility entries. Include CHG-20261026-03 device vault-size reporting with its paired Server migration, plus all previously released behavior. The user approved the quick local release profile; retained paired verification and deployment gates still apply. Native 1.12.7 acceptance is recorded separately; no native acceptance is implied by synthetic tests.

## 1.0.5 candidate — CHG-20261026-06 — Mobile plugin platform policy

Requirements: U390/R400; DEC381. Use authenticated current remote manifests to skip desktop-only plugin code, styles and settings on mobile, independent of arrival order. Continue notes and attachments, preserve shared desktop activation entries, record a bounded skip reason and recover previously skipped files when a plugin becomes mobile-compatible. Unknown compatibility, corrupt metadata and authorization failures remain explicit errors. Preserve direct-write safety, device isolation, conflicts and source modification times. This is a general platform policy, with no plugin-ID exceptions.

## Unreleased — CHG-20261026-03 — Local vault sizes in device management

Requirements: U387/R397; DEC378. Show each device's last reported local note/attachment byte total and measurement time. Retain offline samples and display No data yet for devices that have never reported. Count SDK file metadata without reading content or including hidden settings/caches; resample at most every 30 seconds during presence and immediately on device-view refresh. Unknown or invalid metadata never becomes a fabricated zero. Preserve authentication, revocation, synchronization and original modification times. Requires the paired Server additive device-vault-usage migration; this source change has not been installed, deployed or released. Windows Client tests (152), WSL targeted Client/Server tests (8/20), regional builds, isolation and lint passed (five existing warnings); native-device visual acceptance remains pending.

## 1.0.4 candidate — CHG-20261026-02 — Resume interrupted mobile receives

Requirements: U386/R396; DEC377. Persist bounded, verified encrypted attachment objects for cloud receive recovery and retain authenticated peer bundles across restarts. Seed local fingerprints only after observed successful writes, recheck changed files, and checkpoint after 4 MiB of received content as well as existing item/time boundaries. Back off repeated peer-cache misses. Preserve permissions, conflicts, original modification times, existing upload behavior and old-client fallback. Include CHG-20261026-01 item-progress feedback. User authorized full China production delivery after complete validation; native iPad acceptance is reported separately. Existing release assets remain immutable.

## Unreleased — CHG-20261026-01 — Show measurable synchronization progress

Requirements: U385/R395; DEC376. An iPad field report showed prolonged receiving/local-read stages despite ongoing work and active peer transfers. Display actual local inventory checked/eligible counts and completed receive operations beside the manual action; include initial and final scan updates for small inventories and excluded paths. Keep stalled guidance, cancellation, error reporting and cloud/peer behavior unchanged. Counts are operations, not a download percentage or promised throughput. This change has not been installed or published.

## 1.0.3 candidate — CHG-20261025-21

Requirements: U384/R394; DEC375. Prepare the accumulated CHG-20261025-16 through 20 changes for the China production release. Include encrypted LAN transfer expansion and counters, manual synchronization stage feedback, active-plan summary corrections and recent/search sidebar entrances. Keep cloud authentication, version coordination and fallback; full offline synchronization is not supported. The user defers physical two-device LAN and cellular acceptance until after publication. Run the complete release gates; deferred device checks are not passed checks. Preserve existing 1.0.2 assets.

## Unreleased — CHG-20261025-20 — Complete LAN acceleration paths

Requirements: U383/R393; DEC374. Extend scoped encrypted peer transfers to batch reads and locally available committed notes and attachments, with bounded resources, cloud fallback and observable payload counters. Preserve cloud authority, permissions, conflict safety, content verification and original modification times. Validate synthetic fixtures separately from native LAN/mobile acceptance; no installation, deployment or release.

## Unreleased — CHG-20261025-19 — Show manual synchronization progress beside its action

Requirements: U382/R392; DEC373. Display an accessible persistent preparation/stage message below Sync now while its callback is pending. After 15 seconds without progress, point to task history and the existing stop action without inventing a timeout or success. Show the actual final overview or safe failure, restore the button, clear timers and ignore stale identities or disposed views. Six targeted synthetic regressions, regional builds and lint passed with five existing warnings. Native visual acceptance, deployment and release remain pending.

## Unreleased — CHG-20261025-18 — Hide unfinished orders on an active plan card

Requirements: U381/R391; DEC372. While a paid plan is active, omit creating, pending and uncertain orders from its summary card. Keep order polling, first-purchase and expired-plan status, refund notices and payment-conflict warnings. Fourteen targeted billing tests and both regional builds passed. No installation, deployment or publication.

## Unreleased — CHG-20261025-17 — Default recent and search tools to right sidebar tabs

Requirements: U380/R390; DEC371. Create enabled recent-files and note-search tabs in the right sidebar after layout restoration without activating or revealing them. Reuse restored views, preserve user placement, remove duplicate ribbon icons and keep command-palette access and feature switches. Twelve targeted synthetic regressions and regional builds passed; native-host appearance remains unverified. No installation or release.

## Unreleased — CHG-20261025-16 — Clarify note-tool entrances and pending orders

Requirements: U379/R389; DEC370; CHG-20261025-16. Explain the ribbon and command-palette entrances for recent files and local note search. Add a recent-files command that follows its enable switch. Label a separate pending order without implying that an active subscription is unpaid. Preserve payment verification, current entitlement, note data and original modification times. Targeted synthetic tests passed; native-host acceptance and release are separate.

## Unreleased — CHG-20261025-10 — Explain first-use manual synchronization

Requirements: U376/R386; DEC367; user report on 2026-10-25: clicking Sync now on first use must prompt for purchase. For a disconnected China guest, show a plan-opening prompt immediately with Purchase and Existing account login actions, using the existing plan and login flows. Deduplicate the prompt and reject actions after dismissal or connection/identity changes. Keep free-plan eligibility, signed-in synchronization, pairing and background behavior unchanged. Synthetic regression and local build results are reported separately from native Obsidian acceptance; no release or service deployment.

## 1.0.2 — unreleased security hardening

CHG-20261023-46/47; Requirements: U370/R380, DEC361; U371/R381, DEC362. Reject Windows alternate data streams, reserved device names and ambiguous file names at ordinary and configuration filesystem boundaries while retaining POSIX names and original modification times. Upgrade the isolated Community lint tool to supported ESLint 10 and patched Moment 2.31.0, retain typed API checks, and require Node 26.12.1 or newer for development tooling. Refresh remote device restrictions after any in-flight presence poll. Pin manual-only workflow actions to reviewed Node 24 action commits. These source changes have not been published as a plugin release or deployed.


## 1.0.1 — CHG-20261023-45

Requirements: U369/R379; DEC360. On manual China synchronization, show a short capacity warning with one purchase action when fresh account usage exceeds the current plan, including refunded accounts. Mark over-capacity plans in settings. Keep existing synchronization and server quota enforcement, avoid background pop-ups, and reject stale account responses/actions. User-authorized quick production release; actual deployment acceptance is recorded privately.

## 1.0.0 local verification — CHG-20261023-41

Requirements: U366/R376; DEC357. Automatic GitHub Actions runs are replaced with local Windows and WSL validation maintained by the private release tools. Keep the optional hosted verification workflow manual-only. Runtime and published artifacts are unchanged by this workflow policy.


## 1.0.0 candidate — CHG-20261023-38/39/40

Requirements: U363/R373, U364/R374, U365/R375. China account creation uses the free or paid plan page; existing-account login no longer offers manual beta applications. Retain existing login, pairing, encryption and original file modification times. Prepare version 1.0.0 for staging acceptance; this is not a published plugin Release.


## 0.1.84 staging candidate — CHG-20261023-30

Requirements: U356/R366; DEC347. Include the subscription-card replacement fix after sign-in and free-to-paid upgrades. This is a staging-only candidate. Use the explicitly approved quick local profile while retaining targeted tests, build checks, exact paired CI and staging acceptance. No public plugin release or production deployment.


## Unreleased — CHG-20261023-26 — Replace stale subscription cards after sign-in and upgrades

Requirements: U351/R361; U353/R363; DEC342/344. Dispose the previous mount and its owned DOM before mounting a subscription card on a reused settings row. Show one free plan and opening date after sign-in, and only the current paid plan after an upgrade. Preserve usage, expiry, renewal timing and identity-bound async updates. Add regressions for remounts, late guest responses and free-to-paid upgrades. Local tests and regional builds only; no release or remote installation.

## Unreleased — CHG-20261022-11 — Collect purchase email on the plan page

Requirement: U326/R336; DEC317. Open the plan page directly for guests with a scoped purchase handoff, collect and confirm the email in the browser, and retain account isolation and pending-order resume. Align all plan prices and use a compact desktop plan and checkout layout. Payment status updates automatically; remove manual query and return-to-plans actions. Before any confirmed purchase, the plugin shows the pending status without presenting the order's capacity as an activated plan. Only local simulation identifies itself as such; no release, remote deployment or real charge is performed.

## Unreleased — CHG-20261022-10 — Compact plan purchase row

Requirement: U325/R335; DEC316. Present the unpaid plan entry as a single row with My plan on the left and a prominent Purchase button on the right. Remove the redundant unpaid title, keep current-order messages when present, and retain purchased plan details with renewal on the right. Update only the dedicated local Obsidian test profiles; no release or remote deployment.

## Unreleased — CHG-20261022-09 — Hide unpurchased plan capacity

Requirement: U324/R334; DEC315. Do not present the service's fallback quota as a user's purchased package. Hide capacity, usage and its progress bar without a signed-in account and an active paid plan. Keep one unpaid title and the purchase button, removing the redundant account-activation explanation and empty detail rows. Keep existing synchronization rights and the proposed trial design unchanged. Validate the unpaid 10GB fallback and signed-out cases, then update only the dedicated local test profiles; no remote deployment or release.

## Unreleased — CHG-20261022-08 — Purchase and renewal card

Requirement: U323/R333; DEC314. Show the CN plan, account-wide usage, expiry and current order in one settings card. Emphasize purchase for unpaid accounts and renewal within one calendar month of expiry; keep renewal for previously purchased accounts. Resume pending orders, refresh on return with bounded polling, and remove the order-history and manual-refresh controls. A scoped pre-account checkout never becomes synchronization authorization; only server-confirmed formal payment can activate an account. Keep one-cent tests separate from plan rights. Validate with synthetic data and dedicated local Obsidian profiles. No release, remote deployment or real charge is performed; the subsequently proposed 14-day trial remains a design discussion.

## Unreleased — CHG-20261021-14 — Community CSS compatibility

Requirement: U300/R310; DEC291. Address the two Community CSS warning categories in the next release. Replace the common-settings flex column gap with logical margins on action rows. Replace pairing-code important declarations with modal-scoped span and input selectors, preserving blue, large, bold digits. Published 0.1.82, its tag and artifacts remain unchanged; this source maintenance does not publish or deploy a version. Keep the existing in-plugin infinity logo. The Community icon picker currently offers built-in icons, without a custom image upload control; no substitute icon is selected.

## CHG-20261021-06 — Approved public Client boundary

Requirement: R304 / DEC282 and the user's approved five-repository plan. Establish this repository as the sole maintained Client source line; keep internal history and operational tools private. Use the new regional distribution repository names without changing plugin IDs, service domains or synchronization source. Login and billing remain design-only. Add Windows/Linux unit, build, isolation and local community-lint checks.

License: Apache-2.0 for new Client candidates; existing releases through 0.1.81 and their MIT assets remain unchanged. No new version, production deployment or Global release is performed by this source publication. Local validation and official review are distinct.

## CHG-20261021-08 — Regional lint artifacts in clean CI

Requirement: R304 public standalone verification. The first public CI exposed a missing root dependency map: regional builds write their own artifact directories. Lint now selects the matching regional manifest and dependency map explicitly. Runtime source, lint rules and coverage are unchanged. Local checks on a reused checkout did not expose the missing-root-file condition; the initial CI failure is retained.

## CHG-20261021-13 — China 0.1.82 production candidate

Requirement: U299/R309; DEC290. The user authorizes delivering all maintained, unpublished work through the complete paired release flow. Bump China Client to 0.1.82; retain existing runtime features, original modification times, plugin identity and approved-account login. Publish generated China source and matching artifacts together. Include Apache-2.0 and regional repository metadata introduced since 0.1.81; existing MIT releases remain unchanged. Global login, billing, complete English and overseas hosting remain unimplemented. Server stays 0.1.26 because its business source and schema are unchanged. Production, exact-pair CI, mail and Community release verification are separate acceptance gates and are not pre-recorded as passed.


## Unreleased - CHG-20261022-01

Requirement U316/R326: add China purchase, renewal and order entry using a short-lived single-use billing ticket. Account-only authorization, pinned payment origin and stale-account guards preserve existing sync and encryption behavior. Global billing remains disabled. No release or service deployment.

## Unreleased — CHG-20261022-02 — Purchase environment isolation

Requirement: U317/R327; DEC308. Pin purchase entry to the matching production or staging payment origin; allow the same loopback origin only for development simulation. Keep account authorization and late-response checks. Synthetic tests cover cross-environment rejection. No plugin release or service deployment is performed.

## Unreleased — CHG-20261022-03 — Purchase subdirectories on shared service host

Requirement: U318/R328; DEC309. Pin China purchase links to /pay-test for staging and /pay for production on the service HTTPS host, while keeping loopback development simulation. Preserve account checks, order navigation and one-time tickets; reject the other environment path and query parameters. Source tests and CN/Global builds are local validation; no deployment or release is performed.


## CHG-20261022-12

Requirements: U327/R337. Purchase and renewal actions open plan selection rather than silently resuming an old checkout. Preserve explicit owned-order entry and existing unpaid orders; do not cancel or duplicate provider charges. Verified with 102 Client tests; local simulation only, no release or production deployment.


## CHG-20261022-15

Requirements: U330/R340. Show an explicit review state for verified conflicting payments rather than claiming another package was activated. No release or production deployment.


## CHG-20261022-16

Requirements: U331/R341. Hide renewal outside the final calendar month; show the prominent purchase-sized action when due or expired. Local preview only; no entitlement dates changed.


## CHG-20261023-01

Requirements: U332/R342. Display the scheduled next package and its effective date separately from the current package when renewing into another tier. No release or production deployment.


## Unreleased — CHG-20261023-06/07 — Renewal periods and returning sessions

Requirements: U337/R347; U338/R348; DEC328/329. Label the current package and show the scheduled package on the next row, including same-tier renewals. Refresh on window return, display the extended purchased expiry, and remove the scheduled row when that period becomes current. Confirm paid renewals without asking an existing purchase session to use login mail again. Keep account and session credentials unchanged. Local tests only; no release or service deployment.


## Unreleased — CHG-20261023-12/13 — Free plan and upgrade entry

Requirements: U343/R353; U344/R354; DEC334/335. Show an activated 100MB free plan with its opening date and a prominent purchase-more action below it. Do not label it a trial or show an expiry or a permanent-free promise. Preserve the existing account and data when purchasing an annual plan, along with the existing paid renewal behavior. This replaces the proposed two-week paid-plan trial; no remote deployment or release is performed.


## Unreleased — CHG-20261023-14 — Remove redundant CN signup button

Requirement: U345/R355; DEC336. Remove the CN account row's New user application button now that free account opening is available from the plan page. Keep existing account login, free and paid plan entry, historical applications and administrator management. Other edition entry points remain unchanged. Local test installation only; no release or service deployment.


## Unreleased — CHG-20261023-15 — Hide persistent successful-order text

Requirement: U346/R356; DEC337. Stop showing a completed normal payment as a permanent extra row on the plan card. Keep the checkout success result and updated package details, along with pending, refund, payment-conflict and isolated test-order feedback. No order, entitlement or payment behavior changes; local test installation only.

## 0.1.83 staging candidate — CHG-20261023-16

Requirements: U347/R357; DEC338. Collect all maintained changes since 0.1.82 for staging-first delivery with full regression. Include CN purchase and renewal, the 100MB free plan and paid upgrades, current/upcoming periods, compact checkout and account cards, and Community CSS corrections. Preserve synchronization, original file modification times and regional isolation. Server 0.1.27 verifies payments and owns entitlement, refund and mail state. Global billing stays disabled. Real payment/refund, inbox receipt and device acceptance are separate gates; no production promotion or public Release is authorized.

CHG-20261027-13 validation: actual local browser fixtures using Obsidian 1.14.5 CSS covered modern/legacy containers, desktop/tablet/phone before/after and 20 mobile width/font combinations. Visible pane widths ranged 320–749px (larger requested widths were constrained by the browser panel); font sizes 16/24px. No measured row/button overflow, all mobile buttons at least 44px tall, wide-pane actions share a line, narrow panes remain stacked. Modern tablet synthetic overview height fell from894px to678px; legacy from926px to698px. These are synthetic layout checks, not physical-device acceptance. Both regional builds/isolation and diff checks passed. No installation or publication.

CHG-20261027-14 validation: fixed Node26.12.1 Client regression 201/201, both regional builds and isolation passed. Sixteen actual browser fixture combinations found no row/button overflow and all mobile buttons at least44px. At default16px font the three actions share a line even at320/390px; larger text wraps safely. Synthetic preview only, no physical-device acceptance or publication.

CHG-20261027-13/14 user acceptance (2026-10-27): after reviewing the compact preview the user requested implementation. The actual Client settings now use the accepted shared inset, wide-tablet layout and concise Chinese Sync records entry; this is runtime source, not a preview-only change. Existing 201/201 regression, regional build/isolation and browser fixture evidence applies because runtime code is unchanged by this acceptance record. Physical-device acceptance remains separate; no immediate release, installation or replacement of published 1.0.7 assets was requested.

CHG-20261027-18 preview refinement: the user requested the title, connection state and disclosure entry on one compact line. Render these in the native summary, with diagnostics expanding underneath; retain safe wrapping for narrow panes and live state updates. Six focused tests and both regional builds passed, and the actual browser preview verified the collapsed single row. No publication or installation.

CHG-20261027-19 status update (2026-10-27): the user rejected the incremental one-line identity preview as visually patch-like. Put this identity-layout candidate on hold; do not deliver it by merely omitting its release notes. Before freezing a later release, replace it with an explicitly accepted integrated design or revert its runtime delta while preserving unrelated approved work. A separate synthetic whole-overview concept was prepared at output/settings-inset-20261027/overview-redesign.html in the parent workspace; it is a visual concept only, not wired runtime or an accepted implementation. No further runtime edits, installation or publication were performed for this concept.

CHG-20261027-21 isolated-source verification: archived staged tree e4c168b384a2f2f2ef0ae2718dc5f0113c429574 outside the repository and reused only the installed dependency directory. The exact staged runtime/tests, excluding parallel LAN/tray modifications, passed203/203 tests and both regional builds/isolation under Node26.12.1. Source files are unchanged by this supplementary acceptance record. Audit snapshot retained at output/integrated-overview-staged-20261027 in the parent workspace.

CHG-20261027-21 copy refinement: shorten the approved pairing hint to “新设备取六位码，本机点‘添加设备’批准。” while retaining the new-device, six-digit-code and approval instructions. Seven settings regressions passed. The actual-definition mobile preview at390px viewport/300px hint width renders it in one20.47px line (20.48px line height); narrow or enlarged-text layouts may still wrap safely. Queue with1.0.9; no publication.

CHG-20261027-21 final wording: user explicitly selected the exact sentence “新设备获取六位码，本机点‘添加设备’批准。” for the1.0.9 pairing hint. Replace the earlier abbreviated wording and retain the guidance regression. Text-only refinement; no installation or publication.

CHG-20261027-21 matching dialog wording: user requested updating the Add device dialog hint to match the concise homepage instructions. Its Chinese approval help now reads “新设备获取六位码，本机点‘批准新设备’批准。” using the actual dialog button label. Homepage continues to name its Add device entry. Existing pairing flow and approval actions unchanged; queue with1.0.9, no installation or publication.


## 1.0.10 delivery confirmation — CHG-20261027-ULTRA-RELEASE-EXEC

The user-authorized China release1.0.10 is published. All11 release assets passed anonymous download/hash verification and latest points to1.0.10. Settings refresh/disclosure, narrow-cover/large-font/iPad layout and tray save-deferral fixes are included. Synthetic/browser and isolated native-Electron evidence remains distinct from physical mobile/Obsidian acceptance, which is pending. Original modification times and existing functions are preserved.
