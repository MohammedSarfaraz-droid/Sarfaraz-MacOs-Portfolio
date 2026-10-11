import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ExternalLink,
  Globe,
  Plus,
  RefreshCw,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import { useOS } from '../os/os';
import { GithubMark } from '../components/icons';
import { PrimaryBtn, SecondaryBtn } from './apps';
import { PROFILE, PROJECTS } from '../data/portfolio';

const hostOf = (url?: string) => {
  try {
    return url ? new URL(url).host : '';
  } catch {
    return '';
  }
};

/* ══ Safari ══════════════════════════════════════════════════════════════ */
export function Safari() {
  const [page, setPage] = useState<string>('start');
  const [spinning, setSpinning] = useState(false);
  const project = PROJECTS.find((p) => p.slug === page);

  const urlText = project ? hostOf(project.liveUrl) : 'favorites — Sarfaraz · Selected Work';

  return (
    <div className="h-full flex flex-col bg-white">
      {/* tab strip */}
      <div className="shrink-0 h-8 bg-[#e9eaee] flex items-end px-2 gap-1 border-b border-black/[0.06] select-none">
        <div className="flex items-center gap-1.5 h-7 px-3 rounded-t-[7px] bg-white text-[11.5px] font-medium text-gray-700 w-48 relative top-px ring-1 ring-black/[0.06]">
          <Globe size={11} className="text-gray-400 shrink-0" />
          <span className="truncate flex-1">{project ? project.name : 'Selected Work'}</span>
          <X size={11} className="text-gray-300 hover:text-gray-500 cursor-pointer" onClick={() => setPage('start')} />
        </div>
        <button aria-label="New tab" className="h-6 w-6 mb-0.5 grid place-items-center rounded-md text-gray-400 hover:bg-black/[0.06]">
          <Plus size={13} />
        </button>
      </div>

      {/* toolbar */}
      <div className="shrink-0 h-10 bg-white border-b border-black/[0.06] flex items-center gap-2 px-2.5">
        <button
          aria-label="Back"
          disabled={page === 'start'}
          onClick={() => setPage('start')}
          className="p-1.5 rounded-md text-gray-500 hover:bg-black/[0.05] disabled:opacity-25"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          aria-label="Reload"
          onClick={() => {
            setSpinning(true);
            setTimeout(() => setSpinning(false), 650);
          }}
          className="p-1.5 rounded-md text-gray-500 hover:bg-black/[0.05]"
        >
          <RefreshCw size={13} className={spinning ? 'animate-spin' : ''} />
        </button>
        <div className="flex-1 flex items-center justify-center gap-1.5 max-w-[440px] mx-auto rounded-lg bg-black/[0.05] h-7 px-3">
          <Search size={11} className="text-gray-400 shrink-0" />
          <span className="text-[12px] text-gray-600 truncate">{urlText}</span>
        </div>
        <span className="w-8 hidden sm:block" />
      </div>

      {/* bookmarks bar */}
      <div className="shrink-0 h-8 border-b border-black/[0.06] flex items-center gap-1 px-2.5 overflow-x-auto mac-scroll select-none">
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            onClick={() => setPage(p.slug)}
            className={`whitespace-nowrap text-[11.5px] px-2 py-1 rounded-md transition ${
              page === p.slug ? 'bg-black/[0.07] font-medium' : 'text-gray-600 hover:bg-black/[0.04]'
            }`}
          >
            {p.name}
          </button>
        ))}
        <span className="w-px h-4 bg-black/10 mx-1 shrink-0" />
        <button
          onClick={() => window.open(PROFILE.github, '_blank', 'noreferrer')}
          className="whitespace-nowrap text-[11.5px] px-2 py-1 rounded-md text-gray-600 hover:bg-black/[0.04]"
        >
          GitHub
        </button>
        <button
          onClick={() => window.open(PROFILE.linkedin, '_blank', 'noreferrer')}
          className="whitespace-nowrap text-[11.5px] px-2 py-1 rounded-md text-gray-600 hover:bg-black/[0.04]"
        >
          LinkedIn
        </button>
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto mac-scroll bg-[#f5f6f8]">
        {page === 'start' ? (
          <div className="px-5 md:px-8 py-6 max-w-[900px] mx-auto">
            <h2 className="text-[19px] font-bold text-gray-900">Favorites</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Sarfaraz — Selected Work</p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECTS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setPage(p.slug)}
                  className="group text-left rounded-xl overflow-hidden bg-white ring-1 ring-black/[0.07] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.02] transition duration-500"
                    />
                    {p.kind === 'Hackathon Project' && (
                      <span className="absolute top-2 left-2 text-[9.5px] font-bold uppercase tracking-wide bg-amber-400 text-amber-950 rounded-full px-2 py-0.5">
                        Hackathon
                      </span>
                    )}
                  </div>
                  <div className="px-3.5 py-3">
                    <p className="text-[13px] font-semibold text-gray-800">{p.name}</p>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Globe size={10} /> {hostOf(p.liveUrl)}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <h2 className="mt-8 text-[15px] font-bold text-gray-900">Frequently Visited</h2>
            <div className="mt-3 flex gap-4">
              {[
                { label: 'GitHub', href: PROFILE.github, mono: 'GH' },
                { label: 'LinkedIn', href: PROFILE.linkedin, mono: 'in' },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => window.open(s.href, '_blank', 'noreferrer')}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <span className="w-14 h-14 rounded-2xl bg-white ring-1 ring-black/[0.08] shadow-sm grid place-items-center text-[17px] font-bold text-gray-700 group-hover:shadow-md transition">
                    {s.mono}
                  </span>
                  <span className="text-[11px] text-gray-500">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : project ? (
          <SafariPage slug={project.slug} />
        ) : null}
      </div>
    </div>
  );
}

