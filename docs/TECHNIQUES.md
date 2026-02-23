# TECHNIQUES.md

## Purpose
A standalone **Techniques** page showcasing technique‑specific imagery and explanations, with swipeable image carousel, dot pagination, and software‑used callouts.

---

## Routing / Navigation
- Persistent **hamburger icon** at top-left.
- Clicking hamburger opens the **left-side drawer** used across the site.
- Drawer **routes to pages** (not scroll).
- **Techniques** entry is highlighted as active.

---

## Top Filter Controls
**Layout:**
- Horizontal **button group**, centered at the top.
- Buttons are rounded (pill shape).
- Spacing between buttons is consistent.

**Buttons (for now):**
- Focus Stacking
- Macro
- Long Exposure
- 360 Stitching

**Behavior:**
- Clicking a button updates the **carousel content** and text block.
- Default selection: **Focus Stacking**.

---

## Image Carousel (Single Image View)
**Behavior:**
- Displays **one image at a time**.
- User can **swipe left/right** (touch) or **drag/arrow** (desktop).
- Images are **not clickable**.
- **No overlay** or lightbox.

**Aspect / Placement:**
- Image centered, fits container width.
- Maintain aspect ratio; cropped only if necessary.

---

## Pagination Dots Widget
**Technical Name:** **Carousel Pagination / Dot Indicator**

**Design:**
- Horizontal **rounded rectangle** container.
- **Multiple dots** inside (count = number of steps/images).
- **Current step** shown as a **bold / filled dot**.

**Placement:**
- Centered directly **below the image**.

---

## Technique Description Block (Below Pagination)
**Layout:**
- Single row header, then paragraph.

**Header Row:**
- **Left‑aligned bold title** (Technique name).
- **Right‑aligned label with icon(s):**
  `Software used: [icon1] [icon2]`

**Body Text:**
- Paragraph below the header row.
- Placeholder text for now:
  **“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**

---

## Assets (Placeholders)
- All images are **WebP**.
- Use naming conventions from `SPECFICATIONS.md`.

**Example naming style:**
- `techniques-focus-stacking-step-1-3x2-landscape.webp`
- `techniques-macro-step-2-3x2-portrait.webp`
