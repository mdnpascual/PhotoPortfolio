# Feature 02: Landing Page with Seamless Scroll

## Feature Name
**Immersive Full-Screen Scrolling Landing Page**

## Description
- Single-page layout with 14 stacked full-screen sections (100vh each)
- Seamless scroll with horizontal wipe transitions between sections
- Each section has parallax background image, overlay text, and CTA button
- Sections include: Hero, Gallery previews (5), Technique previews (4), Post-Processing, Gear, About, Contact

## Primary User Flow
1. User lands on hero section with tagline, name, and "Explore" cue
2. User scrolls down (mouse wheel, trackpad, or swipe on mobile)
3. Current section wipes horizontally to the left as next section enters
4. Background images cross-fade with subtle zoom-in effect
5. Text fades in with upward motion, CTA button appears with delay
6. User clicks CTA button on any section → navigates to corresponding detail page
7. User can use hamburger menu to jump directly to any section

## Modules Involved
- **LandingPage Component** (main container)
- **ScrollSection Component** (reusable full-screen section)
- **SectionBackground Component** (parallax image with gradient overlay)
- **SectionContent Component** (text block + CTA)
- **ScrollController** (manages seamless scroll behavior)
- **SectionTransition** (horizontal wipe + fade animations)

## Dependencies
- **React + Vite** (component framework)
- **Lenis** (smooth scrolling library)
- **Framer Motion** (entry/exit animations for text/CTA)
- **GSAP + ScrollTrigger** (horizontal wipe transitions, optional)
- **Tailwind CSS** (responsive layouts, mobile adjustments)
- **WebP images** (all background images, lazy-loaded except hero)

## Open Questions / Missing Info
- Q1: Should horizontal wipe be CSS transform or GSAP-based?
- A1: Let's go with CSS transform to have a component separation between sections
- Q2: Parallax intensity: how much vertical offset (10%? 20%)?
- A2: Start with 10%, Create a variable so I can easily modify it
- Q3: Preload strategy: hero only, or hero + first 2 sections?
- A3: Hero + 2 secions
- Q4: Mobile: reduce animation intensity—by how much? (scale 1.02 instead of 1.05?)
- A4: Don't reduce animation intensity
- Q5: Text readability: minimum gradient overlay opacity? Contrast ratio target?
- A5: No hard requirements, style it as you see fit.
- Q6: Should sections have scroll snap points, or free-flowing?
- A6: Snap positions on start of subcategories, free-flowing on everything else
