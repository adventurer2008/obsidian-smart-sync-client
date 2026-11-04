# CHG-20261103-GLOBAL-AUTH-REFRESH

Requirement: successful browser registration/sign-in must update the plugin settings without another Sign in click or vault creation.

Root cause: finishGlobalSignIn persisted verified credentials/email without updating settings definitions, and reopening a pending flow did not restart polling. Verified authorization now requests a settings update; reopening resumes polling and browser focus/visibility checks the flow. Completed flows cannot open duplicate vault pickers. Existing expiry and local identity checks remain.

Windows and WSL Node 26.12.1 each passed 15 targeted authentication/creation tests. Both regional builds and Global isolation passed. Installed only in the existing isolated Global-Test-Vault. main.js SHA-256: 2302b59554d4c4e310b8ba15be3c72a24cc4e1a61502c04eea76d36386795bf5. Previous bundle retained outside Git.

Native settings still displayed the old signed-out view alongside the already authorized vault picker. Ctrl+R did not visibly reload it; the plugin-controls click failed because input geometry was unavailable. Native acceptance remains pending: reload only the isolated plugin/vault before testing. No account or cloud vault was created during this repair. China, formal Notebook, note content and source mtime were untouched. All six physical platform families remain unverified.
