// Pola geometris Islam untuk banner: bintang bersudut delapan (dua persegi disilangkan
// 45 derajat) yang disusun berselang-seling. Garis tipis putih; transparansi dan
// pemudarannya diatur di tempat pemakaian supaya tetap jadi aksen, bukan latar ramai.

const UKURAN = 64;

function bintang(cx: number, cy: number): string {
  const sisi = 28;
  const x = cx - sisi / 2;
  const y = cy - sisi / 2;
  return (
    `<rect x="${x}" y="${y}" width="${sisi}" height="${sisi}"/>` +
    `<rect x="${x}" y="${y}" width="${sisi}" height="${sisi}" transform="rotate(45 ${cx} ${cy})"/>`
  );
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${UKURAN}" height="${UKURAN}" viewBox="0 0 ${UKURAN} ${UKURAN}" ` +
  `fill="none" stroke="white" stroke-width="1" stroke-linejoin="round">` +
  bintang(32, 32) +
  bintang(0, 0) + bintang(UKURAN, 0) + bintang(0, UKURAN) + bintang(UKURAN, UKURAN) +
  `<circle cx="32" cy="32" r="5"/>` +
  `<circle cx="32" cy="0" r="2"/><circle cx="32" cy="${UKURAN}" r="2"/>` +
  `<circle cx="0" cy="32" r="2"/><circle cx="${UKURAN}" cy="32" r="2"/>` +
  `</svg>`;

export const POLA_BINTANG_URL = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
export const POLA_BINTANG_UKURAN = `${UKURAN}px ${UKURAN}px`;
