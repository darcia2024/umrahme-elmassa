import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { IconSertifikat, IconDownload, IconShare } from '../components/icons';
import { DEFAULT_SERTIFIKAT_LAYOUT, type SertifikatField } from '../lib/supabase';

function nomorSertifikat(nomorJamaah: string): string {
  const tahun = new Date().getFullYear();
  const seed = nomorJamaah.replace(/\D/g, '').slice(-4) || '0000';
  return `UMR-CERT-${tahun}-${seed}`;
}

const tanggalSekarang = new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function fontFamilyToCss(f: SertifikatField['fontFamily']): string {
  switch (f) {
    case 'display': return "'Bricolage Grotesque', sans-serif";
    case 'mono':    return "'JetBrains Mono', monospace";
    case 'arab':    return "'Amiri', serif";
    default:        return "'Inter', sans-serif";
  }
}

export default function Sertifikat() {
  const { jamaah, tenant, setFase } = useAuth();
  const certRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  if (!jamaah) return null;

  const selesai = jamaah.fase === 'selesai';

  if (!selesai) {
    return (
      <div>
        <PageHeader title="Sertifikat" eyebrow="Profil" backTo="/profil" />
        <EmptyState
          icon={<IconSertifikat className="h-7 w-7" />}
          title="Sertifikat belum tersedia"
          desc="Sertifikat akan terbit setelah seluruh rangkaian ibadah umrah Anda selesai. Selesaikan tawaf, sa'i, dan tahallul terlebih dahulu."
          action={
            <button
              type="button"
              onClick={() => setFase('selesai')}
              className="min-h-[44px] rounded-full bg-primary px-6 font-semibold text-on-primary active:scale-[0.99]"
            >
              Tandai Umrah Selesai
            </button>
          }
        />
      </div>
    );
  }

  const hasTemplate = Boolean(tenant?.sertifikat_template_url);
  const layout = tenant?.sertifikat_layout ?? DEFAULT_SERTIFIKAT_LAYOUT;

  const fieldValue: Record<string, string> = {
    nama:             jamaah.nama,
    nomor:            jamaah.nomorJamaah,
    tanggal:          tanggalSekarang,
    nomor_sertifikat: nomorSertifikat(jamaah.nomorJamaah),
    nama_travel:      tenant?.nama_travel ?? jamaah.travel,
    judul:            'Sertifikat Umrah',
    subjudul:         'Dengan ini menerangkan bahwa',
    keterangan:       'telah menunaikan ibadah umrah ke Baitullah dengan khusyuk',
  };

  async function unduh() {
    if (!certRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: hasTemplate ? '#ffffff' : '#130a04',
      });
      const a = document.createElement('a');
      a.download = `Sertifikat-Umrah-${jamaah!.nama.replace(/\s+/g, '-')}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      /* abaikan kegagalan render */
    } finally {
      setBusy(false);
    }
  }

  async function bagikan() {
    if (!certRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(certRef.current, { pixelRatio: 2, backgroundColor: hasTemplate ? '#ffffff' : '#130a04' });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'sertifikat-umrah.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Sertifikat Umrah' });
      } else {
        await unduh();
      }
    } catch {
      /* dibatalkan / tidak didukung */
    } finally {
      setBusy(false);
    }
  }

  const certCard = (
    <div
      ref={certRef}
      className="relative overflow-hidden rounded-2xl animate-fade-up"
      style={{
        aspectRatio: '1.414 / 1',
        background: hasTemplate ? 'transparent' : 'radial-gradient(120% 60% at 50% 0%, rgba(212,162,78,0.18), #130a04 60%)',
        containerType: 'inline-size',
      } as React.CSSProperties}
    >
      {/* Background template image */}
      {hasTemplate && (
        <img
          src={tenant!.sertifikat_template_url!}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      )}

      {/* Overlay gelap tipis supaya teks tetap terbaca */}
      {hasTemplate && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.18)' }}
        />
      )}

      {/* Border ornamen (hanya kalau TIDAK pakai template) */}
      {!hasTemplate && (
        <>
          <div className="pointer-events-none absolute inset-3 rounded-2xl border border-gold/40" />
          <div className="pointer-events-none absolute inset-[18px] rounded-xl border border-gold/15" />
          {['left-2 top-2', 'right-2 top-2', 'left-2 bottom-2', 'right-2 bottom-2'].map((p) => (
            <span key={p} className={`pointer-events-none absolute ${p} h-2 w-2 rotate-45 bg-gold/70`} />
          ))}
        </>
      )}

      {/* Konten teks — layout absolut bila ada template, default bila tidak */}
      {hasTemplate ? (
        layout.fields.filter(f => f.visible).map(f => (
          <div
            key={f.key}
            className="pointer-events-none absolute whitespace-nowrap"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: `translate(${f.align === 'center' ? '-50%' : f.align === 'right' ? '-100%' : '0'}, -50%)`,
              fontSize: `${f.fontSize / 10}cqw`,
              color: f.color,
              fontWeight: f.bold ? 700 : 400,
              fontFamily: fontFamilyToCss(f.fontFamily),
              textShadow: '0 1px 4px rgba(0,0,0,0.25)',
            }}
          >
            {fieldValue[f.key] ?? ''}
          </div>
        ))
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Sertifikat Pelaksanaan
          </p>

          <h2 className="mt-1.5 font-display text-2xl font-bold" style={{ color: '#f3e9d5' }}>
            Ibadah Umrah
          </h2>

          <div className="mx-auto my-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <p className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(243,233,213,0.5)' }}>
            Dengan ini menerangkan bahwa
          </p>

          <p className="mt-2 font-display text-3xl font-bold leading-tight" style={{ color: '#f3e9d5' }}>
            {jamaah.nama}
          </p>

          <p
            className="font-mono text-[11px] mt-2"
            style={{ color: 'rgba(243,233,213,0.5)', letterSpacing: '0.15em' }}
          >
            {jamaah.nomorJamaah}
          </p>

          <p className="mt-3 max-w-[34ch] mx-auto text-pretty text-sm leading-relaxed" style={{ color: 'rgba(243,233,213,0.6)' }}>
            telah menunaikan rangkaian ibadah umrah ke Baitullah Al-Haram dengan penuh khusyuk.
            Semoga menjadi umrah yang mabrur.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left w-full">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80">Tanggal</p>
              <p className="mt-0.5 text-sm" style={{ color: '#f3e9d5' }}>{tanggalSekarang}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80">No. Sertifikat</p>
              <p className="mt-0.5 font-mono text-sm" style={{ color: '#f3e9d5' }}>{nomorSertifikat(jamaah.nomorJamaah)}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gold/15 pt-4 w-full text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(243,233,213,0.4)' }}>
              Diselenggarakan oleh
            </p>
            <p className="mt-0.5 font-display text-base font-bold" style={{ color: '#f3e9d5' }}>
              {tenant?.nama_travel ?? jamaah.travel}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader title="Sertifikat Umrah" eyebrow="Profil" backTo="/profil" />

      {/* MOBILE (< lg) */}
      <div className="lg:hidden px-5 pt-5 pb-8">
        <p className="mb-4 text-center font-arab text-2xl leading-loose text-gold" dir="rtl">
          تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ
        </p>
        {certCard}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={unduh}
            disabled={busy}
            className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-on-primary active:scale-[0.99] disabled:opacity-60"
          >
            <IconDownload className="h-5 w-5" /> Unduh PNG
          </button>
          <button
            type="button"
            onClick={bagikan}
            disabled={busy}
            className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-hairline-strong font-medium text-ink active:scale-[0.99] disabled:opacity-60"
          >
            <IconShare className="h-5 w-5" /> Bagikan
          </button>
        </div>
        {busy ? (
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-mute">
            Menyiapkan gambar…
          </p>
        ) : null}
      </div>

      {/* DESKTOP (≥ lg) */}
      <div className="hidden lg:block px-8 py-8 max-w-5xl mx-auto">
        <p className="mb-6 text-center font-arab text-3xl leading-loose text-gold" dir="rtl">
          تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ
        </p>

        <div className="grid grid-cols-[1fr_300px] gap-8 items-start">
          <div>{certCard}</div>

          <div className="space-y-4">
            <div className="rounded-md border border-gold/20 bg-gold/5 px-5 py-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-3">
                Informasi Sertifikat
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Nama', value: jamaah.nama },
                  { label: 'No. Jamaah', value: jamaah.nomorJamaah, mono: true },
                  { label: 'No. Sertifikat', value: nomorSertifikat(jamaah.nomorJamaah), mono: true },
                  { label: 'Tanggal', value: tanggalSekarang },
                  { label: 'Travel', value: tenant?.nama_travel ?? jamaah.travel },
                ].map(({ label, value, mono }) => (
                  <div key={label}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-mute">{label}</p>
                    <p className={`mt-0.5 text-sm text-ink ${mono ? 'font-mono' : ''}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={unduh}
              disabled={busy}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary font-semibold text-on-primary transition active:scale-[0.99] disabled:opacity-60"
            >
              <IconDownload className="h-5 w-5" /> Unduh PNG
            </button>
            <button
              type="button"
              onClick={bagikan}
              disabled={busy}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-hairline-strong font-medium text-ink transition hover:bg-surface-bone active:scale-[0.99] disabled:opacity-60"
            >
              <IconShare className="h-5 w-5" /> Bagikan
            </button>

            {busy ? (
              <p className="text-center font-mono text-[11px] uppercase tracking-wider text-mute">
                Menyiapkan gambar…
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
