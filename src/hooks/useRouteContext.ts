import { useLocation } from "react-router-dom";

const ROUTE_LABELS: Record<string, string> = {
  "/":                "Home",
  "/gallery":         "Gallery",
  "/techniques":      "Techniques",
  "/post-processing": "Post Processing",
  "/gear":            "Gear",
  "/about":           "About",
  "/contact":         "Contact",
};

export function useRouteContext() {
  const { pathname } = useLocation();
  return {
    pathname,
    routeLabel: ROUTE_LABELS[pathname] ?? "",
  };
}
