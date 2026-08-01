import type { ChecklistItem, KategoriChecklist, KategoriChecklistMeta, KategoriJamaah } from '../types';

// =============================================================
// DATA CHECKLIST PERSIAPAN
// Timeline H-30 → H-1, dikelompokkan dalam 4 kategori.
// State centang disimpan di localStorage (key: umrahme.persiapan).
// Kategori "barang" mendukung Smart Packing: item bisa punya
// untukKategori[] untuk filter per profil jamaah.
// =============================================================

export const kategoriChecklist: KategoriChecklistMeta[] = [
  { id: 'dokumen', judul: 'Dokumen Perjalanan', deskripsi: 'Paspor, visa, dan berkas wajib' },
  { id: 'kesehatan', judul: 'Kesehatan', deskripsi: 'Vaksin & kesiapan fisik' },
  { id: 'barang', judul: 'Barang Bawaan', deskripsi: 'Ihram, obat, kabin & koper' },
  { id: 'mental', judul: 'Mental & Ibadah', deskripsi: 'Niat, ilmu manasik, doa safar' },
];

export const checklistItems: ChecklistItem[] = [
  // ----------------- DOKUMEN
  { id: 'dok-paspor', kategori: 'dokumen', judul: 'Paspor berlaku ≥ 7 bulan', catatan: 'Cek tanggal kedaluwarsa & halaman kosong', tenggat: 'H-30' },
  { id: 'dok-visa', kategori: 'dokumen', judul: 'Visa umrah terbit', catatan: 'Dari travel — pastikan nama sesuai paspor', tenggat: 'H-14' },
  { id: 'dok-tiket', kategori: 'dokumen', judul: 'Tiket pesawat & jadwal', catatan: 'Simpan salinan digital & cetak', tenggat: 'H-7' },
  { id: 'dok-foto', kategori: 'dokumen', judul: 'Pas foto latar putih', catatan: 'Beberapa lembar untuk cadangan', tenggat: 'H-30' },
  { id: 'dok-salinan', kategori: 'dokumen', judul: 'Salinan dokumen penting', catatan: 'Foto paspor & visa di ponsel + cetak', tenggat: 'H-3' },

  // ----------------- KESEHATAN
  { id: 'sehat-meningitis', kategori: 'kesehatan', judul: 'Vaksin meningitis (ICV)', catatan: 'Wajib — kartu kuning dibawa', tenggat: 'H-21' },
  { id: 'sehat-checkup', kategori: 'kesehatan', judul: 'Pemeriksaan kesehatan umum', catatan: 'Terutama jamaah lansia / berisiko', tenggat: 'H-21' },
  { id: 'sehat-obat', kategori: 'kesehatan', judul: 'Obat pribadi & resep', catatan: 'Bawa stok cukup + resep dokter', tenggat: 'H-7' },
  { id: 'sehat-fisik', kategori: 'kesehatan', judul: 'Latihan jalan kaki', catatan: 'Tawaf & sa\u2019i butuh stamina', tenggat: 'H-30' },

  // ----------------- BARANG — UNIVERSAL (tampil untuk semua)
  { id: 'brg-ihram', kategori: 'barang', judul: 'Kain/pakaian ihram cadangan', catatan: 'Siapkan minimal 1 set tambahan', tenggat: 'H-7' },
  { id: 'brg-sandal', kategori: 'barang', judul: 'Sandal jepit yang nyaman', catatan: 'Mudah dilepas-pasang di masjid' },
  { id: 'brg-tas-selempang', kategori: 'barang', judul: 'Tas kecil/selempang untuk ibadah', catatan: 'Tempat ponsel, doa, & dokumen saat tawaf/sa\u2019i' },
  { id: 'brg-power-bank', kategori: 'barang', judul: 'Power bank (min. 10.000 mAh)', catatan: 'Isi daya ponsel saat ibadah panjang' },
  { id: 'brg-adaptor', kategori: 'barang', judul: 'Adaptor steker Arab Saudi (tipe G)', catatan: 'Colokan Saudi berbeda dari Indonesia', tenggat: 'H-3' },
  { id: 'brg-uang', kategori: 'barang', judul: 'Uang Riyal & kartu', catatan: 'Tukar sebagian sebelum berangkat', tenggat: 'H-3' },
  { id: 'brg-kabin', kategori: 'barang', judul: 'Tas kabin: dokumen, obat, charger', catatan: 'Barang penting jangan di koper bagasi', tenggat: 'H-2' },
  { id: 'brg-koper', kategori: 'barang', judul: 'Koper bagasi: pakaian & perlengkapan', catatan: 'Timbang agar tak lebih bagasi', tenggat: 'H-2' },

  // ----------------- BARANG — KHUSUS LAKI-LAKI
  { id: 'brg-lk-ihram-set', kategori: 'barang', judul: 'Kain ihram 2 set lengkap (izar & rida\')', catatan: '2 lembar kain putih tanpa jahitan per set', tenggat: 'H-7', untukKategori: ['laki-laki'] },
  { id: 'brg-lk-ikat-pinggang', kategori: 'barang', judul: 'Ikat pinggang tanpa jahitan untuk ihram', catatan: 'Untuk menahan izar agar tidak melorot', untukKategori: ['laki-laki'] },
  { id: 'brg-lk-sabuk-kantong', kategori: 'barang', judul: 'Sabuk kantong/money belt ihram', catatan: 'Simpan uang & dokumen saat berihram', untukKategori: ['laki-laki'] },

  // ----------------- BARANG — KHUSUS PEREMPUAN
  { id: 'brg-pr-busana-ihram', kategori: 'barang', judul: 'Gamis/mukena ihram yang longgar', catatan: 'Tidak menutup wajah & telapak tangan saat ihram', tenggat: 'H-7', untukKategori: ['perempuan'] },
  { id: 'brg-pr-pembalut', kategori: 'barang', judul: 'Pembalut & perlengkapan menstruasi', catatan: 'Catatan: pastikan kondisi suci sebelum memulai ibadah', untukKategori: ['perempuan'] },
  { id: 'brg-pr-peniti', kategori: 'barang', judul: 'Peniti/jarum pentul untuk kerudung', catatan: 'Bawa cadangan cukup, mudah hilang', untukKategori: ['perempuan'] },
  { id: 'brg-pr-mandi', kategori: 'barang', judul: 'Perlengkapan mandi tambahan', catatan: 'Sabun lembut, sampo, pelembap kulit', untukKategori: ['perempuan'] },

  // ----------------- BARANG — KHUSUS LANSIA
  { id: 'brg-ls-obat-rutin', kategori: 'barang', judul: 'Obat-obatan rutin cukup + salinan resep', catatan: 'Hitung kebutuhan hingga pulang, lebihkan 5 hari', tenggat: 'H-7', untukKategori: ['lansia'] },
  { id: 'brg-ls-tongkat', kategori: 'barang', judul: 'Kursi roda lipat / tongkat bantu jalan', catatan: 'Jika diperlukan — bisa disewa di Makkah', untukKategori: ['lansia'] },
  { id: 'brg-ls-bantal-leher', kategori: 'barang', judul: 'Bantal leher untuk perjalanan panjang', catatan: 'Penerbangan 9+ jam, nyaman tidur di kursi', untukKategori: ['lansia'] },
  { id: 'brg-ls-kacamata', kategori: 'barang', judul: 'Kacamata baca cadangan', catatan: 'Untuk membaca doa & panduan di lokasi', untukKategori: ['lansia'] },
  { id: 'brg-ls-kontak-darurat', kategori: 'barang', judul: 'Catatan kontak darurat keluarga', catatan: 'Simpan di dompet & foto di ponsel — mudah diakses', untukKategori: ['lansia'] },

  // ----------------- MENTAL
  { id: 'mtl-niat', kategori: 'mental', judul: 'Luruskan niat ikhlas karena Allah', catatan: 'Ibadah, bukan wisata', tenggat: 'H-30' },
  { id: 'mtl-manasik', kategori: 'mental', judul: 'Ikuti bimbingan manasik', catatan: 'Pahami urutan: ihram \u2192 tawaf \u2192 sa\u2019i \u2192 tahallul', tenggat: 'H-14' },
  { id: 'mtl-halalbihalal', kategori: 'mental', judul: 'Mohon maaf & pamit keluarga', catatan: 'Bereskan urusan & hutang', tenggat: 'H-3' },
  { id: 'mtl-doa-safar', kategori: 'mental', judul: 'Hafalkan doa safar & talbiyah', catatan: 'Tersedia di menu Doa', tenggat: 'H-7' },
];

/**
 * Ambil item berdasarkan kategori, dengan filter profil opsional.
 * Hanya kategori 'barang' yang dipengaruhi oleh profil.
 * Jika profil kosong/undefined → tampilkan semua item (default safe).
 */
export function itemsByKategori(
  kategori: KategoriChecklist,
  profil?: KategoriJamaah[],
): ChecklistItem[] {
  const items = checklistItems.filter((i) => i.kategori === kategori);
  if (kategori !== 'barang' || !profil || profil.length === 0) return items;
  return items.filter(
    (i) => !i.untukKategori || i.untukKategori.some((k) => profil.includes(k)),
  );
}
