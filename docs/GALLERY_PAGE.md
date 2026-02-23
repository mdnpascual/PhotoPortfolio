# GALLERY_PAGE.md

## Purpose
A standalone **Gallery page** with category filters, responsive photo grid, and a full‑screen overlay that supports **before/after comparison**.

---

## Routing / Navigation
- Persistent **hamburger icon** at top-left.
- Clicking hamburger opens the same **left-side drawer** used on the landing page.
- In this page, the drawer **routes to pages** (not scroll).
- The **Gallery** entry is highlighted as active.

---

## Top Filter Controls
**Layout:**
- Horizontal **button group**, centered at the top.
- Buttons are rounded (pill shape).
- Spacing between buttons is consistent.

**Buttons (for now):**
- Birds
- Wildlife
- Landscape
- People

**Behavior:**
- Clicking a button updates the grid content below.
- Default selection: **Birds** (or first in list).

---

## Photo Grid
**Layout:**
- Desktop: **3 photos per row**
- Mobile: **2 photos per row**
- Supports **arbitrary number** of photos with vertical scrolling.

### Grid Spacing & Hover Safety
**Goal:** Maximize horizontal real estate while preventing **edge clipping** when images scale on hover.

**Desktop**
- **Outer margins:** 5% left/right of viewport
- **Column gap (inside grid):** 2.5% of viewport width
- **Hover scale:** 1.15x
- **Behavior:**
  - Images may overlap *into interior gaps*
  - Images should **not exceed** outer margins

**Mobile**
- **Outer margins:** 6% left/right of viewport
- **Column gap (inside grid):** 4% of viewport width
- **Hover scale:** 1.10x
- **Behavior:** Keep spacing airy for touch use

**Note:** Clip overflow **within grid cells** to prevent bleed into outer margins.

---

## Hover Interaction (Desktop)
- Image **scales to 1.15x** on hover.
- Smooth animation (ease-in-out).

---

## Full‑Screen Overlay (On Photo Click)
**Behavior:**
- Clicking a photo opens a **full‑screen overlay**.
- Overlay dims background, focus on image.

**Image Placement:**
- Image is vertically centered.
- Image width fills the screen with **10% padding** on both left/right.

---

## Before/After Comparison (Inside Overlay)
**Technical Name:** **Image Comparison Slider** (aka Before/After Slider)

**Default State:**
- A vertical draggable bar reveals Photo A vs Photo B.
- The comparison slider is **enabled** by default.

**Controls at Top of Image:**
1. **Button**: “Hold for Original”
2. **Radio toggle**: “Use Image Comparison Slider”

**Behavior Rules:**
- **Hold button** shows original photo while held.
- **Release** returns to edited photo.
- When button is **clicked** (not held):
  1) The comparison slider disappears
  2) Radio toggle turns **off**
- Turning the **radio toggle on** re‑enables the slider.

---

## Overlay Navigation / Exit
- A **left arrow icon** appears at **top-right**.
- Clicking it closes overlay and returns to grid.

---

## Assets (Placeholders)
- Each gallery item needs **two images** (A: original, B: edited).
- Use WebP and the naming convention described in `SPECFICATIONS.md`.

**Example naming style:**
- `gallery-birds-owl-edited-3x2-landscape.webp`
- `gallery-birds-owl-original-3x2-landscape.webp`
