import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop             from "../components/ScrollToTop";
import PageTransition          from "../components/PageTransition";
import { PageErrorBoundary }   from "../components/error";
import { HamburgerIcon, Backdrop } from "../components/shared";
import { NavigationDrawer }    from "../components/navigation";
import LandingPage             from "../pages/LandingPage";
import GalleryPage             from "../pages/GalleryPage";
import TechniquesPage          from "../pages/TechniquesPage";
import PostProcessingPage      from "../pages/PostProcessingPage";
import GearPage                from "../pages/GearPage";
import AboutPage               from "../pages/AboutPage";
import ContactPage             from "../pages/ContactPage";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? "Photography Portfolio";
  }, [location.pathname]);

  // Close drawer on route change (safety net for external navigation)
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />

      {/* Hamburger — always rendered above everything */}
      <HamburgerIcon
        isOpen={isDrawerOpen}
        onClick={() => setIsDrawerOpen((prev) => !prev)}
      />

      {/* Backdrop — fades in/out behind the drawer */}
      <AnimatePresence>
        {isDrawerOpen && <Backdrop onClose={() => setIsDrawerOpen(false)} />}
      </AnimatePresence>

      {/* Navigation Drawer — slides in/out from left */}
      <AnimatePresence>
        {isDrawerOpen && <NavigationDrawer onClose={() => setIsDrawerOpen(false)} />}
      </AnimatePresence>

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                element={<PageTransition><PageErrorBoundary><LandingPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/gallery"         element={<PageTransition><PageErrorBoundary><GalleryPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/techniques"      element={<PageTransition><PageErrorBoundary><TechniquesPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/post-processing" element={<PageTransition><PageErrorBoundary><PostProcessingPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/gear"            element={<PageTransition><PageErrorBoundary><GearPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/about"           element={<PageTransition><PageErrorBoundary><AboutPage /></PageErrorBoundary></PageTransition>} />
          <Route path="/contact"         element={<PageTransition><PageErrorBoundary><ContactPage /></PageErrorBoundary></PageTransition>} />
          <Route path="*"                element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
