// @refresh reset
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Fase, Jamaah } from '../types';
import { setJamaahToken, type TenantRow, type KeberangkatanRow } from '../lib/supabase';
import { hitungFaseEfektif, segarkanSesi } from '../data/jamaah';

const STORAGE_KEY = 'umrahme.jamaah';
// Id tenant cadangan (akun demo) di data/jamaah.ts; sesi demo tidak disegarkan dari database.
const DEMO_TENANT_ID = 'tenant-elmassa-01';
const TENANT_STORAGE_KEY = 'umrahme.tenant';
const KEBERANGKATAN_STORAGE_KEY = 'umrahme.keberangkatan';

// Jeda minimal antar-penyegaran data akun saat aplikasi dibuka kembali.
const JEDA_SEGARKAN_MS = 5 * 60 * 1000;

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

  // Sesi bertahan di perangkat sampai jamaah menekan Keluar: tidak ada masa berlaku. Yang disimpan
  // hanya data akun, tenant, dan batch; token pendataan (form data diri) sengaja tidak pernah disimpan.
  useEffect(() => {
    try {
      if (jamaah) localStorage.setItem(STORAGE_KEY, JSON.stringify(jamaah));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* penyimpanan penuh/dikunci: sesi tetap jalan selama tab terbuka */ }
  }, [jamaah]);

  useEffect(() => {
    try {
      if (tenant) localStorage.setItem(TENANT_STORAGE_KEY, JSON.stringify(tenant));
      else localStorage.removeItem(TENANT_STORAGE_KEY);
    } catch { /* abaikan */ }
  }, [tenant]);

  // Keluar di satu tab berlaku untuk semua tab.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue === null) {
        setJamaah(null);
        setTenant(null);
        setKeberangkatan(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Data akun disegarkan diam-diam saat aplikasi dibuka dan saat kembali ke layar (paling sering
  // sekali per 5 menit). Hanya akun asli dari database yang disegarkan, bukan akun demo.
  // Kalau gagal atau akunnya tidak ditemukan, sesi dibiarkan apa adanya.
  const akunRef = useRef<{ jamaah: Jamaah | null; tenant: TenantRow | null }>({ jamaah, tenant });
  akunRef.current = { jamaah, tenant };
  const terakhirSegar = useRef(0);

  useEffect(() => {
    const segarkan = () => {
      const { jamaah: j, tenant: t } = akunRef.current;
      if (!j || !t || t.id === DEMO_TENANT_ID) return;
      if (Date.now() - terakhirSegar.current < JEDA_SEGARKAN_MS) return;
      terakhirSegar.current = Date.now();
      segarkanSesi(j.kodeAktivasi, j.nama).then((hasil) => {
        if (!hasil?.ok || !hasil.jamaah || !hasil.tenant) return;
        const baru = hasil.jamaah;
        setJamaah((prev) => (prev ? { ...baru, accessToken: baru.accessToken ?? prev.accessToken } : prev));
        setTenant(hasil.tenant);
        setKeberangkatan(hasil.keberangkatan ?? null);
      });
    };
    segarkan();
    const onVisible = () => { if (document.visibilityState === 'visible') segarkan(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  // Token akses jurnal/data jamaah: dipegang di memori saja, mengikuti sesi login.
  useEffect(() => {
    setJamaahToken(jamaah?.accessToken ?? null);
  }, [jamaah?.accessToken]);

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
