export const PUBLIC_BASE_URL: string =
  (import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined)?.replace(/\/$/, '')
  || 'https://umrahme.sbs';

export const PUBLIC_HOST: string = PUBLIC_BASE_URL.replace(/^https?:\/\//, '');

// Base URL sistem kantor El Massa Web (form pendataan jamaah). Sengaja tanpa
// fallback: kalau kosong, kartu pendataan hanya menampilkan pesan "hubungi admin".
export const ELMASSA_WEB_URL: string | null =
  (import.meta.env.VITE_ELMASSA_WEB_URL as string | undefined)?.trim().replace(/\/+$/, '')
  || null;

export function slugUrl(slug: string): string {
  return `${PUBLIC_BASE_URL}/t/${slug}`;
}
