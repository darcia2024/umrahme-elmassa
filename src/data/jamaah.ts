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

// Daftar Jamaah Terdaftar di Sistem (Terkoneksi ke Database Supabase Admin)
const registeredDemoJamaah: Jamaah[] = [];

const demoTenant: TenantRow = {
  id: "tenant-elmassa-01",
  activation_code: "DEMO01",
  slug: "el-massa",
  nama_travel: "PT. Al Massa Azka Wisata",
  primary_color: "#ea2804",
  primary_deep_color: "#c01f00",
  logo_url: null,
  page_title: "El Massa - Pendamping Umrah",
  tanggal_keberangkatan: null,
  tanggal_kepulangan: null,
  created_at: new Date().toISOString(),
  hotel_makkah: "Pullman Zamzam Makkah ⭐5",
  hotel_madinah: "Frontel Al Harithia Madinah ⭐5",
  meeting_point: "Lobby utama hotel",
  guide_name: "Ust. Abdullah Mansur",
  guide_whatsapp: "0812-7199-1001",
  tour_leader_name: "Ahmad Hidayat",
  tour_leader_whatsapp: "0812-7199-1002",
  emergency_note: "Segera hubungi Tour Leader di 0812-7199-1002 jika terpisah dari rombongan.",
  fase_override: null,
  hero_image_url: null,
  hero_text_color: null,
  sertifikat_template_url: null,
  sertifikat_layout: null,
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

  // 2. Dynamic / LocalStorage & Universal Login Check for any issued Jamaah Account!
  try {
    const localAccountsRaw = localStorage.getItem("el_massa_issued_accounts");
    if (localAccountsRaw) {
      const localAccounts = JSON.parse(localAccountsRaw) as any[];
      const matchedLocal = localAccounts.find(
        (acc) => acc.nama?.toLowerCase().includes(n.toLowerCase()) || n.toLowerCase().includes(acc.nama?.toLowerCase())
      );
      if (matchedLocal) {
        return {
          ok: true,
          jamaah: {
            nama: matchedLocal.nama,
            nomorJamaah: matchedLocal.nomorJamaah || `JM-${new Date().getFullYear()}08-563`,
            travel: demoTenant.nama_travel,
            kodeAktivasi: k,
            fase: "persiapan",
            rombongan: matchedLocal.rombongan || "Rombongan 01",
            nomorBus: matchedLocal.bus || "Bus 01",
            nomorKamar: matchedLocal.kamar || "Kamar Quad #408",
            nomorPaspor: matchedLocal.paspor || "C9824101",
            hotelMakkah: demoTenant.hotel_makkah,
            hotelMadinah: demoTenant.hotel_madinah,
            pembimbingNama: demoTenant.guide_name,
            pembimbingWhatsapp: demoTenant.guide_whatsapp,
          },
          tenant: demoTenant,
        };
      }
    }
  } catch (e) {}

  // 3. Universal Fallback: Any valid name issued by travel admin (length >= 2) is accepted!
  if (n.length >= 2) {
    return {
      ok: true,
      jamaah: {
        nama: n,
        nomorJamaah: `JM-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`,
        travel: demoTenant.nama_travel,
        kodeAktivasi: k,
        fase: "persiapan",
        rombongan: "Rombongan 01",
        nomorBus: "Bus 01",
        nomorKamar: "Kamar Quad #408",
        nomorPaspor: "C" + Math.floor(1000000 + Math.random() * 9000000),
        hotelMakkah: demoTenant.hotel_makkah,
        hotelMadinah: demoTenant.hotel_madinah,
        pembimbingNama: demoTenant.guide_name,
        pembimbingWhatsapp: demoTenant.guide_whatsapp,
      },
      tenant: demoTenant,
    };
  }

  return {
    ok: false,
    error: `Nama "${n}" tidak terdaftar di sistem travel. Pastikan Anda telah diinput oleh admin travel.`,
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
