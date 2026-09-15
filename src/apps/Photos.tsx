import { useMemo, useState } from 'react';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { useOS } from '../os/os';
import { PROJECTS } from '../data/portfolio';

interface Photo {
  img: string;
  title: string;
  sub: string;
  slug: string;
}

interface Album {
  id: string;
  label: string;
  photos: Photo[];
}

export default function Photos() {
  const { openApp, isMobile } = useOS();
  const albums: Album[] = useMemo(
    () => [
      {
        id: 'projects',
        label: 'Projects',
        photos: PROJECTS.filter((p) => p.category === 'personal').map((p) => ({
          img: p.image,
          title: p.name,
          sub: p.tagline,
          slug: p.slug,
        })),
      },
      {
        id: 'client',
        label: 'Client Work',
        photos: PROJECTS.filter((p) => p.category === 'client').map((p) => ({
          img: p.image,
          title: p.name,
          sub: 'AM Software Solutions',
          slug: p.slug,
        })),
      },
      {
        id: 'hackathons',
        label: 'Hackathons',
        photos: [
          {
            img: PROJECTS[0].image,
            title: 'SafeSpeak — SPEC Industry Hack 2026',
            sub: '24-hour national hackathon build',
            slug: 'safespeak',
          },
        ],
      },
      {
        id: 'hack4sdg',
        label: 'Hack4SDG',
        photos: Array.from({ length: 5 }, (_, i) => ({
          img: `/images/Hack4sdg-pictures/${i + 1}.jpeg`,
          title: `Hack4SDG — Moment ${i + 1}`,
          sub: 'AIESEC × IIT Hyderabad · Runner-Up',
          slug: 'safespeak',
        })),
      },
      {
        id: 'spec',
        label: 'SPEC Industry Hack',
        photos: Array.from({ length: 4 }, (_, i) => ({
          img: `/images/Spec-pictures/${i + 1}.jpeg`,
          title: `SPEC Industry Hack — Moment ${i + 1}`,
          sub: 'SafeSpeak · 24-hour national hackathon',
          slug: 'safespeak',
        })),
      },
    ],
    []
  );

  const [albumId, setAlbumId] = useState('projects');
  const [photo, setPhoto] = useState<Photo | null>(null);
  const album = albums.find((a) => a.id === albumId) ?? albums[0];

  return (
    <div className="h-full flex bg-white relative overflow-hidden">
      {!isMobile && (
        <aside className="w-44 shrink-0 border-r border-black/6 bg-black/2.5">
          <p className="px-2 pb-1.5 text-[11px] font-semibold text-gray-400">Albums</p>
          {albums.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setAlbumId(a.id);
                setPhoto(null);
              }}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left ${
                albumId === a.id ? 'bg-black/[0.07]' : 'hover:bg-black/4'
              }`}
            >
              <img src={a.photos[0].img} alt="" className="w-7 h-7 rounded-[5px] object-cover ring-1 ring-black/10" />
              <span className="min-w-0">
                <span className="block text-[12.5px] font-medium text-gray-800 truncate">{a.label}</span>
                <span className="block text-[10.5px] text-gray-400">{a.photos.length}</span>
              </span>
            </button>
          ))}
        </aside>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="shrink-0 px-4 md:px-5 pt-4 pb-3 flex items-end justify-between">
          <div>
            <h1 className="text-[19px] font-bold text-gray-900">{album.label}</h1>
            <p className="text-[11px] text-gray-400">{album.photos.length} items · click to view</p>
          </div>
          {isMobile && (
            <select
              value={albumId}
              onChange={(e) => setAlbumId(e.target.value)}
              className="text-[12px] rounded-md bg-black/[0.05] px-2 py-1.5"
              aria-label="Choose album"
            >
              {albums.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex-1 overflow-y-auto mac-scroll px-3 md:px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {album.photos.map((ph, i) => (
              <button
                key={`${ph.title}-${i}`}
                onClick={() => setPhoto(ph)}
                className="group relative rounded-lg overflow-hidden aspect-[4/3] ring-1 ring-black/10 bg-gray-100"
              >
                <img
                  src={ph.img}
                  alt={ph.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition duration-500"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 pb-1.5 pt-6 text-left">
                  <span className="block text-[11px] font-semibold text-white truncate">{ph.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* viewer */}
      {photo && (
        <div className="absolute inset-0 z-20 bg-[#0c0c0e] flex flex-col">
          <div className="shrink-0 h-12 flex items-center gap-3 px-3 text-white/90">
            <button
              onClick={() => setPhoto(null)}
              className="flex items-center gap-1 text-[13px] font-medium hover:text-white text-white/70 px-2 py-1 rounded-md hover:bg-white/10"
            >
              <ChevronLeft size={16} /> Albums
            </button>
            <span className="flex-1 text-center text-[13px] font-medium truncate px-2">{photo.title}</span>
            <button
              onClick={() => {
                openApp('project', { slug: photo.slug });
                setPhoto(null);
              }}
              className="flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
            >
              <ExternalLink size={12} /> Open Project
            </button>
          </div>
          <div className="flex-1 min-h-0 grid place-items-center p-4">
            <img
              src={photo.img}
              alt={photo.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          <p className="shrink-0 pb-4 text-center text-[11.5px] text-white/50">{photo.sub}</p>
        </div>
      )}
    </div>
  );
}
