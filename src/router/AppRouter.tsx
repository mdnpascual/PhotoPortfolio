import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop          from "../components/ScrollToTop";
import PageTransition       from "../components/PageTransition";
import LandingPage          from "../pages/LandingPage";
import GalleryPage          from "../pages/GalleryPage";
import TechniquesPage       from "../pages/TechniquesPage";
import PostProcessingPage   from "../pages/PostProcessingPage";
import GearPage             from "../pages/GearPage";
import AboutPage            from "../pages/AboutPage";
import ContactPage          from "../pages/ContactPage";

const PAGE_TITLES: Record<string, string> = {
  "/":                "Photography Portfolio",
  "/gallery":         "Gallery | Photography Portfolio",
  "/techniques":      "Techniques | Photography Portfolio",
  "/post-processing": "Post Processing | Photography Portfolio",
  "/gear":            "Gear | Photography Portfolio",
  "/about":           "About | Photography Portfolio",
  "/contact":         "Contact | Photography Portfolio",
};

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? "Photography Portfolio";
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/gallery"         element={<PageTransition><GalleryPage /></PageTransition>} />
          <Route path="/techniques"      element={<PageTransition><TechniquesPage /></PageTransition>} />
          <Route path="/post-processing" element={<PageTransition><PostProcessingPage /></PageTransition>} />
          <Route path="/gear"            element={<PageTransition><GearPage /></PageTransition>} />
          <Route path="/about"           element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact"         element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="*"                element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
