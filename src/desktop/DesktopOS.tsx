import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AppId, Settings } from '../os/os';
import { APP_META, defaultSettings, OSProvider } from '../os/os';
import { PROJECTS, CERTIFICATES } from '../data/portfolio';
import Window from '../components/Window';
import type { Bounds, WinState } from '../components/Window';
import MenuBar from '../components/MenuBar';
import Dock from '../components/Dock';
import Spotlight from '../components/Spotlight';
import DesktopIcons from '../components/DesktopIcons';
import type { DesktopItem } from '../components/DesktopIcons';
import AppContent from '../apps/AppContent';
import { GoodbyeCard } from '../apps/apps';

function titleFor(app: AppId, payload?: any): string {
  if (app === 'project') {
    return PROJECTS.find((p) => p.slug === payload?.slug)?.name ?? 'Project';
  }
  if (app === 'certificate') {
    const c = CERTIFICATES[payload?.index ?? 0];
    return c ? `Certificate — ${c.issuer}` : 'Certificate';
  }
  if (app === 'finder' && payload?.section === 'client') return 'Finder — Client Work';
  if (app === 'finder' && payload?.section === 'certificates') return 'Finder — Certificates';
  if (app === 'finder' && payload?.section === 'projects') return 'Finder — Projects';
  return APP_META[app].title;
}

function iconFor(app: AppId, payload?: any): string {
  if (app === 'project') return 'folder';
  if (app === 'certificate') return 'doc';
  if (app === 'finder' && payload?.section === 'skills') return 'activity';
  return APP_META[app].icon;
}

