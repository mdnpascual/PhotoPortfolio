# Implementation Plan — PhotoPortfolio

**Generated:** 2026-02-22
**Status:** Ready to implement — all 15 features fully specified

---

## Summary

- **15 features** across 5 implementation phases, ordered by dependency
- **MVP critical path** covers 11 features (F12 → F07 → F06 → F10 → F11 → F14 → F01 → F02 → F03 → F08 → F09) — deployable without Techniques or Post-Processing
- **Complexity breakdown:** 6× Small · 6× Medium · 3× Large
- **Heaviest features:** F02 (Landing, Lenis + 13 sections), F03 (Gallery, masonry + overlay + comparison), F05 (Post-Processing, GSAP scroll sequence)
- **Biggest risk:** F05 scroll-driven animation (GSAP frame sequencing) — isolated to its own route so it cannot block MVP deploy

---

## Phase Overview

| Phase | Features | Focus |
|---|---|---|
| 1 — Foundation | F12 | Project scaffold, build config, CI/CD |
| 2 — Infrastructure | F07, F06, F10 | Routing, image system, shared components |
| 3 — Data & Safety | F11, F14 | Data schemas/hooks, error boundaries |
| 4 — Navigation | F01 | Drawer — required by every page |
| 5 — Core Pages | F02, F03, F04, F05 | All main content pages |
| 6 — Supporting Pages | F08, F09 | Gear, About, Contact |
| 7 — Polish | F13, F15 | Performance, mobile gestures |

---

## Full Feature Plan

### Phase 1 — Foundation

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F12 | Build Config & Deployment | Scaffold the Vite + React + TS project, configure Tailwind, set up GitHub Pages deploy with 404.html SPA fix and GitHub Actions | None | **S** | `vite.config.ts` · `tsconfig.json` · `tailwind.config.ts` · `postcss.config.js` · `index.html` · `public/404.html` · `.github/workflows/deploy.yml` |

---

### Phase 2 — Infrastructure

These three features are largely independent of each other and can be built in parallel after F12.

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F07 | Routing & Page Transitions | Set up React Router with browser history, 300ms fade transitions via Framer Motion, document.title updates, 404 → home redirect | F12 | **S** | `src/main.tsx` · `src/router/AppRouter.tsx` · `src/pages/` (stub files) · `src/hooks/usePageTitle.ts` |
| F06 | Responsive Image Loading | Orientation detection hook, IntersectionObserver lazy load (200px threshold), spinner and error icon states, aspect-ratio CSS to prevent layout shift | F12 | **M** | `src/components/image/ResponsiveImage.tsx` · `src/hooks/useOrientationImage.ts` · `src/hooks/useLazyLoad.ts` |
| F10 | Shared UI Components | Build all 7 reusable components (FilterButtons, Backdrop, HamburgerIcon, LoadingSpinner, ErrorIcon, CTAButton, PageOverlay) with TypeScript prop interfaces and barrel export | F12 | **M** | `src/components/shared/FilterButtons.tsx` · `Backdrop.tsx` · `HamburgerIcon.tsx` · `LoadingSpinner.tsx` · `ErrorIcon.tsx` · `CTAButton.tsx` · `PageOverlay.tsx` · `index.ts` |

---

### Phase 3 — Data & Safety

Both depend on F10 being available (F14 uses LoadingSpinner; F11 has no component dependency but benefits from F10 being stable).

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F11 | Content Data Structure | Define all TypeScript interfaces, author JSON files for all 5 content areas, implement custom hooks for data access, create `assetPath` utility | F12, F10 | **M** | `src/types/` (gallery, techniques, post-processing, gear, landing) · `src/data/` (5 JSON files) · `src/hooks/` (5 data hooks) · `src/utils/assetPath.ts` |
| F14 | Error Boundaries | GlobalErrorBoundary (app-level) and PageErrorBoundary (per-route) class components with fallback UI and retry | F10 (LoadingSpinner) | **S** | `src/components/error/GlobalErrorBoundary.tsx` · `PageErrorBoundary.tsx` · `index.ts` |

---

### Phase 4 — Navigation

