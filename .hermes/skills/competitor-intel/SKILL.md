---
name: competitor-intel
description: Use for daily competitor monitoring. Runs via Hermes cron at 6AM. Delivers digest to Telegram.
---

## Purpose
Monitor dental tourism competitors targeting MMV's patient markets.
Deliver a concise daily digest to Jared's Telegram by 6AM Istanbul time.

## Competitors to monitor
Primary:
- STR DENT (Turkey)
- Asli Tarcan Clinic (Turkey)
- Opus Smile (Turkey)

Secondary:
- Budapest dental clinics (Hungary)
- Tirana clinics (Albania)

## What to monitor
- Pricing page changes
- New Google reviews (positive and negative)
- New promotions or offers
- New content or blog posts
- Google Ads changes (if visible)
- Social media activity targeting UK/NL/IE markets

## Digest format
Date: [date]

STR DENT: [one line — anything changed or "no change"]
Asli Tarcan: [one line]
Opus Smile: [one line — highest priority, UK corridor]
Budapest: [one line]
Tirana: [one line]

Key signal: [one sentence — most important finding today]
Action needed: [yes/no — if yes, what]

## Trigger
Cron: 5:50AM daily
Deliver to: Telegram home channel
Max length: 300 words

## Never do
- Write more than 300 words
- Flag things that did not actually change
- Miss Opus Smile — they are the most dangerous competitor
