import React from 'react';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { MinimalistHero } from './ui/minimalist-hero';
import { PERSONAL_INFO } from '../data/resumeData';
import { soundFX } from '../utils/audio';

interface PortfolioMinimalistHeroProps {
  onDownloadResume: () => void;
  onOpenCopilot: () => void;
}

export const PortfolioMinimalistHero: React.FC<PortfolioMinimalistHeroProps> = ({
  onDownloadResume,
}) => {
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'RESUME', href: '#resume' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.github },
    { icon: Linkedin, href: PERSONAL_INFO.linkedin },
    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: FileDown, href: '#resume' },
  ];

  return (
    <div className="relative">
      <MinimalistHero
        logoText="DIGVIJAY W."
        navLinks={navLinks}
        mainText="Computer Science and Engineering undergraduate at MIT World Peace University, Pune. Focused on C++, real-time socket architectures, algorithmic performance, and computer vision."
        readMoreLink="#projects"
        imageSrc="https://cdn.21st.dev/assets/mirror/21/2172cd84238bbee1a57a87b64322655b09c2ffa4ea89acaef7e9989c3abd272d.png"
        imageAlt="Digvijay Madhav Ware - Software & Systems Engineer"
        overlayText={{
          part1: 'code &',
          part2: 'build.',
        }}
        socialLinks={socialLinks}
        locationText={`${PERSONAL_INFO.location} • Class of 2028`}
        className="border-b border-stone-200 dark:border-stone-800"
      />

      {/* Floating quick-bar for Recruiters */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono bg-stone-100/80 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active for 2026/2027 Software Engineering &amp; Systems Internships</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onDownloadResume();
            }}
            className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Official Resume (PDF)</span>
          </button>
          <a
            href="#projects"
            onClick={() => soundFX.playClick()}
            className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-500 transition-colors"
          >
            Browse Projects &darr;
          </a>
        </div>
      </div>
    </div>
  );
};
