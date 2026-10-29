# Cross-platform feature and scenario review

Requirement: CHG-20261029-CROSS-PLATFORM-REQUIREMENT, user instruction2026-10-29. This is a mandatory review for each feature, not a claim that every device has passed acceptance. Update the affected rows when behavior or verification changes. A build or simulated platform flag is not physical device acceptance; WSL is not desktop Linux UI acceptance.

## Per-change record

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


## CHG-20261029-SYNC-LEGACY-RETIREMENT-EXEC — 1.1.3入口收口并发布生产

Requirements: 用户本轮明确“按这个做吧，放下个版本，调整完放生产”。覆盖本项此前仅登记/暂不部署边界；授权实现、完整验证、预发、生产及下一正式版本交付。固定产品1.1.3，Server0.1.38；不覆盖1.1.2或历史发行资产。

sync旧网页/支付/管理/下载入口彻底关闭，不兼容、不跳转；唯一公共健康页面/health，/ss2/health只保留内部监控，不对公网开放。插件既有同步/认证/设备/应用申请/套餐协议API保持，实际支付与申请由固定独立pay/manage负责。购买凭证只返回pay域名，移除Client旧authority重写，预发购买也使用pay域名的/pay-test路径；后台对象清理由manage使用固定内部通道请求同步存储所有者。user网页仍依赖Core提供既有设备API，不宣称新增user独立后端；同宿主/Nginx/数据库，不宣称资源或故障完全隔离。

实施必须核对并处理在途订单及回调来源；不能把旧回调关闭当成订单已完成，不删除/伪造订单。旧版Hub/客户端可能需要升级才能使用旧购买/下载路径；同步协议、正文/加密/源mtime、身份/库隔离、进度及data.json不变。先完整门禁/预发、备份及代码配置回退验证，再生产。当前为实现待验证，不宣称上线。

跨平台：Windows/macOS/Linux桌面/Android/iPhone/iOS/iPad/iPadOS均条件支持现有标准HTTPS与Obsidian购买交接，本次六平台真机均未验证。没有新UI/断点/桌面原生能力，OS启动行为不适用；共享窄屏/触控矩阵按发布门禁执行，物理前后台/锁屏/重启/断网恢复仍未验证。混合版本、凭证拒绝、账户/库隔离、重复回调和升级回退按影响回归；合成通过不等于真实商户扣款退款或全平台验收。


## CHG-20261029-SYNC-RESPONSIBILITY — 同步职责硬边界

用户再次强调sync只负责同步、认证、设备和/health，其他业务各走自己的；发现不符必须修改并主动报告。本次1.1.3范围据此扩展：Client套餐/购买API直接使用pay，sync不再中转billing/application；user页面改独立程序/目录/服务，标准用户设备API由user精确请求同步核心。Core仅保留同步所需只读配额策略，不加载商户提供方；生产独立角色不接受sync旧Host。独立程序仍共用宿主/Nginx/业务数据库，用户设备API依赖同步核心是有意的职责调用，不宣称完全故障隔离。

发现生产3笔历史pending订单，二维码已过期，不能据此当作已取消或已支付；关闭旧回调前需逐笔只读查询支付渠道。旧客户端购买/套餐查询将在旧业务API关闭后需要升级，既有同步协议保持。Android正式支付API保留身份验签守卫的原生网络回退；预发pay路径隔离，预发原生回退未验证。实现、全门禁、迁移及真实设备验收分别记，不把计划标为完成。
