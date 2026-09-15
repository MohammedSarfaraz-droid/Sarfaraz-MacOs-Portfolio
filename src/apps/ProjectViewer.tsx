import { Check, ExternalLink, Info } from 'lucide-react';
import { AppIcon, GithubMark } from '../components/icons';
import { CLIENT_WORK_NOTE, PROJECTS } from '../data/portfolio';
import { PrimaryBtn, SecondaryBtn } from './apps';

const KIND_STYLES: Record<string, string> = {
  'Hackathon Project': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Personal Project': 'bg-blue-50 text-[#0a64e4] ring-blue-200',
  'Professional / Client Work': 'bg-slate-100 text-slate-600 ring-slate-300',
};

export default function ProjectViewer({ slug }: { slug: string }) {
  const p = PROJECTS.find((x) => x.slug === slug) ?? PROJECTS[0];
  const host = p.liveUrl ? new URL(p.liveUrl).host : '';

  return (
    <div className="h-full overflow-y-auto mac-scroll bg-[#fafafc]">
      <div className="p-4 md:p-6 max-w-[980px] mx-auto">
        {/* browser mock */}
        <div className="rounded-xl overflow-hidden ring-1 ring-black/10 shadow-lg bg-white">
          <div className="h-9 bg-[#eceef1] flex items-center px-3 gap-2 border-b border-black/[0.06]">
            <span className="flex gap-1.5">
              <i className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] block" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] block" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#28C840] block" />
            </span>
            <span className="flex-1 max-w-[380px] mx-auto truncate rounded-md bg-white/90 ring-1 ring-black/[0.06] px-3 py-[3px] text-center text-[11px] text-gray-500">
              {host || p.name}
            </span>
            <span className="w-8" />
          </div>
          <img
            src={p.image}
            alt={`${p.name} website preview`}
            loading="lazy"
            className="w-full aspect-[16/9.5] object-cover object-top"
          />
        </div>

        {/* header */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`text-[10.5px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ring-1 ${KIND_STYLES[p.kind]}`}>
            {p.kind}
          </span>
          {p.category === 'client' && (
            <span className="text-[10.5px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ring-1 bg-white text-gray-500 ring-gray-200">
              Selected Client Work
            </span>
          )}
          <span className={`text-[10.5px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1 ring-1 bg-gradient-to-r ${p.accent} text-white ring-transparent`}>
            {p.name}
          </span>
        </div>
        <h1 className="mt-2.5 text-[26px] font-bold tracking-tight text-gray-900">{p.name}</h1>
        <p className="text-[13.5px] font-medium text-gray-500">{p.tagline}</p>
        <p className="mt-1 text-[11.5px] text-gray-400">
          {p.role} · {p.date}
        </p>

        <div className="mt-5 grid md:grid-cols-[1fr_250px] gap-6">
          {/* main column */}
          <div>
            <p className="text-[13.5px] leading-relaxed text-gray-700">{p.description}</p>

            {p.features && (
              <div className="mt-5">
                <h3 className="text-[14px] font-bold text-gray-900">Key Features</h3>
                <div className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {p.features.map((f) => (
                    <p key={f} className="flex items-center gap-2 text-[12.5px] text-gray-600">
                      <Check size={13} strokeWidth={3} className="text-emerald-500 shrink-0" />
                      {f}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {p.caseStudy && (
              <div className="mt-6 space-y-5">
                <CaseBlock title="The Problem" accent="bg-rose-400">
                  {p.caseStudy.problem}
                </CaseBlock>
                <CaseBlock title="The Concept" accent="bg-indigo-400">
                  {p.caseStudy.concept}
                </CaseBlock>
                <CaseBlock title="Technology" accent="bg-sky-400">
                  {p.caseStudy.technology}
                </CaseBlock>
                <CaseBlock title="What I Learned" accent="bg-emerald-400">
                  {p.caseStudy.learned}
                </CaseBlock>
              </div>
            )}

            {p.note && (
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-100 px-3.5 py-3 text-[12px] leading-relaxed text-gray-600">
                <Info size={14} className="text-[#0a64e4] mt-0.5 shrink-0" />
                {p.note}
              </p>
            )}
            {p.category === 'client' && (
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-slate-100 border border-slate-200 px-3.5 py-3 text-[12px] leading-relaxed text-gray-600">
                <Info size={14} className="text-slate-500 mt-0.5 shrink-0" />
                {CLIENT_WORK_NOTE}
              </p>
            )}
          </div>

          {/* aside */}
          <aside className="space-y-3.5">
            <div className="rounded-xl bg-white ring-1 ring-black/[0.07] shadow-sm p-4">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Details</h4>
              <dl className="mt-2.5 space-y-2.5 text-[12px]">
                <div>
                  <dt className="text-gray-400">Type</dt>
                  <dd className="font-medium text-gray-800">{p.kind}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Role</dt>
                  <dd className="font-medium text-gray-800">{p.role}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Timeline</dt>
                  <dd className="font-medium text-gray-800">{p.date}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Deployment</dt>
                  <dd className="font-medium text-gray-800">Vercel</dd>
                </div>
              </dl>
              <h4 className="mt-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Stack</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="text-[10.5px] font-medium text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {p.liveUrl && (
                <PrimaryBtn onClick={() => window.open(p.liveUrl, '_blank', 'noreferrer')}>
                  <ExternalLink size={13} /> Open Live Site
                </PrimaryBtn>
              )}
              {p.githubUrl && (
                <SecondaryBtn onClick={() => window.open(p.githubUrl, '_blank', 'noreferrer')}>
                  <GithubMark size={14} /> View on GitHub
                </SecondaryBtn>
              )}
            </div>

            {p.category === 'personal' && p.slug !== 'safespeak' && (
              <div className="rounded-xl bg-white ring-1 ring-black/[0.07] p-4 flex gap-2.5 items-center">
                <AppIcon kind="folder" size={26} />
                <p className="text-[11.5px] text-gray-500 leading-snug">
                  Built as a personal project — design exploration + shipping practice.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function CaseBlock({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-[14px] font-bold text-gray-900">
        <span className={`w-2.5 h-2.5 rounded-full ${accent}`} />
        {title}
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-600">{children}</p>
    </div>
  );
}
