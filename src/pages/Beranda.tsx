import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroBg from '@assets/Temanumrah_BG_1782267839246.png';
import GlobalSearch from '../components/GlobalSearch';
import { TravelCompanionFlow } from '../components/dashboard/TravelCompanionFlow';
import { TransparansiBerkas } from '../components/el-massa/TransparansiBerkas';
import { KonfirmasiPembayaran } from '../components/el-massa/KonfirmasiPembayaran';
import { KuitansiInvoiceViewer } from '../components/el-massa/KuitansiInvoiceViewer';
import { KartuPendataan, usePendataan } from '../components/el-massa/KartuPendataan';
import { varianPutih } from '../lib/logo';
import { checklistItems } from '../data/checklist';
import { daftarLokasi } from '../data/lokasi';
import { fetchAgenda, type AgendaItemRow } from '../lib/supabase';
import { getWaktuSaudi, formatTanggalHeader } from '../lib/waktu';
import { tintPrimary as tint } from '../lib/colorUtils';
import { POLA_BINTANG_URL, POLA_BINTANG_UKURAN } from '../lib/polaHero';
import { SosModal } from '../components/SosModal';
import type { Fase } from '../types';
import {
  IconDoa,
  IconPanduan,
  IconIbadah,
  IconTawaf,
  IconSai,
  IconMoon,
  IconIhram,
  IconPeta,
  IconCheck,
  IconChevron,
  IconSiren,
  IconMasjid,
  IconSparkles,
  IconLock,
  IconKalender,
  IconKoper,
} from '../components/icons';

function IconJurnal({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M8 7 h8 M8 11 h6" />
    </svg>
  );
}

function IconNavigator({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" /><path d="M16.24 7.76 L14.12 14.12 L7.76 16.24 L9.88 9.88 Z" />
    </svg>
  );
}

function IconSertifikat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function hitungHariMenuju(tanggalISO: string): number {
  const target = new Date(tanggalISO + 'T00:00:00');
  const sekarang = new Date();
  sekarang.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - sekarang.getTime()) / (1000 * 60 * 60 * 24));
}

function KartuTempatBersejarah() {
  const preview = daftarLokasi.slice(0, 8);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Jelajahi</p>
          <h2 className="mt-0.5 text-[15px] font-bold text-ink">Tempat Bersejarah</h2>
        </div>
        <Link to="/peta" className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
          Lihat Semua
          <IconChevron className="h-3 w-3" />
        </Link>
      </div>

      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {preview.map((l) => (
          <Link
            key={l.id}
            to={`/peta/${l.id}`}
            className="group relative flex-none overflow-hidden rounded-xl border border-hairline bg-surface-card active:scale-[0.98] transition-transform"
            style={{ width: 150 }}
          >
            <div className="relative h-24 w-full overflow-hidden bg-surface-bone">
              {l.gambar ? (
                <img src={l.gambar} alt={l.nama} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d4a24e 0 1px, transparent 1px 8px)' }} aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconPeta className="h-5 w-5 text-gold/60" />
                  </div>
                </>
              )}
              <span className="absolute left-1.5 top-1.5 rounded-md bg-black/55 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white backdrop-blur-sm">
                {l.kota}
              </span>
            </div>
            <div className="p-2.5">
              <h3 className="truncate text-[12.5px] font-bold leading-tight text-ink">{l.nama}</h3>
              {l.namaArab && (
                <p className="mt-0.5 truncate text-right font-arab text-[12px] text-gold" dir="rtl">{l.namaArab}</p>
              )}
              <p className="mt-1 line-clamp-2 text-[10.5px] leading-snug text-charcoal">{l.ringkas}</p>
            </div>
          </Link>
        ))}

        <Link
          to="/peta"
          className="flex-none flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-hairline bg-surface-bone active:scale-[0.98] transition-transform"
          style={{ width: 110 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <IconChevron className="h-4 w-4 text-primary" />
          </div>
          <span className="px-2 text-center text-[11px] font-semibold text-primary leading-tight">Lihat Semua Lokasi</span>
        </Link>
      </div>
    </div>
  );
}

