-- =============================================================
-- Umrahme — Tabel jamaah_data (sinkronisasi data per-jamaah)
-- Satu tabel key-value untuk semua data per jamaah:
--   persiapan, persiapan.profil, manasik, counter.tawaf, counter.sai
-- Jalankan di Supabase SQL Editor
-- =============================================================

CREATE TABLE IF NOT EXISTS jamaah_data (
  id            TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  tenant_id     TEXT        NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  nomor_jamaah  TEXT        NOT NULL,
  data_key      TEXT        NOT NULL,
  data_value    JSONB       NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, nomor_jamaah, data_key)
);

CREATE INDEX IF NOT EXISTS idx_jamaah_data_owner
  ON jamaah_data(tenant_id, nomor_jamaah);

-- RLS
ALTER TABLE jamaah_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "jamaah_data_select_all" ON jamaah_data;
CREATE POLICY "jamaah_data_select_all"
  ON jamaah_data FOR SELECT USING (true);

DROP POLICY IF EXISTS "jamaah_data_all_anon" ON jamaah_data;
CREATE POLICY "jamaah_data_all_anon"
  ON jamaah_data FOR ALL USING (true) WITH CHECK (true);

-- =============================================================
-- SELESAI — refresh schema cache: Dashboard → API → "Reload schema"
-- =============================================================
