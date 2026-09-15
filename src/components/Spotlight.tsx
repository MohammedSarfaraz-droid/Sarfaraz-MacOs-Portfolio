import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { AppId } from '../os/os';
import { useOS } from '../os/os';
import { AppIcon } from './icons';
import type { IconKind } from './icons';
import { PROJECTS } from '../data/portfolio';

export interface SpotItem {
  title: string;
  subtitle: string;
  icon: IconKind;
  keywords: string[];
  open: { app: AppId; payload?: any };
}

export const SPOTLIGHT_ITEMS: SpotItem[] = [
  { title: 'About Me', subtitle: 'Application', icon: 'about', keywords: ['about', 'bio', 'sarfaraz', 'story', 'who'], open: { app: 'about' } },
  { title: 'Projects', subtitle: 'Finder — Selected Work', icon: 'folder', keywords: ['projects', 'work', 'finder', 'portfolio', 'safe'], open: { app: 'finder', payload: { section: 'projects' } } },
  ...PROJECTS.map<SpotItem>((p) => ({
    title: p.name,
    subtitle: `Project — ${p.kind}`,
    icon: 'folder',
    keywords: [
      p.slug,
      'project',
      p.category === 'client' ? 'client am software' : 'personal',
      ...p.name.toLowerCase().split(' '),
      ...p.tech.map((t) => t.toLowerCase()),
    ],
    open: { app: 'project', payload: { slug: p.slug } },
  })),
  { title: 'Experience', subtitle: 'Application', icon: 'briefcase', keywords: ['experience', 'work', 'intern', 'coffee', 'am software', 'job'], open: { app: 'experience' } },
  { title: 'Education', subtitle: 'Application', icon: 'graduation', keywords: ['education', 'college', 'degree', 'cse', 'school', 'isl'], open: { app: 'education' } },
  { title: 'Activity Monitor — Skills', subtitle: 'Application', icon: 'activity', keywords: ['skills', 'react', 'next', 'tailwind', 'javascript', 'html', 'css', 'firebase', 'learning', 'stack'], open: { app: 'skills' } },
  { title: 'Achievements', subtitle: 'Application', icon: 'trophy', keywords: ['achievement', 'hack4sdg', 'award', 'runner', 'trophy', 'prize', 'hackathon'], open: { app: 'achievements' } },
  { title: 'Certificates', subtitle: 'Finder — Folder', icon: 'doc', keywords: ['certificate', 'course', 'siasat', 'spec'], open: { app: 'finder', payload: { section: 'certificates' } } },
  { title: 'Resume', subtitle: 'Application', icon: 'pdf', keywords: ['resume', 'cv', 'download', 'pdf'], open: { app: 'resume' } },
  { title: 'Safari — Selected Work', subtitle: 'Application', icon: 'safari', keywords: ['safari', 'browser', 'websites', 'demo', 'live'], open: { app: 'safari' } },
  { title: 'Terminal', subtitle: 'Application', icon: 'terminal', keywords: ['terminal', 'shell', 'zsh', 'command', 'neofetch', 'sudo'], open: { app: 'terminal' } },
  { title: 'GitHub', subtitle: 'Application', icon: 'github', keywords: ['github', 'repos', 'code', 'git'], open: { app: 'github' } },
  { title: 'Photos', subtitle: 'Application', icon: 'photos', keywords: ['photos', 'screenshots', 'images', 'gallery'], open: { app: 'photos' } },
  { title: 'Notes', subtitle: 'Application', icon: 'notes', keywords: ['notes', 'building', 'why', 'thoughts'], open: { app: 'notes' } },
  { title: 'Contact — Mail', subtitle: 'Application', icon: 'mail', keywords: ['contact', 'email', 'mail', 'phone', 'linkedin', 'hire'], open: { app: 'contact' } },
  { title: 'System Settings', subtitle: 'Application', icon: 'settings', keywords: ['settings', 'preferences', 'appearance', 'brightness'], open: { app: 'settings' } },
];

export function filterSpotlight(q: string): SpotItem[] {
  const query = q.trim().toLowerCase();
  if (!query) return SPOTLIGHT_ITEMS;
  return SPOTLIGHT_ITEMS.filter((it) => {
    const hay = `${it.title} ${it.subtitle} ${it.keywords.join(' ')}`.toLowerCase();
    return query.split(/\s+/).every((tok) => hay.includes(tok));
  });
}

export default function Spotlight({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { openApp } = useOS();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => filterSpotlight(q), [q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);
  useEffect(() => setIdx(0), [q]);

  const run = (item: SpotItem) => {
    openApp(item.open.app, item.open.payload);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[220] flex justify-center pt-[16vh] bg-black/10 backdrop-blur-[2px]"
          onPointerDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="w-[min(620px,92vw)] h-fit rounded-2xl bg-white/85 backdrop-blur-2xl ring-1 ring-black/10 shadow-2xl overflow-hidden"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 h-[52px] border-b border-black/[0.06]">
              <Search size={19} className="text-gray-400 shrink-0" strokeWidth={2.2} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setIdx((i) => Math.min(i + 1, results.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setIdx((i) => Math.max(i - 1, 0));
                  } else if (e.key === 'Enter' && results[idx]) {
                    run(results[idx]);
                  } else if (e.key === 'Escape') {
                    onClose();
                  }
                }}
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent text-[17px] text-gray-800 placeholder:text-gray-400"
                aria-label="Spotlight Search"
              />
            </div>
            <div className="max-h-[330px] overflow-y-auto mac-scroll p-1.5">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-gray-400">No Results</p>
              )}
              {results.slice(0, 9).map((it, i) => (
                <button
                  key={it.title}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => run(it)}
                  className={`w-full flex items-center gap-3 px-2.5 py-[7px] rounded-[9px] text-left transition-colors ${
                    i === idx ? 'bg-[#0a64e4] text-white' : 'text-gray-800'
                  }`}
                >
                  <AppIcon kind={it.icon} size={30} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-medium truncate">{it.title}</span>
                    <span className={`block text-[11px] truncate ${i === idx ? 'text-white/75' : 'text-gray-400'}`}>
                      {it.subtitle}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="px-4 py-1.5 border-t border-black/[0.06] text-[10.5px] text-gray-400 flex justify-between">
              <span>sarfaraz.</span>
              <span>↑↓ navigate · ↵ open · esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
