"use client";

import React, { useState, useEffect } from 'react';
import ParallaxStripSlider, { Slide } from '@/components/ui/parallax-strip-slider';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';
import { downloadResumePDF, downloadResumeMarkdown } from '../utils/pdfGenerator';
import { soundFX } from '../utils/audio';
import {
  FileText,
  Download,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Layers,
  ChevronRight,
  Code2,
  Trophy,
  Briefcase,
  Cpu,
  GraduationCap,
  X
} from 'lucide-react';

interface ParallaxPortfolioSiteProps {
  onOpenCopilot: () => void;
  onOpenAuth: () => void;
  onOpenTests: () => void;
  isAuthenticated?: boolean;
}

export const ParallaxPortfolioSite: React.FC<ParallaxPortfolioSiteProps> = ({
  onOpenCopilot,
  onOpenAuth,
  onOpenTests,
  isAuthenticated
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // High-resolution thematic backgrounds for each partition
  const slides: Slide[] = [
    // Partition 01: Profile / Systems & Vision
    {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      title: "Digvijay Ware",
      chapter: "Partition 01 // Identity",
      category: "B.Tech CSE • MIT-WPU Pune",
      subtitle: "Systems Engineer & Algorithmist (2024 – 2028)",
      description: PERSONAL_INFO.professionalSummary,
      tags: ["C++", "Python", "SQL", "Socket Programming", "DSA", "Computer Vision"],
      bullets: [
        "Undergraduate at MIT World Peace University, Pune, Maharashtra",
        "Focus on low-latency systems, socket architectures, and applied machine vision",
        "Active participant in national hackathons and competitive problem solving"
      ],
      actionText: "Download Resume PDF",
      onAction: () => {
        soundFX.playSuccess();
        downloadResumePDF();
      }
    },

    // Partition 02: Pulse – Real-Time Collaborative Platform
    {
      src: "/pulse_fatigue_tracker.jpg",
      title: "Pulse Platform",
      chapter: "Partition 02 // Flagship Project",
      category: "Concurrent Distributed Systems",
      subtitle: "Pulse – Real-Time Collaborative Platform (2026)",
      description: "Developed a real-time collaborative platform using C++ and socket programming for network-based communication and concurrent client interactions.",
      bullets: [
        "Engineered modular client-server communication components for efficient, low-latency real-time data exchange",
        "Implemented high-performance data structures for synchronized client state tracking",
        "Constructed connection-handling threads ensuring stable multi-client concurrency"
      ],
      tags: ["C++", "Data Structures", "Socket Programming", "Networking", "Concurrency"],
      githubUrl: "https://github.com/Digvijay-exe/Pulse"
    },

    // Partition 03: InkLite – Lightweight Text & Note Processing Engine
    {
      src: "/inklite_tablet_notes.jpg",
      title: "InkLite Engine",
      chapter: "Partition 03 // Core Architecture",
      category: "Text Processing & File I/O",
      subtitle: "InkLite – Lightweight Text & Note Engine (2026)",
      description: "Built a lightweight text and note processing engine using C++ and object-oriented design principles with custom buffer management.",
      bullets: [
        "Implemented efficient data structures and file I/O operations for creating, reading, modifying, and managing text data",
        "Engineered clean modular OOP abstractions with strict resource management",
        "Incorporated robust file streaming with deterministic error-handling"
      ],
      tags: ["C++", "Data Structures", "OOP", "File I/O", "Memory Management"],
      githubUrl: "https://github.com/Digvijay-exe/InkLite"
    },

    // Partition 04: Pipboy Assistant – AI-Powered Desktop Assistant
    {
      src: "/pipboy_assistant_bg.jpg",
      title: "Pipboy Assistant",
      chapter: "Partition 04 // Applied AI",
      category: "Desktop AI & Multi-Threading",
      subtitle: "Pipboy Assistant – AI Desktop Assistant (2026)",
      description: "Developed a Python-based desktop AI assistant featuring a retro-futuristic Tkinter GUI and real-time LLM-powered responses via Groq API.",
      bullets: [
        "Implemented threaded API interactions for responsive, non-blocking user experience",
        "Constructed an extensible architecture ready for future local model quantization and offline edge execution",
        "Integrated contextual prompt memory and real-time streaming desktop notifications"
      ],
      tags: ["Python", "Tkinter", "Groq API", "Threading", "LLM Inference"],
      githubUrl: "https://github.com/Digvijay-exe/Pipboy-Assistant"
    },

    // Partition 05: Smart India Hackathon & Competitions (Achievements)
    {
      src: "/hackathon_stage_award.jpg",
      title: "Hackathons & Honors",
      chapter: "Partition 05 // Competitive Achievements",
      category: "National Level Competitions",
      subtitle: "Smart India Hackathon • Adobe • Cummins College",
      description: "Recognized for algorithmic problem solving, rapid engineering execution, and creative technological solutions under strict hackathon deadlines.",
      bullets: [
        "Smart India Hackathon 2026: Certificate of Merit — MIT-WPU University Internal (Top 100 Teams, September 2026)",
        "Adobe University Hackathon: Participant — Tackling enterprise-scale creative software challenges",
        "Think & Code: MKSSS's Cummins College of Engineering for Women, Pune — Participant"
      ],
      tags: ["Smart India Hackathon", "Certificate of Merit", "Top 100", "Adobe Hackathon", "Think & Code"]
    },

    // Partition 06: Experience & Campus Leadership
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
      title: "Leadership & Impact",
      chapter: "Partition 06 // Professional Leadership",
      category: "Campus Ambassadorship & Outreach",
      subtitle: "SHEIN India & The Framed Wall (2026)",
      description: "Driving university outreach campaigns, engaging diverse student bodies, and representing national brand initiatives across campus communities.",
      bullets: [
        "Campus Ambassador — SHEIN India (Summer 2026, Pune): Promoted campus engagement initiatives and coordinated outreach activities across student communities",
        "Campus Ambassador — The Framed Wall (2026, Remote / Campus): Supported student outreach, managed campaign coordination, and drove brand awareness",
        "Demonstrated strong cross-functional communication, organizational logistics, and leadership"
      ],
      tags: ["SHEIN India", "The Framed Wall", "Outreach", "Leadership", "Event Coordination"]
    },

    // Partition 07: Technical Stack & Mastery
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
      title: "Technical Stack",
      chapter: "Partition 07 // Core Skills",
      category: "Systems, Algorithms & Relational Databases",
      subtitle: "C++, Python, SQL, DSA & Computer Vision",
      description: "Rigorous command of low-level systems programming, classical algorithm design, and structured relational data architectures.",
      bullets: [
        "Programming & Systems: C++, Python, SQL, OOP, File I/O, Socket Programming",
        "DSA: Trees, Graphs, Dynamic Programming, Sorting & Searching, KMP, Boyer–Moore pattern matching",
        "Database & Vision: MySQL, Relational Database Design, SQL Joins, Indexing, Stored Procedures, Triggers, Computer Vision"
      ],
      tags: ["C++", "Python", "SQL", "MySQL", "KMP Algorithm", "Boyer–Moore", "Computer Vision", "Linux/Unix", "Git", "LaTeX"]
    },

    // Partition 08: Verified Certifications & Official Resume
    {
      src: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2000&auto=format&fit=crop",
      title: "Official Resume",
      chapter: "Partition 08 // Verified Credentials",
      category: "Academic & Industry Certifications",
      subtitle: "Digvijay_Ware_Resume.pdf (Embedded Clickable Links)",
      description: "Direct access to Digvijay Madhav Ware's verified single-page LaTeX-standard resume with embedded clickable links for phone, email, LinkedIn, GitHub, and projects.",
      bullets: [
        "Elements of AI: University of Helsinki & MinnaLearn — 2 ECTS Credits, August 2025",
        "DBMS Course: Master Fundamentals: Scaler Topics — May 2026",
        "Computer Vision Essentials: Great Learning — August 2026",
        "AI Tools & ChatGPT Workshop: Be10x — July 2025"
      ],
      tags: ["PDF Download", "Clickable Links", "2 ECTS Credits", "Helsinki AI", "Scaler DBMS"],
      actionText: "Download Digvijay_Ware_Resume.pdf",
      onAction: () => {
        soundFX.playSuccess();
        downloadResumePDF();
      }
    },

    // Partition 09: Connect & Recruitment Direct Line
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
      title: "Direct Connect",
      chapter: "Partition 09 // Contact & Inquiries",
      category: "Pune, Maharashtra, India",
      subtitle: "Open for Software Engineering & Systems Internships",
      description: "Interested in technical discussions, C++ systems projects, or campus recruitment opportunities. Get in touch directly:",
      bullets: [
        `Email: ${PERSONAL_INFO.email}`,
        `Phone: ${PERSONAL_INFO.phone}`,
        "LinkedIn: linkedin.com/in/digvijay-ware-57a007330",
        "GitHub: github.com/Digvijay-exe"
      ],
      tags: ["Pune, MH", "MIT-WPU", "Available for Summer 2026/2027", "Fast Response"],
      actionText: "Launch AI Copilot",
      onAction: () => {
        soundFX.playOpen();
        onOpenCopilot();
      }
    }
  ];

  // Keyboard navigation listener (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDossierOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, isDossierOpen]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white font-sans">
      
      {/* 1. Floating Top Glass Navigation Bar */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-black/40 backdrop-blur-xl border-b border-white/10 select-none">
        
        {/* Brand & MIT-WPU Identity */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-semibold tracking-wider text-white uppercase flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Digvijay Madhav Ware
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/50">
              MIT-WPU Pune &bull; B.Tech CSE (2024–2028)
            </span>
          </div>
        </div>

        {/* Partition Quick Select Buttons (Desktop) */}
        <div className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFX.playClick();
                setActiveSlide(idx);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all duration-200 ${
                activeSlide === idx
                  ? 'bg-white text-black font-semibold shadow'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {idx + 1}. {s.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick PDF Download Button */}
          <button
            onClick={() => {
              soundFX.playSuccess();
              downloadResumePDF();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium transition-all shadow"
            title="Download Digvijay_Ware_Resume.pdf"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Resume PDF</span>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={() => {
              soundFX.playOpen();
              onOpenCopilot();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-mono font-medium transition-all shadow"
            title="Ask AI Copilot about Digvijay"
          >
            <Sparkles className="size-3.5" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {/* Complete Dossier Drawer Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsDossierOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-mono transition-all"
            title="View Full Resume Sheet Document"
          >
            <FileText className="size-3.5" />
            <span className="hidden lg:inline">Dossier</span>
          </button>

          {/* Mobile Chapters Menu Trigger */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="xl:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-mono"
            aria-label="Toggle Partitions Menu"
          >
            <Layers className="size-4" />
          </button>
        </div>
      </header>

      {/* Mobile Chapter Jump Drawer */}
      {isNavOpen && (
        <div className="fixed inset-x-0 top-14 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/15 p-4 xl:hidden shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">Jump to Partition</span>
            <button
              onClick={() => setIsNavOpen(false)}
              className="text-xs font-mono text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playClick();
                  setActiveSlide(idx);
                  setIsNavOpen(false);
                }}
                className={`p-2 rounded-lg text-left transition-all ${
                  activeSlide === idx
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] text-white/50">{s.chapter}</div>
                <div className="truncate font-medium">{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. The Core Full-Screen Parallax Strip Slider */}
      <div className="h-full w-full">
        <ParallaxStripSlider
          slides={slides}
          activeSlideIndex={activeSlide}
          onSlideChange={(newIdx) => setActiveSlide(newIdx)}
          stripCount={10}
          revealDuration={0.55}
          stripStagger={0.035}
          zoomDuration={0.9}
          zoomFrom={1.25}
          accentColor="#ffffff"
          backgroundColor="#050505"
          showProgressBar={true}
          showCounter={true}
          showControls={true}
        />
      </div>

      {/* 3. Bottom Partition Navigation Indicator Bar */}
      <footer className="fixed bottom-3 inset-x-0 z-30 pointer-events-none flex items-center justify-between px-6 sm:px-10">
        
        {/* Left: Direct Social Links */}
        <div className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/70">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <span>&bull;</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Linkedin className="size-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <span>&bull;</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Mail className="size-3.5" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </footer>

      {/* 4. Complete Dossier / Full Document Modal */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-950 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div>
                <h3 className="text-lg font-serif tracking-tight text-white flex items-center gap-2">
                  <FileText className="size-5 text-emerald-400" />
                  Digvijay Madhav Ware &ndash; Official Resume Dossier
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  Verbatim LaTeX single-page academic credentials &bull; MIT-WPU Pune
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadResumePDF()}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-mono flex items-center gap-1.5 shadow"
                >
                  <Download className="size-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Document Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm font-sans">
              
              {/* Personal Header */}
              <div className="text-center pb-4 border-b border-white/10">
                <h1 className="text-2xl font-serif font-bold text-white mb-1">
                  Digvijay Madhav Ware
                </h1>
                <p className="text-xs font-mono text-stone-400">
                  {PERSONAL_INFO.location} | {PERSONAL_INFO.phone} | {PERSONAL_INFO.email}
                </p>
                <p className="text-xs font-mono text-emerald-400 mt-1">
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                  {' | '}
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </p>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Professional Summary
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {PERSONAL_INFO.professionalSummary}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Education
                </h4>
                <div className="flex justify-between items-baseline text-xs sm:text-sm font-medium">
                  <span className="text-white">{PERSONAL_INFO.education.institution}</span>
                  <span className="text-stone-400 font-mono">{PERSONAL_INFO.education.location}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-stone-400 font-mono">
                  <span>{PERSONAL_INFO.education.degree}</span>
                  <span>{PERSONAL_INFO.education.period}</span>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Technical Skills
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">Programming:</span> <span className="text-stone-300">C++, Python, SQL</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">DSA:</span> <span className="text-stone-300">Trees, Graphs, DP, Sorting, Searching, KMP, Boyer–Moore</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">Database:</span> <span className="text-stone-300">MySQL, Relational Design, Joins, Indexing, Procedures, Triggers</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">AI & Computer Vision:</span> <span className="text-stone-300">AI Fundamentals, Computer Vision, AI Productivity Tools</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">Tools:</span> <span className="text-stone-300">Git, GitHub, VS Code, Linux/Unix, LaTeX</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="font-semibold text-white">Other:</span> <span className="text-stone-300">OOP, File I/O, Socket Programming</span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Projects
                </h4>
                <div className="space-y-4">
                  {PROJECTS.map((proj) => (
                    <div key={proj.id} className="border-l-2 border-emerald-400/40 pl-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-white text-sm">
                          {proj.title} &ndash; {proj.subtitle}
                        </span>
                        <span className="text-xs font-mono text-stone-400">{proj.year}</span>
                      </div>
                      <div className="text-xs font-mono text-emerald-400/90 mb-1">
                        {proj.tags.join(', ')}
                      </div>
                      <ul className="list-disc list-inside text-xs text-stone-300 space-y-1 mb-1.5">
                        {proj.bulletPoints.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                      >
                        <Github className="size-3" />
                        <span>{proj.githubUrl}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience & Leadership */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Experience & Leadership
                </h4>
                <div className="space-y-3">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-white/20 pl-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-white text-sm">
                          {exp.role} &ndash; {exp.company}
                        </span>
                        <span className="text-xs font-mono text-stone-400">{exp.period}</span>
                      </div>
                      <p className="text-xs font-mono text-stone-400 mb-1">{exp.location}</p>
                      <ul className="list-disc list-inside text-xs text-stone-300 space-y-1">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hackathons & Competitions */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Hackathons & Competitions
                </h4>
                <div className="space-y-1.5 text-xs text-stone-300">
                  {HACKATHONS.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">&bull;</span>
                      <span>
                        <strong className="text-white">{h.name}</strong> &ndash; {h.round} ({h.organizer})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
                  Course Certifications
                </h4>
                <div className="space-y-1.5 text-xs text-stone-300">
                  {CERTIFICATIONS.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">&bull;</span>
                      <span>
                        <strong className="text-white">{c.title}</strong> &ndash; {c.issuer} ({c.date})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>Digvijay_Ware_Resume.pdf</span>
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  downloadResumePDF();
                }}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
              >
                <Download className="size-3.5" />
                <span>Download Official PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
