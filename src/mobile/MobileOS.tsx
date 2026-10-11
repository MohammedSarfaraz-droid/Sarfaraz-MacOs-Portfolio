import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BatteryMedium, ChevronLeft, Search, SignalHigh, Wifi } from 'lucide-react';
import type { AppId, Settings } from '../os/os';
import { APP_META, defaultSettings, OSProvider, useNow } from '../os/os';
import { AppIcon } from '../components/icons';
import type { IconKind } from '../components/icons';
import { filterSpotlight } from '../components/Spotlight';
import AppContent from '../apps/AppContent';
import { GoodbyeCard } from '../apps/apps';
import { PROJECTS, CERTIFICATES } from '../data/portfolio';

interface Tile {
  label: string;
  kind: IconKind;
  app?: AppId;
  payload?: any;
  action?: () => void;
}

export default function MobileOS() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));
  const [route, setRoute] = useState<{ app: AppId; payload?: any; k: number } | null>(null);
  const [search, setSearch] = useState(false);
  const [bye, setBye] = useState(false);
  const now = useNow(1000);

  const openApp = (app: AppId, payload?: any) => setRoute({ app, payload, k: Date.now() });

  const tiles: Tile[] = [
    { label: 'About Me', kind: 'about', app: 'about' },
    { label: 'Projects', kind: 'folder', app: 'finder', payload: { section: 'projects' } },
    { label: 'Experience', kind: 'briefcase', app: 'experience' },
    { label: 'Skills', kind: 'activity', app: 'skills' },
    { label: 'Resume', kind: 'pdf', app: 'resume' },
    { label: 'Contact', kind: 'mail', app: 'contact' },
    { label: 'Education', kind: 'graduation', app: 'education' },
    { label: 'Awards', kind: 'trophy', app: 'achievements' },
    { label: 'Photos', kind: 'photos', app: 'photos' },
    { label: 'Notes', kind: 'notes', app: 'notes' },
    { label: 'Terminal', kind: 'terminal', app: 'terminal' },
    { label: 'GitHub', kind: 'github', app: 'github' },
    { label: 'Safari', kind: 'safari', app: 'safari' },
    { label: 'Certificates', kind: 'doc', app: 'finder', payload: { section: 'certificates' } },
    { label: 'Settings', kind: 'settings', app: 'settings' },
    { label: 'Goodbye', kind: 'apple', action: () => setBye(true) },
  ];

  const dock: Tile[] = [
    { label: 'Projects', kind: 'folder', app: 'finder', payload: { section: 'projects' } },
    { label: 'About', kind: 'about', app: 'about' },
    { label: 'Resume', kind: 'pdf', app: 'resume' },
    { label: 'Terminal', kind: 'terminal', app: 'terminal' },
    { label: 'Contact', kind: 'mail', app: 'contact' },
  ];

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M/i, '');
  const bigTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const hour = now.getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const title = useMemo(() => {
    if (!route) return '';
    if (route.app === 'project')
      return PROJECTS.find((p) => p.slug === route.payload?.slug)?.name ?? 'Project';
    if (route.app === 'certificate')
      return CERTIFICATES[route.payload?.index ?? 0]?.name ?? 'Certificate';
    return APP_META[route.app].title;
  }, [route]);

  return (
    <OSProvider
      value={{
        openApp,
        isMobile: true,
        settings,
        setSetting,
        sayGoodbye: () => setBye(true),
      }}
    >
      <div className="fixed inset-0 overflow-hidden select-none">
        <img src="/images/wallpaper.jpg" alt="macOS Sonoma Wallpaper Background" decoding="async" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

        {/* home */}
        <div className="absolute inset-0 flex flex-col">
          <div className="shrink-0 h-11 px-6 flex items-center justify-between text-gray-900">
            <span className="text-[15px] font-semibold tabular-nums">{time}</span>
            <span className="flex items-center gap-1.5">
              <button aria-label="Search" onClick={() => setSearch(true)} className="p-1">
                <Search size={16} strokeWidth={2.2} />
              </button>
              <SignalHigh size={15} />
              <Wifi size={15} />
              <BatteryMedium size={19} />
            </span>
          </div>

          <div className="flex-1 overflow-y-auto mac-scroll pb-32">
            {/* widget */}
            <div className="mx-4 mt-1 rounded-[26px] bg-white/55 backdrop-blur-xl ring-1 ring-white/60 shadow-lg p-5">
              <p className="text-[44px] leading-none font-bold tracking-tight text-gray-900 tabular-nums">
                {bigTime}
              </p>
              <p className="mt-1 text-[13px] text-gray-500">
                {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <div className="mt-3 pt-3 border-t border-black/6">
                <p className="text-[13px] text-gray-500">{greet}, welcome to</p>
                <p className="text-[16px] font-bold text-gray-900">Sarfaraz&apos;s workspace</p>
                <p className="text-[11.5px] text-gray-500">Frontend Developer · CSE Student · Hyderabad</p>
              </div>
            </div>

            {/* grid */}
            <div className="mt-6 px-5 grid grid-cols-4 gap-x-3 gap-y-6">
              {tiles.map((t) => (
                <button
                  key={t.label}
                  onClick={() => (t.action ? t.action() : openApp(t.app!, t.payload))}
                  className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <AppIcon kind={t.kind} size={54} />
                  <span
                    className="text-[10.5px] font-medium text-gray-900/90 leading-tight text-center"
                    style={{ textShadow: '0 1px 4px rgba(255,255,255,.9)' }}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* dock */}
          <div className="absolute bottom-3 inset-x-3 rounded-[26px] bg-white/50 backdrop-blur-xl ring-1 ring-white/60 dock-shadow px-4 py-2.5 flex justify-around">
            {dock.map((t) => (
              <button
                key={t.label}
                aria-label={t.label}
                onClick={() => openApp(t.app!, t.payload)}
                className="active:scale-90 transition-transform"
              >
                <AppIcon kind={t.kind} size={50} />
              </button>
            ))}
          </div>
        </div>

        {/* app sheet */}
        <AnimatePresence>
          {route && (
            <motion.div
              key={route.k}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="absolute inset-0 z-40 bg-white flex flex-col"
            >
              <div className="shrink-0 relative z-10 bg-white/85 backdrop-blur-xl border-b border-black/6 h-12 flex items-center px-2">
                <button
                  onClick={() => setRoute(null)}
                  className="flex items-center text-[#0a64e4] text-[15px] font-medium pr-3 py-1"
                >
                  <ChevronLeft size={22} /> Home
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-gray-800 max-w-[55%] truncate">
                  {title}
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <AppContent app={route.app} payload={route.payload} />
              </div>
              <button
                onClick={() => setRoute(null)}
                aria-label="Go home"
                className="shrink-0 py-2 bg-white grid place-items-center"
              >
                <span className="w-32 h-[5px] rounded-full bg-black/35" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* search sheet */}
        <AnimatePresence>
          {search && (
            <SearchSheet
              onClose={() => setSearch(false)}
              onPick={(app, payload) => {
                setSearch(false);
                openApp(app, payload);
              }}
            />
          )}
        </AnimatePresence>

        {/* goodbye */}
        <AnimatePresence>
          {bye && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#0b0b0c] flex items-center justify-center"
            >
              <GoodbyeCard onBack={() => setBye(false)} onRestart={() => window.location.reload()} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OSProvider>
  );
}

function SearchSheet({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (app: AppId, payload?: any) => void;
}) {
  const [q, setQ] = useState('');
  const results = useMemo(() => filterSpotlight(q).slice(0, 8), [q]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/25 backdrop-blur-sm flex flex-col"
      onPointerDown={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="m-3 mt-14 rounded-2xl bg-white shadow-2xl overflow-hidden"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-3.5 h-11 border-b border-black/6">
          <Search size={16} className="text-gray-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search this Mac"
            className="flex-1 text-[15px] placeholder:text-gray-400"
            aria-label="Search"
          />
        </div>
        <div className="max-h-[46vh] overflow-y-auto mac-scroll p-1.5">
          {results.map((r) => (
            <button
              key={r.title}
              onClick={() => onPick(r.open.app, r.open.payload)}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-black/4 text-left"
            >
              <AppIcon kind={r.icon} size={30} />
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium text-gray-800 truncate">{r.title}</span>
                <span className="block text-[11px] text-gray-400 truncate">{r.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
