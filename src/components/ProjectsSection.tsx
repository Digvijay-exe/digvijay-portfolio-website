import React from 'react';
import { PROJECTS } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Github, ExternalLink, CheckCircle2, Code2, Cpu, Terminal } from 'lucide-react';

interface ProjectsSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onUnlockQuest }) => {
  return (
    <section id="projects" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Selected Work &bull; Resume Projects
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              Projects &amp; Systems Architecture
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl">
              Production-focused systems, networking platforms, algorithm engines, and threaded AI integrations built with C++ and Python.
            </p>
          </div>

          <a
            href="https://github.com/Digvijay-exe"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 text-xs font-mono text-stone-800 dark:text-stone-200 transition-colors w-fit"
          >
            <Github className="w-4 h-4" />
            <span>github.com/Digvijay-exe</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => {
            const pastelAccents = [
              { border: 'border-[#a7c4b5]/40', tagBg: 'bg-[#a7c4b5]/20 text-[#2e4738] dark:text-[#a7c4b5]', icon: <Terminal className="w-4 h-4 text-[#a7c4b5]" /> },
              { border: 'border-[#d4c2fc]/40', tagBg: 'bg-[#d4c2fc]/20 text-[#47306e] dark:text-[#d4c2fc]', icon: <Code2 className="w-4 h-4 text-[#d4c2fc]" /> },
              { border: 'border-[#fcd5ce]/50', tagBg: 'bg-[#fcd5ce]/25 text-[#6c3b31] dark:text-[#fcd5ce]', icon: <Cpu className="w-4 h-4 text-[#fcd5ce]" /> }
            ];
            const accent = pastelAccents[index % pastelAccents.length];

            return (
              <div
                key={project.id}
                className={`rounded-2xl border ${accent.border} border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/30 p-6 flex flex-col justify-between hover:border-stone-400 dark:hover:border-stone-700 transition-all duration-200 overflow-hidden`}
              >
                {project.imageUrl && (
                  <div className="relative w-full h-36 -mx-6 -mt-6 mb-4 overflow-hidden border-b border-stone-200/60 dark:border-stone-800/60">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                )}
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {accent.icon}
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${accent.tagBg}`}>
                        {project.tags[0]}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-stone-400">{project.year}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                    {project.summary}
                  </p>

                  {/* Bullet Points from Resume */}
                  <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300 pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                    {project.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a7c4b5] flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-stone-600 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub Action Link */}
                <div className="pt-6 mt-4 border-t border-stone-200/60 dark:border-stone-800/60">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      soundFX.playClick();
                      onUnlockQuest(project.id === 'pulse' ? 'q-inspect-pulse' : 'q-test-kmp');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository on GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
