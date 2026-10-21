/**
 * Format nama jamaah agar tidak kapital semua (Title Case / Normal).
 * Contoh: "ASPA LISTINA" -> "Aspa Listina"
 */
export function formatNamaNormal(nama?: string | null): string {
  if (!nama) return '';
  return nama
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Cek apakah teks rombongan merupakan placeholder generik seperti "Rombongan 01".
 */
export function isGenericRombongan(val?: string | null): boolean {
  if (!val) return true;
  const s = val.trim().toLowerCase();
  return (
    s === '' ||
    s === '-' ||
    s === 'paket umrah' ||
    s === 'rombongan' ||
    s.startsWith('rombongan 01') ||
    s.startsWith('rombongan 1') ||
    s.startsWith('rombongan 02') ||
    s.startsWith('rombongan 2')
  );
}
