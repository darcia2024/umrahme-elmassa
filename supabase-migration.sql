-- ============================================================
-- Migration: tambah kolom operasional ke tabel tenants
--            + buat tabel travel_announcements
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Kolom operasional di tabel tenants
ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS hotel_makkah          TEXT,
  ADD COLUMN IF NOT EXISTS hotel_madinah         TEXT,
  ADD COLUMN IF NOT EXISTS meeting_point         TEXT,
  ADD COLUMN IF NOT EXISTS guide_name            TEXT,
  ADD COLUMN IF NOT EXISTS guide_whatsapp        TEXT,
  ADD COLUMN IF NOT EXISTS tour_leader_name      TEXT,
  ADD COLUMN IF NOT EXISTS tour_leader_whatsapp  TEXT,
  ADD COLUMN IF NOT EXISTS emergency_note        TEXT;

-- 2. Tabel pengumuman travel
CREATE TABLE IF NOT EXISTS travel_announcements (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  label        TEXT NOT NULL DEFAULT 'Info',
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  important    BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS travel_announcements_tenant_id_idx
  ON travel_announcements (tenant_id, published_at DESC);

-- 3. RLS untuk travel_announcements
ALTER TABLE travel_announcements ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "travel_announcements_select"
    ON travel_announcements FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- Migration Fase 1: Sistem Akun Jamaah Per-Individu
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- 4. Tabel akun jamaah per-tenant
CREATE TABLE IF NOT EXISTS jamaah_accounts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nama          TEXT NOT NULL,
  nomor_jamaah  TEXT NOT NULL,
  rombongan     TEXT,
  nomor_bus     TEXT,
  nomor_kamar   TEXT,
  fase          TEXT NOT NULL DEFAULT 'persiapan'
                  CHECK (fase IN ('persiapan', 'tanah-suci', 'selesai')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tenant_id, nama)
);

CREATE INDEX IF NOT EXISTS idx_jamaah_accounts_tenant
  ON jamaah_accounts (tenant_id);

CREATE INDEX IF NOT EXISTS idx_jamaah_accounts_lookup
  ON jamaah_accounts (tenant_id, nama);

-- 5. RLS untuk jamaah_accounts
ALTER TABLE jamaah_accounts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "jamaah_accounts_select"
    ON jamaah_accounts FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "jamaah_accounts_insert"
    ON jamaah_accounts FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "jamaah_accounts_update"
    ON jamaah_accounts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "jamaah_accounts_delete"
    ON jamaah_accounts FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- Seed data demo — ganti <UUID_TENANT_DEMO01> dengan UUID nyata
-- Cari UUID dengan: SELECT id FROM tenants WHERE activation_code = 'DEMO01';
-- ============================================================

-- INSERT INTO jamaah_accounts (tenant_id, nama, nomor_jamaah, rombongan, nomor_bus, nomor_kamar, fase)
-- VALUES
--   ('<UUID_TENANT_DEMO01>', 'Daru Hardinsyah',  'UMR-2026-0001', 'Rombongan A', 'Bus 3', '804', 'persiapan'),
--   ('<UUID_TENANT_DEMO01>', 'Ahmad Fauzi',      'UMR-2026-0002', 'Rombongan A', 'Bus 3', '805', 'persiapan'),
--   ('<UUID_TENANT_DEMO01>', 'Siti Rahmah',      'UMR-2026-0003', 'Rombongan B', 'Bus 4', '901', 'persiapan');
