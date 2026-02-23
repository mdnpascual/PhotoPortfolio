# Feature 11: Content Data Structure & Management

## Feature Name
**TypeScript Data Schemas, JSON Files, and Data Loading Utilities**

## Description
- Defines the complete data architecture for all site content: gallery photos, techniques, post-processing, gear, and landing page sections
- User authors content by editing JSON files in `/src/data/`
- TypeScript interfaces provide type safety and IDE autocompletion
- Custom React hooks provide clean data access to components
- No external CMS, no build-time conversion — data is static JSON, assets are pre-generated WebP files

---

## Content Areas & Schemas

### 1. Gallery (`/src/data/gallery.json`)

**Categories:** `birds` | `wildlife` | `landscape` | `people`

```ts
interface GalleryImage {
  id: string;
  category: "birds" | "wildlife" | "landscape" | "people";
  title: string;
  aspectRatio: string;              // e.g. "3x2"
  editedLandscape: string;          // filename only, resolved from /assets/gallery/
  editedPortrait: string;
  originalLandscape: string;
  originalPortrait: string;
}
```

**Example JSON entry:**
```json
{
  "id": "birds-owl-1",
  "category": "birds",
  "title": "Great Horned Owl",
  "aspectRatio": "3x2",
  "editedLandscape": "gallery-birds-owl-edited-3x2-landscape.webp",
  "editedPortrait": "gallery-birds-owl-edited-4x5-portrait.webp",
  "originalLandscape": "gallery-birds-owl-original-3x2-landscape.webp",
  "originalPortrait": "gallery-birds-owl-original-4x5-portrait.webp"
}
```

---

### 2. Techniques (`/src/data/techniques.json`)

**Techniques:** `focus-stacking` | `macro` | `long-exposure` | `360-stitching`

```ts
interface TechniqueImage {
  step: number;
  landscape: string;
  portrait: string;
}

interface SoftwareIcon {
  id: string;           // e.g. "photoshop"
  label: string;        // e.g. "Adobe Photoshop"
  icon: string;         // SVG filename or inline key
}

interface Technique {
  id: string;
  slug: "focus-stacking" | "macro" | "long-exposure" | "360-stitching";
  title: string;
  description: string;
  softwareUsed: SoftwareIcon[];
  images: TechniqueImage[];
}
```

**Example JSON entry:**
```json
{
  "id": "focus-stacking",
  "slug": "focus-stacking",
  "title": "Focus Stacking",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "softwareUsed": [
    { "id": "photoshop", "label": "Adobe Photoshop", "icon": "icon-photoshop.svg" }
  ],
  "images": [
    {
      "step": 1,
      "landscape": "techniques-focus-stacking-step-1-3x2-landscape.webp",
      "portrait": "techniques-focus-stacking-step-1-3x4-portrait.webp"
    }
  ]
}
```

---

### 3. Post-Processing (`/src/data/post-processing.json`)

**Tabs:** `lightroom` | `photoshop-nik` | `aiartist`

```ts
interface PostFrame {
  index: number;
  landscape: string;
  portrait: string;
}

interface SliderKeyframe {
  label: string;
  start: number;   // value at frame 0
  end: number;     // value at last frame
  min: number;
  max: number;
}

interface PostProcessingTab {
  id: string;
  slug: "lightroom" | "photoshop-nik" | "aiartist";
  title: string;
  placeholder: boolean;   // true = show placeholder, no animation
  frames: PostFrame[];
  sliders: SliderKeyframe[];
}
```

**Lightroom sliders (from POST_PROCESSING.md):** Exposure, Contrast, Highlights, Shadows, Clarity, Vibrance

