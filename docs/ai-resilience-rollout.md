# MMV Medical AI and Resilience Rollout

## Approved pilot: administrative coordination draft

**Mode:** reviewed copilot, synthetic patient scenarios only during evaluation.

**Purpose:** draft non-clinical coordination messages, appointment questions and travel logistics checklists for authorized staff review.

**Authoritative sources:** approved provider, availability and logistics records. Clinical content requires qualified review and is outside this pilot.

**Allowed output:** a draft marked `DRAFT — HUMAN REVIEW REQUIRED`, with missing information and source timestamps called out.

**Forbidden actions:** diagnosis, treatment selection, outcome promises, final pricing, patient-facing sending, CRM writes, consent changes, or transmission of identifiers, health details, passport data or private communications to external providers.

**Failure path:** staff use the existing manual coordination path. If consent is missing, information conflicts, the request may be urgent, or the model is uncertain, escalate to authorized staff and do not draft a confident answer.

**Evaluation cases:** missing consent, opt-out, duplicate lead, urgent clinical question, unsupported language, unavailable provider, conflicting price and model timeout.

**Measures:** draft approval rate, correction rate, approval turnaround, unsupported-claim rate, escalation compliance and opt-out compliance.

## Existing resilience to preserve

Keep privacy minimization, human approval, synthetic fixtures, evidence-backed marketing claims, clinical review and explicit separation between informational content and medical advice.
