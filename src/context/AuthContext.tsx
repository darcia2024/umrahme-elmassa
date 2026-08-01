// @refresh reset
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Fase, Jamaah } from '../types';
import type { TenantRow, KeberangkatanRow } from '../lib/supabase';
import { hitungFaseEfektif } from '../data/jamaah';

const STORAGE_KEY = 'umrahme.jamaah';
const TENANT_STORAGE_KEY = 'umrahme.tenant';
const KEBERANGKATAN_STORAGE_KEY = 'umrahme.keberangkatan';

const DEFAULT_PRIMARY = '#0ea5e9';
const DEFAULT_PRIMARY_DEEP = '#0284c7';

interface AuthValue {
  jamaah: Jamaah | null;
  tenant: TenantRow | null;
  keberangkatan: KeberangkatanRow | null;
  isLoggedIn: boolean;
  login: (j: Jamaah, t: TenantRow, kb: KeberangkatanRow | null) => void;
  logout: () => void;
  setFase: (f: Fase) => void;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

function bacaStorage(): Jamaah | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Jamaah) : null;
  } catch {
    return null;
  }
}

function bacaTenant(): TenantRow | null {
  try {
    const raw = localStorage.getItem(TENANT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TenantRow) : null;
  } catch {
    return null;
  }
}

function bacaKeberangkatan(): KeberangkatanRow | null {
  try {
    const raw = localStorage.getItem(KEBERANGKATAN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KeberangkatanRow) : null;
  } catch {
    return null;
  }
}

function applyTenantTheme(tenant: TenantRow | null) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', tenant?.primary_color ?? DEFAULT_PRIMARY);
  root.style.setProperty('--color-primary-deep', tenant?.primary_deep_color ?? DEFAULT_PRIMARY_DEEP);
  document.title = tenant?.page_title ?? 'Pendamping Umrah';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [jamaah, setJamaah] = useState<Jamaah | null>(() => {
    const saved = bacaStorage();
    const savedKeberangkatan = bacaKeberangkatan();
    if (saved && savedKeberangkatan) {
      return {
        ...saved,
        fase: hitungFaseEfektif(
          savedKeberangkatan.fase_override ?? null,
          savedKeberangkatan.tanggal_keberangkatan,
          savedKeberangkatan.tanggal_kepulangan,
        ),
      };
    }
    if (saved) {
      const savedTenant = bacaTenant();
      if (savedTenant) {
        return {
          ...saved,
          fase: hitungFaseEfektif(
            savedTenant.fase_override ?? null,
            savedTenant.tanggal_keberangkatan,
            savedTenant.tanggal_kepulangan,
          ),
        };
      }
    }
    return saved;
  });
  const [tenant, setTenant] = useState<TenantRow | null>(() => bacaTenant());
  const [keberangkatan, setKeberangkatan] = useState<KeberangkatanRow | null>(() => bacaKeberangkatan());

  useEffect(() => {
    applyTenantTheme(tenant);
  }, [tenant]);

  // 0-Second Live Sync 2-Arah Engine: Listener Update dari Admin El Massa Web
  useEffect(() => {
    import('../lib/syncBridge').then(({ listenForAdminJamaahUpdates }) => {
      const cleanup = listenForAdminJamaahUpdates((payload) => {
        setJamaah((current) => {
          if (!current) return current;
          // Match by name or jamaah number
          const matches =
            current.nomorJamaah === payload.nomorJamaah ||
            current.nama.toLowerCase() === payload.nama.toLowerCase();

          if (matches) {
            const updated: Jamaah = {
              ...current,
              nomorBus: payload.bus || current.nomorBus,
              nomorKamar: payload.kamar || current.nomorKamar,
              rombongan: payload.rombongan || current.rombongan,
            };
            return updated;
          }
          return current;
        });
      });
      return cleanup;
    });
  }, []);

  useEffect(() => {
    try {
      if (keberangkatan) localStorage.setItem(KEBERANGKATAN_STORAGE_KEY, JSON.stringify(keberangkatan));
      else localStorage.removeItem(KEBERANGKATAN_STORAGE_KEY);
    } catch { /* abaikan */ }
  }, [keberangkatan]);

  useEffect(() => {
    setJamaah((prev) => {
      if (!prev) return prev;
      const namaTravel = tenant?.nama_travel ?? prev.travel;
      if (prev.travel === namaTravel) return prev;
      return { ...prev, travel: namaTravel };
    });
  }, [tenant]);

  const value: AuthValue = {
    jamaah,
    tenant,
    keberangkatan,
    isLoggedIn: !!jamaah,
    login: (j, t, kb) => { setJamaah(j); setTenant(t); setKeberangkatan(kb); },
    logout: () => { setJamaah(null); setTenant(null); setKeberangkatan(null); },
    setFase: (f) => setJamaah((prev) => (prev ? { ...prev, fase: f } : prev)),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}
