# Feature 10: Shared UI Components Library

## Feature Name
**Reusable Component Library for Cross-Page UI Elements**

## Description
- Centralises all UI primitives used across multiple pages into a single shared library
- Includes filter buttons, backdrop overlay, hamburger icon, loading spinner, error icon, CTA buttons, and page overlay
- Ensures visual and behavioural consistency across Gallery, Techniques, Post-Processing, Landing Page, and Navigation
- All components are TypeScript-typed with explicit prop interfaces

---

## Components Included

### FilterButtons
- Horizontal pill-shaped button group used on Gallery, Techniques, and Post-Processing pages
- Active button is visually distinguished (filled/bold)
- Accepts a list of labels and a controlled `activeId` + `onChange` prop
- Consistent spacing and rounded shape across all pages

### Backdrop
- Semi-transparent dark overlay rendered behind the Navigation Drawer
- Click-to-dismiss handler passed as prop
- Framer Motion fade-in/out animation (300ms)
- z-index layering: above page content, below drawer

### HamburgerIcon
- Persistent top-left trigger button rendered on every page
- Three-line icon, transforms to X when drawer is open
- Framer Motion toggle animation
- Fixed position, always on top (highest z-index)

### LoadingSpinner
- Tailwind `animate-spin` circle spinner
- Configurable size (`SPINNER_SIZE`) and color (`SPINNER_COLOR`) via props with defaults
- Centred within its container
- Used wherever an image is loading (Feature 06)

### ErrorIcon
- Yellow triangle with exclamation mark SVG
- Inline SVG (no external dependency)
- Displayed when an image fails to load (Feature 06)
- Centred within its container

### CTAButton
- Primary call-to-action button for landing page sections
- Props: `label`, `onClick`, optional `href` for routing
- Minimal design, large tap target for mobile
- Framer Motion entry animation with configurable delay

### PageOverlay
- Full-screen overlay used by Gallery (Feature 03) for photo detail view
- Dims background, centres content
- Close trigger via backdrop click or back arrow
- Framer Motion fade in/out

---

## Module Structure

```
src/
  components/
    shared/
      FilterButtons.tsx
      Backdrop.tsx
      HamburgerIcon.tsx
      LoadingSpinner.tsx
      ErrorIcon.tsx
      CTAButton.tsx
      PageOverlay.tsx
      index.ts          ← barrel export
```

---

## Primary User Flow
1. Any page needing a filter group imports `FilterButtons` — no duplication
2. NavigationDrawer (Feature 01) imports `Backdrop` and `HamburgerIcon`
3. Image loading system (Feature 06) imports `LoadingSpinner` and `ErrorIcon`
4. Gallery overlay (Feature 03) imports `PageOverlay`
5. Landing page sections (Feature 02) import `CTAButton`

---

## Dependencies
- **Framer Motion** (Backdrop, HamburgerIcon, CTAButton, PageOverlay animations)
- **Tailwind CSS** (all layout and base styling)
- **React** (standard functional components)
- **TypeScript** (prop interfaces for all components)

---

## TypeScript Interfaces

```ts
// FilterButtons
interface FilterButtonsProps {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

// LoadingSpinner
interface LoadingSpinnerProps {
  size?: string;   // default: "w-8 h-8"
  color?: string;  // default: "border-white"
}

// CTAButton
interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  animationDelay?: number; // ms, default 150
}

// PageOverlay
interface PageOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}
```

---

## Configuration Variables
- `SPINNER_SIZE` — default Tailwind class (e.g., `"w-8 h-8"`)
- `SPINNER_COLOR` — default Tailwind border color class (e.g., `"border-white"`)
- `BACKDROP_ANIMATION_DURATION` — 300ms (matches drawer)

---

## Open Questions / Missing Info
- None — all decisions resolved.
