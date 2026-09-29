import React from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCopilot: () => void;
  onOpenTests: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCopilot,
  onOpenTests,
  onOpenAuth
}) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-950 py-12 text-stone-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-200/60 dark:border-stone-800/60">
          <div className="space-y-1">
            <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
              {PERSONAL_INFO.name}
            </div>
            <p className="text-stone-500 text-xs font-light">
              Undergraduate Engineer &bull; MIT World Peace University (MIT WPU), Pune
            </p>
          </div>

          {/* Recruiter Quick Jump Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-400">
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenCopilot();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              AI Copilot
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenTests();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Unit Tests
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenAuth();
              }}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Recruiter Portal
            </button>
            <a
              href="#resume"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Resume PDF
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-stone-600 dark:text-stone-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              title="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Digvijay Madhav Ware &bull; B.Tech CSE (2024&ndash;2028)
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-stone-700 dark:hover:text-stone-200 transition-colors flex items-center gap-1"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
