import { useMemo } from "react";
import sectionsData from "../data/landing-sections.json";
import type { LandingSection } from "../types/landing";

export function useLandingSections(): LandingSection[] {
  return useMemo(
    () => (sectionsData as LandingSection[]).slice().sort((a, b) => a.order - b.order),
    []
  );
}
