import React from 'react';
import { EXPERIENCES, HACKATHONS, PERSONAL_INFO } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface ExperienceHackathonsSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ExperienceHackathonsSection: React.FC<ExperienceHackathonsSectionProps> = ({ onUnlockQuest }) => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Leadership &amp; Competitive Track
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Experience &amp; Hackathons
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Student outreach, brand engagement campaigns, and competitive hackathon presentations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Experience & Leadership */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Experience &amp; Leadership
            </h3>

            <div className="space-y-4">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/30 p-5 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {exp.company}
                    </span>
                    <span className="text-stone-400">{exp.period}</span>
                  </div>

                  <div className="text-xs text-[#3d5a49] dark:text-[#a7c4b5] font-mono">
                    {exp.role} &bull; {exp.location}
                  </div>

                  <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 font-light">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-stone-400 mt-0.5">&ndash;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hackathons & Education */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hackathons & Competitions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Hackathons &amp; Competitions
                </h3>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onUnlockQuest('q-view-hackathons');
                  }}
                  className="text-[11px] font-mono text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Inspect (+50 XP)
                </button>
              </div>

              {/* Hackathons Award Banner */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-stone-200 dark:border-stone-800 shadow-sm group">
                <img
                  src="/hackathon_stage_award.jpg"
                  alt="Smart India Hackathon 2026 Stage Ceremony"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                  <span className="text-[11px] font-mono text-stone-200">
                    Smart India Hackathon 2026 &bull; Certificate of Merit Ceremony
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {HACKATHONS.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-900/20 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-stone-900 dark:text-stone-100">{h.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4c2fc]/20 dark:bg-[#d4c2fc]/15 text-[#4e3678] dark:text-[#d4c2fc]">
                        {h.round}
                      </span>
                    </div>
                    <div className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                      {h.organizer} &bull; {h.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Summary */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
                Education Standing
              </h3>

              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 p-4 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between font-semibold text-stone-900 dark:text-stone-100">
                  <span>{PERSONAL_INFO.education.institution}</span>
                  <span className="text-stone-400">{PERSONAL_INFO.education.period}</span>
                </div>
                <div className="text-[#3d5a49] dark:text-[#a7c4b5]">
                  {PERSONAL_INFO.education.degree}
                </div>
                <p className="text-stone-500 text-[11px] font-sans">
                  {PERSONAL_INFO.education.status} &bull; Focus Areas: {PERSONAL_INFO.education.focusAreas.join(', ')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
