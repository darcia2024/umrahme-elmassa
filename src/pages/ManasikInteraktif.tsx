import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { manasikModulList, getModulProgress, syncManasikFromCloud, type ModulProgress } from '../data/manasikInteraktif';
import { IconChevron } from '../components/icons';
import { useAuth } from '../context/AuthContext';

function StatusBadge({ progress }: { progress: ModulProgress }) {
  if (progress.selesai) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-badge-success/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-badge-success">
        <span className="h-1.5 w-1.5 rounded-full bg-badge-success" />
        Selesai
      </span>
    );
  }
  if (progress.partADone) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
        Sedang Berjalan
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mute">
      Belum Dimulai
    </span>
  );
}

export default function ManasikInteraktif() {
  const { jamaah, tenant } = useAuth();
  const tenantId = tenant?.id;
  const nomor = jamaah?.nomorJamaah;

  const [allProgress, setAllProgress] = useState<ModulProgress[]>(() =>
    manasikModulList.map((m) => getModulProgress(m.id))
  );

  const refreshProgress = () => {
    setAllProgress(manasikModulList.map((m) => getModulProgress(m.id)));
  };

  useEffect(() => {
    if (!tenantId || !nomor) return;
    syncManasikFromCloud(tenantId, nomor)
      .then(refreshProgress)
      .catch(() => {});
  }, [tenantId, nomor]);

  useEffect(() => {
    window.addEventListener('focus', refreshProgress);
    return () => window.removeEventListener('focus', refreshProgress);
  }, []);

  const modulSelesai = allProgress.filter((p) => p.selesai).length;
  const totalModul = manasikModulList.length;
  const persenKeseluruhan = Math.round((modulSelesai / totalModul) * 100);

  return (
    <div className="pb-24">
      <PageHeader title="Manasik Interaktif" eyebrow="Panduan" backTo="/panduan" />

      <div className="px-5 pt-5">
        <p className="text-[14px] leading-relaxed text-charcoal">
          Pelajari rangkaian umrah secara interaktif — kenali, urutkan, dan uji paham. Cocok untuk jamaah yang baru pertama kali.
        </p>
      </div>

      <div className="mx-5 mt-4 rounded-md border border-hairline bg-surface-card px-4 py-4 shadow-drop-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mute">Progress Belajar</p>
            <p className="mt-0.5 text-[14px] font-semibold text-ink">
              {modulSelesai} dari {totalModul} modul selesai
            </p>
          </div>
          <p className="font-display text-[28px] font-bold text-ink">{persenKeseluruhan}%</p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-bone">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${persenKeseluruhan}%` }}
          />
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {manasikModulList.map((m, i) => (
            <div
              key={m.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                allProgress[i]?.selesai ? 'bg-primary' : allProgress[i]?.partADone ? 'bg-gold/40' : 'bg-surface-bone border border-hairline'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3 px-5 pb-8">
        {manasikModulList.map((modul, i) => {
          const prog = allProgress[i] ?? getModulProgress(modul.id);
          const bagianDone = (prog.partADone ? 1 : 0) + (prog.partBDone ? 1 : 0) + (prog.partCTotal > 0 ? 1 : 0);
          const prevSelesai = i === 0 || allProgress[i - 1]?.selesai;

          return (
            <Link
              key={modul.id}
              to={`/panduan/manasik-interaktif/${modul.id}`}
              className={`block active:scale-[0.99] transition-transform ${!prevSelesai ? 'opacity-60' : ''}`}
            >
              <div className="relative overflow-hidden rounded-md border border-hairline bg-surface-card shadow-drop-card hover:shadow-drop-soft transition-shadow">
                {/* Mihrab arch accent */}
                <svg viewBox="0 0 100 16" preserveAspectRatio="none" className="block w-full h-[18px]" aria-hidden>
                  <path
                    d="M0,16 L0,9 C0,4 24,0.5 50,0.5 C76,0.5 100,4 100,9 L100,16"
                    fill="transparent"
                    stroke="#d4a24e"
                    strokeWidth="1"
                    strokeOpacity={prog.selesai ? '0.7' : '0.35'}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="-mt-px px-5 pb-5 pt-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                          Modul {modul.urutan}
                        </p>
                        <StatusBadge progress={prog} />
                      </div>
                      <h2 className="mt-1 font-display text-xl font-bold text-ink">
                        {modul.judul}
                      </h2>
                      <p className="mt-0.5 text-[13px] text-charcoal">{modul.subjudul}</p>
                    </div>
                    <IconChevron className="h-4 w-4 flex-none text-ash mt-1" />
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {[
                      { label: 'Kenali', done: prog.partADone },
                      { label: 'Urutkan', done: prog.partBDone },
                      { label: 'Uji Paham', done: prog.partCTotal > 0 },
                    ].map(({ label, done }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-primary' : 'bg-surface-bone border border-hairline'}`} />
                        <span className={`font-mono text-[9px] uppercase tracking-wider ${done ? 'text-primary/80' : 'text-ash'}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                    <span className="ml-auto font-mono text-[10px] text-mute">
                      {bagianDone}/3
                    </span>
                  </div>

                  {prog.selesai && prog.partCTotal > 0 && (
                    <p className="mt-2 font-mono text-[11px] text-primary/80">
                      Skor kuis: {prog.partCScore}/{prog.partCTotal} benar
                    </p>
                  )}

                  {!prevSelesai && (
                    <p className="mt-2 font-mono text-[10px] text-ash">
                      ↑ Selesaikan modul sebelumnya dulu
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="px-5 pb-8 text-center text-[11px] leading-relaxed text-ash">
        Manasik interaktif adalah pelengkap belajar — bukan pengganti panduan tata cara atau bimbingan ustaz.
      </p>
    </div>
  );
}
