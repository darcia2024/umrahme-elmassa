import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ritualSteps, TOTAL_STEPS } from '../data/ritualSteps';
import { doaById } from '../data/doa';
import { IconBack, IconReset, IconCheck, IconChevron } from '../components/icons';

const STORAGE = 'umrahme.navigator';

function loadStep(): number {
  const v = Number(localStorage.getItem(STORAGE));
  return Number.isFinite(v) && v >= 0 ? Math.min(v, TOTAL_STEPS) : 0;
}

function saveStep(n: number) {
  localStorage.setItem(STORAGE, String(n));
}

function DoaInline({ doaId }: { doaId: string }) {
  const doa = doaById(doaId);
  if (!doa) return null;
  return (
    <div className="rounded-md border border-hairline bg-surface-card px-4 py-4 shadow-drop-card">
      {doa.perluVerifikasi ? (
        <div className="mb-2.5 flex items-center gap-1.5 rounded-md border border-gold/20 bg-gold/5 px-3 py-2">
          <span className="text-[10px] leading-relaxed text-gold">
            ⚠ Konten ini perlu verifikasi ulama sebelum digunakan secara resmi.
          </span>
        </div>
      ) : null}
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
        {doa.judul}
      </p>
      {doa.waktu ? (
        <p className="mt-0.5 text-[11px] leading-relaxed text-charcoal">{doa.waktu}</p>
      ) : null}
      <p className="mt-3 font-arab text-2xl leading-loose text-gold" dir="rtl" lang="ar">
        {doa.arab}
      </p>
      <p className="mt-2 text-[13px] italic leading-relaxed text-charcoal">{doa.latin}</p>
      <Link
        to={`/doa/${doa.id}`}
        className="mt-2.5 flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary/80"
      >
        Baca artinya & dalil <IconChevron className="h-3 w-3" />
      </Link>
    </div>
  );
}

