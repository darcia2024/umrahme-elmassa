import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import logoImg from '@assets/Umrahme_1782205247965.png';

const F = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";

const WA_NUMBER = '6281311506025';
const WA_MSG = encodeURIComponent(
  "Assalamu'alaikum, saya pemilik travel umrah dan tertarik dengan Umrahme. Boleh minta info demo?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const C = {
  green: '#15803d',
  greenDark: '#14532d',
  accent: '#a3e635',
  accentDark: '#84cc16',
  primary: '#0054F9',
  primaryDark: '#003BC9',
  ink: '#131313',
  muted: '#4C4C4C',
  line: '#E0E0E0',
  bg: '#ffffff',
  soft: '#F5F5F5',
  blue1: '#1e6fb8',
  blue2: '#3a8fd4',
  blue3: '#7cb8e8',
};

/* ─── REVEAL ─── */
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── EYEBROW ─── */
function Eyebrow({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <div className="lp-eyebrow" style={{
      display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.18em',
      textTransform: 'uppercase' as const, color: C.muted, marginBottom: 10,
      fontFamily: F,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.accentDark, display: 'inline-block', flexShrink: 0 }} />
      {children}
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.accentDark, display: 'inline-block', flexShrink: 0 }} />
    </div>
  );
}

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, marginBottom: 9, overflow: 'hidden', background: '#fff' }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '15px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, color: C.ink, fontFamily: F }}
      >
        {q}
        <span style={{
          flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
          background: open ? C.accent : C.soft,
          color: open ? C.greenDark : C.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 300, transition: 'all 0.3s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ padding: '0 18px 15px', color: C.muted, fontSize: 13.5, lineHeight: 1.65, fontFamily: F }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Umrahme — Aplikasi Pendamping Umrah White-Label untuk Travel Agency';
  }, []);

  const features = [
    { num: '01', title: '54 Doa Lengkap', desc: 'Arab, latin, dan terjemahan. Jamaah cukup buka HP dan langsung mengikuti saat muthowif menuntun. Tak perlu lagi bagikan buku doa cetak tiap keberangkatan.',
      icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></> },
    { num: '02', title: "Counter Tawaf & Sa'i", desc: 'Putaran terhitung otomatis, doa tiap putaran muncul sendiri. Jamaah fokus khusyuk, bukan sibuk menghitung atau takut kelewat.',
      icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></> },
    { num: '03', title: 'Manasik Interaktif', desc: 'Empat modul bertahap — Ihram & Miqat, Tawaf, Saʼi, Tahallul — lengkap dengan progres belajar. Jamaah berlatih dari rumah dan tiba di tanah suci sudah paham.',
      icon: <><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></> },
    { num: '04', title: 'Panduan Ibadah', desc: 'Tuntunan langkah demi langkah dari ihram hingga tahallul. Bisa dipelajari kapan saja, jadi jamaah berangkat dengan bekal, bukan tanda tanya.',
      icon: <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></> },
    { num: '05', title: 'Peta & 33 Lokasi Bersejarah', desc: '33 titik ziarah — dari Masjidil Haram, tempat haji (Arafah, Mina, Muzdalifah), hingga Thaif & Badr — lengkap dengan sejarah, tokoh, dalil, dan tautan Google Maps.',
      icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
    { num: '06', title: 'Jadwal Sholat Real-time', desc: 'Waktu sholat menyesuaikan lokasi otomatis: Makkah, Madinah, atau dalam perjalanan. Tak ada lagi alasan terlewat waktu.',
      icon: <><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/></> },
    { num: '07', title: 'FAQ Fikih Umrah', desc: 'Kumpulan tanya–jawab fikih yang paling sering muncul di lapangan. Jamaah temukan jawaban sendiri, muthowif tak perlu mengulang penjelasan yang sama.',
      icon: <><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17"/></> },
    { num: '08', title: 'Glosarium Istilah', desc: 'Kamus istilah umrah — miqat, tahallul, raml, dan lainnya — dijelaskan dengan bahasa sederhana. Jamaah tak lagi bingung saat mendengar istilah asing.',
      icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></> },
    { num: '09', title: 'Pengumuman Travel', desc: 'Kirim pengumuman dari portal, langsung tampil di HP semua jamaah. Tak lagi tenggelam di antara ratusan chat grup WhatsApp.',
      icon: <><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></> },
    { num: '10', title: 'Agenda Harian', desc: 'Isi agenda sekali di portal, jamaah lihat rencana hari ini secara otomatis. Pertanyaan "hari ini ke mana?" berhenti dengan sendirinya.',
      icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></> },
    { num: '11', title: 'Kartu Jamaah Digital', desc: 'Nama, rombongan, hotel, dan nomor pembimbing dalam satu kartu digital. Penyelamat saat jamaah terpisah atau menghadapi keadaan darurat.',
      icon: <><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 10h5M14 14h5"/></> },
    { num: '12', title: 'Jurnal Perjalanan', desc: 'Jamaah mengabadikan momen perjalanan sucinya. Kenangan ibadah tersimpan rapi dan bisa dibuka kembali kapan pun.',
      icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></> },
    { num: '13', title: 'Sertifikat Umrah Digital', desc: 'Sertifikat bermerek travel Anda yang bisa jamaah simpan dan bagikan. Kenang-kenangan yang sekaligus menjadi promosi gratis.',
      icon: <><circle cx="12" cy="9" r="6"/><path d="M9 14.5 8 22l4-2 4 2-1-7.5"/></> },
    { num: '14', title: 'White-Label Penuh', desc: 'Logo Anda, warna Anda, nama Anda. Jamaah tak pernah tahu ada Umrahme di baliknya — yang mereka kenal hanyalah aplikasi travel Anda.',
      icon: <><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 2-2 2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 10 10 0 0 0-10-10z"/></> },
    { num: '15', title: 'Portal Travel Agency', desc: 'Satu dashboard untuk semuanya: kelola jamaah, atur agenda, kirim pengumuman, pantau keberangkatan. Seluruh operasional dalam satu kendali.',
      icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></> },
  ];

  const faqs = [
    { q: 'Jamaah kami rata-rata tidak terlalu melek teknologi. Bisa pakai?', a: 'Bisa, dan justru dirancang untuk itu. Tidak perlu install apapun. Jamaah cukup buka browser, ketuk link yang Anda bagikan, masukkan kode dan nama. Selesai. Sudah banyak jamaah lansia 60+ yang pakai tanpa kesulitan.' },
    { q: 'Seberapa cepat aplikasi bisa bermerek travel kami?', a: 'Kurang dari 10 menit. Upload logo, pilih warna, masukkan nama travel, dan aplikasi langsung tampil bermerek travel Anda. Tidak perlu menunggu, tidak perlu approval dari kami.' },
    { q: 'Apakah data jamaah kami aman?', a: 'Ya, aman. Data jamaah disimpan terenkripsi dan tidak pernah dibagikan ke pihak manapun. Hanya travel Anda yang bisa akses data jamaah Anda.' },
    { q: 'Sinyal di area Haram sering lemah. Tetap bisa dipakai?', a: 'Ya. Doa, panduan ibadah, kartu jamaah, dan konten yang sudah pernah dibuka tetap bisa diakses offline. Jamaah tidak akan tergantung sinyal saat tawaf atau sa\'i.' },
    { q: 'Bagaimana cara mulai dan bayarnya?', a: 'Hubungi kami via WhatsApp, kami bantu setup demo gratis dengan nama travel Anda dulu. Kalau cocok, baru bicara soal pembayaran. Biaya dihitung per jamaah dan dibayar per keberangkatan, tanpa kontrak, tanpa minimum jamaah. Detail harga ada di bagian Harga.' },
    { q: 'Bisa lihat dulu sebelum memutuskan?', a: 'Tentu. Kami siapkan demo lengkap dengan logo dan nama travel Anda, supaya Anda bisa rasakan sendiri seperti apa tampilannya sebelum memutuskan. Gratis, tanpa komitmen apapun.' },
    { q: 'Apakah konten ibadahnya bisa dipercaya?', a: 'Konten doa, panduan, manasik, dan FAQ fikih disusun merujuk tuntunan yang umum dipakai dalam bimbingan umrah. Jamaah belajar dari materi yang konsisten, sehingga bimbingan di lapangan jadi lebih ringan dan seragam.' },
  ];

  return (
    <div style={{ fontFamily: F, color: C.ink, background: C.bg, lineHeight: 1.6, overflowX: 'hidden' }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }

        @keyframes lpScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes lpFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

        .lp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 32px;
          font-weight: 600; font-size: 14px; cursor: pointer;
          border: none; transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          white-space: nowrap; font-family: ${F};
        }
        .lp-btn:hover { transform: translateY(-2px); }
        .lp-btn-accent { background: ${C.primary}; color: #fff; border: none; }
        .lp-btn-accent:hover { background: ${C.primaryDark}; }
        .lp-btn-ghost { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.35); }
        .lp-btn-ghost:hover { background: rgba(255,255,255,.25); }
        .lp-btn-dark { background: #fff; color: #131313; border: 1px solid #131313; }
        .lp-btn-dark:hover { background: #F5F5F5; }

        .lp-arrow {
          display: inline-flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(255,255,255,0.25); color: #fff; font-size: 13px; flex-shrink: 0;
        }
        .lp-btn-dark .lp-arrow { background: #131313; color: #fff; }

        .lp-feat-card {
          background: #fff; border: 1px solid ${C.line}; border-radius: 12px; padding: 16px;
          transition: transform .25s ease, box-shadow .25s ease; height: 100%;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.04);
        }
        .lp-feat-card:hover { transform: translateY(-4px); box-shadow: 0px 8px 24px rgba(0,0,0,0.08); }

        .lp-feat-featured { grid-column: span 2; }

        /* mobile drawer */
        /* ─── NAVBAR ─── */
        .lp-nav {
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
          z-index: 100;
          width: auto;
          max-width: fit-content;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: background .3s ease, box-shadow .3s ease, border-color .3s ease;
        }
        .lp-nav-scrolled {
          background: #ffffff;
          backdrop-filter: none; -webkit-backdrop-filter: none;
          border-color: rgba(0,0,0,0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.08);
        }
        .lp-nav-inner {
          display: flex; align-items: center;
          padding: 0 8px 0 14px; height: 46px;
        }
        .lp-nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .lp-nav-logo-circle {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 15px; flex-shrink: 0;
          background: transparent; color: #fff;
          transition: background .3s;
        }
        .lp-nav-scrolled .lp-nav-logo-circle { background: transparent; }
        .lp-nav-logo-circle img { width: 32px; height: 32px; object-fit: contain; display: block; filter: brightness(0) invert(1); }
        .lp-nav-scrolled .lp-nav-logo-circle img { filter: none; }
        .lp-nav-logo-text {
          font-size: 17px; font-weight: 700; color: #fff;
          font-family: ${F}; transition: color .3s;
        }
        .lp-nav-scrolled .lp-nav-logo-text { color: #131313; }
        .lp-nav-links {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 2px;
        }
        .lp-nav-link {
          padding: 8px 14px; border-radius: 999px;
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.95);
          text-decoration: none; transition: color .15s, background .15s;
          font-family: ${F}; white-space: nowrap;
        }
        .lp-nav-link:hover { color: #fff; background: rgba(255,255,255,0.12); }
        .lp-nav-scrolled .lp-nav-link { color: #4C4C4C; }
        .lp-nav-scrolled .lp-nav-link:hover { color: #131313; background: rgba(0,0,0,0.05); }
        .lp-nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .lp-nav-cta-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          border: none; text-decoration: none; font-family: ${F};
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          background: #fff; color: #131313;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .lp-nav-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.18); }
        .lp-nav-scrolled .lp-nav-cta-btn { background: #131313; color: #fff; }
        .lp-nav-scrolled .lp-nav-cta-btn:hover { background: #222; }
        /* mobile logo-tap dropdown */
        .lp-mobile-dropdown {
          display: none;
          position: absolute; top: 80px; left: 24px; right: 24px; z-index: 98;
          border-radius: 20px;
          background: rgba(10,10,10,0.96);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          padding: 8px 20px 20px;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity .28s ease, transform .28s ease;
        }
        .lp-mobile-dropdown.open {
          opacity: 1; transform: translateY(0); pointer-events: auto;
        }
        .lp-nav-scrolled ~ .lp-mobile-dropdown,
        .lp-mobile-dropdown.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        }
        .lp-md-link {
          display: flex; align-items: center; justify-content: center;
          padding: 15px 16px; border-radius: 14px;
          font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.9);
          text-decoration: none; font-family: ${F};
          transition: background .15s, color .15s;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .lp-md-link:last-of-type { border-bottom: none; }
        .lp-md-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .lp-md-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 12px; width: 100%; padding: 15px 20px;
          border-radius: 16px; background: #fff; color: #131313;
          font-size: 15px; font-weight: 700; text-decoration: none; font-family: ${F};
          transition: background .15s;
        }
        .lp-md-cta:hover { background: #f0f0f0; }

        /* mobile: center logo, hide desktop items, make logo clickable */
        @media (max-width: 760px) {
          .lp-nav { width: auto !important; max-width: fit-content !important; }
          .lp-nav-links { display: none !important; }
          .lp-nav-right { display: none !important; }
          .lp-nav-inner { justify-content: center; }
          .lp-nav-logo {
            cursor: pointer; user-select: none;
            background: transparent;
            border: 1px solid transparent;
            border-radius: 20px;
            padding: 8px 18px 8px 10px;
            box-shadow: none;
            transition:
              background .35s ease,
              border-color .35s ease,
              box-shadow .35s ease,
              backdrop-filter .35s ease;
          }
          .lp-mobile-dropdown { display: block; }
          .lp-nav-logo-circle { transition: transform .2s ease, box-shadow .2s ease; }
          .lp-nav-logo-circle.open {
            transform: scale(1.08);
            box-shadow: 0 0 0 3px rgba(255,255,255,0.25);
          }

          .lp-nav-scrolled {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: none !important;
          }
          .lp-nav-scrolled .lp-nav-logo {
            background: rgba(12, 12, 18, 0.65);
            backdrop-filter: blur(24px) saturate(1.8);
            -webkit-backdrop-filter: blur(24px) saturate(1.8);
            border-color: rgba(255, 255, 255, 0.24);
            box-shadow:
              0 6px 32px rgba(0, 0, 0, 0.30),
              inset 0 1px 0 rgba(255, 255, 255, 0.12);
          }
          .lp-nav-scrolled .lp-nav-logo-text { color: #fff !important; }
          .lp-nav-scrolled .lp-nav-logo-circle img { filter: brightness(0) invert(1) !important; }
          .lp-nav-scrolled .lp-nav-logo-circle.open {
            box-shadow: 0 0 0 3px rgba(255,255,255,0.22);
          }
        }

        @media (max-width: 980px) {
          .lp-bento { grid-template-columns: 1fr 1fr !important; }
          .lp-feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-steps { grid-template-columns: 1fr !important; }
          .lp-wl { grid-template-columns: 1fr !important; }
          .lp-price-wrap { grid-template-columns: 1fr !important; }
          .lp-testi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-pain-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-foot-top { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 760px) {
          body, #root { overflow-x: hidden; }

          .lp-section { padding-top: 40px !important; padding-bottom: 40px !important; }
          .lp-section-sm { padding-top: 32px !important; padding-bottom: 32px !important; }

          .lp-feat-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-feat-featured { grid-column: span 2 !important; }
          .lp-bento { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-pain-grid { grid-template-columns: 1fr !important; }
          .lp-testi-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .lp-foot-top { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lp-steps { gap: 10px !important; grid-template-columns: 1fr !important; }
          .lp-price-wrap { grid-template-columns: 1fr !important; }
          .lp-calc-hide { display: none !important; }

          .lp-hero-padding { padding-top: 88px !important; }



          .lp-hero-btns {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 320px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 10px !important;
          }
          .lp-hero-btns .lp-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 13px 20px !important;
            font-size: 14px !important;
          }

          .lp-h2 { line-height: 1.18 !important; margin-bottom: 20px !important; }

          .lp-feat-card { padding: 14px !important; border-radius: 10px !important; }

          .lp-bento > div > div { min-height: unset !important; }

          .lp-pain-grid > div > div { padding: 14px !important; border-radius: 10px !important; }

          .lp-wl { gap: 32px !important; }
          .lp-wl-phones {
            justify-content: center !important;
            gap: 10px !important;
            padding: 0 8px 16px !important;
            flex-wrap: nowrap !important;
          }
          .lp-wl-phones > div {
            transform: none !important;
            width: calc(50% - 5px) !important;
            max-width: 175px !important;
          }
          .lp-wl-phones > div > div { height: 280px !important; }

          .lp-price-card { padding: 22px 20px !important; border-radius: 16px !important; }
          .lp-price-num { font-size: 44px !important; line-height: 1 !important; }

          .lp-testi-grid > div > div { padding: 16px !important; border-radius: 12px !important; }

          .lp-steps > div > div { padding: 16px 14px !important; border-radius: 12px !important; }
          .lp-steps > div > div h3 { font-size: 14px !important; }

          .lp-cta-box { padding: 28px 20px !important; border-radius: 18px !important; }
          .lp-cta-box h2 { font-size: 22px !important; margin-bottom: 10px !important; }
          .lp-cta-box p { font-size: 13px !important; margin-bottom: 18px !important; }
          .lp-cta-btns {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .lp-cta-btns .lp-btn {
            width: 100% !important;
            justify-content: center !important;
            font-size: 14px !important;
          }

          .lp-foot-links {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }

          .lp-marquee-wrap { padding-top: 36px !important; padding-bottom: 24px !important; }

          .lp-wl-list li { font-size: 13px !important; margin-bottom: 8px !important; }
          .lp-wl-cta { font-size: 13px !important; padding: 12px 18px !important; }

          .lp-inner { padding-left: 18px !important; padding-right: 18px !important; }
        }

        @media (max-width: 480px) {
          .lp-feat-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-feat-card { padding: 14px !important; border-radius: 12px !important; }
          .lp-feat-card h3 { font-size: 13.5px !important; margin-bottom: 4px !important; }
          .lp-feat-card p { font-size: 11.5px !important; line-height: 1.45 !important; }
          .lp-feat-card > div:first-child { width: 30px !important; height: 30px !important; font-size: 15px !important; margin-bottom: 8px !important; }
          .lp-feat-featured { grid-column: span 1 !important; }
          .lp-pain-grid { grid-template-columns: 1fr !important; }
          .lp-wl-phones > div { max-width: 150px !important; }
          .lp-wl-phones > div > div { height: 260px !important; }
          .lp-foot-links { grid-template-columns: 1fr 1fr !important; }
        }

        .lp-bento > div { height: 100%; }

        @keyframes lpPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,84,249,0.0); } 50% { box-shadow: 0 0 0 6px rgba(0,84,249,0.08); } }
        .lp-cta-pulse { animation: lpPulse 2.8s ease-in-out infinite; }

        .lp-feat-card .lp-feat-icon { transition: transform .25s ease; }
        .lp-feat-card:hover .lp-feat-icon { transform: scale(1.08) rotate(-3deg); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        @media (max-width: 640px) {
          .lp-compare { grid-template-columns: 1fr !important; }
        }

        /* ═══ DESKTOP POLISH ≥1024px — mobile tidak tersentuh ═══ */
        @media (min-width: 1024px) {
          /* Kontainer & ritme */
          .lp-inner { max-width: 1240px !important; }
          .lp-section { padding-top: 88px !important; padding-bottom: 88px !important; }

          /* HERO dominan */
          .lp-hero-padding { padding-top: 132px !important; padding-bottom: 120px !important; }
          .lp-hero-padding h1 { font-size: clamp(52px, 5.4vw, 74px) !important; line-height: 1.04 !important; max-width: 960px !important; margin-bottom: 24px !important; }
          .lp-hero-padding p  { font-size: 18px !important; max-width: 620px !important; margin-bottom: 32px !important; line-height: 1.75 !important; }
          .lp-hero-btns .lp-btn { padding: 16px 34px !important; font-size: 16px !important; }

          /* Heading & sub-teks */
          .lp-h2 { font-size: clamp(34px, 3.4vw, 44px) !important; }
          .lp-inner > p { font-size: 16px !important; line-height: 1.7 !important; }
          .lp-eyebrow { font-size: 13px !important; }

          /* Kartu fitur */
          .lp-feat-card { padding: 22px !important; border-radius: 14px !important; }
          .lp-feat-card h3 { font-size: 16.5px !important; margin-bottom: 6px !important; }
          .lp-feat-card p  { font-size: 14px !important; line-height: 1.55 !important; }
          .lp-feat-card .lp-feat-icon { width: 44px !important; height: 44px !important; }
          .lp-feat-grid { gap: 16px !important; }

          /* Bento / about */
          .lp-bento { gap: 16px !important; }
          .lp-bento h3 { font-size: 17px !important; }
          .lp-bento p  { font-size: 14px !important; line-height: 1.55 !important; }

          /* Pain cards */
          .lp-pain-grid h3 { font-size: 16px !important; }
          .lp-pain-grid p  { font-size: 14px !important; line-height: 1.55 !important; }

          /* Steps */
          .lp-steps h3 { font-size: 17px !important; }
          .lp-steps p  { font-size: 14.5px !important; line-height: 1.6 !important; }

          /* Section "ngambang" → lebarkan proporsional */
          .lp-wl-box  { max-width: 880px !important; }
          .lp-compare { max-width: 1040px !important; gap: 22px !important; }
          .lp-wl-list li { font-size: 15px !important; }
          .lp-wl h2 { font-size: clamp(34px, 3.4vw, 44px) !important; }

          /* Harga & testimoni */
          .lp-price-card p, .lp-price-wrap p, .lp-price-wrap li { font-size: 14.5px !important; }
          .lp-testi-grid p { font-size: 14.5px !important; line-height: 1.6 !important; }
        }

        /* Monitor sangat lebar / proyektor */
        @media (min-width: 1440px) {
          .lp-inner { max-width: 1300px !important; }
          .lp-section { padding-top: 100px !important; padding-bottom: 100px !important; }
          .lp-hero-padding h1 { font-size: 78px !important; }
          .lp-hero-padding p { font-size: 19px !important; }
          .lp-wl-box { max-width: 920px !important; }
          .lp-compare { max-width: 1080px !important; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section className="lp-hero-padding" style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: '100px 0 90px',
      }}>
        {/* ── NAVBAR (absolute, only in hero) ── */}
        <header className="lp-nav">
          <div className="lp-nav-inner">
            <a
              href="#"
              className="lp-nav-logo"
              onClick={(e) => {
                if (window.innerWidth <= 760) {
                  e.preventDefault();
                  setMenuOpen(p => !p);
                }
              }}
            >
              <div className={`lp-nav-logo-circle${menuOpen ? ' open' : ''}`}>
                {menuOpen ? '✕' : <img src={logoImg} alt="Umrahme" />}
              </div>
              <span className="lp-nav-logo-text">Umrahme</span>
            </a>

            <nav className="lp-nav-links">
              {[['#fitur', 'Fitur'], ['#harga', 'Harga'], ['#cara', 'Cara Kerja'], ['#kontak', 'Kontak']].map(([h, l]) => (
                <a key={h} href={h} className="lp-nav-link">{l}</a>
              ))}
            </nav>

            <div className="lp-nav-right">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="lp-nav-cta-btn">
                Daftar Sekarang →
              </a>
            </div>
          </div>
        </header>

        {/* ── MOBILE DROPDOWN ── */}
        <div className={`lp-mobile-dropdown${menuOpen ? ' open' : ''}`}>
          {[['#fitur', 'Fitur'], ['#harga', 'Harga'], ['#cara', 'Cara Kerja'], ['#kontak', 'Kontak']].map(([h, l]) => (
            <a
              key={h} href={h}
              className="lp-md-link"
              onClick={() => setMenuOpen(false)}
            >{l}</a>
          ))}
          <a
            href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="lp-md-cta"
            onClick={() => setMenuOpen(false)}
          >
            Daftar Sekarang →
          </a>
        </div>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'url(/hero-bg.avif)',
          backgroundSize: '130%', backgroundPosition: 'center calc(20% - 5px)',
          opacity: 1,
        }} />
        {/* kubah — transisi dome ke section berikutnya */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 4, lineHeight: 0, pointerEvents: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 72 }}>
            <path d="M0,72 Q720,0 1440,72 L1440,72 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, color: '#fff', letterSpacing: '-0.02em', maxWidth: 900, margin: '0 auto 20px', textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)' }}
          >
            Pendamping Umrah Digital,{' '}
            <span style={{ color: C.accent, fontStyle: 'italic' }}>Atas Nama Travel Anda</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            style={{ color: 'rgba(255,255,255,.88)', fontSize: 'clamp(14px, 1.8vw, 16px)', maxWidth: 560, margin: '0 auto 26px', fontWeight: 400, textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.35)', lineHeight: 1.7 }}
          >
            Dampingi setiap jamaah dengan jadwal, doa, panduan ibadah, info hotel, dan pengumuman perjalanan — lengkap dalam satu aplikasi bermerek travel Anda.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="lp-hero-btns"
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}
          >
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="lp-btn lp-cta-pulse" style={{ background: C.ink, color: '#fff', padding: '14px 28px', fontSize: 15, fontWeight: 600 }}>
              Dapatkan Sekarang
            </a>
            <a href="#cara" className="lp-btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '14px 28px', fontSize: 15, fontWeight: 600 }}>
              Bagaimana Cara Kerjanya?
            </a>
          </motion.div>


        </div>
      </section>




      {/* ══════════ ABOUT / BENTO ══════════ */}
      <section className="lp-section" style={{ padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Tentang Umrahme</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto 10px' }}>
              Lebih dari aplikasi. Ini wajah digital travel Anda.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ textAlign: 'center', color: C.muted, fontSize: 14, marginBottom: 28 }}>
              Setiap travel kini bisa punya aplikasi pendamping jamaah sendiri — tanpa biaya pengembangan, tanpa tim teknis. Doa, panduan, manasik, peta ziarah, jadwal, dan pengumuman perjalanan hadir dalam satu tempat, dengan merek Anda di depannya.
            </p>
          </Reveal>

          <div className="lp-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, alignItems: 'stretch' }}>
            <Reveal>
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: `linear-gradient(165deg, ${C.blue2}, ${C.blue1})`, color: '#fff', borderRadius: 16, padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200, boxSizing: 'border-box' }}>
                <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>Tampil sebagai aplikasi travel Anda sendiri</div>
                <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }} style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '14px 0' }}>100%</motion.div>
                <div style={{ fontSize: 12.5, opacity: 0.85 }}>Logo, nama, dan warna brand Anda. Tanpa jejak pihak ketiga.</div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.05}>
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200, boxSizing: 'border-box' }}>
                <div style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>Doa & panduan ibadah siap pakai</div>
                <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }} style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: C.ink, margin: '14px 0' }}>54</motion.div>
                <div style={{ fontSize: 12.5, color: C.muted }}>Lengkap dengan Arab, latin, dan terjemahan</div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.08}>
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: C.accent, borderRadius: 16, padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200, boxSizing: 'border-box' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.greenDark }}>Fitur premium, langsung aktif</div>
                <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }} style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: C.greenDark, margin: '14px 0' }}>15</motion.div>
                <div style={{ fontSize: 12.5, color: C.greenDark, opacity: 0.85 }}>Semua termasuk, tanpa biaya tambahan</div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.11}>
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: C.ink, color: '#fff', borderRadius: 16, padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200, boxSizing: 'border-box' }}>
                <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>Biaya setup & langganan bulanan</div>
                <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }} style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: C.accent, margin: '14px 0' }}>Rp 0</motion.div>
                <div style={{ fontSize: 12.5, color: '#94a3b8' }}>Bayar hanya saat jamaah berangkat</div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════ PAIN POINTS ══════════ */}
      <section className="lp-section" style={{ background: C.soft, padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Kenyataan di Lapangan</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto 10px' }}>
              Masalah yang berulang tiap keberangkatan.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 520, margin: '0 auto 28px', fontSize: 14 }}>
              Bukan salah tim Anda. Memang belum ada sistem yang pas. Sampai sekarang.
            </p>
          </Reveal>

          <div className="lp-pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 10 }}>
            {[
              {
                title: 'Jamaah terpisah saat Tawaf & Saʼi',
                desc: 'Hilang di tengah lautan jutaan orang. Lansia dan jamaah pertama yang paling rentan.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
              },
              {
                title: '"Hari ini kita ke mana, Pak?"',
                desc: 'Pertanyaan yang sama berputar sepanjang hari. Muthowif berubah jadi mesin penjawab.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                ),
              },
              {
                title: 'Ragu saat melintasi Miqat',
                desc: 'Niat ihram tertinggal karena arahan tak terdengar. Keabsahan ibadah jadi taruhannya.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                ),
              },
              {
                title: 'Info penting hilang di grup WA',
                desc: 'Jam kumpul dan perubahan jadwal tertimbun di antara ratusan pesan.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l18-5v12L3 14v-3z"/>
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                  </svg>
                ),
              },
              {
                title: 'Muthowif terkuras untuk urusan teknis',
                desc: 'Energi habis menjawab pertanyaan dan koordinasi, bukan membimbing ibadah.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
              },
              {
                title: 'Lupa nomor kamar, bus & titik kumpul',
                desc: 'Jamaah bingung cari hotel, bus, atau gerbang masjid tempat berkumpul.',
                icon: (
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                    <line x1="9" y1="17" x2="12" y2="17"/>
                  </svg>
                ),
              },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }} style={{ background: C.bg, borderRadius: 14, padding: 16, border: `1px solid ${C.line}`, display: 'flex', gap: 12, alignItems: 'flex-start', height: '100%' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: C.soft, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ width: 19, height: 19, display: 'block' }}>{p.icon}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, lineHeight: 1.25 }}>{p.title}</h3>
                    <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.45 }}>{p.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ FEATURES ══════════ */}
      <section id="fitur" className="lp-section" style={{ padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Fitur Lengkap</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto 10px' }}>
              Semua kebutuhan jamaah, dalam satu genggaman.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 520, margin: '0 auto 28px', fontSize: 14 }}>
              15 fitur siap pakai, aktif sejak hari pertama. Tanpa biaya tambahan, tanpa perlu tim IT.
            </p>
          </Reveal>

          <div className="lp-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.03} className={i < 2 ? 'lp-feat-featured' : ''}>
                <div className="lp-feat-card">
                  <div className="lp-feat-icon" style={{ width: 40, height: 40, borderRadius: 10, background: C.accent, color: C.greenDark, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.accentDark, marginBottom: 3 }}>FITUR {f.num}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</h3>
                  <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="cara" className="lp-section" style={{ background: C.soft, padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Cara Kerja</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto 10px' }}>
              Dari daftar sampai jalan, cuma 3 langkah
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 500, margin: '0 auto 28px', fontSize: 14 }}>
              Tanpa tim IT, tanpa training. Siap untuk keberangkatan berikutnya.
            </p>
          </Reveal>

          <div className="lp-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { title: 'Daftar & Pasang Merek Anda', desc: 'Unggah logo, pilih warna, isi nama travel. Aplikasi langsung bermerek Anda dalam hitungan menit.' },
              { title: 'Masukkan Jamaah & Agenda', desc: 'Input data jamaah dan jadwal perjalanan. Semua tersinkron otomatis ke HP jamaah.' },
              { title: 'Bagikan Kode, Langsung Dipakai', desc: 'Jamaah cukup buka tautan dan masukkan kode. Tanpa unduh, tanpa instal, tanpa ribet.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} style={{ background: '#fff', borderRadius: 12, padding: 20, border: `1px solid ${C.line}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: C.ink, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, marginBottom: 14 }}>{i + 1}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{s.title}</h3>
                  <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ WHITE-LABEL SHOWCASE ══════════ */}
      <section className="lp-section" style={{ padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <div className="lp-wl lp-wl-box" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <div>
                <Eyebrow>White-Label</Eyebrow>
                <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 14 }}>
                  Yang jamaah lihat: nama Anda. Bukan kami.
                </h2>
                <p style={{ color: C.muted, fontSize: 14, marginBottom: 18, lineHeight: 1.7 }}>
                  Logo, warna, dan nama travel Anda di setiap halaman. Tanpa jejak pihak ketiga. Yang jamaah ingat dan rekomendasikan: travel Anda.
                </p>
                <ul className="lp-wl-list" style={{ listStyle: 'none', display: 'inline-block', textAlign: 'left', margin: '0 auto' }}>
                  {[
                    'Logo & nama travel di setiap halaman',
                    'Warna brand Anda, konsisten & profesional',
                    'Terlihat sekelas travel besar yang punya app sendiri',
                    'Semua kustomisasi termasuk, tanpa biaya ekstra',
                  ].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontWeight: 600, fontSize: 13.5 }}>
                      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: C.accent, color: C.greenDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-dark lp-wl-cta">
                    Lihat Demo dengan Nama Travel Anda <span className="lp-arrow" style={{ background: C.accent, color: C.ink }}>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════ PERBANDINGAN: Buku Doa vs Umrahme ══════════ */}
      <section className="lp-section" style={{ padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Bandingkan</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 12 }}>
              Biaya setara buku doa.<br />Nilainya jauh lebih besar.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, textAlign: 'center', maxWidth: 600, margin: '0 auto 36px' }}>
              Banyak travel sudah terbiasa mencetak buku doa untuk tiap jamaah. Dengan biaya yang kurang lebih sama, Umrahme memberi jauh lebih banyak — dan tak pernah hilang atau ketinggalan.
            </p>
          </Reveal>

          <div className="lp-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 860, margin: '0 auto' }}>
            {/* Kolom Buku Doa Cetak */}
            <Reveal delay={0.18}>
              <div style={{ height: '100%', border: `1px solid ${C.line}`, borderRadius: 18, padding: 24, background: C.bg }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginBottom: 6 }}>Cara Lama</p>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 4 }}>Buku Doa Cetak</h3>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>±Rp30.000 / jamaah</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Hanya berisi doa & panduan dasar',
                    'Sering hilang, tertinggal, atau rusak',
                    'Tidak bisa diperbarui setelah dicetak',
                    'Tidak ada jadwal, peta, atau pengumuman',
                    'Habis dipakai sekali keberangkatan',
                  ].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 10, fontSize: 13, color: C.muted }}>
                      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: '#f0f0f0', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>✕</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Kolom Umrahme (di-highlight) */}
            <Reveal delay={0.24}>
              <div style={{ height: '100%', border: `2px solid ${C.accent}`, borderRadius: 18, padding: 24, background: C.greenDark, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: 6 }}>Cara Baru</p>
                <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 4 }}>Umrahme</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>Mulai 10 SAR / jamaah</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Doa, manasik interaktif & panduan lengkap',
                    'Selalu di HP jamaah — tak akan hilang',
                    'Jadwal, info hotel & pengumuman real-time',
                    'Peta ziarah + Google Maps & kartu jamaah',
                    'Bermerek travel Anda — naikkan citra travel',
                  ].map((t) => (
                    <li key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 10, fontSize: 13, fontWeight: 600 }}>
                      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: C.accent, color: C.greenDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.7, textAlign: 'center', maxWidth: 620, margin: '24px auto 0', fontStyle: 'italic' }}>
              Dengan biaya yang kurang lebih setara mencetak buku doa, travel Anda mendapat aplikasi pendamping umrah lengkap, bermerek sendiri, yang dipakai jamaah sepanjang perjalanan.
            </p>
          </Reveal>
        </div>
      </section>


      {/* ══════════ PRICING ══════════ */}
      <section id="harga" className="lp-section" style={{ background: C.soft, padding: '56px 0' }}>
        <div className="lp-inner" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>Harga</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 700, margin: '0 auto 10px' }}>
              Harga yang bikin Anda untung sejak hari pertama.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 520, margin: '0 auto 28px', fontSize: 14 }}>
              Gratis untuk Travel Crew Official. Tidak perlu kartu kredit, tidak perlu kontrak. Cukup daftar dan rasakan langsung.
            </p>
          </Reveal>

          <div className="lp-price-wrap" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 20, alignItems: 'stretch' }}>
            <Reveal>
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }} className="lp-price-card" style={{ background: C.ink, color: '#fff', borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: 22, right: -34, background: C.accent, color: C.greenDark, fontWeight: 800, fontSize: 11, padding: '5px 44px', transform: 'rotate(45deg)' }}>POPULER</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 5 }}>Harga Per Jamaah</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0 2px' }}>
                  <span className="lp-price-num" style={{ fontSize: 48, fontWeight: 800, lineHeight: 1, color: C.accent }}>10</span>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,.8)' }}>SAR saja / jamaah</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 12, fontStyle: 'italic', marginBottom: 18 }}>
                  Balik modal hanya dari hemat biaya cetak buku doa.
                </p>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginBottom: 20 }}>Gratis untuk Travel Crew Official. Rasakan sendiri sebelum memutuskan, tanpa risiko, tanpa komitmen.</p>
                <ul style={{ listStyle: 'none', flex: 1 }}>
                  {['Lebih murah dari biaya cetak buku doa, langsung balik modal', 'Tanpa biaya setup, tanpa langganan bulanan, tanpa kontrak', 'Bayar hanya untuk jamaah yang benar-benar berangkat', '15 fitur premium aktif penuh, tanpa biaya tersembunyi', 'Aplikasi bermerek travel Anda, perkuat brand di mata jamaah', 'Tingkatkan kepuasan jamaah & dorong referral keberangkatan berikutnya', 'Pendampingan & support langsung via WhatsApp'].map(t => (
                    <li key={t} style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 9, fontSize: 13 }}>
                      <span style={{ width: 19, height: 19, borderRadius: '50%', background: C.accent, color: C.greenDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 12.5, color: C.accent, fontWeight: 600, marginBottom: 12, textAlign: 'center', marginTop: 20 }}>
                  Gratis untuk Travel Crew Official, tanpa syarat.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                  Dapatkan Sekarang <span className="lp-arrow">→</span>
                </a>
              </motion.div>
            </Reveal>

            <Reveal delay={0.08} className="lp-calc-hide">
              <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 5 }}>Kalkulator Biaya</h4>
                <p style={{ color: C.muted, fontSize: 13, marginBottom: 18 }}>Estimasi untuk keberangkatan Anda</p>
                {[['Jumlah Jamaah', '40 orang'], ['Harga per Jamaah', '10 SAR'], ['Biaya Setup', 'Rp 0']].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px dashed ${C.line}`, fontSize: 14 }}>
                    <span>{l}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0 0', fontSize: 17, fontWeight: 800 }}>
                  <span>Total</span>
                  <span style={{ color: C.green }}>
                    400 SAR
                    <span style={{ display: 'inline-block', background: C.accent, color: C.greenDark, fontWeight: 800, padding: '2px 10px', borderRadius: 999, fontSize: 12, marginLeft: 8 }}>Hemat 60%</span>
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: C.muted, marginTop: 14, lineHeight: 1.6 }}>Untuk 40 jamaah, biaya cetak buku doa saja bisa menembus 1.000 SAR. Dengan Umrahme, 40 jamaah cukup 400 SAR — dan jamaah mendapat 15 fitur lengkap, bukan sekadar selembar buku.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════ FAQ ══════════ */}
      <section className="lp-section" style={{ background: C.soft, padding: '56px 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <Reveal delay={0}><Eyebrow>FAQ</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="lp-h2" style={{ textAlign: 'center', fontSize: 'clamp(23px, 3vw, 32px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', margin: '0 auto 28px' }}>
              Masih ragu? Ini jawabannya.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </Reveal>
        </div>
      </section>


      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: C.ink, color: '#fff', padding: '64px 24px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: `radial-gradient(ellipse at center, ${C.primary}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: C.accent, marginBottom: 14, fontFamily: F }}>
              Untuk travel yang ingin selangkah lebih maju.
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff', margin: '0 auto 20px', maxWidth: 640, fontFamily: F }}>
              Jamaah lebih tenang.<br />Muthowif lebih fokus.<br />Travel Anda lebih dipercaya.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 28, fontFamily: F }}>
              Gratis untuk Travel Crew Official. Kami setup aplikasi bermerek travel Anda dalam menit.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.accent, color: C.greenDark, padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: 'none', fontFamily: F, transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Klaim Akses Gratis →
            </a>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0 28px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={logoImg} alt="Umrahme" style={{ width: 28, height: 28, objectFit: 'contain', display: 'block', flexShrink: 0, filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: F }}>Umrahme</span>
            </div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {[
                ['#fitur', 'Fitur'],
                ['#harga', 'Harga'],
                ['#cara', 'Cara Kerja'],
                ['#kontak', 'Kontak'],
                [WA_LINK, 'WhatsApp'],
              ].map(([href, label]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: F, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {label}
                </a>
              ))}
            </nav>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: F }}>
              © {new Date().getFullYear()} Umrahme
            </span>
          </div>

        </div>
      </footer>

      {/* ══════════ FLOATING WA BUTTON ══════════ */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#25D366', color: '#fff',
          width: 56, height: 56,
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          textDecoration: 'none',
          transition: 'transform .2s ease, box-shadow .2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.82-1.63A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff"/>
          <path d="M21.85 19.28c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#25D366"/>
        </svg>
      </a>
    </div>
  );
}
