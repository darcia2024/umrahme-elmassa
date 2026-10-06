import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOperationalInfo, whatsappLink } from '../data/travelCompanion';
import { IconDownload, IconPhone } from '../components/icons';
import { TransparansiBerkas } from '../components/el-massa/TransparansiBerkas';
import { KonfirmasiPembayaran } from '../components/el-massa/KonfirmasiPembayaran';
import { KuitansiInvoiceViewer } from '../components/el-massa/KuitansiInvoiceViewer';
import { usePendataan } from '../components/el-massa/KartuPendataan';

const LABEL_FASE: Record<string, string> = {
  persiapan: 'Fase Persiapan',
  'tanah-suci': 'Di Tanah Suci',
  selesai: 'Ibadah Selesai',
};

const KARTU = { border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };

function IconWhatsapp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconKeluar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5" /><path d="M5 12h11" />
    </svg>
  );
}

function Kartu({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-4 sm:p-5" style={KARTU}>
      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">{judul}</p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Baris({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="flex-none text-[12px] text-mute">{label}</span>
      <span className="min-w-0 text-right text-[13px] font-medium leading-snug text-ink">{children}</span>
    </div>
  );
}

function Kontak({ nama, peran, nomor }: { nama: string; peran: string; nomor: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-[15px] font-bold text-primary"
        style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
        {nama.replace(/^(Ust\.|Bpk\.|Ibu|H\.|Hj\.)\s*/i, '').charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-ink">{nama}</p>
        <p className="truncate text-[11px] text-mute">{peran}</p>
      </div>
      <a href={`tel:${nomor}`} aria-label={`Telepon ${nama}`}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-hairline text-charcoal transition active:scale-95">
        <IconPhone className="h-4 w-4" />
      </a>
      <a href={whatsappLink(nomor)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${nama}`}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-600 text-white transition active:scale-95">
        <IconWhatsapp className="h-4 w-4" />
      </a>
    </div>
  );
}

function linkPeta(hotel: string, kota: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(`${hotel} ${kota} Saudi Arabia`)}`;
}

export default function KartuJamaah() {
  const { jamaah, tenant, keberangkatan, logout } = useAuth();
  const pendataan = usePendataan();
  if (!jamaah) return null;

  const info         = getOperationalInfo(keberangkatan ?? null, jamaah);
  const namaTravel   = tenant?.nama_travel ?? jamaah.travel;
  const hotelMakkah  = (jamaah.hotelMakkah  ?? info.hotelMakkah).replace(/⭐.*/, '').trim();
  const hotelMadinah = (jamaah.hotelMadinah ?? info.hotelMadinah).replace(/⭐.*/, '').trim();
  const pembimbing   = jamaah.pembimbingNama     ?? info.guideName;
  const pembimbingWa = jamaah.pembimbingWhatsapp ?? info.guideWhatsapp;

  return (
    <div className="min-h-screen bg-canvas px-4 pt-5 pb-8 sm:px-6 lg:p-8">
      <div className="mx-auto max-w-app lg:max-w-content">

        <header className="mb-4 flex items-end justify-between gap-3 px-1">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">{namaTravel}</p>
            <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">Profil Saya</h1>
          </div>
          <button type="button" onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-3.5 py-2 text-[12px] font-medium text-charcoal transition active:scale-95">
            <IconDownload className="h-3.5 w-3.5" />
            Cetak Kartu
          </button>
        </header>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-6">

          {/* ── Kolom identitas & perjalanan ── */}
          <div className="space-y-3 lg:col-span-5">

            {/* Kartu jamaah digital */}
            <div id="digital-id-card" className="relative overflow-hidden rounded-3xl p-5 text-white shadow-drop-lifted"
              style={{ background: 'linear-gradient(140deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)' }}>
              <div className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0 1px, transparent 0 14px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 0 14px)' }} />
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/20" />

              <div className="relative flex items-center justify-between gap-3">
                <span className="truncate text-[11px] font-medium text-white/85">Kartu Jamaah Digital</span>
                <span className="flex-none rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] font-medium ring-1 ring-white/25 backdrop-blur-sm">
                  {LABEL_FASE[jamaah.fase] ?? jamaah.fase}
                </span>
              </div>

              <div className="relative mt-5 flex items-center gap-3.5">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-white font-display text-2xl font-bold text-primary shadow-lg">
                  {jamaah.nama.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-[20px] font-bold leading-tight tracking-tight" style={{ textWrap: 'balance' }}>
                    {jamaah.nama}
                  </h2>
                  <p className="mt-0.5 font-mono text-[12px] text-white/85">{jamaah.nomorJamaah}</p>
                </div>
              </div>

              <dl className="relative mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/20 pt-4">
                <div className="col-span-2 min-w-0">
                  <dt className="text-[10px] uppercase tracking-wider text-white/65">Rombongan</dt>
                  <dd className="truncate text-[13px] font-semibold">{info.groupCode}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wider text-white/65">Kode Aktivasi</dt>
                  <dd className="truncate font-mono text-[13px] font-semibold">{jamaah.kodeAktivasi}</dd>
                </div>
                {jamaah.nomorPaspor && (
                  <div className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-wider text-white/65">No. Paspor</dt>
                    <dd className="truncate font-mono text-[13px] font-semibold">{jamaah.nomorPaspor}</dd>
                  </div>
                )}
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wider text-white/65">Travel</dt>
                  <dd className="truncate text-[13px] font-semibold">{namaTravel}</dd>
                </div>
              </dl>
            </div>

            <Kartu judul="Perjalanan & Akomodasi">
              <div className="divide-y divide-hairline">
                <Baris label="Bus">{info.busNumber}</Baris>
                <Baris label="Kamar">{info.roomNumber}</Baris>
                <Baris label="Hotel Makkah">
                  <a href={linkPeta(hotelMakkah, 'Makkah')} target="_blank" rel="noopener noreferrer" className="underline decoration-hairline-strong underline-offset-2">
                    {hotelMakkah}
                  </a>
                </Baris>
                <Baris label="Hotel Madinah">
                  <a href={linkPeta(hotelMadinah, 'Madinah')} target="_blank" rel="noopener noreferrer" className="underline decoration-hairline-strong underline-offset-2">
                    {hotelMadinah}
                  </a>
                </Baris>
              </div>
              <div className="mt-2 rounded-xl bg-amber-50 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">Titik Kumpul</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink">{info.meetingPoint}</p>
              </div>
            </Kartu>

            <Kartu judul="Pembimbing & Tour Leader">
              <div className="divide-y divide-hairline">
                <Kontak nama={pembimbing} peran={info.guideRole} nomor={pembimbingWa} />
                <Kontak nama={info.tourLeaderName} peran={info.tourLeaderRole} nomor={info.tourLeaderWhatsapp} />
              </div>
            </Kartu>
          </div>

          {/* ── Kolom berkas & pembayaran ── */}
          <div className="space-y-3 lg:col-span-7">
            <TransparansiBerkas pendataan={pendataan} />
            <KonfirmasiPembayaran />
            <KuitansiInvoiceViewer />
          </div>
        </div>

        {/* Di desktop tombol keluar sudah ada di sidebar. */}
        <button type="button" onClick={logout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white py-3 text-[13px] font-semibold text-rose-600 transition active:scale-[0.99] lg:hidden">
          <IconKeluar className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}
