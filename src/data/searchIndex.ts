import { semuaDoa } from './doa';
import { tataCaraSteps } from './tatacara';
import { ritualSteps } from './ritualSteps';
import { checklistItems } from './checklist';
import { daftarLokasi } from './lokasi';
import { manasikModulList } from './manasikInteraktif';
import { faqKategori } from './faqFikih';
import { daftarMiqat } from './miqat';
import { niatIhram, larganganIhram, jenisDam } from './ihram';
import { daftarIstilah } from './glosarium';

export type SearchItemType =
  | 'doa'
  | 'panduan'
  | 'lokasi'
  | 'checklist'
  | 'halaman'
  | 'manasik'
  | 'faq'
  | 'miqat'
  | 'dam'
  | 'istilah';

export interface SearchItem {
  id: string;
  type: SearchItemType;
  judul: string;
  sub?: string;
  to: string;
  keywords?: string;
}

// ── Label emoji per tipe ─────────────────────────────────────
export const TYPE_META: Record<SearchItemType, { label: string; emoji: string }> = {
  doa:       { label: 'Doa',        emoji: '🤲' },
  panduan:   { label: 'Panduan',    emoji: '📖' },
  lokasi:    { label: 'Lokasi',     emoji: '📍' },
  checklist: { label: 'Checklist',  emoji: '✅' },
  halaman:   { label: 'Halaman',    emoji: '🗂️'  },
  manasik:   { label: 'Manasik',    emoji: '🎓' },
  faq:       { label: 'Tanya Jawab',emoji: '❓' },
  miqat:     { label: 'Miqat',      emoji: '🕋' },
  dam:       { label: 'Dam',        emoji: '⚖️' },
  istilah:   { label: 'Istilah',    emoji: '📘' },
};

// ── Halaman statis ────────────────────────────────────────────
const halamanStatis: SearchItem[] = [
  { id: 'hal-beranda',        type: 'halaman', judul: 'Beranda',               sub: 'Dashboard utama jamaah',                      to: '/beranda' },
  { id: 'hal-doa',            type: 'halaman', judul: 'Panduan Doa',            sub: 'Semua doa umrah per kategori',                to: '/doa' },
  { id: 'hal-tata-cara',      type: 'halaman', judul: 'Tata Cara Umrah',        sub: 'Alur urutan ibadah umrah lengkap',             to: '/panduan/tata-cara' },
  { id: 'hal-ihram',          type: 'halaman', judul: 'Panduan Ihram',          sub: 'Niat, larangan, tata cara pakai ihram',        to: '/panduan/ihram' },
  { id: 'hal-tawaf',          type: 'halaman', judul: 'Counter Tawaf',          sub: 'Hitung putaran tawaf dengan panduan doa',      to: '/ibadah/tawaf' },
  { id: 'hal-sai',            type: 'halaman', judul: "Counter Sa'i",           sub: "Hitung lintasan sa'i Shafa–Marwah",           to: '/ibadah/sai' },
  { id: 'hal-tahallul',       type: 'halaman', judul: 'Panduan Tahallul',       sub: 'Doa dan tata cara tahallul',                   to: '/ibadah/tahallul' },
  { id: 'hal-jadwal-sholat',  type: 'halaman', judul: 'Jadwal Sholat',          sub: 'Waktu sholat di Makkah & Madinah',             to: '/ibadah/jadwal-sholat' },
  { id: 'hal-peta',           type: 'halaman', judul: 'Peta & Lokasi',          sub: 'Masjid dan tempat bersejarah',                 to: '/peta' },
  { id: 'hal-persiapan',      type: 'halaman', judul: 'Checklist Persiapan',    sub: 'Dokumen, barang, kesehatan sebelum berangkat', to: '/profil/persiapan' },
  { id: 'hal-kartu',          type: 'halaman', judul: 'Kartu Jamaah',           sub: 'Identitas digital jamaah & pembimbing',        to: '/profil/kartu' },
  { id: 'hal-jurnal',         type: 'halaman', judul: 'Jurnal Perjalanan',      sub: 'Catatan pribadi selama ibadah',                to: '/jurnal' },
  { id: 'hal-profil',         type: 'halaman', judul: 'Profil',                 sub: 'Data akun dan pengaturan',                     to: '/profil' },
  { id: 'hal-manasik',        type: 'halaman', judul: 'Manasik Interaktif',     sub: 'Simulasi & kuis ibadah umrah',                 to: '/manasik' },
  { id: 'hal-sertifikat',     type: 'halaman', judul: 'Sertifikat Digital',     sub: 'Sertifikat penyelesaian ibadah',               to: '/profil/sertifikat' },
  { id: 'hal-panduan',        type: 'halaman', judul: 'Panduan Lengkap',        sub: 'Semua panduan & referensi ibadah',             to: '/panduan' },
  { id: 'hal-ritual-nav',     type: 'halaman', judul: 'Navigator Ritual',       sub: 'Langkah demi langkah pelaksanaan umrah',       to: '/ibadah/ritual' },
  { id: 'hal-faq-fikih',      type: 'halaman', judul: 'Tanya Jawab Fikih',      sub: 'FAQ seputar ibadah umrah',                    to: '/panduan/faq-fikih' },
  { id: 'hal-miqat',          type: 'halaman', judul: 'Panduan Miqat',          sub: '5 titik miqat & aturan ihram',                to: '/panduan/miqat' },
  { id: 'hal-glosarium',      type: 'halaman', judul: 'Glosarium Istilah',      sub: 'Kamus istilah umrah: ihram, tahallul, raml',  to: '/panduan/glosarium' },
];

