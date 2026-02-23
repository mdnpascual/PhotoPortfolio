# Scaffold Checklist — Phase 1 (Feature 12)

**Agent:** Scaffold Agent
**Date:** 2026-02-22
**Covers:** F12 — Build Configuration & Deployment

Run steps in order. Check off each item before moving to the next.

---

## Pre-flight

- [ ] **1.** Confirm Node.js version is **20+** (`node -v`) — ✅ v24.1.0 confirmed
- [ ] **2.** Confirm npm version is **9+** (`npm -v`)
- [ ] **3.** Confirm you are in `C:\Users\MDuh\Desktop\Projects\PhotoPortfolio` (`pwd`)
- [ ] **4.** Confirm the GitHub repository name matches the base path placeholder — ✅ confirmed: `PhotoPortfolio`

---

## Step 1 — Initialise Vite Project

- [ ] **5.** Run `npm create vite@latest . -- --template react-ts` in the existing project folder
  - When prompted "Current directory is not empty. Remove existing files and continue?" → type `y` only if `docs/` is safely committed or backed up. The Vite CLI only touches root-level files, not subdirectories like `docs/`.
  - **Safer alternative:** Answer `Ignore files and continue` if the prompt offers it (newer Vite versions do).
- [ ] **6.** Verify these files were created: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`
- [ ] **7.** Delete boilerplate files that won't be used: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

---

## Step 2 — Install Dependencies

- [ ] **8.** Install production dependencies (see `scaffold-commands.md` for full command)
  - `react-router-dom`
  - `framer-motion`
  - `gsap`
  - `lenis` (darkroomengineering — new package name, formerly `@studio-freight/lenis`)
  - `embla-carousel-react`
  - `react-compare-slider` (replaces `react-compare-image` — no React 18 support)
- [ ] **9.** Install dev dependencies
  - `tailwindcss`
  - `autoprefixer`
  - `postcss`
  - `@types/node` (required for `path.resolve` in vite.config.ts)
  - `rollup-plugin-visualizer` (used in F13, install now)

---

## Step 3 — Replace / Update Config Files

- [ ] **10.** Replace `vite.config.ts` with contents from `scaffold-commands.md` (already updated: `lenis` chunk key, `react-compare-slider`, base path confirmed)
- [ ] **11.** Replace `tsconfig.json` with contents from `scaffold-commands.md` (`noUnusedLocals: true` and `noUnusedParameters: true` enabled from the start)
- [ ] **12.** Delete `tsconfig.node.json` — the updated tsconfig.json from feature-12.md covers everything
- [ ] **13.** Create `tailwind.config.ts` with contents from `feature-12.md`
- [ ] **14.** Create `postcss.config.js` with contents from `feature-12.md`
- [ ] **15.** Replace `src/index.css` with Tailwind directives only:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

## Step 4 — Update `index.html`

- [ ] **16.** Update the `<meta name="viewport">` tag to include `viewport-fit=cover` (required for F15 safe area insets):
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  ```
- [ ] **17.** Add the GitHub Pages SPA redirect restore script inside `<head>` (from `feature-12.md`)
- [ ] **18.** Update `<title>` to your portfolio name (e.g., `<title>Photography Portfolio</title>`)
- [ ] **19.** Verify `<script type="module" src="/src/main.tsx"></script>` is present in body

---

## Step 5 — Create `public/404.html`

- [ ] **20.** Create `public/404.html` with the redirect script from `feature-12.md`
  - This file re-routes GitHub Pages 404s back to the SPA

---

## Step 6 — Create GitHub Actions Workflow

- [ ] **21.** Create `.github/workflows/` directory
- [ ] **22.** Create `.github/workflows/deploy.yml` with contents from `feature-12.md`

---

## Step 7 — Create Full Folder Structure

Create all directories as specified in `implementation-plan.md`. Empty directories need a `.gitkeep` placeholder so git tracks them.

- [ ] **23.** Create `src/` subdirectories (see `scaffold-commands.md` for one-shot mkdir command):
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
- [ ] **24.** Create `public/assets/` subdirectories:
  - `public/assets/landing/`
  - `public/assets/gallery/`
  - `public/assets/techniques/`
  - `public/assets/post-processing/`
  - `public/assets/gear/`

---

## Step 8 — Create Seed Files

- [ ] **25.** Create `src/config/constants.ts` with all configurable variables (see `scaffold-commands.md`)
- [ ] **26.** Update `src/main.tsx` — wrap app in `BrowserRouter` with correct `basename`
- [ ] **27.** Simplify `src/App.tsx` to a shell component (just returns `<div>App</div>` for now)
- [ ] **28.** Create stub page files in `src/pages/` — one per route, each just returns `<div>PageName</div>`:
  - `LandingPage.tsx`, `GalleryPage.tsx`, `TechniquesPage.tsx`, `PostProcessingPage.tsx`, `GearPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`
- [ ] **29.** Create `src/router/AppRouter.tsx` — static (no lazy loading yet; F13 adds that), just `<Routes>` with all stub pages

---

## Step 9 — Verify Build

- [ ] **30.** Run `npm run dev` — browser should open with no errors, Tailwind should be active
- [ ] **31.** Run `npm run build` — TypeScript compile + Vite build should complete with no errors
- [ ] **32.** Run `npm run preview` — verify the built app loads at `http://localhost:4173/PhotoPortfolio/`
- [ ] **33.** Confirm asset paths resolve correctly under the `/PhotoPortfolio/` base

---

## Step 10 — Git & Deploy

- [ ] **34.** Initialise git if not already done (`git init`)
- [ ] **35.** Create `.gitignore` — ensure `node_modules/`, `dist/` are excluded
- [ ] **36.** Stage and commit all scaffold files
- [ ] **37.** Push to `main` branch on GitHub — GitHub Actions should trigger automatically
- [ ] **38.** In GitHub repo → **Settings → Pages → Source**: set to `gh-pages` branch (created by the action on first deploy)
- [ ] **39.** Verify live deploy at `https://<your-username>.github.io/PhotoPortfolio/`

---

## Post-Scaffold Verification

- [ ] **40.** Navigate to a stub page directly (e.g., `https://.../PhotoPortfolio/gallery`) — should load (not 404) thanks to `public/404.html`
- [ ] **41.** Open browser DevTools → Network → confirm no errors, no missing chunk files
- [ ] **42.** Check bundle output in `dist/` — confirm named chunks (`react.js`, `router.js`, `motion.js`, etc.) are present

---

## ⚠️ Remaining Blocker

- **GitHub repo not yet created.** Create it on GitHub.com before running Block 13 (git remote + push).
  All other questions are resolved — commands are ready to run.
