import { useState, useEffect } from "react";

type Orientation = "portrait" | "landscape";

function detect(): Orientation {
  return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
}

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(detect);

  useEffect(() => {
    function onResize() {
      setOrientation(detect());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return orientation;
}
