import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllAnnouncements, type TravelAnnouncement } from '../data/travelCompanion';

function IconBell({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${minutes}m lalu`;
  if (hours < 24) return `${hours}j lalu`;
  return `${days}h lalu`;
}

function AnnouncementCard({ item, travelName = 'Travel' }: { item: TravelAnnouncement; travelName?: string }) {
  const isImportant = item.important;

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background: isImportant
          ? 'linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%)'
          : '#ffffff',
        borderColor: isImportant ? 'rgba(212,162,78,0.30)' : 'rgba(0,0,0,0.07)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div className="p-3.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl mb-2.5"
          style={{
            background: isImportant ? 'rgba(212,162,78,0.15)' : 'rgba(14,165,233,0.09)',
            border: `1px solid ${isImportant ? 'rgba(212,162,78,0.25)' : 'rgba(14,165,233,0.15)'}`,
          }}
        >
          <IconBell className={`h-3.5 w-3.5 ${isImportant ? 'text-[#a07828]' : 'text-primary'}`} />
        </div>

        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.15em]"
            style={isImportant
              ? { background: 'rgba(212,162,78,0.20)', color: '#a07828' }
              : { background: 'rgba(14,165,233,0.12)', color: '#0284c7' }
            }
          >
            {travelName}
          </span>
          <span className="font-mono text-[7px] text-mute">{formatRelativeTime(item.publishedAt)}</span>
        </div>

        <h3 className="text-[13px] font-bold leading-snug text-ink mb-2">{item.title}</h3>
        <p className="text-[11.5px] leading-relaxed text-charcoal">{item.content}</p>
      </div>
    </div>
  );
}

export default function Pengumuman() {
  const { tenant, keberangkatan } = useAuth();
  const [announcements, setAnnouncements] = useState<TravelAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllAnnouncements(keberangkatan?.id ?? null).then((data) => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, [keberangkatan?.id]);

  const important = announcements.filter((a) => a.important);
  const info = announcements.filter((a) => !a.important);
  const travelName = tenant?.nama_travel ?? 'Travel';

  return (
    <div className="min-h-screen bg-canvas">

      {/* ───── MOBILE ───── */}
      <div className="lg:hidden">
        <header
          className="px-5 pb-5"
          style={{ paddingTop: 'max(2.5rem, env(safe-area-inset-top))' }}
        >
          <Link to="/beranda" className="inline-flex items-center gap-1 mb-4 text-primary font-mono text-[10px] uppercase tracking-wider">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 rotate-180">
              <path d="M9 18l6-6-6-6" />
            </svg>
            Kembali
          </Link>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary mb-1">Dari Travel</p>
          <h1
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(26px, 7vw, 32px)', letterSpacing: '-0.5px', lineHeight: 1 }}
          >
            Pengumuman
          </h1>
          <p className="mt-1.5 text-[11px] text-charcoal">
            Informasi & arahan terbaru dari {travelName}.
          </p>
        </header>

        <section className="px-4 pb-8 space-y-5">
          {loading && (
            <div className="py-10 text-center">
              <p className="font-mono text-[11px] text-ash">Memuat pengumuman...</p>
            </div>
          )}

          {!loading && announcements.length === 0 && (
            <div className="rounded-2xl border border-hairline bg-white p-8 text-center shadow-drop-card">
              <IconBell className="h-8 w-8 mx-auto text-ash mb-3" />
              <p className="text-[13px] font-semibold text-ink">Belum ada pengumuman</p>
              <p className="mt-1 text-[11px] text-charcoal">Pengumuman dari travel akan tampil di sini.</p>
            </div>
          )}

          {!loading && important.length > 0 && (
            <div>
              <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.28em] text-mute">🔔 Penting</p>
              <div className="grid grid-cols-2 gap-2.5">
                {important.map((item) => (
                  <AnnouncementCard key={item.id} item={item} travelName={travelName} />
                ))}
              </div>
            </div>
          )}

          {!loading && info.length > 0 && (
            <div>
              <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.28em] text-mute">ℹ️ Info</p>
              <div className="grid grid-cols-2 gap-2.5">
                {info.map((item) => (
                  <AnnouncementCard key={item.id} item={item} travelName={travelName} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ───── DESKTOP ───── */}
      <div className="hidden lg:block px-10 pb-10">
        <header className="pt-10 pb-6">
          <Link to="/beranda" className="inline-flex items-center gap-1 mb-4 text-primary font-mono text-[10px] uppercase tracking-wider">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3 rotate-180">
              <path d="M9 18l6-6-6-6" />
            </svg>
            Kembali
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-1">Dari Travel</p>
          <h1 className="font-display text-4xl font-bold text-ink" style={{ letterSpacing: '-1px' }}>Pengumuman</h1>
          <p className="mt-1 text-sm text-charcoal">Informasi & arahan terbaru dari {travelName}.</p>
        </header>

        <div className="space-y-6 max-w-3xl">
          {loading && <p className="font-mono text-[12px] text-ash">Memuat pengumuman...</p>}
          {!loading && important.length > 0 && (
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mute">🔔 Penting</p>
              <div className="grid grid-cols-2 gap-3">
                {important.map((item) => (
                  <AnnouncementCard key={item.id} item={item} travelName={travelName} />
                ))}
              </div>
            </div>
          )}
          {!loading && info.length > 0 && (
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mute">ℹ️ Info</p>
              <div className="grid grid-cols-2 gap-3">
                {info.map((item) => (
                  <AnnouncementCard key={item.id} item={item} travelName={travelName} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
