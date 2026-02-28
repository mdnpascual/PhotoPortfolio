import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  animationDelay?: number; // ms, default 150
}

export default function CTAButton({
  label,
  onClick,
  href,
  animationDelay = 150,
}: CTAButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) onClick();
    if (href) navigate(href);
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay / 1000 }}
      onClick={handleClick}
      className="px-8 py-3 border border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
    >
      {label}
    </motion.button>
  );
}
