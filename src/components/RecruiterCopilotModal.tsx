import React, { useState, useRef, useEffect } from 'react';
import { soundFX } from '../utils/audio';
import { Send, X, Sparkles } from 'lucide-react';

interface RecruiterCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockQuest: (questId: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const RecruiterCopilotModal: React.FC<RecruiterCopilotModalProps> = ({
  isOpen,
  onClose,
  onUnlockQuest
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello. I am Digvijay's AI Career Copilot powered by Gemini 3.1 Pro (High Thinking mode).\n\nYou can ask about his C++ systems engineering, the Pulse kinematic fatigue algorithm, InkLite's KMP string matching, or his availability for Summer 2026 roles.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQueries = [
    'Explain the Kinematic Fatigue Tracker in Pulse',
    'How does InkLite implement KMP and Boyer-Moore?',
    'What is Digvijay’s availability for Summer 2026?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    soundFX.playClick();
    const query = (queryText || input).trim();
    if (!query || loading) return;

    onUnlockQuest('q-contact-copilot');
    const newMsgs: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/career-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (data.response) {
        setMessages([...newMsgs, { role: 'assistant', content: data.response }]);
      } else {
        setMessages([...newMsgs, { role: 'assistant', content: 'Inquiry received. Please reach out to digvijay.ware@mitwpu.edu.in directly.' }]);
      }
    } catch {
      setMessages([...newMsgs, { role: 'assistant', content: 'Connection unavailable. Digvijay can be reached at digvijay.ware@mitwpu.edu.in.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl h-[560px] rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col text-stone-900 dark:text-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#d4c2fc]" />
            <span className="font-semibold text-stone-900 dark:text-stone-100">AI Career Copilot</span>
            <span className="text-stone-400 text-[11px]">&bull; Gemini 3.1 Pro (High Thinking)</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3 whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                    : 'bg-stone-100/70 dark:bg-stone-800/40 text-stone-800 dark:text-stone-200 border border-stone-200/50 dark:border-stone-800/50 font-light'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-xs text-stone-400 font-mono flex items-center gap-2 p-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4c2fc] animate-ping" />
              <span>Thinking with Gemini 3.1 Pro...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Query Suggestions */}
        <div className="px-4 py-2 border-t border-stone-200/60 dark:border-stone-800/60 flex gap-1.5 overflow-x-auto">
          {sampleQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-2 py-1 rounded bg-stone-100 dark:bg-stone-800/40 text-[11px] font-mono text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-stone-200 dark:border-stone-800 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask about projects, algorithms, or availability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
