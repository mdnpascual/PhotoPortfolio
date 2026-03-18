import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { HOLD_THRESHOLD } from "../../config/constants";
import type { GalleryImage } from "../../types/gallery";

interface PhotoOverlayProps {
  image: GalleryImage;
  editedUrl: string;
  originalUrl: string;
  /** CSS aspect-ratio value, e.g. "3/2" or "4/5" */
  aspectRatio: string;
  onClose: () => void;
}

export default function PhotoOverlay({
  image,
  editedUrl,
  originalUrl,
  aspectRatio,
  onClose,
}: PhotoOverlayProps) {
  const [sliderEnabled, setSliderEnabled] = useState(true);
  const [showingOriginal, setShowingOriginal] = useState(false);

  // Constrain width so image height never exceeds (100vh - 120px), preventing
  // controls from being clipped above the viewport on large / landscape screens.
  const [arW, arH] = aspectRatio.split("/").map(Number);
  const arValue = arW / arH;
  const contentWidth = `min(80vw, calc((100vh - 120px) * ${arValue}))`;

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasHeldRef = useRef(false);

  function onPressStart() {
    wasHeldRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      wasHeldRef.current = true;
      setShowingOriginal(true);
    }, HOLD_THRESHOLD);
  }

  /** Mouse up / touch end — distinguish hold vs click */
  function onPressRelease() {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (wasHeldRef.current) {
      // Was held — stop showing original
      setShowingOriginal(false);
      wasHeldRef.current = false;
    } else {
      // Was a click (<HOLD_THRESHOLD ms) — disable slider + toggle
      setSliderEnabled(false);
    }
  }

  /** Mouse leave / touch cancel — cancel without side effects */
  function onPressCancel() {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (wasHeldRef.current) {
      setShowingOriginal(false);
      wasHeldRef.current = false;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button — top-right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close overlay"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>

      {/* Content area — stop click propagation so overlay doesn't close */}
      <div
        style={{ width: contentWidth }}
        className="flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls above image */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <button
            onMouseDown={onPressStart}
            onMouseUp={onPressRelease}
            onMouseLeave={onPressCancel}
            onTouchStart={onPressStart}
            onTouchEnd={onPressRelease}
            onTouchCancel={onPressCancel}
            className="px-4 py-2 border border-white/40 text-white text-sm hover:border-white transition-colors select-none"
          >
            Hold for Original
          </button>

          <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer select-none hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={sliderEnabled}
              onChange={(e) => setSliderEnabled(e.target.checked)}
              className="accent-white w-4 h-4 cursor-pointer"
            />
            Use Image Comparison Slider
          </label>
        </div>

        {/* Image / slider area */}
        <div style={{ aspectRatio, width: "100%", position: "relative", overflow: "hidden" }}>
          {sliderEnabled ? (
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={originalUrl} alt={`${image.title} — original`} />}
              itemTwo={<ReactCompareSliderImage src={editedUrl} alt={`${image.title} — edited`} />}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          ) : (
            <img
              src={editedUrl}
              alt={image.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Showing-original overlay (during button hold) */}
          {showingOriginal && (
            <div className="absolute inset-0 z-10">
              <img
                src={originalUrl}
                alt={`${image.title} — original`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Before / After labels — only relevant when slider is active */}
        {sliderEnabled && !showingOriginal && (
          <div className="flex justify-between mt-2">
            <span className="text-white/50 text-xs tracking-widest uppercase">Before</span>
            <span className="text-white/50 text-xs tracking-widest uppercase">After</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
