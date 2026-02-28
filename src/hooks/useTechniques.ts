import techniquesData from "../data/techniques.json";
import type { Technique } from "../types/techniques";

export function useTechniques(): Technique[] {
  return techniquesData as Technique[];
}

export function useTechnique(slug: string): Technique | undefined {
  return (techniquesData as Technique[]).find(t => t.slug === slug);
}
