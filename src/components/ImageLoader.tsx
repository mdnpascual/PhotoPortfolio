import { useState, useEffect } from "react";
import { useOrientation } from "../hooks/useOrientation";
import { useLazyLoad } from "../hooks/useLazyLoad";
import LoadingSpinner from "./LoadingSpinner";
import ErrorIcon from "./ErrorIcon";

type LoadStatus = "idle" | "loading" | "loaded" | "error";

interface ImageLoaderProps {
  landscapeSrc: string;
  portraitSrc: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "16/9" or "4/5" */
  aspectRatio: string;
  /** Skip lazy loading — use for hero / above-the-fold images */
  eager?: boolean;
  className?: string;
}

export default function ImageLoader({
  landscapeSrc,
  portraitSrc,
  alt,
  aspectRatio,
  eager = false,
  className = "",
}: ImageLoaderProps) {
  const orientation = useOrientation();
  const src = orientation === "portrait" ? portraitSrc : landscapeSrc;
  const { ref, isVisible } = useLazyLoad(eager);
  const [status, setStatus] = useState<LoadStatus>("idle");

  // Start (or restart) loading whenever the image becomes visible or src changes
  useEffect(() => {
    if (isVisible) setStatus("loading");
  }, [isVisible, src]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <ErrorIcon />}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => {
            console.error(`[ImageLoader] Failed to load: ${src}`);
            setStatus("error");
          }}
        />
      )}
    </div>
  );
}
