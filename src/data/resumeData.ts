import { Project, SkillCategory, Certification, Hackathon, Experience, Quest } from '../types';

export const PERSONAL_INFO = {
  name: 'Digvijay Madhav Ware',
  headline: 'Computer Science and Engineering Undergraduate | C++, Python, SQL, Systems & AI',
  location: 'Pune, Maharashtra, India',
  phone: '+91-8779877704',
  email: 'digvijay.ware@mitwpu.edu.in',
  linkedin: 'https://linkedin.com/in/digvijay-ware-57a007330',
  github: 'https://github.com/Digvijay-exe',
  education: {
    institution: 'MIT World Peace University',
    location: 'Pune, Maharashtra',
    degree: 'B.Tech in Computer Science and Engineering',
    period: '2024 – 2028',
    status: '3rd Year Undergraduate',
    focusAreas: ['Software Engineering', 'Relational Databases', 'Algorithms & AI']
  },
  professionalSummary:
    'Computer Science and Engineering undergraduate with hands-on experience in C++, Python, SQL, Data Structures, Algorithms, Computer Vision, and AI fundamentals. Experienced in developing software involving socket programming, file processing, relational databases, and real-time systems. Active participant in national-level hackathons and technical competitions, with interests in software engineering, AI/ML, and problem solving.'
};