function QuickAction({ to, label, icon, accent = false }: {
  to: string; label: string; icon: ReactNode; accent?: boolean;
}) {
  return (
    <Link to={to} className="flex flex-col items-center gap-2 active:scale-[0.93] transition-transform">
      <div
        className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl"
        style={accent
          ? { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)', boxShadow: '0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent)' }
          : { background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
        }
      >
        <span className={accent ? 'text-white' : 'text-charcoal'}>{icon}</span>
      </div>
      <span className="text-[10px] font-semibold leading-tight text-center text-ink" style={{ maxWidth: '56px' }}>
        {label}
      </span>
    </Link>
  );
}

type QA = { to: string; label: string; icon: ReactNode; accent?: boolean };

function getPhaseActions(fase: Fase): QA[] {
  if (fase === 'tanah-suci') return [
    { to: '/ibadah/tawaf',         label: 'Counter Tawaf',  icon: <IconTawaf      className="h-5 w-5" />, accent: true },
    { to: '/ibadah/sai',           label: "Counter Sa'i",   icon: <IconSai        className="h-5 w-5" /> },
    { to: '/doa',                  label: 'Doa Tawaf',      icon: <IconDoa        className="h-5 w-5" /> },
    { to: '/panduan/tata-cara',    label: 'Panduan',        icon: <IconPanduan    className="h-5 w-5" /> },
    { to: '/ibadah/navigator',     label: 'Navigator',      icon: <IconNavigator  className="h-5 w-5" /> },
    { to: '/ibadah/jadwal-sholat', label: 'Sholat',         icon: <IconMoon       className="h-5 w-5" /> },
    { to: '/peta',                 label: 'Peta',           icon: <IconPeta       className="h-5 w-5" /> },
    { to: '/profil/agenda',        label: 'Agenda',         icon: <IconKalender   className="h-5 w-5" /> },
  ];
  if (fase === 'selesai') return [
    { to: '/profil/jurnal',     label: 'Jurnal',      icon: <IconJurnal     className="h-5 w-5" />, accent: true },
    { to: '/profil/sertifikat', label: 'Sertifikat',  icon: <IconSertifikat className="h-5 w-5" /> },
    { to: '/doa',               label: 'Doa Pulang',  icon: <IconDoa        className="h-5 w-5" /> },
    { to: '/peta',              label: 'Ziarah',      icon: <IconPeta       className="h-5 w-5" /> },
    { to: '/panduan/tata-cara', label: 'Tata Cara',   icon: <IconPanduan    className="h-5 w-5" /> },
    { to: '/ibadah/jadwal-sholat', label: 'Sholat',   icon: <IconMoon       className="h-5 w-5" /> },
    { to: '/profil/agenda',     label: 'Agenda',      icon: <IconKalender   className="h-5 w-5" /> },
    { to: '/panduan/manasik-interaktif', label: 'Manasik', icon: <IconIbadah className="h-5 w-5" /> },
  ];
  return [
    { to: '/profil/persiapan',  label: 'Cek Persiapan', icon: <IconCheck   className="h-5 w-5" />, accent: true },
    { to: '/doa',               label: 'Doa Safar',     icon: <IconDoa     className="h-5 w-5" /> },
    { to: '/panduan/ihram',     label: 'Panduan Ihram', icon: <IconIhram   className="h-5 w-5" /> },
    { to: '/profil/agenda',     label: 'Agenda',        icon: <IconKalender className="h-5 w-5" /> },
    { to: '/panduan/tata-cara', label: 'Tata Cara',     icon: <IconPanduan  className="h-5 w-5" /> },
    { to: '/ibadah/jadwal-sholat', label: 'Sholat',     icon: <IconMoon    className="h-5 w-5" /> },
    { to: '/peta',              label: 'Peta',          icon: <IconPeta    className="h-5 w-5" /> },
    { to: '/panduan/manasik-interaktif', label: 'Manasik', icon: <IconIbadah className="h-5 w-5" /> },
  ];
}

