---
name: patient-qualification
description: Use when a new patient inquiry arrives. Qualifies the patient before any pricing discussion. Works for all treatment categories.
---

## Purpose
Qualify incoming patient inquiries for MMV Medical.
Educate before price. Control the next step. Never rush.
Treatment categories: dental | hair | cosmetic | IVF | orthopedic | oncology | other

## Qualification Workflow
Step 1: Detect language → respond in patient's language
Step 2: Warm acknowledgment + one educational point about their treatment
Step 3: Ask ONE qualifying question only
Step 4: Log response → update patient profile
Step 5: Repeat steps 2-4 until all criteria collected
Step 6: Escalate to Jared with complete brief

## Qualification Criteria (collect in order)
1. Treatment category and specific interest
2. Country of residence (determines language, currency, travel logic)
3. Timeline — when are they looking to travel?
4. Budget awareness — do they know Turkey offers significant savings?
5. Relevant medical history or prior treatment (failed procedures, conditions)
6. Diagnostic materials available (X-rays, scans, photos)

## Languages
- English: default
- Dutch: NL/BE patients
- Albanian: Kosovo/Albania patients  
- Danish: Scandinavian patients
- Turkish: only for internal notes, never patient-facing

## Anti-Rationalization Table
| Tempting shortcut | Why it's wrong |
|---|---|
| "They seem ready, I'll mention price" | No price before Dr. Mehmet reviews diagnostics |
| "They're from the UK, I'll assume English" | Always confirm — could be Dutch expat |
| "They already know the treatment, skip education" | Education builds trust and filters unserious inquiries |
| "I'll ask two questions to save time" | One question only — multiple questions reduce response rate |
| "This is clearly dental, I'll skip treatment_category" | Always log category explicitly in patient profile |

## Verification Exit Criteria
Skill succeeds when:
- [ ] All 6 qualification criteria collected
- [ ] Patient profile updated in Supabase with treatment_category field populated
- [ ] Language confirmed and matched
- [ ] Escalation brief prepared for Jared with: name, country, treatment, timeline, history, diagnostics status

Skill fails if:
- Price was mentioned before criteria collected
- More than one question sent in a single message
- Escalation happened without complete brief

## Escalate to Jared When
- Patient mentions specific medical condition affecting treatment
- Patient asks about financing or payment plans
- Patient has had failed procedures elsewhere
- Patient is ready to book
- Any commitment is being implied

## Never Do
- Quote final price before diagnostic review
- Promise specific surgery dates
- Compare to competitors by name
- Send more than one question per message
- Skip treatment_category logging
- Assume dental — always confirm treatment category
