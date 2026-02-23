# Feature 03: Gallery with Before/After Comparison

## Feature Name
**Category-Filtered Photo Gallery with Full-Screen Before/After Overlay**

## Description
- Top filter buttons (Birds, Wildlife, Landscape, People) switch gallery content
- Responsive photo grid: 3 columns (desktop), 2 columns (mobile)
- Images scale 1.15x on hover (desktop only)
- Clicking photo opens full-screen overlay with before/after comparison slider
- Overlay includes "Hold for Original" button and toggle for comparison slider

## Primary User Flow
1. User lands on Gallery page with default filter (Birds) selected
2. User sees responsive grid of edited photos with hover scale effect
3. User clicks a photo → full-screen overlay opens with dimmed background
4. Overlay displays image with comparison slider enabled by default (vertical draggable bar)
5. User drags slider left/right to reveal original vs edited photo
6. User holds "Hold for Original" button → shows original photo temporarily
7. User clicks "Hold for Original" button (not hold) → comparison slider disappears, toggle turns off
8. User toggles "Use Image Comparison Slider" → re-enables slider
9. User clicks left arrow icon (top-right) → closes overlay, returns to grid

## Modules Involved
- **GalleryPage Component** (main page container)
- **FilterButtons Component** (category selection: Birds, Wildlife, etc.)
- **PhotoGrid Component** (responsive masonry/grid layout)
- **PhotoCard Component** (individual photo with hover effect)
- **FullScreenOverlay Component** (dimmed backdrop + centered image)
- **BeforeAfterSlider Component** (vertical draggable comparison slider)
- **OverlayControls Component** ("Hold for Original" button + toggle)

## Dependencies
- **React Router DOM** (page routing)
- **React Compare Slider** (`react-compare-slider`) (before/after slider implementation — replaces `react-compare-image`, no React 18 support)
- **Framer Motion** (overlay open/close, hover scale animations)
- **Tailwind CSS** (grid layout: 3-col desktop, 2-col mobile; margins 5%/6%)
- **WebP images** (original + edited pairs, lazy-loaded)

## Open Questions / Missing Info
- Q1: Grid layout: CSS Grid or flexbox? Should we use masonry (varying heights)?
- A1: Photos can have different aspect ratios (varying heights) so pick what can support that
- Q2: Hover scale: should images overlap interior gaps only, or use z-index stacking?
- A2: z-index stacking
- Q3: Mobile: should hover scale be disabled entirely, or use tap-to-scale?
- A3: Probably useless in mobile, if there's an event to detect current position of finger (probably none), then implement it on mobile on that event
- Q4: Comparison slider: should it have keyboard controls (arrow keys)?
- A4: No keyboard controls
- Q5: "Hold for Original" button: how long is "hold" threshold? (200ms? 300ms?)
- A5: Start with 200ms. Create a variable so I can easily modify it
- Q6: Overlay image size: 10% padding on left/right—should this be viewport-relative or fixed?
- A6: I'm not sure of the difference, use viewport relative but create a boolean for it so I can see how fixed look behaves
- Q7: Should ESC key close overlay?
- A7: No keyboard controls
- Q8: Accessibility: how to announce before/after state to screen readers?
- A8: Below the image. There will be a left aligned text that says before, and a right aligned text that says after.
