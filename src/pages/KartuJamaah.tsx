import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { getOperationalInfo, whatsappLink } from '../data/travelCompanion';
import { TransparansiBerkas } from '../components/el-massa/TransparansiBerkas';
import { UploadBuktiBayar } from '../components/el-massa/UploadBuktiBayar';
import { KuitansiInvoiceViewer } from '../components/el-massa/KuitansiInvoiceViewer';

function IconWhatsapp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconPhone({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6.26 6.26l1.28-1.28a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function KartuJamaah() {
  const { jamaah, tenant, keberangkatan } = useAuth();
  if (!jamaah) return null;

  const info         = getOperationalInfo(keberangkatan ?? null, jamaah);
  const rombongan    = info.groupCode;
  const hotelMakkah  = (jamaah.hotelMakkah  ?? info.hotelMakkah ?? 'Pullman Zamzam Makkah').replace(/⭐.*/, '').trim();
  const hotelMadinah = (jamaah.hotelMadinah ?? info.hotelMadinah ?? 'Frontel Al Harithia Madinah').replace(/⭐.*/, '').trim();
  const pembimbing   = jamaah.pembimbingNama     ?? info.guideName;
  const pembimbingWa = jamaah.pembimbingWhatsapp ?? info.guideWhatsapp;
  const tourLeader   = info.tourLeaderName;
  const tourLeaderWa = info.tourLeaderWhatsapp;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8 lg:p-10 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-8">

        <PageHeader title="Kartu Jamaah Digital" eyebrow="El Massa" backTo="/beranda" />

        {/* ── KARTU JAMAAH DIGITAL (PINK BACKGROUND WITH ISLAMIC GEOMETRIC PATTERN) ── */}
        <div
          id="digital-id-card"
          className="w-full rounded-[32px] overflow-hidden bg-white border border-stone-200/80 shadow-xl transition-all font-sans grid grid-cols-1 md:grid-cols-12"
        >
          
          {/* Left Column: Pink El Massa Background with Pattern / Corak (5 Cols) */}
          <div
            className="md:col-span-5 lg:col-span-4 relative flex flex-col justify-between overflow-hidden min-h-[420px]"
            style={{
              background: 'linear-gradient(145deg, #e11d48 0%, #be185d 45%, #9d174d 100%)',
            }}
          >
            {/* Pattern / Corak Overlay (Subtle Geometric Pattern & Radial Glow) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 70%),
                  repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0, rgba(255, 255, 255, 0.15) 1px, transparent 0, transparent 16px),
                  repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 0, rgba(255, 255, 255, 0.15) 1px, transparent 0, transparent 16px)
                `,
              }}
            />

            {/* Floating Ornamental Background Rings */}
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full border border-white/15 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/15 pointer-events-none" />

            {/* Top Badge & Glass Bookmark Button */}
            <div className="relative z-10 p-6 flex items-center justify-between">
              <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 text-xs font-normal text-white font-sans shadow-2xs">
                El Massa • 1448H
              </span>
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>

            {/* Avatar & Personal Identity Summary */}
            <div className="relative z-10 p-6 sm:p-8 space-y-4">
              <div className="h-20 w-20 flex-none rounded-full border-2 border-white/90 shadow-2xl bg-white text-pink-700 font-extrabold text-3xl flex items-center justify-center overflow-hidden font-display">
                {jamaah.nama.charAt(0).toUpperCase()}
              </div>
              
              <div className="space-y-1.5 drop-shadow-sm">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {jamaah.nama}
                </h1>
                <p className="text-xs text-pink-100 font-normal">
                  Jamaah Umrah Spesial Muharram
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="rounded-full bg-white text-pink-900 px-3.5 py-0.5 text-xs font-black font-sans shadow-2xs">
                    ID: {jamaah.nomorJamaah}
                  </span>
                  <span className="rounded-full bg-white/20 text-white px-3 py-0.5 text-xs font-normal font-sans backdrop-blur-sm border border-white/20">
                    Laki-Laki
                  </span>
                </div>
              </div>

              {/* Passport & NIK Summary Box inside Pink Left Panel */}
              <div className="pt-3 border-t border-white/20 text-xs text-pink-100 space-y-1 font-sans">
                <p className="flex justify-between"><span>No. Paspor:</span> <strong className="text-white font-mono font-bold">C9824101</strong></p>
                <p className="flex justify-between"><span>NIK KTP:</span> <strong className="text-white font-mono font-bold">3174092108850003</strong></p>
                <p className="flex justify-between"><span>Status Visa:</span> <strong className="text-emerald-200 font-bold">EV-99210183 (Issued)</strong></p>
              </div>

            </div>
          </div>

          {/* Right Column: ALL DATA IN NEAT CURVED BOX CONTAINERS (`KOTAK CURVE`) (7 Cols) */}
          <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
            
            {/* Header Status Badges */}
            <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-normal text-stone-400 uppercase tracking-widest block font-sans">STATUS JAMAAH</span>
                <span className="text-xs font-normal text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mt-1 inline-block">
                  ✓ Berkas & Visa Terverifikasi Valid
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-normal text-stone-400 uppercase tracking-widest block font-sans">KODE AKTIVASI</span>
                <span className="font-sans text-base font-black text-stone-900">{jamaah.kodeAktivasi}</span>
              </div>
            </div>

            {/* CURVED BOX 1: ALAMAT RUMAH LENGKAP & KONTAK DARURAT */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block font-sans">
                ALAMAT RUMAH LENGKAP & KONTAK DARURAT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <span className="text-stone-400 text-[10px] block font-sans">Alamat Domisili</span>
                  <p className="font-extrabold text-stone-900 leading-snug">
                    Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Kontak Darurat</span>
                  <p className="font-extrabold text-pink-600">
                    +62 812-3456-7890 <span className="text-stone-500 font-normal text-[11px]">(Istri)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CURVED BOX 2: INFORMASI PERSONAL & KESEHATAN */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block font-sans">
                INFORMASI PERSONAL & KESEHATAN
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Tanggal Lahir & Usia</span>
                  <p className="font-bold text-stone-900">21 Agt 1985 (40 Tahun)</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Golongan Darah</span>
                  <p className="font-bold text-stone-900">O+ (Positif)</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Catatan Kesehatan</span>
                  <p className="font-bold text-emerald-700">Sehat (Tanpa Komorbid)</p>
                </div>
              </div>
            </div>

            {/* CURVED BOX 3: PENERBANGAN, ROMBONGAN & HOTEL */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-4 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block font-sans">
                PENERBANGAN, ROMBONGAN & AKOMODASI HOTEL
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Rombongan / Kloter</span>
                  <p className="font-bold text-pink-600 truncate">{rombongan}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Penerbangan</span>
                  <p className="font-bold text-stone-900">Garuda GA-980 (CGK ➔ JED)</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-sans">Pembimbing Ibadah</span>
                  <p className="font-bold text-stone-900 truncate">{pembimbing}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-pink-600" />
                    <span className="text-stone-400 font-normal uppercase text-[9px]">Hotel Makkah</span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(hotelMakkah + ' Makkah Saudi Arabia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-stone-900 block truncate hover:text-pink-600 transition"
                  >
                    {hotelMakkah} ⭐5
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-stone-400 font-normal uppercase text-[9px]">Hotel Madinah</span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(hotelMadinah + ' Madinah Saudi Arabia')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-stone-900 block truncate hover:text-pink-600 transition"
                  >
                    {hotelMadinah} ⭐5
                  </a>
                </div>
              </div>
            </div>

            {/* CURVED BOX 4: TITIK KUMPUL UTAMA HARIAN */}
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3.5 space-y-0.5 text-xs">
              <span className="text-amber-800 font-normal uppercase text-[9px] tracking-wider block font-sans">TITIK KUMPUL UTAMA HARIAN</span>
              <p className="font-extrabold text-stone-900 leading-snug">{info.meetingPoint}</p>
            </div>

            {/* Bottom 4-Metrics Row + Direct PDF Download Button */}
            <div className="border-t border-stone-100 pt-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-5 text-left">
                <div>
                  <span className="text-xs font-black text-stone-900 block font-display">★ 4.9</span>
                  <span className="text-[10px] text-stone-400 font-normal block font-sans">Verified</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-xs font-black text-stone-900 block font-display">9 Hari</span>
                  <span className="text-[10px] text-stone-400 font-normal block font-sans">Program</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-xs font-black text-stone-900 block font-display">Quad</span>
                  <span className="text-[10px] text-stone-400 font-normal block font-sans">Kamar</span>
                </div>
                <div className="h-6 w-px bg-stone-200" />
                <div>
                  <span className="text-xs font-black text-stone-900 block font-display">GA-980</span>
                  <span className="text-[10px] text-stone-400 font-normal block font-sans">Flight</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="h-10 px-5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-normal shadow-md transition flex items-center gap-2"
              >
                <svg className="h-4 w-4 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Unduh Kartu PDF</span>
              </button>
            </div>

          </div>

        </div>

        {/* ── KONTAK PEMBIMBING & TOUR LEADER (ULTRA-ELEGANT ICONS & BUTTONS) ── */}
        <div className="w-full space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs overflow-hidden space-y-5">
            <h3 className="text-base font-extrabold text-stone-900 font-display">Kontak Pembimbing & Tour Leader</h3>

            {/* Muthowwif Rombongan */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-pink-50 border border-pink-200/80 text-pink-600 shadow-2xs">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-black text-stone-900 font-display">{pembimbing}</p>
                  <p className="text-xs text-stone-500 font-normal">{info.guideRole} • {pembimbingWa}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappLink(pembimbingWa)}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-normal shadow-2xs flex items-center gap-2 transition"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${pembimbingWa}`}
                  className="h-9 px-4 rounded-full bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 hover:text-stone-900 text-xs font-normal flex items-center gap-2 transition"
                >
                  <IconPhone className="h-3.5 w-3.5" />
                  <span>Telepon</span>
                </a>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-1" />

            {/* Tour Leader */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-stone-100 border border-stone-200/80 text-stone-800 shadow-2xs">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-black text-stone-900 font-display">{tourLeader}</p>
                  <p className="text-xs text-stone-500 font-normal">{info.tourLeaderRole} • {tourLeaderWa}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappLink(tourLeaderWa)}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-normal shadow-2xs flex items-center gap-2 transition"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${tourLeaderWa}`}
                  className="h-9 px-4 rounded-full bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 hover:text-stone-900 text-xs font-normal flex items-center gap-2 transition"
                >
                  <IconPhone className="h-3.5 w-3.5" />
                  <span>Telepon</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── INTEGRASI EL MASSA COMPONENT ──────────────── */}
          <div className="space-y-6 pt-4">
            <TransparansiBerkas />
            <UploadBuktiBayar />
            <KuitansiInvoiceViewer />
          </div>
        </div>

      </div>
    </div>
  );
}
