import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { IconBack } from './icons';

interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  backTo?: string;
  action?: ReactNode;
  sticky?: boolean;
}

export default function PageHeader({
  title,
  eyebrow,
  backTo,
  action,
  sticky = false,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={`border-b border-stone-200/60 bg-white pb-4 pt-2 ${
        sticky ? 'sticky top-0 z-20 backdrop-blur-md bg-white/95' : ''
      }`}
    >
      <div className="flex items-center gap-4 max-w-[1440px] mx-auto">
        <button
          type="button"
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
          aria-label="Kembali"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition active:scale-95 shadow-2xs"
        >
          <IconBack className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="truncate font-sans text-xs font-normal text-pink-600">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="truncate font-display text-2xl sm:text-3xl font-black tracking-tight text-stone-900 leading-tight">
            {title}
          </h1>
        </div>
        {action ? <div className="flex-none">{action}</div> : null}
      </div>
    </header>
  );
}
