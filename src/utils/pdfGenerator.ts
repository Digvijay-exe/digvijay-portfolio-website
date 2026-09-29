import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, HACKATHONS, CERTIFICATIONS } from '../data/resumeData';

/**
 * Builds the jsPDF document instance with exact single-page academic/LaTeX formatting
 * and embedded interactive clickable links (email, phone, LinkedIn, GitHub, project repos, certs).
 */
export function buildResumePDFDoc(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;
  let y = 38;

  // Title: Digvijay Madhav Ware
  doc.setFont('times', 'normal');
  doc.setFontSize(22);
  doc.text(PERSONAL_INFO.name, pageWidth / 2, y, { align: 'center' });
  y += 16;

  // Contact line 1: Location | Phone (clickable) | Email (clickable)
  doc.setFontSize(9.5);
  const sep = '   |   ';
  const p1 = PERSONAL_INFO.location;
  const p2 = PERSONAL_INFO.phone;
  const p3 = PERSONAL_INFO.email;

  const w1 = doc.getTextWidth(p1);
  const wSep = doc.getTextWidth(sep);
  const w2 = doc.getTextWidth(p2);
  const w3 = doc.getTextWidth(p3);

  const totalLine1Width = w1 + wSep + w2 + wSep + w3;
  let curX = (pageWidth - totalLine1Width) / 2;

  // Location
  doc.text(p1, curX, y);
  curX += w1;

  // Sep
  doc.text(sep, curX, y);
  curX += wSep;

  // Phone (clickable link)
  doc.text(p2, curX, y);
  doc.link(curX, y - 8.5, w2, 10, { url: `tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}` });
  curX += w2;

  // Sep
  doc.text(sep, curX, y);
  curX += wSep;

  // Email (clickable link)
  doc.text(p3, curX, y);
  doc.link(curX, y - 8.5, w3, 10, { url: `mailto:${PERSONAL_INFO.email}` });
  y += 13;

  // Contact line 2: LinkedIn (clickable) | GitHub (clickable)
  const l1 = 'linkedin.com/in/digvijay-ware-57a007330';
  const l2 = 'github.com/Digvijay-exe';
  const wl1 = doc.getTextWidth(l1);
  const wl2 = doc.getTextWidth(l2);
  const totalLine2Width = wl1 + wSep + wl2;
  curX = (pageWidth - totalLine2Width) / 2;

  doc.text(l1, curX, y);
  doc.link(curX, y - 8.5, wl1, 10, { url: PERSONAL_INFO.linkedin });
  curX += wl1;

  doc.text(sep, curX, y);
  curX += wSep;

  doc.text(l2, curX, y);
  doc.link(curX, y - 8.5, wl2, 10, { url: PERSONAL_INFO.github });
  y += 18;

  // Helper for section header
  const drawSectionHeader = (title: string) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text(title, margin, y);
    y += 3;
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 11;
  };

  // 1. Professional Summary
  drawSectionHeader('Professional Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  const summaryLines = doc.splitTextToSize(PERSONAL_INFO.professionalSummary, contentWidth);
  doc.text(summaryLines, margin, y, { align: 'justify', maxWidth: contentWidth });
  y += summaryLines.length * 11 + 6;

  // 2. Education
  drawSectionHeader('Education');
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.text(PERSONAL_INFO.education.institution, margin, y);
  doc.link(margin, y - 8.5, doc.getTextWidth(PERSONAL_INFO.education.institution), 10, {
    url: 'https://mitwpu.edu.in'
  });
  doc.text(PERSONAL_INFO.education.location, pageWidth - margin, y, { align: 'right' });
  y += 11;

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.text(PERSONAL_INFO.education.degree, margin, y);
  doc.text(PERSONAL_INFO.education.period, pageWidth - margin, y, { align: 'right' });
  y += 14;

  // 3. Technical Skills
  drawSectionHeader('Technical Skills');
  doc.setFontSize(9);

  const skillsData = [
    { label: 'Programming:', value: 'C++, Python, SQL' },
    { label: 'DSA:', value: 'Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore' },
    { label: 'Database:', value: 'MySQL, Relational Database Design, SQL Joins, Indexing, Stored Procedures, Triggers' },
    { label: 'AI & Computer Vision:', value: 'AI Fundamentals, Computer Vision, AI Productivity Tools' },
    { label: 'Tools:', value: 'Git, GitHub, VS Code, Linux/Unix, LaTeX' },
    { label: 'Other:', value: 'OOP, File I/O, Socket Programming' }
  ];

  skillsData.forEach(item => {
    doc.setFont('times', 'bold');
    doc.text(item.label, margin, y);
    const labelWidth = doc.getTextWidth(item.label) + 6;
    doc.setFont('times', 'normal');
    const valLines = doc.splitTextToSize(item.value, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += Math.max(11, valLines.length * 10.5);
  });
  y += 5;

  // 4. Projects with clickable links to GitHub
  drawSectionHeader('Projects');
  PROJECTS.forEach(proj => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    const projectTitle = `${proj.title} \u2013 ${proj.subtitle}`;
    doc.text(projectTitle, margin, y);
    // Clickable link on project title leading to GitHub repository
    const titleWidth = doc.getTextWidth(projectTitle);
    doc.link(margin, y - 8.5, titleWidth, 10, { url: proj.githubUrl });

    doc.setFont('times', 'normal');
    doc.text(proj.year, pageWidth - margin, y, { align: 'right' });
    y += 11;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text(proj.tags.join(', '), margin, y);
    y += 10;

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    proj.bulletPoints.forEach(bp => {
      const bulletLines = doc.splitTextToSize(`\u2013  ${bp}`, contentWidth - 10);
      doc.text(bulletLines, margin + 8, y, { align: 'justify', maxWidth: contentWidth - 10 });
      y += bulletLines.length * 10.5;
    });
    y += 4;
  });
  y += 2;

  // 5. Experience & Leadership
  drawSectionHeader('Experience & Leadership');
  EXPERIENCES.forEach(exp => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    const expTitle = `${exp.role} \u2013 ${exp.company}`;
    doc.text(expTitle, margin, y);
    doc.setFont('times', 'normal');
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
    y += 11;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text(exp.company, margin, y);
    doc.text(exp.location, pageWidth - margin, y, { align: 'right' });
    y += 10;

    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    exp.points.forEach(pt => {
      const ptLines = doc.splitTextToSize(`\u2013  ${pt}`, contentWidth - 10);
      doc.text(ptLines, margin + 8, y, { align: 'justify', maxWidth: contentWidth - 10 });
      y += ptLines.length * 10.5;
    });
    y += 4;
  });
  y += 2;

  // 6. Hackathons & Competitions
  drawSectionHeader('Hackathons & Competitions');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);

  HACKATHONS.forEach(h => {
    let lineText = '';
    let linkUrl = '';
    if (h.name.includes('Smart India')) {
      lineText = `\u2022  ${h.name} \u2013 ${h.round}`;
      linkUrl = 'https://www.sih.gov.in/';
    } else if (h.name.includes('Adobe')) {
      lineText = `\u2022  ${h.name} : ${h.organizer} \u2013 ${h.round}`;
      linkUrl = 'https://www.adobe.com/';
    } else {
      lineText = `\u2022  ${h.name} : ${h.organizer} \u2013 ${h.round}`;
      linkUrl = 'https://cumminscollege.org/';
    }
    const hLines = doc.splitTextToSize(lineText, contentWidth - 8);
    doc.text(hLines, margin + 6, y);
    if (linkUrl) {
      doc.link(margin + 6, y - 8, doc.getTextWidth(lineText), 10, { url: linkUrl });
    }
    y += hLines.length * 11;
  });
  y += 4;

  // 7. Course Certifications
  drawSectionHeader('Course Certifications');
  doc.setFont('times', 'normal');
  doc.setFontSize(9);

  const certData = [
    {
      text: '\u2022  Elements of AI : University of Helsinki & MinnaLearn \u2013 2 ECTS Credits, August 2025',
      url: 'https://www.elementsofai.com/'
    },
    {
      text: '\u2022  DBMS Course: Master Fundamentals : Scaler Topics \u2013 May 2026',
      url: 'https://www.scaler.com/topics/dbms/'
    },
    {
      text: '\u2022  Computer Vision Essentials : Great Learning \u2013 August 2026',
      url: 'https://www.mygreatlearning.com/'
    },
    {
      text: '\u2022  AI Tools & ChatGPT Workshop : Be10x \u2013 July 2025',
      url: 'https://be10x.in/'
    }
  ];

  certData.forEach(c => {
    doc.text(c.text, margin + 6, y);
    doc.link(margin + 6, y - 8, doc.getTextWidth(c.text), 10, { url: c.url });
    y += 11;
  });

  return doc;
}

