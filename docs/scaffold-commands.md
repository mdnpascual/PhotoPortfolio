# Scaffold Commands — Phase 1 (Feature 12)

**Agent:** Scaffold Agent
**Date:** 2026-02-22
**Shell:** bash (Unix syntax — works on Windows via Git Bash / WSL)
**Working directory:** `C:\Users\MDuh\Desktop\Projects\PhotoPortfolio`

Run blocks in order. Each block corresponds to a checklist step in `scaffold-checklist.md`.

---

## Block 1 — Pre-flight Checks

```bash
node -v        # Must be v20+
npm -v         # Must be v9+
pwd            # Must be .../PhotoPortfolio
```

---

## Block 2 — Initialise Vite + React + TypeScript

```bash
npm create vite@latest . -- --template react-ts
```

> When prompted about non-empty directory: choose **"Ignore files and continue"** (or confirm with `y`).
> Vite does not touch your `docs/` folder.

---

## Block 3 — Install Production Dependencies

```bash
npm install \
  react-router-dom \
  framer-motion \
  gsap \
  lenis \
  embla-carousel-react \
  react-compare-slider
```

> `lenis` — package from darkroomengineering (formerly `@studio-freight/lenis`).
> `react-compare-slider` — replaces `react-compare-image` (dropped, no React 18 support).

---

## Block 4 — Install Dev Dependencies

```bash
npm install -D \
  tailwindcss \
  autoprefixer \
  postcss \
  @types/node \
  rollup-plugin-visualizer
```

---

## Block 5 — Delete Boilerplate

```bash
rm src/App.css
rm src/assets/react.svg
rm public/vite.svg
```

---

## Block 6 — Replace Config Files

Paste these exact file contents (copy from `feature-12.md` for full versions).

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/PhotoPortfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react:    ["react", "react-dom"],
          router:   ["react-router-dom"],
          motion:   ["framer-motion"],
          gsap:     ["gsap"],
          lenis:    ["lenis"],
          carousel: ["embla-carousel-react"],
          compare:  ["react-compare-slider"],
        },
      },
    },
  },
});
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

> `noUnusedLocals` and `noUnusedParameters` are enabled from the start. Stub page files will not trigger these errors since they export a valid component.

```bash
# Delete the auto-generated tsconfig.node.json — no longer needed
rm tsconfig.node.json
```

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `src/index.css` (replace entire file)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Block 7 — Update `index.html`

Replace the entire file with this:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>Photography Portfolio</title>

    <!-- GitHub Pages SPA: restore path after 404 redirect -->
    <script>
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&');
          }).join('?');
          window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location));
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Block 8 — Create `public/404.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Photography Portfolio</title>
    <!-- GitHub Pages SPA: redirect unknown paths back to the app -->
    <script>
      var l = window.location;
      sessionStorage.redirect = l.protocol + '//' + l.hostname +
        (l.port ? ':' + l.port : '') + l.pathname + l.search;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 2).join('/') + '/?p=' +
        l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

> Write this to `public/404.html` (not `src/`).

---

## Block 9 — Create GitHub Actions Workflow

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Block 10 — Create Folder Structure

One command to create all directories:

```bash
mkdir -p \
  src/components/shared \
  src/components/navigation \
  src/components/landing \
  src/components/gallery \
  src/components/techniques \
  src/components/post-processing \
  src/components/gear \
  src/components/about \
  src/components/image \
  src/components/error \
  src/pages \
  src/router \
  src/hooks \
  src/data \
  src/types \
  src/utils \
  src/config \
  public/assets/landing \
  public/assets/gallery \
  public/assets/techniques \
  public/assets/post-processing \
  public/assets/gear \
  .github/workflows
```

Add `.gitkeep` to empty asset folders so git tracks them:

```bash
touch \
  public/assets/landing/.gitkeep \
  public/assets/gallery/.gitkeep \
  public/assets/techniques/.gitkeep \
  public/assets/post-processing/.gitkeep \
  public/assets/gear/.gitkeep
```

---

## Block 11 — Create Seed Files

### `src/config/constants.ts`

```ts
// All configurable values — adjust here without hunting through components

