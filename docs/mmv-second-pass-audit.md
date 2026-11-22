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
- Crawler-style local HTML verification — passed for `/`, `/dental-tourism-istanbul`, `/treatments`, `/sitemap.xml`, `/robots.txt`, and a missing route. Indexable pages returned meaningful HTML, route-specific `og:url`, Twitter card metadata, JSON-LD, and a real 404 was returned for the missing route.
- Production deployment verification — blocked by Vercel’s current deployment rate limit, not by the source or build.

## SEO implementation follow-up

Google’s current guidance emphasizes crawlable HTML, descriptive titles and snippets, useful internal links, helpful people-first content, accurate image alt text, an explicit sitemap, and Search Console inspection. MMV now adds a verified `Organization`/`WebSite` JSON-LD graph, complete route-level social metadata, and one substantive `/dental-tourism-istanbul` guide rather than many near-duplicate city pages.

Keyword targets below are **search-intent hypotheses**, not volume or difficulty measurements. Search Console data is not connected in this environment:

- Primary discovery intent: `dental tourism Istanbul`, `dental treatment Istanbul`, `medical tourism Istanbul`.
- Treatment education intent: `dental implants Istanbul`, `veneers Istanbul`, `crowns and bridges Istanbul`, `full arch dental treatment Istanbul`.
- Planning intent: `dental treatment travel planning`, `dental tourism questions`, `dental treatment travel cost planner`.

Do not publish fake reviews, provider rankings, “best clinic” claims, exact prices, guaranteed savings, unsupported credentials, or thin location variants. Create additional treatment-specific pages only when MMV has a genuinely distinct, reviewed, useful page—not as doorway pages.

### Sources

[1]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide "Google Search Central SEO Starter Guide"
[2]: https://developers.google.com/search/docs/appearance/structured-data/organization "Google Search Central Organization structured data"
[3]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Google Search Central LocalBusiness structured data"
[4]: https://developers.google.com/search/docs/fundamentals/creating-helpful-content "Google Search Central people-first content guidance"
[5]: https://developers.google.com/search/docs/essentials/spam-policies "Google Search Central spam policies"
