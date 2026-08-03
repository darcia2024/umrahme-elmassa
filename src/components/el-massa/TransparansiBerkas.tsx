import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export type DocumentStatusProps = {
  bookingCode?: string;
  jamaahName?: string;
  passportNumber?: string;
  passportStatus?: "Verified" | "Pending" | "Missing";
  visaNumber?: string;
  visaStatus?: "Issued" | "Processing" | "Pending";
  ticketNumber?: string;
  airline?: string;
  flightRoute?: string;
  hotelMakkah?: string;
  hotelMadinah?: string;
  roomType?: string;
};

export function TransparansiBerkas() {
  const { tenant } = useAuth();
  const namaTravel = tenant?.nama_travel || "PT. Al Massa Azka Wisata";
  const [searchCode, setSearchCode] = useState("BK-202607-001");
  const [data] = useState<DocumentStatusProps>({
    bookingCode: "BK-202607-001",
    jamaahName: "H. Rusli Suparman & Rombongan",
    passportNumber: "C9824101",
    passportStatus: "Verified",
    visaNumber: "EV-992101",
    visaStatus: "Issued",
    ticketNumber: "126-9821401",
    airline: "Garuda Indonesia GA-980",
    flightRoute: "Pangkalpinang (PGK) → Jakarta (CGK) → Jeddah (JED)",
    hotelMakkah: "Pullman Zamzam Makkah (Kamar #408)",
    hotelMadinah: "Frontel Al Harithia Madinah (Kamar #302)",
    roomType: "Quad (4 Pax / Room)",
  });

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm space-y-5 font-sans max-w-full overflow-hidden">
      
      {/* Prominent Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-normal text-emerald-800 tracking-wide uppercase">
              Real-Time Document Tracker
            </span>
            <span className="font-mono text-[11px] font-normal text-stone-400">Ref: {data.bookingCode}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight font-display">
            Transparansi Berkas & Status Jamaah
          </h2>
          <p className="text-xs text-stone-500 mt-0.5 font-normal">
            Dioperasikan resmi oleh {namaTravel}
          </p>
        </div>

        {/* Quick Search */}
        <div className="flex items-center gap-2 flex-none">
          <input
            type="text"
            placeholder="Cari Kode Booking..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="h-10 w-36 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-normal text-stone-800 outline-none focus:border-stone-400 focus:bg-white transition"
          />
          <button
            type="button"
            className="h-10 px-4 rounded-xl bg-stone-900 text-white text-xs font-normal shadow-xs hover:bg-stone-800 transition"
          >
            Cek Berkas
          </button>
        </div>
      </div>

      {/* Grid Sub-Cards - Regular Font Badges */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        
        {/* Card 1: Paspor RI */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-stone-500 uppercase tracking-widest">Paspor RI</span>
            <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-0.5 text-xs font-normal text-emerald-800">
              Verified
            </span>
          </div>
          <div>
            <p className="font-mono text-lg sm:text-xl font-black text-stone-900 tracking-tight">{data.passportNumber}</p>
            <p className="text-xs font-normal text-stone-600 mt-0.5">a.n {data.jamaahName}</p>
          </div>
          <div className="pt-2.5 border-t border-stone-200/70 text-xs font-normal text-emerald-700 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Fisik Paspor Terverifikasi di Kantor El Massa
          </div>
        </div>

        {/* Card 2: E-Visa KSA */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3 hover:border-emerald-300 hover:bg-emerald-50/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-stone-500 uppercase tracking-widest">E-Visa KSA</span>
            <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-0.5 text-xs font-normal text-emerald-800">
              Issued & Valid
            </span>
          </div>
          <div>
            <p className="font-mono text-lg sm:text-xl font-black text-emerald-900 tracking-tight">{data.visaNumber}</p>
            <p className="text-xs font-normal text-stone-600 mt-0.5">Visa Umrah Imigrasi Arab Saudi</p>
          </div>
          <div className="pt-2.5 border-t border-stone-200/70 text-xs font-normal text-emerald-700 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Disetujui Kementerian Hajj & Umrah KSA
          </div>
        </div>

        {/* Card 3: E-Tiket Flight */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3 hover:border-pink-300 hover:bg-pink-50/20 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-stone-500 uppercase tracking-widest">E-Tiket Garuda</span>
            <span className="rounded-full bg-pink-100 border border-pink-200 px-3 py-0.5 text-xs font-normal text-pink-800">
              Confirmed
            </span>
          </div>
          <div>
            <p className="font-mono text-lg sm:text-xl font-black text-stone-900 tracking-tight">{data.ticketNumber}</p>
            <p className="text-xs font-normal text-stone-600 mt-0.5">{data.airline}</p>
          </div>
          <div className="pt-2.5 border-t border-stone-200/70 text-xs font-normal text-pink-700">
            {data.flightRoute}
          </div>
        </div>

        {/* Card 4: Rooming List Hotel */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3 hover:border-stone-300 hover:bg-stone-100/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-stone-500 uppercase tracking-widest">Rooming List</span>
            <span className="rounded-full bg-stone-200 border border-stone-300 px-3 py-0.5 text-xs font-normal text-stone-800">
              {data.roomType}
            </span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-stone-900 leading-snug">{data.hotelMakkah}</p>
            <p className="text-xs font-normal text-stone-500 mt-0.5">{data.hotelMadinah}</p>
          </div>
          <div className="pt-2.5 border-t border-stone-200/70 text-xs font-normal text-stone-600">
            Voucher Kamar & Kunci Siap Diterima
          </div>
        </div>

      </div>
    </div>
  );
}
