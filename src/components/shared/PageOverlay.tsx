import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

// Wrap with AnimatePresence in the parent to get the exit animation.
export default function PageOverlay({ onClose, children }: PageOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Stop click propagation so clicking content doesn't close the overlay */}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
