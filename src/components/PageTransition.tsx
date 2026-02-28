import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PAGE_TRANSITION_DURATION } from "../config/constants";

const duration = PAGE_TRANSITION_DURATION / 1000;

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
