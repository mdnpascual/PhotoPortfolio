export interface TechniqueImage {
  step: number;
  landscape: string;
  portrait: string;
}

export interface SoftwareIcon {
  id: string;
  label: string;
  icon: string;
}

export interface Technique {
  id: string;
  slug: "focus-stacking" | "macro" | "long-exposure" | "360-stitching";
  title: string;
  description: string;
  softwareUsed: SoftwareIcon[];
  images: TechniqueImage[];
}
