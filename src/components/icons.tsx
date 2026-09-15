import {
  Apple,
  Briefcase,
  Cog,
  GraduationCap,
  Mail,
  Search,
  Terminal as TermGlyph,
  Trash2,
  Trophy,
  UserRound,
} from 'lucide-react';

/* ── Brand marks (not shipped with lucide) ─────────────────────────────── */
export function GithubMark({
  size = 24,
  color = 'currentColor',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

export function LinkedinMark({
  size = 24,
  color = 'currentColor',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
      />
    </svg>
  );
}

export type IconKind =
  | 'finder'
  | 'safari'
  | 'terminal'
  | 'photos'
  | 'notes'
  | 'settings'
  | 'github'
  | 'mail'
  | 'folder'
  | 'pdf'
  | 'doc'
  | 'activity'
  | 'about'
  | 'trophy'
  | 'graduation'
  | 'briefcase'
  | 'trash'
  | 'search'
  | 'apple';

interface Props {
  kind: IconKind | string;
  size?: number;
  className?: string;
}

const GLYPHS: Record<string, { bg: string; g: any; dark?: boolean }> = {
  terminal: { bg: 'linear-gradient(180deg,#3c414d 0%,#13151b 100%)', g: TermGlyph },
  settings: { bg: 'linear-gradient(180deg,#b9bec9 0%,#7c828e 100%)', g: Cog },
  github: { bg: 'linear-gradient(180deg,#434b55 0%,#1a1e24 100%)', g: GithubMark },
  mail: { bg: 'linear-gradient(180deg,#5fa8fb 0%,#1a6cec 100%)', g: Mail },
  about: { bg: 'linear-gradient(180deg,#c9a67f 0%,#a37e56 100%)', g: UserRound },
  trophy: { bg: 'linear-gradient(180deg,#ffd164 0%,#efa230 100%)', g: Trophy },
  graduation: { bg: 'linear-gradient(180deg,#4ade80 0%,#169f4a 100%)', g: GraduationCap },
  briefcase: { bg: 'linear-gradient(180deg,#7ea6f7 0%,#3b6fe0 100%)', g: Briefcase },
  trash: { bg: 'linear-gradient(180deg,#ecedf1 0%,#c3c7d0 100%)', g: Trash2, dark: true },
  search: { bg: 'linear-gradient(180deg,#9aa0aa 0%,#6b7280 100%)', g: Search },
  apple: { bg: 'linear-gradient(180deg,#484c55 0%,#17191e 100%)', g: Apple },
};

export function AppIcon({ kind, size = 48, className = '' }: Props) {
  switch (kind) {
    case 'about':
      return (
        <img
          src="/images/profile.jpg"
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          className={`object-cover icon-shadow ${className}`}
          style={{ borderRadius: size * 0.26 }}
        />
      );
    case 'finder':
      return <FinderSvg size={size} className={className} />;
    case 'safari':
      return <SafariSvg size={size} className={className} />;
    case 'photos':
      return <PhotosSvg size={size} className={className} />;
    case 'notes':
      return <NotesSvg size={size} className={className} />;
    case 'activity':
      return <ActivitySvg size={size} className={className} />;
    case 'folder':
      return <FolderSvg size={size} className={className} />;
    case 'pdf':
      return <PdfSvg size={size} className={className} />;
    case 'doc':
      return <DocSvg size={size} className={className} />;
    default: {
      const c = GLYPHS[kind] ?? GLYPHS.search;
      const G = c.g;
      return (
        <div
          className={`relative grid place-items-center icon-shadow ${className}`}
          style={{
            width: size,
            height: size,
            borderRadius: Math.round(size * 0.26),
            background: c.bg,
          }}
        >
          <G
            size={size * 0.58}
            color={c.dark ? '#434a55' : '#ffffff'}
            strokeWidth={1.9}
          />
        </div>
      );
    }
  }
}

/* ── Finder ─────────────────────────────────────────────────────────────── */
function FinderSvg({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`icon-shadow ${className}`}
      style={{ borderRadius: size * 0.24 }}
    >
      <defs>
        <linearGradient id="fik-fgA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6BCBFF" />
          <stop offset="1" stopColor="#1D76F2" />
        </linearGradient>
        <clipPath id="fik-box">
          <rect width="64" height="64" rx="14" />
        </clipPath>
        <clipPath id="fik-left">
          <path d="M0 16 Q0 2 12 2 H33 C26.5 20 26.5 44 33 62 H12 Q0 62 0 50 Z" />
        </clipPath>
        <clipPath id="fik-right">
          <path d="M33 2 H52 Q64 2 64 16 V50 Q64 62 52 62 H33 C26.5 44 26.5 20 33 2 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#fik-box)">
        <rect width="64" height="64" fill="url(#fik-fgA)" />
        <path
          d="M0 16 Q0 2 12 2 H33 C26.5 20 26.5 44 33 62 H12 Q0 62 0 50 Z"
          fill="#F4FAFF"
        />
        <rect x="13.5" y="19" width="4.6" height="9" rx="2.3" fill="#2B6FE0" />
        <rect x="45.8" y="19" width="4.6" height="9" rx="2.3" fill="#D7E9FE" />
        <g clipPath="url(#fik-left)">
          <path
            d="M12 38.5 Q32 51 52 38.5"
            stroke="#2B6FE0"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <g clipPath="url(#fik-right)">
          <path
            d="M12 38.5 Q32 51 52 38.5"
            stroke="#D7E9FE"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

/* ── Safari ─────────────────────────────────────────────────────────────── */
function SafariSvg({ size, className }: { size: number; className?: string }) {
  const ticks = Array.from({ length: 24 });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`icon-shadow ${className}`}
      style={{ borderRadius: size * 0.24 }}
    >
      <defs>
        <linearGradient id="fik-sfB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#56B7F9" />
          <stop offset="1" stopColor="#1B69E0" />
        </linearGradient>
        <clipPath id="fik-sfBox">
          <rect width="64" height="64" rx="14" />
        </clipPath>
      </defs>
      <g clipPath="url(#fik-sfBox)">
        <rect width="64" height="64" fill="#FDFDFE" />
        <circle cx="32" cy="32" r="22.5" fill="url(#fik-sfB)" />
        <circle cx="32" cy="32" r="19.5" fill="#FFFFFF" />
        {ticks.map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const r1 = 18.8;
          const r2 = i % 2 ? 17 : 16;
          return (
            <line
              key={i}
              x1={32 + Math.cos(a) * r1}
              y1={32 + Math.sin(a) * r1}
              x2={32 + Math.cos(a) * r2}
              y2={32 + Math.sin(a) * r2}
              stroke="#C7CDD6"
              strokeWidth="1"
            />
          );
        })}
        <path d="M32 32 L46.5 17.5 L36.2 36.2 Z" fill="#F4534B" />
        <path
          d="M32 32 L17.5 46.5 L27.8 27.8 Z"
          fill="#F3F5F8"
          stroke="#D2D8E0"
          strokeWidth=".8"
        />
        <circle cx="32" cy="32" r="1.8" fill="#5B6470" />
      </g>
    </svg>
  );
}

