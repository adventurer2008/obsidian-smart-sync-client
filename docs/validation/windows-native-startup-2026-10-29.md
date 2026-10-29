# Windows native startup acceptance — partial, local candidate

Requirement: CHG-20261029-WINDOWS-NATIVE-STARTUP. Independent synthetic vaults only; preserve live libraries and synchronization. Candidate1.1.2-alpha.7 is local and unpublished.

## Real-host evidence

The user completed trust confirmation. A and B loaded the candidate in their dedicated user-data profile, with distinct renderer processes and native vault IDs. The first A observations used Obsidian1.14.4; the host updater subsequently loaded1.14.5 in the test profile. Both A/B and the final fixed candidate were checked on1.14.5. No OS logout/reboot was performed.

The fixture driver uses real Electron BrowserWindow and Tray objects inside the owning profile. Native tray event emission invokes the actual product callbacks; it is not a physical mouse click. Direct startup-handler invocation covers the plugin path only, not a cold application launch or Windows login.

Before the final profile guard,15 native observations verified separate real Startup links, A-only startup-handler hiding, click/double-click restoration, minimize/close-to-tray without destruction, B remaining visible, and disabling A leaving B's link hash intact. Both links were then removed.

After the guard,11 checks verified both candidate plugins loaded, a custom-profile registration attempt failed with STARTUP_CUSTOM_PROFILE, no shortcut or enabled flag was created, normal tray minimize/close and restoration still worked, and B remained unaffected. Both synthetic note hashes and source mtime1700000000123 remained unchanged. Manual sync stop stayed set; no cloud workspace or account keys were configured. The renderer session blocks HTTP/HTTPS for the fixture. This does not block the host's independent main-process updater.

## Reproduced isolation issue and repair

A warm second-process URI request did not open registered test B. Inspection of installed1.14.4 and locally updated1.14.5 host code found a named CLI pipe keyed by Windows username, rather than user-data profile. Thus --user-data-dir alone cannot guarantee that a warm URI request reaches its profile; it may reach the default instance. No further CLI URI requests or test shortcut execution followed this finding. An earlier transient Error window was observed; its cause was not conclusively attributed. No live-vault plugin, registry, contents, credentials or synchronization settings were intentionally modified.

The candidate now refuses enabling and reporting active login registration for custom profiles, explains the restriction in Chinese/English, retains normal tray operation and permits removal of their own previous entries. Default-profile shortcuts include the quoted profile and exact native vault ID; another profile's bound entries cannot be overwritten or deleted. Missing markers, moved/copied vaults and rollback protection remain covered. This is a deliberate guarded-support boundary, not a claim that custom-profile startup works.

## Regression and cleanup

- Windows Node24 runtime:270 passed,1 optional skip,271 total.
- WSL Node26 with isolated paired-service regression enabled:270 passed,1 platform skip,271 total. WSL is not native desktop Linux acceptance.
- CN/Global candidate builds and25-module isolation checks pass. Community lint:0 errors,5 existing warnings. Initial lint attempts failed because the staging lint dependencies were absent and root artifacts were stale; linking the existing local lint dependency directory into the isolated stage and checking its freshly built artifacts passed without relaxing coverage.
- All4 pre-existing Windows Startup files have exactly their original hashes; no synthetic startup entry remains. Synthetic test app exits normally; original app instances remain running. Launcher holders stop via the fixture marker.

Local evidence is under the ignored fixture referenced by output/native-startup-current.json: native-observations.jsonl, cleanup-verification.json, startup-before.json and per-vault command results. Original program files/data outside the fixture are not part of this test deployment. No Alpha publication, service deployment or system restart was performed.

## Remaining acceptance

Actual default-profile cold URI dispatch and Windows logout/login/reboot are unverified. They cannot safely be tested while preserving the user's currently active default profile under this task's isolation constraint. Do not label launch-to-tray fully accepted. Native macOS/Linux trays and Android/iOS/iPadOS device checks remain separate; the Windows login feature is unavailable on those platforms.

## Authorized CN Alpha publication

After the native test run, the user explicitly authorized publishing1.1.2-alpha.7 while preserving Stable and existing account/key/progress state. Published at2026-10-29T02:21:36Z. All15 staged files match anonymous public HTTPS downloads from the production host. The actual manager adapter accepts the7-version Alpha history and latest three-file bundle and rejects tampering; online file hashes match the verified local contract inputs. All60 prior immutable site files remain unchanged. The Stable record and GitHub1.1.1 release assets are identical to the pre-publication snapshot. Production, staging and Nginx service identities are unchanged; no service restart or user-vault installation was performed. Only main.js,manifest.json,styles.css are update payloads; no data.json,keys or checkpoints are packaged. The user will perform actual Windows login and tray restoration acceptance. Receipt: ignored output/wujie-sync-1.1.2-alpha.7/publication-receipt.json.
