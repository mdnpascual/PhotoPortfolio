import { motion } from "framer-motion";
import { DRAWER_ANIMATION_DURATION } from "../../config/constants";
import MenuTree from "./MenuTree";

const duration = DRAWER_ANIMATION_DURATION / 1000;

interface NavigationDrawerProps {
  onClose: () => void;
}

// Wrap with AnimatePresence in the parent to get the exit animation.
export default function NavigationDrawer({ onClose }: NavigationDrawerProps) {
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-4/5 sm:w-1/3 bg-neutral-950 z-[45] overflow-y-auto"
    >
      <MenuTree onClose={onClose} />
    </motion.aside>
  );
}
