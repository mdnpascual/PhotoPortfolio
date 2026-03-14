import type { LandingSection } from "../../types/landing";
import SectionBackground from "./SectionBackground";
import SectionContent from "./SectionContent";

interface ScrollSectionProps {
  section: LandingSection;
  imageUrl: string;
  isActive: boolean;
  isHero: boolean;
  bgRef: (el: HTMLDivElement | null) => void;
  scaleRef: (el: HTMLDivElement | null) => void;
}

export default function ScrollSection({
  section,
  imageUrl,
  isActive,
  isHero,
  bgRef,
  scaleRef,
}: ScrollSectionProps) {
  return (
    <>
      <SectionBackground imageUrl={imageUrl} bgRef={bgRef} scaleRef={scaleRef} />
      <SectionContent section={section} isActive={isActive} isHero={isHero} />
    </>
  );
}