export const DRAWER_ANIMATION_DURATION   = 300;   // ms — Feature 01
export const BACKDROP_ANIMATION_DURATION = 300;   // ms — Feature 10
export const PAGE_TRANSITION_DURATION    = 300;   // ms — Feature 07
export const PARALLAX_INTENSITY          = 0.1;   // 10% — Feature 02
export const HOLD_THRESHOLD              = 200;   // ms — Feature 03
export const LAZY_LOAD_THRESHOLD         = 200;   // px before viewport — Feature 06
export const SCROLL_FRAMES_COUNT         = 20;    // frames — Feature 05
export const SPINNER_SIZE                = "w-8 h-8";     // Tailwind class — Feature 06/10
export const SPINNER_COLOR               = "border-white"; // Tailwind class — Feature 06/10
export const SWIPE_CLOSE_THRESHOLD       = 50;    // px — Feature 15
```

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/PhotoPortfolio">
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.tsx`

```tsx
import AppRouter from "./router/AppRouter";

function App() {
  return <AppRouter />;
}

export default App;
```

### `src/router/AppRouter.tsx`

```tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage       from "../pages/LandingPage";
import GalleryPage       from "../pages/GalleryPage";
import TechniquesPage    from "../pages/TechniquesPage";
import PostProcessingPage from "../pages/PostProcessingPage";
import GearPage          from "../pages/GearPage";
import AboutPage         from "../pages/AboutPage";
import ContactPage       from "../pages/ContactPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"                index element={<LandingPage />} />
      <Route path="/gallery"         element={<GalleryPage />} />
      <Route path="/techniques"      element={<TechniquesPage />} />
      <Route path="/post-processing" element={<PostProcessingPage />} />
      <Route path="/gear"            element={<GearPage />} />
      <Route path="/about"           element={<AboutPage />} />
      <Route path="/contact"         element={<ContactPage />} />
      <Route path="*"                element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

### Stub Page Files

Run this to create all 7 stub pages at once:

```bash
for page in LandingPage GalleryPage TechniquesPage PostProcessingPage GearPage AboutPage ContactPage; do
  echo "export default function ${page}() { return <div>${page}</div>; }" > "src/pages/${page}.tsx"
done
```

---

## Block 12 — Verify

```bash
# Start dev server — should open at http://localhost:5173/PhotoPortfolio/
npm run dev

# Type-check + build
npm run build

# Preview the built output at http://localhost:4173/PhotoPortfolio/
npm run preview
```

Expected build output in `dist/`:
```
dist/
  index.html
  404.html        ← copied from public/
  assets/
    index-[hash].js
    react-[hash].js
    router-[hash].js
    motion-[hash].js
    gsap-[hash].js
    lenis-[hash].js
    carousel-[hash].js
    compare-[hash].js
    index-[hash].css
```

---

## Block 13 — Git & Push

```bash
git init
git add .
git commit -m "feat: scaffold Phase 1 — Vite + React + TS + Tailwind + GitHub Pages deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/PhotoPortfolio.git
git push -u origin main
```

After push, GitHub Actions runs. Then:
1. Go to GitHub repo → **Settings → Pages**
2. Set **Source** to `gh-pages` branch, `/ (root)` folder
3. Save — live URL will appear: `https://<your-username>.github.io/PhotoPortfolio/`

---

## ⚠️ Missing Info / Questions to Resolve Before Running

| # | Question | Impact | Default Used |
|---|---|---|---|
| **1** | ✅ Repo name confirmed: `PhotoPortfolio` | `base: "/PhotoPortfolio/"` and `basename="/PhotoPortfolio"` are correct | `PhotoPortfolio` |
| **2** | ✅ Use `lenis` (darkroomengineering, new package) | Commands and chunk key updated | `lenis` |
| **3** | ✅ Switched to `react-compare-slider` | `react-compare-image` dropped — no React 18 support | `react-compare-slider` |
| **4** | ✅ Local Node.js is v24.1.0 | GitHub Actions `node-version` updated to `24` | Node 24 |
| **5** | ⏳ GitHub repo not yet created | Create repo on GitHub.com before running Block 13 | Must be created manually |
| **6** | ✅ `noUnusedLocals: true` from start | Enabled in tsconfig.json above | Enabled |
