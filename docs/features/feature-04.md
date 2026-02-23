# Feature 04: Techniques Page with Image Carousel

## Feature Name
**Swipeable Technique Showcase with Pagination and Software Callouts**

## Description
- Top filter buttons (Focus Stacking, Macro, Long Exposure, 360 Stitching) switch technique content
- Single-image carousel displays one step/image at a time with swipe/drag navigation
- Dot pagination widget below carousel shows current step
- Description block below pagination shows technique name, software icons, and explanation text

## Primary User Flow
1. User lands on Techniques page with default filter (Focus Stacking) selected
2. User sees centered image carousel displaying first step of technique
3. User swipes left/right (mobile) or drags/clicks arrows (desktop) to view next/previous steps
4. Dot pagination updates to show current step position (e.g., step 3 of 5)
5. User reads technique description below with software icons (Photoshop, Lightroom, etc.)
6. User clicks different filter button (e.g., Macro) → carousel updates with new technique's images
7. User navigates through new technique's steps using same carousel controls

## Modules Involved
- **TechniquesPage Component** (main page container)
- **FilterButtons Component** (technique category selection)
- **ImageCarousel Component** (swipeable single-image viewer)
- **CarouselControls Component** (arrow buttons for desktop)
- **DotPagination Component** (dot indicator widget showing current step)
- **TechniqueDescription Component** (header with title + software icons, body text)
- **SoftwareIcon Component** (displays tool icons: Photoshop, Lightroom, DxO, etc.)

## Dependencies
- **React Router DOM** (page routing)
- **Embla Carousel** (lightweight swipeable carousel, 5KB)
- **Framer Motion** (carousel slide transitions, filter button animations)
- **Tailwind CSS** (responsive layout, centered image placement)
- **WebP images** (technique step images, lazy-loaded)

## Open Questions / Missing Info
- Q1: Carousel autoplay: should it auto-advance, or manual only?
- A1: Manual only
- Q2: Arrow button placement: inside image area or outside?
- A2: Outside, left and right of the image
- Q3: Image aspect ratio: should all technique images be same aspect (3:2)?
- A3: No strict requirements, but prefer landscape orientation for desktop
- Q4: Dot pagination: how many dots max before condensing (e.g., 1...5...10)?
- A4: No condensing, show all dots.
- Q5: Software icons: use SVG, PNG, or icon font?
- A5: SVG preferred for scalability
- Q6: Description text: fixed Lorem ipsum or load from data source?
- A6: Load from data source (JSON or markdown files)
- Q7: Mobile: disable drag and use tap zones instead?
- A7: No, keep swipe/drag for mobile as it's intuitive
- Q8: Should images be clickable to open full-screen view?
- A8: No, images are not clickable (per TECHNIQUES.md)
