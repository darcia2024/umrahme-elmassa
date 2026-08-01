import { urutanFase } from '../data/jamaah';
import type { Fase } from '../types';

export default function PhaseIndicator({ fase }: { fase: Fase }) {
  const idxAktif = urutanFase.findIndex((f) => f.id === fase);

  return (
    <div className="flex items-center gap-1.5">
      {urutanFase.map((f, i) => {
        const done = i < idxAktif;
        const active = i === idxAktif;
        return (
          <div key={f.id} className="flex flex-1 items-center gap-1.5">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-2.5 w-2.5 items-center justify-center rounded-full ${
                  active
                    ? 'bg-primary'
                    : done
                      ? 'bg-primary/40'
                      : 'bg-stone'
                }`}
              />
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                active ? 'text-ink font-semibold' : done ? 'text-mute' : 'text-stone'
              }`}
            >
              {f.label}
            </span>
            {i < urutanFase.length - 1 ? (
              <span
                className={`mx-1 h-px flex-1 ${i < idxAktif ? 'bg-primary/30' : 'bg-stone'}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
