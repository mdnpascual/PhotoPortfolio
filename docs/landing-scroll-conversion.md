# Landing Page — Horizontal Wipe → Vertical Scroll Conversion Guide

## Summary
Switching from horizontal wipe to vertical slide transitions requires changes to
**one file only** (`LandingPage.tsx`). No WebP images, no JSON data, no other
components need to change.

---

## What Changes

### `src/pages/LandingPage.tsx`

#### 1. Section transform axis — the core change (~2 lines)

**Current (horizontal wipe):**
```js
el.style.transform = `translateX(${tx}%)`;
```

**After (vertical slide):**
```js
el.style.transform = `translateY(${tx}%)`;
```

`tx` is already calculated correctly as a percentage (−100 / 0 / +100) — only the
axis changes.

#### 2. Initial section positions — 1 line

**Current:**
```jsx
style={{ transform: i === 0 ? "translateX(0%)" : "translateX(100%)" }}
```

**After:**
```jsx
style={{ transform: i === 0 ? "translateY(0%)" : "translateY(100%)" }}
```

#### 3. Background parallax — 2–3 lines

Currently the background moves on Y (`translateY`) to create depth while sections
wipe horizontally. With vertical section movement, a Y parallax on the background
would fight the section's own Y motion and look jittery.

**Options:**
- **Remove parallax entirely** — simplest, cleanest.
- **Switch to X parallax** — nudge the background slightly left/right as you scroll
  (subtle, won't clash with vertical section movement).
- **Keep Y parallax but reduce intensity** — can work if `PARALLAX_INTENSITY` is
  kept very low (≤ 0.05).

#### 4. Nothing else changes in this file
Lenis setup, scroll spacer height, snap logic, active-index tracking, preloading,
and orientation-aware image URLs are all axis-agnostic.

---

## What Does NOT Change

| Item | Reason |
|---|---|
| `landing-sections.json` | Data is axis-agnostic |
| All `.webp` image files | Filenames and aspect ratios are unaffected |
| `SectionBackground.tsx` | Renders background image regardless of transition axis |
| `SectionContent.tsx` | Framer Motion text animations are independent |
| `ScrollSection.tsx` | Thin shell, no axis awareness |
| `useLandingSections.ts` | Pure data hook |
| `useOrientation.ts` | Orientation detection is unrelated |
| `constants.ts` | `PARALLAX_INTENSITY` stays (may just be unused) |
| Lenis configuration | Already scrolls vertically — no change needed |
| Snap logic | Works on `scrollY` regardless of visual axis |

---

## Estimated Effort

| Task | Lines changed | Time |
|---|---|---|
| Swap `translateX` → `translateY` | 2 | 1 min |
| Fix initial position style | 1 | 1 min |
| Decide & update parallax | 2–5 | 5 min |
| Manual test on desktop + mobile | — | 10 min |
| **Total** | **~6** | **~15 min** |

---

## Reversibility
Fully reversible — swap the axis back and restore the parallax direction.
No data, assets, or other components are affected in either direction.
