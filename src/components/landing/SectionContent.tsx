import { motion } from "framer-motion";
import CTAButton from "../shared/CTAButton";
import type { LandingSection } from "../../types/landing";

interface SectionContentProps {
  section: LandingSection;
  isActive: boolean;
  isHero: boolean;
}

const block = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionContent({ section, isActive, isHero }: SectionContentProps) {
  return (
    <div className="absolute inset-0 flex items-end sm:items-center">
      <div className="px-8 pb-20 sm:pb-0 sm:px-16 max-w-2xl">
        <motion.div
          variants={block}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isHero ? (
            <h1 className="text-5xl sm:text-7xl font-light text-white tracking-wider mb-3">
              {section.title}
            </h1>
          ) : (
            <h2 className="text-4xl sm:text-6xl font-light text-white tracking-wider mb-3">
              {section.title}
            </h2>
          )}
          <p className="text-base sm:text-xl text-white/75 mb-8 tracking-wide font-light">
            {section.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={block}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <CTAButton label={section.cta} href={section.route} />
        </motion.div>
      </div>
    </div>
  );
}
