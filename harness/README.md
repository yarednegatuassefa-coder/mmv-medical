# MMV Harness

## Initialization
1. Read AGENTS.md, CLAUDE.md and failures.md before patient-related work.
2. Read this guide and the relevant .hermes/skills/ workflow.
3. Inspect branch/status and relevant source/tests.
4. Read feature-list.json and latest progress entry.
5. Check Node/npm versions, dependencies and required environment-variable presence only. Never print values.
6. Use synthetic patient data only. Do not export patient records or send identifiers/health details to external agents.

## Commands
- npm run harness:check
- npm test
- npm run type-check
- npm run build

## Patient-safety gates
- Educate before price; no final treatment price without authorized clinical review.
- No patient-facing message without the required approval gate.
- No treatment-plan PDF without human review.
- No CRM write without explicit approval.
- Patient identifiers, health details, private communications and medical records must not be sent to external tools or agents.
- Consent, clinical review and data minimization apply to all automation.
- Never infer that a test or CI build authorizes real patient contact or a clinical decision.

## Task closure
Record the exact test/build outcomes and any clinical/privacy review required. Feature state must distinguish implemented code from clinically approved and operationally accepted behavior. Production access, CRM writes, patient communications, paid APIs and deployment require separate authorization.
