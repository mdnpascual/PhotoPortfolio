const BASE = import.meta.env.BASE_URL; // "/PhotoPortfolio/" in prod, "/" in dev

export function getAssetPath(folder: string, filename: string): string {
  return `${BASE}assets/${folder}/${filename}`;
}
