# Cross-platform feature and scenario review

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
