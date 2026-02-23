Summary
  • Project Goal: Create an immersive, hobbyist photography portfolio website with seamless scrolling, animated
  sections, and interactive before/after comparisons
  • Deployment Constraint: Must be hosted on GitHub Pages as a static Single-Page Application (SPA) with
  client-side routing only
  • Performance Requirements: WebP images with lazy-loading, responsive sizing, preloading for hero content, and
  smooth 60fps animations
  • Feature Complexity: Advanced interactions including scroll-driven image sequences, before/after sliders, image
  carousels, and parallax effects across multiple pages
  • Accessibility: Keyboard navigation, semantic HTML, contrast compliance, and mobile-optimized layouts with
  touch-friendly controls

  ---
  Proposed Stack
  ┌─────────────┬─────────────────────┬───────────────────────────────────────────────┬───────────────────────────┐
  │    Layer    │       Choice        │                   Rationale                   │      Docs Referenced      │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │             │                     │ Fast development, static build output         │                           │
  │ Framework   │ React + Vite        │ compatible with GitHub Pages, component-based │ SPECIFICATIONS.md         │
  │             │                     │  architecture                                 │                           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Styling     │ Tailwind CSS        │ Utility-first approach for rapid responsive   │ SPECIFICATIONS.md         │
  │             │                     │ layouts, reduced CSS bundle size              │                           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Smooth      │ Lenis               │ Lightweight smooth scrolling library for      │ SPECIFICATIONS.md,        │
  │ Scroll      │                     │ seamless section transitions                  │ Landing_Page.md           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Animations  │ Framer Motion       │ React-native declarative animations for       │ SPECIFICATIONS.md,        │
  │             │                     │ entry/exit transitions, drawer, overlays      │ Landing_Page.md           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Scroll      │ GSAP +              │ Advanced scroll-based animations for          │ SPECIFICATIONS.md,        │
  │ Triggers    │ ScrollTrigger       │ Post-Processing image sequences               │ POST_PROCESSING.md        │
  │             │ (optional)          │                                               │                           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Hosting     │ GitHub Pages        │ Free static hosting, simple deployment        │ SPECIFICATIONS.md         │
  │             │                     │ workflow                                      │                           │
  ├─────────────┼─────────────────────┼───────────────────────────────────────────────┼───────────────────────────┤
  │ Asset       │                     │ Modern image format with superior             │ SPECIFICATIONS.md, All    │
  │ Format      │ WebP                │ compression, browser support is excellent in  │ pages                     │
  │             │                     │ 2026                                          │                           │
  └─────────────┴─────────────────────┴───────────────────────────────────────────────┴───────────────────────────┘
  ---
  Evaluation

  ✅ Pros

  1. GitHub Pages Compatible: React + Vite produces static builds perfect for GH Pages; no server-side rendering
  needed
  2. Performance-Optimized Stack: Vite's fast builds, Tailwind's purged CSS, and WebP images align with performance
   requirements
  3. Animation Power: Framer Motion handles 90% of needed animations (drawer, overlays, transitions); GSAP is
  appropriately optional
  4. Developer Experience: Modern tooling with hot reload, TypeScript support, and active communities
  5. Lightweight: Lenis (3KB) avoids heavy scroll libraries while providing smooth scrolling
  6. Mobile-First: Tailwind + Framer Motion make responsive design straightforward

  ⚠️ Cons

  1. Scroll Animation Complexity: Scroll-driven image sequences (POST_PROCESSING.md: 20-40 frames) may require GSAP
   despite being marked "optional"—Framer Motion's scroll capabilities are limited for complex frame-based
  animations
  2. Image Comparison Slider: No library specified for before/after slider (GALLERY_PAGE.md)—will need
  react-compare-image or custom implementation
  3. Carousel Implementation: No library specified for technique carousels (TECHNIQUES.md)—will need swiper or
  embla-carousel
  4. Client-Side Routing: No router specified (react-router-dom needed for SPA navigation between Gallery,
  Techniques, Post-Processing pages)
  5. Bundle Size Risk: Multiple animation libraries (Framer Motion + GSAP), carousel, and comparison slider may
  bloat bundle without code-splitting

  ---
  Decision

  ✅ APPROVE WITH CHANGES

  The core stack (React + Vite + Tailwind) is solid and aligns perfectly with GitHub Pages deployment and
  performance goals. However, critical libraries are missing for required features, and the "optional" GSAP
  designation is misleading given the scroll-driven image sequence requirements.

  ---
  Changes

  1. Add: React Router DOM

  Rationale: Required for client-side routing between pages (Landing → Gallery → Techniques → Post-Processing).
  npm install react-router-dom

  2. Add: React Compare Image

  Rationale: Implements before/after slider required in GALLERY_PAGE.md overlay.
  npm install react-compare-image

  3. Add: Embla Carousel (or Swiper)

  Rationale: Required for swipeable technique image carousel in TECHNIQUES.md.
  Recommendation: Embla (5KB) over Swiper (heavy) for performance.
  npm install embla-carousel-react

  4. Reclassify GSAP as REQUIRED (not optional)

  Rationale: POST_PROCESSING.md requires scroll-driven image sequences with 20-40 frames. Framer Motion's useScroll
   hook is inadequate for frame-by-frame control. GSAP ScrollTrigger is industry-standard for this.
  Update SPECIFICATIONS.md line 10: Remove "(optional)" notation.

  5. Add: Code-Splitting Strategy

  Rationale: Mitigate bundle size from multiple libraries.
  Implementation: Use React.lazy() for Gallery, Techniques, Post-Processing pages.

  6. Clarify: Lenis vs Native Scroll

  Concern: Lenis smooth scroll may conflict with GSAP ScrollTrigger. Test integration early.
  Fallback: If conflicts arise, use GSAP's built-in smooth scrolling or CSS scroll-behavior: smooth with JS
  polyfill.

  ---
  Final Tech Stack (Updated)
  ┌──────────────────┬──────────────────────┬────────────────────────────┐
  │      Layer       │        Choice        │           Status           │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Framework        │ React + Vite         │ ✅ Approved                │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Styling          │ Tailwind CSS         │ ✅ Approved                │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Routing          │ React Router DOM     │ ⚠️ ADD                     │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Smooth Scroll    │ Lenis                │ ✅ Approved (test w/ GSAP) │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Animations       │ Framer Motion        │ ✅ Approved                │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Scroll Sequences │ GSAP + ScrollTrigger │ ⚠️ REQUIRED                │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Carousel         │ Embla Carousel       │ ⚠️ ADD                     │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Image Comparison │ React Compare Image  │ ⚠️ ADD                     │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Hosting          │ GitHub Pages         │ ✅ Approved                │
  ├──────────────────┼──────────────────────┼────────────────────────────┤
  │ Assets           │ WebP                 │ ✅ Approved                │
  └──────────────────┴──────────────────────┴────────────────────────────┘
  ---
  Recommendation: Implement changes 1-4 before development begins. Test Lenis + GSAP integration in a prototype to
  avoid late-stage conflicts.