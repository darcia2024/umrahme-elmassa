import { useAuth } from '../../context/AuthContext';
import { getOperationalInfo, whatsappLink } from '../../data/travelCompanion';

function IconStruk({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21z" /><path d="M9 8h6 M9 12h6 M9 16h3" />
    </svg>
  );
}

/**
 * El Massa Web belum punya jalur publik untuk menerima bukti bayar dari jamaah
 * (pembayaran dicatat kasir dari sisi staf). Sampai jalur itu ada, bukti transfer
 * dikirim lewat WhatsApp kantor, dengan pesan yang sudah berisi identitas jamaah.
 *
 * Sengaja tidak menampilkan nomor rekening: rekening resmi hanya dari invoice
 * kantor, supaya jamaah tidak transfer ke nomor yang salah.
 */
export function KonfirmasiPembayaran() {
  const { jamaah, tenant, keberangkatan } = useAuth();
  if (!jamaah) return null;

  const namaTravel = tenant?.nama_travel ?? jamaah.travel;
  const nomorKantor = getOperationalInfo(keberangkatan ?? null, jamaah).travelWhatsapp;
  const pesan =
    `Assalamu'alaikum ${namaTravel}, saya ${jamaah.nama} (No. Jamaah ${jamaah.nomorJamaah}) ` +
    'ingin mengirim bukti transfer pembayaran umrah. Bukti transfer saya lampirkan di chat ini.';

  return (
    <section className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-emerald-50">
          <IconStruk className="h-4 w-4 text-emerald-700" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-mute">Pembayaran</p>
          <p className="mt-0.5 text-[13px] font-semibold text-ink">Konfirmasi Bukti Transfer</p>
        </div>
      </div>

      <ol className="mt-3 space-y-1.5 text-[12px] leading-relaxed text-charcoal">
        <li className="flex gap-2"><span className="font-mono text-[11px] text-ash">1</span>Transfer hanya ke rekening yang tertulis di invoice resmi {namaTravel}.</li>
        <li className="flex gap-2"><span className="font-mono text-[11px] text-ash">2</span>Kirim foto atau PDF bukti transfer ke WhatsApp kantor.</li>
        <li className="flex gap-2"><span className="font-mono text-[11px] text-ash">3</span>Kasir memverifikasi dan menerbitkan kuitansi.</li>
      </ol>

      <a
        href={whatsappLink(nomorKantor, pesan)}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:bg-emerald-700 active:scale-[0.98]"
      >
        Kirim Bukti via WhatsApp
      </a>
    </section>
  );
}
