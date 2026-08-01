import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getFocusByFase,
  getLatestAnnouncement,
  getOperationalInfo,
  whatsappLink,
  type TravelAnnouncement,
} from '../../data/travelCompanion';
import { IconChevron } from '../icons';

function IconBell({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconPhone({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6.26 6.26l1.28-1.28a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconIdCard({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2" />
      <path d="M14 10h4M14 14h3M7 16c.6-1.2 3.4-1.2 4 0" />
    </svg>
  );
}

function IconRoute({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h3a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7" />
    </svg>
  );
}

export function DashboardTravelCompanionCards() {
  const { jamaah, keberangkatan } = useAuth();
  const [announcement, setAnnouncement] = useState<TravelAnnouncement | null>(null);

  useEffect(() => {
    getLatestAnnouncement(keberangkatan?.id ?? null).then(setAnnouncement);
  }, [keberangkatan?.id]);

  if (!jamaah) return null;

  const info = getOperationalInfo(keberangkatan ?? null, jamaah);
  const focus = getFocusByFase(jamaah.fase);

  const rombongan = info.groupCode;
  const bus = info.busNumber;
  const kamar = info.roomNumber;
  const pembimbing = jamaah.pembimbingNama ?? info.guideName;
  const pembimbingWa = jamaah.pembimbingWhatsapp ?? info.guideWhatsapp;

  return (
    <section className="px-5 pb-4 space-y-3">
      {/* Fokus perjalanan */}
      <div className="rounded-2xl border border-hairline bg-white p-4 shadow-drop-card">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0.04) 100%)',
              border: '1.5px solid rgba(14,165,233,0.16)',
            }}
          >
            <IconRoute className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Fokus Perjalanan</p>
            <h3 className="mt-0.5 text-[14px] font-bold leading-snug text-ink">{focus.title}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-charcoal">{focus.description}</p>
            <Link
              to={focus.ctaTo}
              className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary"
            >
              {focus.ctaLabel} <IconChevron className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Pengumuman travel */}
      {announcement && (
        <div
          className="rounded-2xl border p-4 shadow-drop-card"
          style={{
            background: announcement.important ? '#fff8ee' : '#ffffff',
            borderColor: announcement.important ? 'rgba(212,162,78,0.25)' : 'rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #fffcf0 0%, #fdf0d8 100%)',
                border: '1.5px solid rgba(212,162,78,0.24)',
              }}
            >
              <IconBell className="h-4 w-4 text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">{announcement.label}</p>
                <span className="h-1 w-1 rounded-full bg-gold/50" />
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Dari Travel</p>
              </div>
              <h3 className="mt-0.5 text-[14px] font-bold leading-snug text-ink">{announcement.title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-charcoal">{announcement.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Kartu jamaah + bantuan */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/profil/kartu" className="rounded-2xl border border-hairline bg-white p-4 shadow-drop-card active:scale-[0.98] transition-all">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-bone">
            <IconIdCard className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Kartu Jamaah</p>
          <h3 className="mt-0.5 text-[13px] font-bold leading-snug text-ink">{rombongan}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-charcoal">
            {bus} · Kamar {kamar}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
            Buka <IconChevron className="h-3 w-3" />
          </span>
        </Link>

        <div className="rounded-2xl border border-hairline bg-white p-4 shadow-drop-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
            <IconPhone className="h-4 w-4 text-red-500" />
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Butuh Bantuan?</p>
          <h3 className="mt-0.5 text-[13px] font-bold leading-snug text-ink">{pembimbing}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-charcoal">{info.guideRole}</p>
          <a
            href={whatsappLink(pembimbingWa)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-500"
          >
            WhatsApp <IconChevron className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function DashboardTravelCompanionDesktopRow() {
  const { jamaah, keberangkatan } = useAuth();
  const [announcement, setAnnouncement] = useState<TravelAnnouncement | null>(null);

  useEffect(() => {
    getLatestAnnouncement(keberangkatan?.id ?? null).then(setAnnouncement);
  }, [keberangkatan?.id]);

  if (!jamaah) return null;

  const info = getOperationalInfo(keberangkatan ?? null);

  const rombongan = jamaah.rombongan ?? info.groupCode;
  const bus = jamaah.nomorBus ?? info.busNumber;
  const kamar = jamaah.nomorKamar ?? info.roomNumber;
  const pembimbing = jamaah.pembimbingNama ?? info.guideName;
  const pembimbingWa = jamaah.pembimbingWhatsapp ?? info.guideWhatsapp;

  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <Link
        to="/profil/kartu"
        className="group rounded-2xl border border-hairline bg-white p-5 shadow-drop-card transition-all hover:-translate-y-0.5 hover:shadow-drop-lifted"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Kartu Jamaah</p>
        <h3 className="mt-1 text-[17px] font-bold text-ink">{jamaah.nama}</h3>
        <p className="mt-1 text-[12px] text-charcoal">{rombongan} · {bus} · Kamar {kamar}</p>
        <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary group-hover:gap-2 transition-all">
          Buka Kartu <IconChevron className="h-3 w-3" />
        </span>
      </Link>

      <div
        className="rounded-2xl border p-5 shadow-drop-card"
        style={{
          background: '#fff8ee',
          borderColor: 'rgba(212,162,78,0.25)',
        }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Pengumuman Travel</p>
        <h3 className="mt-1 text-[17px] font-bold text-ink">{announcement?.title ?? 'Belum ada pengumuman'}</h3>
        <p className="mt-1 text-[12px] leading-relaxed text-charcoal line-clamp-2">{announcement?.content ?? 'Pengumuman dari travel akan tampil di sini.'}</p>
      </div>

      <div className="rounded-2xl border border-hairline bg-white p-5 shadow-drop-card">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Kontak Pembimbing</p>
        <h3 className="mt-1 text-[17px] font-bold text-ink">{pembimbing}</h3>
        <p className="mt-1 text-[12px] text-charcoal">{info.meetingPoint}</p>
        <a
          href={whatsappLink(pembimbingWa)}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-red-500"
        >
          Hubungi Sekarang <IconChevron className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
