import { useEffect, useRef, useState } from 'react';
import type { AppId } from '../os/os';
import { useOS } from '../os/os';
import { PROFILE, PROJECTS } from '../data/portfolio';

interface Line {
  kind: 'cmd' | 'out' | 'pre';
  text: string;
  cls?: string;
}

const PROMPT = 'sarfaraz@MacBook ~ %';

const NEOFETCH_ART = [
  "                    'c.",
  '                 ,xNMM.',
  '               .OMMMMo',
  '               OMMM0,',
  "     .;loddo:' loolloddol;.",
  '   cKMMMMMMMMMMNWMMMMMMMMMM0:',
  ' .KMMMMMMMMMMMMMMMMMMMMMMMWd.',
  ' XMMMMMMMMMMMMMMMMMMMMMMMX.',
  ';MMMMMMMMMMMMMMMMMMMMMMMM:',
  ':MMMMMMMMMMMMMMMMMMMMMMMM:',
  '.MMMMMMMMMMMMMMMMMMMMMMMMX.',
  ' kMMMMMMMMMMMMMMMMMMMMMMMMWd.',
  " .XMMMMMMMMMMMMMMMMMMMMMMMMMMk",
  "  .XMMMMMMMMMMMMMMMMMMMMMMMMK.",
  '    kMMMMMMMMMMMMMMMMMMMMMMd',
  '     ;KMMMMMMMWXXWMMMMMMMk.',
  "       .cooc,.    .,coo:.",
];

const NEOFETCH_COLORS = [
  'text-emerald-400', 'text-emerald-400', 'text-yellow-300', 'text-yellow-300',
  'text-orange-400', 'text-orange-400', 'text-red-400', 'text-red-400',
  'text-fuchsia-400', 'text-fuchsia-400', 'text-purple-400', 'text-purple-400',
  'text-sky-400', 'text-sky-400', 'text-blue-400', 'text-blue-400', 'text-gray-400',
];

const NEOFETCH_INFO = [
  'sarfaraz@MacBook',
  '───────────────────────────',
  'OS: SarfarazOS 26.0',
  'Host: Hyderabad, India',
  'Role: Frontend Developer',
  'Stack: React / Next.js / Tailwind',
  'Learning: Node · Express · MongoDB',
  'Status: Learning + Building',
  'Mission: MERN → Cloud → AI',
  'Shell: zsh (portfolio edition)',
  'Uptime: since 2024-ish',
];