function SafariPage({ slug }: { slug: string }) {
  const p = PROJECTS.find((x) => x.slug === slug)!;
  const { openApp } = useOS();
  return (
    <div className="px-5 md:px-8 py-6 max-w-[820px] mx-auto">
      <div className="rounded-xl overflow-hidden ring-1 ring-black/10 shadow-lg bg-white">
        <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover object-top" />
      </div>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[520px]">
          <h2 className="text-[22px] font-bold tracking-tight text-gray-900">{p.name}</h2>
          <p className="text-[12px] font-medium text-gray-400 mt-0.5">
            {p.kind} · {p.role}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{p.description}</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          {p.liveUrl && (
            <PrimaryBtn onClick={() => window.open(p.liveUrl, '_blank', 'noreferrer')}>
              <ExternalLink size={13} /> Visit Website
            </PrimaryBtn>
          )}
          <SecondaryBtn onClick={() => openApp('project', { slug: p.slug })}>Open Case Study</SecondaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ══ GitHub ═══════════════════════════════════════════════════════════════ */
interface GHUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}
interface GHRepo {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count: number;
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  Python: '#3572A5',
};

function ago(iso: string): string {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 30) return `${d}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

export function GitHubApp() {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PROFILE.githubUser}`),
          fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=updated&per_page=8`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error('github');
        const u = (await uRes.json()) as GHUser;
        const r = (await rRes.json()) as GHRepo[];
        if (alive) {
          setUser(u);
          setRepos(r);
          setState('ok');
        }
      } catch {
        if (alive) setState('error');
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto mac-scroll bg-white">
      <div className="px-6 py-6 max-w-[640px] mx-auto">
        <div className="flex items-center gap-2.5 text-gray-400">
          <GithubMark size={26} className="text-gray-800" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">github.com/{PROFILE.githubUser}</span>
        </div>

        {state === 'loading' && (
          <div className="mt-5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-64 bg-gray-100 rounded" />
              </div>
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="mt-3 h-16 bg-gray-100 rounded-xl" />
            ))}
            <p className="mt-4 text-center text-[11px] text-gray-400">Fetching live data from GitHub…</p>
          </div>
        )}

        {state === 'error' && (
          <div className="mt-8 rounded-2xl border border-black/[0.08] bg-[#fafafa] p-8 text-center">
            <GithubMark size={40} className="mx-auto text-gray-400" />
            <h2 className="mt-3 text-[15px] font-bold text-gray-800">Live GitHub data couldn&apos;t load</h2>
            <p className="mt-1 text-[12px] text-gray-500">
              The API might be rate-limited or offline — the profile itself is one click away.
            </p>
            <div className="mt-4 flex justify-center">
              <PrimaryBtn onClick={() => window.open(PROFILE.github, '_blank', 'noreferrer')}>
                <GithubMark size={14} color="#fff" /> View my GitHub
              </PrimaryBtn>
            </div>
          </div>
        )}

        {state === 'ok' && user && (
          <>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full ring-1 ring-black/10"
              />
              <div className="min-w-0">
                <h1 className="text-[18px] font-bold text-gray-900 truncate">{user.name ?? user.login}</h1>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#0a64e4] hover:underline"
                >
                  @{user.login}
                </a>
              </div>
            </div>
            {user.bio && <p className="mt-3 text-[13px] leading-relaxed text-gray-600">{user.bio}</p>}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-gray-400" />
                <b className="text-gray-800">{user.followers}</b> followers ·{' '}
                <b className="text-gray-800">{user.following}</b> following
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-gray-400" />
                <b className="text-gray-800">{user.public_repos}</b> public repositories
              </span>
            </div>

            <h2 className="mt-7 text-[14px] font-bold text-gray-900">Recently updated repositories</h2>
            <div className="mt-2.5 space-y-2.5">
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-black/[0.07] p-3.5 hover:border-[#0a64e4]/40 hover:shadow-sm transition"
                >
                  <p className="text-[13px] font-semibold text-[#0969da]">{r.name}</p>
                  {r.description && (
                    <p className="mt-0.5 text-[12px] text-gray-500 line-clamp-1">{r.description}</p>
                  )}
                  <p className="mt-1.5 flex items-center gap-3 text-[11px] text-gray-400">
                    {r.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANG_COLORS[r.language] ?? '#8b949e' }}
                        />
                        {r.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {r.stargazers_count}
                    </span>
                    <span>Updated {ago(r.updated_at)}</span>
                  </p>
                </a>
              ))}
              {repos.length === 0 && (
                <p className="text-[12.5px] text-gray-400 py-4 text-center">No public repositories found.</p>
              )}
            </div>

            <div className="mt-6 pb-2 flex justify-center">
              <SecondaryBtn onClick={() => window.open(PROFILE.github, '_blank', 'noreferrer')}>
                <ArrowLeft size={13} className="hidden" />
                Open full profile on GitHub <ExternalLink size={12} />
              </SecondaryBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
