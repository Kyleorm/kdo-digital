# KDO Digital

**Kyle David Ormesher — Full Service Digital Agency, Isle of Man**

KDO Digital is a full service digital agency built for ambitious businesses. One agency, everything handled — websites, apps, ads, systems, and more.

---

## Brand Identity

- **Name:** KDO Digital
- **Accent colour:** `#FF4B1F` (orange-red)
- **Background:** Pure black `#000000`
- **Headline:** Full Service Digital. Built for Growth.
- **Position:** One agency, everything digital, handled under one roof
- **Clients:** Isle of Man businesses — local, law firms, e-commerce, corporates
- **Feel:** Premium, cinematic, dark studio — Awwwards-level quality
- **Tone:** Direct, confident, results-focused. Not salesy. Not corporate.

---

## The Vision — Ultimate £10K Website

We are building a world-class agency website using a three-tool AI pipeline plus a premium code stack. The goal is a site that looks like it cost £10,000+ to produce.

### The Three-Tool AI Pipeline

```
GOOGLE STITCH
  → Designs the full visual layout before any code is written
  → Prompt-based UI design tool (stitch.withgoogle.com)
  → Exports HTML/CSS scaffold and Figma files
  → Has direct MCP integration with Claude Code
      ↓
CLAUDE CODE (this tool)
  → Takes the Stitch design and builds it into production code
  → Layers in Three.js, GSAP, SVG graphics, and animations
  → Handles all logic, performance, accessibility, and polish
  → Connects to Replicate via Node.js scripts
      ↓
REPLICATE AI  (r8_ token stored securely — DO NOT commit)
  → Generates all custom visual assets using Flux 1.1 Pro
  → Custom hero backgrounds, work card photography, textures
  → Video generation available for animated hero backgrounds
  → Script: generate-assets.mjs (run locally, never in frontend)
```

### The Code Stack (Claude Code builds this)

| Technology | Purpose |
|---|---|
| **HTML / CSS** | Structure, layout, spacing, typography |
| **Three.js** | 3D scenes, particle systems, WebGL hero backgrounds |
| **GSAP + ScrollTrigger** | Cinematic scroll animations, text reveals, parallax |
| **SVG** | Custom icons, decorative graphics, animated line art |
| **Montserrat 200** | Hero headline font — ultra-thin, luxury feel |
| **Plus Jakarta Sans** | Body and UI font — modern, clean |
| **Replicate / Flux** | AI-generated custom photography and textures |

### What "World-Class" Means Here

- Every section has a unique visual identity — no two sections look the same
- Scroll animations that feel cinematic — not generic fade-ups
- Custom AI-generated images matched to the brand colours
- Three.js animated background in the hero
- Typography that feels premium — thin display type with strong hierarchy
- Zero generic stock photography
- Pure black backgrounds, not grey-black
- Performance under 3 seconds on mobile

---

## Current State (index-v2.html)

The working homepage prototype is `index-v2.html`. Current status:

### What's Built
- Hero with AI-generated background (`Photo assets/hero-bg.jpg`) + Three.js particle overlay
- GSAP scroll-driven text animations (blur-to-sharp line reveal)
- Asymmetric Work section with AI-generated card images
- Services section with interactive hover rows
- About section with IOM coastline background
- Process section — horizontal numbered timeline
- Testimonials — editorial open layout
- CTA section with glowing particle texture background
- Footer

### AI-Generated Assets (Replicate Flux 1.1 Pro)
All in `Photo assets/`:
- `hero-bg.jpg` — dark abstract with orange-red light streaks
- `work-fitnesspod.jpg` — premium dark gym with orange LED accents
- `work-distillery.jpg` — dramatic copper pot stills, cinematic
- `about-bg.jpg` — dark Isle of Man coastal cliffs at dusk
- `cta-texture.jpg` — orange particle network on dark background

### What's Next
1. **Sign into Google Stitch** at stitch.withgoogle.com
2. Use this prompt to generate the full visual design:
   > *"Design a world-class dark agency website homepage for KDO Digital — Isle of Man's full service digital agency. Pure black background, orange-red accent colour #FF4B1F. Sections: hero with thin headline text, selected work cards, services list, about section, process steps, testimonials, CTA, footer. Premium, minimal, cinematic feel. Think Awwwards-level dark agency site."*
3. Export the HTML from Stitch
4. Bring it to Claude Code — Claude layers in Three.js + GSAP + Replicate images
5. Full rebuild around the Stitch design

---

## Generating More Assets (Replicate)

Run this to generate new images:

```bash
node generate-assets.mjs
```

The script uses `black-forest-labs/flux-1.1-pro` — best quality model on Replicate.

**IMPORTANT:** Never commit your Replicate API token to GitHub. Keep it only in `generate-assets.mjs` locally and add that file to `.gitignore`.

---

## Animations to Build (GSAP + Three.js)

- **Hero:** Three.js particle field + slow parallax zoom on scroll
- **Text reveals:** Blur-to-sharp line-by-line reveal on page load (currently working)
- **Scroll transitions:** Each section fades/slides in with GSAP ScrollTrigger
- **Work cards:** 3D tilt on hover (currently working)
- **Services rows:** Animated fill + slide on hover (currently working)
- **Stats:** Count-up animation when scrolled into view
- **Process timeline:** Accent line draws across as you scroll
- **CTA text:** Large display text with GSAP character-by-character reveal

---

## Tech Stack (Full)

- **Frontend:** Vanilla HTML / CSS / JavaScript (no framework — keeps it fast and deployable)
- **3D / WebGL:** Three.js (loaded via CDN importmap)
- **Animations:** GSAP 3.12 + ScrollTrigger (loaded via CDN)
- **Fonts:** Google Fonts (Montserrat, Plus Jakarta Sans)
- **Image generation:** Replicate API (Node.js script, local only)
- **Design tool:** Google Stitch (for visual design phase)
- **Deployment:** Vercel
- **Repository:** GitHub (separate repo per client — CLAUDE.md rule)

---

## Folder Structure

```
KDO Digital/
├── README.md               ← This file — full project plan
├── index-v2.html           ← Main homepage (active build)
├── index.html              ← Earlier version
├── generate-assets.mjs     ← Replicate image generation script (DO NOT COMMIT API KEY)
├── pages/
│   ├── services.html
│   ├── pricing.html
│   ├── case-studies.html
│   └── contact.html
├── Photo assets/
│   ├── hero-bg.jpg         ← AI generated
│   ├── work-fitnesspod.jpg ← AI generated
│   ├── work-distillery.jpg ← AI generated
│   ├── about-bg.jpg        ← AI generated
│   └── cta-texture.jpg     ← AI generated
└── assets/
    └── js/
        └── pyramid.js
```

---

## Contact

Kyle David Ormesher — kyle.orm@turbolt.co.uk
Isle of Man
KDO Digital
