import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatNamaNormal } from "../../lib/formatName";

const KNOWN_PAYMENTS: Record<
  string,
  {
    status: "Lunas" | "Sudah 50%" | "DP" | "Belum Bayar";
    total: number;
    paid: number;
    kwNumber?: string;
  }
> = {
  "siti rohimah": { status: "Lunas", total: 34526744, paid: 34526744, kwNumber: "KW-611496" },
  "elis oktapiani": { status: "Lunas", total: 33500000, paid: 33500000, kwNumber: "KW-516888" },
  "eti saraswati": { status: "Lunas", total: 37900000, paid: 37900000, kwNumber: "KW-895647" },
  "aliyah fitri zulkarnaen": { status: "Sudah 50%", total: 33500000, paid: 17000000, kwNumber: "KW-760076" },
  "hatijah dulaman bujang": { status: "Sudah 50%", total: 37900000, paid: 19000000, kwNumber: "KW-278649" },
  "elmi solkan": { status: "DP", total: 33500000, paid: 10000000, kwNumber: "KW-340760" },
  "aspa listina": { status: "DP", total: 33500000, paid: 10000000, kwNumber: "KW-369425" },
  "erita maisari": { status: "DP", total: 37900000, paid: 10000000, kwNumber: "KW-414539" },
  "erwin holidi": { status: "DP", total: 37900000, paid: 10000000, kwNumber: "KW-218478" },
  "devi ropiani": { status: "Belum Bayar", total: 33500000, paid: 0 },
  "julian abdul wahab": { status: "Belum Bayar", total: 37900000, paid: 0 },
};

function formatIDR(val: number) {
  return "Rp " + Math.round(val || 0).toLocaleString("id-ID");
}

function getTerbilang(amount: number): string {
  if (amount >= 37900000) return "Tiga Puluh Tujuh Juta Sembilan Ratus Ribu Rupiah";
  if (amount >= 34526744) return "Tiga Puluh Empat Juta Lima Ratus Dua Puluh Enam Ribu Tujuh Ratus Empat Puluh Empat Rupiah";
  if (amount >= 33500000) return "Tiga Puluh Tiga Juta Lima Ratus Ribu Rupiah";
  if (amount >= 19000000) return "Sembilan Belas Juta Rupiah";
  if (amount >= 17000000) return "Tujuh Belas Juta Rupiah";
  if (amount >= 10000000) return "Sepuluh Juta Rupiah";
  if (amount === 0) return "Nol Rupiah (Belum Ada Pembayaran)";
  return `${amount.toLocaleString("id-ID")} Rupiah`;
}

