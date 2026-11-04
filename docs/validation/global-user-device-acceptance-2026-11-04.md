# Global user device acceptance — 2026-11-04

CHG-20261104-GLOBAL-USER-DEVICE-ACCEPTANCE.

User reports: login and deletion tests passed on iOS, Android and Windows. Record these as user-performed physical-device results, separately from automated tests and without inferring every platform/scenario has passed. This updates the previously pending acceptance of the reported workflows; it is not a new code change or release.

| Reported platform | Login | Deletion | Evidence boundary |
| --- | --- | --- | --- |
| iOS | User reports passed | User reports passed | No separate iPhone/iPad model, OS/build, identity provider or deletion subtype supplied in this report |
| Android | User reports passed | User reports passed | Exact device, OS/build and detailed steps not independently inspected |
| Windows | User reports passed | User reports passed | Exact installed build and detailed steps not independently inspected |
| macOS | Not reported | Not reported | Physical acceptance remains pending |
| Linux desktop | Not reported | Not reported | Physical acceptance remains pending |
| iPad/iPadOS as a distinct device category | Not separately identified | Not separately identified | Preserve the successful iOS report; do not duplicate it into an independently verified iPhone and iPad result |

Two user screenshots accompany the report. The first visibly shows an account still signed in, no current notebook connected, synchronization not started, and the message that the cloud vault was deleted, synchronization stopped and local notes were kept. The second shows one Account section and one collapsed Danger zone entry. These images support the displayed post-vault-deletion state and visible settings structure. They do not independently demonstrate account closure, a provider reauthentication round trip, or actual file/hash/mtime comparisons. Preserve the user's successful deletion report without guessing whether it refers to cloud-vault deletion, account deletion or both.

No raw screenshots, email address or account identifiers are copied into this public repository. No new operation was performed against the user's account or vault. The exact installed manifest was not inspected for this report, so do not invent a precise source/build binding.

This report does not certify storage-upgrade/browser opening, responsive pricing layout, real charges/renewals/refunds, all identity providers, offline recovery, background/lock/reboot, mixed-version fleets, identity/vault isolation negative cases, upgrade/rollback or encrypted body/source-mtime integrity. Their previous results and pending checks remain separate. Earlier automated and deployment evidence remains valid within its own recorded boundaries.
