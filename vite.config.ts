import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/PhotoPortfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react:    ["react", "react-dom"],
          router:   ["react-router-dom"],
          motion:   ["framer-motion"],
          gsap:     ["gsap"],
          lenis:    ["lenis"],
          carousel: ["embla-carousel-react"],
          compare:  ["react-compare-slider"],
        },
      },
    },
  },
});