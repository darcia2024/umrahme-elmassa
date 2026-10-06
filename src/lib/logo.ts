// Logo putih: berkas bernama "<logo>-putih.<ext>" di samping logo aslinya (konvensi). Kalau tidak ada,
// logo asli ditaruh di chip putih supaya aman untuk warna apa pun.
export function varianPutih(logo: string): string | null {
  const v = logo.replace(/(\.(?:png|webp|svg))(\?.*)?$/i, '-putih$1$2');
  return v !== logo ? v : null;
}
