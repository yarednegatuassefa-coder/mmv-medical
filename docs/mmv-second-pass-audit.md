# MMV Medical — Second-Pass Home Workflow Audit

**Scope:** public responsive website, selected internal accessibility findings, technical SEO, image placement, and release checks.

**Source of truth:** `/home/ubuntu/home` portfolio standards and MMV repository rules. This is an implementation handoff, not a clinical, legal, or security certification.

## Compatible workflows applied

- **Portfolio design research / Stark web workflow:** calm clinical trust, non-coercive conversion, semantic forms, responsive image hierarchy, restrained motion, and no decorative imagery on tool/dashboard surfaces where it would compete with the task.
- **Modern Web guidance:** deterministic legacy scan completed against MMV. Two findings were remediated: password autofill semantics in staff login and IME-safe Enter handling in the knowledge-base ask box.
- **Portfolio SEO/GEO:** source-first technical review of metadata, canonical configuration, sitemap, robots, route coverage, and crawler-facing claims. The robots sitemap URL was corrected from the stale `.health` host to the canonical `.org` host.
- **Code review and documentation:** changes are scoped, source-grounded, and recorded here; no patient data, production exports, credentials, or external design inputs containing sensitive information were used.
- **Image generation:** two local editorial assets were generated at 2496×1664, converted to valid JPEG files, and integrated with descriptive alt text and responsive `sizes` hints.

## Image placement decision

| Route | Decision | Reason |
|---|---|---|
| Home | Keep current hero, treatment, and Istanbul imagery | The existing visual rhythm already supports the primary enquiry path; more images would dilute hierarchy. |
| Treatments | Replace duplicated veneers asset for “Crowns & bridges” | Gives the treatment grid a distinct restorative-material visual without implying patient outcomes. |
| About | Keep coordination editorial image | Supports the role explanation and differentiates MMV from the treating provider. |
| Calculator | Keep travel-planning image | Reinforces budgeting context without suggesting a treatment quote. |
| Contact | Add communication editorial panel | Adds reassurance and context while leaving WhatsApp/form actions and privacy guidance primary. |
| Privacy | No decorative image | Readability and legal comprehension take priority. |
| Internal app/dashboard | No imagery added | Staff tools need density, focus, and operational clarity rather than editorial decoration. |

## Files changed in this pass

- `src/app/contact/page.tsx`
- `src/app/treatments/page.tsx`
- `src/app/login/page.tsx`
- `src/app/app/kb/ask/kb-ask-client.tsx`
- `src/app/robots.txt`
- `public/images/contact-conversation-editorial.jpg`
- `public/images/crowns-bridges-editorial.jpg`

## Required human review before publishing patient-facing content

The inherited UX audit still identifies unverified treatment-page pricing, savings, provider/facility, brand, timeline, and suitability language. This pass intentionally did **not** rewrite or re-publish those claims because MMV rules require owner/clinical/legal evidence and approval for each claim. The page remains a review blocker, not a finding that the claims are necessarily false.

The inherited audit also identifies separate follow-up work for public lead error recovery, CSV formula-injection protection, semantic lead-row navigation, timezone-safe follow-up labels, and replacing the no-op test script. Those are outside this visual/SEO slice and should be handled as separate, test-backed changes.

## Verification record

- `npm run harness:check` — passed.
- Modern Web legacy scan — completed; two findings remediated.
- Generated assets — verified at 2496×1664 and converted to valid JPEG encoding.
- `npm run lint` — passed with the pre-existing `@next/next/next-script-for-ga` warning in `src/app/layout.tsx`.
- `npm run typecheck` — passed.
- `npm test` — passed: 3 tests, 0 failures. Node emitted the existing module-type performance warning for `src/lib/csv-safety.js`.
- `npm run build` — passed; 27 routes generated.
- Final Modern Web legacy scan — 0 findings across 38 qualified guides.
- Rendered-route/browser QA and production deployment verification — not yet recorded in this source handoff; deployment follows the commit and Vercel build.