/* ── Photos ─────────────────────────────────────────────────────────────── */
const PETALS = ['#FF9F0A', '#FFD60A', '#32D74B', '#64D2FF', '#0A84FF', '#BF5AF2', '#FF375F', '#FF6482'];
function PhotosSvg({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`icon-shadow ${className}`}
      style={{ borderRadius: size * 0.24 }}
    >
      <defs>
        <clipPath id="fik-phBox">
          <rect width="64" height="64" rx="14" />
        </clipPath>
      </defs>
      <g clipPath="url(#fik-phBox)">
        <rect width="64" height="64" fill="#FFFFFF" />
        {PETALS.map((c, i) => (
          <ellipse
            key={i}
            cx="32"
            cy="19.5"
            rx="6.2"
            ry="12.8"
            fill={c}
            fillOpacity="0.78"
            transform={`rotate(${i * 45} 32 32)`}
          />
        ))}
      </g>
    </svg>
  );
}

/* ── Notes ──────────────────────────────────────────────────────────────── */
function NotesSvg({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`icon-shadow ${className}`}
      style={{ borderRadius: size * 0.24 }}
    >
      <defs>
        <linearGradient id="fik-nt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE065" />
          <stop offset="1" stopColor="#FFC42E" />
        </linearGradient>
        <clipPath id="fik-ntBox">
          <rect width="64" height="64" rx="14" />
        </clipPath>
      </defs>
      <g clipPath="url(#fik-ntBox)">
        <rect width="64" height="64" fill="#FFFFFF" />
        <rect width="64" height="15" fill="url(#fik-nt)" />
        {[26, 35, 44].map((y) => (
          <rect key={y} x="12" y={y} width="40" height="3" rx="1.5" fill="#E4E7EC" />
        ))}
      </g>
    </svg>
  );
}

