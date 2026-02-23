# Feature 13: Performance Optimization Strategy

## Feature Name
**Code Splitting, Lazy Loading, and Bundle Size Management**

## Description
- Implements route-based code splitting so heavy libraries are only loaded when their page is visited
- GSAP and scroll-animation logic only bundled for the Post-Processing page
- Embla Carousel only bundled for the Techniques page
- React Compare Image only bundled for the Gallery page
- Lenis loaded only on the Landing Page (not needed on other pages)
- Bundle size monitored with `rollup-plugin-visualizer`
- Preload hints added for critical hero assets

---

## Splitting Strategy

### Route-Level Code Splitting (React.lazy + Suspense)

Each page component is lazy-loaded. The router wraps all routes in a `Suspense` boundary with the shared `LoadingSpinner` (Feature 10) as fallback.

```tsx
// src/router/AppRouter.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const LandingPage      = lazy(() => import("@/pages/LandingPage"));
const GalleryPage      = lazy(() => import("@/pages/GalleryPage"));
const TechniquesPage   = lazy(() => import("@/pages/TechniquesPage"));
const PostProcessingPage = lazy(() => import("@/pages/PostProcessingPage"));
const GearPage         = lazy(() => import("@/pages/GearPage"));
const AboutPage        = lazy(() => import("@/pages/AboutPage"));
const ContactPage      = lazy(() => import("@/pages/ContactPage"));

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/"                index element={<LandingPage />} />
        <Route path="/gallery"         element={<GalleryPage />} />
        <Route path="/techniques"      element={<TechniquesPage />} />
        <Route path="/post-processing" element={<PostProcessingPage />} />
        <Route path="/gear"            element={<GearPage />} />
        <Route path="/about"           element={<AboutPage />} />
        <Route path="/contact"         element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
}
```

---

### Library-to-Page Mapping

| Library | Used On | Loaded How |
|---|---|---|
| **Framer Motion** | All pages (navigation, transitions) | Included in main bundle (small enough) |
| **GSAP + ScrollTrigger** | Post-Processing only | Dynamic import inside PostProcessingPage |
| **Lenis** | Landing Page only | Dynamic import inside LandingPage |
| **Embla Carousel** | Techniques only | Bundled with TechniquesPage chunk |
| **React Compare Image** | Gallery only | Bundled with GalleryPage chunk |

---

### GSAP Dynamic Import Pattern

```tsx
// Inside PostProcessingPage component
useEffect(() => {
  let scrollTriggerInstance: ScrollTrigger | null = null;

  import("gsap").then(({ gsap }) => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      // setup scroll animation
    });
  });

  return () => {
    scrollTriggerInstance?.kill();
  };
}, []);
```

---

### Lenis Dynamic Import Pattern

```tsx
// Inside LandingPage component
useEffect(() => {
  let lenis: Lenis | null = null;

  import("@studio-freight/lenis").then(({ default: Lenis }) => {
    lenis = new Lenis();
    // animation frame loop
  });

  return () => {
    lenis?.destroy();
  };
}, []);
```

---

## Manual Chunk Configuration (in vite.config.ts — Feature 12)

Already defined in Feature 12's `manualChunks`. Ensures libraries are grouped into named chunks for better caching:

| Chunk Name | Contents |
|---|---|
| `react` | react, react-dom |
| `router` | react-router-dom |
| `motion` | framer-motion |
| `gsap` | gsap |
| `lenis` | @studio-freight/lenis |
| `carousel` | embla-carousel-react |
| `compare` | react-compare-slider |

---

## Bundle Analysis

Add `rollup-plugin-visualizer` as a dev dependency. Generates `dist/stats.html` after every build.

```ts
// vite.config.ts — add to plugins array (dev only)
import { visualizer } from "rollup-plugin-visualizer";

plugins: [
  react(),
  visualizer({ open: false, filename: "dist/stats.html" }),
]
```

Run `npm run build` then open `dist/stats.html` to inspect bundle composition.

---

## Hero Image Preloading

In `index.html`, add `<link rel="preload">` for the hero landing background:

```html
<link rel="preload" as="image"
  href="/PhotoPortfolio/assets/landing/hero-landing-background-16x9-landscape.webp"
  type="image/webp">
```

Orientation-based preload is handled at runtime by the image loading system (Feature 06) — only the landscape hero is preloaded via HTML hint.

---

## Lazy Image Loading

Already defined in Feature 06:
- IntersectionObserver threshold: 200px before viewport
- Spinner shown during load
- Error icon shown on failure

No additional work needed here — Feature 06 covers this completely.

---

## Modules Involved
- **`AppRouter.tsx`** — lazy route definitions with Suspense
- **`PostProcessingPage.tsx`** — dynamic GSAP import
- **`LandingPage.tsx`** — dynamic Lenis import
- **`vite.config.ts`** — manualChunks and visualizer plugin
- **`index.html`** — hero preload link

---

## Dependencies
- **React** (`lazy`, `Suspense`)
- **rollup-plugin-visualizer** (dev only, bundle analysis)
- All heavy libraries already listed in tech stack

---

## Open Questions / Missing Info
- Q1: Potential Lenis + GSAP ScrollTrigger conflict?
- A1: Since Lenis is only on Landing Page and GSAP ScrollTrigger is only on Post-Processing, they are never active simultaneously. Conflict risk is eliminated by route-based splitting.
