# Feature 16: Gallery Overlay Controls

## Feature Name
**"Hold for Original" Button + Comparison Slider Toggle in Photo Overlay**

## Background / Reason for This Feature
Feature 03 specified these controls and they appear in the code, but they are not visible on large
desktop viewports. This feature tracks the confirmed reproduction and fix.

## Confirmed Reproduction (user-tested)

| Viewport | Zoom | Controls visible? |
|---|---|---|
| Mobile (phone, real device) | 100% | ✅ Yes |
| 1920 × 1080 (desktop, dev tools) | 100% | ❌ No — controls clipped off top |
| 3840 × 2160 (4K, dev tools) | 100% | ❌ No |
| 3840 × 2160 (4K, dev tools) | 55% | ✅ Yes (effective viewport shrinks to ~2112 × 1188) |

**Conclusion:** the controls are rendering but are pushed above the visible top edge of the screen
on viewports where `image height + controls height + labels height > 100vh`.

## What Should Be Present (from GALLERY_PAGE.md)

### Controls at Top of Image
Two controls sit **above** the comparison image inside the overlay:

1. **"Hold for Original" button**
   - Press-and-hold (≥ `HOLD_THRESHOLD` = 200 ms) → shows the unedited original photo
   - Release after hold → returns to edited / slider view
   - Click (< 200 ms, no hold) → disables comparison slider AND turns the toggle off

2. **"Use Image Comparison Slider" toggle (checkbox)**
   - Default state: **ON** (slider enabled)
   - Turning it **OFF** hides the slider and shows only the edited image
   - Turning it back **ON** re-enables the slider

### Behavior Rules
| Action | Result |
|---|---|
| Hold button ≥ 200 ms | Show original image (full frame) |
| Release after hold | Return to slider (or edited-only if toggle was off) |
| Click button (< 200 ms) | Hide slider + set toggle to OFF |
| Toggle → ON | Show comparison slider |
| Toggle → OFF | Show edited image only |

### Before / After Labels
- Visible only when the comparison slider is active
- "Before" — left-aligned below the image
- "After" — right-aligned below the image

## Acceptance Criteria
- [x] Controls row is visible above the comparison image in the overlay
- [x] Hold button correctly shows original while held and reverts on release
- [x] Click (not hold) on button disables slider and unchecks toggle
- [x] Checking the toggle re-enables the slider
- [x] Before/After labels appear below the image only when the slider is active
- [x] Controls do not overflow or get clipped on any viewport size

## Root Cause (confirmed)

The overlay parent is `fixed inset-0 flex items-center justify-center`. It vertically centres
the entire content column (controls + image + labels) as one block. At 1920 × 1080 with an
80vw-wide image:

```
image width  = 0.80 × 1920 = 1536 px
image height (3:2 ratio)   =  1024 px
controls row               ≈    50 px
labels row                 ≈    30 px
total column height        ≈  1104 px  >  1080 px viewport
```

`items-center` offsets the column by `(1080 - 1104) / 2 = -12 px`, pushing the controls
above the top edge. The overflow is invisible because the overlay has no scroll and no
`overflow: visible` escape. On mobile the image is narrower (80vw of ~390 px = 312 px wide,
~208 px tall), so the column is well under 100vh and everything fits.

## Suggested Fix Approach
1. **Preferred — constrain image height:** cap the image area at a `max-height` that always
   leaves room for controls and labels, e.g. `max-height: calc(100vh - 120px)` with
   `object-fit: contain` inside. Controls and labels are always on-screen; no scroll needed.
2. **Alternative — scrollable column:** change the content wrapper to
   `overflow-y-auto max-h-screen py-4` so the whole column scrolls if it exceeds the viewport.
   Simpler but requires the user to scroll to see the controls on very large images.
3. Do **not** change `items-center` to `items-start` alone — that would pin the image to the
   top of the screen and look wrong when content is shorter than the viewport.

## Files Affected
- `src/components/gallery/PhotoOverlay.tsx` — layout fix
