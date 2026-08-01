import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof __SUPABASE_URL__ !== 'undefined' && __SUPABASE_URL__)
  ? __SUPABASE_URL__
  : (import.meta.env.VITE_SUPABASE_URL || 'https://dekeoqlowiozsjpsqdsl.supabase.co');

const supabaseAnonKey = (typeof __SUPABASE_ANON_KEY__ !== 'undefined' && __SUPABASE_ANON_KEY__)
  ? __SUPABASE_ANON_KEY__
  : (import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRla2VvcWxvd2lvenNqcHNxZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTA0MDAwMH0.placeholder');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPABASE_FUNCTIONS_URL = `${supabaseUrl}/functions/v1`;

// ── Types ──────────────────────────────────────────────────────

export interface SertifikatField {
  key: 'nama' | 'nomor' | 'tanggal' | 'nomor_sertifikat' | 'nama_travel' | 'judul' | 'subjudul' | 'keterangan';
  label: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  align: 'left' | 'center' | 'right';
  fontFamily: 'display' | 'sans' | 'mono' | 'arab';
  bold: boolean;
  visible: boolean;
}

export interface SertifikatLayout {
  fields: SertifikatField[];
}

export const DEFAULT_SERTIFIKAT_LAYOUT: SertifikatLayout = {
  fields: [
    { key: 'nama',             label: 'Nama Jamaah',    x: 50, y: 50, fontSize: 40, color: '#1a1a1a', align: 'center', fontFamily: 'display', bold: true,  visible: true  },
    { key: 'nomor',            label: 'Nomor Jamaah',   x: 50, y: 60, fontSize: 18, color: '#666666', align: 'center', fontFamily: 'mono',    bold: false, visible: true  },
    { key: 'tanggal',          label: 'Tanggal',        x: 30, y: 80, fontSize: 16, color: '#333333', align: 'center', fontFamily: 'sans',    bold: false, visible: false },
    { key: 'nomor_sertifikat', label: 'No. Sertifikat', x: 70, y: 80, fontSize: 16, color: '#333333', align: 'center', fontFamily: 'mono',    bold: false, visible: false },
    { key: 'nama_travel',      label: 'Nama Travel',    x: 50, y: 90, fontSize: 18, color: '#1a1a1a', align: 'center', fontFamily: 'display', bold: true,  visible: false },
    { key: 'judul',            label: 'Judul',          x: 50, y: 20, fontSize: 28, color: '#1a1a1a', align: 'center', fontFamily: 'display', bold: true,  visible: false },
    { key: 'subjudul',         label: 'Sub Judul',      x: 50, y: 30, fontSize: 16, color: '#666666', align: 'center', fontFamily: 'sans',    bold: false, visible: false },
    { key: 'keterangan',       label: 'Keterangan',     x: 50, y: 70, fontSize: 14, color: '#444444', align: 'center', fontFamily: 'sans',    bold: false, visible: false },
  ],
};

export type TenantRow = {
  id: string;
  activation_code: string;
  slug: string | null;
  nama_travel: string;
  primary_color: string;
  primary_deep_color: string;
  logo_url: string | null;
  page_title: string;
  tanggal_keberangkatan: string | null;
  tanggal_kepulangan: string | null;
  created_at: string;
  hotel_makkah: string | null;
  hotel_madinah: string | null;
  meeting_point: string | null;
  guide_name: string | null;
  guide_whatsapp: string | null;
  tour_leader_name: string | null;
  tour_leader_whatsapp: string | null;
  emergency_note: string | null;
  fase_override: 'persiapan' | 'tanah-suci' | 'selesai' | null;
  hero_image_url: string | null;
  hero_text_color: string | null;
  sertifikat_template_url: string | null;
  sertifikat_layout: SertifikatLayout | null;
};

export type KeberangkatanRow = {
  id: string;
  tenant_id: string;
  nama_batch: string;
  tanggal_keberangkatan: string | null;
  tanggal_kepulangan: string | null;
  hotel_makkah: string | null;
  hotel_madinah: string | null;
  meeting_point: string | null;
  guide_name: string | null;
  guide_whatsapp: string | null;
  tour_leader_name: string | null;
  tour_leader_whatsapp: string | null;
  emergency_note: string | null;
  fase_override: 'persiapan' | 'tanah-suci' | 'selesai' | null;
  aktif: boolean;
  created_at: string;
};

export type AgendaItemRow = {
  id: string;
  tenant_id: string;
  keberangkatan_id: string | null;
  tanggal: string;
  jam_mulai: string | null;
  judul: string;
  deskripsi: string | null;
  lokasi: string | null;
  urutan: number;
  created_at: string;
};

export type TravelAnnouncementRow = {
  id: string;
  tenant_id: string;
  keberangkatan_id: string | null;
  label: string;
  title: string;
  content: string;
  important: boolean;
  published_at: string;
};

export type JamaahAccountRow = {
  id: string;
  tenant_id: string;
  keberangkatan_id: string | null;
  nama: string;
  nomor_jamaah: string;
  rombongan: string | null;
  nomor_bus: string | null;
  nomor_kamar: string | null;
  nomor_paspor: string | null;
  fase: 'persiapan' | 'tanah-suci' | 'selesai';
  fase_override: 'persiapan' | 'tanah-suci' | 'selesai' | null;
  created_at: string;
};

export type TenantUserRow = {
  id: string;
  user_id: string;
  tenant_id: string;
  created_at: string;
};

// ── Tenants ───────────────────────────────────────────────────

export async function fetchTenants(): Promise<TenantRow[]> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as TenantRow[];
}

