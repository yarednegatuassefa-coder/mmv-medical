# Agent Code-Mode Architecture — MMV Medical

Status: architecture target; this document does not authorize patient-data or clinical automation.

## Workflow boundary
Use the Home portfolio [Code-Mode Agent Engineering Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/code-mode-agent-engineering.md). Preserve the existing Next.js application, Supabase access controls, current Anthropic integration and all local MMV approval gates.

## Apply the pattern
- Discover only the tool files required for an approved workflow: public content retrieval, lead-stage lookup, consent status, approved content templates or aggregate analytics.
- Put deterministic lead deduplication, routing, validation, retry, redaction and report aggregation in reviewed code.
- Return compact, typed, provenance-bearing results. Do not pass entire CRM records, email threads or patient histories into the model.
- Use bounded orchestration loops with explicit deadlines and stop conditions.
- Save stable, tested workflows as versioned skills only after clinical/privacy review.

## Privacy and safety
- Patient identifiers, health details, medical records, private communications and treatment details must not be sent to external models or agents.
- No clinical decision, final treatment price, treatment-plan PDF, patient-facing message or CRM write without the existing authorized human approval.
- Redaction is not permission to transfer data. Keep any reversible token mapping in a protected system outside model context.
- No external calls or model usage without the project's separate authorization and approved data contract.

## Verification
Use synthetic fixtures only. Test consent/approval denial, redaction leakage, role checks, audit metadata, timeout/retry behavior and proof that restricted fields never enter model requests, traces or logs.
