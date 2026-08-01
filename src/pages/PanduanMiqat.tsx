import PageHeader from '../components/PageHeader';
import MihrabCard from '../components/MihrabCard';
import { daftarMiqat } from '../data/miqat';
import { IconPeta } from '../components/icons';

export default function PanduanMiqat() {
  return (
    <div className="pb-10">
      <PageHeader
        title="Panduan Miqat"
        eyebrow="5 batas tempat mulai ihram — pahami sebelum berangkat"
      />

      <div className="space-y-5 px-5 lg:px-8">

        {/* ── Apa itu Miqat ── */}
        <section className="rounded-2xl border border-hairline bg-surface-card p-5 shadow-drop-soft">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary">Pengertian</p>
          <h2 className="font-display text-lg font-bold text-ink">Apa itu Miqat?</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-charcoal">
            Miqat adalah batas tempat (<span className="italic">miqat makani</span>) atau waktu (<span className="italic">miqat zamani</span>) yang ditetapkan untuk memulai ihram. Melewati batas miqat tanpa berihram bagi yang hendak umrah/haji mewajibkan <span className="font-semibold text-ink">dam (denda)</span> atau harus kembali ke miqat. Untuk umrah, tidak ada batas waktu — bisa kapan saja sepanjang tahun.
          </p>
        </section>

        {/* ── Dalil ── */}
        <section className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">Dalil</p>
          <MihrabCard bodyClassName="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-2">HR. Bukhari & Muslim (dari Ibnu Abbas)</p>
            <p className="text-[13.5px] leading-relaxed text-body">
              "Nabi ﷺ menetapkan miqat penduduk Madinah di Dzulhulaifah, penduduk Syam di Juhfah, penduduk Najd di Qarnul Manazil, penduduk Yaman di Yalamlam. (Berlaku) bagi mereka dan siapa pun yang melewatinya yang hendak haji & umrah."
            </p>
          </MihrabCard>
          <MihrabCard bodyClassName="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold mb-2">HR. Abu Dawud & Nasa'i (dari Aisyah)</p>
            <p className="text-[13.5px] leading-relaxed text-body">
              "Nabi ﷺ menetapkan miqat penduduk Irak di Dzatu 'Irq."
            </p>
          </MihrabCard>
        </section>

        {/* ── 5 Titik Miqat ── */}
        <section>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mute">5 Titik Miqat Makani</p>
          <div className="space-y-3">
            {daftarMiqat.map((m, i) => (
              <div
                key={m.id}
                className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-card p-4 shadow-drop-soft"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/30 opacity-70" aria-hidden />

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
                    <span className="font-mono text-[13px] font-bold text-primary">{i + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[15px] font-bold text-ink">{m.nama}</h3>
                      {m.id === 'dzulhulaifah' && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-primary">
                          Indonesia (Madinah)
                        </span>
                      )}
                      {m.id === 'yalamlam' && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-gold">
                          Indonesia (Jeddah)
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 font-arab text-[18px] leading-relaxed text-gold">{m.namaArab}</p>
                    {m.namaLain && (
                      <p className="font-mono text-[10px] text-mute">{m.namaLain}</p>
                    )}

                    <div className="mt-2 space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex-none font-mono text-[9px] uppercase tracking-wider text-mute w-16">Untuk</span>
                        <span className="text-[12.5px] leading-snug text-charcoal">{m.untuk}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex-none font-mono text-[9px] uppercase tracking-wider text-mute w-16">Jarak</span>
                        <span className="text-[12.5px] text-charcoal">{m.jarakKeMakkah}</span>
                      </div>
                    </div>

                    <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal border-t border-hairline pt-2">
                      {m.keterangan}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Jamaah Indonesia ── */}
        <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 to-primary/3 p-5 shadow-drop-soft">
          <div className="flex items-center gap-2 mb-3">
            <IconPeta className="h-5 w-5 text-primary flex-none" />
            <p className="font-display text-[15px] font-bold text-ink">Khusus Jamaah Indonesia</p>
          </div>
          <div className="space-y-3 text-[13.5px] leading-relaxed text-charcoal">
            <div className="rounded-xl border border-hairline bg-surface-card px-4 py-3">
              <p className="font-semibold text-ink mb-1">🕌 Gelombang dari Madinah</p>
              <p>Miqat di <span className="font-semibold text-ink">Dzulhulaifah (Bir Ali)</span> — berihram di Masjid Bir Ali sebelum berangkat ke Makkah. Miqat terjauh, ±450 km dari Makkah.</p>
            </div>
            <div className="rounded-xl border border-hairline bg-surface-card px-4 py-3">
              <p className="font-semibold text-ink mb-1">✈️ Gelombang langsung ke Makkah (via Jeddah)</p>
              <p>Miqat saat pesawat melintas di atas <span className="font-semibold text-ink">Yalamlam / Qarnul Manazil</span> (kru memberi aba-aba), atau dari Bandara King Abdulaziz Jeddah sesuai fatwa MUI (1980 & dikukuhkan 1981). Sebagian travel menganjurkan berihram dari asrama haji/hotel sebelum melintas miqat agar tidak terlewat.</p>
            </div>
          </div>
        </section>

        {/* ── Adab & Peringatan ── */}
        <section className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/8 to-gold/3 p-5 shadow-drop-soft">
          <p className="mb-3 font-display text-[15px] font-bold text-ink">Adab & Hal Penting di Miqat</p>
          <ul className="space-y-2.5">
            {[
              'Mandi sunnah ihram & kenakan pakaian ihram SEBELUM/di miqat.',
              'Shalat sunnah 2 rakaat sebelum berniat ihram.',
              'WAJIB berniat ihram sebelum melewati batas miqat — jangan tunda.',
              'Jika terlewat tanpa ihram → wajib kembali ke miqat ATAU membayar dam.',
              'Bagi jamaah pesawat: siapkan ihram lebih awal, niat segera saat aba-aba kru.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-0.5 flex-none text-[11px] font-bold ${i === 3 ? 'text-red-500' : 'text-gold'}`}>
                  {i === 3 ? '⚠' : '✓'}
                </span>
                <span className={`text-[13px] leading-snug ${i === 3 ? 'font-semibold text-red-600' : 'text-charcoal'}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Catatan Fikih ── */}
        <section className="rounded-xl border border-hairline bg-surface-bone px-4 py-4">
          <p className="font-mono text-[9px] uppercase tracking-widest text-mute mb-2">Catatan Fikih</p>
          <ul className="space-y-1.5 text-[12px] leading-relaxed text-charcoal">
            <li>• Miqat untuk umrah tidak ada batas waktu — berbeda dengan haji (miqat zamani: Syawal, Dzulqa'dah, 10 hari pertama Dzulhijjah).</li>
            <li>• Dzatu 'Irq ditetapkan Umar bin Khattab رضي الله عنه via ijtihad (muhadzah/kesejajaran jalur) — tetap sah karena prinsip qiyas arah.</li>
            <li>• Penduduk Makkah berihram dari Makkah sendiri untuk haji; untuk umrah keluar ke tanah halal terdekat (Tan'im/Ji'ranah).</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