export async function fetchTenant(id: string): Promise<TenantRow> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data as TenantRow;
}

export async function createTenant(payload: Partial<TenantRow>): Promise<TenantRow> {
  const { data, error } = await supabase
    .from('tenants')
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as TenantRow;
}

export async function updateTenant(id: string, payload: Partial<TenantRow>): Promise<TenantRow> {
  const { data, error } = await supabase
    .from('tenants')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as TenantRow;
}

export async function deleteTenant(id: string): Promise<void> {
  await supabase.from('agenda_items').delete().eq('tenant_id', id);
  await supabase.from('travel_announcements').delete().eq('tenant_id', id);
  await supabase.from('jamaah_accounts').delete().eq('tenant_id', id);
  await supabase.from('tenant_users').delete().eq('tenant_id', id);
  const { error } = await supabase.from('tenants').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function fetchTenantBySlug(slug: string): Promise<TenantRow | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as TenantRow | null;
}

export async function checkActivationCode(code: string, excludeId?: string): Promise<{ taken: boolean }> {
  const { data, error } = await supabase
    .from('tenants')
    .select('id')
    .eq('activation_code', code);
  if (error) throw new Error(error.message);
  const taken = (data ?? []).some((r: { id: string }) => r.id !== excludeId);
  return { taken };
}

// ── Keberangkatan ─────────────────────────────────────────────

export async function fetchKeberangkatan(tenantId: string): Promise<KeberangkatanRow[]> {
  const { data, error } = await supabase
    .from('keberangkatan')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as KeberangkatanRow[];
}

export async function fetchKeberangkatanById(id: string): Promise<KeberangkatanRow | null> {
  const { data, error } = await supabase
    .from('keberangkatan')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as KeberangkatanRow | null;
}

export async function createKeberangkatan(tenantId: string, payload: Partial<KeberangkatanRow>): Promise<KeberangkatanRow> {
  const { data, error } = await supabase
    .from('keberangkatan')
    .insert({ tenant_id: tenantId, ...payload })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as KeberangkatanRow;
}

export async function updateKeberangkatan(id: string, payload: Partial<KeberangkatanRow>): Promise<KeberangkatanRow> {
  const { data, error } = await supabase
    .from('keberangkatan')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as KeberangkatanRow;
}