Must be built before any page, as every page includes the drawer.

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F01 | Navigation Drawer | Hamburger icon (fixed top-left), left-side drawer (33% desktop / 80% mobile), always-expanded tree menu, Framer Motion slide animation (300ms), auto-close on navigation, backdrop dismiss | F07 (routing), F10 (Backdrop, HamburgerIcon) | **M** | `src/components/navigation/NavigationDrawer.tsx` · `MenuTree.tsx` · `src/hooks/useDrawer.ts` |

---

### Phase 5 — Core Pages

F02 and F03 are independent of each other and can be built in parallel. F04 and F05 can follow independently.

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F02 | Landing Page | 13 full-screen scroll sections with Lenis smooth scroll (dynamically imported), horizontal CSS wipe transitions, parallax backgrounds (10% intensity), Framer Motion text animations, scroll-snap on gallery/technique subcategories | F01, F06, F10, F11 | **L** | `src/pages/LandingPage.tsx` · `src/components/landing/ScrollSection.tsx` · `ParallaxBackground.tsx` · `src/hooks/useLenis.ts` |
| F03 | Gallery | Filter buttons (Birds/Wildlife/Landscape/People), masonry-style responsive grid (3-col desktop, 2-col mobile), hover scale 1.15×, full-screen PageOverlay on click, before/after comparison slider (React Compare Slider), "Hold for Original" (200ms threshold) | F01, F06, F10, F11 | **L** | `src/pages/GalleryPage.tsx` · `src/components/gallery/PhotoGrid.tsx` · `PhotoCard.tsx` · `GalleryOverlay.tsx` · `BeforeAfterSlider.tsx` |
| F04 | Techniques | Filter buttons (4 techniques), Embla Carousel (manual, arrows outside image), dot pagination, technique description block with software icons | F01, F06, F10, F11 | **M** | `src/pages/TechniquesPage.tsx` · `src/components/techniques/TechniqueCarousel.tsx` · `DotPagination.tsx` · `TechniqueDescription.tsx` |
| F05 | Post-Processing | Lightroom tab: scroll-driven GSAP frame sequence (20 frames, all preloaded, bidirectional), animated visual-only slider panel (80/20 desktop split), linear easing. Photoshop/AiArty tabs: placeholder content | F01, F06, F10, F11 | **L** | `src/pages/PostProcessingPage.tsx` · `src/components/post-processing/LightroomView.tsx` · `FrameSequence.tsx` · `SliderPanel.tsx` · `src/hooks/useScrollSequence.ts` |

---

### Phase 6 — Supporting Pages

Simple pages with no complex interactions. Can be built in parallel with Phase 5.

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F08 | Gear Page | Responsive grid of gear items (square 1:1 images), data from `gear.json`, no animations, instant display | F01, F10, F11 | **S** | `src/pages/GearPage.tsx` · `src/components/gear/GearGrid.tsx` · `GearCard.tsx` |
| F09 | About & Contact | About: 40/60 split layout (image/text). Contact: mailto link + monochrome social icons with colour-on-hover (48px desktop, 64px mobile) | F01, F10 | **S** | `src/pages/AboutPage.tsx` · `ContactPage.tsx` · `src/components/about/AboutLayout.tsx` · `src/components/contact/SocialLinks.tsx` |

---

### Phase 7 — Polish

Applied after all pages are functional. F13 modifies existing files; F15 adds to existing components.

| # | Feature | Goal | Dependencies | Complexity | Key Files / Modules |
|---|---|---|---|---|---|
| F13 | Performance Optimization | Route-level code splitting (React.lazy + Suspense), dynamic GSAP/Lenis imports, manualChunks in Vite config, bundle visualizer, hero preload link in index.html | All page features | **M** | `src/router/AppRouter.tsx` (updated) · `vite.config.ts` (updated) · `src/pages/LandingPage.tsx` (updated) · `src/pages/PostProcessingPage.tsx` (updated) |
| F15 | Mobile Touch Gestures | Swipe-to-dismiss drawer (Pointer Events, 50px threshold), overscroll prevention (`overscroll-behavior: none` on body + landing container), iOS safe area insets (`env(safe-area-inset-*)`), `touch-action` CSS on carousel/grid/scroll areas | F01, F02 | **M** | `src/hooks/useSwipeToDismiss.ts` · `NavigationDrawer.tsx` (updated) · `LandingPage.tsx` (updated) · `index.html` (updated) |

