import type { ReactNode } from 'react';

interface MihrabCardProps {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  variant?: 'light' | 'dark';
}

export default function MihrabCard({
  children,
  className = '',
  bodyClassName = 'px-5 pb-5 pt-1',
  variant = 'light',
}: MihrabCardProps) {
  const isDark = variant === 'dark';
  const fillColor = isDark ? '#202020' : '#ffffff';
  const strokeColor = isDark ? 'rgba(255,255,255,0.15)' : '#d4a24e';

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        className="block w-full h-[26px]"
        aria-hidden="true"
      >
        <path
          d="M0,22 L0,13 C0,5 24,0.6 50,0.6 C76,0.6 100,5 100,13 L100,22"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className={`-mt-px rounded-b-lg ${bodyClassName}`}
        style={{ backgroundColor: fillColor }}
      >
        {children}
      </div>
    </div>
  );
}
