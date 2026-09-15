import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BatteryMedium,
  Bluetooth,
  Check,
  ChevronRight,
  Moon,
  Search,
  Share,
  SlidersHorizontal,
  SunMedium,
  Volume2,
  Wifi,
  WifiOff,
} from 'lucide-react';
import type { AppId } from '../os/os';
import { useNow, useOS } from '../os/os';

interface BarWindow {
  id: string;
  title: string;
  minimized: boolean;
}

interface Props {
  activeTitle: string;
  activeId: string | null;
  windows: BarWindow[];
  openApp: (app: AppId, payload?: any) => void;
  focusWindow: (id: string) => void;
  closeActive: () => void;
  minimizeActive: () => void;
  maximizeActive: () => void;
  onSpotlight: () => void;
  onPowerAction: (action: 'sleep' | 'restart' | 'shutdown' | 'lockscreen') => void;
}

type Item =
  | { type: 'item'; label: string; shortcut?: string; disabled?: boolean; checked?: boolean; action?: () => void }
  | { type: 'divider' };

export default function MenuBar(props: Props) {
  const { settings, setSetting } = useOS();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [ccOpen, setCcOpen] = useState(false);
  const now = useNow(1000);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('[data-menubar]') && !(e.target as HTMLElement).closest('[data-cc]')) {
        setOpenMenu(null);
        setCcOpen(false);
      }
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, []);

  const clock = `${now.toLocaleDateString('en-US', { weekday: 'short' })} ${now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}  ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;

  const menus: { id: string; label: React.ReactNode; bold?: boolean; items: Item[] }[] = [
    {
      id: 'apple',
      label: (
        <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.7 12.9c0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.9-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.2-.9-2.3-3.5zM14.8 6.6c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z"
          />
        </svg>
      ),
      items: [
        { type: 'item', label: 'About This Mac', action: () => props.openApp('about') },
        { type: 'divider' },
        { type: 'item', label: 'System Settings…', action: () => props.openApp('settings') },
        { type: 'item', label: 'App Store…', disabled: true },
        { type: 'divider' },
        { type: 'item', label: 'Sleep', action: () => props.onPowerAction('sleep') },
        { type: 'item', label: 'Restart…', action: () => props.onPowerAction('restart') },
        { type: 'item', label: 'Lock Screen', action: () => props.onPowerAction('lockscreen') },
        { type: 'item', label: 'Shut Down…', action: () => props.onPowerAction('shutdown') },
      ],
    },
    {
      id: 'app',
      label: props.activeTitle,
      bold: true,
      items: [
        { type: 'item', label: 'About This Portfolio', action: () => props.openApp('about') },
        { type: 'divider' },
        {
          type: 'item',
          label: `Close ${props.activeTitle}`,
          shortcut: '⌘W',
          disabled: !props.activeId,
          action: props.closeActive,
        },
      ],
    },
    {
      id: 'file',
      label: 'File',
      items: [
        { type: 'item', label: 'New Finder Window', action: () => props.openApp('finder') },
        { type: 'item', label: 'New Tab', shortcut: '⌘T', disabled: true },
        { type: 'divider' },
        { type: 'item', label: 'Close Window', shortcut: '⌘W', disabled: !props.activeId, action: props.closeActive },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { type: 'item', label: 'Undo', shortcut: '⌘Z', disabled: true },
        { type: 'divider' },
        { type: 'item', label: 'Cut', shortcut: '⌘X', disabled: true },
        { type: 'item', label: 'Copy', shortcut: '⌘C', disabled: true },
        { type: 'item', label: 'Paste', shortcut: '⌘V', disabled: true },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          type: 'item',
          label: 'Enter Full Screen',
          shortcut: '⌃⌘F',
          disabled: !props.activeId,
          action: props.maximizeActive,
        },
        { type: 'divider' },
        {
          type: 'item',
          label: 'Dock Magnification',
          checked: settings.dockMagnify,
          action: () => setSetting('dockMagnify', !settings.dockMagnify),
        },
        {
          type: 'item',
          label: 'Animations',
          checked: settings.animations,
          action: () => setSetting('animations', !settings.animations),
        },
      ],
    },
    {
      id: 'go',
      label: 'Go',
      items: [
        { type: 'item', label: 'Projects', action: () => props.openApp('finder', { section: 'projects' }) },
        { type: 'item', label: 'Client Work', action: () => props.openApp('finder', { section: 'client' }) },
        { type: 'item', label: 'Certificates', action: () => props.openApp('finder', { section: 'certificates' }) },
        { type: 'divider' },
        { type: 'item', label: 'Terminal', action: () => props.openApp('terminal') },
        { type: 'item', label: 'GitHub', action: () => props.openApp('github') },
      ],
    },
    {
      id: 'windowmenu',
      label: 'Window',
      items: [
        { type: 'item', label: 'Minimize', shortcut: '⌘M', disabled: !props.activeId, action: props.minimizeActive },
        { type: 'item', label: 'Zoom', disabled: !props.activeId, action: props.maximizeActive },
        { type: 'divider' },
        ...(props.windows.length
          ? props.windows.map<Item>((w) => ({
              type: 'item',
              label: w.minimized ? `${w.title} — minimized` : w.title,
              checked: w.id === props.activeId,
              action: () => props.focusWindow(w.id),
            }))
          : [{ type: 'item', label: 'No open windows', disabled: true } as Item]),
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        { type: 'item', label: 'Search this Mac', shortcut: '⌘Space', action: props.onSpotlight },
        { type: 'item', label: 'Portfolio Help', action: () => props.openApp('notes') },
      ],
    },
  ];

  return (
    <>
      <div
        ref={barRef}
        data-menubar
        className="fixed top-0 inset-x-0 h-7 z-100 flex items-center px-2 gap-0.5 bg-white/65 backdrop-blur-2xl border-b border-black/[0.06] text-[13px] text-gray-800 select-none"
      >
        {menus.map((m) => (
          <div key={m.id} className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
              onMouseEnter={() => openMenu && setOpenMenu(m.id)}
              className={`px-2.5 h-[22px] rounded-[4px] flex items-center max-w-[150px] truncate ${m.bold ? 'font-semibold' : ''} ${
                openMenu === m.id ? 'bg-black/[0.09]' : 'hover:bg-black/[0.05]'
              }`}
            >
              {m.label}
            </button>
            <AnimatePresence>
              {openMenu === m.id && (
                <motion.div
                  initial={{ opacity: 0, y: -3, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -2, scale: 0.98 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-[26px] left-0 min-w-[230px] rounded-[9px] bg-white/85 backdrop-blur-2xl shadow-xl ring-1 ring-black/10 py-1 z-[120]"
                >
                  {m.items.map((it, i) =>
                    it.type === 'divider' ? (
                      <div key={i} className="my-1 mx-3 border-t border-black/[0.07]" />
                    ) : (
                      <button
                        key={i}
                        disabled={it.disabled}
                        onClick={() => {
                          it.action?.();
                          setOpenMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-[3.5px] text-left text-[13px] rounded-none hover:bg-[#0a64e4] hover:text-white disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-inherit group"
                      >
                        <span className="w-3">
                          {it.checked && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="flex-1 truncate">{it.label}</span>
                        {it.shortcut && (
                          <span className="text-[11px] opacity-50 tracking-wider">{it.shortcut}</span>
                        )}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="flex-1" />

        {/* right cluster */}
        <button
          aria-label="Wi-Fi"
          onClick={() => setSetting('wifi', !settings.wifi)}
          className="px-1.5 h-[22px] rounded-[4px] hover:bg-black/[0.05] flex items-center"
        >
          {settings.wifi ? <Wifi size={15} strokeWidth={2} /> : <WifiOff size={15} strokeWidth={2} className="text-gray-400" />}
        </button>
        <button aria-label="Battery" className="px-1.5 h-[22px] rounded-[4px] hover:bg-black/[0.05] flex items-center">
          <BatteryMedium size={19} strokeWidth={1.6} />
        </button>
        <button
          aria-label="Open Spotlight"
          onClick={props.onSpotlight}
          className="px-1.5 h-[22px] rounded-[4px] hover:bg-black/[0.05] flex items-center"
        >
          <Search size={14} strokeWidth={2.2} />
        </button>
        <div className="relative" data-cc>
          <button
            aria-label="Control Center"
            onClick={() => setCcOpen(!ccOpen)}
            className={`px-1.5 h-[22px] rounded-[4px] flex items-center ${ccOpen ? 'bg-black/[0.09]' : 'hover:bg-black/[0.05]'}`}
          >
            <SlidersHorizontal size={14} strokeWidth={2} />
          </button>
          <ControlCenter open={ccOpen} />
        </div>
        <span className="px-2 text-[12.5px] tabular-nums whitespace-pre">{clock}</span>
      </div>
    </>
  );
}

/* ── Control Center ─────────────────────────────────────────────────────── */
function ControlCenter({ open }: { open: boolean }) {
  const { settings, setSetting, openApp } = useOS();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -4 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="absolute top-[30px] right-0 w-[330px] rounded-[18px] bg-white/75 backdrop-blur-2xl shadow-2xl ring-1 ring-black/10 p-3"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <CCTile
              icon={<Wifi size={15} strokeWidth={2.2} />}
              label="Wi-Fi"
              state={settings.wifi ? 'SarfarazOS-5G' : 'Off'}
              on={settings.wifi}
              onClick={() => setSetting('wifi', !settings.wifi)}
            />
            <CCTile
              icon={<Bluetooth size={15} strokeWidth={2.2} />}
              label="Bluetooth"
              state={settings.bluetooth ? 'On' : 'Off'}
              on={settings.bluetooth}
              onClick={() => setSetting('bluetooth', !settings.bluetooth)}
            />
            <CCTile
              icon={<Share size={15} strokeWidth={2.2} />}
              label="AirDrop"
              state={settings.airdrop ? 'Contacts Only' : 'Off'}
              on={settings.airdrop}
              onClick={() => setSetting('airdrop', !settings.airdrop)}
            />
            <CCTile
              icon={<Moon size={15} strokeWidth={2.2} />}
              label="Focus"
              state={settings.focus ? 'Do Not Disturb' : 'Off'}
              on={settings.focus}
              onClick={() => setSetting('focus', !settings.focus)}
            />
          </div>

          <CCModule label="Display">
            <SunMedium size={15} className="text-gray-500 shrink-0" />
            <input
              type="range"
              min={40}
              max={100}
              value={Math.round(settings.brightness * 100)}
              onChange={(e) => setSetting('brightness', Number(e.target.value) / 100)}
              className="flex-1 h-1"
              aria-label="Brightness"
            />
          </CCModule>
          <CCModule label="Sound">
            <Volume2 size={15} className="text-gray-500 shrink-0" />
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(settings.volume * 100)}
              onChange={(e) => setSetting('volume', Number(e.target.value) / 100)}
              className="flex-1 h-1"
              aria-label="Volume"
            />
          </CCModule>

          <div className="mt-2.5 px-1 flex items-center justify-between">
            <button
              onClick={() => openApp('settings')}
              className="text-[11px] text-gray-500 hover:text-gray-800 flex items-center gap-1"
            >
              System Settings <ChevronRight size={11} />
            </button>
            <span className="text-[10.5px] text-gray-400">SarfarazOS 26.0</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CCTile({
  icon,
  label,
  state,
  on,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  state: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-[13px] bg-white/85 ring-1 ring-black/[0.06] shadow-sm p-2.5 h-[72px] flex flex-col justify-between text-left hover:bg-white transition-colors"
    >
      <span
        className={`w-7 h-7 rounded-full grid place-items-center transition-colors ${
          on ? 'bg-[#0a64e4] text-white' : 'bg-gray-300/70 text-gray-500'
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block text-[12px] font-semibold text-gray-800 leading-tight">{label}</span>
        <span className="block text-[10.5px] text-gray-500 leading-tight">{state}</span>
      </span>
    </button>
  );
}

function CCModule({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2.5 rounded-[13px] bg-white/85 ring-1 ring-black/[0.06] shadow-sm p-2.5">
      <p className="text-[11.5px] font-semibold text-gray-800 mb-1.5">{label}</p>
      <div className="flex items-center gap-2.5">{children}</div>
    </div>
  );
}