**Example JSON entry (Lightroom):**
```json
{
  "id": "lightroom",
  "slug": "lightroom",
  "title": "Lightroom",
  "placeholder": false,
  "frames": [
    {
      "index": 1,
      "landscape": "post-lightroom-step-01-3x2-landscape.webp",
      "portrait": "post-lightroom-step-01-4x5-portrait.webp"
    }
  ],
  "sliders": [
    { "label": "Exposure",   "start": 0,   "end": 1.5,  "min": -5,  "max": 5   },
    { "label": "Contrast",   "start": 0,   "end": 30,   "min": -100,"max": 100 },
    { "label": "Highlights", "start": 0,   "end": -60,  "min": -100,"max": 100 },
    { "label": "Shadows",    "start": 0,   "end": 40,   "min": -100,"max": 100 },
    { "label": "Clarity",    "start": 0,   "end": 20,   "min": -100,"max": 100 },
    { "label": "Vibrance",   "start": 0,   "end": 25,   "min": -100,"max": 100 }
  ]
}
```

---

### 4. Gear (`/src/data/gear.json`)

Already partially defined in Feature 08. Full schema:

```ts
interface GearItem {
  id: string;
  name: string;
  category: "camera" | "lens" | "accessory" | "tripod" | "filter" | "other";
  image: string;           // filename, resolved from /assets/gear/
  description: string;
}
```

**Example JSON entry:**
```json
{
  "id": "sony-a7iv",
  "name": "Sony A7 IV",
  "category": "camera",
  "image": "gear-camera-sony-a7iv-1x1.webp",
  "description": "Full-frame mirrorless camera body."
}
```

---

### 5. Landing Page Sections (`/src/data/landing-sections.json`)

```ts
interface LandingSection {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  cta: string;              // button label
  route: string;            // React Router path or hash
  landscape: string;
  portrait: string;
}
```

**Sections (from Landing_Page.md):** hero, birds, wildlife, landscape, macro, focus-stacking, macro-workflow, 360-stitching, long-exposure, post-processing, gear, about, contact

---

## File Structure

```
src/
  data/
    gallery.json
    techniques.json
    post-processing.json
    gear.json
    landing-sections.json
  types/
    gallery.ts
    techniques.ts
    post-processing.ts
    gear.ts
    landing.ts
    index.ts               ← barrel export
  hooks/
    useGallery.ts          ← filters gallery by category
    useTechniques.ts       ← returns all or single technique by slug
    usePostProcessing.ts   ← returns tab data by slug
    useGear.ts             ← returns all gear items
    useLandingSections.ts  ← returns ordered sections
```

---

## Data Loading Utilities

All hooks follow this pattern:
- Import JSON directly (Vite supports JSON imports natively)
- Return typed data — no async fetching, no loading states needed
- Filtering logic kept in the hook, not the component

```ts
// Example: useGallery.ts
import galleryData from "../data/gallery.json";
import type { GalleryImage } from "../types/gallery";

export function useGallery(category?: string): GalleryImage[] {
  if (!category) return galleryData as GalleryImage[];
  return (galleryData as GalleryImage[]).filter(img => img.category === category);
}
```

---

## Asset Path Resolution

All image filenames in JSON are resolved at component level using a single utility:

```ts
// src/utils/assetPath.ts
export function getAssetPath(folder: string, filename: string): string {
  return `/assets/${folder}/${filename}`;
}
```

Assets live at:
- `/public/assets/gallery/`
- `/public/assets/techniques/`
- `/public/assets/post-processing/`
- `/public/assets/gear/`
- `/public/assets/landing/`

---

## Modules Involved
- **TypeScript interfaces** (`/src/types/`)
- **JSON data files** (`/src/data/`)
- **Custom hooks** (`/src/hooks/`)
- **Asset path utility** (`/src/utils/assetPath.ts`)

---

## Dependencies
- **TypeScript** (all interfaces and type checking)
- **Vite** (native JSON import support — no additional loader needed)
- **React** (hooks)

---

## Open Questions / Missing Info
- Q1: How to ensure JSON schemas are correct before build?
- A1: TypeScript type assertions in hooks will catch schema mismatches at compile time. No runtime validation library needed.
- Q2: Are Photoshop/Nik and AiArty tabs placeholder-only for now?
- A2: Yes — `placeholder: true` flag in JSON disables scroll animation and shows placeholder text.
