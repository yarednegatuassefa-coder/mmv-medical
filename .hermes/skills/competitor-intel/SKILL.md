---
name: competitor-intel
description: Use for daily competitor monitoring across all MMV treatment verticals. Runs via Hermes cron at 6AM. Delivers digest to Telegram.
---

## Purpose
Monitor medical tourism competitors targeting MMV's patient markets.
Deliver a concise daily digest to Jared's Telegram by 6AM Istanbul time.
Raw finding → claim → verified knowledge → action. Never collapse this chain.

## Competitor Monitoring Workflow
Step 1: Run all competitor checks (pricing, reviews, promotions, content, ads)
Step 2: Classify each finding: FINDING / CLAIM / VERIFIED (needs 3 sources to become verified)
Step 3: Route weak signals → research-vault/queue/verification-review.md (do not action)
Step 4: Draft digest — max 300 words
Step 5: Deliver to Telegram by 6AM Istanbul time
Step 6: If Action needed = yes → route to qualification_manager or content_agent handoff queue

## Competitors to Monitor
### Dental (primary)
- STR DENT (Turkey)
- Asli Tarcan Clinic (Turkey)
- Opus Smile (Turkey) — highest priority, UK corridor
### Dental (secondary)
- Budapest dental clinics (Hungary)
- Tirana clinics (Albania)
### Expand as MMV adds verticals
- Hair: Cosmedica, Smile Hair Clinic (Istanbul)
- Cosmetic: when clinic #2 signed
- IVF/Orthopedic: when vertical launches

## What to Monitor
- Pricing page changes
- New Google reviews (positive and negative)
- New promotions or offers
- New content or blog posts targeting UK/NL/IE/Scandinavia
- Google Ads changes (if visible)
- Social media activity targeting MMV's patient markets

## Digest Format (max 300 words)Date: [date]
STR DENT: [one line — change or "no change"] [FINDING/CLAIM/VERIFIED]
Asli Tarcan: [one line] [FINDING/CLAIM/VERIFIED]
Opus Smile: [one line — never skip] [FINDING/CLAIM/VERIFIED]
Budapest: [one line] [FINDING/CLAIM/VERIFIED]
Tirana: [one line] [FINDING/CLAIM/VERIFIED]
Key signal: [one sentence — most important finding today]
Action needed: [yes/no — if yes: route to qualification_manager OR content_agent]
Weak signals queued: [count — items moved to verification-review.md]

## Anti-Rationalization Table
| Tempting shortcut | Why it's wrong |
|---|---|
| "I saw it once, it's probably true" | One source = FINDING only, not CLAIM |
| "This is interesting, I'll add it to the digest" | Over 300 words = digest ignored |
| "Opus Smile didn't change, I'll skip it" | Always include — absence of change is data |
| "I'll turn this weak signal into an action" | Weak signals go to verification-review.md only |
| "I'll touch patient data to cross-reference" | Research agent never touches patient data |

## Verification Exit Criteria
Skill succeeds when:
- [ ] All primary competitors checked
- [ ] Each finding classified (FINDING / CLAIM / VERIFIED)
- [ ] Weak signals routed to verification-review.md, not actioned
- [ ] Digest under 300 words
- [ ] Delivered to Telegram before 6AM Istanbul time
- [ ] Action items routed to correct handoff queue

Skill fails if:
- Digest exceeds 300 words
- Opus Smile omitted
- Unverified finding presented as fact
- Patient data accessed

## Guardrails
This agent cannot:
- Publish anything
- Touch patient data
- Turn weak signals into approved tasks
- Contact any external party
It can only: surface findings, classify them, route to handoff queues, deliver digest

## Trigger
Cron: 5:50AM daily (Istanbul time)
Deliver to: Telegram home channel

