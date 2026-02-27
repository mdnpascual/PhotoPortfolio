import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage       from "../pages/LandingPage";
import GalleryPage       from "../pages/GalleryPage";
import TechniquesPage    from "../pages/TechniquesPage";
import PostProcessingPage from "../pages/PostProcessingPage";
import GearPage          from "../pages/GearPage";
import AboutPage         from "../pages/AboutPage";
import ContactPage       from "../pages/ContactPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"                index element={<LandingPage />} />
      <Route path="/gallery"         element={<GalleryPage />} />
      <Route path="/techniques"      element={<TechniquesPage />} />
      <Route path="/post-processing" element={<PostProcessingPage />} />
      <Route path="/gear"            element={<GearPage />} />
      <Route path="/about"           element={<AboutPage />} />
      <Route path="/contact"         element={<ContactPage />} />
      <Route path="*"                element={<Navigate to="/" replace />} />
    </Routes>
  );
}