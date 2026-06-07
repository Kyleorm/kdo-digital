---
name: Obsidian Chrome
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#bac3ff'
  on-tertiary: '#00218d'
  tertiary-container: '#000000'
  on-tertiary-container: '#576cda'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#dee1ff'
  tertiary-fixed-dim: '#bac3ff'
  on-tertiary-fixed: '#001159'
  on-tertiary-fixed-variant: '#223aa8'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter-md: 24px
  margin-lg: 80px
  container-max: 1440px
---

## Brand & Style

This design system embodies an "Elite Boutique" aesthetic, defined by a fusion of high-fashion minimalism and futuristic materiality. The brand personality is exclusive, commanding, and ultra-premium, targeting a high-net-worth audience that values discretion and technical precision.

The visual style is a hybrid of **Hyper-Minimalism** and **Liquid Glassmorphism**. We utilize a "Pure Black" canvas to create an infinite void, allowing "Liquid Silver" elements and "Royal Blue" accents to appear as if they are floating in space. Visual interest is driven by 3D metallic liquid assets that provide a tactile, high-end sensory experience, contrasting the rigid structure of the typography and grid.

## Colors

The palette is anchored in absolute darkness to ensure maximum contrast and a sense of luxury.

- **Primary (Pure Black):** Used for the global background and primary containers to create depth.
- **Secondary (Liquid Silver):** A sophisticated range of cool greys and metallic gradients used for high-emphasis text, icons, and borders.
- **Tertiary (Royal Blue):** A deep, saturated blue used sparingly for critical interactive states, specialized notifications, and subtle "underglow" effects.
- **Surface Tones:** Darker neutrals (#080808, #121212) are used for subtle layering without breaking the illusion of a continuous black void.

## Typography

The typographic scale creates a tension between the expressive, avant-garde curves of **Syne** and the surgical precision of **Inter** and **JetBrains Mono**.

- **Headlines:** Syne is used in bold and extra-bold weights for high impact. Letter spacing is tightened on larger sizes to create a "locked" architectural feel.
- **Body:** Inter provides a neutral, highly legible foundation for long-form content and descriptions, maintaining the minimalist rigor.
- **Technical/Labels:** JetBrains Mono is utilized for metadata, labels, and small captions, reinforcing the "Elite" technical nature of the product.

## Elevation & Depth

Elevation is not conveyed through traditional drop shadows, but through **Tonal Layering** and **Luminance**.

- **The Void:** The base layer is always #000000.
- **Raised Surfaces:** Higher elevation levels are indicated by subtle 1px "Silver" inner strokes or very low-opacity (#FFFFFF at 5%) fills.
- **Interactive Depth:** When an element is active or hovered, a "Royal Blue" outer glow (diffused, 20px blur, 15% opacity) mimics the reflection of a physical light source against a dark chrome surface.
- **Liquid Assets:** 3D metallic assets sit between the background and the UI layer, often using backdrop-blur (20px+) on overlapping UI panels to create a sense of immersion.

## Shapes

The shape language is characterized by **Generous Radii**. Despite the technical nature of the typography, the containers are smooth and organic, echoing the "Liquid" theme.

- **Primary Containers:** 16px (rounded-lg) for cards and modals.
- **Interactive Elements:** 8px (standard) for buttons and inputs.
- **Specialty:** Occasional 32px (rounded-xl) for featured imagery or promotional banners to emphasize the "Liquid" flow.

## Components

- **Buttons:** Primary buttons feature a subtle "Liquid Silver" gradient with black text (Syne, Bold). Secondary buttons are "Ghost" style with a 1px Silver border.
- **Inputs:** Darker-than-background fills (#080808) with a 1px Royal Blue bottom border that glows on focus. Labels use JetBrains Mono in Silver.
- **Cards:** No background fill; defined only by a thin 0.5px Silver border and extreme internal padding.
- **Chips/Badges:** Pill-shaped with Royal Blue backgrounds and white text for high-priority status; Silver/Black for neutral.
- **Liquid Orbs:** A unique component used as a background decoration or interactive hover anchor, featuring 3D metallic textures and Royal Blue refractions.
- **Lists:** Separated by thin, low-opacity Silver dividers (0.1 opacity) to maintain a seamless look.