import { NavLink } from 'react-router-dom';
import { IconBeranda, IconPanduan, IconIbadah, IconDoa, IconProfil } from './icons';

const slots = [
  { to: '/beranda', label: 'Beranda', Icon: IconBeranda, center: false },
  { to: '/panduan', label: 'Panduan', Icon: IconPanduan, center: false },
  { to: '/ibadah',  label: 'Ibadah',  Icon: IconIbadah,  center: true  },
  { to: '/doa',     label: 'Doa',     Icon: IconDoa,     center: false },
  { to: '/profil',  label: 'Profil',  Icon: IconProfil,  center: false },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-app"
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
      aria-label="Navigasi utama"
    >
      <div
        className="mx-3 mb-3 flex items-end justify-around rounded-[24px] px-1 pt-3 pb-2.5"
        style={{
          background: 'rgba(255,255,255,0.94)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 -1px 0 rgba(255,255,255,0.7) inset, 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {slots.map(({ to, label, Icon, center }) =>
          center ? (
            <NavLink key={to} to={to} aria-label={label} className="flex flex-col items-center gap-1 pb-0.5">
              {({ isActive }) => (
                <>
                  <span
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all duration-200 active:scale-90"
                    style={{
                      marginTop: '-28px',
                      background: isActive
                        ? 'linear-gradient(145deg, var(--color-primary-deep) 0%, var(--color-primary) 100%)'
                        : 'linear-gradient(145deg, var(--color-primary) 0%, var(--color-primary-deep) 100%)',
                      boxShadow: '0 4px 16px color-mix(in srgb, var(--color-primary) 40%, transparent), 0 1px 4px rgba(0,0,0,0.16)',
                    }}
                  >
                    <Icon className="h-[20px] w-[20px] text-white" />
                  </span>
                  <span className={`text-[10px] font-semibold ${isActive ? 'text-primary' : 'text-ash'}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ) : (
            <NavLink key={to} to={to} aria-label={label} className="group flex flex-col items-center gap-1 px-3 pb-0.5">
              {({ isActive }) => (
                <>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all ${isActive ? 'bg-primary/10' : 'group-active:bg-surface-bone'}`}>
                    <Icon className={`h-[20px] w-[20px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-ash'}`} />
                  </span>
                  <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-primary' : 'text-ash'}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
}