---

## MVP Critical Path

The minimum deployable portfolio — works without Techniques or Post-Processing pages.

```
F12  →  F07  →  F10  →  F11  →  F14
                 ↓
                F06
                 ↓
                F01  →  F02  →  F03  →  F08  →  F09
```

**MVP includes:** F12, F07, F06, F10, F11, F14, F01, F02, F03, F08, F09 (11 features)

**Post-MVP (add after first deploy):**
- F04 Techniques (M)
- F05 Post-Processing (L — most complex, high risk)
- F13 Performance (M — apply before public launch)
- F15 Mobile Gestures (M — apply before public launch)

---

## Complexity Summary

| Complexity | Count | Features |
|---|---|---|
| **S** (Small) | 6 | F07, F08, F09, F12, F14 + F07 |
| **M** (Medium) | 6 | F01, F04, F06, F10, F11, F13, F15 |
| **L** (Large) | 3 | F02, F03, F05 |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **F05: GSAP scroll frame sequencing is harder than expected** — 20+ WebP frames, bidirectional, linear easing sync with slider UI | High | High | Deferred to post-MVP. Isolated to its own route via code splitting (F13), so it cannot block the rest of the site. Prototype the scroll-to-frame mapping early before committing to full slider sync. |
| **F02: Lenis + CSS horizontal wipe interaction** — Lenis intercepts scroll events; CSS wipe transitions must not fight Lenis' tick loop | Medium | High | Lenis is dynamically imported only on Landing Page. Horizontal wipe uses CSS transforms (not scroll events), so it runs independently. Validate in isolation before adding parallax. |
| **F03: Masonry grid layout** — varying aspect ratios without a layout library can produce alignment bugs | Medium | Medium | Use CSS `grid` with `auto` row heights or a small masonry utility. Test with actual images early since aspect ratios drive the layout. |
| **Bundle size** — Framer Motion + GSAP + Embla + React Compare Slider + Lenis in one bundle | Medium | Medium | Route-based code splitting (F13) ensures GSAP, Lenis, Embla, and React Compare Slider are in separate chunks. Only loaded when their page is visited. |
| **GitHub Pages base path** — all internal links and asset paths must include `/PhotoPortfolio/` prefix | Low | High | `base` in `vite.config.ts` and `basename` in `BrowserRouter` handle this automatically. `assetPath` utility (F11) centralises asset resolution. Must verify on first deploy. |
| **TypeScript strictness blocking progress** — strict mode + `noUnusedLocals` can slow initial scaffolding | Low | Low | Disable `noUnusedLocals` / `noUnusedParameters` during active development, re-enable before final build. |

---

## Configuration Variables Reference

All values should live in `src/config/constants.ts` for easy adjustment:

| Constant | Default | Feature |
|---|---|---|
| `DRAWER_ANIMATION_DURATION` | 300ms | F01 |
| `BACKDROP_ANIMATION_DURATION` | 300ms | F10 |
| `PAGE_TRANSITION_DURATION` | 300ms | F07 |
| `PARALLAX_INTENSITY` | 0.1 (10%) | F02 |
| `HOLD_THRESHOLD` | 200ms | F03 |
| `LAZY_LOAD_THRESHOLD` | 200px | F06 |
| `SCROLL_FRAMES_COUNT` | 20 | F05 |
| `SPINNER_SIZE` | `"w-8 h-8"` | F06/F10 |
| `SPINNER_COLOR` | `"border-white"` | F06/F10 |
| `SWIPE_CLOSE_THRESHOLD` | 50px | F15 |

---

## Recommended Folder Structure

```
src/
  components/
    shared/          ← F10
    navigation/      ← F01
    landing/         ← F02
    gallery/         ← F03
    techniques/      ← F04
    post-processing/ ← F05
    gear/            ← F08
    about/           ← F09
    image/           ← F06
    error/           ← F14
  pages/             ← one file per route
  router/            ← F07, F13
  hooks/             ← all custom hooks
  data/              ← F11 JSON files
  types/             ← F11 TypeScript interfaces
  utils/             ← assetPath, etc.
  config/
    constants.ts     ← all configurable variables above
public/
  assets/
    landing/
    gallery/
    techniques/
    post-processing/
    gear/
  404.html
```
