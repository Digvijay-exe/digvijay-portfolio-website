import React from 'react';
import { PERSONAL_INFO, PROJECTS } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Github, Linkedin, Mail, Phone, Download, ArrowRight, Sparkles, GraduationCap, Code2, Database } from 'lucide-react';

interface HeroProps {
  onDownloadResume: () => void;
  onOpenCopilot: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDownloadResume,
  onOpenCopilot
}) => {
  return (
    <section id="about" className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Editorial Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimalist Sub-heading */}
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span className="w-2 h-2 rounded-full bg-[#a7c4b5]" />
              <span>3rd Year B.Tech CSE &bull; MIT World Peace University, Pune</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 dark:text-stone-100">
                Digvijay Madhav Ware
              </h1>
              <p className="text-lg sm:text-xl text-stone-500 dark:text-stone-400 font-light">
                Undergraduate engineer focused on C++, systems, and applied machine vision.
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal max-w-xl">
              {PERSONAL_INFO.professionalSummary}
            </p>

            {/* Minimalist Pastel Tags */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-[#a7c4b5]/20 dark:bg-[#a7c4b5]/15 text-[#324a3c] dark:text-[#a7c4b5]">
                C++ &amp; Socket Systems
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#d4c2fc]/20 dark:bg-[#d4c2fc]/15 text-[#4e3678] dark:text-[#d4c2fc]">
                KMP &amp; Boyer–Moore DSA
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#fcd5ce]/30 dark:bg-[#fcd5ce]/15 text-[#6c3b31] dark:text-[#fcd5ce]">
                MySQL Relational Design
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#faedcd]/40 dark:bg-[#faedcd]/15 text-[#5e4b25] dark:text-[#faedcd]">
                Computer Vision
              </span>
            </div>

            {/* Minimalist CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={() => soundFX.playClick()}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onDownloadResume();
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onOpenCopilot();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#d4c2fc]/15 hover:bg-[#d4c2fc]/25 text-[#4e3678] dark:text-[#d4c2fc] text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Interview Assistant powered by Gemini 3.1 Pro (High Thinking)"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            </div>

            {/* Quiet Contact Links */}
            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-stone-500 dark:text-stone-400 font-mono">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>+91-8779877704</span>
              </div>
            </div>

          </div>

          {/* Right: Minimalist Static Editorial Profile Card (No geometric core animation) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Academic Standing Card */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#a7c4b5]" />
                  <span>Academic Profile</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#a7c4b5]/20 text-[#3d5a49] dark:text-[#a7c4b5]">
                  2024 &ndash; 2028
                </span>
              </div>

              <div>
                <h3 className="text-base font-medium text-stone-900 dark:text-stone-100">
                  MIT World Peace University (MIT WPU)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                  Pune, Maharashtra, India
                </p>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 font-mono">
                  B.Tech in Computer Science and Engineering
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Current Status: 3rd Year &bull; Focus: Software Engineering, DBMS &amp; Applied AI
                </p>
              </div>
            </div>

            {/* Core Project Highlights Preview */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 p-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Flagship Systems
              </div>

              <div className="space-y-3">
                {PROJECTS.map(project => (
                  <div
                    key={project.id}
                    className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-950/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-stone-900 dark:text-stone-100">
                      <span>{project.title} &ndash; {project.subtitle}</span>
                      <span className="text-[10px] font-mono text-stone-400">{project.year}</span>
                    </div>
                    <div className="text-[11px] font-mono text-stone-500">
                      {project.tags.join(' &bull; ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
