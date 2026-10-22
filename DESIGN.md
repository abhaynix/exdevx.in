---
name: EXDEV X
description: Clear, collaborative digital product engineering.
colors:
  paper: "#f7f5f0"
  paper-surface: "#fffefa"
  ink: "#262522"
  muted-ink: "#68665f"
  bronze: "#72521f"
  bronze-accent: "#a27b3e"
  night: "#08090c"
  night-surface: "#0d1015"
  night-text: "#f2f2f3"
  night-muted: "#9a9da6"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Onest Variable, Onest, sans-serif"
    fontSize: "clamp(0.9375rem, 1vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono Variable, Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
spacing:
  section: "clamp(4.5rem, 9vw, 7.5rem)"
  content-wide: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-surface}"
    typography: "14px / 600"
    rounded: "0 8px 0 8px"
    padding: "12px 18px"
  card:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "6px"
    padding: "10px 14px"
---

# Design System: EXDEV X

## Overview

**Creative North Star: Clear engineering, quietly delivered.**

EXDEV X pairs precise product engineering with direct, collaborative communication. The visual language is minimal and editorial: strong type, deliberate whitespace, quiet surfaces, and a restrained bronze accent. The homepage uses a deep charcoal canvas to give the work and calls to action focus; supporting pages use warm paper tones for comfortable reading. Both themes share the same typography, spacing, and interaction rules.

Keep the experience credible and human. Show real project details and explain illustrative concepts as such. The inquiry flow lets visitors review their WhatsApp message before they send it.

## Colors

The light palette uses warm paper, ink, muted ink, and bronze. The dark palette uses near-black surfaces, soft white text, and a restrained warm highlight. Use the CSS variables in `src/styles/tokens.css` as the source of truth; use page-specific values only for the homepage's dark editorial treatment. Keep body copy and controls high contrast in both themes.

## Typography

Use Manrope for display headings, Onest for body and interface text, and Geist Mono for compact metadata or technical labels. Keep display tracking tight but readable, headings balanced, and paragraph measure near 65–75 characters. Avoid using mono as decoration or reducing explanatory text to microcopy.

## Layout

Use the existing `Container` sizes and keep wide content within 1280px. Sections use generous, consistent vertical spacing, with tighter gaps inside related groups. At tablet and mobile widths, stack content before it becomes cramped, keep actions comfortably tappable, and simplify nonessential visual detail. The portfolio carousel remains horizontally scrollable and supports keyboard arrow navigation.

## Elevation & Depth

Prefer tonal surface changes and subtle one-pixel borders over shadows. Reserve backdrop blur for the sticky navigation after scroll. Avoid ambient glow as a substitute for hierarchy.

## Shapes

Use compact rounded corners for controls, 10–14px corners for cards and panels, and the asymmetric corner treatment only for primary calls to action. Inputs should remain clearly outlined with visible focus rings.

## Components

- **Primary action:** high-contrast solid button with a clear verb and a minimum 44px target height.
- **Secondary action:** transparent outlined button, visually subordinate to the primary action.
- **Service and work panels:** use border and surface contrast sparingly; lead with their content rather than decorative iconography.
- **Forms:** persistent labels, inline validation, clear required state, and a recovery path. Explain that budget ranges are indicative and that WhatsApp is opened for the visitor to review and send.
- **Motion:** brief opacity and transform transitions only where they clarify entry or state. Respect `prefers-reduced-motion`; content must remain visible without animation.

## Do's and Don'ts

- Do preserve the EXDEV X voice: concise, direct, collaborative, and evidence-based.
- Do use actual case studies and capabilities as the proof of work.
- Do keep the existing palette, font pairing, semantic landmarks, keyboard access, and responsive behavior consistent.
- Don't imply sample or illustrative figures are client results.
- Don't invent clients, testimonials, statistics, certifications, or delivery promises.
- Don't add generic gradients, decorative charts, card grids, or motion without a clear purpose.
