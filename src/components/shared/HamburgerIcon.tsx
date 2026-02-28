import { motion } from "framer-motion";

interface HamburgerIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {/* Container sized to fit 3 bars: 2px × 3 + 8px gap × 2 = 22px tall */}
      <div className="relative w-6 h-[22px]">
        <motion.span
          animate={{ y: isOpen ? 10 : 0, rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-full h-0.5 bg-white origin-center"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white"
        />
        <motion.span
          animate={{ y: isOpen ? -10 : 0, rotate: isOpen ? -45 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-center"
        />
      </div>
    </button>
  );
}
