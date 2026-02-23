# SPECFICATIONS.md

## Tech Stack
| Category | Choice | Rationale |
|---|---|---|
| **Framework** | **React + Vite** | Fast, simple, static hosting friendly |
| **Routing** | **React Router DOM** | Required for client-side routing between pages (Landing → Gallery → Techniques → Post-Processing) |
| **Styling** | **Tailwind CSS** | Utility‑first, rapid layout, responsive |
| **Smooth Scroll** | **Lenis** | Lightweight smooth scrolling |
| **Animations** | **Framer Motion** | Declarative, React‑friendly |
| **Scroll Triggers** | **GSAP + ScrollTrigger** | For advanced scroll‑based animations |
| **Image Comparison** | **React Compare Slider** | Implements before/after slider required in GALLERY_PAGE.md overlay. (`react-compare-image` dropped — no React 18 support) |
| **Image Carousel** | **Embla Carousel (or Swiper)** | Required for swipeable technique image carousel in TECHNIQUES.md.
  Recommendation: Embla (5KB) over Swiper (heavy) for performance |

> **Note:** Framer Motion can handle most transitions; GSAP is required for advanced sequences.

---

## Hosting
- **Deployment target:** GitHub Pages
- **Architecture:** Single‑Page Application (SPA)
- **Routing:** Client‑side only

---

## Assets
- **All image assets:** WebP format
- **Orientation-based variants** (portrait vs landscape)
- **Lazy‑loading for non‑hero images** with spinner loading state
- **Error handling:** Triangle exclamation SVG icon for failed loads

### Asset Placeholder Rule (for AI Agents)
- When a section needs an image, **create a dummy file** in the `assets/` folder.
- The filename must include:
  - **Section name**
  - **Usage description**
  - **Aspect ratio**
  - **Orientation** (landscape or portrait)

**Orientation Detection:**
- When viewport height > width → use portrait variant
- Otherwise → use landscape variant

**Examples (naming style only):**
- `hero-landing-background-16x9-landscape.webp`
- `gallery-birds-cover-4x5-portrait.webp`
- `techniques-focus-stacking-hero-3x2-landscape.webp`
