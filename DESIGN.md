---
name: Celestial Intimacy
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#39393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#909097'
  outline-variant: '#45464c'
  surface-tint: '#c1c6db'
  primary: '#c1c6db'
  on-primary: '#2a3040'
  primary-container: '#0b1120'
  on-primary-container: '#777c90'
  inverse-primary: '#585e70'
  secondary: '#c4c6d2'
  on-secondary: '#2d3039'
  secondary-container: '#434650'
  on-secondary-container: '#b2b5c0'
  tertiary: '#dfc1a4'
  on-tertiary: '#3f2d18'
  tertiary-container: '#1c0e01'
  on-tertiary-container: '#91785f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde2f8'
  primary-fixed-dim: '#c1c6db'
  on-primary-fixed: '#151b2b'
  on-primary-fixed-variant: '#414658'
  secondary-fixed: '#e0e2ee'
  secondary-fixed-dim: '#c4c6d2'
  on-secondary-fixed: '#181b24'
  on-secondary-fixed-variant: '#434650'
  tertiary-fixed: '#fcddbf'
  tertiary-fixed-dim: '#dfc1a4'
  on-tertiary-fixed: '#281806'
  on-tertiary-fixed-variant: '#57432d'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  moon-blue: '#1E293B'
  starlight: '#F8FAFC'
  lunar-silver: '#94A3B8'
  warm-amber: '#F59E0B'
  celestial-gold: '#D4AF37'
  deep-indigo: '#312E81'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  cta-label:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 20px
  section-gap: 64px
  element-gap: 16px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 40px
---

## Brand & Style

The visual identity of the design system is rooted in **Mystical Glassmorphism**. It is designed to create an atmosphere of nighttime introspection, spiritual guidance, and emotional vulnerability. The aesthetic prioritizes a "premium-mystical" feel that balances the esoteric nature of the content with a high-conversion, professional structure.

The interface utilizes deep, atmospheric depth through translucent layers, frosted glass effects, and subtle "moonlight" glows. This creates a safe, intimate space for the "Emotionally Invasive" copy strategy to resonate. The style is sophisticated and ethereal, avoiding typical "fortune teller" cliches in favor of a modern, refined, and empathetic wellness aesthetic.

## Colors

The palette is strictly dark-mode to evoke the mystery of the night. 

- **Primary & Backgrounds**: Deep indigo and midnight blues (`#0B1120`) form the foundation, providing a sense of vastness and calm.
- **Secondary & Text**: Soft silvers and cool grays (`#C0C2CE`) ensure legibility while maintaining the moonlit theme.
- **Accents (CTAs)**: Warm amber and celestial gold are reserved exclusively for conversion points and highlighting emotional "breakthrough" moments in the copy. These should feel like a warm candle in a dark room.
- **Gradients**: Use radial gradients (e.g., `deep-indigo` to `primary`) to simulate a moonlit glow behind key sections.

## Typography

The typography strategy pairs a high-contrast, elegant serif with a modern, clean sans-serif to bridge the gap between "Mystical" and "Trustworthy."

- **Playfair Display** is used for headlines to convey authority, tradition, and elegance. Large headlines should use tighter letter spacing to feel more impactful and intimate.
- **Manrope** provides a grounded, neutral base for the "invasive" copy, ensuring that even long-form emotional narratives are easy to digest on mobile screens.
- **Hierarchy**: Use `label-caps` for eyebrows or small section headers to maintain an organized, premium feel. Use `headline-xl` sparingly for the main hook to maximize emotional impact.

## Layout & Spacing

This design system follows a **fluid, mobile-first model** with a heavy emphasis on vertical rhythm to guide the user through the narrative journey.

- **Intimate Margins**: While standard 20px padding is used for the container, content blocks should use varying vertical "stack" units to control the pace of reading. 
- **The "Breath" Rule**: Given the emotional intensity of the copy, use `section-gap` generously between different psychological "phases" of the landing page to allow the user to process the information.
- **Mobile Centricity**: All interactive elements (buttons, inputs) must maintain a minimum 48px hit area and be centered to facilitate easy thumb-driven navigation.

## Elevation & Depth

Depth is achieved through **Tonal Layering and Glassmorphism** rather than traditional shadows.

- **Surfaces**: Components like cards or modals should use a semi-transparent background (e.g., `rgba(30, 41, 59, 0.7)`) with a `backdrop-filter: blur(12px)`.
- **Outlines**: Instead of heavy shadows, use a 1px "inner glow" border with a low-opacity silver or gold (10-15%) to define edges against the dark background.
- **Moonlight Shadows**: If shadows are used for primary CTAs, they should be "glow" shadows using `warm-amber` with high diffusion (20px+) and low opacity (0.3) to make the button appear as if it is emitting light.

## Shapes

The shape language is **Soft and Organic**, avoiding sharp edges that might feel aggressive or clinical.

- **Base Radius**: 0.5rem (8px) for standard inputs and smaller cards.
- **Large Radius**: 1.5rem (24px) for main container sections or "Love Letter" style copy blocks to create a feeling of being enveloped.
- **Pill Shapes**: Used exclusively for CTAs and Chips to emphasize their interactive and friendly nature.

## Components

- **Primary Buttons**: Pill-shaped with a gradient from `warm-amber` to `celestial-gold`. Text should be dark indigo for maximum contrast. Use a subtle pulse animation for the "high-conversion" feel.
- **Emotional Cards**: Glassmorphic surfaces with a 1px silver stroke. These hold testimonials or "the problem" copy. They should feel like floating shards of moonlight.
- **Input Fields**: Minimalist. A bottom border in `lunar-silver` that glows `celestial-gold` on focus. No heavy boxes.
- **Chips**: Small, semi-transparent labels used for "Trust Signals" (e.g., "98% Assertiveness").
- **Progressive Disclosure**: Use accordions for "Frequently Asked Doubts" to keep the main landing page focused on the emotional narrative without clutter.
- **Divider Lines**: Use 1px wide gradients that fade to 0% opacity on both ends to separate sections without creating hard visual breaks.