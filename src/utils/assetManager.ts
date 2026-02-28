const BASE = import.meta.env.BASE_URL; // "/PhotoPortfolio/" in prod, "/" in dev

export interface AssetParams {
  section: string;
  name: string;
  aspect: string;       // e.g. "16x9", "4x5"
  orientation: "portrait" | "landscape";
}

export function getAssetPath({ section, name, aspect, orientation }: AssetParams): string {
  return `${BASE}assets/${section}/${section}-${name}-${aspect}-${orientation}.webp`;
}

/** Returns both orientation variants for use with ImageLoader. */
export function getOrientedPaths(section: string, name: string, aspect: string) {
  return {
    landscapeSrc: getAssetPath({ section, name, aspect, orientation: "landscape" }),
    portraitSrc:  getAssetPath({ section, name, aspect, orientation: "portrait" }),
  };
}