function KartuHitung({ n, namaTravel }: { n: number; namaTravel: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: 'linear-gradient(135deg, var(--color-primary-deep) 0%, var(--color-primary-deep) 60%, var(--color-primary) 100%)' }}>
      <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-white/[0.05]" />
      <div className="relative flex items-center gap-5">
        <div className="flex-none">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/45 mb-0.5">Keberangkatan</p>
          <p className="font-display font-bold text-white" style={{ fontSize: '52px', letterSpacing: '-2px', lineHeight: 1 }}>
            H<span className="text-white/35">-</span>{n}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-white/85 leading-snug">Menuju keberangkatan bersama {namaTravel}</p>
          <Link to="/profil/persiapan"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold text-white"
            style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.20)' }}>
            Cek Persiapan <IconChevron className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function KartuAgendaHariIni({ items, total }: { items: AgendaItemRow[]; total: number }) {
  const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  const lebih = total - items.length;
  return (
    <div className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-hairline">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-mute">Agenda Hari Ini</p>
          <p className="text-[13px] font-bold text-ink mt-0.5">{hariIni}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: tint(10) }}>
          <IconKalender className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      <div className="divide-y divide-hairline">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-4 py-3">
            <span className="flex-none pt-0.5 font-mono text-[11px] font-bold text-primary" style={{ minWidth: '36px' }}>
              {item.jam_mulai ? item.jam_mulai.slice(0, 5) : '—:—'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">{item.judul}</p>
              {item.lokasi && <p className="mt-0.5 text-[11px] text-charcoal">{item.lokasi}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5 bg-surface-bone/60">
        {lebih > 0 && <p className="text-[11px] text-charcoal">+{lebih} agenda lainnya</p>}
        <Link to="/profil/agenda" className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
          Lihat Semua <IconChevron className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function KartuItinerary({ keberangkatanId }: { keberangkatanId: string }) {
  type SlimItem = { tanggal: string; judul: string; jam_mulai: string | null };
  const [allItems, setAllItems] = useState<SlimItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchAgenda(keberangkatanId).then(data => {
      setAllItems(data.map(i => ({ tanggal: i.tanggal, judul: i.judul, jam_mulai: i.jam_mulai })));
      setReady(true);
    }).catch(() => setReady(true));
  }, [keberangkatanId]);

  if (!ready) return null;

  const tanggalUnik = [...new Set(allItems.map((i) => i.tanggal))].sort();
  const totalHari = tanggalUnik.length;
  if (totalHari === 0) return null;

  const tanggalPertama = tanggalUnik[0];
  const tanggalTerakhir = tanggalUnik[totalHari - 1];
  const todayStr = new Date().toISOString().split('T')[0];

  const hariKe = (() => {
    const start = new Date(tanggalPertama + 'T00:00:00').getTime();
    const cur   = new Date(todayStr       + 'T00:00:00').getTime();
    return Math.round((cur - start) / 86400000) + 1;
  })();

  const belumMulai = todayStr < tanggalPertama;
  const sudahSelesai = todayStr > tanggalTerakhir;

  const persen = belumMulai ? 0 : sudahSelesai ? 100 : Math.round((Math.min(hariKe, totalHari) / totalHari) * 100);

  const labelHari = belumMulai
    ? 'Belum dimulai'
    : sudahSelesai
    ? 'Perjalanan selesai'
    : `Hari ${hariKe} dari ${totalHari}`;

  // Cari item berikutnya: hari ini jam >= sekarang, atau hari berikutnya pertama
  const nowMin = getWaktuSaudi().totalMenit;
  const itemBerikutnya = (() => {
    // item hari ini yang belum lewat
    const hariIniItems = allItems.filter((i) => i.tanggal === todayStr);
    const berikutHariIni = hariIniItems.find((i) => {
      if (!i.jam_mulai) return false;
      const [h, m] = i.jam_mulai.split(':').map(Number);
      return h * 60 + m >= nowMin;
    });
    if (berikutHariIni) return berikutHariIni;
    // item pertama hari berikutnya
    const hariDepan = tanggalUnik.find((t) => t > todayStr);
    if (!hariDepan) return null;
    return allItems.find((i) => i.tanggal === hariDepan) ?? null;
  })();

  const semuaSelesaiHariIni =
    !belumMulai &&
    !sudahSelesai &&
    allItems.some((i) => i.tanggal === todayStr) &&
    !itemBerikutnya;

  return (
    <Link to="/profil/agenda" className="block active:scale-[0.99] transition-transform">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-drop-card">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-hairline">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-xl"
              style={{ background: tint(10) }}>
              <IconKalender className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-mute">Itinerary Perjalanan</p>
          </div>
          <IconChevron className="h-3.5 w-3.5 text-ash" />
        </div>

        {/* Progress */}
        <div className="px-4 pt-3.5 pb-1">
          <p className="font-display text-[22px] font-bold leading-none text-ink">{labelHari}</p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-bone">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${persen}%`, background: 'var(--color-primary)' }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] text-mute">{persen}%</p>
        </div>

        {/* Item berikutnya */}
        <div className="px-4 pb-3.5 pt-2.5 border-t border-hairline mt-2">
          {semuaSelesaiHariIni ? (
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-none text-primary">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-[12px] font-semibold text-primary">Semua agenda hari ini selesai</p>
            </div>
          ) : itemBerikutnya ? (
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mute mb-0.5">Berikutnya</p>
              <p className="text-[13px] font-semibold text-ink leading-snug">
                {itemBerikutnya.jam_mulai ? itemBerikutnya.jam_mulai.slice(0, 5) + ' · ' : ''}
                {itemBerikutnya.judul}
              </p>
            </div>
          ) : (
            <p className="text-[12px] text-mute italic">Tidak ada agenda terjadwal</p>
          )}
        </div>
      </div>
    </Link>
  );
}


