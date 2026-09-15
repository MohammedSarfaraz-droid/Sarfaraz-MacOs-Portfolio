import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// ── App registry ─────────────────────────────────────────────────────────────
export type AppId =
  | 'finder'
  | 'welcome'
  | 'about'
  | 'terminal'
  | 'skills'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'resume'
  | 'safari'
  | 'github'
  | 'photos'
  | 'notes'
  | 'contact'
  | 'settings'
  | 'project'
  | 'certificate';

export interface AppMeta {
  title: string;
  icon: string;
  size: { w: number; h: number };
}

export const APP_META: Record<AppId, AppMeta> = {
  finder: { title: 'Finder', icon: 'finder', size: { w: 940, h: 600 } },
  welcome: { title: 'Welcome', icon: 'finder', size: { w: 600, h: 470 } },
  about: { title: 'About Sarfaraz', icon: 'about', size: { w: 660, h: 580 } },
  terminal: { title: 'sarfaraz@MacBook — zsh', icon: 'terminal', size: { w: 700, h: 460 } },
  skills: { title: 'Activity Monitor', icon: 'activity', size: { w: 860, h: 580 } },
  experience: { title: 'Experience', icon: 'briefcase', size: { w: 760, h: 600 } },
  education: { title: 'Education', icon: 'graduation', size: { w: 640, h: 560 } },
  achievements: { title: 'Achievements', icon: 'trophy', size: { w: 660, h: 580 } },
  resume: { title: 'Resume', icon: 'pdf', size: { w: 860, h: 620 } },
  safari: { title: 'Safari', icon: 'safari', size: { w: 1060, h: 680 } },
  github: { title: 'GitHub', icon: 'github', size: { w: 800, h: 620 } },
  photos: { title: 'Photos', icon: 'photos', size: { w: 940, h: 620 } },
  notes: { title: 'Notes', icon: 'notes', size: { w: 800, h: 540 } },
  contact: { title: 'Mail — New Message', icon: 'mail', size: { w: 700, h: 600 } },
  settings: { title: 'System Settings', icon: 'settings', size: { w: 680, h: 590 } },
  project: { title: 'Project', icon: 'folder', size: { w: 920, h: 630 } },
  certificate: { title: 'Certificate', icon: 'doc', size: { w: 640, h: 550 } },
};

// ── Settings ─────────────────────────────────────────────────────────────────
export interface Settings {
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  focus: boolean;
  brightness: number; // 0.4 – 1
  volume: number; // 0 – 1
  animations: boolean;
  sounds: boolean;
  reduceMotion: boolean;
  dockMagnify: boolean;
}

export const defaultSettings = (): Settings => ({
  wifi: true,
  bluetooth: false,
  airdrop: true,
  focus: false,
  brightness: 1,
  volume: 0.6,
  animations: true,
  sounds: true,
  reduceMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  dockMagnify: true,
});

// ── Context ──────────────────────────────────────────────────────────────────
export interface OSContextValue {
  openApp: (app: AppId, payload?: any) => void;
  closeAll?: () => void;
  isMobile: boolean;
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  sayGoodbye?: () => void;
}

export const OSContext = createContext<OSContextValue>({
  openApp: () => undefined,
  isMobile: false,
  settings: defaultSettings(),
  setSetting: () => undefined,
});

export function useOS() {
  return useContext(OSContext);
}

export function OSProvider({
  value,
  children,
}: {
  value: OSContextValue;
  children: ReactNode;
}) {
  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

// ── Hooks ────────────────────────────────────────────────────────────────────
export function useNow(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    setMatches(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
