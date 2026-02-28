import galleryData from "../data/gallery.json";
import type { GalleryImage } from "../types/gallery";

export function useGallery(category?: string): GalleryImage[] {
  if (!category) return galleryData as GalleryImage[];
  return (galleryData as GalleryImage[]).filter(img => img.category === category);
}
