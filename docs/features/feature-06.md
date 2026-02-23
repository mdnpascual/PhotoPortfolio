# Feature 06: Responsive Image Loading System

## Feature Name
**Orientation-Based WebP Asset Management with Lazy Loading**

## Description
- Centralized system for loading WebP images optimized for viewport orientation
- Automatic orientation-based size selection (portrait vs landscape)
- Lazy loading for all non-hero images with intersection observer
- Preloading strategy for critical above-the-fold content (hero + first 2 sections)

## Primary User Flow
1. User navigates to any page → system detects viewport orientation (height > width = portrait, else landscape)
2. System selects appropriate image variant: landscape or portrait version
3. Hero images preload immediately for instant display
4. Non-hero images lazy-load as user scrolls toward them (trigger: 200px before viewport)
5. During loading → displays centered spinner animation
6. If image fails to load → displays triangle exclamation SVG icon with error state
7. On viewport resize/rotation → system re-evaluates orientation and loads correct variant if needed

## Modules Involved
- **ImageLoader Component** (main responsive image wrapper)
- **useLazyLoad Hook** (intersection observer for lazy loading)
- **useOrientation Hook** (detects portrait vs landscape: height > width)
- **ImagePreloader Utility** (preloads critical images on page load)
- **AssetManager** (centralized asset path resolver)
- **LoadingSpinner Component** (animated spinner for loading state)
- **ErrorIcon Component** (triangle exclamation SVG for failed loads)

## Dependencies
- **React** (hooks: useEffect, useRef, useState)
- **Intersection Observer API** (native browser API for lazy loading)
- **picture element** (native orientation-based image selection)
- **Tailwind CSS** (spinner animation, error state styling)
- **WebP images** (all assets with naming convention: `{section}-{name}-{aspect}-{orientation}.webp`)
  - Example: `hero-landing-background-16x9-landscape.webp`
  - Example: `gallery-birds-owl-4x5-portrait.webp`

## Open Questions / Missing Info
- Q1: Orientation detection: should it be exactly height > width, or include threshold?
- A1: Exactly height > width (no threshold needed)
- Q2: Lazy load threshold: how far before viewport (100px, 200px, 300px)?
- A2: 200px is a good balance, create a variable for easy adjustment
- Q3: Loading placeholder: blur-up technique, skeleton, or spinner?
- A3: Spinner - centered, animated, no need for low-res assets
- Q4: Error handling: retry failed loads, or immediate fallback?
- A4: Display triangle exclamation SVG icon, log error for debugging, no retry
- Q5: Preload priority: hero only, or hero + first gallery image?
- A5: Hero + first 2 sections (per Feature 02 answer)
- Q6: Should we generate srcset automatically from single source?
- A6: Yes
- Q7: Cache strategy: rely on browser cache, or implement service worker?
- A7: Browser cache only for now (service worker is overkill for static site)
- Q8: Aspect ratio handling: reserve space to prevent layout shift?
- A8: Yes, use aspect-ratio CSS property to prevent CLS
- Q9: Spinner style: Tailwind animate-spin or custom CSS animation?
- A9: Use Tailwind animate-spin for simplicity, create variable for size/color
- Q10: Error icon color: red, yellow, or gray?
- A10: Yellow (warning color) with subtle animation on appear
