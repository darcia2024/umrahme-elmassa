import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validasiSlug } from '../data/jamaah';
import { fetchTenantBySlug, type TenantRow } from '../lib/supabase';
import loginBg from '@assets/el_massa_login.png';

export default function LoginSlug() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [tenant, setTenant] = useState<TenantRow | null>(null);
  const [tenantLoading, setTenantLoading] = useState(true);
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchTenantBySlug(slug)
      .then((t) => setTenant(t))
      .catch(() => setTenant(null))
      .finally(() => setTenantLoading(false));
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!slug) return;
    setLoading(true);
    setError('');
    try {
      const hasil = await validasiSlug(slug, nama);
      if (hasil.ok && hasil.jamaah && hasil.tenant) {
        login(hasil.jamaah, hasil.tenant, hasil.keberangkatan ?? null);
        navigate('/beranda', { replace: true });
      } else {
        setError(hasil.error ?? 'Gagal masuk.');
        setLoading(false);
      }
    } catch {
      setError('Tidak dapat terhubung. Periksa koneksi internet Anda.');
      setLoading(false);
    }
  }

  if (tenantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0efed]">
        <p className="font-mono text-[13px] tracking-widest text-stone-400 uppercase animate-pulse">Memuat…</p>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f0efed] text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3">404</p>
        <h1 className="text-[20px] font-bold text-stone-800 mb-2">Travel tidak ditemukan</h1>
        <p className="text-[14px] text-stone-500 max-w-xs">
          Periksa kembali link yang Anda terima dari travel Anda.
        </p>
      </div>
    );
  }

  const brandColor = tenant.primary_color || '#ea580c';
  const brandDeep  = tenant.primary_deep_color || '#d97706';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#221204] p-4 sm:p-8 font-sans">
      {/* Outer White Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[32px] p-4 sm:p-8 shadow-[0_32px_128px_rgba(0,0,0,0.5)] grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Left Side: Dark Hero Banner (With User's Custom El Massa Login Image) */}
        <div className="md:col-span-5 relative bg-[#09090b] rounded-[24px] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[460px] text-white">
          
          {/* Custom El Massa Login Background Image */}
          <img
            src={loginBg}
            alt="El Massa Login Hero"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40 pointer-events-none" />

          {/* Top Content: Logo & Travel Name */}
          <div className="relative z-10 space-y-3">
            {tenant.logo_url ? (
              <img src={tenant.logo_url} alt={tenant.nama_travel} className="h-10 w-auto object-contain drop-shadow" />
            ) : (
              <p className="font-arab text-amber-200/90 text-xl tracking-wide">
                لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ
              </p>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-widest text-amber-100">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {tenant.nama_travel}
            </div>
          </div>

          {/* Main Headline */}
          <div className="relative z-10 space-y-3 my-auto">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-[1.25] text-white">
              Convert your pilgrimage into a blessed journey.
            </h1>
            <p className="text-xs text-stone-300 font-medium leading-relaxed">
              Portal Aplikasi Jamaah {tenant.nama_travel}.
            </p>
          </div>

          {/* Bottom Footer note */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Verified Travel Partner</span>
            <span className="text-amber-400 font-semibold">2026 Edition</span>
          </div>
        </div>

        {/* Right Side: Clean Form Container */}
        <div className="md:col-span-7 flex flex-col justify-center px-2 sm:px-6 py-4 space-y-6">
          
          {/* Logo / Header */}
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#ea580c]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.4 7.2L20 8L16 12L17.2 17.6L12 15L6.8 17.6L8 12L4 8L9.6 7.2L12 2Z" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Selamat Datang
              </h2>
              <p className="text-xs text-stone-500 font-normal mt-1">
                Aplikasi Jamaah {tenant.nama_travel} — Masukkan nama Anda untuk masuk.
              </p>
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama Jamaah */}
            <div className="space-y-1.5">
              <label htmlFor="nama" className="text-xs font-semibold text-stone-600 block">
                Nama Lengkap Jamaah *
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="nama sesuai paspor"
                autoComplete="name"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-900 bg-white placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-xs"
              >
                <span className="flex-none mt-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-[10px]">!</span>
                <p className="leading-relaxed font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !nama.trim()}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-[0.99] disabled:opacity-50 mt-2"
              style={{ background: brandColor }}
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>Memeriksa…</span>
                </>
              ) : (
                <span>Masuk Ke Akun Saya →</span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-stone-500">
            Belum terdaftar? <span className="font-semibold text-stone-900 underline">Hubungi Admin {tenant.nama_travel}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
