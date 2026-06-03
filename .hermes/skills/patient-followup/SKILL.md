---
name: patient-followup
description: Use when a patient has gone quiet or needs a follow-up message. Works for all treatment categories. Never chase — continue the guidance.
---

## Purpose
Re-engage patients who have not responded.
This is a continuation of guidance, not a sales chase.
Treatment categories: dental | hair | cosmetic | IVF | orthopedic | oncology | other

## Follow-up Workflow
Step 1: Check last message date and pipeline_stage in Supabase
Step 2: Check reply_classification from last interaction
Step 3: Select correct sequence position (Day 3 / 7 / 14 / 30)
Step 4: Draft message — educational angle, value-add, no pressure
Step 5: Submit to Jared approval gate before sending
Step 6: Log send event in Supabase (message_date, sequence_position)
Step 7: On reply → classify → route accordingly

## Follow-up Sequence
- Day 3: Soft check-in — educational angle relevant to their treatment category
- Day 7: Share something relevant — FAQ, what to expect, savings comparison
- Day 14: Final gentle touch — leave door open, no pressure
- Day 30: Close sequence — log as cold in Supabase, stop all contact

## Reply Classification → Action
| Classification | Action |
|---|---|
| POSITIVE | Escalate to Jared immediately for booking |
| NEUTRAL | Answer question + offer one clear next step |
| OBJECTION | Surface competitive rebuttal points + escalate to Jared |
| OOO | Reschedule follow-up to current_date + 7 days |
| NEGATIVE | Close sequence immediately, log in Supabase, no further contact |

## Message Principles
- One message per follow-up, never two in a row
- Always add value — never just "checking in"
- Match language of patient's last message
- Tone adapts by treatment category — oncology and IVF require softer tone than cosmetic
- Never mention competitors
- Never create urgency that doesn't exist
- Never mention price in a follow-up

## Anti-Rationalization Table
| Tempting shortcut | Why it's wrong |
|---|---|
| "I'll send one more after Day 14, just to be sure" | 3 follow-ups max — more is harassment |
| "They're probably just busy, I'll follow up on Saturday" | No weekends for UK/NL patients |
| "A gentle price mention might motivate them" | Price in follow-up = pressure = trust loss |
| "Their last message was neutral so I'll skip classification" | Always classify — neutral is still a data point |
| "This is urgent so I'll skip the approval gate" | No patient-facing message sends without Jared approval |

## Verification Exit Criteria
Skill succeeds when:
- [ ] Correct sequence position selected based on Supabase data
- [ ] Message drafted with value-add, no price, correct language
- [ ] Approval gate submitted to Jared before send
- [ ] Send event logged in Supabase with message_date and sequence_position
- [ ] Reply classified and routed correctly

Skill fails if:
- Message sent without Jared approval
- Fourth follow-up sent after NEGATIVE classification
- Follow-up sent on weekend to UK/NL patient
- Price mentioned in any follow-up message

## Never Do
- Send follow-up if patient said not interested
- Follow up more than 3 times without response
- Mention price in any follow-up
- Follow up on weekends for UK/NL patients
- Send without Jared approval gate
- Skip logging in Supabase
