# Feature 15: Mobile Touch Gesture Enhancements

## Feature Name
**Swipe Gestures, Overscroll Prevention, and Safe Area Insets**

## Description
- Adds swipe-to-dismiss for the Navigation Drawer on mobile (horizontal swipe left)
- Prevents pull-to-refresh and elastic overscroll on the landing page scroll sections
- Adds iOS safe area inset support for notched/dynamic-island devices
- Touch action CSS optimizations for carousel and scroll performance
- All enhancements are additive — no impact on existing desktop behaviour

---

## Enhancement 1: Swipe-to-Dismiss Navigation Drawer

**Target:** Mobile only (pointer: coarse)

**Behaviour:**
- User swipes left on open drawer → drawer closes with 300ms animation
- Minimum swipe distance: 50px horizontal, swipe must be more horizontal than vertical (angle check)
- Uses Pointer Events API (works for both touch and mouse drag)

**Implementation:**

```tsx
// Inside NavigationDrawer.tsx
const SWIPE_CLOSE_THRESHOLD = 50; // px

function useSwipeToDismiss(onDismiss: () => void) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null || startY.current === null) return;
    const dx = startX.current - e.clientX;  // positive = swipe left
    const dy = Math.abs(e.clientY - startY.current);
    if (dx > SWIPE_CLOSE_THRESHOLD && dx > dy) {
      onDismiss();
    }
    startX.current = null;
    startY.current = null;
  };

  return { onPointerDown, onPointerUp };
}
```

Attach to the drawer `<div>` element. The `SWIPE_CLOSE_THRESHOLD` is a configurable constant.

---

## Enhancement 2: Overscroll / Pull-to-Refresh Prevention

**Target:** Landing Page scroll container

**Problem:** On iOS and some Android browsers, scrolling past the top/bottom triggers a pull-to-refresh or elastic bounce, which interferes with GSAP/Lenis scroll control.

**Implementation:**

CSS on the root landing scroll container:
```css
/* Applied via Tailwind class or global CSS */
overscroll-behavior: none;
-webkit-overflow-scrolling: auto;
```

In Tailwind (add to `tailwind.config.ts` if not already present, or use inline style):
```tsx
<div className="overscroll-none" style={{ WebkitOverflowScrolling: "auto" }}>
```

Also set on `<body>` in `index.html` for full coverage:
```html
<style>
  body { overscroll-behavior: none; }
</style>
```

---

## Enhancement 3: iOS Safe Area Insets

**Target:** All pages — handles notched iPhones and devices with a Dynamic Island.

**Problem:** Fixed elements (hamburger icon, drawer) can be obscured by the notch or home indicator on iOS.

**Implementation:**

In `index.html`, ensure the viewport meta includes `viewport-fit=cover`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

Apply safe area padding to:
- **HamburgerIcon** (top-left fixed): `padding-top: env(safe-area-inset-top)`
- **Navigation Drawer** (left side): `padding-left: env(safe-area-inset-left)`
- **Bottom-anchored elements** (dot indicators on Techniques): `padding-bottom: env(safe-area-inset-bottom)`

In Tailwind, use arbitrary values:
```tsx
<div className="pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)]">
```

---

## Enhancement 4: Touch Action Optimisations

**Target:** Carousel (Techniques), scroll sections (Landing Page), Gallery grid

**Purpose:** Declare intended touch behaviour to the browser so it can skip unnecessary hit-testing, improving scroll performance.

| Element | `touch-action` Value | Reason |
|---|---|---|
| Embla Carousel container | `pan-y` | Allow vertical scroll, browser handles horizontal swipe via Embla |
| Landing page scroll container | `pan-y` | Vertical scroll only |
| Gallery grid items | `manipulation` | Disable double-tap zoom on photos |
| Navigation Drawer | `pan-y` | Allows vertical scroll within drawer if menu is long |

Applied via Tailwind utility classes:
- `touch-pan-y` → `touch-action: pan-y`
- `touch-manipulation` → `touch-action: manipulation`

---

## Module Structure

No new files required. All enhancements are added to existing components:

| Enhancement | Modified Component |
|---|---|
| Swipe-to-dismiss | `NavigationDrawer.tsx` + new `useSwipeToDismiss` hook in `hooks/useSwipeToDismiss.ts` |
| Overscroll prevention | `LandingPage.tsx` + `index.html` body style |
| Safe area insets | `HamburgerIcon.tsx`, `NavigationDrawer.tsx`, `index.html` viewport meta |
| Touch action | `LandingPage.tsx`, `TechniquesPage.tsx`, `GalleryPage.tsx` |

---

## Configuration Variables
- `SWIPE_CLOSE_THRESHOLD` = 50px (minimum horizontal distance to trigger drawer dismiss)

---

## Dependencies
- **Pointer Events API** (built-in browser API, no library)
- **CSS `env()` variables** (built-in, no library)
- **Tailwind CSS** (utility classes for touch-action and safe area insets)

---

## Open Questions / Missing Info
- None — all decisions resolved. No gesture library needed; native Pointer Events API is sufficient.
