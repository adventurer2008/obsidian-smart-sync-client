# Windows login startup to tray — CHG-20261029-WINDOWS-STARTUP-TRAY

The user requested launch at login, selected opening this vault hidden to its tray, and placed the switch inside Advanced. Candidate1.1.2-alpha.5 keeps it off by default and does not install a startup entry during load or build.

## Implementation

- Uses the current user's Windows Startup folder, one owned shortcut per canonical vault path and plugin ID. The exact vault ID is resolved locally from the host's vault registry; duplicate names do not route to another vault. Registry paths and account credentials are not printed or uploaded.
- Electron shell shortcut APIs create/read the shortcut. The target is the host's executable with a percent-encoded Obsidian URI; no command shell, admin permission, login task or cloud service is used. The plugin does not overwrite another vault's or application's startup entry.
- A custom marked URI includes both the host routing vault ID and an explicit target field; a persisted local marker and enabled state must match before hiding. Ordinary launches have no marker and stay visible. No live tray means fail visible.
- Settings persistence failure restores only the startup-owned settings and shortcut, preserving unrelated settings. Conflicting shortcut edits refuse rollback instead of overwriting another actor's changes.
- Existing manual sync-stop, account, keys, progress, intervals, body integrity and original mtime behavior remain unchanged. Enabling also enables the background tray; disable login startup first before disabling the tray, uninstalling or reverting to an older version. Normal unload/restart preserves the user's startup entry.
- Non-Windows and mobile hosts do not show the switch. No startup shortcut has been installed on the operator's computer by this work.

## Verification boundaries

Final candidate results: Windows Node24.14 254 passed/1 optional skipped; WSL Node26.12.1 253 passed/2 optional skipped, 255 total each and zero failures. CN/Global builds and25-module isolation checks pass; community lint has0 errors and5 pre-existing warnings. The first full run rejected an English platform name in the Chinese catalog; its failed logs remain saved and the wording was fixed without relaxing the copy check. Published CN Alpha15 files verified over HTTPS; manager feed/manifest/hash and tamper-rejection checks pass. Prior Alpha files and Stable1.1.1 remain intact. Evidence is retained in output/wujie-sync-1.1.2-alpha.5; production sync service MainPID unchanged156980.

Synthetic coverage includes marked request isolation, exact-ID routing, initial state with no shortcut, create/delete/undo, write failure restoration, ownership conflicts, rollback conflicts, failed settings save, unrelated setting preservation, manual-stop retention, Windows-only Advanced placement, mobile/non-Windows hiding, and tray hide/restore/disposal confined to one window. These tests use in-memory filesystem/native doubles, not the real Startup folder.

Physical Windows logout/reboot, cold Obsidian protocol dispatch timing, antivirus/startup policy behavior and real vault hidden-window acceptance are not yet performed. User Alpha integration is required; no zero-bug or physical-host acceptance claim is made.

API references: [Electron shell shortcuts](https://www.electronjs.org/docs/latest/api/shell), [Obsidian URI](https://obsidian.md/help/uri). Native Obsidian protocol registration is used through its plugin API; host-specific vault registry and Electron remote access are runtime-guarded and fail closed.
