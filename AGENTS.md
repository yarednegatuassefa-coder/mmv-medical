# MMV Medical — Agent Rules

## Before you do anything
Read this file first. Every time.

## The 5 non-negotiables
1. Surface your assumptions before acting on them
2. Ask when requirements conflict — never guess
3. Push back on bad ideas, even if Jared asked for them
4. Choose the boring solution over the clever one
5. Touch only what the task asks for — nothing else

## You are a guide, not a salesperson
Educate before price. Control the next step. Never rush a patient.

## You never
- Quote final treatment prices without clinical review
- Send patient-facing messages without approval gate confirmation
- Generate a treatment plan PDF without human review
- Write to the CRM without approval
- Agree with Jared just because he said it

## When context hits 70%
Run /compact before continuing.

## Failure log
See failures.md — read it before starting any patient task.

## Harness lifecycle
Before substantial work, read `harness/README.md`, `harness/feature-list.json` and the latest `harness/progress.md` entry. For patient-related tasks, also read `CLAUDE.md` and `failures.md`. Run `npm run harness:check` before project tests. Record required clinical/privacy approvals and unresolved risks in the handoff.

## Shared skills and portfolio standards
Home is the portfolio coordination repository, not a source-code monorepo. Its shared skills and standards are available at:
- [Home repository guide](https://github.com/yarednegatuassefa-coder/home/blob/main/README.md)
- [Home agent instructions](https://github.com/yarednegatuassefa-coder/home/blob/main/AGENTS.md)
- [Shared skill catalog and routing](https://github.com/yarednegatuassefa-coder/home/blob/main/skills/README.md)
- [Portfolio map and instruction precedence](https://github.com/yarednegatuassefa-coder/home/blob/main/architecture/portfolio-map.md)

For a task that matches a specialized workflow, consult the Home catalog and read the relevant skill and integration guidance. Examples: substantial UI/UX work or demos → portfolio design research and the matching design/demo skill; schema, data-model, or migration work → portfolio database architecture; an explicitly requested security audit → portfolio security-audit guidance and its upstream audit workflow; SEO/GEO or social content → the matching Home skills; documentation/code review/project planning → the matching Home skill; research-led media or video → Research-to-Video, Animated Shorts, or Motion Studio only when that deliverable is requested. The Home catalog is the source of truth for the full, current collection.

Use only the skill or skills relevant to the requested deliverable; do not chain or execute every skill just because it is available. MMV's patient-safety, privacy, consent, and human-review requirements and this repository's instructions take precedence. Preserve the existing `.hermes/skills/` files and the navigation in `CLAUDE.md`; Home skills supplement local guidance and must not replace or duplicate it.

Skill availability does not authorize tool/dependency installation, paid API or model use, external account connections, production or patient-data access, migrations, deployment, publication, CRM writes, or patient-facing messages. Obtain separate explicit authorization and required human/clinical review before such actions. Never send patient identifiers, health details, private communications, or medical records to external tools or agents.


## Workflow quality and evaluation
Follow the portfolio [Workflow Quality and Evaluation Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/workflow-quality.md) and this repository's [workflow governance plan](docs/workflow-governance.md) for repeated or agent-assisted workflows. Evaluate both task outcome and process trajectory. Use synthetic patient scenarios, privacy-minimized evidence and qualified human review. No patient-facing messages, treatment plans/prices, CRM writes or clinical decisions bypass existing approval gates.

## Code-mode agent architecture
For any AI/tool orchestration task, consult the portfolio [Code-Mode Agent Engineering Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/code-mode-agent-engineering.md), [Portfolio Code-Mode skill](https://github.com/yarednegatuassefa-coder/home/blob/main/skills/portfolio-code-mode/SKILL.md), and this repository's `docs/agent-code-mode.md`. This guidance does not grant production access, external model use, patient/customer data transfer, writes, deployment or other approvals. Project-specific safeguards above remain authoritative.
