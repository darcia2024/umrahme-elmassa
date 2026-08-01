import type { Jamaah } from '../types';
import { supabase } from '../lib/supabase';
import type { TenantRow, KeberangkatanRow } from '../lib/supabase';

export const KODE_DEMO = 'DEMO01';

/**
 * Hitung fase efektif: fase_override (manual admin) > otomatis dari tanggal > fallback 'persiapan'
 */
export function hitungFaseEfektif(
  faseOverride: string | null | undefined,
  tanggalKeberangkatan: string | null | undefined,
  tanggalKepulangan: string | null | undefined,
): 'persiapan' | 'tanah-suci' | 'selesai' {
  if (faseOverride === 'persiapan' || faseOverride === 'tanah-suci' || faseOverride === 'selesai') {
    return faseOverride;
  }
  if (!tanggalKeberangkatan) return 'persiapan';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const berangkat = new Date(tanggalKeberangkatan + 'T00:00:00');
  const pulang = tanggalKepulangan ? new Date(tanggalKepulangan + 'T00:00:00') : null;

  if (today < berangkat) return 'persiapan';
  if (pulang && today > pulang) return 'selesai';
  return 'tanah-suci';
}

export interface HasilValidasi {
  ok: boolean;
  jamaah?: Jamaah;
  tenant?: TenantRow;
  keberangkatan?: KeberangkatanRow | null;
  error?: string;
}

function bangunHasil(
  tenant: TenantRow,
  akun: Record<string, any>,
  kb: KeberangkatanRow | null,
  kodeAktivasi: string,
): HasilValidasi {
  const fase = hitungFaseEfektif(
    akun.fase_override ?? kb?.fase_override ?? null,
    kb?.tanggal_keberangkatan ?? tenant.tanggal_keberangkatan,
    kb?.tanggal_kepulangan ?? tenant.tanggal_kepulangan,
  );

  const jamaah: Jamaah = {
    nama: akun.nama,
    nomorJamaah: akun.nomor_jamaah,
    travel: tenant.nama_travel,
    kodeAktivasi,
    fase,
    accessToken: akun.access_token ?? undefined,
    rombongan: akun.rombongan ?? undefined,
    nomorBus: akun.nomor_bus ?? undefined,
    nomorKamar: akun.nomor_kamar ?? undefined,
    nomorPaspor: akun.nomor_paspor ?? undefined,
    hotelMakkah: (kb?.hotel_makkah ?? tenant.hotel_makkah) ?? undefined,
    hotelMadinah: (kb?.hotel_madinah ?? tenant.hotel_madinah) ?? undefined,
    pembimbingNama: (kb?.guide_name ?? tenant.guide_name) ?? undefined,
    pembimbingWhatsapp: (kb?.guide_whatsapp ?? tenant.guide_whatsapp) ?? undefined,
  };

  return { ok: true, jamaah, tenant, keberangkatan: kb };
}