// ── Builder utama ─────────────────────────────────────────────
function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Halaman statis
  halamanStatis.forEach((h) =>
    items.push({ ...h, keywords: `${h.judul} ${h.sub ?? ''}`.toLowerCase() })
  );

  // Doa
  semuaDoa.forEach((d) =>
    items.push({
      id: `doa-${d.id}`,
      type: 'doa',
      judul: d.judul,
      sub: d.terjemahan?.slice(0, 70),
      to: `/doa/${d.id}`,
      keywords: `${d.judul} ${d.terjemahan ?? ''} ${d.latin ?? ''} ${d.waktu ?? ''}`.toLowerCase(),
    })
  );

  // Tata Cara
  tataCaraSteps.forEach((s) =>
    items.push({
      id: `tatacara-${s.nomor}`,
      type: 'panduan',
      judul: s.judul,
      sub: s.deskripsi.slice(0, 70),
      to: '/panduan/tata-cara',
      keywords: `${s.judul} ${s.deskripsi}`.toLowerCase(),
    })
  );

  // Ritual Navigator
  ritualSteps.forEach((r) =>
    items.push({
      id: `ritual-${r.id}`,
      type: 'panduan',
      judul: r.judul,
      sub: r.deskripsiSingkat.slice(0, 70),
      to: r.linkKeFitur ?? '/ibadah/ritual',
      keywords: `${r.judul} ${r.deskripsiSingkat} ${r.catatanPenting ?? ''}`.toLowerCase(),
    })
  );

  // Checklist
  checklistItems.forEach((c) =>
    items.push({
      id: `checklist-${c.id}`,
      type: 'checklist',
      judul: c.judul,
      sub: c.catatan,
      to: '/profil/persiapan',
      keywords: `${c.judul} ${c.catatan ?? ''}`.toLowerCase(),
    })
  );

  // Lokasi
  daftarLokasi.forEach((l) =>
    items.push({
      id: `lokasi-${l.id}`,
      type: 'lokasi',
      judul: l.nama,
      sub: `${l.kota} — ${l.ringkas?.slice(0, 55)}`,
      to: `/peta/${l.id}`,
      keywords: `${l.nama} ${l.kota} ${l.ringkas ?? ''}`.toLowerCase(),
    })
  );

  // Manasik Interaktif
  manasikModulList.forEach((m) =>
    items.push({
      id: `manasik-${m.id}`,
      type: 'manasik',
      judul: `Manasik: ${m.judul}`,
      sub: m.subjudul,
      to: `/panduan/manasik-interaktif/${m.id}`,
      keywords: `manasik ${m.judul} ${m.subjudul}`.toLowerCase(),
    })
  );

  // FAQ Fikih — index tiap pertanyaan, deep-link via hash ke item
  faqKategori.forEach((kat) =>
    kat.items.forEach((f) =>
      items.push({
        id: `faq-${f.id}`,
        type: 'faq',
        judul: f.tanya,
        sub: f.jawab.slice(0, 70),
        to: `/panduan/faq-fikih#${f.id}`,
        keywords: `${f.tanya} ${f.jawab} ${f.catatan ?? ''} ${kat.nama}`.toLowerCase(),
      })
    )
  );

  // Miqat — index tiap titik miqat
  daftarMiqat.forEach((m) =>
    items.push({
      id: `miqat-${m.id}`,
      type: 'miqat',
      judul: `Miqat: ${m.nama}`,
      sub: m.untuk?.slice(0, 70),
      to: `/panduan/miqat#${m.id}`,
      keywords: `miqat ${m.nama} ${m.namaArab ?? ''} ${m.namaLain ?? ''} ${m.untuk ?? ''} ${m.keterangan ?? ''}`.toLowerCase(),
    })
  );

  // Dam (denda pelanggaran ihram)
  jenisDam.forEach((d) =>
    items.push({
      id: `dam-${d.id}`,
      type: 'dam',
      judul: d.nama,
      sub: d.untukPelanggaran?.slice(0, 70),
      to: `/panduan/ihram#${d.id}`,
      keywords: `dam denda ${d.nama} ${d.untukPelanggaran} ${d.bentuk} ${d.catatan ?? ''}`.toLowerCase(),
    })
  );

  // Niat Ihram
  niatIhram.forEach((n) =>
    items.push({
      id: `niat-${n.id}`,
      type: 'panduan',
      judul: n.judul,
      sub: n.arti?.slice(0, 70),
      to: `/panduan/ihram#${n.id}`,
      keywords: `niat ihram ${n.judul} ${n.latin} ${n.arti}`.toLowerCase(),
    })
  );

  // Larangan Ihram
  larganganIhram.forEach((l) =>
    items.push({
      id: `larangan-${l.id}`,
      type: 'panduan',
      judul: `Larangan: ${l.judul}`,
      sub: l.keterangan?.slice(0, 70),
      to: `/panduan/ihram#${l.id}`,
      keywords: `larangan ihram ${l.judul} ${l.keterangan} ${l.gender}`.toLowerCase(),
    })
  );

  // Glosarium Istilah
  daftarIstilah.forEach((it) =>
    items.push({
      id: `istilah-${it.id}`,
      type: 'istilah',
      judul: it.istilah,
      sub: it.arti.slice(0, 70),
      to: `/panduan/glosarium#${it.id}`,
      keywords: `${it.istilah} ${it.arab ?? ''} ${it.arti}`.toLowerCase(),
    })
  );

  return items;
}

export const searchIndex: SearchItem[] = buildIndex();

// ── Fungsi pencarian (multi-kata, semua kata harus cocok) ────
export function searchAll(query: string, limit = 10): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const kata = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((item) => {
      const kw = item.keywords ?? '';
      const judul = item.judul.toLowerCase();
      const semuaCocok = kata.every((k) => judul.includes(k) || kw.includes(k));
      if (!semuaCocok) return null;
      let score = 0;
      if (judul.includes(q)) score = 3;
      else if (kata.some((k) => judul.includes(k))) score = 2;
      else score = 1;
      return { item, score };
    })
    .filter(Boolean) as { item: SearchItem; score: number }[];

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.item);
}
