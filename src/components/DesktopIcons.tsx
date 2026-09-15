import type { AppId } from '../os/os';
import { AppIcon } from './icons';
import type { IconKind } from './icons';

export interface DesktopItem {
  key: string;
  label: string;
  kind: IconKind;
  app: AppId;
  payload?: any;
}

export const DESKTOP_ITEMS: DesktopItem[] = [
  { key: 'about', label: 'About Me', kind: 'about', app: 'about' },
  { key: 'projects', label: 'Projects', kind: 'folder', app: 'finder', payload: { section: 'projects' } },
  { key: 'experience', label: 'Experience', kind: 'briefcase', app: 'experience' },
  { key: 'resume', label: 'Resume', kind: 'pdf', app: 'resume' },
  { key: 'contact', label: 'Contact', kind: 'mail', app: 'contact' },
];

export default function DesktopIcons({
  selected,
  onSelect,
  onOpen,
}: {
  selected: string | null;
  onSelect: (key: string | null) => void;
  onOpen: (item: DesktopItem) => void;
}) {
  return (
    <div className="absolute top-10 right-2.5 flex flex-col gap-1 z-[5]">
      {DESKTOP_ITEMS.map((it) => {
        const sel = selected === it.key;
        return (
          <button
            key={it.key}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(it.key);
            }}
            onDoubleClick={() => onOpen(it)}
            className={`w-[96px] py-1.5 px-1 rounded-lg flex flex-col items-center gap-1 transition-colors ${
              sel ? 'bg-white/30 ring-1 ring-white/60 backdrop-blur-[2px]' : 'hover:bg-white/15'
            }`}
            aria-label={it.label}
          >
            <AppIcon kind={it.kind} size={46} />
            <span
              className={`text-[11px] font-medium leading-tight text-center px-1.5 py-px rounded-[4px] max-w-full line-clamp-2 ${
                sel ? 'bg-[#0a64e4] text-white' : 'text-gray-900/90'
              }`}
              style={sel ? undefined : { textShadow: '0 1px 4px rgba(255,255,255,.95), 0 0 3px rgba(255,255,255,.95)' }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
