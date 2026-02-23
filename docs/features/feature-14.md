# Feature 14: Error Boundaries & Error Handling

## Feature Name
**React Error Boundaries and Graceful Fallback UI**

## Description
- Wraps the entire application in a global error boundary to catch unexpected runtime errors
- Wraps each lazy-loaded page route in a page-level error boundary to isolate failures
- Provides a minimal, non-intrusive fallback UI when a component tree crashes
- Image-level errors are already handled separately by the image loading system (Feature 06)
- No third-party error reporting service — console logging only

---

## Boundary Hierarchy

```
<GlobalErrorBoundary>          ← catches app-wide crashes
  <AppRouter>
    <Suspense fallback={<LoadingSpinner />}>
      <PageErrorBoundary>      ← wraps each lazy-loaded page
        <LandingPage />
      </PageErrorBoundary>
      ...
    </Suspense>
  </AppRouter>
</GlobalErrorBoundary>
```

---

## Components

### GlobalErrorBoundary
- Class component (required — React error boundaries must be class-based)
- Catches any unhandled error in the component tree
- Fallback UI: centered message with a "Reload page" button
- Logs error to `console.error` on `componentDidCatch`

```tsx
// src/components/error/GlobalErrorBoundary.tsx
import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class GlobalErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("GlobalErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-white text-lg">Something went wrong.</p>
          <button
            className="px-4 py-2 bg-white text-black rounded"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### PageErrorBoundary
- Same pattern as GlobalErrorBoundary but with a lighter fallback
- Fallback UI: inline message "This page failed to load." with a retry button that resets `hasError` state
- Allows user to retry without full page reload

```tsx
// src/components/error/PageErrorBoundary.tsx
// Same class pattern — fallback is a smaller inline error block
// "retry" button calls this.setState({ hasError: false })
```

---

## Integration Points

### In `main.tsx` (global boundary)
```tsx
<GlobalErrorBoundary>
  <BrowserRouter basename="/PhotoPortfolio">
    <App />
  </BrowserRouter>
</GlobalErrorBoundary>
```

### In `AppRouter.tsx` (per-page boundary)
```tsx
<Suspense fallback={<LoadingSpinner />}>
  <PageErrorBoundary>
    <LandingPage />
  </PageErrorBoundary>
</Suspense>
```

---

## What Is NOT Handled Here

| Scenario | Handled By |
|---|---|
| Image load failure (404, network) | Feature 06 — ErrorIcon shown in image container |
| Lazy route chunk load failure | Caught by PageErrorBoundary |
| JSON data parse errors | TypeScript compile-time (Feature 11) |
| Routing 404 (unknown path) | Feature 07 — redirect to home |

---

## Module Structure

```
src/
  components/
    error/
      GlobalErrorBoundary.tsx
      PageErrorBoundary.tsx
      index.ts
```

---

## Modules Involved
- **`GlobalErrorBoundary`** — top-level crash handler
- **`PageErrorBoundary`** — per-route crash isolation
- **`AppRouter`** — wraps each lazy route in PageErrorBoundary
- **`main.tsx`** — mounts GlobalErrorBoundary at root

---

## Dependencies
- **React** (class components for error boundary API)
- **Tailwind CSS** (fallback UI styling)
- **TypeScript** (typed props/state)

---

## Open Questions / Missing Info
- None — all decisions resolved. No third-party error reporting service required.
