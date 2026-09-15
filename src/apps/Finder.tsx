import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download as DownloadIcon,
  HardDrive,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import { useOS } from '../os/os';
import { AppIcon } from '../components/icons';
import type { IconKind } from '../components/icons';
import { CERTIFICATES, PROJECTS } from '../data/portfolio';

type Loc =
  | 'about'
  | 'projects'
  | 'client'
  | 'certificates'
  | 'experience'
  | 'education'
  | 'skills'
  | 'achievements'
  | 'contact'
  | 'hd'
  | 'icloud';

interface Item {
  key: string;
  label: string;
  kind: IconKind;
  kindLabel: string;
  date: string;
  run: () => void;
}

const FAVORITES: { id: Loc; label: string; kind: IconKind }[] = [
  { id: 'about', label: 'About Me', kind: 'about' },
  { id: 'projects', label: 'Projects', kind: 'folder' },
  { id: 'experience', label: 'Experience', kind: 'briefcase' },
  { id: 'education', label: 'Education', kind: 'graduation' },
  { id: 'skills', label: 'Skills', kind: 'activity' },
  { id: 'achievements', label: 'Achievements', kind: 'trophy' },
  { id: 'contact', label: 'Contact', kind: 'mail' },
];

const LOCATIONS: { id: Loc; label: string; icon: any }[] = [
  { id: 'hd', label: 'Macintosh HD', icon: HardDrive },
  { id: 'icloud', label: 'iCloud Drive', icon: Cloud },
];

const NAMES: Record<string, string> = {
  about: 'About Me',
  projects: 'Projects',
  client: 'Client Work — AM Software Solutions',
  certificates: 'Certificates',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  achievements: 'Achievements',
  contact: 'Contact',
  hd: 'Macintosh HD',
  icloud: 'iCloud Drive',
};

