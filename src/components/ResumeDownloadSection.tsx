import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';
import { downloadResumePDF, downloadResumeMarkdown, openResumePDFInNewTab } from '../utils/pdfGenerator';
import { soundFX } from '../utils/audio';
import { Download, ExternalLink, Printer, FileText, CheckCircle2, Eye, Sparkles } from 'lucide-react';

interface ResumeDownloadSectionProps {
  onUnlockQuest: (questId: string) => void;
}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({ onUnlockQuest }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    downloadResumePDF('Digvijay_Ware_Resume.pdf');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4500);
  };

  const handleOpenPDF = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    openResumePDFInNewTab();
  };

  const handleDownloadMD = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    downloadResumeMarkdown();
  };

  const handlePrint = () => {
    soundFX.playClick();
    onUnlockQuest('q-download-resume');
    window.print();
  };

  return (
    <section id="resume" className="py-16 md:py-24 border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Official Curriculum Vitae
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-2.5 h-2.5" />
              Clickable Links Embedded
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 tracking-tight">
            Original Resume &amp; PDF Download
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Exact single-page resume with embedded clickable links for GitHub repositories, email, phone, and credentials.
          </p>
        </div>

        {/* Minimalist Action Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-stone-100 dark:text-stone-900 font-medium text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95"
            title="Download PDF with interactive clickable links"
          >
            <Download className="w-4 h-4" />
            <span>Download Digvijay_Ware_Resume.pdf</span>
          </button>

          <button
            onClick={handleOpenPDF}
            className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium text-xs flex items-center gap-2 transition-all active:scale-95 border border-stone-200 dark:border-stone-700"
            title="Open interactive PDF in a new tab"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview in New Tab</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Layout</span>
          </button>

          <button
            onClick={handleDownloadMD}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plaintext (Markdown)</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span><strong>Digvijay_Ware_Resume.pdf</strong> downloaded with all clickable links active.</span>
          </div>
        )}

        {/* Crisp Document Paper Preview matching attached Resume */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-12 text-stone-900 dark:text-stone-100 shadow-sm print-only-resume relative">
          
          {/* Header */}
          <div className="text-center pb-5 mb-5 border-b border-stone-200 dark:border-stone-800">
            <h3 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 space-x-2 font-mono">
              <span>{PERSONAL_INFO.location}</span>
              <span>|</span>
              <a 
                href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`} 
                className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                title="Call phone number"
              >
                {PERSONAL_INFO.phone}
              </a>
              <span>|</span>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="text-stone-900 dark:text-stone-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                title="Send email"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 space-x-3 font-mono">
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline inline-flex items-center gap-1 transition-colors"
                title="Open LinkedIn Profile"
              >
                <span>linkedin.com/in/digvijay-ware-57a007330</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <span>|</span>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline inline-flex items-center gap-1 transition-colors"
                title="Open GitHub Profile"
              >
                <span>github.com/Digvijay-exe</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Professional Summary
            </h4>
            <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 text-justify font-serif">
              {PERSONAL_INFO.professionalSummary}
            </p>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Education
            </h4>
            <div className="flex justify-between items-baseline text-xs font-serif font-bold text-stone-900 dark:text-stone-100">
              <a 
                href="https://mitwpu.edu.in" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
              >
                <span>{PERSONAL_INFO.education.institution}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-50" />
              </a>
              <span className="font-normal font-mono text-stone-500">{PERSONAL_INFO.education.location}</span>
            </div>
            <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 italic font-serif mt-0.5">
              <span>{PERSONAL_INFO.education.degree}</span>
              <span className="font-mono">{PERSONAL_INFO.education.period}</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Technical Skills
            </h4>
            <div className="text-xs space-y-1 text-stone-700 dark:text-stone-300 font-serif">
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Programming:</strong> C++, Python, SQL &nbsp;&nbsp; <strong className="font-bold text-stone-900 dark:text-stone-100">DSA:</strong> Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Database:</strong> MySQL, Relational Database Design, SQL Joins, Indexing, Stored Procedures, Triggers</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">AI &amp; Computer Vision:</strong> AI Fundamentals, Computer Vision, AI Productivity Tools</div>
              <div><strong className="font-bold text-stone-900 dark:text-stone-100">Tools:</strong> Git, GitHub, VS Code, Linux/Unix, LaTeX &nbsp;&nbsp; <strong className="font-bold text-stone-900 dark:text-stone-100">Other:</strong> OOP, File I/O, Socket Programming</div>
            </div>
          </div>

          {/* Projects with clickable links */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Projects
            </h4>
            {PROJECTS.map(p => (
              <div key={p.id} className="mb-3.5 font-serif">
                <div className="flex justify-between items-baseline text-xs font-bold text-stone-900 dark:text-stone-100">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 group"
                    title={`View ${p.title} on GitHub`}
                  >
                    <span>{p.title} – {p.subtitle}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <span className="font-normal font-mono text-stone-500">{p.year}</span>
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 italic mb-1">
                  {p.tags.join(', ')}
                </div>
                <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5">
                  {p.bulletPoints.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Experience & Leadership */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Experience &amp; Leadership
            </h4>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="mb-3 font-serif">
                <div className="flex justify-between items-baseline text-xs font-bold text-stone-900 dark:text-stone-100">
                  <span>{exp.role} – {exp.company}</span>
                  <span className="font-normal font-mono text-stone-500">{exp.period}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600 dark:text-stone-400 italic mb-1">
                  <span>{exp.company}</span>
                  <span className="font-mono">{exp.location}</span>
                </div>
                <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hackathons & Competitions */}
          <div className="mb-5">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Hackathons &amp; Competitions
            </h4>
            <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5 font-serif">
              {HACKATHONS.map((h, i) => (
                <li key={i}>
                  {h.name.includes('Smart India') ? (
                    <a href="https://www.sih.gov.in/" target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                      <strong>{h.name}</strong> – {h.round}
                    </a>
                  ) : h.name.includes('Adobe') ? (
                    <a href="https://www.adobe.com/" target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                      <strong>{h.name}</strong> : {h.organizer} – {h.round}
                    </a>
                  ) : (
                    <a href="https://cumminscollege.org/" target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
                      <strong>{h.name}</strong> : {h.organizer} – {h.round}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Course Certifications */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-stone-700 pb-1 mb-2">
              Course Certifications
            </h4>
            <ul className="list-disc list-outside pl-4 text-xs text-stone-700 dark:text-stone-300 space-y-0.5 font-serif">
              {CERTIFICATIONS.map(c => {
                const url = c.id === 'cert-helsinki' 
                  ? 'https://www.elementsofai.com/'
                  : c.id === 'cert-dbms'
                  ? 'https://www.scaler.com/topics/dbms/'
                  : c.id === 'cert-cv'
                  ? 'https://www.mygreatlearning.com/'
                  : 'https://be10x.in/';

                return (
                  <li key={c.id}>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
                    >
                      <span><strong>{c.title}</strong> : {c.issuer} – {c.date} ({c.details})</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