export default function Terminal() {
  const { openApp } = useOS();
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'Last login: ' + new Date().toDateString() + ' on ttys000', cls: 'text-gray-500' },
    { kind: 'out', text: "Welcome to SarfarazOS. Type 'help' to see what this shell can do.", cls: 'text-gray-400' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  const out = (text: string, cls?: string): Line => ({ kind: 'out', text, cls });
  const outBlock = (arr: string[], cls?: string): Line[] => arr.map((t) => out(t, cls));

  const run = (raw: string) => {
    const cmd = raw.trim();
    const base: Line[] = cmd ? [{ kind: 'cmd', text: cmd }] : [];
    if (!cmd) {
      setLines((l) => [...l, { kind: 'cmd', text: '' }]);
      return;
    }
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);

    const lower = cmd.toLowerCase();
    let res: Line[] = [];

    if (lower === 'clear') {
      setLines([]);
      return;
    } else if (lower === 'help') {
      res = outBlock([
        'Available commands:',
        '  help        this list',
        '  about       who is Sarfaraz',
        '  skills      tech stack & what is being learned',
        '  projects    showcased work',
        '  experience  where he has worked',
        '  education   the formal route',
        '  contact     how to reach him',
        '  github      open the GitHub profile',
        '  open <app>  open any app (e.g. open safespeak)',
        '  whoami      identity check',
        '  ls          list this workspace',
        '  neofetch    system summary',
        '  clear       wipe the terminal',
      ], 'text-gray-300');
    } else if (lower === 'whoami') {
      res = outBlock([PROFILE.name, 'Frontend Developer', PROFILE.location], 'text-gray-200');
    } else if (lower === 'about') {
      res = outBlock([
        'Frontend Developer · CSE Student from Hyderabad, India.',
        'Started coding out of curiosity — now ships real client-facing websites.',
        'Currently: strengthening fundamentals + expanding into backend (MERN).',
        'Next: cloud technologies and AI.',
      ], 'text-gray-300');
    } else if (lower === 'skills') {
      res = outBlock([
        'Core............... HTML · CSS · JavaScript · React · Next.js',
        'UI / Styling....... Tailwind CSS · Bootstrap · Shadcn UI · Responsive UI',
        'Backend / APIs..... REST APIs · Firebase (introductory, project experience)',
        'Development........ Git · GitHub · Vercel',
        'Currently learning. Node.js · Express · MongoDB · Backend architecture',
        'Next............... Cloud · AI / AI-assisted systems',
      ], 'text-gray-300');
    } else if (lower === 'projects') {
      res = outBlock(
        [
          '1. SafeSpeak ....... anonymous multilingual peer support — spih-146.vercel.app',
          '2. LumeNoor ........ agency landing page — lumenoor.vercel.app',
          '3. Nick Contractor . client site — nickcontractor.com',
          '4. Gutama Roofing .. client site — gutamaroofingnj.com',
          '5. Topcoat LLC ..... client site — topcoat-llc.com',
          '',
          "Tip: 'open safespeak' opens its full case study.",
        ],
        'text-gray-300'
      );
    } else if (lower === 'experience') {
      res = outBlock([
        'AM Software Solutions — Frontend Developer (Part-time)',
        '  Feb 2026 — Present · client-ready websites with Next.js + Tailwind',
        '',
        'CoffeeMustache — Frontend Developer Intern',
        '  Sep 2025 — Nov 2025 · café POS frontend, API integration, Next.js redesign',
      ], 'text-gray-300');
    } else if (lower === 'education') {
      res = outBlock([
        'B.E. Computer Science Engineering — ISL Engineering College (2024–2028, 3rd year)',
        'Intermediate (PCM) — Shaheen Junior College (2023–2024)',
        'All Saints High School, Abids — 2022',
      ], 'text-gray-300');
    } else if (lower === 'contact') {
      res = outBlock([
        `Email .... ${PROFILE.email}`,
        `Phone .... ${PROFILE.phone}`,
        'LinkedIn . linkedin.com/in/mdsarfarazuddin',
        'GitHub ... github.com/MohammedSarfaraz-droid',
        '',
        "Or type 'open contact' for the friendly version.",
      ], 'text-gray-300');
    } else if (lower === 'github') {
      window.open(PROFILE.github, '_blank', 'noreferrer');
      res = outBlock(['Opening github.com/MohammedSarfaraz-droid …'], 'text-emerald-300');
    } else if (lower === 'ls' || lower === 'ls -la') {
      res = outBlock([PROJECTS.map((p) => p.name).join('   '), 'About.txt   Resume.pdf   Experience   Education   Skills.app   Achievements'], 'text-gray-300');
    } else if (lower === 'neofetch') {
      res = NEOFETCH_ART.map((art, i) => ({
        kind: 'pre' as const,
        text: art.padEnd(36, ' ') + (NEOFETCH_INFO[i] ?? ''),
        cls: NEOFETCH_COLORS[i] ?? 'text-gray-400',
      }));
    } else if (lower === 'sudo hire-sarfaraz' || lower === 'hire' || lower === 'sudo hire sarfaraz') {
      res = outBlock(
        [
          '[sudo] password for visitor: ********',
          'Access granted. Learning ability: verified.',
          'Salary expectations: reasonable.',
          'Availability: open to frontend internships & junior roles.',
          "Recommendation from this machine: don't overthink it — run 'contact'.",
        ],
        'text-emerald-300'
      );
      setTimeout(() => openApp('contact'), 900);
    } else if (lower.startsWith('open ')) {
      const target = lower.replace('open ', '').trim().replace(/\s+/g, '');
      const aliases: Record<string, { app: AppId; payload?: any; label: string }> = {
        about: { app: 'about', label: 'About' },
        projects: { app: 'finder', payload: { section: 'projects' }, label: 'Projects' },
        finder: { app: 'finder', label: 'Finder' },
        experience: { app: 'experience', label: 'Experience' },
        education: { app: 'education', label: 'Education' },
        skills: { app: 'skills', label: 'Activity Monitor' },
        activity: { app: 'skills', label: 'Activity Monitor' },
        achievements: { app: 'achievements', label: 'Achievements' },
        resume: { app: 'resume', label: 'Resume' },
        contact: { app: 'contact', label: 'Contact' },
        mail: { app: 'contact', label: 'Mail' },
        safari: { app: 'safari', label: 'Safari' },
        github: { app: 'github', label: 'GitHub' },
        photos: { app: 'photos', label: 'Photos' },
        notes: { app: 'notes', label: 'Notes' },
        settings: { app: 'settings', label: 'Settings' },
        certificates: { app: 'finder', payload: { section: 'certificates' }, label: 'Certificates' },
      };
      PROJECTS.forEach((p) => {
        aliases[p.slug] = { app: 'project', payload: { slug: p.slug }, label: p.name };
        aliases[p.name.toLowerCase().replace(/\s+/g, '')] = { app: 'project', payload: { slug: p.slug }, label: p.name };
      });
      const hit = aliases[target];
      if (hit) {
        openApp(hit.app, hit.payload);
        res = outBlock([`Opening ${hit.label} …`], 'text-emerald-300');
      } else {
        res = outBlock([`The application “${target}” does not exist. Try 'ls' or 'help'.`], 'text-red-300');
      }
    } else if (lower === 'exit' || lower === 'quit') {
      res = outBlock(['Nice try. This shell has nowhere to exit to.'], 'text-gray-400');
    } else {
      res = [out(`zsh: command not found: ${cmd.split(' ')[0]}`, 'text-red-300')];
    }

    setLines((l) => [...l, ...base, ...res]);
  };

  return (
    <div
      className="h-full flex flex-col bg-[#101016]/[0.98] text-[#e8e8f0] font-mono text-[12.5px] leading-[1.55]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto mac-scroll dark-scroll px-3.5 py-3">
        {lines.map((l, i) =>
          l.kind === 'cmd' ? (
            <div key={i} className="break-words">
              <span className="text-emerald-400">sarfaraz@MacBook</span>
              <span className="text-gray-500"> </span>
              <span className="text-sky-300">~</span>
              <span className="text-gray-400"> % </span>
              <span className="text-gray-100">{l.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className={`${l.kind === 'pre' ? 'whitespace-pre text-[11px] leading-[1.25]' : 'whitespace-pre-wrap break-words'} ${l.cls ?? ''}`}
            >
              {l.text}
            </div>
          )
        )}
        <div className="flex">
          <span className="text-emerald-400 shrink-0">sarfaraz@MacBook</span>
          <span className="text-gray-500">&nbsp;</span>
          <span className="text-sky-300 shrink-0">~</span>
          <span className="text-gray-400 shrink-0">&nbsp;%&nbsp;</span>
          <span className="text-gray-100 whitespace-pre-wrap break-all">{input}</span>
          <span className="terminal-caret inline-block w-[7px] h-[15px] translate-y-[2px] bg-gray-300/90" />
        </div>
      </div>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            run(input);
            setInput('');
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length) {
              const n = Math.min(hIdx + 1, history.length - 1);
              setHIdx(n);
              setInput(history[n]);
            }
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const n = hIdx - 1;
            if (n < 0) {
              setHIdx(-1);
              setInput('');
            } else {
              setHIdx(n);
              setInput(history[n]);
            }
          } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
          }
        }}
        className="absolute opacity-0 pointer-events-none w-px h-px"
        aria-label="Terminal input"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}

export { PROMPT };