export default function Finder({ initialSection }: { initialSection?: string }) {
  const { openApp, isMobile } = useOS();
  const start = (initialSection as Loc) || 'projects';
  const [hist, setHist] = useState<{ list: Loc[]; idx: number }>({ list: [start], idx: 0 });
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const loc = hist.list[hist.idx];
  const nav = (to: Loc) => {
    setHist((h) => ({ list: [...h.list.slice(0, h.idx + 1), to], idx: h.idx + 1 }));
    setSel(null);
    setQ('');
  };

  const items: Item[] = useMemo(() => {
    const appItem = (label: string, kind: IconKind, app: any): Item => ({
      key: label,
      label: `${label}.app`,
      kind,
      kindLabel: 'Application',
      date: 'Today',
      run: () => openApp(app),
    });
    switch (loc) {
      case 'projects':
        return [
          {
            key: 'clientfolder',
            label: 'Client Work — AM Software Solutions',
            kind: 'folder',
            kindLabel: 'Folder',
            date: '2026',
            run: () => nav('client'),
          },
          {
            key: 'certsfolder',
            label: 'Certificates',
            kind: 'folder',
            kindLabel: 'Folder',
            date: '2026',
            run: () => nav('certificates'),
          },
          ...PROJECTS.filter((p) => p.category === 'personal').map<Item>((p) => ({
            key: p.slug,
            label: p.name,
            kind: 'folder',
            kindLabel: 'Project Folder',
            date: p.date.slice(0, 4),
            run: () => openApp('project', { slug: p.slug }),
          })),
        ];
      case 'client':
        return PROJECTS.filter((p) => p.category === 'client').map<Item>((p) => ({
          key: p.slug,
          label: p.name,
          kind: 'folder',
          kindLabel: 'Client Project',
          date: '2026',
          run: () => openApp('project', { slug: p.slug }),
        }));
      case 'certificates':
        return CERTIFICATES.map<Item>((c, i) => ({
          key: c.name,
          label: c.name,
          kind: 'doc',
          kindLabel: 'Document',
          date: '2026',
          run: () => openApp('certificate', { index: i }),
        }));
      case 'about':
        return [appItem('About Sarfaraz', 'about', 'about')];
      case 'experience':
        return [appItem('Experience', 'briefcase', 'experience')];
      case 'education':
        return [appItem('Education', 'graduation', 'education')];
      case 'skills':
        return [appItem('Activity Monitor', 'activity', 'skills')];
      case 'achievements':
        return [appItem('Achievements', 'trophy', 'achievements')];
      case 'contact':
        return [appItem('Contact', 'mail', 'contact')];
      default:
        return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  const filtered = q
    ? items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))
    : items;

  const activate = (it: Item) => {
    if (isMobile) it.run();
    else setSel(it.key);
  };

  return (
    <div className="h-full flex flex-col bg-white text-gray-800">
      {/* toolbar */}
      <div className="shrink-0 h-12 border-b border-black/6 flex items-center gap-2 px-3">
        <div className="flex items-center gap-1">
          <button
            aria-label="Back"
            disabled={hist.idx === 0}
            onClick={() => setHist((h) => ({ ...h, idx: h.idx - 1 }))}
            className="p-1 rounded-md text-gray-500 hover:bg-black/5 disabled:opacity-25"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            aria-label="Forward"
            disabled={hist.idx === hist.list.length - 1}
            onClick={() => setHist((h) => ({ ...h, idx: h.idx + 1 }))}
            className="p-1 rounded-md text-gray-500 hover:bg-black/5 disabled:opacity-25"
          >
            <ChevronRight size={17} />
          </button>
        </div>
        <h1 className="text-[14px] font-bold text-gray-800 truncate">{NAMES[loc]}</h1>
        <div className="flex-1" />
        <div className="flex items-center rounded-lg bg-black/5 p-0.5">
          <button
            aria-label="Icon view"
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            aria-label="List view"
            onClick={() => setView('list')}
            className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            <List size={14} />
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-black/5 px-2.5 h-7 w-44">
          <Search size={12} className="text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-[12px] flex-1 placeholder:text-gray-400"
            aria-label="Search folder"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        {/* sidebar */}
        {!isMobile && (
          <aside className="w-48 shrink-0 overflow-y-auto mac-scroll border-r border-black/6 bg-black/2 py-2 px-2">
            <p className="px-2 pt-1 pb-1 text-[11px] font-semibold text-gray-400">Favorites</p>
            {FAVORITES.map((f) => (
              <button
                key={f.id}
                onClick={() => nav(f.id)}
                className={`w-full flex items-center gap-2 px-2 py-[4.5px] rounded-md text-[13px] ${
                  loc === f.id ? 'bg-black/[0.07] font-medium' : 'hover:bg-black/4 text-gray-600'
                }`}
              >
                <AppIcon kind={f.kind} size={17} />
                <span className="truncate">{f.label}</span>
              </button>
            ))}
            <p className="px-2 pt-3 pb-1 text-[11px] font-semibold text-gray-400">Locations</p>
            {LOCATIONS.map((l) => {
              const I = l.icon;
              return (
                <button
                  key={l.id}
                  onClick={() => nav(l.id)}
                  className={`w-full flex items-center gap-2 px-2 py-[4.5px] rounded-md text-[13px] ${
                    loc === l.id ? 'bg-black/[0.07] font-medium' : 'hover:bg-black/4-gray-600'
                  }`}
                >
                  <I size={15} className="text-gray-400" />
                  <span className="truncate">{l.label}</span>
                </button>
              );
            })}
          </aside>
        )}

        {/* content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 overflow-y-auto mac-scroll" onClick={() => setSel(null)}>
            {loc === 'hd' || loc === 'icloud' ? (
              <div className="h-full grid place-items-center p-8 text-center">
                <div>
                  <AppIcon kind="finder" size={54} className="mx-auto opacity-80" />
                  <p className="mt-4 text-[13px] font-medium text-gray-500">{NAMES[loc]}</p>
                  <p className="mt-1 max-w-[260px] text-[12px] text-gray-400">
                    This volume is purely decorative — the portfolio lives in Favorites.
                  </p>
                </div>
              </div>
            ) : view === 'grid' ? (
              <div className="p-4 grid grid-cols-[repeat(auto-fill,96px)] gap-x-2 gap-y-3 content-start">
                {filtered.map((it) => (
                  <button
                    key={it.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      activate(it);
                    }}
                    onDoubleClick={() => it.run()}
                    className="group flex flex-col items-center gap-1.5 p-1.5 rounded-lg focus-visible:bg-blue-50"
                  >
                    <span
                      className={`grid place-items-center w-[72px] h-16nded-[10px] transition ${
                        sel === it.key ? 'bg-[#0a64e4]/12 ring-1 ring-[#0a64e4]/30' : 'group-hover:bg-black/4'
                      }`}
                    >
                      <AppIcon kind={it.kind} size={46} />
                    </span>
                    <span
                      className={`text-[11px] leading-tight text-center px-1 rounded line-clamp-2 ${
                        sel === it.key ? 'bg-[#0a64e4] text-white' : 'text-gray-700'
                      }`}
                    >
                      {it.label}
                    </span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-full py-10 text-center text-[12.5px] text-gray-400">No results for “{q}”</p>
                )}
              </div>
            ) : (
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="text-left text-[11px] text-gray-400 border-b border-black/6">
                    <th className="font-medium px-4 py-1.5">Name</th>
                    <th className="font-medium px-2 py-1.5 w-28">Date Modified</th>
                    <th className="font-medium px-2 py-1.5 w-32 hidden sm:table-cell">Kind</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it) => (
                    <tr
                      key={it.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        activate(it);
                      }}
                      onDoubleClick={() => it.run()}
                      className={`cursor-default border-b border-black/4 ${
                        sel === it.key ? 'bg-[#0a64e4]/10' : 'hover:bg-black/3'
                      }`}
                    >
                      <td className="px-4 py-[7px]">
                        <span className="flex items-center gap-2.5">
                          <AppIcon kind={it.kind} size={20} />
                          <span className="truncate font-medium text-gray-800">{it.label}</span>
                        </span>
                      </td>
                      <td className="px-2 py-[7px] text-gray-500">{it.date}</td>
                      <td className="px-2 py-[7px] text-gray-500 hidden sm:table-cell">{it.kindLabel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="shrink-0 h-7 border-t border-black/6 flex items-center justify-center gap-2 text-[11px] text-gray-400 bg-[#fafafa]">
            <DownloadIcon size={10} className="opacity-0" />
            <span>{filtered.length} items</span>
            <span className="text-gray-300">·</span>
            <span>iCloud available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
