# Feature 12: Build Configuration & Deployment

## Feature Name
**Vite Build Configuration, TypeScript Setup, and GitHub Pages Deployment**

## Description
- Configures Vite for a TypeScript React SPA targeting GitHub Pages
- Sets the correct base path for asset resolution on GitHub Pages (`/PhotoPortfolio/`)
- Provides a `404.html` workaround for SPA client-side routing on GitHub Pages
- Configures path aliases, Tailwind CSS integration, and rollup chunking strategy
- GitHub Actions workflow automates build and deploy on push to `main`
- No environment variables or API keys required for this project

---

## Files to Create / Configure

### `vite.config.ts`
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/PhotoPortfolio/",     // GitHub Pages repo name — update if repo is renamed
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

---

## GitHub Pages SPA Routing — `404.html`

GitHub Pages serves a 404 for any path that is not an actual file. For SPAs this breaks direct URL access. The standard workaround:

1. Copy `index.html` to `public/404.html` — GitHub Pages serves it on any 404.
2. Add a redirect script in `404.html` that stores the path in `sessionStorage` and redirects to `/`.
3. Add a script in `index.html` that reads `sessionStorage` and calls `history.replaceState` to restore the intended path before React Router initialises.

**`public/404.html` redirect snippet:**
```html
<script>
  var l = window.location;
  sessionStorage.redirect = l.protocol + '//' + l.hostname +
    (l.port ? ':' + l.port : '') + l.pathname + l.search;
  l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1).join('/') + '/?p=' +
    l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
    (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
</script>
```

**`index.html` restore snippet (in `<head>`):**
```html
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
```

---

## GitHub Actions Workflow — `.github/workflows/deploy.yml`

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

## `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  }
}
```

---

## Base Path Handling in Code

React Router must use the same base path as Vite:

```tsx
// src/main.tsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter basename="/PhotoPortfolio">
  <App />
</BrowserRouter>
```

Asset paths in code must also include the base. Use the `assetPath` utility from Feature 11 — Vite's `import.meta.env.BASE_URL` resolves this automatically when images are referenced via the public folder.

---

## Modules Involved
- **`vite.config.ts`** — build configuration and chunking
- **`tsconfig.json`** — TypeScript compiler options
- **`tailwind.config.ts`** — Tailwind content paths
- **`public/404.html`** — GitHub Pages SPA routing fix
- **`index.html`** — redirect restore script
- **`.github/workflows/deploy.yml`** — automated CI/CD

---

## Dependencies
- **Vite** (`vite`, `@vitejs/plugin-react`)
- **TypeScript** (`typescript`)
- **Tailwind CSS** (`tailwindcss`, `autoprefixer`, `postcss`)
- **GitHub Actions** (`peaceiris/actions-gh-pages`)

---

## Open Questions / Missing Info
- Q1: What is the exact GitHub repository name for the base path?
- A1: Placeholder `/PhotoPortfolio/` used — update `base` in `vite.config.ts` and `basename` in `BrowserRouter` if repo name differs.
- Q2: Any environment variables or API keys needed?
- A2: None — confirmed by user.
