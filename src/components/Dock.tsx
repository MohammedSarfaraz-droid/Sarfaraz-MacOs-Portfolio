import { useRef, useState } from 'react';
import type { AppId } from '../os/os';
import { useOS } from '../os/os';
import { AppIcon } from './icons';
import type { IconKind } from './icons';
import type { WinState } from './Window';

interface DockItem {
  id: string;
  label: string;
  kind: IconKind;
  match: AppId[];
  open: { app: AppId; payload?: any };
}

const ITEMS: DockItem[] = [
  { id: 'finder', label: 'Finder', kind: 'finder', match: ['finder'], open: { app: 'finder' } },
  { id: 'safari', label: 'Safari', kind: 'safari', match: ['safari'], open: { app: 'safari' } },
  { id: 'terminal', label: 'Terminal', kind: 'terminal', match: ['terminal'], open: { app: 'terminal' } },
  {
    id: 'projects',
    label: 'Projects',
    kind: 'folder',
    match: ['project'],
    open: { app: 'finder', payload: { section: 'projects' } },
  },
  { id: 'photos', label: 'Photos', kind: 'photos', match: ['photos'], open: { app: 'photos' } },
  { id: 'notes', label: 'Notes', kind: 'notes', match: ['notes'], open: { app: 'notes' } },
  { id: 'resume', label: 'Resume', kind: 'pdf', match: ['resume'], open: { app: 'resume' } },
  { id: 'github', label: 'GitHub', kind: 'github', match: ['github'], open: { app: 'github' } },
  { id: 'mail', label: 'Mail', kind: 'mail', match: ['contact'], open: { app: 'contact' } },
  { id: 'settings', label: 'Settings', kind: 'settings', match: ['settings'], open: { app: 'settings' } },
];

const BASE = 54;
const GAP = 16;
const PADX = 18;

export default function Dock({
  windows,
  onOpen,
  onRestore,
}: {
  windows: WinState[];
  onOpen: (app: AppId, payload?: any) => void;
  onRestore: (win: WinState) => void;
}) {
  const { settings, openApp } = useOS();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const handleClick = (item: DockItem) => {
    const candidates = windows.filter((w) => item.match.includes(w.app));
    if (candidates.length) {
      const top = candidates.reduce((a, b) => (a.z > b.z ? a : b));
      onRestore(top);
    } else if (item.id === 'projects') {
      const finder = windows.find((w) => w.app === 'finder');
      if (finder) onRestore(finder);
      onOpen('finder', { section: 'projects' });
    } else {
      onOpen(item.open.app, item.open.payload);
    }
  };

  const isOpen = (item: DockItem) => windows.some((w) => item.match.includes(w.app));

  const total = ITEMS.length;
  const rect = wrapRef.current?.getBoundingClientRect();

  return (
    <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-90 select-none">
      <div
        ref={wrapRef}
        onMouseMove={(e) => settings.dockMagnify && setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="flex items-end rounded-[22px] bg-white/45 backdrop-blur-2xl ring-1 ring-white/60 dock-shadow"
        style={{ gap: GAP, padding: `8px ${PADX}px 7px`, height: BASE + 15 }}
      >
        {ITEMS.map((item, i) => {
          let s = 1;
          if (mouseX != null && rect && settings.dockMagnify) {
            const cx = rect.left + PADX + i * (BASE + GAP) + BASE / 2;
            const d = Math.abs(mouseX - cx);
            s = 1 + 0.55 * Math.exp(-((d / 95) ** 2));
          }
          return (
            <div key={item.id} className="relative group" style={{ width: BASE, height: BASE }}>
              <span className="absolute left-1/2 -translate-x-1/2 -top-11 z-50 whitespace-nowrap rounded-md bg-[#2f3136]/90 text-white text-[11.5px] font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {item.label}
              </span>
              <button
                aria-label={item.label}
                onClick={() => handleClick(item)}
                className="absolute bottom-0 left-0 grid place-items-center cursor-pointer"
                style={{
                  width: BASE,
                  height: BASE,
                  transform: `translateY(${-(s - 1) * 34}px) scale(${s})`,
                  transformOrigin: 'center bottom',
                  transition: mouseX == null ? 'transform .25s cubic-bezier(.32,.72,0,1)' : 'transform .08s',
                }}
              >
                <AppIcon kind={item.kind} size={BASE} className="transition-transform active:scale-90" />
              </button>
              <span
                className={`absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-1 h-1 rounded-full transition-opacity ${
                  isOpen(item) ? 'bg-gray-700/70 opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* separator + trash */}
        <div className="w-px self-stretch my-1.5 bg-black/10" style={{ marginLeft: 2, marginRight: 2 }} />
        <div className="relative group" style={{ width: BASE, height: BASE }}>
          <span className="absolute left-1/2 -translate-x-1/2 -top-11 z-50 whitespace-nowrap rounded-md bg-[#2f3136]/90 text-white text-[11.5px] font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Trash — recycled drafts
          </span>
          <button
            aria-label="Trash"
            onClick={() => openApp('notes')}
            className="absolute bottom-0 left-0 grid place-items-center cursor-pointer active:scale-90 transition-transform"
            style={{ width: BASE, height: BASE }}
          >
            <AppIcon kind="trash" size={BASE - 2} />
          </button>
        </div>
        {total === 0 && null}
      </div>
    </div>
  );
}