export async function deleteKeberangkatan(id: string): Promise<void> {
  const { error } = await supabase.from('keberangkatan').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ── Agenda ────────────────────────────────────────────────────

export async function fetchAgenda(keberangkatanId: string): Promise<AgendaItemRow[]> {
  const { data, error } = await supabase
    .from('agenda_items')
    .select('*')
    .eq('keberangkatan_id', keberangkatanId)
    .order('tanggal', { ascending: true })
    .order('jam_mulai', { ascending: true })
    .order('urutan', { ascending: true });
  if (error) throw new Error(error.message);
  return data as AgendaItemRow[];
}

export async function createAgenda(tenantId: string, keberangkatanId: string, payload: object): Promise<AgendaItemRow> {
  const { data, error } = await supabase
    .from('agenda_items')
    .insert({ ...payload, tenant_id: tenantId, keberangkatan_id: keberangkatanId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AgendaItemRow;
}

export async function bulkInsertAgenda(tenantId: string, keberangkatanId: string, items: object[]): Promise<{ inserted: number }> {
  const rows = items.map((item) => ({ ...item, tenant_id: tenantId, keberangkatan_id: keberangkatanId }));
  const { data, error } = await supabase.from('agenda_items').insert(rows).select();
  if (error) throw new Error(error.message);
  return { inserted: (data ?? []).length };
}

export async function deleteAgenda(tenantId: string, agendaId: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from('agenda_items')
    .delete()
    .eq('id', agendaId)
    .eq('tenant_id', tenantId);
  if (error) throw new Error(error.message);
  return { ok: true };
}

// ── Announcements ─────────────────────────────────────────────

export async function fetchAnnouncements(keberangkatanId: string): Promise<TravelAnnouncementRow[]> {
  const { data, error } = await supabase
    .from('travel_announcements')
    .select('*')
    .eq('keberangkatan_id', keberangkatanId)
    .order('published_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as TravelAnnouncementRow[];
}

export async function createAnnouncement(tenantId: string, keberangkatanId: string, payload: object): Promise<TravelAnnouncementRow> {
  const { data, error } = await supabase
    .from('travel_announcements')
    .insert({ ...payload, tenant_id: tenantId, keberangkatan_id: keberangkatanId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as TravelAnnouncementRow;
}

export async function deleteAnnouncement(tenantId: string, annId: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from('travel_announcements')
    .delete()
    .eq('id', annId)
    .eq('tenant_id', tenantId);
  if (error) throw new Error(error.message);
  return { ok: true };
}

// ── Jamaah ────────────────────────────────────────────────────

export async function fetchJamaah(keberangkatanId: string): Promise<JamaahAccountRow[]> {
  const { data, error } = await supabase
    .from('jamaah_accounts')
    .select('*')
    .eq('keberangkatan_id', keberangkatanId)
    .order('nama', { ascending: true });
  if (error) throw new Error(error.message);
  return data as JamaahAccountRow[];
}

export async function bulkInsertJamaah(tenantId: string, keberangkatanId: string, items: object[]): Promise<{ inserted: number }> {
  const rows = items.map((item) => ({ ...item, tenant_id: tenantId, keberangkatan_id: keberangkatanId }));
  const { data, error } = await supabase.from('jamaah_accounts').insert(rows).select();
  if (error) throw new Error(error.message);
  return { inserted: (data ?? []).length };
}

export async function createJamaah(tenantId: string, keberangkatanId: string | null, payload: object): Promise<JamaahAccountRow> {
  const { data, error } = await supabase
    .from('jamaah_accounts')
    .insert({ ...payload, tenant_id: tenantId, keberangkatan_id: keberangkatanId })
    .select()
    .single();
  if (error) {
    const msg = error.message;
    if (msg.includes('unique') || msg.includes('duplicate')) {
      throw new Error(`Nama sudah terdaftar di tenant ini.`);
    }
    throw new Error(msg);
  }
  return data as JamaahAccountRow;
}

export async function updateJamaah(tenantId: string, jamaahId: string, payload: object): Promise<JamaahAccountRow> {
  const { data, error } = await supabase
    .from('jamaah_accounts')
    .update(payload)
    .eq('id', jamaahId)
    .eq('tenant_id', tenantId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as JamaahAccountRow;
}

export async function deleteJamaah(tenantId: string, jamaahId: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from('jamaah_accounts')
    .delete()
    .eq('id', jamaahId)
    .eq('tenant_id', tenantId);
  if (error) throw new Error(error.message);
  return { ok: true };
}

// ── Travel Accounts ───────────────────────────────────────────

export async function fetchTravelAccounts(tenantId: string): Promise<TenantUserRow[]> {
  const { data, error } = await supabase
    .from('tenant_users')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as TenantUserRow[];
}

export async function createTravelAccount(
  tenantId: string,
  email: string,
  password: string,
): Promise<{ success: boolean; user_id: string; email: string }> {
  const { data, error } = await supabase.functions.invoke('create-travel-user', {
    body: { email, password, tenant_id: tenantId },
  });
  if (error) throw new Error(error.message ?? 'Gagal membuat akun travel.');
  if (data?.error) throw new Error(data.error);
  return data as { success: boolean; user_id: string; email: string };
}

export async function revokeTravelAccess(tenantId: string, mappingId: string): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from('tenant_users')
    .delete()
    .eq('id', mappingId)
    .eq('tenant_id', tenantId);
  if (error) throw new Error(error.message);
  return { ok: true };
}

// ── Logo Upload ───────────────────────────────────────────────

export async function uploadLogo(file: File): Promise<string> {
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const filename = `logos/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filename, file, { upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(data.path);
  return publicUrl;
}

// ── Sertifikat Template Upload ────────────────────────────────

export async function uploadSertifikatTemplate(file: File): Promise<string> {
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const filename = `sertifikat/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filename, file, { upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(data.path);
  return publicUrl;
}

// ── Jamaah Data (key-value sinkronisasi per-jamaah) ────────────

function getJamaahToken(): string | null {
  try {
    const raw = localStorage.getItem('umrahme.jamaah');
    if (!raw) return null;
    const j = JSON.parse(raw) as { accessToken?: string };
    return j?.accessToken ?? null;
  } catch {
    return null;
  }
}

export async function getJamaahData<T = unknown>(
  tenantId: string,
  nomorJamaah: string,
  key: string,
): Promise<T | null> {
  const token = getJamaahToken();
  if (!token) return null;
  const { data, error } = await supabase.rpc('jamaah_data_get', {
    p_tenant_id: tenantId,
    p_nomor_jamaah: nomorJamaah,
    p_token: token,
    p_key: key,
  });
  if (error) throw new Error(error.message);
  return (data as T) ?? null;
}

export async function setJamaahData(
  tenantId: string,
  nomorJamaah: string,
  key: string,
  value: unknown,
): Promise<void> {
  const token = getJamaahToken();
  if (!token) return;
  const { error } = await supabase.rpc('jamaah_data_set', {
    p_tenant_id: tenantId,
    p_nomor_jamaah: nomorJamaah,
    p_token: token,
    p_key: key,
    p_value: value,
  });
  if (error) throw new Error(error.message);
}

// ── Jurnal Entries ─────────────────────────────────────────────

export type JurnalRow = {
  id: string;
  tenant_id: string;
  nomor_jamaah: string;
  tanggal: string;
  judul: string | null;
  isi: string;
  lokasi: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchJurnal(tenantId: string, nomorJamaah: string): Promise<JurnalRow[]> {
  const token = getJamaahToken();
  if (!token) return [];
  const { data, error } = await supabase.rpc('jurnal_list', {
    p_tenant_id: tenantId,
    p_nomor_jamaah: nomorJamaah,
    p_token: token,
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as JurnalRow[];
}

export async function createJurnal(
  tenantId: string,
  nomorJamaah: string,
  payload: { tanggal: string; judul?: string | null; isi: string; lokasi?: string | null }
): Promise<JurnalRow> {
  const token = getJamaahToken();
  if (!token) throw new Error('Sesi tidak valid. Silakan login ulang.');
  const { data, error } = await supabase.rpc('jurnal_create', {
    p_tenant_id: tenantId,
    p_nomor_jamaah: nomorJamaah,
    p_token: token,
    p_tanggal: payload.tanggal,
    p_judul: payload.judul ?? null,
    p_isi: payload.isi,
    p_lokasi: payload.lokasi ?? null,
  });
  if (error) throw new Error(error.message);
  return data as JurnalRow;
}

export async function deleteJurnal(
  id: string,
  tenantId: string,
  nomorJamaah: string,
): Promise<void> {
  const token = getJamaahToken();
  if (!token) throw new Error('Sesi tidak valid. Silakan login ulang.');
  const { error } = await supabase.rpc('jurnal_delete', {
    p_id: id,
    p_tenant_id: tenantId,
    p_nomor_jamaah: nomorJamaah,
    p_token: token,
  });
  if (error) throw new Error(error.message);
}

// ── Hero Image Upload ──────────────────────────────────────────

export async function uploadHeroImage(file: File): Promise<string> {
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const filename = `hero/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filename, file, { upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(data.path);
  return publicUrl;
}
