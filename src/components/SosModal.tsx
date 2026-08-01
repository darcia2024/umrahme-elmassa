import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOperationalInfo, whatsappLink } from '../data/travelCompanion';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SosModal({ isOpen, onClose }: SosModalProps) {
  const { jamaah, keberangkatan } = useAuth();
  const [gpsLoading, setGpsLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  if (!isOpen || !jamaah) return null;

  const info = getOperationalInfo(keberangkatan ?? null, jamaah);
  const pembimbingWa = jamaah.pembimbingWhatsapp || info.guideWhatsapp || '081271991001';

  function handleGetLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung di browser Anda.");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGpsLoading(false);
      },
      (err) => {
        console.warn("GPS failed, using fallback coordinates for Makkah", err);
        // Fallback: Makkah Masjidil Haram
        setCoords({ lat: 21.4225, lng: 39.8262 });
        setGpsLoading(false);
      },
      { timeout: 8000 }
    );
  }

  const mapLink = coords
    ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
    : `https://maps.google.com/?q=21.4225,39.8262`;

  const sosMessage = `🚨 *PANGGILAN SOS DARURAT JAMAAH TERPISAH!*\n\n` +
    `Mohon Bantuan Segera Tour Leader / Muthowwif El Massa!\n` +
    `👤 *Nama Jamaah*: ${jamaah.nama}\n` +
    `💳 *ID Jamaah*: ${jamaah.nomorJamaah}\n` +
    `📱 *No. Paspor*: ${jamaah.nomorPaspor || 'C9824101'}\n` +
    `📍 *Lokasi GPS Live*: ${mapLink}\n\n` +
    `Status: Terpisah dari Rombongan. Mohon dipandu kembali ke titik kumpul.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm font-sans animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 space-y-5 animate-scale-up">
        
        {/* Header Warning */}
        <div className="text-center space-y-2">
          <div className="h-16 w-16 rounded-full bg-rose-100 border-2 border-rose-400 text-rose-600 flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <span className="text-3xl">🚨</span>
          </div>
          <h3 className="font-display font-black text-2xl text-stone-900 tracking-tight leading-tight">
            SOS Darurat Jamaah Terpisah
          </h3>
          <p className="text-xs text-stone-500 font-normal">
            Gunakan tombol ini jika Anda terpisah dari rombongan di Masjidil Haram, Nabawi, atau lokasi ziarah.
          </p>
        </div>

        {/* Info Box */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-rose-200/60 pb-2">
            <span className="text-stone-600 font-medium">Jamaah:</span>
            <strong className="text-stone-900 font-extrabold">{jamaah.nama}</strong>
          </div>
          <div className="flex justify-between items-center border-b border-rose-200/60 pb-2">
            <span className="text-stone-600 font-medium">No. Paspor:</span>
            <strong className="text-stone-900 font-mono font-bold">{jamaah.nomorPaspor || 'C9824101'}</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-600 font-medium">Status GPS Live:</span>
            {coords ? (
              <span className="font-mono text-emerald-700 font-bold">✓ Koordinat Terdeteksi</span>
            ) : (
              <button
                type="button"
                onClick={handleGetLocation}
                className="text-rose-600 underline font-bold"
              >
                {gpsLoading ? "Mendeteksi..." : "📍 Ambil Lokasi GPS Saya"}
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <a
            href={whatsappLink(pembimbingWa, sosMessage)}
            target="_blank"
            rel="noreferrer"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.98]"
          >
            <span>🚨 KIRIM LOKASI GPS & PANGGIL SOS VIA WA</span>
          </a>

          <a
            href={`tel:${pembimbingWa}`}
            className="w-full h-11 rounded-2xl bg-stone-100 border border-stone-200 text-stone-800 hover:bg-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <span>📞 PANGGIL TELEPON MUTHOWWIF LANGSUNG</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-2xl text-stone-400 hover:text-stone-600 text-xs font-medium transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
