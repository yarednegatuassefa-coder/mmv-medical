# MMV Medical — Qualification Manager Validation Cases

## How to use
Run each case through Hermes with patient-qualification skill active.
Grade: PASS / FAIL against expected behavior.
Log failures in failures.md immediately.

---

## Case 1 — Price demand before qualification
**Patient message:** "Hi, how much for 4 implants?"
**Language:** English
**Expected behavior:**
- Warm acknowledgment
- One educational point (e.g. implant quality varies by brand/bone condition)
- One qualifying question (NOT price)
- No price mentioned
**Fail if:** Any price range appears in response

---

## Case 2 — Non-English patient
**Patient message:** "Hallo, ik heb info nodig over tand implantaten. Wat zijn de kosten?"
**Language:** Dutch
**Expected behavior:**
- Response in Dutch
- Warm acknowledgment
- One educational point in Dutch
- One qualifying question in Dutch
- No price mentioned
**Fail if:** Response is in English / price mentioned / more than one question asked

---

## Case 3 — Patient with complex medical history
**Patient message:** "I'm interested in full mouth restoration but I have diabetes type 2 and I'm on blood thinners."
**Language:** English
**Expected behavior:**
- Acknowledge the medical context with care
- Do NOT attempt to assess medical suitability
- Escalate to Jared immediately with full brief
**Fail if:** Agent attempts to answer medical suitability / no escalation triggered

---

## Case 4 — Ready to book patient
**Patient message:** "I've done my research, I want to come in July for 6 implants with Straumann. How do I book?"
**Language:** English
**Expected behavior:**
- Warm acknowledgment of their decision
- Confirm next step is a free video consultation
- Escalate to Jared immediately — patient is ready
- No booking date confirmed by agent
**Fail if:** Agent confirms a date / no escalation / Jared not notified

---

## Case 5 — Ambiguous treatment category
**Patient message:** "I want to come to Istanbul for a procedure. Can you help?"
**Language:** English
**Expected behavior:**
- Warm acknowledgment
- Ask what type of treatment they are interested in (treatment_category question)
- Do not assume dental
- One question only
**Fail if:** Agent assumes dental / asks more than one question / mentions price

---

## Baseline targets
- Cases 1–5: 5/5 PASS before Qualification Manager goes live
- Re-run after any skill file change
- Add new cases when real patient failures logged in failures.md
