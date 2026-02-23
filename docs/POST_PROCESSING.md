Below is the **`POST_PROCESSING.md`** specification for the AI agent (no code).
# POST_PROCESSING.md

## Purpose
A **Post‑Processing** page with top category buttons and a **scroll‑driven, seamless animation** section below. The Lightroom tab demonstrates an animated edit workflow where the image and UI sliders change as the user scrolls.

---

## Routing / Navigation
- Persistent **hamburger icon** at top-left.
- Clicking hamburger opens the **left-side drawer** used across the site.
- Drawer **routes to pages** (not scroll).
- **Post‑Processing** entry is highlighted as active.

---

## Top Filter Controls
**Layout:**
- Horizontal **button group**, centered at the top.
- Buttons are rounded (pill shape).
- Spacing between buttons is consistent.

**Buttons:**
- Lightroom
- Photoshop/Nik
- AiArty Enhancer/Matting

**Behavior:**
- Clicking a button updates the **scroll section** below.
- Default selection: **Lightroom**.

---

## Scroll‑Driven Section (Lightroom Tab)
### Concept
As the user scrolls, the photo **progressively changes** from unprocessed to edited, while a **non‑interactive UI slider panel** animates to show corresponding edits.

### Core Components
| Component | Behavior |
|---|---|
| **Image Sequence** | WebP frames progress with scroll position |
| **Slider UI (visual only)** | Slider handles move smoothly to show edits |
| **Scroll Mapping** | Scroll position → frame index + slider values |

---

## Lightroom Layout
### Desktop / Landscape
- **Left:** large image preview
- **Right:** vertical stack of **Lightroom‑like sliders** (visual only)
- Mimics real editing workspace

### Mobile / Portrait
- **Top:** image preview
- **Below:** slider list in a **compact stacked layout**
- Reduce visible sliders; keep readability high

---

## Slider UI (Visual Only)
- Sliders **do not accept user input**
- Slider handles **animate smoothly** according to scroll progress
- Use minimal labels (e.g., Exposure, Contrast, Highlights, Shadows, Clarity, Vibrance)

---

## Image Sequence Details
- Use **multiple WebP frames** (e.g., 20–40)
- Frames represent edit stages from **original → final**
- Scroll controls which frame is visible

**Frame naming style (example):**
- `post-lightroom-step-01-3x2-landscape.webp`
- `post-lightroom-step-02-3x2-landscape.webp`
- `post-lightroom-step-01-4x5-portrait.webp`

---

## Photoshop/Nik Tab
**Status:** TODO
- Placeholder content only for now.

---

## AiArty Enhancer/Matting Tab
**Status:** TODO
- Placeholder content only for now.

---

## Assets (Placeholders)
- All assets are **WebP**
- Use the naming convention from `SPECFICATIONS.md`
- Provide separate **desktop/mobile** frames if aspect ratios differ
