import { useState, useEffect } from "react";
import { AppView } from "./types";
import { Navigation } from "./components/Navigation";
import { HomeSection } from "./components/HomeSection";
import { CoursesSection } from "./components/CoursesSection";
import { MaterialsSection } from "./components/MaterialsSection";
import { AdminSection } from "./components/AdminSection";
import { BookOpen, HelpCircle, Mail, MapPin, Phone, MessageSquare, Trees } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");

  // Soft scroll to top-level viewport when view modifications happen
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-forest-dark flex flex-col justify-between selection:bg-forest-lichen selection:text-forest-dark" id="main-app-container">
      <div>
        {/* Navigation Section */}
        <Navigation currentView={currentView} onViewChange={setCurrentView} />

        {/* Dynamic Section Contents */}
        <main className="relative">
          {currentView === "home" && (
            <HomeSection onViewChange={setCurrentView} />
          )}

          {currentView === "courses" && (
            <CoursesSection />
          )}

          {currentView === "materials" && (
            <MaterialsSection />
          )}

          {currentView === "admin" && (
            <AdminSection />
          )}
        </main>
      </div>

      {/* Earthy Footer element */}
      <footer className="bg-forest-deep border-t border-forest-mid/50 py-12 px-6 mt-16 text-forest-sage" id="app-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trees className="w-5 h-5 text-forest-lichen" />
              <span className="font-serif font-bold text-lg text-earth-cream tracking-tight">EduHubBengal</span>
            </div>
            <p className="text-xs leading-relaxed text-forest-lichen/75">
              West Bengal's premium portal for logical JEE Physics, Chemistry, and Mathematics formulation. 
              Built on academic sincerity and clear geometric deduction.
            </p>
          </div>

          {/* Column 2: Centers of Excellence */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-earth-cream">Consultation Centers</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-forest-lichen shrink-0 mt-0.5" />
                <span>Salt Lake Sector V, Kolkata, WB</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-forest-lichen shrink-0 mt-0.5" />
                <span>Kalyani Main Road, Nadia, WB</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication Channels */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-earth-cream">Direct channels</h4>
            <ul className="text-xs space-y-2 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest-lichen" />
                <span>+91 33 2490 8271</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest-lichen" />
                <span>admissions@eduhubbengal.edu</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-earth-cream">Platform Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => setCurrentView("home")} 
                className="text-left hover:text-forest-lichen transition-colors cursor-pointer"
              >
                Philosophy
              </button>
              <button 
                onClick={() => setCurrentView("courses")} 
                className="text-left hover:text-forest-lichen transition-colors cursor-pointer"
              >
                Curriculum
              </button>
              <button 
                onClick={() => setCurrentView("materials")} 
                className="text-left hover:text-forest-lichen transition-colors cursor-pointer"
              >
                Lecture Notes
              </button>
              <button 
                onClick={() => setCurrentView("admin")} 
                className="text-left hover:text-forest-lichen transition-colors cursor-pointer"
              >
                Teacher Panel
              </button>
            </div>
          </div>
        </div>

        {/* Trad footnote */}
        <div className="max-w-7xl mx-auto border-t border-forest-mid/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <p>© 2026 EduHubBengal Academy. Designed honestly with offline-first local materials processing.</p>
          <p className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-forest-sage" />
            Empowering logical JEE journeys across Bengal
          </p>
        </div>
      </footer>
    </div>
  );
}
