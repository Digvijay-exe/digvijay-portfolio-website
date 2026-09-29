/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_QUESTS } from './data/resumeData';
import { Quest, RecruiterUser } from './types';
import { ParallaxPortfolioSite } from './components/ParallaxPortfolioSite';
import { RecruiterAuthModal } from './components/RecruiterAuthModal';
import { RecruiterCopilotModal } from './components/RecruiterCopilotModal';
import { UnitTestsRunnerModal } from './components/UnitTestsRunnerModal';
import { soundFX } from './utils/audio';

export default function App() {
  // Dark mode state (Parallax Strip Slider is designed in high-contrast cinematic dark theme)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dw_theme');
    if (saved) return saved === 'dark';
    return true;
  });

  // Gamification Quests & XP state
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('dw_quests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_QUESTS;
      }
    }
    return INITIAL_QUESTS;
  });

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);

  // Recruiter authentication state
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('dw_auth_token');
  });
  const [authUser, setAuthUser] = useState<RecruiterUser | null>(null);

  // Sync dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dw_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dw_theme', 'light');
    }
  }, [darkMode]);

  // Global subtle tactile audio feedback for hovering and clicking interactive elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]')) {
        soundFX.playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, [role="button"], input[type="submit"], input[type="button"]')) {
        soundFX.playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Unlock Quest handler
  const handleUnlockQuest = (questId: string) => {
    setQuests(prev =>
      prev.map(q => {
        if (q.id === questId && !q.completed) {
          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  const handleLoginSuccess = (token: string, user: RecruiterUser) => {
    setAuthToken(token);
    setAuthUser(user);
    localStorage.setItem('dw_auth_token', token);
  };

  const handleLogout = () => {
    soundFX.playClick();
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem('dw_auth_token');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white select-none">
      
      {/* Primary Parallax Strip Slider Portfolio Experience */}
      <ParallaxPortfolioSite
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTests={() => setIsTestsOpen(true)}
        isAuthenticated={!!authToken}
      />

      {/* Recruiter Authentication Modal */}
      <RecruiterAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        token={authToken}
        user={authUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* AI Recruiter Copilot Modal */}
      <RecruiterCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onUnlockQuest={handleUnlockQuest}
      />

      {/* Embedded Unit Tests Runner Modal */}
      <UnitTestsRunnerModal
        isOpen={isTestsOpen}
        onClose={() => setIsTestsOpen(false)}
      />

    </div>
  );
}
