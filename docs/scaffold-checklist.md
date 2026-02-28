# Scaffold Checklist — Phase 1 (Feature 12)

**Agent:** Scaffold Agent
**Date:** 2026-02-22
**Covers:** F12 — Build Configuration & Deployment

Run steps in order. Check off each item before moving to the next.

---

## Pre-flight

- [x] **1.** Confirm Node.js version is **20+** (`node -v`) — ✅ v24.1.0 confirmed
- [x] **2.** Confirm npm version is **9+** (`npm -v`)
- [x] **3.** Confirm you are in `C:\Users\MDuh\Desktop\Projects\PhotoPortfolio` (`pwd`)
- [x] **4.** Confirm the GitHub repository name matches the base path placeholder — ✅ confirmed: `PhotoPortfolio`

---

## Step 1 — Initialise Vite Project

- [x] **5.** Run `npm create vite@latest . -- --template react-ts` in the existing project folder
  - When prompted "Current directory is not empty. Remove existing files and continue?" → type `y` only if `docs/` is safely committed or backed up. The Vite CLI only touches root-level files, not subdirectories like `docs/`.
  - **Safer alternative:** Answer `Ignore files and continue` if the prompt offers it (newer Vite versions do).
  - **Variant chosen:** TypeScript + SWC → uses `@vitejs/plugin-react-swc` in `vite.config.ts`
- [x] **6.** Verify these files were created: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`
- [x] **7.** Delete boilerplate files that won't be used: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

---

## Step 2 — Install Dependencies

- [x] **8.** Install production dependencies (see `scaffold-commands.md` for full command)
  - `react-router-dom`
  - `framer-motion`
  - `gsap`
  - `lenis` (darkroomengineering — new package name, formerly `@studio-freight/lenis`)
  - `embla-carousel-react`
  - `react-compare-slider` (replaces `react-compare-image` — no React 18 support)
- [x] **9.** Install dev dependencies
  - `tailwindcss`
  - `@tailwindcss/postcss` (**added** — Tailwind v4 no longer works as a direct PostCSS plugin)
  - `autoprefixer`
  - `postcss`
  - `@types/node` (required for `path.resolve` in vite.config.ts)
  - `rollup-plugin-visualizer` (used in F13, install now)

---

## Step 3 — Replace / Update Config Files

- [x] **10.** Replace `vite.config.ts` with contents from `scaffold-commands.md` (already updated: `lenis` chunk key, `react-compare-slider`, base path confirmed)
- [x] **11.** Replace `tsconfig.json` with contents from `scaffold-commands.md` (`noUnusedLocals: true` and `noUnusedParameters: true` enabled from the start)
- [x] **12.** Delete `tsconfig.node.json` — the updated tsconfig.json from feature-12.md covers everything
- [x] **13.** Create `tailwind.config.ts` with contents from `feature-12.md`
- [x] **14.** Create `postcss.config.js` — **actual config used (Tailwind v4):**
  ```js
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  };
  ```
  _(feature-12.md has the old v3 config; use the above instead)_
- [x] **15.** Replace `src/index.css` with Tailwind v4 import (**actual used**):
  ```css
  @import "tailwindcss";
  ```
  _(The three `@tailwind` directives are v3 syntax; v4 uses the single import above)_

---

## Step 4 — Update `index.html`

- [x] **16.** Update the `<meta name="viewport">` tag to include `viewport-fit=cover` (required for F15 safe area insets):
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  ```
- [x] **17.** Add the GitHub Pages SPA redirect restore script inside `<head>` (from `feature-12.md`)
- [x] **18.** Update `<title>` to your portfolio name (e.g., `<title>Photography Portfolio</title>`)
- [x] **19.** Verify `<script type="module" src="/src/main.tsx"></script>` is present in body

---

## Step 5 — Create `public/404.html`

- [x] **20.** Create `public/404.html` with the redirect script from `feature-12.md`
  - This file re-routes GitHub Pages 404s back to the SPA

---

## Step 6 — Create GitHub Actions Workflow

