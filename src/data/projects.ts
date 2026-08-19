import pyvisual from '../assets/images/pyvisual.png';
import pysimverse from '../assets/images/pysimverse.png';
import pvdeveloper from '../assets/images/pvdeveloper.png';
import pysimverseLms from '../assets/images/Lms.png';
import lmsAdmin from '../assets/images/lms-admin.png';
import advokateDesk from '../assets/images/AdvokateDesk.png';
import knowbaseAi from '../assets/images/knowbaseAi.png';
import bilingual from '../assets/images/Bilingual.png';
import penalCodes from '../assets/images/PenalCodes.png';
import statutes from '../assets/images/Statutes.png';
import lawyers from '../assets/images/lawyers.png';

export type ProjectCategory = 'all' | 'developer-tools' | 'legal-tech';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Exclude<ProjectCategory, 'all'>;
  featured?: boolean;
  url?: string;
  tags: string[];
}

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'developer-tools', label: 'Developer Tools & AI' },
  { id: 'legal-tech', label: 'Legal Tech Platform' },
];

export const projects: Project[] = [
  {
    id: 'pyvisual',
    title: 'PyVisual',
    description:
      'Python GUI drag-and-drop builder. Design UIs visually and export clean Python code — with an integrated AI agent (PV Developer) that authors logic directly inside the editor.',
    image: pyvisual,
    category: 'developer-tools',
    featured: true,
    url: 'https://pyvisual.co',
    tags: ['Python', 'AI Agent', 'GUI Builder'],
  },
  {
    id: 'pysimverse',
    title: 'PySimverse',
    description:
      'Unity-based Python drone simulation environment for rapid prototyping and testing of autonomous behaviors and control algorithms.',
    image: pysimverse,
    category: 'developer-tools',
    featured: true,
    url: 'https://pysimverse.com',
    tags: ['Python', 'Unity', 'Simulation'],
  },
  {
    id: 'pv-developer',
    title: 'PV Developer',
    description:
      'AI agent inside PyVisual that writes Python logic from natural-language prompts — accelerating UI-to-logic development and automating repetitive coding tasks.',
    image: pvdeveloper,
    category: 'developer-tools',
    featured: true,
    tags: ['LLM', 'OpenAI', 'Code Generation'],
  },
  {
    id: 'pysimverse-lms',
    title: 'PySimverse LMS',
    description:
      'Full learning management system where users watch tutorials, enroll in courses, and track progress from start to completion.',
    image: pysimverseLms,
    category: 'developer-tools',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'lms-admin',
    title: 'PySimverse LMS Admin',
    description:
      'Admin dashboard to manage users, courses, and content with centralized platform operations and analytics.',
    image: lmsAdmin,
    category: 'developer-tools',
    tags: ['React', 'Admin Panel', 'REST APIs'],
  },
  {
    id: 'advokate-desk',
    title: 'Advokate Desk',
    description:
      'Legal productivity platform for organizing case workflows, references, and daily operational tasks for law professionals.',
    image: advokateDesk,
    category: 'legal-tech',
    tags: ['MERN', 'Legal Tech', 'Workflows'],
  },
  {
    id: 'knowbase-ai',
    title: 'Knowbase AI',
    description:
      'AI-assisted knowledge base that helps users quickly retrieve, summarize, and understand domain-specific legal information.',
    image: knowbaseAi,
    category: 'legal-tech',
    tags: ['RAG', 'LLM', 'Knowledge Base'],
  },
  {
    id: 'bilingual',
    title: 'Bilingual Assistant',
    description:
      'Bilingual experience for legal and knowledge workflows — making key information accessible across multiple languages.',
    image: bilingual,
    category: 'legal-tech',
    tags: ['i18n', 'Legal Tech', 'UX'],
  },
  {
    id: 'statutes',
    title: 'Statutes Explorer',
    description:
      'Structured statutes browsing interface designed to speed up legal research and improve discoverability of provisions.',
    image: statutes,
    category: 'legal-tech',
    tags: ['Legal Research', 'Search', 'MERN'],
  },
  {
    id: 'penal-codes',
    title: 'Penal Codes Explorer',
    description:
      'Legal reference module for navigating penal code content with clearer categorization and faster lookup patterns.',
    image: penalCodes,
    category: 'legal-tech',
    tags: ['Legal Tech', 'Reference', 'MERN'],
  },
  {
    id: 'lawyers',
    title: 'Lawyers Module',
    description:
      'Lawyer-centric feature area supporting profile visibility, legal context access, and day-to-day professional workflows.',
    image: lawyers,
    category: 'legal-tech',
    tags: ['MERN', 'Profiles', 'Legal Tech'],
  },
];
