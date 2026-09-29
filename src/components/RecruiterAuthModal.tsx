import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { RecruiterUser } from '../types';
import { X, Shield } from 'lucide-react';

interface RecruiterAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  user: RecruiterUser | null;
  onLoginSuccess: (token: string, user: RecruiterUser) => void;
  onLogout: () => void;
}

export const RecruiterAuthModal: React.FC<RecruiterAuthModalProps> = ({
  isOpen,
  onClose,
  token,
  user,
  onLoginSuccess,
  onLogout
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (codeToUse?: string) => {
    soundFX.playClick();
    const finalCode = (codeToUse || accessCode).trim();
    if (!finalCode) {
      setError('Please provide a passkey.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: finalCode,
          company: company || 'Verified Talent Partner',
          recruiterName: 'Technical Recruiter'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        soundFX.playQuestComplete();
        onLoginSuccess(data.token, {
          name: data.user.name,
          company: data.user.company,
          role: data.user.role,
          confidentialData: {
            phone: '+91-8779877704',
            location: 'Pune, Maharashtra, India',
            verifiedEmail: 'digvijay.ware@mitwpu.edu.in',
            university: 'MIT World Peace University (MIT WPU), Pune',
            degree: 'B.Tech CSE (2024-2028, 3rd Year)',
            availability: 'Summer 2026 Internships'
          }
        });
      } else {
        setError(data.message || 'Verification failed.');
      }
    } catch {
      setError('Connection failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xl text-stone-900 dark:text-stone-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {token && user ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a7c4b5]" />
              <h3 className="text-base font-normal">Recruiter Access Active</h3>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs space-y-2.5 font-mono">
              <div className="text-[10px] text-stone-400 uppercase">Candidate Protected Dossier</div>
              <div className="flex justify-between">
                <span className="text-stone-500">Direct Phone:</span>
                <a href="tel:+918779877704" className="text-stone-900 dark:text-stone-100 font-semibold hover:underline">+91-8779877704</a>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Institution:</span>
                <span className="text-stone-700 dark:text-stone-300">MIT WPU, Pune</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Availability:</span>
                <span className="text-[#3d5a49] dark:text-[#a7c4b5]">Summer 2026</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onLogout}
                className="flex-1 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-stone-400" />
                <h3 className="text-base font-normal">Recruiter Verification</h3>
              </div>
              <p className="text-xs text-stone-500 font-light">
                Sign in with partner passkey to view direct candidate contacts.
              </p>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-[#fcd5ce]/30 dark:bg-[#fcd5ce]/15 text-[#6c3b31] dark:text-[#fcd5ce] text-xs font-mono">
                {error}
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-stone-500 font-mono">Company</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Talent"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-500 font-mono">Passkey</label>
                <input
                  type="password"
                  placeholder="Enter code (or use demo below)"
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/40 text-xs font-mono flex items-center justify-between">
              <span className="text-stone-500">Passkey: RECRUITER2026</span>
              <button
                type="button"
                onClick={() => {
                  setAccessCode('RECRUITER2026');
                  handleLogin('RECRUITER2026');
                }}
                className="text-[#4e3678] dark:text-[#d4c2fc] hover:underline"
              >
                1-Click Demo
              </button>
            </div>

            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 text-xs font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
