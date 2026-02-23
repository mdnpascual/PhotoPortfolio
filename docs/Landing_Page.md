# Landing Page Spec — Seamless Scroll + Animated Sections (React)

## 1) Purpose
Create an immersive, **seamless scroll** landing page for a hobbyist photography portfolio, with animated full‑screen sections, and a persistent left‑side navigation drawer for quick access.

---

## 3) Global Layout & Navigation
### 3.1 Global View
- **Single-page landing** with stacked full‑screen sections (100vh each).
- **Seamless scroll** between sections (no native scrollbar visible).
- **Persistent hamburger icon** (top-left).

### 3.2 Navigation Drawer
- Hamburger icon opens a **left-side drawer** covering **66% of screen width**.
- Drawer overlays content (darkened backdrop).
- **Tree structure menu** expanded by default:
  - Gallery
    - Birds
    - Wildlife
    - Landscape
    - Macro
  - Techniques
    - Focus Stacking
    - Macro Workflow
    - 360 Stitching
    - Long Exposure
  - Post‑Processing
    - Lightroom
    - Photoshop
    - DxO / Nik / AI Tools
  - Gear
  - About
  - Contact

**Behavior**
- Clicking any item scrolls to its section.
- Smooth close animation.
- Overlay tap closes drawer.

---

## 4) Scroll Sections (Full Screen)
Each section = **100vh** with animated entry/exit, parallax background image, and overlay text.

| Section Order | Section | Content Focus | Background |
|---|---|---|---|
| 1 | **Hero / Intro** | Tagline + name + “Explore” cue | Best hero image |
| 2–5 | **Gallery Subsections** | Birds, Wildlife, Landscape, Macro | Representative image per category |
| 6–9 | **Techniques Subsections** | Focus Stacking, Macro Workflow, 360 Stitching, Long Exposure | Technique visuals |
| 10 | **Post‑Processing** | Before/after emphasis + tools used | Editing-themed image |
| 11 | **Gear Snapshot** | Short list preview | Gear flat lay |
| 12 | **About** | Short hobbyist bio | Portrait or abstract |
| 13 | **Contact** | Simple CTA + socials | Minimal or pattern |

> **Note:** These are sections **within the landing page**, not separate pages.

---

## 5) Section Composition
Each full-screen section should follow:
- **Background image** (cover, subtle parallax).
- **Text block** aligned left/center-left.
- **Icon/button cue** (“View Gallery”, “See Technique”, etc.)
- **Minimalist overlay gradient** for text readability.

### Gallery Section Example (structure)
- Title: “Birds”
- Subtitle: “Patience, timing, and feather detail”
- CTA: “Open Birds Gallery”

---

## 6) Animations & Transitions
### 6.1 Scroll Transition Style
- **Horizontal wipe to left** on section changes.
- Smooth cross‑fade of background images.
- Text fades in + slight upward motion.

### 6.2 Entry Animations
- Background: subtle zoom‑in (scale 1.05 → 1.0)
- Text: opacity 0 → 1, y: 20 → 0
- CTA button: delay 150–250ms

### 6.3 Exit Animations
- Text fades out first.
- Background slides/wipes to left.

---

## 7) Mobile Behavior
- Same scroll sections but **reduced animation intensity**.
- Text block centered for narrow widths.
- Navigation drawer uses **full width** on mobile (100%).
- CTA buttons large enough for thumb.

---

## 8) Performance Guidelines
- Images are **WebP**, multiple sizes for responsive loading.
- Use **lazy‑loading** for all non‑hero sections.
- Preload only hero image + first gallery image.

---

## 9) Accessibility
- Drawer is keyboard accessible (ESC closes).
- Section titles are semantic headings.
- Contrast ratio maintained for text overlays.

---

## 10) Deliverables for AI Agent
- React landing page that:
  - Renders all sections in order.
  - Uses smooth scroll and animated transitions.
  - Includes persistent hamburger + drawer navigation.
  - Supports mobile and desktop.