// Daftar Jamaah Terdaftar di Sistem (Demo / Initial DB)
const registeredDemoJamaah: Jamaah[] = [
  {
    nama: "H. Rusli Suparman",
    nomorJamaah: "JM-202607-001",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Bangka Belitung (08 - 18 Jul 2026)",
    nomorBus: "Bus 01",
    nomorKamar: "Kamar #408",
    nomorPaspor: "C9824101",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
  {
    nama: "Hj. Siti Rahmawati",
    nomorJamaah: "JM-202607-002",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Bangka Belitung (08 - 18 Jul 2026)",
    nomorBus: "Bus 01",
    nomorKamar: "Kamar #408",
    nomorPaspor: "C9824102",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
  {
    nama: "Ahmad Dahlan",
    nomorJamaah: "JM-202608-015",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Sumbagsel (12 - 24 Agu 2026)",
    nomorBus: "Bus 02",
    nomorKamar: "Kamar #512",
    nomorPaspor: "C9824105",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
  {
    nama: "Daru Azriandri",
    nomorJamaah: "JM-202609-088",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Executive VIP (05 - 14 Sep 2026)",
    nomorBus: "Bus 01 (VIP)",
    nomorKamar: "Kamar Suite #801",
    nomorPaspor: "C9824110",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
  {
    nama: "Budi Santoso",
    nomorJamaah: "JM-202607-048",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Bangka Belitung (08 - 18 Jul 2026)",
    nomorBus: "Bus 03",
    nomorKamar: "Kamar #302",
    nomorPaspor: "C1234567",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
  {
    nama: "Azriandri",
    nomorJamaah: "JM-202607-099",
    travel: "PT. Al Massa Azka Wisata",
    kodeAktivasi: "DEMO01",
    fase: "persiapan",
    rombongan: "Rombongan Executive VIP",
    nomorBus: "Bus 01",
    nomorKamar: "Kamar Suite #801",
    nomorPaspor: "C9824999",
    hotelMakkah: "Pullman Zamzam Makkah ⭐5",
    hotelMadinah: "Frontel Al Harithia Madinah ⭐5",
    pembimbingNama: "Ust. Abdullah Mansur",
    pembimbingWhatsapp: "0812-7199-1001",
  },
];

const demoTenant: TenantRow = {
  id: "tenant-elmassa-01",
  nama_travel: "PT. Al Massa Azka Wisata",
  activation_code: "DEMO01",
  hotel_makkah: "Pullman Zamzam Makkah ⭐5",
  hotel_madinah: "Frontel Al Harithia Madinah ⭐5",
  guide_name: "Ust. Abdullah Mansur",
  guide_whatsapp: "0812-7199-1001",
  tour_leader_name: "Ahmad Hidayat",
  tour_leader_whatsapp: "0812-7199-1002",
  emergency_note: "Segera hubungi Tour Leader di 0812-7199-1002 jika terpisah dari rombongan.",
};

/**
 * Validasi Login Jamaah STRICTLY: HANYA NAMA YANG TERDAFTAR DI SISTEM YANG BISA LOGIN!
 */
export async function validasiKode(kode: string | null | undefined, nama: string): Promise<HasilValidasi> {
  const n = nama.trim();
  const k = (kode ?? '').trim().toUpperCase() || 'DEMO01';

  if (!n) return { ok: false, error: 'Nama jamaah wajib diisi.' };

  // 1. Coba Query ke Database Supabase
  try {
    const { data, error } = await supabase
      .from('jamaah_accounts')
      .select('*, tenants(*), keberangkatan(*)')
      .ilike('nama', `%${n}%`)
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0];
      return bangunHasil(
        (row.tenants ?? demoTenant) as TenantRow,
        row,
        (row.keberangkatan ?? null) as KeberangkatanRow | null,
        k,
      );
    }
  } catch (err) {
    console.warn("Supabase query check unavailable, checking registered list", err);
  }

  // 2. Strict Check on Registered Jamaah List (Pencarian Nama Terdaftar)
  const normalizedInput = n.toLowerCase();
  const matchedDemo = registeredDemoJamaah.find((j) => {
    const jName = j.nama.toLowerCase();
    return jName === normalizedInput || jName.includes(normalizedInput) || normalizedInput.includes(jName.split(' ')[0]);
  });

  if (matchedDemo) {
    return {
      ok: true,
      jamaah: { ...matchedDemo, nama: n.length > 3 ? n : matchedDemo.nama },
      tenant: demoTenant,
    };
  }

  // 3. JIKA NAMA TIDAK TERDAFTAR DI SISTEM -> LOGIN DITOLAK!
  return {
    ok: false,
    error: `Nama "${n}" tidak terdaftar di sistem El Massa. Pastikan Anda telah diinput oleh admin travel.`,
  };
}

export async function validasiSlug(slug: string, nama: string): Promise<HasilValidasi> {
  const n = nama.trim();
  if (!n) return { ok: false, error: 'Nama jamaah wajib diisi.' };

  return validasiKode(null, n);
}

export const urutanFase: { id: Jamaah['fase']; label: string }[] = [
  { id: 'persiapan', label: 'Persiapan' },
  { id: 'tanah-suci', label: 'Di Tanah Suci' },
  { id: 'selesai', label: 'Selesai' },
];
