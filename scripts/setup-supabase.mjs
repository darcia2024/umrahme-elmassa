import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus diset.');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// ── 1. Buat tabel tenants via INSERT + upsert approach
// Karena tidak ada exec_sql RPC, kita cek apakah tabel sudah ada
// dengan mencoba SELECT, lalu create via REST schema API

const { error: checkErr } = await supabase.from('tenants').select('id').limit(1);

if (checkErr && checkErr.code === '42P01') {
  console.log('Tabel belum ada — perlu dibuat via Supabase Dashboard SQL Editor.');
  console.log('Jalankan SQL berikut di Supabase Dashboard → SQL Editor:\n');
  console.log(`
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activation_code text NOT NULL UNIQUE,
  nama_travel text NOT NULL,
  primary_color text NOT NULL DEFAULT '#0ea5e9',
  primary_deep_color text NOT NULL DEFAULT '#0284c7',
  logo_url text,
  page_title text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_public_select" ON public.tenants
  FOR SELECT USING (true);

CREATE POLICY "allow_admin_insert" ON public.tenants
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "allow_admin_update" ON public.tenants
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "allow_admin_delete" ON public.tenants
  FOR DELETE TO authenticated USING (true);

-- Storage bucket (jalankan di Storage settings atau via SQL):
INSERT INTO storage.buckets (id, name, public)
VALUES ('tenant-logos', 'tenant-logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'tenant-logos');

CREATE POLICY "admin_upload_logos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'tenant-logos');

-- Seed data:
INSERT INTO public.tenants (activation_code, nama_travel, primary_color, primary_deep_color, logo_url, page_title) VALUES
  ('DEMO01', 'Travel Demo', '#0ea5e9', '#0284c7', NULL, 'Pendamping Umrah — Demo'),
  ('BARAKAH1', 'Barakah Mulia Wisata', '#0ea5e9', '#0284c7', NULL, 'Barakah Mulia Wisata — Pendamping Umrah Anda'),
  ('HIJAU001', 'Zamzam Barokah Travel', '#059669', '#047857', NULL, 'Zamzam Barokah Travel — Pendamping Umrah Anda')
ON CONFLICT (activation_code) DO NOTHING;
  `);
  process.exit(1);
} else if (checkErr) {
  console.error('Error lain:', checkErr.message);
  process.exit(1);
} else {
  console.log('Tabel tenants sudah ada!');

  // Seed data jika belum ada
  const seeds = [
    { activation_code: 'DEMO01', nama_travel: 'Travel Demo', primary_color: '#0ea5e9', primary_deep_color: '#0284c7', logo_url: null, page_title: 'Pendamping Umrah — Demo' },
    { activation_code: 'BARAKAH1', nama_travel: 'Barakah Mulia Wisata', primary_color: '#0ea5e9', primary_deep_color: '#0284c7', logo_url: null, page_title: 'Barakah Mulia Wisata — Pendamping Umrah Anda' },
    { activation_code: 'HIJAU001', nama_travel: 'Zamzam Barokah Travel', primary_color: '#059669', primary_deep_color: '#047857', logo_url: null, page_title: 'Zamzam Barokah Travel — Pendamping Umrah Anda' },
  ];

  for (const seed of seeds) {
    const { error: insErr } = await supabase.from('tenants').upsert(seed, { onConflict: 'activation_code', ignoreDuplicates: true });
    if (insErr) console.warn(`Seed ${seed.activation_code}:`, insErr.message);
    else console.log(`Seed ${seed.activation_code} OK`);
  }
  console.log('\nSetup selesai!');
}