- [x] **21.** Create `.github/workflows/` directory
- [x] **22.** Create `.github/workflows/deploy.yml` with contents from `feature-12.md`

---

## Step 7 — Create Full Folder Structure

Create all directories as specified in `implementation-plan.md`. Empty directories need a `.gitkeep` placeholder so git tracks them.

- [x] **23.** Create `src/` subdirectories (see `scaffold-commands.md` for one-shot mkdir command):
  - `src/components/shared/`
  - `src/components/navigation/`
  - `src/components/landing/`
  - `src/components/gallery/`
  - `src/components/techniques/`
  - `src/components/post-processing/`
  - `src/components/gear/`
  - `src/components/about/`
  - `src/components/image/`
  - `src/components/error/`
  - `src/pages/`
  - `src/router/`
  - `src/hooks/`
  - `src/data/`
  - `src/types/`
  - `src/utils/`
  - `src/config/`
- [x] **24.** Create `public/assets/` subdirectories:
  - `public/assets/landing/`
  - `public/assets/gallery/`
  - `public/assets/techniques/`
  - `public/assets/post-processing/`
  - `public/assets/gear/`

---

## Step 8 — Create Seed Files

- [x] **25.** Create `src/config/constants.ts` with all configurable variables (see `scaffold-commands.md`)
- [x] **26.** Update `src/main.tsx` — wrap app in `BrowserRouter` with correct `basename`
- [x] **27.** Simplify `src/App.tsx` to a shell component (just returns `<div>App</div>` for now)
- [x] **28.** Create stub page files in `src/pages/` — one per route, each just returns `<div>PageName</div>`:
  - `LandingPage.tsx`, `GalleryPage.tsx`, `TechniquesPage.tsx`, `PostProcessingPage.tsx`, `GearPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`
- [x] **29.** Create `src/router/AppRouter.tsx` — static (no lazy loading yet; F13 adds that), just `<Routes>` with all stub pages

---

## Step 9 — Verify Build

- [x] **30.** Run `npm run dev` — browser should open with no errors, Tailwind should be active
- [x] **31.** Run `npm run build` — TypeScript compile + Vite build should complete with no errors
- [x] **32.** Run `npm run preview` — verify the built app loads at `http://localhost:4173/PhotoPortfolio/`
- [x] **33.** Confirm asset paths resolve correctly under the `/PhotoPortfolio/` base

---

## Step 10 — Git & Deploy

- [x] **34.** Initialise git if not already done (`git init`)
- [x] **35.** Create `.gitignore` — ensure `node_modules/`, `dist/` are excluded
- [x] **36.** Stage and commit all scaffold files
- [x] **37.** Push to `main` branch on GitHub — GitHub Actions should trigger automatically
- [x] **38.** In GitHub repo → **Settings → Pages → Source**: set to `gh-pages` branch (created by the action on first deploy)
- [x] **39.** Verify live deploy at `https://<your-username>.github.io/PhotoPortfolio/`

---

## Post-Scaffold Verification

- [x] **40.** Navigate to a stub page directly — **issue found:** 404.html fires (no raw 404), but SPA restore script fails to re-route. URL becomes `?p=PhotoPortfolio/gallery` and shows Landing Page instead of `/gallery`. Works correctly in local dev. **Fix in F07 Routing.**
- [ ] **41.** Open browser DevTools → Network → confirm no errors, no missing chunk files _(not verified)_
- [ ] **42.** Check bundle output in `dist/` — confirm named chunks (`react.js`, `router.js`, `motion.js`, etc.) are present _(not verified)_

---

---

## Phase 1 Complete ✓

- Dev server runs without errors
- Build passes (`npm run build`)
- Site live at `https://mdnpascual.github.io/PhotoPortfolio/`
- **Items 41–42 not verified** — defer to post-F07
- **Item 40 known issue** — GitHub Pages SPA restore broken; fix in F07 Routing
- **Tailwind v4 deviation** — see items 9, 14, 15
- **SWC deviation** — see item 5
