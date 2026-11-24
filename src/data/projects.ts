import advokateDesk from '../assets/images/AdvokateDesk.png';
import bilingual from '../assets/images/Bilingual.png';
import knowbaseAi from '../assets/images/knowbaseAi.png';
import lawyers from '../assets/images/lawyers.png';
import lms from '../assets/images/Lms.png';
import lmsAdmin from '../assets/images/lms-admin.png';
import penalCodes from '../assets/images/PenalCodes.png';
import pvdeveloper from '../assets/images/pvdeveloper.png';
import pysimverse from '../assets/images/pysimverse.png';
import statutes from '../assets/images/Statutes.png';

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  outcomes: string[];
  stack: string[];
  links: { live?: string; github?: string };
  cover: string;
  images: string[];
  badge?: string;
  accent: string;
  featured: boolean;
  hero?: boolean;
  year: number;
  type: string;
};

export const projects: Project[] = [
  {
    id: 'pyvisual',
    name: 'Pyvisual',
    tagline: 'Python GUI builder developers can export and own',
    description:
      'Drag-and-drop Python GUI builder that exports clean code — with an integrated AI agent (PV Developer) that authors logic inside the editor.',
    outcomes: [
      'Visual UI design with exportable Python',
      'PV Developer AI agent for logic generation',
      'Faster path from idea to working desktop UI',
    ],
    stack: ['Python', 'AI Agent', 'OpenAI', 'GUI'],
    links: { live: 'https://pyvisual.co' },
    cover: '/pyvisual-hero.png',
    images: ['/pyvisual-hero.png', pvdeveloper],
    badge: 'Hero project',
    accent: '#FB7185',
    featured: true,
    hero: true,
    year: 2024,
    type: 'Developer Tool',
  },
  {
    id: 'cvzone',
    name: 'Computer Vision Zone',
    tagline: 'Full-stack learning platform for CV, AI, and robotics',
    description:
      'Designed and built Computer Vision Zone (CVZone), a custom MERN rebuild of a large WordPress learning site. Delivered student-facing course/project catalogs, a full LMS player, Academy Pro memberships with Stripe, and an admin panel for content, orders, email campaigns, and analytics — including migration of a large existing user base.',
    outcomes: [
      'Custom MERN rebuild of WordPress/LearnDash/WooCommerce into courses, LMS, and academies',
      'Stripe Checkout for Academy Pro / pre-order memberships, plus auth, orders, and billing',
      'Admin LMS builder, enrollments, sales, email campaigns — scaled for ~500k migrated users',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'DigitalOcean'],
    links: { live: 'https://www.computervision.zone' },
    cover: '/cvzone-hero.png',
    images: ['/cvzone-hero.png'],
    badge: 'CVZone',
    accent: '#06B6D4',
    featured: true,
    year: 2025,
    type: 'EdTech / LMS',
  },
  {
    id: 'pysimverse',
    name: 'Pysimverse',
    tagline: 'Drone simulator with backend, admin, and leaderboard',
    description:
      'Unity-backed Python drone simulation environment for prototyping autonomous behaviors — paired with LMS, admin panel, and competitive leaderboard flows.',
    outcomes: [
      'Simulation environment for control algorithms',
      'LMS for tutorials, enrollment, and progress',
      'Admin dashboard for users, courses, and operations',
    ],
    stack: ['Python', 'Unity', 'React', 'Node.js', 'MongoDB'],
    links: { live: 'https://pysimverse.com' },
    cover: pysimverse,
    images: [pysimverse, lms, lmsAdmin],
    accent: '#A78BFA',
    featured: true,
    year: 2024,
    type: 'Simulation',
  },
  {
    id: 'clipforge',
    name: 'ClipForge',
    tagline: 'Local-first video clipping studio for YouTube Shorts',
    description:
      'Turn long videos into vertical Shorts and schedule them to YouTube — with no paid AI APIs and no mandatory cloud.',
    outcomes: [
      'Zoomable timeline with manual timestamps and auto-detected highlights (audio, silence, scene)',
      '9:16 crop, 1080×1920 export, audio modes, and custom thumbnails',
      'Clip review gate + YouTube OAuth scheduling, job recovery, pytest + GitHub Actions CI',
    ],
    stack: [
      'React',
      'Vite',
      'Tailwind',
      'FastAPI',
      'SQLAlchemy',
      'SQLite',
      'FFmpeg',
      'APScheduler',
    ],
    links: { github: 'https://github.com/Ahmedbruh-5/clipforge' },
    cover: '/clipforge-hero.png',
    images: ['/clipforge-hero.png', '/clipforge-2.png', '/clipforge-3.png'],
    badge: 'Local-first',
    accent: '#F59E0B',
    featured: true,
    year: 2025,
    type: 'Developer Tool',
  },
  {
    id: 'flick',
    name: 'Flick',
    tagline: 'Zero-setup file sharing over LAN or WebRTC P2P',
    description:
      'Send files between devices with no setup. Flick picks the fastest path automatically — LAN or WebRTC peer-to-peer.',
    outcomes: [
      'One screen, two big buttons: Send and Receive',
      'End-to-end encrypted (X25519 + AES-256-GCM)',
      'Web and mobile apps with WebSocket signaling',
    ],
    stack: [
      'React',
      'Vite',
      'Tailwind',
      'React Native/Expo',
      'Node.js',
      'Express',
      'WebSocket',
      'WebRTC',
    ],
    links: { github: 'https://github.com/Ahmedbruh-5/flick' },
    cover: '/flick-hero.png',
    images: ['/flick-hero.png', '/flick3.png', '/flick4.png'],
    badge: 'P2P · Encrypted',
    accent: '#84CC16',
    featured: true,
    year: 2025,
    type: 'Utility',
  },
  {
    id: 'advokate-desk',
    name: 'Advokate Desk',
    tagline: 'Pakistani legal platform with AI and multilingual workflows',
    description:
      'A legal productivity platform for case workflows, statutes, and day-to-day operations — with AI assistance and bilingual support for Pakistani law professionals.',
    outcomes: [
      'AI chatbot + knowledge base for faster legal research',
      'Multilingual experience across key workflows',
      'Modules for statutes, penal codes, and lawyer profiles',
    ],
    stack: ['MERN', 'RAG', 'LLM', 'i18n'],
    links: {},
    cover: advokateDesk,
    images: [advokateDesk, knowbaseAi, bilingual, statutes, penalCodes, lawyers],
    accent: '#67E8F9',
    featured: true,
    year: 2025,
    type: 'Legal Tech',
  },
  // Archive-only
  {
    id: 'pv-developer',
    name: 'PV Developer',
    tagline: 'AI agent inside Pyvisual',
    description: 'Natural-language Python logic generation inside the Pyvisual editor.',
    outcomes: [],
    stack: ['LLM', 'OpenAI'],
    links: {},
    cover: pvdeveloper,
    images: [pvdeveloper],
    accent: '#FB7185',
    featured: false,
    year: 2024,
    type: 'AI',
  },
  {
    id: 'pysimverse-lms',
    name: 'Pysimverse LMS',
    tagline: 'Learning management for simulation courses',
    description: 'Tutorials, enrollment, and progress tracking for Pysimverse.',
    outcomes: [],
    stack: ['React', 'Node.js', 'MongoDB'],
    links: {},
    cover: lms,
    images: [lms],
    accent: '#A78BFA',
    featured: false,
    year: 2024,
    type: 'Education',
  },
  {
    id: 'lms-admin',
    name: 'Pysimverse LMS Admin',
    tagline: 'Admin operations for the LMS',
    description: 'Manage users, courses, and content from one dashboard.',
    outcomes: [],
    stack: ['React', 'REST'],
    links: {},
    cover: lmsAdmin,
    images: [lmsAdmin],
    accent: '#A78BFA',
    featured: false,
    year: 2024,
    type: 'Admin',
  },
  {
    id: 'knowbase-ai',
    name: 'Knowbase AI',
    tagline: 'Legal knowledge retrieval assistant',
    description: 'RAG-assisted knowledge base for domain-specific legal information.',
    outcomes: [],
    stack: ['RAG', 'LLM'],
    links: {},
    cover: knowbaseAi,
    images: [knowbaseAi],
    accent: '#06B6D4',
    featured: false,
    year: 2025,
    type: 'Legal Tech',
  },
  {
    id: 'bilingual',
    name: 'Bilingual Assistant',
    tagline: 'Multilingual legal workflows',
    description: 'Bilingual experience for legal and knowledge workflows.',
    outcomes: [],
    stack: ['i18n', 'UX'],
    links: {},
    cover: bilingual,
    images: [bilingual],
    accent: '#06B6D4',
    featured: false,
    year: 2025,
    type: 'Legal Tech',
  },
  {
    id: 'statutes',
    name: 'Statutes Explorer',
    tagline: 'Faster statute discovery',
    description: 'Structured statutes browsing for legal research.',
    outcomes: [],
    stack: ['MERN', 'Search'],
    links: {},
    cover: statutes,
    images: [statutes],
    accent: '#06B6D4',
    featured: false,
    year: 2025,
    type: 'Legal Tech',
  },
  {
    id: 'penal-codes',
    name: 'Penal Codes Explorer',
    tagline: 'Penal code reference module',
    description: 'Clearer categorization and faster lookup for penal codes.',
    outcomes: [],
    stack: ['MERN'],
    links: {},
    cover: penalCodes,
    images: [penalCodes],
    accent: '#06B6D4',
    featured: false,
    year: 2025,
    type: 'Legal Tech',
  },
  {
    id: 'lawyers',
    name: 'Lawyers Module',
    tagline: 'Lawyer profiles and workflows',
    description: 'Profile visibility and professional workflow support.',
    outcomes: [],
    stack: ['MERN'],
    links: {},
    cover: lawyers,
    images: [lawyers],
    accent: '#06B6D4',
    featured: false,
    year: 2025,
    type: 'Legal Tech',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