const faseBadge: Record<string, string> = {
  persiapan:    'Fase Persiapan',
  perjalanan:   'Dalam Perjalanan',
  'tanah-suci': 'Di Tanah Suci',
  kepulangan:   'Dalam Kepulangan',
  selesai:      'Ibadah Selesai',
};

function FaseIcon({ fase, className = '' }: { fase: string; className?: string }) {
  if (fase === 'tanah-suci') return <IconMasjid className={className} />;
  if (fase === 'selesai') return <IconSparkles className={className} />;
  return <IconKoper className={className} />;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function TenantMark({ logo, nama }: { logo?: string | null; nama: string }) {
  const putih = logo ? varianPutih(logo) : null;
  const [mode, setMode] = useState<'putih' | 'asli' | 'ikon'>(putih ? 'putih' : logo ? 'asli' : 'ikon');

  if (mode === 'putih' && putih) {
    return (
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={putih}
          alt={nama}
          className="h-[52px] w-auto flex-none object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
          onError={() => setMode(logo ? 'asli' : 'ikon')}
        />
        <span className="h-9 w-px flex-none bg-white/35" aria-hidden />
        <div className="min-w-0 leading-tight">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-white/70">UmrahMe</p>
          <p className="text-[12.5px] font-semibold text-white">Pendamping Umrah</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      {mode === 'asli' && logo ? (
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-white p-1.5 shadow-md shadow-black/15">
          <img src={logo} alt="" className="h-full w-full object-contain" onError={() => setMode('ikon')} />
        </span>
      ) : (
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
          <IconMasjid className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0 leading-tight">
        <p className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-white/60">UmrahMe</p>
        <p className="truncate text-[12.5px] font-semibold text-white">{nama}</p>
      </div>
    </div>
  );
}

type HeroTenant = {
  hero_image_url?: string | null;
  primary_color?: string | null;
  primary_deep_color?: string | null;
} | null;

/**
 * Latar banner. Hero buatan tenant ditampilkan apa adanya. Hero bawaan: gradasi pink tenant
 * (terang di atas, lebih dalam di bawah supaya sapaan terbaca), tekstur daun dari gambar lama,
 * pola bintang Islam yang memudar dari pojok kanan atas, dan kilau lembut. Harus ditaruh
 * di dalam elemen `relative overflow-hidden`.
 */
function HeroBackdrop({ tenant }: { tenant: HeroTenant }) {
  const gambar = tenant?.hero_image_url;
  if (gambar) {
    const bawah = tenant?.primary_color
      ? hexToRgba(tenant.primary_deep_color ?? tenant.primary_color, 0.88)
      : 'rgba(5,10,20,0.92)';
    return (
      <>
        <img src={gambar} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 38%' }} />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to top, ${bawah} 0%, rgba(0,0,0,0.04) 52%, transparent 80%), linear-gradient(to bottom, rgba(0,0,0,0.16) 0%, transparent 30%)` }} />
      </>
    );
  }
  return (
    <>
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(165deg, color-mix(in srgb, var(--color-primary) 80%, white) 0%, var(--color-primary) 42%, var(--color-primary-deep) 100%)' }} />
      {/* Gambar lama memuat logo di kiri atas; diperbesar dari pojok kanan bawah supaya logo itu
          keluar bingkai dan hanya tekstur daunnya yang tersisa. */}
      <img src={heroBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 38%', transform: 'scale(1.8)', transformOrigin: '100% 100%', mixBlendMode: 'soft-light', opacity: 0.4 }} />
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: POLA_BINTANG_URL,
          backgroundSize: POLA_BINTANG_UKURAN,
          backgroundPosition: 'right top',
          opacity: 0.2,
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 100% 0%, #000 0%, rgba(0,0,0,0.55) 38%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse 85% 75% at 100% 0%, #000 0%, rgba(0,0,0,0.55) 38%, transparent 72%)',
        }} />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 92% 6%, rgba(255,255,255,0.30) 0%, transparent 42%), linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 28%)' }} />
    </>
  );
}

export default function Beranda() {
  const { jamaah, tenant, keberangkatan } = useAuth();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const pendataan = usePendataan();

  const totalPersiapan = checklistItems.length;
  const [persiapanDone] = useState<number>(() => {
    try {
      const raw = localStorage.getItem('umrahme.persiapan');
      return raw ? (JSON.parse(raw) as string[]).length : 0;
    } catch { return 0; }
  });
  const persiapanPersen = totalPersiapan > 0 ? Math.round((persiapanDone / totalPersiapan) * 100) : 0;

  if (!jamaah) return null;

  const firstName   = jamaah.nama.split(' ')[0];
  const namaTravel  = tenant?.nama_travel ?? jamaah.travel;
  const tanggalBerangkat = keberangkatan?.tanggal_keberangkatan ?? tenant?.tanggal_keberangkatan;
  const hariMenuju  = tanggalBerangkat ? hitungHariMenuju(tanggalBerangkat) : null;
  const showHitung  = hariMenuju !== null && hariMenuju >= 1 && hariMenuju <= 30;
  const phaseActions = getPhaseActions(jamaah.fase);
  const tanggal = formatTanggalHeader();

  return (
    <>
      {/* ==================== MOBILE ==================== */}
      <div className="lg:hidden min-h-screen bg-canvas overflow-x-hidden">

        {/* ── HERO HEADER ─────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(264px, 66vw, 350px)' }}>
          <HeroBackdrop tenant={tenant} />

          {/* Header: identitas travel + SOS */}
          <div className="absolute inset-x-5 top-4 z-20 flex items-center justify-between gap-3">
            <TenantMark logo={tenant?.logo_url} nama={namaTravel} />

            <button
              type="button"
              onClick={() => setIsSosOpen(true)}
              aria-label="Buka SOS darurat"
              className="inline-flex flex-none items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[11px] font-bold tracking-wide shadow-lg shadow-black/20 transition-transform active:scale-95"
              style={{ color: 'var(--color-primary-deep)' }}
            >
              <IconSiren className="h-4 w-4" />
              SOS
            </button>
          </div>

          {/* Sapaan */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-14">
            {(() => {
              const htc = tenant?.hero_text_color ?? '#ffffff';
              const htcRgba = (a: number) => {
                const r = parseInt(htc.slice(1,3),16), g = parseInt(htc.slice(3,5),16), b = parseInt(htc.slice(5,7),16);
                return `rgba(${r},${g},${b},${a})`;
              };
              return (
                <>
                  <p className="text-[12px] font-medium tracking-wide" style={{ color: htcRgba(0.72) }}>
                    Assalamu'alaikum
                  </p>
                  <h1 className="font-display font-bold" style={{ fontSize: 'clamp(26px,7.4vw,36px)', letterSpacing: '-0.03em', lineHeight: 1.08, color: htc, textWrap: 'balance' }}>
                    Selamat datang, {firstName}
                  </h1>
                  <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white ring-1 ring-white/15 backdrop-blur-md">
                    <IconKalender className="h-3.5 w-3.5 flex-none text-white/70" />
                    <span className="truncate">{tanggal.masehi}</span>
                    {tanggal.hijri && (
                      <>
                        <span className="h-1 w-1 flex-none rounded-full bg-white/40" />
                        <span className="truncate text-white/80">{tanggal.hijri}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 text-[11px]" style={{ color: htcRgba(0.78) }}>
                    <FaseIcon fase={jamaah.fase} className="h-3.5 w-3.5 flex-none" />
                    <span className="font-medium">{faseBadge[jamaah.fase] ?? jamaah.fase}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* ── CONTENT SHEET ───────────────────────────── */}
        <div className="relative z-10 -mt-8 rounded-t-[28px] bg-canvas px-4 pt-4 pb-12 space-y-3">

          {/* Search */}
          <GlobalSearch />

          {/* Countdown */}
          {showHitung && <KartuHitung n={hariMenuju!} namaTravel={namaTravel} />}

          {/* Pendataan jamaah (El Massa Web) */}
          <KartuPendataan pendataan={pendataan} />

          {/* Travel companion cards */}
          <TravelCompanionFlow />

          {/* Itinerary ringkasan */}
          {keberangkatan?.id && <KartuItinerary keberangkatanId={keberangkatan.id} />}

          {/* Checklist */}
          {jamaah.fase === 'persiapan' && (
            <Link to="/profil/persiapan" className="block active:scale-[0.99] transition-transform">
              <div className="rounded-2xl bg-white p-4" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
                      style={{ background: tint(10), border: `1px solid ${tint(18)}` }}>
                      <IconCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Checklist Persiapan</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-ink">{persiapanDone} dari {totalPersiapan} selesai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-display text-[22px] font-bold text-ink">{persiapanPersen}%</p>
                    <IconChevron className="h-3.5 w-3.5 text-ash" />
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-bone">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${persiapanPersen}%`, background: 'linear-gradient(90deg, var(--color-primary-deep) 0%, var(--color-primary) 100%)' }} />
                </div>
              </div>
            </Link>
          )}

          {/* Tempat Bersejarah */}
          <KartuTempatBersejarah />

          {/* Pemisah */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-hairline" />
            <p className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-stone">Akses Cepat</p>
            <div className="flex-1 h-px bg-hairline" />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {phaseActions.map(({ to, label, icon, accent }) => (
              <QuickAction key={to} to={to} label={label} icon={icon} accent={accent} />
            ))}
          </div>

        </div>
      </div>

      {/* ==================== DESKTOP WORKSPACE ==================== */}
      <div className="hidden lg:block min-h-screen bg-white p-8 font-sans">
        
        {/* Clean Direct Container */}
        <div className="max-w-[1440px] mx-auto space-y-6">

          {/* 1. GREETING HEADER SECTION */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 font-display">
                  Selamat datang, {firstName}
                </h1>
                <span className="bg-stone-100 border border-stone-200 px-4 py-1.5 rounded-full text-xs font-normal text-stone-700 shadow-2xs">
                  {tanggal.masehi}{tanggal.hijri ? ` • ${tanggal.hijri}` : ''}
                </span>
              </div>
              <p className="text-sm text-stone-600 font-medium">
                Pantau dokumen paspor, E-Visa, tiket penerbangan Garuda, dan kuitansi pembayaran Anda secara real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-primary/25 bg-primary/10 text-primary-deep px-4 py-1.5 text-xs font-medium flex items-center gap-2">
                <FaseIcon fase={jamaah.fase} className="h-3.5 w-3.5" />
                Jamaah Aktif • {faseBadge[jamaah.fase] ?? jamaah.fase}
              </span>
            </div>
          </div>

          {/* 3. SEPARATE STANDALONE BANNER IMAGE CARD (PROPER FIT) */}
          <div className="relative rounded-2xl overflow-hidden h-56 border border-stone-200/80 shadow-sm">
            <HeroBackdrop tenant={tenant} />
            <div className="absolute left-7 top-5 z-10">
              <TenantMark logo={tenant?.logo_url} nama={namaTravel} />
            </div>
            <div className="absolute bottom-5 left-7 text-white space-y-1 font-sans">
              <span className="text-xs font-extrabold tracking-widest text-white/85 uppercase font-display block">
                {namaTravel} • Program Umrah 1448H
              </span>
              <p className="text-lg sm:text-xl font-black tracking-tight font-display">
                Pendamping Ibadah Umrah Resmi & Transparan
              </p>
            </div>
          </div>

          {/* 4. Pendataan & status berkas jamaah (El Massa Web) */}
          <TransparansiBerkas pendataan={pendataan} />

          {/* 5. SEKSI KLAIM SERTIFIKAT & JURNAL UNTUK JAMAAH */}
          <section className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-display">
                  Sertifikat Digital & Jurnal Kenangan
                </h3>
                <p className="text-xs text-stone-500 font-normal mt-0.5">
                  Jurnal kenangan dapat diisi setiap saat, dan Sertifikat Digital siap diklaim setelah menyelesaikan ibadah umrah.
                </p>
              </div>
              <span className={`px-3.5 py-1 rounded-full text-xs font-normal border ${
                jamaah.fase === 'selesai'
                  ? 'border-primary/25 bg-primary/10 text-primary-deep'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}>
                {jamaah.fase === 'selesai' ? 'Ibadah selesai · sertifikat terbuka' : 'Ibadah berlangsung'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: Jurnal & Galeri Kenangan (ALWAYS UNLOCKED) */}
              <div className="relative flex flex-col justify-between rounded-2xl border border-stone-200 bg-white hover:border-primary/40 shadow-xs hover:shadow-md transition-all p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium border border-primary/25 bg-primary/10 text-primary-deep">
                      <IconCheck className="h-3 w-3" /> Akses terbuka
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-stone-900">
                      Jurnal & Galeri Kenangan
                    </h4>
                    <p className="text-xs text-stone-500 font-normal leading-relaxed">
                      Catatan perjalanan harian, doa personal, dan koleksi foto kenangan selama di Makkah & Madinah.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to="/profil/jurnal"
                    className="px-4 py-2 rounded-full bg-primary hover:bg-primary-deep text-white text-xs font-normal shadow-xs transition"
                  >
                    Buka Jurnal Kenangan →
                  </Link>
                </div>
              </div>

              {/* Card 2: Sertifikat Digital Umrah (LOCKED UNTIL FASE === 'SELESAI') */}
              <div
                className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                  jamaah.fase === 'selesai'
                    ? 'border-stone-200 bg-white hover:border-primary/40 shadow-xs hover:shadow-md cursor-pointer'
                    : 'border-stone-200/60 bg-stone-50/70 opacity-75 cursor-not-allowed'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium border ${
                      jamaah.fase === 'selesai'
                        ? 'border-primary/25 bg-primary/10 text-primary-deep'
                        : 'bg-stone-100 text-stone-500 border-stone-200'
                    }`}>
                      {jamaah.fase === 'selesai'
                        ? <><IconCheck className="h-3 w-3" /> Siap klaim</>
                        : <><IconLock className="h-3 w-3" /> Terkunci</>}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-base text-stone-900">
                      Sertifikat Digital Umrah
                    </h4>
                    <p className="text-xs text-stone-500 font-normal leading-relaxed">
                      Sertifikat resmi kelulusan & kenang-kenangan ibadah umrah yang diterbitkan resmi oleh El Massa Tour & Travel.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                  {jamaah.fase === 'selesai' ? (
                    <Link
                      to="/profil/sertifikat"
                      className="px-4 py-2 rounded-full bg-primary hover:bg-primary-deep text-white text-xs font-normal shadow-xs transition"
                    >
                      Klaim Sertifikat Digital →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-200 text-stone-500 text-xs font-medium cursor-not-allowed"
                    >
                      <IconLock className="h-3.5 w-3.5" /> Terkunci, selesaikan ibadah dulu
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 6. BOTTOM 2-COLUMN SECTION (Upload Struk & Kuitansi Digital) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <KonfirmasiPembayaran />
            <KuitansiInvoiceViewer />
          </div>

        </div>

      </div>

      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </>
  );
}
