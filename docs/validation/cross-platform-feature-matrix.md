# Cross-platform feature and scenario review

Requirement: CHG-20261029-CROSS-PLATFORM-REQUIREMENT, user instruction2026-10-29. This is a mandatory review for each feature, not a claim that every device has passed acceptance. Update the affected rows when behavior or verification changes. A build or simulated platform flag is not physical device acceptance; WSL is not desktop Linux UI acceptance.

## Per-change record

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
