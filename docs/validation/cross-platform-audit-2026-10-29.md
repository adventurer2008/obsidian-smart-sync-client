# Recent-feature cross-platform audit — CHG-20261029-CROSS-PLATFORM-AUDIT

Scope: notebook cloud usage, compact management dialog, reduced explanatory text, LAN details, startup-to-tray and background tray, plus the shared read-ahead/log/checkpoint changes on which they depend. The user requested a comprehensive device/platform review, repairs and the next Alpha; candidate1.1.2-alpha.6 does not change Stable1.1.1 or install itself.

## Reproduced issues and repairs

1. A copied Windows `launchAtLogin` flag blocked turning off the background tray on macOS/Linux, although startup is unsupported there. A regression failed against alpha.5. Limit this guard to supported Windows hosts with a registration not known invalid.
2. Removing an owned startup entry depended on reading the host's vault registry. A missing registry prevented disabling startup. A regression failed against alpha.5. Resolve vault identity only when enabling/checking, or when necessary to validate a moved registration; same-path removal of an owned entry works without that registry.
3. Activation display and hiding previously trusted saved preferences. Re-check the local owned shortcut, exact executable, native vault identity and marker; missing or migrated entries show off with a re-enable explanation and cannot hide the window. Invalid saved markers are regenerated only on explicit opt-in.
4. Add an owned registration-path binding. A moved vault retaining its native ID can inspect/remove its original entry, while a copied vault with a new ID cannot replace/delete the source. Other vaults and the CN/Global editions remain independent. A vault moved after enabling an earlier Alpha without a recorded path may need manual cleanup/re-enabling; legacy unknown ownership is not guessed or deleted.
5. Guard asynchronous startup status against newer user changes and account/vault changes. Add capacity-response regressions for account switches and refresh, retaining existing close/unload guards.

Original failing regression evidence is retained locally as output/startup-audit-before.txt. Fixes do not change OS startup configuration during tests or installation.

## Executed checks

| Check | Result | Boundary |
|---|---|---|
| Windows Node24.14 complete suite |267 passed,1 optional skipped /268 | Three-device paired service is skipped in this run; native NTFS check runs. |
| WSL Node26.12.1 complete suite with paired local service enabled |267 passed,1 platform skip /268 | Three-device service passes; native Windows NTFS check is inapplicable. WSL is not Linux desktop acceptance. |
| Paired synthetic service |Passed within WSL suite | Three clients, legacy position behavior, lost replies, rename/delete, unchanged content/source mtime; isolated temporary accounts/database and no production server. Not three physical phones/computers. |
| Native/platform/startup/isolation regressions |Passed in suites | Windows/macOS/Linux/mobile capability branches, per-vault/edition shortcut ownership, moved/copied vaults, rollback/save failure, request markers, status races, manual-stop retention. Native operations use doubles. |
| Configuration protection |Passed | Own CN/Global code and data.json remain excluded from plugin sync on desktop/mobile scopes, preventing startup markers, sync identity and progress propagation. |
| Notebook dialog browser matrix |84 cases,0 failures | Actual Client dialog controller + host CSS in Chromium/WebKit:280/320/430/744/1180/960/1440 widths, phone/tablet orientation profiles,13/24/32px font and light/dark;44px mobile touch targets and no clipping/overflow. Not physical iOS/WebKit acceptance. |
| Shared settings UI smoke matrix |72 cases,464 inspections,0 failures | Maintained legacy/modern settings controller with Chromium/WebKit and real host CSS; browser simulations only. |
| CN and Global build/isolation |Passed |25-module closed dependency list; only CN Alpha is published. Global remains unready for release. |
| Community lint |0 errors,5 existing warnings | Not Obsidian Community approval. |

## Six-platform disposition

- Windows: common features and default-off login startup implemented; synthetic settings/native-operation/isolation checks pass. Actual logout/reboot, cold protocol delivery, tray focus and OS policy require user host acceptance.
- macOS: common features use shared code; copied startup preferences no longer block tray changes. Startup control stays hidden with no OS entry creation. Physical tray/menu-bar and lifecycle acceptance pending.
- Desktop Linux: same guarded shared behavior and hidden Windows startup control; WSL service/runtime tests are not GNOME/KDE tray or packaged Obsidian desktop verification.
- Android: shared responsive UI and synchronization tests, guarded mobile paths, desktop-only controls hidden. Actual WebView, memory, background/suspension and touch acceptance pending.
- iPhone/iOS: same shared/guarded mobile design; small-screen and WebKit simulation pass. Physical app sandbox, foreground/background and keyboard/touch acceptance pending.
- iPad/iPadOS: tablet, split-size and landscape simulation pass; desktop native controls remain hidden. Physical split view, memory/background and touch acceptance pending.

## Remaining acceptance and rollback limits

No physical platform result is invented. No current test can establish unlimited mobile background execution. A moved legacy alpha.5-or-earlier registration without a saved path is not automatically deleted by guessing; turn startup off before moving, uninstalling or reverting to an unsupported version. Code-only rollback retains current data/configuration and cannot reverse cloud migrations. Actual host trust/security prompts remain user actions. All tests use synthetic/isolated data; test1–test4 and real accounts, keys, notes and original mtimes were not modified.

Local evidence: output/wujie-sync-1.1.2-alpha.6/windows-tests.txt, wsl-tests.txt, community-check.txt, recent-ui/results.json, overview-ui/results.json, candidate build/installation receipts and manager contract checks. Older evidence is preserved.

## Publication

CN Alpha1.1.2-alpha.6 is published at the existing HTTPS download site.15 public files match local SHA256; the current plugin-manager parser/download functions accept the manifest/version and three-file hashes and reject tampering. Latest Alpha points to alpha.6 while history stays available. Stable GitHub latest remains1.1.1; previous immutable Alpha files remain unchanged. Production synchronization MainPID remains156980/active, with no service restart. Only static downloads/metadata changed; no user installation, real Startup entry or live account/library mutation was performed.
