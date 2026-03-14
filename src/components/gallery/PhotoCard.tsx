import { useState } from "react";
import { motion } from "framer-motion";
import type { GalleryImage } from "../../types/gallery";

interface PhotoCardProps {
  image: GalleryImage;
  imageUrl: string;
  onOpen: () => void;
}

export default function PhotoCard({ image, imageUrl, onOpen }: PhotoCardProps) {
  const [hovered, setHovered] = useState(false);
  const aspectRatio = image.aspectRatio.replace("x", "/");

  return (
    <motion.div
      animate={{ scale: hovered ? 1.15 : 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      className="relative cursor-pointer"
      style={{ zIndex: hovered ? 10 : 0 }}
    >
      <div style={{ aspectRatio }}>
        <img
          src={imageUrl}
          alt={image.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
