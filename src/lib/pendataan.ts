// =============================================================
// Pendataan Jamaah: jembatan ke El Massa Web.
//
// Data master jamaah (jamaah_profiles / jamaah_documents) hanya
// dikelola El Massa Web. UmrahMe cuma memegang token pendataan
// (diambil lewat RPC, disimpan di memori saja) lalu membuka form
// atau membaca status kelengkapan lewat API El Massa Web.
//
// Token adalah kunci untuk mengisi data jamaah: jangan disimpan
// ke localStorage, jangan ditampilkan, dan jangan di-log.
// =============================================================

import { supabase } from './supabase';
import { ELMASSA_WEB_URL } from '../config/site';

export interface KelengkapanPendataan {
  /** Salah satu dari: Data Belum Lengkap, Dokumen Belum Lengkap, Siap Diproses, Siap Masuk Manifest. */
  status: string;
  missingFields: string[];
  missingDocs: string[];
  warnings: string[];
}

/** Berkas yang sudah masuk. Jalur publik hanya mengabarkan jenis & tanggalnya, isinya tidak bisa diunduh. */
export interface DokumenTerupload {
  docType: string;
  docSubtype: string;
  uploadedAt: string;
}

export type HasilStatusPendataan =
  | { ok: true; kelengkapan: KelengkapanPendataan; dokumen: DokumenTerupload[] }
  /** link-diganti: 404, token sudah diganti kantor. server: 5xx / jaringan / CORS. lain: status lain. */
  | { ok: false; alasan: 'link-diganti' | 'server' | 'lain' };

/**
 * Ambil token pendataan dengan nama + kode aktivasi yang sama seperti saat login
 * (pencocokannya identik dengan jamaah_login). Null kalau akun belum ditautkan
 * ke profil oleh kantor. Melempar error kalau RPC-nya gagal.
 */
export async function ambilTokenPendataan(nama: string, kodeAktivasi: string | undefined): Promise<string | null> {
  const { data, error } = await supabase.rpc('jamaah_pendataan_token', {
    p_kode: kodeAktivasi ?? '',
    p_nama: nama,
  });
  if (error) throw new Error('RPC jamaah_pendataan_token gagal');
  return typeof data === 'string' && data.length > 0 ? data : null;
}

/** URL form pendataan di El Massa Web, atau null kalau base URL belum di-set. */
export function urlFormPendataan(token: string): string | null {
  if (!ELMASSA_WEB_URL) return null;
  return `${ELMASSA_WEB_URL}/pendataan/${encodeURIComponent(token)}`;
}

function daftarTeks(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function daftarDokumen(v: unknown): DokumenTerupload[] {
  if (!Array.isArray(v)) return [];
  return v.flatMap((d) => {
    const x = d as Record<string, unknown>;
    if (typeof x?.docType !== 'string') return [];
    return [{
      docType: x.docType,
      docSubtype: typeof x.docSubtype === 'string' ? x.docSubtype : '',
      uploadedAt: typeof x.uploadedAt === 'string' ? x.uploadedAt : '',
    }];
  });
}

/**
 * Baca status kelengkapan dari El Massa Web. `completeness` dipakai apa adanya:
 * aturan kelengkapan hanya ada di El Massa Web, jangan dihitung ulang di sini.
 */
export async function ambilStatusPendataan(token: string, signal?: AbortSignal): Promise<HasilStatusPendataan> {
  if (!ELMASSA_WEB_URL) return { ok: false, alasan: 'lain' };

  let res: Response;
  try {
    res = await fetch(`${ELMASSA_WEB_URL}/api/pendataan/${encodeURIComponent(token)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      credentials: 'omit',
      signal,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    // Error jaringan dan error CORS sama-sama berakhir di sini (TypeError).
    return { ok: false, alasan: 'server' };
  }

  if (res.status === 404) return { ok: false, alasan: 'link-diganti' };
  if (res.status >= 500) return { ok: false, alasan: 'server' };
  if (!res.ok) return { ok: false, alasan: 'lain' };

  try {
    const body = (await res.json()) as { data?: { completeness?: Record<string, unknown>; documents?: unknown } };
    const c = body?.data?.completeness;
    if (!c || typeof c.status !== 'string') return { ok: false, alasan: 'lain' };
    return {
      ok: true,
      kelengkapan: {
        status: c.status,
        missingFields: daftarTeks(c.missingFields),
        missingDocs: daftarTeks(c.missingDocs),
        warnings: daftarTeks(c.warnings),
      },
      dokumen: daftarDokumen(body.data?.documents),
    };
  } catch {
    return { ok: false, alasan: 'lain' };
  }
}
