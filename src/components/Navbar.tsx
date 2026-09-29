import React, { useState } from 'react';
import { Sun, Moon, Sparkles, CheckSquare, Shield, Menu, X } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCopilot: () => void;
  onOpenTests: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenCopilot,
  onOpenTests,
  onOpenAuth,
  isAuthenticated
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    soundFX.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-50/85 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800/70 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-stone-900 focus:text-stone-100 focus:rounded-lg shadow-sm"
      >
        Skip to content
      </a>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Monogram & Status */}
          <a
            href="#about"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 group-hover:bg-[#a7c4b5]/30 transition-colors">
              DW
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-tight">
                Digvijay Ware
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#a7c4b5]/20 dark:bg-[#a7c4b5]/15 text-[#3d5a49] dark:text-[#a7c4b5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7a9d8a]" />
                Summer '26
              </span>
            </div>
          </a>

          {/* Minimalist Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Minimalist Controls */}
          <div className="flex items-center gap-2">
            {/* AI Copilot in soft pastel lavender */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenCopilot();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#d4c2fc]/20 dark:bg-[#d4c2fc]/15 hover:bg-[#d4c2fc]/30 text-[#543b7e] dark:text-[#d4c2fc] text-xs font-medium transition-colors"
              title="Career Copilot AI with Gemini Thinking Mode"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* System Tests */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenTests();
              }}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs font-mono transition-colors"
              title="Run Unit Tests"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tests</span>
            </button>

            {/* Recruiter Auth */}
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenAuth();
              }}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isAuthenticated
                  ? 'border-[#a7c4b5] bg-[#a7c4b5]/15 text-[#3d5a49] dark:text-[#a7c4b5]'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title={isAuthenticated ? 'Verified Recruiter Session' : 'Recruiter Access'}
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleDarkMode();
              }}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav aria-label="Mobile Navigation" className="md:hidden py-3 border-t border-stone-200 dark:border-stone-800 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 px-3 flex gap-3">
              <button
                onClick={() => {
                  handleLinkClick();
                  onOpenTests();
                }}
                className="text-xs font-mono text-stone-600 dark:text-stone-400"
              >
                Unit Tests
              </button>
              <button
                onClick={() => {
                  handleLinkClick();
                  onOpenCopilot();
                }}
                className="text-xs font-medium text-[#543b7e] dark:text-[#d4c2fc]"
              >
                AI Copilot
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
