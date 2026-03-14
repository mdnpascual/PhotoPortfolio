import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useLandingSections } from "../hooks/useLandingSections";
import { useOrientation } from "../hooks/useOrientation";
import { getAssetPath } from "../utils/assetPath";
import { preloadImages } from "../utils/imagePreloader";
import { PARALLAX_INTENSITY } from "../config/constants";
import { ScrollSection } from "../components/landing";

/**
 * Sections where scroll snaps to the start when the user stops scrolling nearby.
 * These mark the beginning of each major content category.
 */
const SNAP_IDS = new Set([
  "birds",
  "focus-stacking",
  "post-processing",
  "gear",
  "about",
  "contact",
]);

export default function LandingPage() {
  const sections = useLandingSections();
  const orientation = useOrientation();

  // Refs for direct DOM manipulation — avoids React re-renders on every scroll frame
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scaleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  // React state — only for Framer Motion text/CTA animations (updates ~once per section change)
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload hero + next 2 sections immediately
  useEffect(() => {
    const urls = sections.slice(0, 3).map((s) =>
      getAssetPath("landing", orientation === "portrait" ? s.portrait : s.landscape)
    );
    preloadImages(urls);
  }, [sections, orientation]);

  // Apply scale animation when active section changes
  useEffect(() => {
    sections.forEach((_, i) => {
      const el = scaleRefs.current[i];
      if (!el) return;
      el.style.transform = i === activeIndex ? "scale(1.0)" : "scale(1.05)";
    });
  }, [activeIndex, sections]);

  // Lenis smooth scroll + rAF-driven section transforms
  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;
    let snapTimer: ReturnType<typeof setTimeout>;

    function updateTransforms() {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const total = sections.length;
      const rawIdx = scrollY / vh;
      const floorIdx = Math.floor(rawIdx);
      const progress = rawIdx - floorIdx;

      for (let i = 0; i < total; i++) {
        const el = sectionRefs.current[i];
        const bg = bgRefs.current[i];

        // Horizontal wipe: each section lives in a 100vw slot
        let tx: number;
        if (i < floorIdx) {
          tx = -100;
        } else if (i === floorIdx) {
          tx = -progress * 100;
        } else if (i === floorIdx + 1) {
          tx = (1 - progress) * 100;
        } else {
          tx = 100;
        }

        if (el) el.style.transform = `translateX(${tx}%)`;

        // Vertical parallax on background (applied to bgRef, no CSS transition)
        if (bg) {
          let bgProgress: number;
          if (i === floorIdx || i === floorIdx + 1) {
            bgProgress = progress;
          } else {
            bgProgress = 0.5; // off-screen sections stay centred
          }
          const bgY = (0.5 - bgProgress) * PARALLAX_INTENSITY * 100;
          bg.style.transform = `translateY(${bgY}%)`;
        }
      }

      // Update active index only when it changes (avoids unnecessary re-renders)
      const newActive = Math.max(0, Math.min(total - 1, Math.round(rawIdx)));
      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndex(newActive);
      }
    }

    function loop(time: number) {
      lenis.raf(time);
      updateTransforms();
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    // Snap to snap-section boundaries when the user stops scrolling near one
    function onScroll() {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        const rawIdx = scrollY / vh;
        const nearestIdx = Math.max(
          0,
          Math.min(sections.length - 1, Math.round(rawIdx))
        );
        const section = sections[nearestIdx];
        if (section && SNAP_IDS.has(section.id)) {
          const targetY = nearestIdx * vh;
          if (Math.abs(scrollY - targetY) > 5) {
            lenis.scrollTo(targetY, { duration: 0.6 });
          }
        }
      }, 120);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(snapTimer);
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, [sections]);

  return (
    <div>
      {/* Fixed viewport — all sections render here, clipped during horizontal wipe */}
      <div className="fixed inset-0 overflow-hidden">
        {sections.map((section, i) => {
          const filename =
            orientation === "portrait" ? section.portrait : section.landscape;
          const imageUrl = getAssetPath("landing", filename);
          return (
            <div
              key={section.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
              style={{
                transform: i === 0 ? "translateX(0%)" : "translateX(100%)",
              }}
            >
              <ScrollSection
                section={section}
                imageUrl={imageUrl}
                isActive={activeIndex === i}
                isHero={i === 0}
                bgRef={(el) => {
                  bgRefs.current[i] = el;
                }}
                scaleRef={(el) => {
                  scaleRefs.current[i] = el;
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Scroll spacer — establishes document scroll height for Lenis */}
      <div
        style={{ height: `${sections.length * 100}vh` }}
        aria-hidden="true"
      />
    </div>
  );
}