/**
 * Downloads the official resume PDF with all interactive clickable links embedded
 */
export function downloadResumePDF(filename = 'Digvijay_Ware_Resume.pdf') {
  const doc = buildResumePDFDoc();
  doc.save(filename);
}

/**
 * Opens the interactive resume PDF directly in a new browser tab with clickable links
 */
export function openResumePDFInNewTab() {
  const doc = buildResumePDFDoc();
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl, '_blank');
}

/**
 * Downloads resume in Markdown format matching Digvijay's exact resume
 */
export function downloadResumeMarkdown() {
  const md = `# ${PERSONAL_INFO.name}
${PERSONAL_INFO.location} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

## Professional Summary
${PERSONAL_INFO.professionalSummary}

## Education
${PERSONAL_INFO.education.institution}, ${PERSONAL_INFO.education.location}
${PERSONAL_INFO.education.degree} (${PERSONAL_INFO.education.period})

## Technical Skills
- Programming: C++, Python, SQL
- DSA: Trees, Graphs, Dynamic Programming, Sorting, Searching, KMP, Boyer–Moore
- Database: MySQL, Relational Database Design, SQL Joins, Indexing, Stored Procedures, Triggers
- AI & Computer Vision: AI Fundamentals, Computer Vision, AI Productivity Tools
- Tools: Git, GitHub, VS Code, Linux/Unix, LaTeX
- Other: OOP, File I/O, Socket Programming

## Projects
${PROJECTS.map(p => `### ${p.title} – ${p.subtitle} (${p.year})
${p.tags.join(', ')}
${p.bulletPoints.map(b => `- ${b}`).join('\n')}
GitHub: ${p.githubUrl}
`).join('\n')}

## Experience & Leadership
${EXPERIENCES.map(e => `### ${e.role} – ${e.company} (${e.period})
${e.location}
${e.points.map(pt => `- ${pt}`).join('\n')}
`).join('\n')}

## Hackathons & Competitions
${HACKATHONS.map(h => `- ${h.name} : ${h.organizer} – ${h.round}`).join('\n')}

## Course Certifications
- Elements of AI : University of Helsinki & MinnaLearn – 2 ECTS Credits, August 2025
- DBMS Course: Master Fundamentals : Scaler Topics – May 2026
- Computer Vision Essentials : Great Learning – August 2026
- AI Tools & ChatGPT Workshop : Be10x – July 2025
`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Digvijay_Ware_Resume.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
