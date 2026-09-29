import React, { useState } from 'react';
import { Quest } from '../types';
import { soundFX } from '../utils/audio';
import { Volume2, VolumeX, Eye, ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';

interface GamifiedHUDProps {
  quests: Quest[];
  totalXP: number;
  fastMode: boolean;
  onToggleFastMode: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
  recruiterCompany?: string;
}

export const GamifiedHUD: React.FC<GamifiedHUDProps> = ({
  quests,
  totalXP,
  fastMode,
  onToggleFastMode,
  onOpenAuth,
  isAuthenticated,
  recruiterCompany
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(soundFX.enabled);

  const level = Math.min(Math.floor(totalXP / 100) + 1, 5);
  const completedCount = quests.filter(q => q.completed).length;

  const toggleAudio = () => {
    soundFX.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) soundFX.playClick();
  };

  return (
    <aside aria-label="Recruiter milestones" className="gamified-hud fixed bottom-4 right-4 z-40">
      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md shadow-lg shadow-stone-900/5 text-stone-800 dark:text-stone-200 p-2.5 max-w-xs transition-all">
        
        {/* Compact Pill Bar */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
          >
            <span className="w-2 h-2 rounded-full bg-[#a7c4b5]" />
            <span className="font-medium text-stone-900 dark:text-stone-100">Level {level}</span>
            <span className="text-stone-400 text-[11px]">({totalXP} XP)</span>
          </button>

          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={toggleAudio}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              title={audioEnabled ? 'Mute' : 'Unmute'}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleFastMode}
              className="px-1.5 py-0.5 rounded text-[10px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
              title="Toggle Fast Minimal View"
            >
              <Eye className="w-3 h-3 inline mr-0.5" />
              {fastMode ? 'Full' : 'Minimal'}
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-200/70 dark:border-stone-800/70 space-y-2">
            <div className="text-[11px] font-mono text-stone-400 flex justify-between">
              <span>Recruiter Milestones</span>
              <span>{completedCount}/{quests.length}</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {quests.map(q => (
                <div
                  key={q.id}
                  className="p-2 rounded-lg text-xs flex items-center justify-between border border-stone-200/60 dark:border-stone-800/60 bg-white/40 dark:bg-stone-950/40"
                >
                  <div className="flex items-center gap-2">
                    {q.completed ? (
                      <CheckCircle2 className="w-3 h-3 text-[#7a9d8a]" />
                    ) : (
                      <Circle className="w-3 h-3 text-stone-400" />
                    )}
                    <span className={q.completed ? 'line-through text-stone-400' : 'text-stone-700 dark:text-stone-300'}>
                      {q.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#4e3678] dark:text-[#d4c2fc]">+{q.xp}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenAuth}
              className="w-full mt-1 py-1.5 px-2 rounded-lg text-[11px] font-mono border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {isAuthenticated ? `Authenticated: ${recruiterCompany || 'Partner'}` : 'Recruiter Access Portal'}
            </button>
          </div>
        )}

      </div>
    </aside>
  );
};
