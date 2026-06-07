---
name: Solaris Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e6beb2'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#ad897e'
  outline-variant: '#5c4037'
  surface-tint: '#ffb59e'
  primary: '#ffb59e'
  on-primary: '#5e1700'
  primary-container: '#ff571a'
  on-primary-container: '#521300'
  inverse-primary: '#ae3200'
  secondary: '#ffdb9d'
  on-secondary: '#412d00'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#ffb59c'
  on-tertiary: '#591d05'
  tertiary-container: '#d1795a'
  on-tertiary-container: '#501601'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#852400'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#380c00'
  on-tertiary-fixed-variant: '#763218'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 88px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Syne
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 128px
---

## Brand & Style
This design system embodies a "Universal Scale" aesthetic, drawing inspiration from the vastness of deep space and the intense energy of solar events. The brand personality is awe-inspiring, powerful, and uncompromisingly modern. It targets an audience that values high-performance tools, cinematic storytelling, or premium creative platforms.

The visual style is a hybrid of **High-Contrast Minimalism** and **Tactile Volumetricism**. By utilizing a true black foundation, the UI eliminates the traditional "box" constraints of interface design, allowing elements to emerge from the darkness like celestial bodies. The emotional response is one of focus and intensity, achieved through the juxtaposition of "void" (empty black space) and "flare" (intense, glowing focal points).

## Colors
The palette is centered on the absolute darkness of the vacuum and the violent heat of a star.

- **Primary (Solar Orange):** Used for critical actions and brand-heavy elements. It represents the "Solar Flare."
- **Secondary (Deep Amber):** Used for highlights, active states, and secondary information that requires heat but less urgency than primary orange.
- **Tertiary (Cinder):** A dark, burnt orange used for subtle borders or low-priority backgrounds to maintain the warm spectrum without breaking the dark immersion.
- **Neutral:** Pure `#000000` is the mandatory background color. Grays are avoided in favor of varying opacities of white or tinted blacks to ensure the "Universal Scale" feel is never compromised by muddy tones.

## Typography
Typography is treated as a structural element. 
- **Syne** is used for all headlines and display text, leveraging its unconventional widths and bold character to command attention. 
- **Hanken Grotesk** provides a clean, contemporary contrast for body copy, ensuring high legibility against the pure black background. 
- **JetBrains Mono** is utilized for labels, technical metadata, and "instrumentation" styles, reinforcing the precision of a cosmic dashboard.

Text should rarely be pure white; use `rgba(255, 255, 255, 0.9)` for body text to reduce eye strain against the black, while headlines should remain high-contrast.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy within a fluid container to maintain the "cinematic" aspect ratio of the content. 

- **The Void:** Large vertical gaps (Section Gaps) are used to separate content blocks, allowing the black background to breathe and creating a sense of scale.
- **Micro-interactions:** Spacing between related elements (labels and inputs) is tight (8px or 16px) to create "clusters" that float in the void.
- **Responsive Behavior:** On desktop, use wide margins and 12 columns. On mobile, transition to a single-column flow with increased vertical padding to maintain the sense of "unending space."

## Elevation & Depth
In a world of pure black, shadows do not exist. Instead, depth is created through **Luminance and Volumetric Glow**.

- **Tonal Layers:** Secondary surfaces do not use lighter grays; they use the Tertiary "Cinder" color at very low opacities (e.g., 5-10%) or semi-transparent blurs that reveal the "core" light beneath.
- **Volumetric Light:** High-priority elements (like active cards) should feature a subtle, colored outer glow (`box-shadow`) using the Primary color with a high blur radius (40px+) and low opacity (0.2).
- **Core Assets:** Use "Glow Maps" — gradients that move from Solar Orange to transparent — behind key UI components to simulate light reflecting off an object in space.

## Shapes
The shape language is **Sharp and Architectural**. 
- All buttons, input fields, and containers utilize a 0px border radius. This reinforces the "hard tech" and "Universal Scale" aesthetic, feeling more like precision-cut instrumentation than soft consumer software.
- Lines should be thin (1px) and used sparingly. When used, they should feel like laser-etched dividers.

## Components
- **Buttons:** Primary buttons are solid Solar Orange with black text. Secondary buttons are "Ghost" style with a 1px Solar Orange border and no fill. Use a `text-transform: uppercase` and bold Syne for the label.
- **Input Fields:** Bottom-border only (1px white at 20% opacity). On focus, the border becomes Solar Orange with a subtle 4px vertical glow beneath the line.
- **Cards:** No background fill. Cards are defined by their content and a subtle 1px border on one side (top or left) to "catch the light" from the solar flare.
- **Chips:** Small, JetBrains Mono text surrounded by a thin, tinted amber border. Used for metadata or status indicators.
- **Solar Core Asset:** A decorative component consisting of a radial gradient (#FF4D00 to transparent) positioned partially off-screen or behind headers to provide the signature "Glow" effect.
- **Progress Indicators:** Linear bars that use a gradient from Deep Amber to Solar Orange, appearing to "burn" across the screen as they fill.