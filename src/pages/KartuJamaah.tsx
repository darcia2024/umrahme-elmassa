import { useState, type ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOperationalInfo, whatsappLink } from '../data/travelCompanion';
import { IconDownload, IconPhone } from '../components/icons';
import { TransparansiBerkas } from '../components/el-massa/TransparansiBerkas';
import { KonfirmasiPembayaran } from '../components/el-massa/KonfirmasiPembayaran';
import { KuitansiInvoiceViewer } from '../components/el-massa/KuitansiInvoiceViewer';
import { usePendataan } from '../components/el-massa/KartuPendataan';
import { varianPutih } from '../lib/logo';

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

/** Chip EMV ala kartu kredit, murni hiasan. */
function Chip() {
  return (
    <svg viewBox="0 0 48 36" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="emas-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e3a1" />
          <stop offset="0.5" stopColor="#d4a24e" />
          <stop offset="1" stopColor="#b9862f" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="47" height="35" rx="6" fill="url(#emas-chip)" stroke="rgba(0,0,0,0.18)" />
      <path d="M0.5 12h14M0.5 24h14M33.5 12h14M33.5 24h14M14.5 0.5v35M33.5 0.5v35M14.5 18h19" stroke="rgba(90,60,10,0.45)" strokeWidth="1" fill="none" />
      <rect x="18" y="8" width="12" height="20" rx="3" fill="none" stroke="rgba(90,60,10,0.45)" />
    </svg>
  );
}

function IconNirsentuh({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className} aria-hidden>
      <path d="M8.5 7.5a6.5 6.5 0 0 1 0 9" /><path d="M12 5a10 10 0 0 1 0 14" /><path d="M15.5 2.5a13.5 13.5 0 0 1 0 19" />
    </svg>
  );
}

/** Logo travel versi putih; kalau tidak ada, nama travel sebagai teks. */
function LogoKartu({ logo, nama }: { logo?: string | null; nama: string }) {
  const putih = logo ? varianPutih(logo) : null;
  const [gagal, setGagal] = useState(false);
  if (putih && !gagal) {
    return <img src={putih} alt={nama} className="h-[11cqw] max-h-12 w-auto object-contain" onError={() => setGagal(true)} />;
  }
  return <span className="truncate font-display font-bold tracking-tight" style={{ fontSize: '5cqw' }}>{nama}</span>;
}

/** Kartu jamaah berbentuk kartu kredit (rasio ID-1, 85,6 × 54 mm). Ukuran teks ikut lebar kartu. */
function KartuIdentitas({ nama, nomor, kode, fase, namaTravel, logo }: {
  nama: string; nomor: string; kode: string; fase: string; namaTravel: string; logo?: string | null;
}) {
  return (
    <div id="digital-id-card" className="mx-auto w-full max-w-[440px]" style={{ containerType: 'inline-size' }}>
      <div
        className="relative flex aspect-[1.586] w-full flex-col justify-between overflow-hidden rounded-[5cqw] p-[6cqw] text-white"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)',
          boxShadow: '0 18px 40px -12px color-mix(in srgb, var(--color-primary-deep) 55%, transparent), 0 2px 6px rgba(0,0,0,0.12)',
        }}
      >
        {/* Lingkaran besar & kilau diagonal, seperti motif kartu bank */}
        <div className="pointer-events-none absolute -right-[22%] -top-[45%] aspect-square w-[85%] rounded-full bg-white/[0.09]" />
        <div className="pointer-events-none absolute -bottom-[60%] -left-[20%] aspect-square w-[80%] rounded-full bg-black/[0.07]" />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 45%, transparent 60%)' }} />
        <div className="pointer-events-none absolute inset-0 rounded-[5cqw] ring-1 ring-inset ring-white/20" />

        {/* Atas: logo travel + fase */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0"><LogoKartu logo={logo} nama={namaTravel} /></div>
          <div className="flex-none text-right leading-tight">
            <p className="font-display font-bold italic tracking-tight" style={{ fontSize: '4.2cqw' }}>Kartu Jamaah</p>
            <p className="text-white/75" style={{ fontSize: '2.9cqw' }}>{fase}</p>
          </div>
        </div>

        {/* Tengah: chip, nirsentuh, nomor jamaah */}
        <div className="relative">
          <div className="flex items-center gap-[2.5cqw]">
            <div className="h-[9cqw] w-[12cqw]"><Chip /></div>
            <IconNirsentuh className="h-[6.5cqw] w-[6.5cqw] text-white/80" />
          </div>
          <p className="mt-[3cqw] font-mono font-semibold"
            style={{ fontSize: '6.4cqw', letterSpacing: '0.12em', textShadow: '0 1px 0 rgba(0,0,0,0.25), 0 -1px 0 rgba(255,255,255,0.15)' }}>
            {nomor}
          </p>
        </div>

        {/* Bawah: pemegang kartu + kode aktivasi */}
        <div className="relative flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="uppercase tracking-[0.18em] text-white/65" style={{ fontSize: '2.4cqw' }}>Nama Jamaah</p>
            <p className="truncate font-semibold uppercase tracking-[0.06em]" style={{ fontSize: '4.3cqw', textShadow: '0 1px 0 rgba(0,0,0,0.2)' }}>
              {nama}
            </p>
          </div>
          <div className="flex-none text-right">
            <p className="uppercase tracking-[0.18em] text-white/65" style={{ fontSize: '2.4cqw' }}>Kode</p>
            <p className="font-mono font-semibold" style={{ fontSize: '4cqw' }}>{kode}</p>
          </div>
        </div>
      </div>
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

            <KartuIdentitas
              nama={jamaah.nama}
              nomor={jamaah.nomorJamaah}
              kode={jamaah.kodeAktivasi}
              fase={LABEL_FASE[jamaah.fase] ?? jamaah.fase}
              namaTravel={namaTravel}
              logo={tenant?.logo_url}
            />

            <Kartu judul="Perjalanan & Akomodasi">
              <div className="divide-y divide-hairline">
                <Baris label="Rombongan">{info.groupCode}</Baris>
                {jamaah.nomorPaspor && <Baris label="No. Paspor"><span className="font-mono">{jamaah.nomorPaspor}</span></Baris>}
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
