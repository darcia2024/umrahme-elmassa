import { GAYA_NETRAL, GAYA_STATUS, type Pendataan } from './KartuPendataan';
import { urlFormPendataan, type DokumenTerupload } from '../../lib/pendataan';

// Salinan daftar DOC_TYPES El Massa Web (lib/jamaah/rules.ts). Kalau di sana
// bertambah jenis, tambahkan juga di sini; jenis yang tidak dikenal tetap
// tampil lewat `lainnya` di bawah supaya tidak hilang diam-diam.
const JENIS_DOKUMEN: { id: string; label: string; diurusTravel?: boolean }[] = [
  { id: 'kk',        label: 'Kartu Keluarga' },
  { id: 'ktp',       label: 'KTP' },
  { id: 'paspor',    label: 'Paspor' },
  { id: 'pendukung', label: 'Dokumen Pendukung' },
  { id: 'vaksin',    label: 'Bukti Vaksin' },
  { id: 'pas_foto',  label: 'Pas Foto' },
  { id: 'visa',      label: 'Visa', diurusTravel: true },
];

const SUBJENIS_PENDUKUNG: Record<string, string> = {
  akta_kelahiran: 'Akta Kelahiran',
  ijazah: 'Ijazah',
  buku_nikah: 'Buku Nikah',
};

function formatTanggal(v: string) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function IconCentang({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function IconBerkas({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6 M9 17h4" />
    </svg>
  );
}

function Baris({ label, dok, diurusTravel }: { label: string; dok?: DokumenTerupload; diurusTravel?: boolean }) {
  const sub = dok?.docSubtype ? SUBJENIS_PENDUKUNG[dok.docSubtype] : undefined;
  const tanggal = dok ? formatTanggal(dok.uploadedAt) : '';
  return (
    <li className="flex items-center gap-3 py-2.5">
      <span
        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${
          dok ? 'bg-emerald-500 text-white' : 'border border-dashed border-hairline-strong'
        }`}
      >
        {dok && <IconCentang className="h-3.5 w-3.5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink">
          {label}{sub ? <span className="font-normal text-mute"> · {sub}</span> : null}
        </p>
        <p className="text-[11px] text-mute">
          {dok ? (tanggal ? `Diupload ${tanggal}` : 'Sudah diupload') : diurusTravel ? 'Diurus kantor setelah berkas lain lengkap' : 'Belum diupload'}
        </p>
      </div>
    </li>
  );
}

function Pesan({ children }: { children: string }) {
  return <p className="text-[12px] leading-relaxed text-charcoal">{children}</p>;
}

/**
 * Status berkas jamaah, dibaca dari El Massa Web lewat token pendataan.
 * Upload-nya sendiri tetap di form pendataan El Massa Web; di sini hanya ringkasan.
 */
export function TransparansiBerkas({ pendataan }: { pendataan: Pendataan }) {
  const { keadaan, muatUlang } = pendataan;
  const status = keadaan.tahap === 'siap' ? keadaan.status : null;
  const hasil = status?.ok ? status : null;
  const gaya = hasil ? (GAYA_STATUS[hasil.kelengkapan.status] ?? GAYA_NETRAL) : null;
  const linkDiganti = status?.ok === false && status.alasan === 'link-diganti';

  const perJenis = new Map((hasil?.dokumen ?? []).map((d) => [d.docType, d]));
  const dikenal = new Set(JENIS_DOKUMEN.map((j) => j.id));
  const lainnya = (hasil?.dokumen ?? []).filter((d) => !dikenal.has(d.docType));
  const wajib = JENIS_DOKUMEN.filter((j) => !j.diurusTravel);
  const masuk = wajib.filter((j) => perJenis.has(j.id)).length;

  const bukaForm = () => {
    if (keadaan.tahap !== 'siap') return;
    const url = urlFormPendataan(keadaan.token);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
            <IconBerkas className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Transparansi Berkas</p>
            <p className="mt-0.5 text-[13px] font-semibold text-ink">
              {hasil ? `${masuk} dari ${wajib.length} dokumen masuk` : 'Dokumen Umrah Saya'}
            </p>
          </div>
        </div>
        {hasil && gaya && (
          <span className={`inline-flex flex-none items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold ${gaya.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${gaya.titik}`} />
            {hasil.kelengkapan.status}
          </span>
        )}
      </div>

      <div className="mt-3">
        {keadaan.tahap === 'memuat' || (keadaan.tahap === 'siap' && status === null) ? (
          <div className="space-y-2.5 py-1" aria-busy="true">
            {[0, 1, 2].map((i) => <div key={i} className="h-8 animate-pulse rounded-lg bg-surface-bone" />)}
          </div>
        ) : keadaan.tahap === 'belum-ditautkan' ? (
          <Pesan>Data kamu sedang disiapkan kantor El Massa. Status berkas akan muncul di sini setelah akunmu ditautkan.</Pesan>
        ) : keadaan.tahap === 'gagal' || (status?.ok === false && !linkDiganti) ? (
          <div className="flex items-center justify-between gap-3">
            <Pesan>Status berkas belum bisa dimuat. Coba lagi nanti.</Pesan>
            <button type="button" onClick={muatUlang}
              className="flex-none font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
              Coba Lagi
            </button>
          </div>
        ) : linkDiganti ? (
          <Pesan>Link pendataan kamu sudah diganti kantor. Minta link baru ke admin El Massa.</Pesan>
        ) : hasil ? (
          <>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-bone">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.round((masuk / wajib.length) * 100)}%`, background: 'linear-gradient(90deg, var(--color-primary-deep) 0%, var(--color-primary) 100%)' }} />
            </div>
            <ul className="mt-1 divide-y divide-hairline">
              {JENIS_DOKUMEN.map((j) => (
                <Baris key={j.id} label={j.label} dok={perJenis.get(j.id)} diurusTravel={j.diurusTravel} />
              ))}
              {lainnya.map((d) => <Baris key={d.docType} label={d.docType} dok={d} />)}
            </ul>
            {hasil.kelengkapan.missingFields.length > 0 && (
              <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-[11.5px] leading-snug text-amber-900">
                Data diri yang masih kurang: {hasil.kelengkapan.missingFields.join(', ')}.
              </p>
            )}
          </>
        ) : null}
      </div>

      {keadaan.tahap === 'siap' && !linkDiganti && (
        <button type="button" onClick={bukaForm}
          className="mt-4 w-full rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-transform active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)' }}>
          {hasil && masuk === wajib.length ? 'Ganti Dokumen' : 'Upload Dokumen'}
        </button>
      )}
      <p className="mt-2.5 text-center text-[10.5px] leading-snug text-ash">
        Dokumen juga bisa diserahkan langsung ke kantor El Massa, nanti staf yang mengupload.
      </p>
    </section>
  );
}
