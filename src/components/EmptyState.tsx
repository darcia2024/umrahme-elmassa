import type { ReactNode } from 'react';

export default function EmptyState({
  icon,
  title,
  desc,
  action,
}: {
  icon?: ReactNode;
  title: string;
  desc: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      {icon ? (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-hairline bg-surface-card text-mute shadow-drop-card">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-[26ch] text-pretty text-sm leading-relaxed text-charcoal">
        {desc}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
