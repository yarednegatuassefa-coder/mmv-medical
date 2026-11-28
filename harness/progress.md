# MMV Harness Progress

## 2026-11-16 — HARN-BASELINE
- **Objective:** Establish a privacy-first harness with durable task state and clinical approval gates.
- **Branch / commit:** feat/portfolio-harness-engineering
- **Changed:** harness/README.md, harness/feature-list.json, harness/progress.md; executable preflight and CI gate are included in this change set.
- **Verification:** Pending GitHub Actions on the pull request.
- **Not run / blocked:** No patient data, CRM, production system or external clinical service was accessed.
- **Decisions:** Synthetic data only; patient communications, CRM writes and clinical outputs remain human-approved.
- **Risks / approvals:** Clinical safety and patient privacy remain high-impact constraints.
- **Feature ledger updates:** Initial harness adoption tasks recorded.
- **Next action:** Inspect CI results and complete a privacy/clinical workflow review before operational use.

## 2026-11-28 — LETTER5-PILOT-003
- **Objective:** Add a synthetic, draft-only administrative coordination policy that escalates consent, opt-out, urgency, clinical content, conflicts, unavailable providers and timeouts.
- **Branch:** feat/letter-5-ai-resilience
- **Changed:** `src/lib/coordination-draft-policy.mjs` and `tests/coordination-draft-policy.test.mjs`; synthetic input minimization, human-review marker, refusal patterns and manual fallback classification.
- **Verification:** `npm run harness:check` passed; syntax check passed; targeted Node tests passed 4/4. No patient identifiers, health details, CRM writes, patient messages or external provider calls were used.
- **Not run / blocked:** Architecture check requires the repository’s declared TypeScript dependency; full `npm test`, type-check and build were not run because this checkout lacks the project runtime dependencies.
- **Clinical/privacy approval:** Required before any operational integration. The feature remains `implemented_unverified` and is not patient-facing.
- **Next action:** Independent clinical/privacy review and CI verification before any route or workflow integration.
