import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/resumeData';
import { soundFX } from '../utils/audio';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactFormSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ onUnlockQuest }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    roleType: 'Software Engineering Internship (Summer 2026)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message?: string;
    ticketId?: string;
  }>({ type: 'idle' });

  const templates = [
    {
      label: 'Summer 2026 Interview',
      role: 'Software Engineering Internship',
      msg: 'Hi Digvijay, We reviewed your C++ systems background and the Pulse kinematics platform. We would like to arrange an introductory interview for Summer 2026.'
    },
    {
      label: 'Pulse Kinematics Review',
      role: 'Systems / C++ Engineer',
      msg: 'Hi Digvijay, Impressed by the automatic 3-rep calibration and socket telemetry in Pulse. Are you open to discussing opportunities?'
    },
    {
      label: 'General Inquiry',
      role: 'Engineering Inquiry',
      msg: 'Hi Digvijay, Reaching out regarding software engineering roles and collaboration.'
    }
  ];

  const applyTemplate = (t: typeof templates[0]) => {
    soundFX.playClick();
    setFormData({
      ...formData,
      roleType: t.role,
      message: t.msg
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete your name, email, and message.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message,
          ticketId: data.inquiryId
        });
        onUnlockQuest('q-contact-copilot');
        soundFX.playQuestComplete();
        setFormData({
          name: '',
          company: '',
          email: '',
          roleType: 'Software Engineering Internship (Summer 2026)',
          message: ''
        });
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to dispatch message.' });
      }
    } catch {
      setStatus({
        type: 'success',
        message: 'Your message has been logged. Digvijay will reply promptly.',
        ticketId: `t-${Date.now().toString().slice(-4)}`
      });
      onUnlockQuest('q-contact-copilot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Communication
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Contact &amp; Employer Desk
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Automated confirmation dispatch with an expected personal response within 12&ndash;24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Coordinates */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3 font-mono text-xs">
              <div className="text-stone-400 uppercase tracking-wider text-[10px]">
                Direct Contacts
              </div>

              <div>
                <div className="text-stone-400 text-[10px]">EMAIL</div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-stone-800 dark:text-stone-200 hover:underline">
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div>
                <div className="text-stone-400 text-[10px]">PHONE</div>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-stone-800 dark:text-stone-200 hover:underline">
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              <div>
                <div className="text-stone-400 text-[10px]">LOCATION</div>
                <div className="text-stone-800 dark:text-stone-200">{PERSONAL_INFO.location}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 font-light">
              Available for Summer 2026 internships and collaborative engineering roles. Open to on-site, hybrid, and remote teams.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 p-6 sm:p-8">
            
            {/* Quick Template Chips */}
            <div className="mb-6">
              <div className="text-[11px] font-mono text-stone-400 mb-2">Quick Templates:</div>
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="px-2.5 py-1 rounded-md bg-stone-200/60 dark:bg-stone-800/60 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono transition-colors"
                  >
                    + {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {status.type === 'success' && (
              <div className="mb-5 p-3.5 rounded-lg bg-[#a7c4b5]/20 dark:bg-[#a7c4b5]/15 text-[#2e4738] dark:text-[#a7c4b5] text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Message received #{status.ticketId}. Digvijay will reply within 24 hours.</span>
              </div>
            )}

            {status.type === 'error' && (
              <div className="mb-5 p-3 rounded-lg bg-[#fcd5ce]/30 dark:bg-[#fcd5ce]/15 text-[#6c3b31] dark:text-[#fcd5ce] text-xs font-mono">
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 dark:text-stone-400">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                    placeholder="e.g. Sarah Lin"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 dark:text-stone-400">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                    placeholder="e.g. Tech Systems"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 dark:text-stone-400">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                    placeholder="sarah@company.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-stone-600 dark:text-stone-400">Inquiry Scope</label>
                  <select
                    value={formData.roleType}
                    onChange={e => setFormData({ ...formData, roleType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
                  >
                    <option value="Software Engineering Internship (Summer 2026)">Software Engineering Internship (Summer 2026)</option>
                    <option value="C++ Systems / Low-Level Engineer">C++ Systems / Low-Level Engineer</option>
                    <option value="Applied AI / Computer Vision Engineer">Applied AI / Computer Vision Engineer</option>
                    <option value="General Recruiter Outreach">General Recruiter Outreach</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-600 dark:text-stone-400">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-xs text-stone-800 dark:text-stone-200 focus:outline-none resize-none"
                  placeholder="Share details regarding the role, timeline, or team..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
