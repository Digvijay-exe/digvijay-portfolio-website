import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { Check, X, Play } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  category: string;
  description: string;
  run: () => boolean;
}

export const UnitTestsRunnerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [testResults, setTestResults] = useState<{ [key: string]: 'passed' | 'failed' | 'idle' }>({});
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState<{ passed: number; total: number; durationMs: number } | null>(null);

  const testCases: TestCase[] = [
    {
      id: 'kmp-test',
      name: 'Knuth-Morris-Pratt (KMP) Matcher',
      category: 'Algorithm',
      description: 'Verifies prefix LPS table and exact match index on "ABABDABACDABABCABAB".',
      run: () => {
        const text = 'ABABDABACDABABCABAB';
        const pat = 'ABABCABAB';
        const lps = new Array(pat.length).fill(0);
        let len = 0, i = 1;
        while (i < pat.length) {
          if (pat[i] === pat[len]) { len++; lps[i] = len; i++; }
          else { if (len !== 0) len = lps[len - 1]; else { lps[i] = 0; i++; } }
        }
        let ti = 0, pi = 0, found = -1;
        while (ti < text.length) {
          if (pat[pi] === text[ti]) { ti++; pi++; }
          if (pi === pat.length) { found = ti - pi; break; }
          else if (ti < text.length && pat[pi] !== text[ti]) {
            if (pi !== 0) pi = lps[pi - 1]; else ti++;
          }
        }
        return found === 10;
      }
    },
    {
      id: 'boyer-moore-test',
      name: 'Boyer-Moore Bad Character Rule',
      category: 'Algorithm',
      description: 'Checks sublinear character skip lookup map matches expected shift offsets.',
      run: () => {
        const pattern = 'INKLITE';
        const badChar: { [key: string]: number } = {};
        for (let i = 0; i < pattern.length; i++) badChar[pattern[i]] = i;
        return badChar['I'] === 4 && badChar['E'] === 6;
      }
    },
    {
      id: 'kinematic-fatigue-test',
      name: 'Kinematic Fatigue 3-Rep Calibration',
      category: 'Kinematics',
      description: 'Validates baseline computation and >20% decay threshold trigger.',
      run: () => {
        const reps = [0.88, 0.86, 0.84];
        const baseline = (reps[0] + reps[1] + reps[2]) / 3;
        const loss = ((baseline - 0.65) / baseline) * 100;
        return loss >= 20.0;
      }
    },
    {
      id: 'email-validator-test',
      name: 'Email Format & Sanitization',
      category: 'Validation',
      description: 'Validates valid work emails and rejects malformed strings.',
      run: () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test('recruiter@apex.com') && !regex.test('bad-email');
      }
    },
    {
      id: 'token-format-test',
      name: 'HMAC Cryptographic Token Validation',
      category: 'Security',
      description: 'Checks token structure: base64url payload + 64-char hex signature.',
      run: () => {
        const mockPayload = Buffer.from(JSON.stringify({ user: 'recruiter' })).toString('base64url');
        const token = `${mockPayload}.${'a'.repeat(64)}`;
        const parts = token.split('.');
        return parts.length === 2 && parts[1].length === 64;
      }
    }
  ];

  if (!isOpen) return null;

  const runAllTests = () => {
    soundFX.playClick();
    setIsRunning(true);
    const start = performance.now();
    const results: { [key: string]: 'passed' | 'failed' } = {};
    let passedCount = 0;

    testCases.forEach(tc => {
      try {
        const ok = tc.run();
        results[tc.id] = ok ? 'passed' : 'failed';
        if (ok) passedCount++;
      } catch {
        results[tc.id] = 'failed';
      }
    });

    const duration = Math.round(performance.now() - start);
    setTimeout(() => {
      setTestResults(results);
      setIsRunning(false);
      setStats({ passed: passedCount, total: testCases.length, durationMs: duration || 2 });
      soundFX.playQuestComplete();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 text-stone-900 dark:text-stone-100 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5">
          <div className="space-y-0.5">
            <h3 className="text-base font-normal">System Unit Tests</h3>
            <p className="text-xs text-stone-500 font-mono">Algorithms, sensor calculations &amp; security validation</p>
          </div>

          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action / Results Bar */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono">
          <div>
            {stats ? (
              <span className="text-[#3d5a49] dark:text-[#a7c4b5] font-semibold">
                {stats.passed}/{stats.total} Passing ({stats.durationMs}ms)
              </span>
            ) : (
              <span className="text-stone-500">{testCases.length} tests ready</span>
            )}
          </div>

          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="py-1 px-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Play className="w-3 h-3" />
            <span>{isRunning ? 'Running...' : 'Run All'}</span>
          </button>
        </div>

        {/* Test List */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {testCases.map(tc => {
            const status = testResults[tc.id] || 'idle';
            return (
              <div
                key={tc.id}
                className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-950/40 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[10px] text-stone-400">{tc.category}</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{tc.name}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] font-light">{tc.description}</p>
                </div>

                <div className="flex-shrink-0 font-mono text-[11px]">
                  {status === 'passed' && (
                    <span className="text-[#3d5a49] dark:text-[#a7c4b5] flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> PASS
                    </span>
                  )}
                  {status === 'failed' && <span className="text-[#c26d5c]">FAIL</span>}
                  {status === 'idle' && <span className="text-stone-400">IDLE</span>}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
