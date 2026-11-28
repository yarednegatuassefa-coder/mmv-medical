# MMV Medical Workflow Governance

This project follows the portfolio [Workflow Quality and Evaluation Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/workflow-quality.md), together with MMV's patient-safety, consent, privacy and human-review rules in `AGENTS.md`, `CLAUDE.md` and `failures.md`.

## Priority workflows

| Workflow | Required invariant | Primary measures |
|---|---|---|
| Lead intake | Collect only necessary information with clear purpose and consent | Valid lead rate, consent completeness, response time |
| Lead qualification | Administrative qualification only; no diagnosis or unsupported clinical triage | Qualification completeness, escalation rate |
| Provider/hospital matching | Use approved, current provider information and disclose uncertainty | Match completeness, correction rate |
| Appointment coordination | Confirm availability and logistics with authorized staff; do not promise unverified outcomes | Booking completion, time to confirmation, cancellation rate |
| Patient communication | Educational, respectful and non-coercive; human approval before sending | Response time, complaint/opt-out rate, satisfaction |
| Treatment/pricing information | No final treatment price or plan without appropriate clinical review | Review completion, correction rate |
| Follow-up | Respect consent, communication preferences and opt-outs | Follow-up completion, opt-out compliance |

## Evaluation gates

- Use synthetic patient scenarios and fabricated contact details in tests.
- Test consent missing/withdrawn, opt-out, duplicate leads, unsupported language, unavailable provider, ambiguous request, urgent clinical question and conflicting price/treatment information.
- Verify no patient-facing message, treatment plan PDF, CRM write or final price bypasses the required human approval gate.
- Validate translations and claims with qualified reviewers where appropriate.
- Keep marketing claims evidence-backed and distinguish general information from clinical advice.

## Approval and data boundaries

No external agent or telemetry system receives patient identifiers, health details, medical records, passport data, private conversations or raw CRM exports. Minimize collection and use approved access controls. AI may draft administrative text for review; it does not make clinical decisions, promise outcomes, finalize treatment prices, send patient messages or write CRM records without the existing approval process.

## Measurement

Track qualified leads, first-response time, booking conversion, appointment completion, patient satisfaction, opt-out/complaint rate and approval compliance. Define source, denominator and time window. Do not optimize conversion at the expense of patient autonomy, accuracy, consent or safety.

## Current implementation status

This is an operating and evaluation specification only. It does not assert that all instrumentation, integrations or evaluations are live. Record actual test and human-review evidence in the project harness.

## Letter 5 implementation

See the shared [Portfolio AI and Resilience Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/ai-resilience.md) and the MMV [AI/resilience rollout](ai-resilience-rollout.md). The first pilot is synthetic, administrative, draft-only coordination assistance; clinical and patient-facing authority remains human-controlled.
