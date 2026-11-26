# Design-engineering review — Emil Kowalski skills

## Scope
Source-level review of the public marketing experience and shared stylesheet, using `emil-design-eng`, `mobile-native`, and reduced-motion/accessibility principles. No patient or CRM data was accessed.

## Applied
- Added restrained press feedback to primary public CTAs.
- Disabled hover-only movement/elevation on touch/coarse-pointer devices to prevent sticky hover states.
- Set mobile form controls to 16px to avoid iOS focus zoom.
- Preserved the existing navy/gold visual system and existing reduced-motion policy.

## Guardrails
Clinical suitability, treatment claims, patient messaging and clinical review remain outside UI-agent authority. No decorative motion was added to patient coordination or clinical decision flows.

## Not verified
No browser build, visual screenshot comparison, automated accessibility scan, iOS Safari test or physical-device test was run in this environment. The source changes require normal project CI and device QA before merge.
