# Feature 08: Gear Page

## Feature Name
**Photography Equipment Showcase**

## Description
- Static page displaying photography gear used for the portfolio
- Organized by category: Cameras, Lenses, Accessories, Software
- Each item shows image, name, and brief description
- Clean, grid-based layout with responsive design
- No interactive elements beyond navigation

## Primary User Flow
1. User navigates to Gear page from landing page CTA or navigation drawer
2. User sees page title and introduction text
3. User scrolls through categorized gear sections
4. Each category displays gear items in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
5. User reads gear names and descriptions
6. User can navigate away using hamburger menu

## Modules Involved
- **GearPage Component** (main page container)
- **GearSection Component** (category container: Cameras, Lenses, etc.)
- **GearCard Component** (individual gear item display)
- **GearData** (JSON or markdown file with gear information)

## Dependencies
- **React Router DOM** (page routing)
- **Tailwind CSS** (grid layout, responsive breakpoints)
- **WebP images** (gear photos, lazy-loaded)
- **Framer Motion** (optional: subtle fade-in animation on scroll)

## Open Questions / Missing Info
- Q1: Gear images: product shots, in-use photos, or both?
- A1: Product shots preferred, clean white or transparent backgrounds
- Q2: Should gear items be clickable (link to manufacturer, specs)?
- A2: No links, keep it simple and static
- Q3: Price information: display or omit?
- A3: Omit prices, focus on gear name and usage description
- Q4: Animation: fade-in on scroll or instant display?
- A4: Instant display, no scroll animations for simplicity
- Q5: Category sections: collapsible accordions or always visible?
- A5: Always visible, no collapsing
- Q6: Gear data source: hardcoded, JSON file, or markdown?
- A6: JSON file in /src/data/gear.json for easy updates
- Q7: Image aspect ratio: square (1:1) or product-style (4:3)?
- A7: Square (1:1) for consistency and grid alignment
- Q8: Should there be a "favorite" or "recommended" badge on certain items?
- A8: No badges, all items displayed equally