/* ── Activity Monitor ───────────────────────────────────────────────────── */
function ActivitySvg({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`icon-shadow ${className}`}
      style={{ borderRadius: size * 0.24 }}
    >
      <defs>
        <linearGradient id="fik-am" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F2B20" />
          <stop offset="1" stopColor="#0C100D" />
        </linearGradient>
        <clipPath id="fik-amBox">
          <rect width="64" height="64" rx="14" />
        </clipPath>
      </defs>
      <g clipPath="url(#fik-amBox)">
        <rect width="64" height="64" fill="url(#fik-am)" />
        {[16, 28, 40, 52].map((y) => (
          <line key={y} x1="0" y1={y} x2="64" y2={y} stroke="#38F55B" strokeOpacity="0.1" />
        ))}
        <polyline
          points="7,36 17,36 22,16 30,50 35,26 39,36 57,36"
          fill="none"
          stroke="#38F55B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* ── Folder ─────────────────────────────────────────────────────────────── */
export function FolderSvg({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={(size * 68) / 56}
      height={size}
      viewBox="0 0 68 56"
      className={className}
      style={{ filter: 'drop-shadow(0 3px 5px rgba(15,23,42,.25))' }}
    >
      <defs>
        <linearGradient id="fik-fdB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9DFFA" />
          <stop offset="1" stopColor="#93C9F1" />
        </linearGradient>
        <linearGradient id="fik-fdF" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CC3F6" />
          <stop offset="1" stopColor="#3E90E4" />
        </linearGradient>
      </defs>
      <path
        d="M4 24 V12 a6 6 0 0 1 6-6 h12 a6 6 0 0 1 4.2 1.8 l4.6 4.6 a6 6 0 0 0 4.2 1.8 H58 a6 6 0 0 1 6 6 v4 Z"
        fill="url(#fik-fdB)"
      />
      <rect x="2" y="19" width="64" height="31" rx="6" fill="url(#fik-fdF)" />
      <rect x="3.5" y="20" width="61" height="1.6" rx="0.8" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}

/* ── PDF document ───────────────────────────────────────────────────────── */
function PdfSvg({ size, className }: { size: number; className?: string }) {
  const h = size;
  const w = (size * 52) / 64;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 52 64"
      className={className}
      style={{ filter: 'drop-shadow(0 3px 5px rgba(15,23,42,.22))' }}
    >
      <path
        d="M8 2 h25 l11 11 v43 a6 6 0 0 1 -6 6 H8 a6 6 0 0 1 -6 -6 V8 a6 6 0 0 1 6-6 Z"
        fill="#FFFFFF"
        stroke="#E2E5EA"
      />
      <path d="M33 2 l11 11 H35 a2 2 0 0 1 -2-2 Z" fill="#EEF1F5" stroke="#E2E5EA" />
      {[20, 27, 34].map((y) => (
        <rect key={y} x="9" y={y} width="30" height="3.4" rx="1.7" fill="#E4E7EC" />
      ))}
      <rect x="6" y="44" width="40" height="14" rx="3.5" fill="#E0301E" />
      <text
        x="26"
        y="54"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="#FFFFFF"
        fontFamily="-apple-system, Arial"
        letterSpacing="1"
      >
        PDF
      </text>
    </svg>
  );
}

/* ── Plain document ─────────────────────────────────────────────────────── */
function DocSvg({ size, className }: { size: number; className?: string }) {
  const h = size;
  const w = (size * 52) / 64;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 52 64"
      className={className}
      style={{ filter: 'drop-shadow(0 3px 5px rgba(15,23,42,.22))' }}
    >
      <path
        d="M8 2 h25 l11 11 v43 a6 6 0 0 1 -6 6 H8 a6 6 0 0 1 -6 -6 V8 a6 6 0 0 1 6-6 Z"
        fill="#FFFFFF"
        stroke="#E2E5EA"
      />
      <path d="M33 2 l11 11 H35 a2 2 0 0 1 -2-2 Z" fill="#EEF1F5" stroke="#E2E5EA" />
      <rect x="9" y="16" width="20" height="4" rx="2" fill="#7EA6F7" />
      {[27, 34, 41, 48].map((y) => (
        <rect key={y} x="9" y={y} width="32" height="3.4" rx="1.7" fill="#E4E7EC" />
      ))}
    </svg>
  );
}