function PetaOverlay({
  currentIdx,
  onClose,
  onJump,
}: {
  currentIdx: number;
  onClose: () => void;
  onJump: (idx: number) => void;
}) {
  const selesai = currentIdx >= TOTAL_STEPS;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 backdrop-blur-sm lg:items-center lg:justify-center">
      <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-hairline bg-surface-card px-5 pb-10 pt-5 motion-safe:animate-fade-up shadow-drop-soft lg:max-w-md lg:rounded-2xl lg:border">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-ink">
            Semua Tahap Umrah
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-hairline px-3 py-1 text-xs text-mute active:bg-surface-bone"
          >
            Tutup
          </button>
        </div>
        <div className="space-y-1.5">
          {ritualSteps.map((step, idx) => {
            const done = selesai || idx < currentIdx;
            const active = !selesai && idx === currentIdx;
            const locked = !selesai && idx > currentIdx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => !locked && onJump(idx)}
                disabled={locked}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition ${
                  active
                    ? 'border border-primary/20 bg-primary/5'
                    : done
                      ? 'opacity-60 hover:opacity-100 hover:bg-surface-bone'
                      : 'opacity-30 cursor-not-allowed'
                }`}
              >
                <span
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border text-[11px] font-mono ${
                    done
                      ? 'border-gold/50 bg-gold/10 text-gold'
                      : active
                        ? 'border-primary/50 bg-primary/10 text-primary'
                        : 'border-hairline text-mute'
                  }`}
                >
                  {done ? <IconCheck className="h-3.5 w-3.5" /> : step.urutan}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-[14px] font-medium leading-snug ${active || done ? 'text-ink' : 'text-mute'}`}>
                    {step.judul}
                  </p>
                  {active ? (
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
                      Sedang berjalan
                    </p>
                  ) : null}
                </div>
                {done ? <IconChevron className="h-3.5 w-3.5 flex-none -rotate-90 text-ash" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResetOverlay({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 backdrop-blur-sm lg:items-center lg:justify-center">
      <div className="w-full rounded-t-2xl border-t border-hairline bg-surface-card p-6 pb-8 motion-safe:animate-fade-up shadow-drop-soft lg:max-w-sm lg:rounded-2xl lg:border">
        <h3 className="font-display text-xl font-bold text-ink">Reset Navigator?</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal">
          Semua progres akan dihapus dan kembali ke tahap pertama. Gunakan jika ingin memulai umrah dari awal (mis. umrah sunnah kedua).
        </p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[44px] flex-1 rounded-full border border-hairline-strong font-medium text-ink active:scale-[0.99]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[44px] flex-1 rounded-full bg-primary font-semibold text-on-primary active:scale-[0.99]"
          >
            Ya, reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RitualNavigator() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState<number>(() => loadStep());
  const [showPeta, setShowPeta] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    saveStep(stepIdx);
  }, [stepIdx]);

  const selesai = stepIdx >= TOTAL_STEPS;
  const step = selesai ? null : ritualSteps[stepIdx];
  const isLast = stepIdx === TOTAL_STEPS - 1;

  function maju() {
    setStepIdx((i) => i + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function mundur() {
    setStepIdx((i) => Math.max(0, i - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setStepIdx(0);
    setShowReset(false);
    setShowPeta(false);
  }

  function jumpTo(idx: number) {
    if (idx <= stepIdx || selesai) {
      setStepIdx(idx);
      setShowPeta(false);
    }
  }

  if (selesai) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] flex-col bg-canvas lg:min-h-screen lg:items-center lg:justify-center">
        <div className="w-full lg:max-w-sm">
          <div
            className="flex items-center justify-between px-4 pt-4"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Kembali"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card text-ink active:scale-95 shadow-drop-card"
            >
              <IconBack className="h-5 w-5" />
            </button>
            <span />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center motion-safe:animate-fade-up">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-badge-success/30 bg-badge-success/10 text-badge-success">
              <IconCheck className="h-12 w-12" />
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-badge-success">
              10 dari 10 tahap selesai
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-ink">
              Umrah Selesai
            </h1>
            <p className="mt-3 max-w-[30ch] text-pretty text-[15px] leading-relaxed text-charcoal">
              Alhamdulillah — semoga ibadah Anda diterima Allah dan menjadi umrah yang mabrur.
            </p>

            <Link
              to="/profil/sertifikat"
              className="mt-8 flex min-h-[52px] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary text-[17px] font-semibold text-on-primary active:scale-[0.99]"
            >
              Lihat Sertifikat Digital <IconChevron className="h-5 w-5" />
            </Link>
            <Link
              to="/ibadah"
              className="mt-3 flex min-h-[44px] w-full max-w-xs items-center justify-center rounded-full border border-hairline text-sm text-mute active:scale-[0.99] hover:bg-surface-bone"
            >
              Kembali ke Ibadah
            </Link>
            <button
              type="button"
              onClick={() => setShowReset(true)}
              className="mt-5 font-mono text-xs uppercase tracking-wider text-ash underline-offset-4 hover:underline"
            >
              Mulai ulang (umrah sunnah)
            </button>
          </div>
        </div>

        {showReset ? <ResetOverlay onConfirm={reset} onCancel={() => setShowReset(false)} /> : null}
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col bg-canvas lg:min-h-screen lg:items-center lg:justify-start">
      <div className="w-full lg:max-w-lg">
        <div
          className="flex items-center justify-between px-4 pt-4"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Kembali ke Ibadah"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card text-ink active:scale-95 shadow-drop-card"
          >
            <IconBack className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPeta(true)}
              className="rounded-full border border-hairline bg-surface-card px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-mute active:scale-95"
            >
              Lihat semua
            </button>
            <button
              type="button"
              onClick={() => setShowReset(true)}
              aria-label="Reset Navigator"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card text-mute active:scale-95"
            >
              <IconReset className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-5 pb-6 pt-4 lg:px-8">
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Tahap {step!.urutan} dari {TOTAL_STEPS}
              </p>
              <p className="font-mono text-[11px] text-mute">
                {TOTAL_STEPS - step!.urutan} lagi
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-bone">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(stepIdx / TOTAL_STEPS) * 100}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              {ritualSteps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < stepIdx
                      ? 'bg-primary/50'
                      : i === stepIdx
                        ? 'bg-primary'
                        : 'bg-surface-bone border border-hairline'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-md border border-hairline bg-surface-card px-5 py-5 shadow-drop-card">
            <h1 className="font-display text-3xl font-bold leading-tight text-ink">
              {step!.judul}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal">
              {step!.deskripsiSingkat}
            </p>

            {step!.catatanPenting ? (
              <div className="mt-4 flex items-start gap-2.5 rounded-md border border-gold/20 bg-gold/5 px-3.5 py-3">
                <span className="mt-0.5 text-[14px] text-gold">⚑</span>
                <p className="text-[13px] leading-relaxed text-gold">
                  {step!.catatanPenting}
                </p>
              </div>
            ) : null}
          </div>

          {step!.doaTerkaitId ? (
            <div className="mt-3">
              <DoaInline doaId={step!.doaTerkaitId} />
            </div>
          ) : null}

          {step!.linkKeFitur ? (
            <Link
              to={step!.linkKeFitur}
              className="mt-3 flex min-h-[52px] w-full items-center justify-between rounded-full border border-primary/30 bg-primary/5 px-5 text-[15px] font-medium text-primary active:scale-[0.99]"
            >
              <span>{step!.linkKeFiturLabel ?? 'Buka fitur terkait'}</span>
              <IconChevron className="h-4 w-4 flex-none" />
            </Link>
          ) : null}

          {/* Tombol aksi — bagian dari aliran konten, muncul setelah semua kartu doa */}
          <div className="mt-6 border-t border-hairline pt-5">
            <button
              type="button"
              onClick={maju}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-primary text-[17px] font-semibold text-on-primary active:scale-[0.99]"
            >
              {isLast ? 'Selesaikan Umrah' : 'Tahap Selanjutnya'}
              <IconChevron className="h-5 w-5" />
            </button>

            {stepIdx > 0 ? (
              <button
                type="button"
                onClick={mundur}
                className="mt-2.5 flex w-full items-center justify-center gap-1.5 py-2 font-mono text-[11px] uppercase tracking-wider text-mute active:text-body"
              >
                <IconChevron className="h-3.5 w-3.5 rotate-180" /> Kembali ke tahap sebelumnya
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {showPeta ? (
        <PetaOverlay currentIdx={stepIdx} onClose={() => setShowPeta(false)} onJump={jumpTo} />
      ) : null}
      {showReset ? <ResetOverlay onConfirm={reset} onCancel={() => setShowReset(false)} /> : null}
    </div>
  );
}
