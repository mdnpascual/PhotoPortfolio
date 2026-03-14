# Project Structure

**KEEP THIS FILE UP TO DATE** when adding, renaming, or deleting files.

## src/ Tree

```
src/
├── App.tsx                        — Minimal: just renders <AppRouter />
├── main.tsx                       — createRoot, BrowserRouter basename="/PhotoPortfolio", GlobalErrorBoundary
├── index.css                      — @import "tailwindcss" (Tailwind v4 syntax, nothing else)
│
├── config/
│   └── constants.ts               — All magic numbers (DRAWER_ANIMATION_DURATION, PAGE_TRANSITION_DURATION, etc.)
│
├── router/
│   └── AppRouter.tsx              — Routes, AnimatePresence(mode="wait"), page titles, HamburgerIcon + drawer state
│
├── pages/                         — Thin page shells (stub divs until feature is implemented)
│   ├── LandingPage.tsx
│   ├── GalleryPage.tsx
│   ├── TechniquesPage.tsx
│   ├── PostProcessingPage.tsx
│   ├── GearPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
│
├── components/
│   ├── ImageLoader.tsx            — Re-export shim (→ shared/ImageLoader or inline)
│   ├── ErrorIcon.tsx              — Re-export → shared/ErrorIcon
│   ├── LoadingSpinner.tsx         — Re-export → shared/LoadingSpinner
│   ├── PageTransition.tsx         — Framer Motion fade wrapper used per-route
│   ├── ScrollToTop.tsx            — Scrolls window to 0,0 on pathname change
│   │
│   ├── shared/
│   │   ├── index.ts               — Barrel: FilterButtons, Backdrop, HamburgerIcon, LoadingSpinner, ErrorIcon, CTAButton, PageOverlay
│   │   ├── Backdrop.tsx           — bg-black/50 fixed overlay, z-40, onClick close, needs AnimatePresence parent
│   │   ├── HamburgerIcon.tsx      — fixed top-4 left-4 z-50, 3-bar → X morph via Framer Motion
│   │   ├── LoadingSpinner.tsx     — absolute centered spinner, configurable size/color via Tailwind classes
│   │   ├── ErrorIcon.tsx          — absolute centered yellow triangle SVG, fade-in
│   │   ├── CTAButton.tsx          — white-border button, slide-up animation, supports onClick + navigate(href)
│   │   ├── FilterButtons.tsx      — pill button group, active=solid white, inactive=bordered
│   │   └── PageOverlay.tsx        — fixed full-screen black/90 modal, z-50, click-outside closes
│   │
│   ├── navigation/                — F01
│   │   ├── index.ts               — Barrel: NavigationDrawer
│   │   ├── NavigationDrawer.tsx   — Slides in from left, w-4/5 sm:w-1/3, bg-neutral-950, z-[45], needs AnimatePresence parent
│   │   └── MenuTree.tsx           — Hardcoded nav items, active-route highlight, onClose callback
│   │
│   ├── error/
│   │   ├── index.ts               — Barrel: GlobalErrorBoundary, PageErrorBoundary
│   │   ├── GlobalErrorBoundary.tsx — Full-page error UI with reload button
│   │   └── PageErrorBoundary.tsx  — Half-page error UI with retry button
│   │
│   ├── about/          (empty — F09)
│   ├── gallery/                         — F03
│   │   ├── index.ts               — Barrel: PhotoCard, PhotoOverlay
│   │   ├── PhotoCard.tsx          — Grid item: hover scale (desktop), aspect-ratio, click to open
│   │   └── PhotoOverlay.tsx       — Full-screen overlay: comparison slider, hold-for-original, before/after labels
│   ├── gear/           (empty — F08)
│   ├── image/          (empty — F06 extras)
│   ├── landing/                         — F02
│   │   ├── index.ts               — Barrel: ScrollSection
│   │   ├── ScrollSection.tsx      — Thin shell: composes SectionBackground + SectionContent
│   │   ├── SectionBackground.tsx  — Parallax image (bgRef/scaleRef injected by LandingPage)
│   │   └── SectionContent.tsx     — Framer Motion text/CTA, animates on isActive prop
│   ├── post-processing/(empty — F05)
│   └── techniques/     (empty — F04)
│
├── hooks/
│   ├── useRouteContext.ts    — { pathname, routeLabel } via useLocation
│   ├── useLandingSections.ts — reads landing-sections.json, sorts by .order
│   ├── useGallery.ts         — F11 data hook
│   ├── useGear.ts            — F11 data hook
│   ├── usePostProcessing.ts  — F11 data hook
│   ├── useTechniques.ts      — F11 data hook
│   ├── useLazyLoad.ts        — IntersectionObserver, threshold=LAZY_LOAD_THRESHOLD
│   └── useOrientation.ts     — "portrait" if window.innerHeight > window.innerWidth
│
├── types/
│   ├── index.ts
│   ├── landing.ts        — LandingSection { id, order, title, subtitle, cta, route, landscape, portrait }
│   ├── gallery.ts
│   ├── gear.ts
│   ├── post-processing.ts
│   └── techniques.ts
│
├── data/                 — JSON files read by hooks (user-editable content)
│   └── landing-sections.json
│
└── utils/
    ├── assetManager.ts
    ├── assetPath.ts
    └── imagePreloader.ts
```

## Key z-index Layers

| Layer | Value | Component |
|---|---|---|
| Content | default | page content |
| Backdrop | z-40 | `Backdrop.tsx` (hardcoded) |
| Drawer | z-[45] | `NavigationDrawer.tsx` |
| Hamburger | z-50 | `HamburgerIcon.tsx` (hardcoded) |
| Page overlay | z-50 | `PageOverlay.tsx` (hardcoded) |

## AppRouter Render Order

```
<ScrollToTop />
<HamburgerIcon />                    ← always rendered
<AnimatePresence> <Backdrop /> </AnimatePresence>
<AnimatePresence> <NavigationDrawer /> </AnimatePresence>
<AnimatePresence mode="wait"> <Routes> … </Routes> </AnimatePresence>
```

## Route → Page Map

| Path | Page | Title |
|---|---|---|
| `/` | LandingPage | Photography Portfolio |
| `/gallery` | GalleryPage | Gallery \| Photography Portfolio |
| `/techniques` | TechniquesPage | Techniques \| Photography Portfolio |
| `/post-processing` | PostProcessingPage | Post Processing \| Photography Portfolio |
| `/gear` | GearPage | Gear \| Photography Portfolio |
| `/about` | AboutPage | About \| Photography Portfolio |
| `/contact` | ContactPage | Contact \| Photography Portfolio |
| `*` | → `/` redirect | — |

## MenuTree Structure (F01)

```
Home              /
Gallery           /gallery
  Birds           /gallery   (filter — TBD in F03)
  Wildlife        /gallery
  Landscape       /gallery
  People          /gallery
Techniques        /techniques
Post-Processing   /post-processing
Gear              /gear
About             /about
Contact           /contact
```
