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


## Emil Kowalski design-engineering skills

For interface and interaction work, use the upstream [Emil Kowalski skills](https://github.com/emilkowalski/skills) through the shared Home skill installation. The Home catalog is the portfolio routing reference: https://github.com/yarednegatuassefa-coder/home/blob/main/skills/README.md.

Apply only the skill that matches the task; do not invoke the entire collection by default. This is a healthcare information and patient-coordination interface. Prioritize clarity, trust, legibility, accessible forms, multilingual content, and calm restrained motion. Do not use animation or visual persuasion to imply clinical outcomes, urgency, or treatment certainty. Test only with synthetic patient data; clinical and privacy safeguards remain controlling.

- **Design baseline:** consult `emil-design-eng` for relevant UI/animation decisions; preserve the product's existing design tokens and component conventions.
- **Build motion:** use `animate` for requested motion, `choreograph` for coordinated sequences, and `gestures` / `animate-expo` only when the product actually has gesture or Expo-native interactions.
- **Audit and repair:** use `review-animations` for changed motion, `improve-animations` for a codebase-wide motion audit and plans, `animation-performance` for dropped frames, and `remove-animations` when motion is unnecessary.
- **Responsive/mobile QA:** use `mobile-native` for mobile-web behavior and `break-ui` for worst-case content and layout stress tests.
- **Architecture and exploration:** use `pick-ui-library` before adding a UI dependency; use `prototype` when comparing interaction concepts; use `apple-design` only when its platform principles fit the product.
- **Learning and routing:** use `ask-emil` when the right design skill or sequence is unclear; use `learn-taste` at the end of a design session to capture approved corrections as durable project rules. Use `ask-sonner` only if this project uses Sonner.

**Quality gates:** motion must have a user-facing purpose, respect frequency and performance budgets, support `prefers-reduced-motion`, and avoid animating high-frequency or information-dense workflows. Prefer no animation over decorative motion. Keep keyboard and primary operational flows immediate. Reuse existing tokens and dependencies; do not add a library or alter the visual system without task scope and approval. Validate desktop/mobile, keyboard/focus, reduced-motion, loading/empty/error states, and long/unusual content as applicable.

These skills do not override this repository's domain, security, privacy, accessibility, financial, clinical, or release safeguards. Skill availability is not authorization to install dependencies, call paid services, access production data, publish, or deploy.


## Architecture quality
Follow the portfolio [Architecture Quality Standard](https://github.com/yarednegatuassefa-coder/home/blob/main/standards/architecture-quality.md) and [Portfolio Architecture Quality skill](https://github.com/yarednegatuassefa-coder/home/blob/main/skills/portfolio-architecture-quality/SKILL.md). Run `npm run architecture:check` for JavaScript/TypeScript changes. Review touched interfaces for leaked fields and shallow/pass-through modules; the static checker cannot decide those semantic questions. Structural fixes must explain the evidence, design decision, rejected alternative, compatibility impact and verification. Do not suppress findings with blanket exclusions or arbitrary allowlists. Use `deslop-please` only in actual Rust/Cargo repositories.
