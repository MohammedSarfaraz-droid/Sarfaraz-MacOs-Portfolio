import { useState } from 'react';
import {
  Award,
  Check,
  Download,
  FileText,
  GraduationCap,
  Info,
  Mail,
  MapPin,
  Medal,
  Power,
  Phone,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useOS } from '../os/os';
import { AppIcon, GithubMark, LinkedinMark } from '../components/icons';
import {
  ABOUT_STORY,
  ACHIEVEMENTS,
  CERTIFICATES,
  EDUCATION,
  EXPERIENCE,
  NOTES,
  PROFILE,
  RESUME_URL,
} from '../data/portfolio';

/* ── shared bits ───────────────────────────────────────────────────────── */
export function Monogram({ size = 64 }: { size?: number }) {
  return (
    <img
      src="/images/profile.jpg"
      alt=""
      className="rounded-full object-cover shrink-0 ring-4 ring-blue-500/10"
      style={{
        width: size,
        height: size,
        boxShadow: '0 6px 18px -4px rgba(30,123,246,.45)',
      }}
    />
  );
}

export function PrimaryBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md bg-[#0a64e4] hover:bg-[#0b5bd0] active:scale-[.98] transition text-white text-[12.5px] font-medium px-3.5 py-[7px] shadow-sm"
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-md bg-white ring-1 ring-black/10 hover:bg-gray-50 active:scale-[.98] transition text-gray-700 text-[12.5px] font-medium px-3.5 py-[7px] shadow-sm disabled:opacity-45"
    >
      {children}
    </button>
  );
}

