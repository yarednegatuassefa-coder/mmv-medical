# MMV Medical visual refresh

## Implementation

Replace the three externally hosted WhatsApp treatment photos with a local, cohesive image set in `public/images/`. Add purposeful visual support to the treatment guide, about page, contact page, and travel-cost planner without changing medical claims, lead handling, or CRM behavior. Keep the existing Next.js App Router, Cormorant/Outfit/DM Mono type system, navy–gold–warm-paper palette, current routes, and local asset delivery. Add responsive image components with meaningful alt text, `sizes`, and lazy/eager loading appropriate to placement. Update metadata where a new social/OG image is useful and keep the route manifest synchronized.

## Design

### Candidate styles
- Editorial clinical travel journal — probability 0.06.
- Warm luxury clinic brochure — probability 0.91 (chosen).
- Minimal medical diagram system — probability 0.03.

### Design Movement
Warm luxury clinic brochure with restrained Istanbul editorial cues, clinically responsible imagery, and generous paper-like negative space.

### Core Principles
1. Images explain the journey or treatment category without promising outcomes.
2. No identifiable patients, before/after claims, logos, labels, or invented clinical details.
3. Keep one visual language across Istanbul, restorative dentistry, coordination, and travel planning.
4. Preserve fast loading through local optimized JPG assets and responsive sizing.

### Color Philosophy
Deep navy communicates trust and boundaries; muted brass signals care and considered guidance; warm ivory keeps the site calm rather than sales-driven; a restrained teal accent supports human coordination and WhatsApp affordances.

### Layout Paradigm
Use images as editorial anchors at the edge of text-led sections: one dominant hero image, horizontal treatment cards, and contained supporting visuals beside explanatory copy. Avoid filling every whitespace area with decoration.

### Signature Elements
Subtle brass framing, cropped editorial still-life compositions, and soft directional light with navy/ivory tonal contrast.

### Interaction Philosophy
Images support scanning and orientation. Hover movement remains slight; no auto-playing motion or visual effect that competes with enquiry content.

### Animation
Keep the existing reduced-motion support. Use only short scale/translate transitions on cards and buttons; images should not animate independently on load.

### Typography System
Retain Cormorant Garamond for editorial display headings, Outfit for UI/body copy, and DM Mono for numbered references.

### Brand Essence
MMV Medical helps European patients explore dental care in Istanbul with clear coordination, practical planning, and honest boundaries. Personality: considered, human, transparent.

### Brand Voice
Headlines are calm and precise; CTAs invite questions rather than urgency. Example lines: “Start with the questions that matter.” and “A clearer way to plan the next conversation.”

### Wordmark & Logo
Keep the existing MMV mark and wordmark; this task does not change identity assets.

### Signature Brand Color
Deep navy `#12243a`, supported by muted brass `#c8a45a` and warm paper `#f7f5f0`.

## Project structure

- `src/app/`: public pages and route metadata.
- `src/components/layout/`: shared navigation and footer.
- `src/components/public/`: enquiry and calculator UI.
- `public/images/`: local editorial and treatment visuals.
- `public/manus-routes.json`: complete public route manifest.
- `plan.md`, `TODO.md`: implementation record.

## Asset plan

1. `istanbul-bosphorus-hero.jpg`: homepage hero replacement/upgrade, 4:5.
2. `dental-implants-editorial.jpg`: homepage and treatment-guide implant card, 5:4.
3. `veneers-editorial.jpg`: homepage veneer card, 5:4.
4. `full-arch-editorial.jpg`: homepage full-arch card, 5:4.
5. `coordination-editorial.jpg`: about/contact support section, 3:2.
6. `travel-planning-editorial.jpg`: calculator/travel planner section, 3:2.

All assets are illustrative, local, free of text/logos, and avoid identifiable faces or outcome claims.
