import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lokasiById, daftarLokasi } from '../data/lokasi';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { IconPeta, IconChevron } from '../components/icons';

function gmapsUrl(lat: number, lng: number, _nama: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

function formatCoord(val: number, posLabel: string, negLabel: string): string {
  return `${Math.abs(val).toFixed(4)}° ${val >= 0 ? posLabel : negLabel}`;
}

function CityBadge({ kota }: { kota: string }) {
  const isMakkah = kota === 'Makkah';
  const isArafah = kota === 'Arafah';
  const isThaif = kota === 'Thaif';
  const isBadr = kota === 'Badr';

  let bg = 'rgba(var(--color-primary-rgb,67,56,202),0.09)';
  let color = 'var(--color-primary)';
  let border = 'rgba(var(--color-primary-rgb,67,56,202),0.15)';

  if (isMakkah) {
    bg = 'rgba(212,162,78,0.14)'; color = '#a07020'; border = 'rgba(212,162,78,0.25)';
  } else if (isArafah) {
    bg = 'rgba(212,162,78,0.08)'; color = '#8a6010'; border = 'rgba(212,162,78,0.15)';
  } else if (isThaif) {
    bg = 'rgba(34,139,80,0.10)'; color = '#1a6e3c'; border = 'rgba(34,139,80,0.22)';
  } else if (isBadr) {
    bg = 'rgba(180,60,50,0.10)'; color = '#8b2020'; border = 'rgba(180,60,50,0.22)';
  }

  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
      style={{ background: bg, color, border: `1px solid ${border}` }}
    >
      {kota}
    </span>
  );
}