export default function DesktopOS() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) =>
      setSettings((s) => ({ ...s, [key]: value })),
    []
  );

  const [wins, setWins] = useState<WinState[]>([]);
  const zRef = useRef(10);
  const [spot, setSpot] = useState(false);
  const [goodbye, setGoodbye] = useState(false);

  const handlePowerAction = useCallback((action: 'sleep' | 'restart' | 'shutdown' | 'lockscreen') => {
    if (action === 'restart') {
      window.location.reload();
      return;
    }
    setGoodbye(true);
  }, []);
  const [selIcon, setSelIcon] = useState<string | null>(null);

  const openApp = useCallback((app: AppId, payload?: any) => {
    setWins((prev) => {
      const id =
        app === 'project'
          ? `project:${payload?.slug}`
          : app === 'certificate'
            ? `certificate:${payload?.index ?? 0}`
            : app;
      const z = ++zRef.current;
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id
            ? { ...w, z, minimized: false, payload, k: w.k + 1, title: titleFor(app, payload), icon: iconFor(app, payload) }
            : w
        );
      }
      const meta = APP_META[app];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(meta.size.w, vw - 24);
      const h = Math.min(meta.size.h, vh - 140);
      const n = prev.length;
      const x = Math.max(10, Math.min((vw - w) / 2 + ((n % 6) - 2) * 36, vw - w - 10));
      const y = Math.max(36, (vh - h) / 2 - 26 + (n % 5) * 24);
      return [
        ...prev,
        {
          id,
          app,
          title: titleFor(app, payload),
          icon: iconFor(app, payload),
          payload,
          z,
          minimized: false,
          maximized: false,
          bounds: { x, y, w, h },
          k: 0,
        },
      ];
    });
  }, []);

  const closeWin = useCallback((id: string) => setWins((p) => p.filter((w) => w.id !== id)), []);
  const minimizeWin = useCallback(
    (id: string) => setWins((p) => p.map((w) => (w.id === id ? { ...w, minimized: true } : w))),
    []
  );
  const focusWin = useCallback(
    (id: string) =>
      setWins((p) => {
        const top = p.reduce((m, w) => (w.z > m ? w.z : m), 0);
        const target = p.find((w) => w.id === id);
        if (!target) return p;
        if (target.z === top && !target.minimized) return p;
        const z = ++zRef.current;
        return p.map((w) => (w.id === id ? { ...w, z, minimized: false } : w));
      }),
    []
  );
  const maximizeWin = useCallback((id: string) => {
    setWins((p) =>
      p.map((w) => {
        if (w.id !== id) return w;
        const z = ++zRef.current;
        if (w.maximized) {
          return { ...w, maximized: false, bounds: w.restore ?? w.bounds, z };
        }
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          ...w,
          maximized: true,
          restore: w.bounds,
          bounds: { x: 10, y: 34, w: vw - 20, h: vh - 34 - 96 },
          z,
        };
      })
    );
  }, []);
  const moveWin = useCallback(
    (id: string, bounds: Bounds) => setWins((p) => p.map((w) => (w.id === id ? { ...w, bounds } : w))),
    []
  );
  const restoreWin = useCallback(
    (win: WinState) => {
      setWins((p) => {
        const z = ++zRef.current;
        return p.map((w) => (w.id === win.id ? { ...w, z, minimized: false } : w));
      });
    },
    []
  );

  // auto-open the welcome window once the desktop appears
  useEffect(() => {
    const t = window.setTimeout(() => openApp('welcome'), 700);
    return () => window.clearTimeout(t);
  }, [openApp]);

  const active = useMemo(() => {
    const visible = wins.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b));
  }, [wins]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.code === 'Space') {
        e.preventDefault();
        setSpot((s) => !s);
        return;
      }
      const editable = (e.target as HTMLElement | null)?.closest?.('input, textarea, [contenteditable="true"]');
      if (e.key === 'Escape') {
        if (spot) {
          setSpot(false);
        } else if (goodbye) {
          setGoodbye(false);
        } else if (active && !editable) {
          closeWin(active.id);
        }
        return;
      }
      if (meta && (e.key === 'w' || e.key === 'W')) {
        e.preventDefault();
        if (active) closeWin(active.id);
      }
      if (meta && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        if (active) minimizeWin(active.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, spot, goodbye, closeWin, minimizeWin]);

  const osValue = useMemo(
    () => ({
      openApp,
      isMobile: false,
      settings,
      setSetting,
      sayGoodbye: () => setGoodbye(true),
    }),
    [openApp, settings, setSetting]
  );

  return (
    <OSProvider value={osValue}>
      <div
        className="fixed inset-0 overflow-hidden select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* wallpaper */}
        <motion.img
          src="/images/wallpaper.jpg"
          alt=""
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* click-catcher for deselect */}
        <div className="absolute inset-0" onPointerDown={() => setSelIcon(null)} />

        <MenuBar
          activeTitle={active ? active.title : 'Finder'}
          activeId={active?.id ?? null}
          windows={wins.map((w) => ({ id: w.id, title: w.title, minimized: w.minimized }))}
          openApp={openApp}
          focusWindow={focusWin}
          closeActive={() => active && closeWin(active.id)}
          minimizeActive={() => active && minimizeWin(active.id)}
          maximizeActive={() => active && maximizeWin(active.id)}
          onSpotlight={() => setSpot(true)}
          onPowerAction={handlePowerAction}
        />

        <DesktopIcons
          selected={selIcon}
          onSelect={setSelIcon}
          onOpen={(item: DesktopItem) => openApp(item.app, item.payload)}
        />

        {/* window layer */}
        <div className="absolute inset-0 top-7 pointer-events-none">
          <AnimatePresence>
            {wins.map((w) => (
              <Window
                key={w.id}
                win={w}
                active={active?.id === w.id}
                onClose={closeWin}
                onMinimize={minimizeWin}
                onMaximize={maximizeWin}
                onFocus={focusWin}
                onMove={moveWin}
              >
                <div className={`h-full pointer-events-auto ${settings.reduceMotion ? '' : ''}`}>
                  <AppContent key={w.k} app={w.app} payload={w.payload} />
                </div>
              </Window>
            ))}
          </AnimatePresence>
        </div>

        <Dock windows={wins} onOpen={openApp} onRestore={restoreWin} />

        <Spotlight open={spot} onClose={() => setSpot(false)} />

        {/* goodbye overlay */}
        <AnimatePresence>
          {goodbye && (
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-[350] bg-[#0b0b0c] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(255,255,255,.035),transparent)]" />
              <div className="relative">
                <GoodbyeCard
                  onBack={() => {
                    setGoodbye(false);
                    openApp('resume');
                  }}
                  onRestart={() => window.location.reload()}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* brightness dimmer */}
        <div
          className="fixed inset-0 z-[380] pointer-events-none bg-black transition-opacity duration-300"
          style={{ opacity: (1 - settings.brightness) * 0.6 }}
        />
      </div>
    </OSProvider>
  );
}