/* ── Welcome ───────────────────────────────────────────────────────────── */
export function Welcome() {
  const { openApp } = useOS();
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-linear-to-b from-[#fbfbfd] to-[#eef3fb]">
      <div className="min-h-full flex flex-col items-center justify-center text-center px-8 py-8">
        <Monogram size={72} />
        <h1 className="mt-4 text-[24px] font-bold tracking-tight text-gray-900">{PROFILE.name}</h1>
        <p className="mt-1 text-[13.5px] font-semibold text-[#0a64e4]">{PROFILE.role}</p>
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          {['CSE Student', 'Builder', 'Curious Problem Solver'].map((c) => (
            <span key={c} className="text-[11px] font-medium text-gray-600 bg-white/80 ring-1 ring-black/[0.07] rounded-full px-2.5 py-[3px]">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-[11.5px] text-gray-400">
          <MapPin size={11} /> {PROFILE.location}
        </p>
        <p className="mt-4 max-w-[400px] text-[13.5px] leading-relaxed text-gray-600">
          {PROFILE.intro}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <PrimaryBtn onClick={() => openApp('finder', { section: 'projects' })}>Explore My Work</PrimaryBtn>
          <SecondaryBtn onClick={() => openApp('resume')}>Open Resume</SecondaryBtn>
          <SecondaryBtn onClick={() => openApp('contact')}>Contact Me</SecondaryBtn>
        </div>
        <p className="mt-6 text-[10.5px] text-gray-400">Tip: press ⌘ Space to search this Mac</p>
      </div>
    </div>
  );
}

/* ── About ─────────────────────────────────────────────────────────────── */
export function About() {
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-white">
      <div className="px-6 md:px-9 py-7">
        <div className="flex items-center gap-5">
          <Monogram size={66} />
          <div>
            <h1 className="text-[21px] font-bold tracking-tight text-gray-900 leading-tight">
              {PROFILE.name}
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-gray-500">{PROFILE.role}</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-gray-400">
              <MapPin size={11} /> {PROFILE.location}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {ABOUT_STORY.map((p, i) => (
            <p key={i} className="text-[13.5px] leading-relaxed text-gray-700">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 flex gap-3 items-start">
          <Sparkles size={15} className="text-[#0a64e4] mt-0.5 shrink-0" />
          <p className="text-[12px] leading-relaxed text-gray-600">
            <span className="font-semibold text-gray-800">Currently:</span> strengthening fundamentals
            and expanding into backend development (MERN), before moving deeper into cloud and AI.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {['curious', 'ambitious', 'self-aware', 'ships real work', 'actively improving'].map((t) => (
            <span key={t} className="text-[11px] font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Experience ─────────────────────────────────────────────────────────── */
export function Experience() {
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-white">
      <div className="px-6 md:px-8 py-6">
        <div className="flex items-center gap-2.5">
          <AppIcon kind="briefcase" size={26} />
          <div>
            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">Experience</h1>
            <p className="text-[11.5px] text-gray-400">Where I&apos;ve been applying the craft</p>
          </div>
        </div>

        <div className="mt-6 relative pl-7 border-l-2 border-gray-100 space-y-8">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="relative">
              <span
                className={`absolute -left-[35px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                  job.current ? 'bg-[#0a64e4]' : 'bg-gray-300'
                }`}
              />
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[15px] font-semibold text-gray-900">{job.company}</h2>
                {job.current && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded-full px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>
              <p className="text-[13px] font-medium text-gray-600 mt-0.5">{job.role}</p>
              <p className="text-[11.5px] text-gray-400 mt-0.5">{job.period}</p>
              <ul className="mt-2.5 space-y-1.5 list-disc pl-4">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-[12.5px] leading-relaxed text-gray-600">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-3 inline-flex items-start gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-2.5 py-1.5">
                <Info size={12} className="mt-px shrink-0" />
                {job.footer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Education ─────────────────────────────────────────────────────────── */
export function Education() {
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-[#fbfbfd]">
      <div className="px-6 md:px-8 py-6">
        <div className="flex items-center gap-2.5">
          <AppIcon kind="graduation" size={26} />
          <div>
            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">Education</h1>
            <p className="text-[11.5px] text-gray-400">The formal route</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {EDUCATION.map((e) => (
            <div key={e.title} className="rounded-xl border border-black/[0.07] bg-white p-4 flex gap-4 items-start shadow-sm">
              <span className="w-10 h-10 rounded-xl grid place-items-center bg-linear-to-br from-emerald-400 to-green-600 text-white shrink-0">
                <GraduationCap size={19} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-[14px] font-semibold text-gray-900">{e.title}</h2>
                  <span className="text-[10.5px] font-semibold text-[#0a64e4] bg-blue-50 ring-1 ring-blue-100 rounded-full px-2 py-0.5">
                    {e.status}
                  </span>
                </div>
                <p className="text-[12.5px] text-gray-600 mt-0.5">{e.field}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  {e.school} · {e.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Achievements ──────────────────────────────────────────────────────── */
export function Achievements() {
  const [top, ...rest] = ACHIEVEMENTS;
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-[#fbfbfd]">
      <div className="px-6 md:px-8 py-6">
        <div className="flex items-center gap-2.5">
          <AppIcon kind="trophy" size={26} />
          <div>
            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">Achievements</h1>
            <p className="text-[11.5px] text-gray-400">Moments worth mentioning</p>
          </div>
        </div>

        {top.highlight && (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 via-white to-amber-100/60 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl grid place-items-center bg-linear-to-br from-yellow-300 to-amber-500 text-white shadow-md shrink-0">
                <Trophy size={22} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-[16px] font-bold text-gray-900">{top.title}</h2>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 rounded-full px-2.5 py-1">
                    {top.place}
                  </span>
                </div>
                <p className="text-[12.5px] font-medium text-gray-600 mt-0.5">{top.org}</p>
                <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">{top.detail}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white ring-1 ring-amber-200 px-3 py-1.5">
                  <Award size={14} className="text-amber-500" />
                  <span className="text-[13px] font-bold text-gray-800">Prize — {top.prize}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 space-y-3">
          {rest.map((a) => (
            <div key={a.title} className="rounded-xl border border-black/[0.07] bg-white p-4 flex gap-3.5 items-start shadow-sm">
              <span className="w-9 h-9 rounded-xl grid place-items-center bg-gray-100 text-gray-500 shrink-0">
                <Medal size={17} />
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold text-gray-900">{a.title}</h3>
                <p className="text-[12px] text-gray-500">{a.org}</p>
                <p className="text-[12px] text-gray-500 mt-1">{a.detail}</p>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-gray-400 text-center pt-1">
            More certificates & participations live in Finder → Certificates
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Resume ─────────────────────────────────────────────────────────────── */
export function Resume() {
  const [notice, setNotice] = useState(false);
  const ready = RESUME_URL.startsWith('http');
  const act = (download?: boolean) => {
    if (!ready) {
      setNotice(true);
      return;
    }
    if (download) {
      const a = document.createElement('a');
      a.href = RESUME_URL;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.click();
    } else {
      window.open(RESUME_URL, '_blank', 'noreferrer');
    }
  };
  return (
    <div className="h-full flex flex-col bg-[#e9e9ec]">
      <div className="shrink-0 h-11 bg-white border-b border-black/[0.07] flex items-center px-3.5 gap-2">
        <FileText size={14} className="text-gray-400" />
        <span className="flex-1 text-[12px] font-medium text-gray-600 truncate">
          {PROFILE.name} — Resume.pdf
        </span>
        <SecondaryBtn onClick={() => act()}>Open Resume</SecondaryBtn>
        <SecondaryBtn onClick={() => act()}>View in Browser</SecondaryBtn>
        <PrimaryBtn onClick={() => act(true)}>
          <Download size={13} /> Download
        </PrimaryBtn>
      </div>
      {notice && (
        <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-50 border-b border-amber-200 text-[11.5px] text-amber-800">
          <Info size={13} className="shrink-0" />
          <span className="flex-1">
            Resume is hosted on Google Drive. Use the buttons above to open or download it.
          </span>
          <button onClick={() => setNotice(false)} className="font-semibold hover:text-amber-900">OK</button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto mac-scroll p-4 md:p-7">
        <div className="mx-auto max-w-[660px] bg-white rounded-[3px] shadow-xl ring-1 ring-black/10 px-7 md:px-10 py-9 text-gray-800">
          <h1 className="text-[20px] font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="text-[11.5px] font-medium text-[#0a64e4] mt-0.5">{PROFILE.role}</p>
          <p className="text-[10.5px] text-gray-500 mt-1.5">
            {PROFILE.location} · {PROFILE.phone} · {PROFILE.email} · linkedin.com/in/mdsarfarazuddin ·
            github.com/MohammedSarfaraz-droid
          </p>

          <ResumeSection title="Summary">
            <p>
              Frontend developer and CSE student focused on modern, responsive web experiences. Internship and
              part-time client experience; shipped production websites with HTML, Tailwind CSS, JavaScript, React
              and Next.js. Currently expanding into the MERN stack, then cloud and AI.
            </p>
          </ResumeSection>

          <ResumeSection title="Experience">
            <p className="font-semibold">AM Software Solutions — Frontend Developer (Part-time)</p>
            <p className="text-gray-500 text-[10.5px]">Feb 2026 — Present</p>
            <p className="mt-1">
              Build client-ready websites that showcase design ideas and help win projects; responsive,
              pixel-accurate interfaces with Tailwind CSS and shadcn/ui; Git/GitHub version control; production
              deployment workflows. Selected work: Nick Contractor, Gutama Roofing, Topcoat LLC.
            </p>
            <p className="font-semibold mt-3">CoffeeMustache — Frontend Developer Intern</p>
            <p className="text-gray-500 text-[10.5px]">Sep 2025 — Nov 2025</p>
            <p className="mt-1">
              Developed a café-focused POS frontend; collaborated on API integration; rebuilt the landing page in
              Next.js; modernized UI/UX (self-estimated improvement ~70%).
            </p>
          </ResumeSection>

          <ResumeSection title="Projects">
            <p>
              <span className="font-semibold">SafeSpeak</span> — anonymous multilingual peer-support platform
              (SPEC Industry Hack 2026): anonymous auth, language-based matching, realtime chat, English ↔ Hindi
              translation. Next.js · Firebase · Vercel.
            </p>
            <p className="mt-1.5">
              <span className="font-semibold">LumeNoor</span> — conversion-focused agency landing page. Next.js ·
              Tailwind CSS · Vercel.
            </p>
          </ResumeSection>

          <ResumeSection title="Education">
            <p>B.E. Computer Science Engineering — ISL Engineering College (2024—2028), 3rd year</p>
            <p className="mt-1">Intermediate (PCM) — Shaheen Junior College (2023—2024)</p>
            <p className="mt-1">All Saints High School, Abids — 2022</p>
          </ResumeSection>

          <ResumeSection title="Skills">
            <p>
              HTML · CSS · JavaScript · React · Next.js · Tailwind CSS · Bootstrap · Shadcn UI · REST APIs ·
              Firebase (project experience) · Git · GitHub · Vercel
            </p>
            <p className="mt-1 text-gray-500">Learning: Node.js · Express · MongoDB · Backend architecture</p>
          </ResumeSection>

          <ResumeSection title="Achievements">
            <p>Runner-Up — Hack4SDG (AIESEC × IIT Hyderabad), 2nd place, ₹10,000 prize</p>
            <p className="mt-1">Participant — SPEC Industry Hack 2026 (24-hour national hackathon)</p>
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gray-400 border-b border-gray-200 pb-1">
        {title}
      </h2>
      <div className="mt-2 text-[11.5px] leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Notes ─────────────────────────────────────────────────────────────── */
export function Notes() {
  const [sel, setSel] = useState(0);
  const { isMobile } = useOS();
  const note = NOTES[sel];
  return (
    <div className="h-full flex flex-col md:flex-row bg-white">
      <aside className={`${isMobile ? 'flex gap-1.5 p-2 overflow-x-auto mac-scroll border-b' : 'w-56 shrink-0 border-r p-2 space-y-0.5'} bg-[#fbfaf7] border-black/[0.07]`}>
        {NOTES.map((n, i) => (
          <button
            key={n.title}
            onClick={() => setSel(i)}
            className={`text-left rounded-lg transition-colors ${
              isMobile ? 'px-3 py-1.5 whitespace-nowrap text-[12px]' : 'w-full px-3 py-2'
            } ${sel === i ? 'bg-[#f5e7bd]' : 'hover:bg-black/4'}`}
          >
            <span className={`block font-semibold text-gray-800 ${isMobile ? 'text-[12px]' : 'text-[12.5px]'}`}>
              {n.title}
            </span>
            {!isMobile && (
              <span className="block text-[10.5px] text-gray-400 mt-0.5 truncate">
                {n.date} · {n.body.slice(0, 34)}…
              </span>
            )}
          </button>
        ))}
      </aside>
      <div className="flex-1 overflow-y-auto mac-scroll px-6 md:px-10 py-6">
        <p className="text-center text-[11px] text-gray-400">{note.date}</p>
        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-gray-900">{note.title}</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-gray-700 max-w-[520px]">{note.body}</p>
      </div>
    </div>
  );
}

/* ── Contact (Mail) ────────────────────────────────────────────────────── */
export function Contact() {
  const rows = [
    { icon: <Mail size={15} />, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: <Phone size={15} />, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: <LinkedinMark size={15} />, label: 'LinkedIn', value: 'linkedin.com/in/mdsarfarazuddin', href: PROFILE.linkedin },
    { icon: <GithubMark size={15} />, label: 'GitHub', value: 'github.com/MohammedSarfaraz-droid', href: PROFILE.github },
    { icon: <MapPin size={15} />, label: 'Location', value: PROFILE.location },
  ];
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="shrink-0 border-b border-black/[0.07] text-[12.5px]">
        <div className="flex items-center gap-3 px-4 py-2 border-b border-black/5">
          <span className="w-14 text-gray-400">From:</span>
          <span className="font-medium text-gray-700 truncate">Sarfaraz &lt;{PROFILE.email}&gt;</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 border-b border-black/5">
          <span className="w-14 text-gray-400">To:</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-[#0a64e4] font-medium px-2 py-0.5 text-[11.5px]">
            You
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <span className="w-14 text-gray-400">Subject:</span>
          <span className="font-semibold text-gray-800">Let&apos;s build something.</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll px-6 py-5">
        <p className="text-[13.5px] leading-relaxed text-gray-700">Hi there,</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-gray-700 max-w-[520px]">
          Thanks for exploring my workspace. I&apos;m currently open to frontend internships, junior roles and
          interesting collaborations — especially if it involves shipping interfaces people actually use.
        </p>

        <div className="mt-5 grid sm:grid-cols-2 gap-2 max-w-[560px]">
          {rows.map((r) => (
            <a
              key={r.label}
              href={r.href ?? undefined}
              target={r.href?.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={`flex items-center gap-3 rounded-xl border border-black/[0.07] px-3.5 py-3 transition ${
                r.href ? 'hover:border-[#0a64e4]/40 hover:shadow-sm' : 'cursor-default'
              }`}
            >
              <span className="text-[#0a64e4]">{r.icon}</span>
              <span className="min-w-0">
                <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">
                  {r.label}
                </span>
                <span className="block text-[12.5px] font-medium text-gray-800 truncate">{r.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <PrimaryBtn onClick={() => (window.location.href = `mailto:${PROFILE.email}`)}>
            <Mail size={13} /> Send Email
          </PrimaryBtn>
          <SecondaryBtn onClick={() => window.open(PROFILE.linkedin, '_blank', 'noreferrer')}>
            <LinkedinMark size={13} /> Open LinkedIn
          </SecondaryBtn>
          <SecondaryBtn onClick={() => window.open(PROFILE.github, '_blank', 'noreferrer')}>
            <GithubMark size={13} /> Open GitHub
          </SecondaryBtn>
        </div>

        <p className="mt-8 text-[12.5px] text-gray-500">— Sarfaraz</p>
        <p className="mt-1 text-[10.5px] text-gray-300">Sent from my Mac</p>
      </div>
    </div>
  );
}

/* ── Settings ──────────────────────────────────────────────────────────── */
export function SettingsApp() {
  const { settings, setSetting } = useOS();
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-[#f5f5f7]">
      <div className="px-6 py-6 max-w-[520px] mx-auto space-y-3.5">
        <div className="rounded-2xl bg-white ring-1 ring-black/6 shadow-sm p-5 flex items-center gap-4">
          <Monogram size={56} />
          <div>
            <h1 className="text-[16px] font-bold text-gray-900">Sarfaraz&apos;s MacBook</h1>
            <p className="text-[12px] text-gray-500">SarfarazOS 26.0 — Portfolio Edition</p>
            <span className="mt-1.5 inline-block text-[10.5px] font-semibold text-[#0a64e4] bg-blue-50 ring-1 ring-blue-100 rounded-full px-2 py-0.5">
              CSE · 3rd Year
            </span>
          </div>
        </div>

        <SettingsCard title="Appearance">
          <SettingsRow label="Light Mode" hint="The one and only (for now)">
            <span className="w-5 h-5 rounded-full bg-[#0a64e4] grid place-items-center">
              <Check size={12} strokeWidth={3} className="text-white" />
            </span>
          </SettingsRow>
          <SettingsRow label="Dark Mode" hint="Not available in this workspace">
            <span className="w-5 h-5 rounded-full ring-2 ring-gray-200" />
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="Interface">
          <SettingsRow label="Animations" hint="Spring transitions everywhere">
            <Switch on={settings.animations} onClick={() => setSetting('animations', !settings.animations)} />
          </SettingsRow>
          <SettingsRow label="Sound Effects" hint="UI sounds (visual only)">
            <Switch on={settings.sounds} onClick={() => setSetting('sounds', !settings.sounds)} />
          </SettingsRow>
          <SettingsRow label="Reduce Motion" hint="Minimize animation">
            <Switch on={settings.reduceMotion} onClick={() => setSetting('reduceMotion', !settings.reduceMotion)} />
          </SettingsRow>
          <SettingsRow label="Dock Magnification" hint="Magnify icons on hover">
            <Switch on={settings.dockMagnify} onClick={() => setSetting('dockMagnify', !settings.dockMagnify)} />
          </SettingsRow>
        </SettingsCard>

        <SettingsCard title="About This Mac">
          {[
            ['Owner', PROFILE.name],
            ['Role', 'Frontend Developer'],
            ['Study', 'Computer Science Engineering'],
            ['Location', PROFILE.location],
            ['Mission', 'Learning + Building — MERN → Cloud → AI'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-4 py-2.5 border-b border-black/5 last:border-0">
              <span className="text-[12.5px] text-gray-500">{k}</span>
              <span className="text-[12.5px] font-medium text-gray-800 text-right">{v}</span>
            </div>
          ))}
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-black/6 shadow-sm overflow-hidden">
      <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">{title}</p>
      {children}
    </div>
  );
}

function SettingsRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5 last:border-0">
      <span>
        <span className="block text-[13px] font-medium text-gray-800">{label}</span>
        {hint && <span className="block text-[10.5px] text-gray-400">{hint}</span>}
      </span>
      {children}
    </div>
  );
}

export function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${
        on ? 'bg-[#34c759]' : 'bg-gray-300'
      }`}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200"
        style={{ left: on ? 20 : 2 }}
      />
    </button>
  );
}

/* ── Certificate viewer ────────────────────────────────────────────────── */
export function CertificateViewer({ index = 0 }: { index?: number }) {
  const cert = CERTIFICATES[Math.min(index, CERTIFICATES.length - 1)];
  const ready = !cert.file.includes('HERE');
  return (
    <div className="h-full overflow-y-auto mac-scroll bg-[#f5f5f7]">
      <div className="p-6 max-w-[480px] mx-auto">
        <div className="bg-white rounded-xl ring-1 ring-black/10 shadow-md p-8 text-center">
          <AppIcon kind="doc" size={52} className="mx-auto" />
          <h1 className="mt-4 text-[15px] font-bold text-gray-900 leading-snug">{cert.name}</h1>
          <p className="mt-1 text-[12px] font-medium text-gray-500">{cert.issuer}</p>
          <p className="mt-3 text-[12px] leading-relaxed text-gray-500">{cert.detail}</p>
          {ready ? (
            <div className="mt-5 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-black/10 shadow-sm">
              <img src={cert.file} alt={`${cert.name} certificate`} className="block w-full h-auto object-contain" />
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-[11px] text-gray-400">
              Certificate preview will appear here once the file is added — drop it into the project and update the
              entry in <code className="font-mono">src/data/portfolio.ts</code>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── goodbye overlay content (shared) ─────────────────────────────────── */
export function GoodbyeCard({ onBack, onRestart }: { onBack: () => void; onRestart?: () => void }) {
  return (
    <div className="text-center px-8 text-white">
      <Power size={22} strokeWidth={1.6} className="mx-auto text-white/35" />
      <h1 className="mt-8 text-4xl md:text-5xl font-light tracking-tight text-white">
        Thanks for visiting my workspace.
      </h1>
      <p className="mt-8 text-[15px] font-semibold text-white/90">{PROFILE.name}</p>
      <p className="mt-1 text-[13px] text-white/55">{PROFILE.role}</p>
      <p className="mt-1 text-[13px] text-white/55">{PROFILE.location}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button onClick={() => window.open(PROFILE.github, '_blank', 'noreferrer')} className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/85 hover:bg-white/10 transition">GitHub ↗</button>
        <button onClick={() => window.open(PROFILE.linkedin, '_blank', 'noreferrer')} className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/85 hover:bg-white/10 transition">LinkedIn ↗</button>
        <button onClick={() => (window.location.href = `mailto:${PROFILE.email}`)} className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/85 hover:bg-white/10 transition">Email ↗</button>
        <button onClick={onBack} className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/85 hover:bg-white/10 transition">Resume ↗</button>
      </div>
      <button
        onClick={onRestart ?? onBack}
        className="mt-9 mx-auto flex items-center gap-2 rounded-full bg-white/10 text-white text-[12px] font-semibold px-5 py-2.5 hover:bg-white/15 active:scale-[.98] transition"
      >
        <Power size={13} /> Restart SarfarazOS
      </button>
      <p className="mt-10 text-[11px] italic text-white/30">Built with curiosity, caffeine, and a lot of debugging.</p>
    </div>
  );
}