export const PROJECTS: Project[] = [
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'Real-Time Collaborative Platform',
    year: '2026',
    tags: ['C++', 'Data Structures', 'Socket Programming'],
    techStack: ['C++', 'Data Structures', 'Socket Programming', 'Networking', 'Concurrency'],
    summary:
      'Developed a real-time collaborative platform using C++ and socket programming for network-based communication and concurrent client interactions.',
    bulletPoints: [
      'Developed a real-time collaborative platform using C++ and socket programming for network-based communication and concurrent client interactions.',
      'Implemented data structures and modular client-server communication components for efficient real-time data exchange.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe/Pulse',
    highlightStat: 'Concurrent Client-Server Architecture',
    category: 'systems',
    imageUrl: '/pulse_fatigue_tracker.jpg'
  },
  {
    id: 'inklite',
    title: 'InkLite',
    subtitle: 'Lightweight Text & Note Processing Engine',
    year: '2026',
    tags: ['C++', 'Data Structures', 'OOP', 'File I/O'],
    techStack: ['C++', 'Data Structures', 'OOP', 'File I/O', 'Text Engine'],
    summary:
      'Built a lightweight text and note processing engine using C++ and object-oriented design principles.',
    bulletPoints: [
      'Built a lightweight text and note processing engine using C++ and object-oriented design principles.',
      'Implemented efficient data structures and file I/O operations for creating, reading, modifying, and managing text data.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe/InkLite',
    highlightStat: 'Optimized Memory & File I/O',
    category: 'algorithms',
    imageUrl: '/inklite_tablet_notes.jpg'
  },
  {
    id: 'pipboy',
    title: 'Pipboy Assistant',
    subtitle: 'AI-Powered Desktop Assistant',
    year: '2026',
    tags: ['Python', 'Tkinter', 'Groq API', 'Threading'],
    techStack: ['Python', 'Tkinter', 'Groq API', 'Threading', 'LLM Integration'],
    summary:
      'Developed a Python-based desktop AI assistant with a Tkinter GUI and real-time LLM-powered responses through the Groq API.',
    bulletPoints: [
      'Developed a Python-based desktop AI assistant with a Tkinter GUI and real-time LLM-powered responses through the Groq API.',
      'Implemented threaded API interactions for responsive, non-blocking user experience with an extensible architecture for future local-model integration.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe/Pipboy-Assistant',
    highlightStat: 'Non-Blocking Threaded LLM UI',
    category: 'ai',
    imageUrl: '/pipboy_assistant_bg.jpg'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'code',
    skills: [
      { name: 'C++', level: 92, highlight: 'Low-level systems, OOP, Sockets, Memory' },
      { name: 'Python', level: 88, highlight: 'AI Integration, Threading, GUI, Scripting' },
      { name: 'SQL', level: 86, highlight: 'Relational Schemas, Complex Joins, Queries' }
    ]
  },
  {
    name: 'Data Structures & Algorithms (DSA)',
    icon: 'binary',
    skills: [
      { name: 'Trees & Graphs', level: 88, highlight: 'Traversals, BSTs, DAGs' },
      { name: 'Dynamic Programming', level: 84, highlight: 'Memoization, Tabulation' },
      { name: 'Sorting & Searching', level: 92, highlight: 'QuickSort, MergeSort, Binary Search' },
      { name: 'KMP & Boyer–Moore', level: 90, highlight: 'String matching, Failure tables, Bad-character shift' }
    ]
  },
  {
    name: 'Database Management',
    icon: 'database',
    skills: [
      { name: 'MySQL', level: 88, highlight: 'Relational Database Design, 3NF Normalization' },
      { name: 'SQL Joins & Indexing', level: 90, highlight: 'Multi-table analytical queries, Performance' },
      { name: 'Stored Procedures & Triggers', level: 85, highlight: 'Transactional Integrity, Automation' }
    ]
  },
  {
    name: 'AI & Computer Vision',
    icon: 'cpu',
    skills: [
      { name: 'AI Fundamentals', level: 86, highlight: 'Machine learning, Heuristics, Applied AI' },
      { name: 'Computer Vision', level: 84, highlight: 'Image Processing, Convolutional Filters' },
      { name: 'AI Productivity Tools', level: 92, highlight: 'LLM Prompt Engineering, Groq API' }
    ]
  },
  {
    name: 'Tools & Other Core Concepts',
    icon: 'terminal',
    skills: [
      { name: 'Git & GitHub', level: 92, highlight: 'Version control, collaborative workflows' },
      { name: 'VS Code, Linux/Unix, LaTeX', level: 88, highlight: 'Environment setup, CLI, LaTeX typesetting' },
      { name: 'OOP & File I/O', level: 90, highlight: 'Clean modular architecture, High-efficiency streams' },
      { name: 'Socket Programming', level: 88, highlight: 'Network communication, Client-server exchange' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Campus Ambassador',
    company: 'SHEIN India',
    location: 'Pune, Maharashtra',
    period: 'Summer 2026',
    points: [
      'Promoted campus engagement initiatives and coordinated outreach activities to increase awareness and participation among university students.',
      'Communicated campaign information across student communities and supported the execution of campus-focused promotional activities.'
    ],
    badgeColor: 'emerald'
  },
  {
    role: 'Campus Ambassador',
    company: 'The Framed Wall',
    location: 'Remote / Campus',
    period: '2026',
    points: [
      'Supported campus outreach and promotional initiatives by engaging with students and communicating brand campaigns across university communities.',
      'Assisted with campaign coordination and student-facing communication to strengthen awareness and participation in campus activities.'
    ],
    badgeColor: 'cyan'
  }
];

export const HACKATHONS: Hackathon[] = [
  {
    name: 'Smart India Hackathon 2026',
    organizer: 'MIT-WPU University Internal',
    location: 'Pune',
    round: 'Certificate of Merit : Top 100 Teams, September 2026',
    year: '2026',
    iconName: 'trophy'
  },
  {
    name: 'Adobe University Hackathon',
    organizer: 'Adobe',
    location: 'National / Online',
    round: 'Participant',
    year: '2026',
    iconName: 'award'
  },
  {
    name: 'Think & Code',
    organizer: "MKSSS's Cummins College of Engineering for Women",
    location: 'Pune',
    round: 'Participant',
    year: '2026',
    iconName: 'zap'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Elements of AI',
    issuer: 'University of Helsinki & MinnaLearn',
    date: 'August 2025',
    details: '2 ECTS Credits earned. Comprehensive foundation in AI principles, search algorithms, and machine learning implications.',
    badge: '2 ECTS'
  },
  {
    id: 'cert-2',
    title: 'DBMS Course: Master Fundamentals',
    issuer: 'Scaler Topics',
    date: 'May 2026',
    details: 'Database architecture, relational models, indexing, transactions, and normalization.',
    badge: 'DBMS'
  },
  {
    id: 'cert-3',
    title: 'Computer Vision Essentials',
    issuer: 'Great Learning',
    date: 'August 2026',
    details: 'Computer vision fundamentals, image filtering, feature extraction, and CV workflows.',
    badge: 'CV'
  },
  {
    id: 'cert-4',
    title: 'AI Tools & ChatGPT Workshop',
    issuer: 'Be10x',
    date: 'July 2025',
    details: 'Practical utilization of LLMs, prompt engineering patterns, and modern productivity tooling.',
    badge: 'AI Tools'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-inspect-pulse',
    title: 'Review Pulse Platform',
    description: 'Explore the real-time C++ socket collaborative platform on GitHub.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-test-kmp',
    title: 'Explore InkLite & Pipboy',
    description: 'Review InkLite text engine and Pipboy AI desktop assistant.',
    xp: 75,
    completed: false
  },
  {
    id: 'q-view-hackathons',
    title: 'Explore Hackathons & Leadership',
    description: 'Review Smart India Hackathon Top 100 merit, Adobe Hackathon, and Campus Ambassador roles.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-download-resume',
    title: 'Download Official Resume',
    description: 'Download Digvijay_Madhav_Ware_Resume.pdf.',
    xp: 100,
    completed: false
  },
  {
    id: 'q-contact-copilot',
    title: 'Send Contact Inquiry',
    description: 'Dispatch an automated employer inquiry or consult the AI Career Copilot.',
    xp: 125,
    completed: false
  }
];
