import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function KuitansiInvoiceViewer() {
  const [selectedDoc, setSelectedDoc] = useState<"kuitansi" | "invoice">("kuitansi");
  const { tenant } = useAuth();
  const namaTravel = tenant?.nama_travel || "El Massa Tour & Travel";

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4 font-sans max-w-full overflow-hidden">
      
      {/* Header & Toggle Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="min-w-0">
          <h3 className="text-base font-black text-stone-900 tracking-tight font-display truncate">
            Kuitansi & Invoice Digital
          </h3>
          <p className="text-xs text-stone-500 mt-0.5 font-normal truncate">
            Dioperasikan resmi oleh {namaTravel}
          </p>
        </div>

        {/* Capsule Tab Switcher */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-full border border-stone-200/80 w-fit flex-none shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedDoc("kuitansi")}
            className={`px-4 py-1.5 rounded-full text-xs font-normal transition ${
              selectedDoc === "kuitansi"
                ? "bg-pink-600 text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            Kuitansi DP
          </button>
          <button
            type="button"
            onClick={() => setSelectedDoc("invoice")}
            className={`px-4 py-1.5 rounded-full text-xs font-normal transition ${
              selectedDoc === "invoice"
                ? "bg-pink-600 text-white shadow-xs"
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
                <span className="text-[10px] font-normal text-stone-500 uppercase tracking-widest block">KUITANSI PEMBAYARAN RESMI</span>
                <p className="text-lg font-black text-stone-900 font-mono tracking-tight mt-0.5">KW-202607-001</p>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-normal text-emerald-800 w-fit">
                ✓ Lunas Sebagian (DP)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 text-xs font-normal block">Telah Diterima Dari</span>
                <span className="font-extrabold text-stone-900 text-sm">H. Rusli Suparman & Rombongan (4 Pax)</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-normal block">Jumlah Pembayaran</span>
                <span className="font-mono font-black text-emerald-700 text-base">Rp 50.000.000</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-stone-500 text-xs font-normal block">Terbilang</span>
                <span className="font-medium text-stone-800 italic">"Lima Puluh Juta Rupiah"</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-stone-500 text-xs font-normal block">Untuk Pembayaran</span>
                <span className="font-normal text-stone-700">Setoran Uang Muka (DP) 4 Pax Jamaah Umrah Spesial Muharram GA-980</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-mono font-normal">Diterbitkan: 01 Juli 2026 • BCA 8440-888-999</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-9 px-4 rounded-xl bg-stone-900 text-white text-xs font-normal shadow-xs hover:bg-stone-800 transition flex items-center justify-center gap-2"
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
                <span className="text-[10px] font-normal text-stone-500 uppercase tracking-widest block">INVOICE TAGIHAN RESMI</span>
                <p className="text-lg font-black text-stone-900 font-mono tracking-tight mt-0.5">INV-202607-001</p>
              </div>
              <span className="rounded-full bg-pink-50 border border-pink-200 px-3.5 py-1 text-xs font-normal text-pink-700 w-fit">
                Sisa Pelunasan: Rp 68.800.000
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-500 text-xs font-normal block">Total Tagihan (4 Pax)</span>
                <span className="font-mono text-base font-black text-stone-900">Rp 118.800.000</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-normal block">Total Terbayar (DP)</span>
                <span className="font-mono text-base font-black text-emerald-700">Rp 50.000.000</span>
              </div>
              <div>
                <span className="text-stone-500 text-xs font-normal block">Jatuh Tempo Pelunasan</span>
                <span className="text-sm font-extrabold text-rose-700">20 Juli 2026</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500 font-mono font-normal">Status: Sisa Rp 68.800.000 sebelum H-14 Keberangkatan</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-9 px-4 rounded-xl bg-stone-900 text-white text-xs font-normal shadow-xs hover:bg-stone-800 transition flex items-center justify-center gap-2"
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
