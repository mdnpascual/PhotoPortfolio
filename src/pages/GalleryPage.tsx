import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useGallery } from "../hooks/useGallery";
import { useOrientation } from "../hooks/useOrientation";
import { getAssetPath } from "../utils/assetPath";
import { FilterButtons } from "../components/shared";
import { PhotoCard, PhotoOverlay } from "../components/gallery";
import type { GalleryImage } from "../types/gallery";

const CATEGORIES = [
  { id: "birds",     label: "Birds"     },
  { id: "wildlife",  label: "Wildlife"  },
  { id: "landscape", label: "Landscape" },
  { id: "people",    label: "People"    },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("birds");
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const orientation = useOrientation();
  const images = useGallery(activeCategory);

  function editedUrl(img: GalleryImage) {
    return getAssetPath(
      "gallery",
      orientation === "portrait" ? img.editedPortrait : img.editedLandscape
    );
  }

  function originalUrl(img: GalleryImage) {
    return getAssetPath(
      "gallery",
      orientation === "portrait" ? img.originalPortrait : img.originalLandscape
    );
  }

  /** CSS aspect-ratio value appropriate for the current viewport orientation */
  function overlayAspectRatio(img: GalleryImage) {
    return orientation === "portrait" ? "4/5" : img.aspectRatio.replace("x", "/");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-20 pb-16">
      {/* Filter row */}
      <div className="flex justify-center px-4 mb-10">
        <FilterButtons
          items={CATEGORIES}
          activeId={activeCategory}
          onChange={(id) => setActiveCategory(id)}
        />
      </div>

      {/* Photo grid
          Desktop (sm+): 3 cols · 5% outer margin · 2.5vw gap
          Mobile:        2 cols · 6% outer margin · 4vw gap
          overflow-hidden on wrapper prevents scaled cards from bleeding past outer margin */}
      <div className="overflow-hidden">
        <div className="mx-[6%] sm:mx-[5%] grid grid-cols-2 sm:grid-cols-3 gap-[4vw] sm:gap-[2.5vw]">
          {images.map((img) => (
            <PhotoCard
              key={img.id}
              image={img}
              imageUrl={editedUrl(img)}
              onOpen={() => setSelected(img)}
            />
          ))}
        </div>
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {selected && (
          <PhotoOverlay
            image={selected}
            editedUrl={editedUrl(selected)}
            originalUrl={originalUrl(selected)}
            aspectRatio={overlayAspectRatio(selected)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
