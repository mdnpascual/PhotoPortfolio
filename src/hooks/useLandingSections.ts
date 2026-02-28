import sectionsData from "../data/landing-sections.json";
import type { LandingSection } from "../types/landing";

export function useLandingSections(): LandingSection[] {
  return (sectionsData as LandingSection[]).sort((a, b) => a.order - b.order);
}
