# Trần Á — Premium Legal Editorial Design System

## Foundation

- Ink `#101820`: header, footer, commitment, legal-tool backgrounds.
- Ink 2 `#19242E`: raised dark surfaces and hover states.
- Paper `#F5F3EE`: primary warm canvas.
- White `#FAFAF8`: form and reading surfaces.
- Text `#161616`; secondary text `#6C6C68`.
- Brass `#B69A67`; dark brass `#8F7548`. Brass is an accent for rules, labels, and actions.
- Burgundy `#6E2528` is reserved for urgent/error states.

## Type

- Display: Cormorant Garamond, with Georgia fallback. Use sentence case, tight tracking, and 0.98–1.08 line height.
- UI/body: Inter, with system sans-serif fallback. Body copy is 16–18px and 1.7–1.85 line height.
- Uppercase is limited to eyebrows and compact labels.

## Layout and rhythm

- Container: `min(100% - 40px, 1400px)`; 48px gutters on large screens.
- Twelve-column desktop composition, expressed with CSS Grid.
- Section spacing: 144px desktop, 96px tablet, 68px mobile.
- Reading width: 760px. Full-bleed images may escape the content column.
- Breakpoints: 480, 768, 1080, 1280, 1600px.

## Components

- Buttons: 52px minimum height, 3px radius, quiet background transition, arrow movement up to 5px.
- Inputs: 52px minimum height, visible labels, brass focus ring, 3px radius.
- Borders: 1px low-contrast rules. Shadows are used only for floating overlays.
- Images: muted/neutral color grade, `object-fit: cover`, 2–4px radius, reveal mask and max hover scale 1.035.
- Cards are reserved for tools and documents. Editorial lists use rules and asymmetric spacing.

## Motion

- Standard duration: 600–800ms; interaction duration: 250–350ms.
- Easing: `cubic-bezier(.22,1,.36,1)`.
- Reveals vary between vertical text movement and image clipping. No bounce or scroll-jacking.
- All decorative motion is disabled by `prefers-reduced-motion: reduce`.

## Section rules

- Alternate paper, white, and ink surfaces to build narrative rhythm.
- Use one dominant image or typographic gesture per section.
- Headings lead the hierarchy; supporting copy stays compact.
- Mobile preserves the narrative order, uses full-width controls, and reserves safe-area space for the contact dock.