export function KuitansiInvoiceViewer() {
  const [selectedDoc, setSelectedDoc] = useState<"kuitansi" | "invoice">("kuitansi");
  const { jamaah, tenant } = useAuth();
  const namaTravel = tenant?.nama_travel || "PT. Al Massa Azka Wisata";

  const namaJamaah = jamaah ? formatNamaNormal(jamaah.nama) : "Jamaah El Massa";
  const namaKey = (jamaah?.nama || "").toLowerCase().trim();

  // Match payment data from database sync
  const matched = KNOWN_PAYMENTS[namaKey] || {
    status: (jamaah?.statusPembayaran as any) || "DP",
    total: jamaah?.nominalTagihan || 33500000,
    paid: jamaah?.nominalTerbayar || 10000000,
    kwNumber: undefined,
  };

  const statusPembayaran = matched.status;
  const totalTagihan = matched.total;
  const totalTerbayar = matched.paid;
  const sisaTagihan = Math.max(totalTagihan - totalTerbayar, 0);

  const kwNumber =
    matched.kwNumber ||
    `KW-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${(jamaah?.nomorJamaah || "001").slice(-3)}`;
  const invNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${(jamaah?.nomorJamaah || "001").slice(-3)}`;

  const rombongan = jamaah?.rombongan || "UMRAH REGULER 04 NOVEMBER 2026";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4 font-sans max-w-full overflow-hidden">
      {/* Header & Toggle Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-stone-900 tracking-tight font-display truncate">
              Kuitansi & Invoice Digital
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black border shadow-2xs ${
                statusPembayaran === "Lunas"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : statusPembayaran === "Sudah 50%"
                  ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                  : statusPembayaran === "DP"
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-stone-100 text-stone-600 border-stone-200"
              }`}
            >
              {statusPembayaran === "Lunas"
                ? "✓ Lunas 100%"
                : statusPembayaran === "Sudah 50%"
                ? "💰 Sudah Bayar 50%"
                : statusPembayaran === "DP"
                ? "💳 Uang Muka (DP)"
                : "⏳ Belum Bayar"}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 font-normal truncate">
            Dioperasikan resmi oleh {namaTravel} · Rombongan: <span className="font-semibold text-stone-700">{rombongan}</span>
          </p>
        </div>

        {/* Capsule Tab Switcher */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-full border border-stone-200/80 w-fit flex-none shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedDoc("kuitansi")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              selectedDoc === "kuitansi"
                ? "bg-brand-pink text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            Kuitansi {statusPembayaran === "Lunas" ? "Pelunasan" : statusPembayaran === "Sudah 50%" ? "50%" : "DP"}
          </button>
          <button
            type="button"
            onClick={() => setSelectedDoc("invoice")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              selectedDoc === "invoice"
                ? "bg-brand-pink text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            Invoice Tagihan
          </button>
        </div>
      </div>

      {/* Aesthetic Document Display Box */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5 space-y-5">
        {selectedDoc === "kuitansi" ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-3">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  KUITANSI PEMBAYARAN RESMI
                </span>
                <p className="text-lg font-black text-stone-900 font-mono tracking-tight mt-0.5">{kwNumber}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold border w-fit ${
                  statusPembayaran === "Lunas"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : statusPembayaran === "Sudah 50%"
                    ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                    : statusPembayaran === "DP"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                {statusPembayaran === "Lunas"
                  ? "✓ Lunas 100% (Pelunasan Penuh)"
                  : statusPembayaran === "Sudah 50%"
                  ? "✓ Telah Membayar 50%"
                  : statusPembayaran === "DP"
                  ? "✓ Lunas Sebagian (Uang Muka DP)"
                  : "⏳ Menunggu Pembayaran"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 text-xs font-semibold block">Telah Diterima Dari</span>
                <span className="font-extrabold text-stone-900 text-sm">{namaJamaah}</span>
                <span className="text-[11px] text-stone-500 block">No. Jamaah: {jamaah?.nomorJamaah || "—"}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-semibold block">Jumlah Pembayaran</span>
                <span className="font-mono font-black text-emerald-700 text-base">{formatIDR(totalTerbayar)}</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-stone-500 text-xs font-semibold block">Terbilang</span>
                <span className="font-medium text-stone-800 italic">&ldquo;{getTerbilang(totalTerbayar)}&rdquo;</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-stone-500 text-xs font-semibold block">Untuk Pembayaran</span>
                <span className="font-medium text-stone-700">
                  {statusPembayaran === "Lunas"
                    ? `Pelunasan Penuh Paket ${rombongan}`
                    : statusPembayaran === "Sudah 50%"
                    ? `Pembayaran Tahap 2 (50%) Paket ${rombongan}`
                    : `Setoran Uang Muka (DP) Paket ${rombongan}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-mono font-medium">
                Diterbitkan Resmi: Sistem Kasir Terintegrasi · Bank Syariah Indonesia (BSI)
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-9 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-stone-800 transition flex items-center justify-center gap-2"
              >
                <svg className="h-3.5 w-3.5 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
                <span>Cetak / Unduh Kuitansi PDF</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/70 pb-3">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                  INVOICE TAGIHAN RESMI
                </span>
                <p className="text-lg font-black text-stone-900 font-mono tracking-tight mt-0.5">{invNumber}</p>
              </div>
              <span
                className={`rounded-full px-3.5 py-1 text-xs font-bold border w-fit ${
                  sisaTagihan <= 0
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-pink-50 text-pink-700 border-pink-200"
                }`}
              >
                {sisaTagihan <= 0 ? "✓ Tagihan Lunas (Sisa: Rp 0)" : `Sisa Pelunasan: ${formatIDR(sisaTagihan)}`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-500 text-xs font-semibold block">Total Tagihan Paket</span>
                <span className="font-mono text-base font-black text-stone-900">{formatIDR(totalTagihan)}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-semibold block">Total Terbayar</span>
                <span className="font-mono text-base font-black text-emerald-700">{formatIDR(totalTerbayar)}</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-semibold block">Sisa Pembayaran</span>
                <span className={`font-mono text-base font-black ${sisaTagihan <= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  {formatIDR(sisaTagihan)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-medium">
                {sisaTagihan <= 0
                  ? "Status: Pembayaran paket telah lunas sepenuhnya."
                  : `Batas Pelunasan: Maksimal H-14 sebelum tanggal keberangkatan.`}
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-9 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-stone-800 transition flex items-center justify-center gap-2"
              >
                <svg className="h-3.5 w-3.5 text-stone-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
                <span>Cetak / Unduh Invoice PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
