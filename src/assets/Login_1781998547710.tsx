import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validasiKode, KODE_DEMO } from '../data/jamaah';
import heroBg from '@assets/photo-1635829576353-1a14caec2f6f_1781969073425.avif';
import { KeyRound } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/beranda';

  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const hasil = validasiKode(kode, nama);
      if (hasil.ok && hasil.jamaah) {
        login(hasil.jamaah);
        navigate(from, { replace: true });
      } else {
        setError(hasil.error ?? 'Terjadi kesalahan.');
        setLoading(false);
      }
    }, 450);
  }

  return (
    <div className="min-h-screen flex items-center justify-center sm:p-4 bg-white sm:bg-[#f0efed]">
      {/* ── Card wrapper ── */}
      <div
        className="w-full sm:max-w-[400px] overflow-hidden min-h-screen sm:min-h-0 flex flex-col sm:rounded-[28px] sm:shadow-[0_8px_48px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
        style={{ background: '#ffffff' }}
      >
        {/* ── Hero image area ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '72vw',
            maxHeight: '360px',
            minHeight: '260px',
          }}
        >
          {/* Hero photo — natural, no color grading */}
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 40%', transform: 'scale(1.35)', transformOrigin: 'center 40%' }}
            aria-hidden
          />

          {/* Light top scrim so text stays readable */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.10) 45%, transparent 65%, rgba(255,255,255,0.80) 100%)',
            }}
          />

          {/* Arabic calligraphy — centered, smaller */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6">
            <p
              className="font-arab text-center"
              style={{
                fontSize: 'clamp(18px, 5.5vw, 26px)',
                direction: 'rtl',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.70)',
                lineHeight: 1.65,
              }}
            >
              لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ
            </p>
            <div className="flex items-center gap-2">
              <span className="h-px w-5" style={{ background: 'rgba(255,255,255,0.45)' }} />
              <p
                className="font-mono text-[9px] uppercase tracking-[0.28em]"
                style={{ color: 'rgba(255,255,255,0.70)', textShadow: '0 1px 4px rgba(0,0,0,0.50)' }}
              >
                Talbiyah
              </p>
              <span className="h-px w-5" style={{ background: 'rgba(255,255,255,0.45)' }} />
            </div>
          </div>

          {/* Bottom fade into white card body */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: '40px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 100%)',
            }}
          />
        </div>

        {/* ── Card body ── */}
        <div className="px-6 pt-6 pb-7">

          {/* Heading */}
          <h2
            className="font-display font-bold leading-tight text-ink text-center"
            style={{ fontSize: 'clamp(26px, 7vw, 34px)' }}
          >
            Selamat Datang!
          </h2>
          <p className="mt-1.5 text-[13px] text-charcoal text-center">
            Masukkan kode aktivasi.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">

            {/* Kode Aktivasi row — styled like the "photo + upload" row in reference */}
            <div
              className="flex items-center gap-3 rounded-2xl border px-4 py-3"
              style={{ borderColor: 'rgba(32,32,32,0.10)', background: '#fafaf9' }}
            >
              {/* Icon badge */}
              <div
                className="flex-none flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: '#111111' }}
              >
                <KeyRound className="h-4.5 w-4.5" style={{ color: '#ffffff', strokeWidth: 2 }} />
              </div>
              {/* Input */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-[10px] uppercase tracking-[0.18em] text-mute mb-0.5">
                  Kode Aktivasi
                </p>
                <input
                  id="kode"
                  value={kode}
                  onChange={(e) => setKode(e.target.value.toUpperCase())}
                  placeholder="UMR8X2"
                  autoCapitalize="characters"
                  autoComplete="off"
                  maxLength={6}
                  className="w-full bg-transparent font-mono text-[17px] tracking-[0.35em] text-ink placeholder:text-stone/40 focus:outline-none"
                />
              </div>
              {/* Character counter */}
              {kode.length > 0 && (
                <span
                  className="flex-none flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold text-primary"
                  style={{ background: 'rgba(14,165,233,0.08)' }}
                >
                  {kode.length}
                </span>
              )}
            </div>

            {/* Nama Jamaah — styled like "Display Name" field in reference */}
            <div style={{ marginTop: '16px' }}>
              <p className="font-display text-[11px] uppercase tracking-[0.15em] text-mute mb-1.5 px-1">
                Nama Jamaah
              </p>
              <div
                className="flex items-center gap-2 rounded-2xl border px-4 py-3.5"
                style={{ borderColor: 'rgba(32,32,32,0.12)', background: '#fafaf9' }}
              >
                <span className="flex-none font-mono text-[15px] text-stone">@</span>
                <input
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="nama sesuai paspor"
                  autoComplete="name"
                  className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-stone/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Error */}
            {error ? (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl px-4 py-3 animate-scale-in"
                style={{ background: 'rgba(14,165,233,0.07)', border: '1px solid rgba(14,165,233,0.18)' }}
              >
                <span
                  className="flex-none flex h-5 w-5 items-center justify-center rounded-full font-mono text-[11px] font-bold text-primary"
                  style={{ background: 'rgba(14,165,233,0.12)' }}
                >
                  !
                </span>
                <p className="text-[13px] leading-relaxed text-body">{error}</p>
              </div>
            ) : null}

            {/* Submit — dark pill like reference "Continue" button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-60"
              style={{
                background: loading ? '#444' : '#111111',
                color: '#ffffff',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(0,0,0,0.22)',
                marginTop: '20px',
              }}
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin flex-none" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Memeriksa…
                </>
              ) : 'Masuk'}
            </button>

            {/* Demo hint */}
            <p className="text-center text-[12px] text-ash pt-1">
              Demo:{' '}
              <button
                type="button"
                onClick={() => setKode(KODE_DEMO)}
                className="font-mono font-bold text-primary hover:underline underline-offset-2 transition-all"
              >
                {KODE_DEMO}
              </button>
              {' '}+ nama bebas
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
