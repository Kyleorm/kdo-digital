# Design System: KDO Digital

## 1. Visual Theme & Atmosphere

A cinematic, gallery-airy dark agency interface with confident asymmetric layouts and editorial tension. The atmosphere is like a high-end film production house — pitch-black voids interrupted by precision orange-red light, razor-thin typography, and deliberate negative space that commands authority. Think Awwwards SOTD: every section breathes, nothing is decorative by accident, and motion is choreographed not just animated.

- **Density:** 4 — "Art Gallery Airy" with intentional breathing room between sections
- **Variance:** 8 — Strongly asymmetric splits, editorial offsets, diagonal compositions
- **Motion:** 8 — Cinematic GSAP choreography, Three.js particle fields, blur-to-sharp reveals, parallax depth

The brand is Isle of Man's premier digital agency. Dark is not just a style choice — it is the brand identity. Every design decision should feel earned, precise, and premium.

---

## 2. Color Palette & Roles

- **Void Black** (#080808) — Primary background surface. Near-pure black, reads as absolute darkness. Used for all section backgrounds.
- **Deep Surface** (#111111) — Elevated containers, subtle card backgrounds where differentiation is needed
- **Ghost Layer** (#1A1A1A) — Hover states, active table rows, tertiary surface
- **Bone White** (#F2F0EB) — Primary body text. Warm-tinted off-white, never pure white.
- **Mist Grey** (#8A8A8A) — Secondary text, metadata, captions, service descriptors
- **Phantom Border** (rgba(255,255,255,0.08)) — Structural dividers, card borders, timeline lines
- **Ember Red** (#FF4B1F) — THE single accent. CTAs, active nav indicators, hover underlines, number highlights, process step markers. Never used as background fill on large areas.
- **Ember Dimmed** (#CC3C18) — Pressed/active state of Ember Red. Hover state on accent elements.
- **Ash Overlay** (rgba(8,8,8,0.7)) — Image overlays, modal backdrops

**Banned:** Pure white (#FFFFFF) on dark backgrounds. Any purple or blue neon. Gradient fills across large hero backgrounds. Multiple accent colours competing.

---

## 3. Typography Rules

- **Display / Hero Headlines:** Montserrat — Weight 200 (Ultra-Thin). Track-tight (`letter-spacing: -0.03em`). Large scale but never shouty. Hierarchy through weight contrast and colour shifts, not screaming size. Line-height 0.95 on hero titles.
- **Body / Subheadings:** Plus Jakarta Sans — Weight 300–400. Relaxed leading (1.6–1.7). Max 65 characters per line. Secondary text in Mist Grey.
- **Accent Labels / Overlines:** Plus Jakarta Sans — Weight 500, uppercase, tracked wide (`letter-spacing: 0.2em`). Used for section labels like "SELECTED WORK", "OUR PROCESS".
- **Numbers / Metrics:** Montserrat — Weight 700 for impact. Used on process step numbers, ghost background numerals.
- **Scale:** Use `clamp()` for all headline sizes. Never fixed px on headings. Example: `clamp(3rem, 8vw, 9rem)` for hero.

**Banned:** Inter (generic, overused). Times New Roman, Georgia, Garamond. Any font that adds warmth or friendliness — this brand is cool, precise, confident.

---

## 4. Hero Section

- **Layout:** Full-viewport, left-aligned asymmetric split. Headline occupies left 60%, right 40% holds an atmospheric AI image (dark abstract with orange-red light streaks) or Three.js particle field.
- **Headline Treatment:** Ultra-thin Montserrat 200. First word or key phrase in Ember Red (#FF4B1F). Rest in Bone White. No gradient text.
- **Inline Visual Accent:** A small inline image or the agency's city coordinates can sit at type-height between words as visual punctuation.
- **Sub-copy:** Plus Jakarta Sans 300, max 12 words. In Mist Grey. Never more than one sentence.
- **CTA:** One primary button. Flat, no glow. Ember Red background, Bone White text, tactile -1px translate on active. No secondary "learn more" links.
- **Scroll Indicator:** BANNED. No arrows, no "scroll to explore", no bouncing chevrons. Content pulls users in.
- **Background Layer:** Three.js particle field floating at low opacity, or full-bleed AI-generated atmospheric image with GSAP parallax zoom on scroll.

---

## 5. Component Stylings

**Buttons:**
- Primary: Ember Red (#FF4B1F) fill, Bone White text, no border-radius (sharp or very slight 4px max), no outer glow, no box-shadow. On active: -1px translateY, slight darken to Ember Dimmed.
- Ghost/Secondary: Phantom Border outline, Bone White text, transparent fill. On hover: fill with Ghost Layer (#1A1A1A).
- Size: min 48px height for touch targets.

**Cards (Work Section):**
- Used only for the Selected Work grid — asymmetric, not 3-equal-columns.
- No explicit card containers — images bleed edge-to-edge within their grid cell, with metadata (client name, category) as an overlay that slides up on hover.
- Hover: image scales to 1.05 over 0.6s ease-out. Overlay fades in from bottom.
- No box shadows on work cards.

**Service Rows:**
- NOT cards. Use full-width horizontal rows with border-top dividers (Phantom Border). Ghost large background number (Mist Grey, opacity 0.05, Montserrat 700, 12rem) slides into view on hover.
- Service name in Bone White, description in Mist Grey. Ember Red arrow icon at far right.

**Process Steps:**
- Horizontal numbered timeline on desktop, vertical stack on mobile.
- Numbers in Ember Red (#FF4B1F), Montserrat 700. Connecting line in Phantom Border.
- Step titles in Bone White Montserrat 200. Descriptions in Plus Jakarta Sans 300 Mist Grey.

**Testimonials:**
- Editorial open layout. No card boxes, no quote mark icons.
- Large Montserrat 200 italics quote in Bone White. Attribution below in Plus Jakarta Sans 400 Mist Grey.
- Asymmetric layout — quotes offset, not centered.

**Inputs/Forms (Contact):**
- Label above input. Helper text optional. Error text below in Ember Red.
- Input border: 1px Phantom Border. On focus: border upgrades to 1px Ember Red. No floating labels.
- No box-shadow on focus. Focus ring is the border colour change only.

**Loaders:**
- Skeletal shimmer matching exact layout dimensions. No circular spinners.
- Shimmer colour: Ghost Layer (#1A1A1A) with subtle Phantom Border pulse.

---

## 6. Layout Principles

- CSS Grid for all multi-column layouts. Never `calc()` percentage hacks with Flexbox.
- Max-width containment: `max-width: 1440px`, centered with `padding: 0 clamp(1.5rem, 5vw, 5rem)`.
- Full-height sections: `min-height: 100dvh` — never `height: 100vh` (iOS Safari jump bug).
- Selected Work: 2-column asymmetric grid (60/40 or 55/45 split), not 3-equal-columns. First card large, second card offset lower.
- Services: Full-width stacked rows, not cards. Divider-based, not box-based.
- About: IOM coastal image ghosted (20% opacity) behind editorial pull-quote — left-aligned, generous whitespace.
- CTA section: Left-aligned split. Headline left, CTA button far right. Particle texture as background layer.
- Footer: 4-column dark minimal. Logo + tagline left, nav links spread right.
- Section spacing: `clamp(6rem, 12vw, 10rem)` vertical gaps between sections.

**Banned:** 3 equal horizontal card rows. Centered hero layouts. Overlapping elements (every element has its own clean spatial zone). `height: 100vh`. CSS `calc()` percentage hacks.

---

## 7. Motion & Interaction

- **Page Load Reveal:** GSAP blur-to-sharp line reveal (each headline line fades from `filter: blur(12px)` to `blur(0)` with `expo.out` easing, staggered 0.12s per line).
- **Scroll Animations:** GSAP ScrollTrigger. Elements enter with `y: 40px → 0`, `opacity: 0 → 1`, spring-feel `duration: 0.8, ease: "power3.out"`.
- **Hero Parallax:** GSAP ScrollTrigger — background image scales from 1.0 to 1.15 as user scrolls past hero. Subtle depth.
- **Three.js Particles:** Low-density particle field on hero/CTA sections. Colour: Ember Red at 30% opacity. Gentle float motion.
- **Work Card Hover:** `transform: scale(1.05)` over `0.6s ease-out`. Overlay slides up. No abrupt snapping.
- **Service Row Hover:** Ghost number slides in from right (`transform: translateX(20px) → 0`) over `0.4s ease-out`.
- **Spring defaults:** `stiffness: 100, damping: 20` for all spring physics interactions.
- **Performance rule:** Animate exclusively via `transform` and `opacity`. NEVER animate `top`, `left`, `width`, `height`.
- **Grain/Noise:** Static noise grain texture on fixed `::before` pseudo-element at 3% opacity on CTA section. Hardware-accelerated only.

---

## 8. Anti-Patterns (Banned)

- No emojis anywhere in the design
- No `Inter` font — Montserrat + Plus Jakarta Sans only
- No pure black (`#000000`) — use Void Black (#080808)
- No pure white (`#FFFFFF`) — use Bone White (#F2F0EB)
- No neon glow, outer glow, or box-shadow colour halos
- No purple, blue-neon, or multi-colour gradient accents
- No gradient text on large headings
- No custom mouse cursors
- No overlapping elements — every element has its own clean spatial zone
- No 3-equal-column card grids for the work section
- No centered Hero layout — always left-aligned asymmetric
- No generic placeholder names ("John Doe", "Acme Corp", "Nexus Digital")
- No fake round numbers ("99.9% uptime", "500+ clients")
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Transform", "Empower", "Leverage"
- No scroll indicators: "Scroll to explore", scroll arrows, bouncing chevrons
- No broken placeholder images — use actual AI-generated assets from Photo assets/ folder
- No secondary CTAs ("Learn more", "Find out more") competing with the primary CTA
- No card boxes in the testimonials section — editorial open layout only
- No `height: 100vh` — always `min-height: 100dvh`

---

## 9. Stitch Prompt (Copy-Paste Ready)

Use this prompt in Stitch with Web mode selected:

> Design a world-class dark agency homepage for KDO Digital — Isle of Man's full-service digital agency. Pure void-black background (#080808), single accent colour Ember Red (#FF4B1F). Sections: full-viewport hero with ultra-thin Montserrat 200 left-aligned headline and atmospheric right-side image; asymmetric selected work grid (not 3 equal columns); full-width service rows with dividers (not cards); editorial about section with ghosted coastal image; numbered horizontal process timeline; open-layout testimonials (no card boxes); left-aligned split CTA; 4-column minimal footer. Typography: Montserrat 200 for all headlines, Plus Jakarta Sans 300-400 for body. No centered layouts, no neon glows, no gradient text, no emojis, no scroll indicators. Premium, minimal, cinematic — Awwwards SOTD level.
