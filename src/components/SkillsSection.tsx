import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/resumeData';
import { soundFX } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pastelColors = [
    'bg-[#a7c4b5]', // Sage
    'bg-[#d4c2fc]', // Lavender
    'bg-[#fcd5ce]', // Peach
    'bg-[#faedcd]', // Butter
    'bg-[#c8b6ff]'  // Periwinkle
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Technical Skills Matrix
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Low-level systems programming, data structures, relational database engineering, and computer vision.
          </p>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-stone-200/70 dark:border-stone-800/70">
          {SKILL_CATEGORIES.map((category, idx) => (
            <button
              key={category.name}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === idx
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES[activeTab].skills.map((skill, index) => {
            const barColor = pastelColors[index % pastelColors.length];
            return (
              <div
                key={skill.name}
                className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-stone-900 dark:text-stone-100">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    {skill.level}%
                  </span>
                </div>

                {/* Minimalist Pastel Progress Bar */}
                <div className="w-full h-1.5 bg-stone-200/70 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {skill.highlight && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono leading-relaxed">
                    {skill.highlight}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiet Tag Summary */}
        <div className="mt-10 pt-6 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-wrap gap-2 text-xs font-mono text-stone-600 dark:text-stone-400">
          {[
            'C++',
            'Python',
            'SQL',
            'KMP Algorithm',
            'Boyer-Moore',
            'Trees & Graphs',
            'Dynamic Programming',
            'MySQL Normalization',
            'Socket Telemetry',
            'Computer Vision',
            'Linux/Unix',
            'Git & GitHub'
          ].map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-800 bg-stone-100/40 dark:bg-stone-900/20"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
