import { motion } from "framer-motion";
import { BACKDROP_ANIMATION_DURATION } from "../../config/constants";

const duration = BACKDROP_ANIMATION_DURATION / 1000;

interface BackdropProps {
  onClose: () => void;
}

// Wrap with AnimatePresence in the parent to get the exit animation.
export default function Backdrop({ onClose }: BackdropProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      className="fixed inset-0 bg-black/50 z-40"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
