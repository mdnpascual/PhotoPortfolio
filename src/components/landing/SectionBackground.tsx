interface SectionBackgroundProps {
  imageUrl: string;
  /** Ref attached to the parallax wrapper — LandingPage applies translateY directly */
  bgRef: (el: HTMLDivElement | null) => void;
  /** Ref attached to the image element — LandingPage applies scale directly */
  scaleRef: (el: HTMLDivElement | null) => void;
}

export default function SectionBackground({ imageUrl, bgRef, scaleRef }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Parallax wrapper — no CSS transition, updated every rAF frame */}
      <div ref={bgRef} className="absolute inset-0">
        {/* Image element — slow scale transition for zoom-in effect on activation */}
        <div
          ref={scaleRef}
          className="absolute bg-cover bg-center"
          style={{
            inset: "-12%",
            backgroundImage: `url(${imageUrl})`,
            transform: "scale(1.05)",
            transition: "transform 0.8s ease-out",
          }}
        />
      </div>
      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
    </div>
  );
}
