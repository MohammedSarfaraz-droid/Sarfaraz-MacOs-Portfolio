import { useState } from 'react';
import { Activity, Cpu, MemoryStick, Search, Wrench } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolio';
import type { SkillStatus } from '../data/portfolio';

type Tab = 'cpu' | 'memory' | 'frontend' | 'tools';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'cpu', label: 'CPU', icon: Cpu },
  { id: 'memory', label: 'Memory', icon: MemoryStick },
  { id: 'frontend', label: 'Frontend', icon: Activity },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

const STATUS_STYLES: Record<SkillStatus, { chip: string; dot: string }> = {
  Active: { chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  'Project experience': { chip: 'bg-blue-50 text-[#0a64e4] ring-blue-200', dot: 'bg-[#0a64e4]' },
  Learning: { chip: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500 learning-pulse' },
  Next: { chip: 'bg-gray-100 text-gray-500 ring-gray-200', dot: 'bg-gray-400' },
};

interface Row {
  name: string;
  category: string;
  status: SkillStatus;
  extra?: string;
}

const CPU_ROWS: Row[] = [
  { name: 'curiosity', category: 'kernel_task', status: 'Active', extra: '98.4%' },
  { name: 'pixel_polish', category: 'windowsServer', status: 'Active', extra: '64.2%' },
  { name: 'debugging_daemon', category: 'user', status: 'Active', extra: '57.8%' },
  { name: 'chai.rs', category: 'user', status: 'Active', extra: '41.3%' },
  { name: 'ai_pair_programmer', category: 'helper', status: 'Active', extra: '38.9%' },
  { name: 'sleep', category: 'system', status: 'Next', extra: 'paused' },
];

const MEM_ROWS: Row[] = [
  { name: 'persistence', category: 'wired', status: 'Active', extra: '∞ resident' },
  { name: 'curiosity', category: 'wired', status: 'Active', extra: 'unmetered' },
  { name: 'backend_fundamentals', category: 'swapping in', status: 'Learning', extra: 'growing' },
  { name: 'self_doubt', category: 'compressed', status: 'Active', extra: '2 MB' },
  { name: 'impostor_syndrome', category: 'purgeable', status: 'Next', extra: 'scheduled' },
];

export default function Skills() {
  const [tab, setTab] = useState<Tab>('frontend');
  const [q, setQ] = useState('');

  let rows: Row[] = [];
  if (tab === 'cpu') rows = CPU_ROWS;
  else if (tab === 'memory') rows = MEM_ROWS;
  else {
    rows = SKILL_GROUPS.filter((g) => g.tab === tab).flatMap((g) =>
      g.items.map<Row>((it) => ({ name: it, category: g.label, status: g.status }))
    );
  }
  if (q) rows = rows.filter((r) => `${r.name} ${r.category}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-white">
      {/* toolbar */}
      <div className="shrink-0 border-b border-black/[0.06] px-3.5 py-2.5 flex items-center gap-3">
        <div className="flex rounded-lg bg-black/[0.05] p-0.5 gap-0.5">
          {TABS.map((t) => {
            const I = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition ${
                  tab === t.id ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <I size={13} />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex-1" />
        <span className="hidden md:block text-[11px] text-gray-400">System: Learning + Building</span>
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-black/[0.05] px-2.5 h-7 w-40">
          <Search size={12} className="text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search processes"
            className="bg-transparent text-[12px] flex-1 placeholder:text-gray-400"
            aria-label="Search skills"
          />
        </div>
      </div>

      {(tab === 'frontend' || tab === 'tools') && (
        <div className="shrink-0 px-3.5 py-2 border-b border-black/[0.06] bg-[#fbfbfd] text-[11px] text-gray-500">
          Status is honest on purpose — <span className="font-semibold text-amber-600">Learning</span> means
          in-progress, not expertise. No fake percentages here.
        </div>
      )}

      {/* table */}
      <div className="flex-1 overflow-y-auto mac-scroll">
        <table className="w-full text-[12.5px]">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-[11px] text-gray-400 border-b border-black/[0.08]">
              <th className="font-medium px-4 py-1.5">Process Name</th>
              <th className="font-medium px-2 py-1.5 w-40 hidden sm:table-cell">
                {tab === 'cpu' || tab === 'memory' ? 'Type' : 'Category'}
              </th>
              <th className="font-medium px-2 py-1.5 w-32 hidden md:table-cell">
                {tab === 'cpu' ? '% CPU' : tab === 'memory' ? 'Memory' : 'Notes'}
              </th>
              <th className="font-medium px-4 py-1.5 w-40 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const st = STATUS_STYLES[r.status];
              return (
                <tr key={`${r.name}-${i}`} className="border-b border-black/[0.045] hover:bg-black/[0.025]">
                  <td className="px-4 py-[7px] font-medium text-gray-800">{r.name}</td>
                  <td className="px-2 py-[7px] text-gray-500 hidden sm:table-cell">{r.category}</td>
                  <td className="px-2 py-[7px] text-gray-400 tabular-nums hidden md:table-cell">
                    {r.extra ?? (r.status === 'Active' ? 'shipping' : '—')}
                  </td>
                  <td className="px-4 py-[7px] text-right">
                    <span className={`inline-flex items-center gap-1.5 text-[10.5px] font-semibold rounded-full px-2.5 py-1 ring-1 ${st.chip}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                  No processes match “{q}”
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="shrink-0 h-8 border-t border-black/[0.06] bg-[#fafafa] flex items-center justify-center gap-2 text-[11px] text-gray-400">
        <span>{rows.length} processes</span>
        <span className="text-gray-300">·</span>
        <span>Currently learning: MERN → Cloud → AI</span>
      </div>
    </div>
  );
}