export default function LokasiDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const scroller = document.querySelector('[data-scroll-container]') as HTMLElement | null;
    if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const lokasi = id ? lokasiById(id) : undefined;

  if (!lokasi) {
    return (
      <div>
        <PageHeader title="Lokasi" eyebrow="Peta Lokasi" backTo="/peta" />
        <EmptyState
          icon={<IconPeta className="h-7 w-7" />}
          title="Lokasi tidak ditemukan"
          desc="Tempat yang Anda cari tidak tersedia."
        />
      </div>
    );
  }

  const sameTipe = daftarLokasi.filter((l) => l.tipe === lokasi.tipe);
  const idx = sameTipe.findIndex((l) => l.id === lokasi.id);
  const prev = idx > 0 ? sameTipe[idx - 1] : null;
  const next = idx < sameTipe.length - 1 ? sameTipe[idx + 1] : null;

  const mapsHref = gmapsUrl(lokasi.koordinat.lat, lokasi.koordinat.lng, lokasi.nama);
  const coordText = `${formatCoord(lokasi.koordinat.lat, 'N', 'S')}, ${formatCoord(lokasi.koordinat.lng, 'E', 'W')}`;

  return (
    <div>
      <PageHeader
        title={lokasi.nama}
        eyebrow={lokasi.tipe === 'masjid' ? 'Masjid' : 'Tempat Bersejarah'}
        backTo="/peta"
      />

      <div className="px-5 pt-4 pb-28 space-y-3 lg:max-w-3xl lg:mx-auto lg:px-8">

        {/* ── 1. HERO: gambar / placeholder ─────────────────────── */}
        {lokasi.gambar ? (
          <div className="rounded-md overflow-hidden border border-hairline">
            <img
              src={lokasi.gambar}
              alt={lokasi.nama}
              className="w-full object-cover"
              style={{ maxHeight: '240px' }}
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center overflow-hidden rounded-md border border-dashed border-hairline-strong bg-surface-bone" style={{ height: '180px' }}>
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d4a24e 0 1px, transparent 1px 18px)' }}
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-2 text-center px-6">
              <div className="h-10 w-10 rounded-full bg-white/60 border border-hairline flex items-center justify-center">
                <IconPeta className="h-5 w-5 text-gold/60" />
              </div>
              <p className="font-display font-bold text-[18px] text-ink leading-snug">{lokasi.nama}</p>
              {lokasi.namaArab && (
                <p className="font-arab text-base text-gold" dir="rtl">{lokasi.namaArab}</p>
              )}
            </div>
          </div>
        )}

        {/* ── Nama Arab (jika ada gambar, nama Arab di luar hero) ─ */}
        {lokasi.gambar && lokasi.namaArab && (
          <p className="text-right font-arab text-[22px] text-gold leading-relaxed" dir="rtl">
            {lokasi.namaArab}
          </p>
        )}

        {/* ── Badge kota + jarak + jam ─────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2">
          <CityBadge kota={lokasi.kota} />
          <span className="font-mono text-[12px] text-charcoal">{lokasi.jarakKm} km dari area hotel</span>
          {lokasi.jamKunjungan && (
            <>
              <span className="text-ash">·</span>
              <span className="text-[12px] text-charcoal">{lokasi.jamKunjungan}</span>
            </>
          )}
        </div>

        {/* ── 2. TOMBOL GOOGLE MAPS (PROMINENT) ────────────────── */}
        <div className="rounded-md border border-hairline bg-surface-card px-4 py-4 shadow-drop-card">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full py-3 px-5 font-semibold text-[14px] transition active:scale-[0.98]"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Buka di Google Maps
            <svg className="h-3.5 w-3.5 flex-shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <p className="mt-2 text-center font-mono text-[11px] text-mute">{coordText}</p>
        </div>

        {/* ── 3. RINGKASAN ─────────────────────────────────────── */}
        <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Ringkasan</p>
          <p className="text-[14px] leading-relaxed text-body font-medium">{lokasi.ringkas}</p>
        </div>

        {/* ── 4. SEJARAH ───────────────────────────────────────── */}
        <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-primary/10 flex-shrink-0">
              <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h2 className="font-display text-[14px] font-bold text-ink">Sejarah</h2>
          </div>

          {/* Paragraf pembuka */}
          <p className="text-[13.5px] leading-[1.65] text-body mb-4">{lokasi.sejarah}</p>

          {/* Sub-seksi berstruktur */}
          {lokasi.sejarahSeksi && lokasi.sejarahSeksi.length > 0 && (
            <div className="space-y-4">
              {lokasi.sejarahSeksi.map((seksi, i) => (
                <div key={i} className="border-l-2 border-primary/25 pl-4">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-primary mb-1.5">
                    {String(i + 1).padStart(2, '0')} · {seksi.judul}
                  </p>
                  <p className="text-[13.5px] leading-[1.65] text-body">{seksi.isi}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 4b. BAGIAN-BAGIAN KA'BAH (lama, per item) ───────────── */}
        {lokasi.bagian && lokasi.bagian.length > 0 && (
          <section className="mt-6">
            <div className="mb-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Rincian</p>
              <h3 className="mt-0.5 text-[15px] font-bold text-ink">Bagian-Bagian Ka'bah</h3>
            </div>

            <div className="space-y-2.5">
              {lokasi.bagian.map((b, i) => (
                <div key={i} className="rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold leading-tight text-ink">{b.nama}</h4>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">{b.posisi}</p>
                    </div>
                    {b.arab && <span className="flex-none font-arab text-[16px] text-gold" dir="rtl">{b.arab}</span>}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal">{b.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 4c. BAGIAN-BAGIAN KA'BAH (2 grup) ───────────────────── */}
        {lokasi.bagianGrup && lokasi.bagianGrup.length > 0 && (
          <section className="mt-6">
            <div className="mb-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Rincian</p>
              <h3 className="mt-0.5 text-[15px] font-bold text-ink">Bagian-Bagian Ka'bah</h3>
            </div>

            {/* Diagram visual semua bagian sekaligus */}
            {lokasi.diagramBagian && (
              <div className="mb-3 overflow-hidden rounded-2xl border border-hairline bg-white">
                <img
                  src={lokasi.diagramBagian}
                  alt="Diagram bagian-bagian Ka'bah"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            )}

            <div className="space-y-3">
              {lokasi.bagianGrup.map((grup, gi) => (
                <div key={gi} className="rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-4 w-1 rounded-full bg-gold" aria-hidden />
                    <h4 className="text-[13.5px] font-bold text-ink">{grup.judul}</h4>
                  </div>

                  <div className="divide-y divide-hairline">
                    {grup.items.map((it, ii) => (
                      <div key={ii} className="py-2.5 first:pt-0 last:pb-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <h5 className="text-[13px] font-semibold text-ink">{it.nama}</h5>
                          {it.arab && <span className="flex-none font-arab text-[14px] text-gold" dir="rtl">{it.arab}</span>}
                        </div>
                        <p className="mt-0.5 text-[12px] leading-snug text-charcoal">{it.deskripsi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. TOKOH BERSEJARAH ───────────────────────────────── */}
        {lokasi.tokoh && lokasi.tokoh.length > 0 && (
          <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-surface-bone flex-shrink-0">
                <svg className="h-4 w-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h2 className="font-display text-[14px] font-bold text-ink">Tokoh Bersejarah</h2>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {lokasi.tokoh.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-md border border-hairline bg-surface-bone px-3 py-2.5"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      i % 2 === 0 ? 'bg-primary/10' : 'bg-gold/10'
                    }`}
                  >
                    <svg
                      className={`h-3.5 w-3.5 ${i % 2 === 0 ? 'text-primary' : 'text-gold'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-ink leading-tight">{t.nama}</p>
                    <p className="text-[11.5px] text-charcoal mt-0.5 leading-snug">{t.peran}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. KEUTAMAAN ─────────────────────────────────────── */}
        {lokasi.keutamaan && lokasi.keutamaan.length > 0 && (
          <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-gold/10 flex-shrink-0">
                <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 className="font-display text-[14px] font-bold text-ink">Keutamaan & Fakta</h2>
            </div>
            <ul className="space-y-2.5">
              {lokasi.keutamaan.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-[13.5px] leading-relaxed text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── 6b. SYUHADA BADR ──────────────────────────────────── */}
        {lokasi.syuhada && lokasi.syuhada.length > 0 && (
          <section className="mt-2">
            <div className="mb-3">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Mengenang</p>
              <h3 className="mt-0.5 text-[15px] font-bold text-ink">14 Syuhada Badr</h3>
            </div>

            {lokasi.syuhadaPengantar && (
              <p className="mb-3 text-[13px] leading-relaxed text-charcoal">{lokasi.syuhadaPengantar}</p>
            )}

            <div className="rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft">
              <div className="divide-y divide-hairline">
                {lokasi.syuhada.map((s, i) => (
                  <div key={i} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-[13px] font-bold text-ink">{i + 1}. {s.nama}</h4>
                      <span className={`flex-none rounded-full px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider ${
                        s.golongan.startsWith('Muhajirin') ? 'bg-gold/15 text-gold' : 'bg-primary/10 text-primary'
                      }`}>
                        {s.golongan}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-charcoal">{s.konteks}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-mute">
              Sumber: Sirah Ibnu Hisyam, Ibnu Ishaq, Ibnu Katsir
            </p>
          </section>
        )}

        {/* ── 7. DALIL ─────────────────────────────────────────── */}
        {lokasi.dalil && lokasi.dalil.length > 0 && (
          <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-gold/10 flex-shrink-0">
                <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <h2 className="font-display text-[14px] font-bold text-ink">Dalil Terkait</h2>
            </div>
            <div className="space-y-3">
              {lokasi.dalil.map((d, i) => (
                <div key={i} className="border-l-2 border-gold/40 pl-3">
                  <p className="text-[13.5px] italic leading-[1.65] text-body mb-1.5">"{d.teks}"</p>
                  <p className="font-mono text-[11px] font-medium text-gold">— {d.sumber}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 8. ADAB & TIPS ────────────────────────────────────── */}
        {lokasi.adab && lokasi.adab.length > 0 && (
          <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-badge-success/10 flex-shrink-0">
                <svg className="h-4 w-4 text-badge-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h2 className="font-display text-[14px] font-bold text-ink">Adab Ziarah</h2>
            </div>
            <ul className="space-y-2.5">
              {lokasi.adab.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg
                    className="h-3.5 w-3.5 text-badge-success mt-[3px] flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[13.5px] leading-relaxed text-body">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── 9. PINTU & DENAH ──────────────────────────────────── */}
        {lokasi.pintu && lokasi.pintu.length > 0 && (
          <div className="rounded-md border border-hairline bg-surface-card px-5 py-4 shadow-drop-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-7 w-7 rounded-sm flex items-center justify-center bg-gold/15 flex-shrink-0">
                <IconPeta className="h-4 w-4 text-gold" />
              </div>
              <h2 className="font-display text-[14px] font-bold text-ink">Pintu Penting &amp; Denah</h2>
            </div>
            <div className="space-y-2">
              {lokasi.pintu.map((p, i) => (
                <div key={i} className="rounded-xl border border-hairline bg-surface p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-gold/15">
                      <IconPeta className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-bold leading-tight text-ink">{p.nama}</h4>
                      <p className="mt-0.5 text-[12px] leading-snug text-charcoal">{p.fungsi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {lokasi.petaResmiUrl && (
              <a
                href={lokasi.petaResmiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-[13px] font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <IconPeta className="h-4 w-4" />
                Lihat Denah Resmi (alharamain.gov.sa)
              </a>
            )}
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-mute">
              Sumber: General Authority for the Care of the Two Holy Mosques
            </p>
          </div>
        )}

        {/* ── 10. CATATAN / DISCLAIMER ──────────────────────────── */}
        {lokasi.catatan && (
          <div
            className="rounded-md border px-4 py-3.5 flex items-start gap-3"
            style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.25)' }}
          >
            <svg
              className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[12.5px] leading-relaxed text-charcoal">
              <span className="font-semibold text-amber-700">Catatan: </span>
              {lokasi.catatan}
            </p>
          </div>
        )}

        {/* ── 10. NAVIGASI ANTAR LOKASI ─────────────────────────── */}
        {(prev || next) && (
          <div className="border-t border-hairline pt-3 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                to={`/peta/${prev.id}`}
                className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface-card px-3 py-2.5 text-[12px] font-medium text-ink hover:shadow-drop-soft transition-shadow active:scale-[0.99] max-w-[45%]"
              >
                <IconChevron className="h-3.5 w-3.5 text-ash rotate-180 flex-shrink-0" />
                <span className="truncate">{prev.nama}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/peta/${next.id}`}
                className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface-card px-3 py-2.5 text-[12px] font-medium text-ink hover:shadow-drop-soft transition-shadow active:scale-[0.99] max-w-[45%] ml-auto"
              >
                <span className="truncate">{next.nama}</span>
                <IconChevron className="h-3.5 w-3.5 text-ash flex-shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
