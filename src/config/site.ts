export const PUBLIC_BASE_URL: string =
  (import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined)?.replace(/\/$/, '')
  || 'https://umrahme.sbs';

export const PUBLIC_HOST: string = PUBLIC_BASE_URL.replace(/^https?:\/\//, '');

// Base URL sistem kantor El Massa Web (form pendataan jamaah). Sengaja tanpa
// fallback: kalau kosong, kartu pendataan hanya menampilkan pesan "hubungi admin".
export const ELMASSA_WEB_URL: string | null =
  (import.meta.env.VITE_ELMASSA_WEB_URL as string | undefined)?.trim().replace(/\/+$/, '')
  || null;

// Tenant yang dipakai halaman /login (login tanpa slug). Situs ini milik El Massa, jadi bawaannya
// 'elmassa'; ganti lewat VITE_DEFAULT_TENANT_SLUG untuk deployment travel lain.
export const DEFAULT_TENANT_SLUG: string =
  (import.meta.env.VITE_DEFAULT_TENANT_SLUG as string | undefined)?.trim().toLowerCase() || 'elmassa';

export function slugUrl(slug: string): string {
  return `${PUBLIC_BASE_URL}/t/${slug}`;
}
