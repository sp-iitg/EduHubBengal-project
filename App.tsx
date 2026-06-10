/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronDown,
  Navigation,
  School,
  ExternalLink,
  Users,
  Backpack,
  Send,
  Loader2,
  FileCheck2,
  Lock,
  MessageSquare,
  Sparkle
} from "lucide-react";
import SchoolLogo from "./components/SchoolLogo";
import NoticeBoard from "./components/NoticeBoard";
import Leaderboard from "./components/Leaderboard";
import AdmissionForm from "./components/AdmissionForm";
import VirtualGuide from "./components/VirtualGuide";
import AdminDashboard from "./components/AdminDashboard";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Contact Form parameters
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Quick stats lists
  const stats = [
    { value: "1957", label: "Established" },
    { value: "1500+", label: "Total Students" },
    { value: "45+", label: "Expert Faculty" },
    { value: "100%", label: "Board Pass Rate" },
  ];

  // Carousel images
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
      title: "Bagdah High School (H.S.)",
      desc: "Nurturing Knowledge, Honesty, and Self-Confidence since 1957.",
    },
    {
      url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200",
      title: "Vibrant Campus & Community",
      desc: "Comprehensive primary to higher certificate educational curriculum.",
    },
    {
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200",
      title: "Academic Excellence",
      desc: "Highest accolades in North 24 Parganas district board rankings.",
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle Contact Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactSubject || !contactMessage) {
      setContactError("Please fill in Name, Subject, and message details.");
      return;
    }

    try {
      setContactSubmitting(true);
      setContactError(null);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          subject: contactSubject,
          message: contactMessage,
        })
      });

      if (!res.ok) throw new Error("Could not sync message to school server");
      
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactSubject("");
      setContactMessage("");
    } catch (err: any) {
      setContactError(err.message || "An issue occurred. Try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans select-none antialiased bg-[#0e1322] text-slate-100 relative overflow-x-hidden">
      
      {/* Ambient glass background glow spots */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[550px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-5 right-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none z-0"></div>

      {/* 1. TOP HIGHLIGHT BAR */}
      <div className="bg-slate-950/60 backdrop-blur-md text-slate-300 text-[10px] md:text-xs py-2.5 px-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 z-30 shrink-0 relative">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Phone size={12} className="text-amber-400" />
            <span>+91 94348 xxxxx</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition">
            <Mail size={12} className="text-amber-400" />
            <span>info@bagdahhighschool.com</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition">
            <MapPin size={12} className="text-amber-400" />
            <span>Bagdah Block, North 24 Parganas, WB 743232</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Clock size={12} />
            <span>Secular Academic Hours: 10:30 AM - 4:30 PM</span>
          </span>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER & NAVIGATOR */}
      <header className="bg-slate-900/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">
          
          {/* Logo & school title block */}
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <SchoolLogo size={62} className="group-hover:scale-105 transition duration-300 filter drop-shadow-xl" />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-white font-sans tracking-tight leading-none group-hover:text-blue-400 transition">
                বাগদহ উচ্চ বিদ্যালয় (উঃ মাঃ)
              </h1>
              <h2 className="text-xs md:text-sm font-bold text-emerald-400 tracking-wide mt-1.5 leading-none font-sans">
                BAGDAH HIGH SCHOOL (H.S.)
              </h2>
              <span className="text-[9px] text-slate-450 block font-bold tracking-widest mt-2 uppercase">
                ESTD. 1957 • Index No: 114xxx
              </span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-bold text-slate-300">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-400 transition pb-1">Home</button>
            <button onClick={() => scrollToSection("about-section")} className="hover:text-blue-400 transition pb-1">About</button>
            <button onClick={() => scrollToSection("messages-statements")} className="hover:text-blue-400 transition pb-1">Messages</button>
            <button onClick={() => scrollToSection("notice-board-section")} className="hover:text-blue-400 transition pb-1">Notice Board</button>
            <button onClick={() => scrollToSection("student-growth-achievements")} className="hover:text-blue-400 transition pb-1">Achievements</button>
            <button onClick={() => scrollToSection("academic-rankings-section")} className="hover:text-blue-400 transition pb-1">Result Toppers</button>
            <button onClick={() => scrollToSection("school-admin-dashboard")} className="hover:text-[#3b82f6] transition flex items-center gap-1 bg-white/5 hover:bg-white/10 py-1.5 px-3 rounded-xl border border-white/10 text-slate-350">
              <Lock size={11} /> <span>Portal</span>
            </button>
          </nav>

          {/* Actions & Responsive triggers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("enrollment-section")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-550 transition-all cursor-pointer shadow-lg shadow-emerald-500/10 active:scale-95 border border-emerald-500/20"
            >
              <Backpack size={13} />
              <span>Apply Online</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Collapsible Mobile Overlay menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-900/90 backdrop-blur-2xl border-t border-white/10 overflow-hidden shrink-0 shadow-2xl relative"
            >
              <div className="py-5 px-5 flex flex-col gap-4 font-bold text-xs uppercase tracking-wider text-slate-300 border-b border-white/5">
                <button onClick={() => scrollToSection("home")} className="text-left py-1 hover:text-blue-400 transition">Home Page</button>
                <button onClick={() => scrollToSection("about-section")} className="text-left py-1 hover:text-blue-400 transition">About School</button>
                <button onClick={() => scrollToSection("messages-statements")} className="text-left py-1 hover:text-blue-400 transition">President & TIC message</button>
                <button onClick={() => scrollToSection("notice-board-section")} className="text-left py-1 hover:text-blue-400 transition">School Notice Board</button>
                <button onClick={() => scrollToSection("student-growth-achievements")} className="text-left py-1 hover:text-blue-400 transition">School Achievements</button>
                <button onClick={() => scrollToSection("academic-rankings-section")} className="text-left py-1 hover:text-blue-400 transition">Academic Toppers</button>
                <button onClick={() => scrollToSection("school-admin-dashboard")} className="text-left py-2 hover:text-[#3b82f6] flex items-center gap-1.5 border-t border-white/5 text-blue-400">
                  <Lock size={12} /> <span>Staff Office Portal</span>
                </button>
                <button
                  onClick={() => scrollToSection("enrollment-section")}
                  className="w-full text-center py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-555"
                >
                  Apply for Admission
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SLIDE SCREEN */}
      <section id="home" className="relative h-[480px] bg-[#0c1222] overflow-hidden shrink-0 select-none border-b border-white/5">
        {/* Dynamic slides background with fade animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${carouselImages[activeSlide].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/50 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Floating text content panel over sliding background */}
        <div className="absolute inset-x-0 bottom-0 top-0 max-w-7xl mx-auto px-4 md:px-6 flex items-center z-10">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-[10px] text-amber-400 font-bold uppercase mb-5 tracking-widest animate-pulse">
              <Sparkles size={11} />
              <span>Admitting session 2026</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              {carouselImages[activeSlide].title}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-4 max-w-xl leading-relaxed whitespace-pre-line font-medium">
              {carouselImages[activeSlide].desc}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={() => scrollToSection("notice-board-section")}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-500/10 transition-all active:scale-95 text-xs md:text-xs uppercase tracking-wider border border-blue-400/30"
              >
                Notice Board Updates
              </button>
              <button
                onClick={() => scrollToSection("about-section")}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all text-xs md:text-xs uppercase tracking-wider"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Carousel indicators dots at bottom */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-20">
          {carouselImages.map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer border border-white/20 transition-all ${
                activeSlide === i ? "bg-amber-400 w-5" : "bg-white/10"
              }`}
            ></span>
          ))}
        </div>
      </section>

      {/* 4. KEY METRICS COUNT banner */}
      <section className="bg-white/5 backdrop-blur-md border-y border-white/15 relative shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
          {stats.map((st, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-blue-450 tracking-tight">
                {st.value}
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTAINER CONTENT BODY */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-12 space-y-16 relative z-10">
        
        {/* 5. CORE ABOUT SCHOOL BANNER ROW */}
        <section id="about-section" className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex text-emerald-400 font-extrabold tracking-widest text-[10px] uppercase bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/15">
              Academic Legacy
            </span>
            <h2 className="text-2xl md:text-3.5xl font-extrabold text-white tracking-tight">
              Welcome to Bagdah High School (H.S.)
            </h2>
            <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
            
            {/* Translated/Extracted description cell */}
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-justify whitespace-pre-line font-medium">
              Bagdah High School is a proud part of Bagdah Block, North 24 Parganas, and has been guiding students for many years. Known for its strong academic foundation, dedicated teachers, friendly environment, and robust learning culture, it's a place where every student has the opportunity to grow, dream, and succeed. Here, education is not just about books – it's about building character and preparing for a bright future.
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-justify font-medium">
              Established in 1957, our institution has stood as a crown of excellence in education in West Bengal. Through academic disciplines, character-building programs, extracurricular achievements, and dedicated sports coaching, we raise the future champions, leaders, and scientists of our great nation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck2 className="text-emerald-450" size={16} />
                <span>Modern Science Lab Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="text-emerald-450" size={16} />
                <span>Rich Academic Libraries</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="text-emerald-440" size={16} />
                <span>Experienced Teaching Guild</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="text-emerald-430" size={16} />
                <span>Spacious Sports Playground</span>
              </div>
            </div>
          </div>

          {/* Graphical placeholder mimicking aerial drone screenshot */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-emerald-450 rounded-2xl opacity-10 group-hover:opacity-20 blur-lg transition duration-300"></div>
            <div className="relative aspect-video sm:aspect-square bg-slate-800 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
                alt="School drone landscape representation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-white p-3.5 rounded-lg border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">Drone Aerial View</span>
                  <span className="text-xs font-semibold">Main school block and fields</span>
                </div>
                <Users size={16} className="text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. QUOTES MESSAGES FROM PRESIDENT & T.I.C. */}
        <section id="messages-statements" className="space-y-8">
          <div className="text-center">
            <span className="inline-flex text-blue-450 font-bold tracking-widest text-[10px] uppercase bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/20">
              School Administration Messages
            </span>
            <h2 className="text-xl md:text-2.5xl font-extrabold text-white mt-3 leading-tight">
              Values & Vision Statements
            </h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto mt-2.5 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* PRESIDENT CARD */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6.5 shadow-2xl flex flex-col md:flex-row gap-6 items-center md:items-start transition duration-300 hover:bg-white/10 hover:border-white/15">
              <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 overflow-hidden shrink-0 bg-slate-800 flex items-center justify-center shadow-lg">
                <div className="text-slate-300 font-bold uppercase text-xl">PS</div>
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                  President's Address
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">Mr. Paritosh Saha</h3>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— President, Governing Body</h4>
                
                {/* Quotes in Bengali as displayed in screenshots */}
                <p className="text-xs text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 italic leading-relaxed text-justify mt-2 font-medium">
                  "বাগদা হাই স্কুল আমাদের এলাকার গর্ব। প্রজন্মের পর প্রজন্ম এই প্রতিষ্ঠান জ্ঞান, নীতি ও মানবতার চেতনা ছড়িয়ে দিচ্ছে। আমি বিশ্বাস করি, এই বিদ্যালয় ভবিষ্যতেও আরও বহু মেধাবী ও সৎ নাগরিক গড়ে তুলবে।"
                </p>
                <p className="text-[10px] text-slate-400 leading-relaxed text-justify font-semibold">
                  *“Bagdah High School is the ultimate pride of our block. Over generations, this institution has continuously dispersed rays of knowledge, values, and human values. I believe, in coming times as well, this school will breed dozens of bright and honest citizens.”*
                </p>
              </div>
            </div>

            {/* TEACHER IN CHARGE CARD */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6.5 shadow-2xl flex flex-col md:flex-row gap-6 items-center md:items-start transition duration-300 hover:bg-white/10 hover:border-white/15">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 overflow-hidden shrink-0 bg-slate-800 flex items-center justify-center shadow-lg">
                <div className="text-slate-300 font-bold uppercase text-xl">SB</div>
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-emerald-500/25 px-2.5 py-1 rounded border border-emerald-400/20">
                  T.I.C's Message
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">Mr. Sanjit Biswas</h3>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— Teacher-In-Charge (T.I.C)</h4>

                {/* Quotes details */}
                <p className="text-xs text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 italic leading-relaxed text-justify mt-2 font-medium">
                  "আমরা বিশ্বাস করি শিক্ষা শুধু বইয়ের মধ্যে সীমাবদ্ধ নয়, বরং তা মানুষের চরিত্র ও মূল্যবোধ গঠনের মাধ্যম। আমাদের লক্ষ্য প্রতিটি ছাত্রছাত্রীকে জ্ঞান, সততা ও আত্মবিশ্বাসে সমৃদ্ধ করে ভবিষ্যতের জন্য প্রস্তুত করা।"
                </p>
                <p className="text-[10px] text-slate-400 leading-relaxed text-justify font-semibold">
                  *“We believe that true education does not remain restricted only within textbooks, but it constructs a person's character and values. Our target is to enrich every single student with pure wisdom, honesty, and self-confidence, making them completely ready for the future.”*
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 7. SCHOOL NOTICES WRAPPER PANEL */}
        <section className="scroll-mt-24">
          <NoticeBoard adminPass="admin1957" />
        </section>

        {/* 8. OUR ACHIEVEMENTS CARD SCRAP */}
        <section id="student-growth-achievements" className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <span className="inline-flex text-emerald-400 font-bold tracking-widest text-[10px] uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              Institutional Honors
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-3 tracking-tight">
              Our Achievements
            </h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto mt-2.5 rounded-full"></div>
          </div>

          {/* Checklist of Bengali school honors shown in screenshots */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 text-xs md:text-sm font-semibold text-slate-350 leading-relaxed">
            
            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Government Honor 2023</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  উত্তর ২৪ পরগণা জেলার মধ্যে 'Best Performance in taking Initiatives on Eradication of Social Evils' এর জন্য এই বিদ্যালয় ২০২৩ সালে বিশেষ সরকারী পুরস্কারে ভূষিত হয়েছে।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *District First Award for best social campaign implementations inside 24 Parganas block in 2023.*
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Academic Scholarships</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  সরকারী বৃত্তি পরীক্ষাগুলিতে (NMMSE, VSO) প্রতিবছরই এই বিদ্যালয়ের ছাত্র-ছাত্রীরা উল্লেখ্যযোগ্য সংখ্যায় সফল হয়ে বৃত্তি লাভ করছে।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *Our students score high honors and merit scholarships in state scholarship exams (NMMSE, VSO) yearly.*
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Performance Benchmarks</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  NAS ও SAS তে এই বিদ্যালয়ের ছাত্র-ছাত্রীদের কৃতিত্বের পরিসংখ্যান বিশেষভাবে উল্লেখযোগ্য।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *Superb records in National Achievement Survey (NAS) and State Achievement Survey (SAS) matrices.*
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Kanyashree Prakalpa</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  ২০১৬ থেকে ২০২৪ প্রতি বছর কন্যাশ্রী প্রকল্প রূপায়নে এই বিদ্যালয় বাগদা ব্লকে অতি গুরুত্বপূর্ণ ভূমিকা পালন করেছে।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *Key contributor in successfully implementing Girls Kanyashree Welfare policies in Bagdah Block from 2016 to 2024.*
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Clean Classrooms Standard</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  ২০১৮ সালে এই বিদ্যালয় নির্মল বিদ্যালয় পুরস্কারে ভূষিত হয়েছে।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *Honored with the prestigious Clean School (Nirmal Vidyalaya Puraskar) in 24 Parganas district in 2018.*
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-start p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:shadow-lg transition">
              <span className="flex-shrink-0 inline-flex p-1.5 bg-emerald-600 text-white rounded-lg mt-0.5 shadow-sm border border-emerald-400/20">
                <Award size={14} />
              </span>
              <div>
                <span className="text-emerald-400 font-extrabold text-xs block uppercase mb-1">Co-Curricular Triumphs</span>
                <span className="text-slate-200 block mb-1 font-medium text-xs leading-relaxed">
                  কেন্দ্র ও রাজ্য সরকারের বিবিধ দপ্তরের পক্ষ থেকে আয়োজিত প্রতিযোগিতায় বিদ্যালয়ের ছাত্রছাত্রী ধারাবাহিক ভাবে বিশেষ কৃতিত্বের স্বাক্ষর রেখে চলেছে।
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  *Students consistently achieve accolades in diverse sports & arts projects run by state & central ministries.*
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 9. THE TOPPERS COMPONENT INJECT */}
        <section>
          <Leaderboard />
        </section>

        {/* 10. ADMISSIONS ENROLL AND GEO MAPS VISIT GRID */}
        <section className="grid lg:grid-cols-2 gap-8 items-start scroll-mt-24">
          
          {/* Enroll Inquiry form */}
          <AdmissionForm />

          {/* Geo location visual panel */}
          <div id="visiting-section" className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-[#0f172a]/30 text-white p-5 md:p-6 border-b border-white/5">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <MapPin size={18} className="text-amber-450" />
                <span>Visit Our School Campus</span>
              </h3>
              <p className="text-xs text-slate-350 mt-1">Check location directions and stop by during visit hours.</p>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              
              <div className="w-full bg-slate-900/40 rounded-xl overflow-hidden shadow-inner border border-white/15 h-[220px] map-container">
                {/* Standard Free Maps Iframe representing North 24 Parganas, India */}
                <iframe
                  title="Bagdah High School Location Directions"
                  src="https://maps.google.com/maps?q=Bagdah%20High%20School,%20Bagdah,%20North%2024%20Parganas,%20West%20Bengal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Coordinator text Details of maps */}
              <div className="mt-5 space-y-3.5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                <p>
                  <b>Address:</b> Bagdah High School (H.S.), Bagdah East Circle, Bagdah Block, North 24 Parganas, West Bengal, Postal PIN 743232.
                </p>
                <p>
                  <b>By Bus/Train:</b> Buses are available frequently from Bongaon Station / Bongaon Bus Terminus to Bagdah Block. The school is centrally located near the main block bus station.
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://maps.google.com/maps?q=Bagdah%20High%20School,%20Bagdah,%20North%2024%20Parganas"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    <span>View in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 11. GENERAL CONTACT US MESSENGER */}
        <section id="contact-panel" className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-6 sm:p-8">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Contact School Desk</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">Have general feedback or an inquiry? Send a secure dispatch to our office clerks.</p>
            <div className="w-10 h-0.5 bg-amber-400 mx-auto mt-2.5 rounded-full"></div>
          </div>

          {contactSuccess ? (
            <div className="text-center py-8">
              <span className="inline-flex p-3 bg-emerald-500/10 rounded-full text-emerald-400 mb-3 border border-emerald-400/20">
                <FileCheck2 size={36} />
              </span>
              <h4 className="font-bold text-white">Message Delivered</h4>
              <p className="text-xs text-slate-300 mt-1.5 max-w-sm mx-auto leading-relaxed">Your enquiry message has successfuly synchronized in the teacher's administrative portal inbox registers. Thank you!</p>
              <button
                onClick={() => setContactSuccess(false)}
                className="mt-5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
              {contactError && (
                <div className="sm:col-span-2 text-xs p-2.5 bg-red-955/20 text-red-400 border border-red-500/20 rounded-lg">
                  {contactError}
                </div>
              )}
              
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1 pointer-events-none" htmlFor="contact-sender-name">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  required
                  placeholder="name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 outline-none focus:bg-white/10 focus:border-blue-400/40 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1 pointer-events-none" htmlFor="contact-sender-email">
                  Email Address
                </label>
                <input
                  id="contact-sender-email"
                  type="email"
                  placeholder="contact@domain.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 outline-none focus:bg-white/10 focus:border-blue-400/40 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1 pointer-events-none" htmlFor="contact-sender-phone">
                  Phone Number
                </label>
                <input
                  id="contact-sender-phone"
                  type="tel"
                  placeholder="Mobile 10-digit number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 outline-none focus:bg-white/10 focus:border-blue-400/40 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1 pointer-events-none" htmlFor="contact-sender-subject">
                  Inquiry Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-sender-subject"
                  type="text"
                  required
                  placeholder="Subject of message"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 outline-none focus:bg-white/10 focus:border-blue-400/40 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 mb-1 pointer-events-none" htmlFor="contact-sender-message">
                  Message Body <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-sender-message"
                  required
                  rows={4}
                  placeholder="Type details description..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 outline-none focus:bg-white/10 focus:border-blue-400/40 transition"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-xl shadow-blue-500/10 border border-blue-400/30 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  {contactSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      <span>Submitting Message Database...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Transmit Dispatch Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* 12. STAFF PORTAL / WORKSPACE */}
        <section className="scroll-mt-24">
          <AdminDashboard authorized={adminAuthorized} onAdminAuthChange={setAdminAuthorized} />
        </section>

      </main>

      {/* 13. COMPREHENSIVE FOOTER STRUCTURE */}
      <footer className="bg-[#0a0f1d] text-slate-400 select-none pb-8 pt-12 border-t border-white/10 shrink-0 text-xs leading-relaxed font-sans relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-white/5">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <SchoolLogo size={52} className="filter drop-shadow-xl" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide leading-tight">বাগদহ উচ্চ বিদ্যালয় (উঃ মাঃ)</h4>
                <h5 className="text-[11px] text-amber-400 font-bold tracking-tight">BAGDAH HIGH SCHOOL (H.S.)</h5>
              </div>
            </div>
            <p className="text-slate-300 text-justify">
              Established decades ago in 1957, Bagdah High School (H.S.) has stood robust as a crown of academic integrity, grooming disciplined, highly capable and talented children in North 24 Parganas, West Bengal.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>📍 Bagdah East Circle, Bagdah Block, North 24 Parganas, WB.</p>
              <p>⚡ School Index No: 114xxx • H.S. Code: 114xxx</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
              Important Links
            </h4>
            <ul className="space-y-1 text-slate-300 font-medium">
              <li>
                <button onClick={() => scrollToSection("home")} className="hover:text-amber-400 transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about-section")} className="hover:text-amber-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("messages-statements")} className="hover:text-amber-400 transition-colors">School History & Messages</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("notice-board-section")} className="hover:text-amber-400 transition-colors">Notice Board List</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("enrollment-section")} className="hover:text-amber-400 transition-colors">Admission Enrollment</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("school-admin-dashboard")} className="hover:text-amber-400 transition-colors">Staff & Teacher Portal</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Postal Creds */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-l-2 border-amber-400 pl-2">
              Institution Address
            </h4>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2.5">
              <div className="flex gap-2.5 items-start">
                <MapPin className="text-amber-400 shrink-0 mt-0.5" size={16} />
                <p className="text-slate-300 leading-relaxed text-xs">
                  <b>Bagdah High School (H.S.)</b> <br />
                  Bagdah East Circle, Bagdah Block <br />
                  North 24 Parganas, West Bengal, Postal PIN 743232.
                </p>
              </div>
              <p className="text-slate-400 text-[11px] border-t border-white/5 pt-2.5 italic">
                Office desks are closed on public vacations and sundays. Admission inquiries can be digitally logged online 24/7.
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic copyrights and credentials */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-semibold select-none">
          <p>© 2025 Bagdah High School (H.S.). All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Developed by</span>
            <span className="text-slate-300 font-bold hover:text-amber-400 transition cursor-pointer">BS Digital Care</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Disclaimer Statement</span>
          </div>
        </div>
      </footer>

      {/* 14. SMART FLOATING BILINGUAL VIRTUAL COMPANION */}
      <VirtualGuide />

    </div>
  );
}
