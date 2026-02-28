import { useRef, useState, useEffect } from "react";
import { LAZY_LOAD_THRESHOLD } from "../config/constants";

export function useLazyLoad(eager = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${LAZY_LOAD_THRESHOLD}px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return { ref, isVisible };
}
