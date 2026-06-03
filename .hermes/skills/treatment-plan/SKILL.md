---
name: treatment-plan
description: Use when generating a treatment plan document for a qualified patient. Works for all treatment categories. Requires Dr. review and Jared approval before sending.
---

## Purpose
Generate branded treatment plan documents for MMV Medical patients.
HTML-first → render to PDF on demand.
Never send without Jared approval.
Treatment categories: dental | hair | cosmetic | IVF | orthopedic | oncology | other

## Treatment Plan Workflow
Step 1: Confirm all required fields are present (see below) — abort if any missing
Step 2: Select correct template for treatment_category
Step 3: Generate HTML treatment plan
Step 4: Run RubricMiddleware checks (see Verification Exit Criteria)
Step 5: If checks pass → render to PDF → submit to Jared approval gate
Step 6: If checks fail → revise → recheck → max 3 iterations before human escalation
Step 7: On approval → send to patient. On rejection → revise per Jared feedback.

## Required Fields Before Generating
### All treatments
- patient_id (Supabase)
- patient_full_name
- treatment_category
- country_of_residence (determines currency)
- date_generated

### Dental
- treatment_type (implants / veneers / full arch / other)
- implant_brand_tier (Macros / Nobel / Straumann) if applicable
- units_count
- bone_graft_required (yes/no)
- sinus_lift_required (yes/no)
- estimated_days_istanbul
- price_range (from Dr. Mehmet only — never self-generated)

### Hair
- technique (FUE / DHI)
- graft_count_estimate
- estimated_days_istanbul
- price_range (from specialist only)

### Cosmetic / Other
- procedure_name
- estimated_days_istanbul
- recovery_notes
- price_range (from specialist only)

## Document Structure (all categories)
1. Patient name and date
2. Recommended treatment summary
3. Step-by-step procedure breakdown
4. Timeline and stay duration
5. What is included (transfers, accommodation suggestions, aftercare)
6. Price range — never a fixed final price
7. Payment structure if VIP package flagged (60/40 split)
8. Next step — book a free video consultation

## Branding
- Navy and gold color scheme
- MMV Medical header
- Treating specialist credentials footer
- DejaVu fonts — avoids Turkish dotted-I rendering issues
- HTML-first: per-clinic branding via CSS swap, not full regeneration

## Anti-Rationalization Table
| Tempting shortcut | Why it's wrong |
|---|---|
| "The patient is ready, I'll add a fixed price" | Price range only — final price after clinical review |
| "I'll generate without all required fields" | Incomplete plans damage trust and create liability |
| "The currency is probably EUR" | Always derive from country_of_residence — UK = GBP |
| "Close enough on the Turkish chars" | One garbled character undermines the entire document |
| "3 iterations failed, I'll send anyway" | Escalate to Jared — never send a failed-check document |

## Verification Exit Criteria (RubricMiddleware — max 3 iterations)
- [ ] Currency matches country_of_residence (UK → GBP, NL/BE → EUR, etc.)
- [ ] No fixed final price anywhere in document
- [ ] Turkish special characters sanitized (ş ç ğ ı ö ü → DejaVu safe)
- [ ] VIP package inclusions listed if flagged in patient profile
- [ ] 60/40 payment split reflected if applicable
- [ ] Patient full name present and correctly spelled
- [ ] treatment_category matches template used
- [ ] No competitor names mentioned

Skill succeeds when: all 8 checks pass within 3 iterations → Jared approval gate submitted
Skill fails if: any check still failing after 3 iterations → escalate to Jared with failure log

## Never Do
- Send PDF without Jared approval
- Include fixed final price
- Include competitor comparisons
- Generate without complete required fields
- Use wrong currency for patient's country
- Send after 3 failed RubricMiddleware iterations without escalating
