// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT
//  Everything on the desktop reads from this file — edit here to update.
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Mohammed Sarfaraz Uddin Nasser',
  short: 'Sarfaraz',
  wordmark: 'sarfaraz.',
  role: 'Frontend Developer · CSE Student',
  tagline: 'CSE Student · Builder · Curious Problem Solver',
  intro:
    'I build modern, responsive web experiences and enjoy turning ideas into interfaces that actually work.',
  location: 'Hyderabad, India',
  phone: '+91-6305530645',
  email: 'sarfarazuddin9999@gmail.com',
  linkedin: 'https://linkedin.com/in/mdsarfarazuddin',
  github: 'https://github.com/MohammedSarfaraz-droid',
  githubUser: 'MohammedSarfaraz-droid',
};

export const RESUME_URL = 'https://drive.google.com/file/d/112Ls9OAmHJSxDiNvz45dzsH1WBsCBaYr/view?usp=sharing';

// ── About ────────────────────────────────────────────────────────────────────
export const ABOUT_STORY = [
  "I started coding out of curiosity. I initially joined a beginner-level course simply to see what programming was about, but that curiosity quickly turned into something much bigger. Along the way, I went from experimenting with small interfaces to working as a frontend developer intern and building real client-facing websites.",
  "What keeps me hooked is the moment after the struggle — when the bugs are finally resolved, the pieces come together, and the interface behaves exactly the way I imagined. That feeling of turning an idea into something that actually works is what keeps me building.",
  "I've spent a lot of time building and shipping frontend experiences, and AI-assisted development has become a major part of my workflow. I see that as an accelerator rather than the destination. I'm currently strengthening my fundamentals and expanding into backend development, with the goal of becoming comfortable across the MERN stack before moving deeper into cloud technologies and AI.",
];

// ── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  slug: string;
  name: string;
  tagline: string;
  kind: 'Personal Project' | 'Hackathon Project' | 'Professional / Client Work';
  category: 'personal' | 'client';
  role: string;
  date: string;
  description: string;
  features?: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  accent: string; // tailwind gradient classes
  note?: string;
  caseStudy?: {
    problem: string;
    concept: string;
    technology: string;
    learned: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: 'safespeak',
    name: 'SafeSpeak',
    tagline: 'Anonymous multilingual peer-support platform',
    kind: 'Hackathon Project',
    category: 'personal',
    role: 'Frontend Developer · SPEC Industry Hack 2026',
    date: '2026 · 24-hour national hackathon',
    description:
      'SafeSpeak is an anonymous multilingual peer-support platform designed around private conversations, language-based matching, real-time communication and user safety. It was designed and shipped within 24 hours at SPEC Industry Hack 2026, a national-level hackathon.',
    features: [
      'Anonymous user flow',
      'Language-based peer matching',
      'Real-time conversations',
      'English ↔ Hindi translation',
      'Safety & moderation checks',
      'Reporting functionality',
    ],
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Next.js', 'Firebase', 'Google Translation API', 'Vercel'],
    liveUrl: 'https://spih-146.vercel.app/',
    githubUrl: 'https://github.com/MohammedSarfaraz-droid/SafeSpeak.git',
    image: '/images/shot-safespeak.jpg',
    accent: 'from-teal-500 to-indigo-500',
    note: 'Firebase was new to me at this hackathon — I learned it while building, with guidance, until the full flow worked.',
    caseStudy: {
      problem:
        'Students often hesitate to reach out for support because of identity, stigma, or language barriers. We wanted a space where someone could talk to a peer anonymously, in the language they are most comfortable with, without creating an account trail.',
      concept:
        'An anonymous, language-first peer-support platform: you pick a language, get matched with a peer, and talk in real time. Translation bridges English ↔ Hindi conversations, and safety checks plus reporting keep the space respectful.',
      technology:
        'Next.js front end styled with Tailwind CSS. Firebase Authentication powers the anonymous sign-in flow, Firebase Realtime Database carries the live conversations, and the Google Translation API handles English ↔ Hindi translation. Deployed on Vercel.',
      learned:
        'SafeSpeak was especially valuable because it was my first serious hands-on experience with Firebase. I had to work with authentication, realtime data and backend-connected functionality under hackathon time pressure. I learned by implementing the requirements step by step and validating everything until the complete flow worked.',
    },
  },
  {
    slug: 'lumenoor',
    name: 'LumeNoor',
    tagline: 'Agency landing page for web-development services',
    kind: 'Personal Project',
    category: 'personal',
    role: 'Design & Frontend',
    date: '2025',
    description:
      'A modern agency website designed to present web-development services to small and medium-sized businesses through a polished, conversion-focused interface.',
    features: [
      'Conversion-focused hero & sections',
      'Service offering presentation',
      'Fully responsive layout',
      'Fast static deployment on Vercel',
    ],
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Next.js', 'Vercel'],
    liveUrl: 'https://lumenoor.com/',
    githubUrl: 'https://github.com/MohammedSarfaraz-droid/LumeNoor.git',
    image: '/images/shot-lumenoor.jpg',
    accent: 'from-amber-500 to-orange-400',
  },
  {
    slug: 'nickcontractor',
    name: 'Nick Contractor',
    tagline: 'General contractor company website',
    kind: 'Professional / Client Work',
    category: 'client',
    role: 'Frontend Developer · AM Software Solutions',
    date: '2026',
    description:
      'A production marketing website for a general contracting business — designed to present services, build trust with homeowners, and convert visitors into enquiries.',
    tech: ['HTML', 'Tailwind CSS', 'Next.js', 'Vercel'],
    liveUrl: 'https://www.nickcontractor.com/',
    image: '/images/shot-nick.jpg',
    accent: 'from-slate-600 to-sky-600',
  },
  {
    slug: 'gutamaroofing',
    name: 'Gutama Roofing',
    tagline: 'Roofing company website',
    kind: 'Professional / Client Work',
    category: 'client',
    role: 'Frontend Developer · AM Software Solutions',
    date: '2026',
    description:
      'A brand-aligned website for a New Jersey roofing company with a focus on clear service presentation, credibility, and mobile-friendly enquiry flows.',
    tech: ['HTML', 'Tailwind CSS', 'Next.js', 'Vercel'],
    liveUrl: 'https://www.gutamaroofingnj.com/',
    image: '/images/shot-gutama.jpg',
    accent: 'from-blue-700 to-red-500',
  },
  {
    slug: 'topcoat',
    name: 'Topcoat LLC',
    tagline: 'Painting company website',
    kind: 'Professional / Client Work',
    category: 'client',
    role: 'Frontend Developer · AM Software Solutions',
    date: '2026',
    description:
      'A clean, bright website for a residential painting company — emphasis on visual freshness, service clarity, and quick contact paths.',
    tech: ['HTML', 'Tailwind CSS', 'Next.js', 'Vercel'],
    liveUrl: 'https://www.topcoat-llc.com/',
    image: '/images/shot-topcoat.jpg',
    accent: 'from-emerald-600 to-lime-500',
  },
];

export const CLIENT_WORK_NOTE =
  'Selected client work — a few examples from the many websites built while working part-time as a Frontend Developer at AM Software Solutions.';

// ── Experience ────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: 'AM Software Solutions',
    role: 'Frontend Developer — Part-time',
    period: 'February 2026 — Present',
    current: true,
    bullets: [
      'Build client-ready websites that showcase design ideas and help win projects.',
      'Develop modern frontend interfaces with HTML, CSS, JavaScript and Next.js.',
      'Create responsive, pixel-accurate interfaces with Tailwind CSS and shadcn/ui.',
      'Optimize performance and responsiveness across devices.',
      'Use Git and GitHub for version control and collaboration.',
      'Use AI-assisted development tools to accelerate implementation and problem-solving.',
      'Work with small businesses to create brand-aligned web experiences.',
      'Deliver production websites using modern deployment workflows.',
    ],
    footer: 'Selected client work: Nick Contractor · Gutama Roofing · Topcoat LLC',
  },
  {
    company: 'CoffeeMustache',
    role: 'Frontend Developer Intern',
    period: 'September 2025 — November 2025',
    current: false,
    bullets: [
      'Contributed to the development of a café-focused POS system as a frontend developer.',
      'Collaborated with backend developers to integrate APIs and maintain smooth data flow.',
      'Rebuilt the landing page using Next.js.',
      'Improved the UI/UX significantly through a modern redesign.',
      'Revamped the POS interface to create a more polished and intuitive experience.',
    ],
    footer: 'Self-estimated UI/UX improvement: ~70%',
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    title: 'Bachelor of Engineering',
    field: 'Computer Science Engineering',
    school: 'ISL Engineering College',
    period: '2024 — 2028',
    status: '3rd Year Student',
  },
  {
    title: 'Intermediate Education',
    field: 'PCM',
    school: 'Shaheen Junior College',
    period: '2023 — 2024',
    status: 'Completed',
  },
  {
    title: 'Schooling',
    field: 'SSC',
    school: 'All Saints High School, Abids',
    period: 'Completed 2022',
    status: 'Completed',
  },
];

