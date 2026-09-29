export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  techStack: string[];
  summary: string;
  bulletPoints: string[];
  githubUrl: string;
  highlightStat: string;
  category: 'systems' | 'algorithms' | 'ai';
  imageUrl?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    highlight?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  details: string;
  badge: string;
}

export interface Hackathon {
  name: string;
  organizer: string;
  location: string;
  round: string;
  year: string;
  iconName: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  badgeColor: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
}

export interface RecruiterUser {
  name: string;
  company: string;
  role: string;
  confidentialData?: {
    phone: string;
    location: string;
    verifiedEmail: string;
    university: string;
    degree: string;
    availability: string;
  };
}