// ── Skills (Activity Monitor) ─────────────────────────────────────────────────
export type SkillStatus = 'Active' | 'Project experience' | 'Learning' | 'Next';
export interface SkillGroup {
  label: string;
  tab: 'frontend' | 'tools';
  status: SkillStatus;
  items: string[];
}
export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Core', tab: 'frontend', status: 'Active', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
  { label: 'UI / Styling', tab: 'frontend', status: 'Active', items: ['Tailwind CSS', 'Bootstrap', 'Shadcn UI', 'Responsive UI'] },
  { label: 'Backend / APIs', tab: 'frontend', status: 'Project experience', items: ['REST APIs', 'Firebase — introductory project experience'] },
  { label: 'Development', tab: 'tools', status: 'Active', items: ['Git', 'GitHub', 'Vercel'] },
  { label: 'Currently Learning', tab: 'tools', status: 'Learning', items: ['Node.js', 'Express', 'MongoDB', 'Backend architecture'] },
  { label: 'Next', tab: 'tools', status: 'Next', items: ['Cloud', 'AI / AI-assisted systems'] },
];

// ── Achievements ───────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    title: 'Runner-Up — Hack4SDG',
    org: 'AIESEC × IIT Hyderabad',
    detail: 'National-level hackathon focused on Sustainable Development Goals.',
    place: '2nd Place',
    prize: '₹10,000',
    highlight: true,
  },
  {
    title: 'SPEC Industry Hack 2026',
    org: '24-hour national-level hackathon',
    detail: 'Built SafeSpeak — anonymous multilingual peer-support platform.',
    place: 'Participant',
    prize: null,
    highlight: false,
  },
];

// ── Certificates ──────────────────────────────────────────────────────────────
export const CERTIFICATES = [
  {
    name: 'Siasat Frontend Development Course',
    issuer: 'Siasat',
    detail: 'Completed a structured beginner-to-builder frontend development course covering HTML, CSS, JavaScript and modern tooling.',
    file: '/images/siasat-React-certificate.jpeg',
  },
  {
    name: 'SPEC Industry Hack 2026 — Participation',
    issuer: 'SPEC',
    detail: 'Participation certificate for the 24-hour national-level hackathon where SafeSpeak was built.',
    file: '/images/IndustryHack2026_Certificate_Mohammed_Sarfaraz_uddin_Nasser.png',
  },
  {
    name: 'Hack4SDG Participation Certificate',
    issuer: 'AIESEC × IIT Hyderabad',
    detail: 'Participation certificate from Hack4SDG, a national-level hackathon focused on Sustainable Development Goals.',
    file: '/images/Hack4sdg-participation.jpeg',
  },
];

// ── Notes ─────────────────────────────────────────────────────────────────────
export const NOTES = [
  {
    title: 'Currently Building',
    date: 'Today',
    body: 'Strengthening my backend fundamentals and working toward becoming comfortable with the MERN stack.',
  },
  {
    title: 'Next Chapter',
    date: 'This year',
    body: 'Backend → Cloud → AI',
  },
  {
    title: 'Why I Build',
    date: 'Pinned',
    body: 'There is something satisfying about struggling with a problem for hours and then finally watching everything work exactly the way it was supposed to.',
  },
];
