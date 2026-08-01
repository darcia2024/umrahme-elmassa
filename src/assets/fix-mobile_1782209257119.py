#!/usr/bin/env python3
"""
Patch LandingPage.tsx — fix semua mobile layout
Jalankan dari root workspace: python3 /tmp/fix-mobile.py
"""

import re

PATH = 'artifacts/umrahme/src/pages/LandingPage.tsx'

with open(PATH, 'r') as f:
    code = f.read()

# ─── 1. Ganti blok @media (max-width: 760px) yang kedua (yang ada di akhir style) ───
OLD_MOBILE = """        @media (max-width: 760px) {
          .lp-feat-grid { grid-template-columns: 1fr !important; }
          .lp-bento { grid-template-columns: 1fr !important; }
          .lp-pain-grid { grid-template-columns: 1fr !important; }
          .lp-testi-grid { grid-template-columns: 1fr !important; }
          .lp-foot-top { grid-template-columns: 1fr !important; }
          .lp-float-wrap { overflow-x: auto; justify-content: flex-start !important; padding: 0 20px 10px !important; }
          .lp-hero-padding { padding: 100px 0 0 !important; }
        }"""

NEW_MOBILE = """        @media (max-width: 760px) {
          /* ── GLOBAL ── */
          body, #root { overflow-x: hidden; }

          /* ── GRIDS ── */
          .lp-feat-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-bento { grid-template-columns: 1fr !important; gap: 10px !important; }
          .lp-pain-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .lp-testi-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .lp-foot-top { grid-template-columns: 1fr !important; gap: 24px !important; }
          .lp-steps { gap: 10px !important; }
          .lp-price-wrap { grid-template-columns: 1fr !important; }

          /* ── HERO ── */
          .lp-hero-padding { padding-top: 76px !important; }

          /* ── FLOATING CARDS: 2x2 grid ── */
          .lp-float-wrap {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            padding: 0 16px !important;
            margin-top: 28px !important;
            margin-bottom: -32px !important;
            overflow: visible !important;
            justify-content: unset !important;
            align-items: stretch !important;
            min-height: unset !important;
            perspective: none !important;
          }
          .lp-float-wrap > div {
            width: 100% !important;
            animation: none !important;
            flex-shrink: unset !important;
          }
          .lp-float-wrap > div > div {
            width: 100% !important;
            border-radius: 14px !important;
            padding: 14px !important;
          }
          /* sembunyikan card ke-3 (panduan ibadah) biar grid jadi 2x2 */
          .lp-float-card-mid { display: none !important; }

          /* ── HERO CTA BUTTONS: stack vertikal ── */
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

          /* ── HERO SOCIAL PROOF ── */
          .lp-hero-social {
            flex-direction: column !important;
            gap: 4px !important;
            font-size: 12px !important;
          }

          /* ── SECTION PADDING: semua section lebih compact ── */
          .lp-section { padding-top: 48px !important; padding-bottom: 48px !important; }
          .lp-section-sm { padding-top: 32px !important; padding-bottom: 32px !important; }

          /* ── TYPOGRAPHY ── */
          .lp-h2 { line-height: 1.18 !important; margin-bottom: 28px !important; }

          /* ── FEAT CARDS: compact ── */
          .lp-feat-card { padding: 18px !important; border-radius: 16px !important; }
          .lp-feat-card h3 { font-size: 15px !important; margin-bottom: 5px !important; }
          .lp-feat-card p { font-size: 12.5px !important; }
          .lp-feat-card > div:first-child { width: 38px !important; height: 38px !important; font-size: 18px !important; margin-bottom: 10px !important; }

          /* ── BENTO CARDS: compact ── */
          .lp-bento > div > div { min-height: unset !important; padding: 20px !important; border-radius: 16px !important; }
          .lp-bento-right { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }

          /* ── PAIN CARDS: compact ── */
          .lp-pain-grid > div > div { padding: 18px !important; border-radius: 16px !important; }

          /* ── WHITE-LABEL PHONES ── */
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
          .lp-wl-phones > div > div { height: 320px !important; }

          /* ── PRICING CARD: compact ── */
          .lp-price-card { padding: 26px 22px !important; border-radius: 20px !important; }
          .lp-price-num { font-size: 54px !important; line-height: 1 !important; }
          .lp-calc-hide { display: none !important; }

          /* ── TESTIMONIALS: compact ── */
          .lp-testi-grid > div > div { padding: 20px !important; border-radius: 16px !important; }

          /* ── STEPS: compact ── */
          .lp-steps > div > div { padding: 22px 20px !important; border-radius: 16px !important; }
          .lp-steps > div > div h3 { font-size: 17px !important; }

          /* ── CTA BOX: compact ── */
          .lp-cta-box { padding: 32px 22px !important; border-radius: 20px !important; }
          .lp-cta-box h2 { font-size: 24px !important; margin-bottom: 12px !important; }
          .lp-cta-box p { font-size: 14px !important; margin-bottom: 20px !important; }
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

          /* ── FOOTER ── */
          .lp-foot-links {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }

          /* ── MARQUEE ── */
          .lp-marquee-wrap { padding-top: 52px !important; padding-bottom: 36px !important; }

          /* ── FAQ ── */
          .lp-faq-q { font-size: 14px !important; padding: 16px 18px !important; }
          .lp-faq-a { font-size: 13.5px !important; padding: 0 18px 16px !important; }

          /* ── WL CHECKLIST ── */
          .lp-wl-list li { font-size: 13.5px !important; margin-bottom: 10px !important; }
          .lp-wl-cta { font-size: 13px !important; padding: 12px 18px !important; }

          /* ── SECTION INNER PADDING ── */
          .lp-inner { padding-left: 18px !important; padding-right: 18px !important; }
        }

        @media (max-width: 480px) {
          .lp-feat-grid { grid-template-columns: 1fr !important; }
          .lp-pain-grid { grid-template-columns: 1fr !important; }
          .lp-bento-right { grid-template-columns: 1fr !important; }
          .lp-float-wrap { grid-template-columns: 1fr 1fr !important; }
          .lp-wl-phones > div { max-width: 150px !important; }
          .lp-wl-phones > div > div { height: 280px !important; }
          .lp-foot-links { grid-template-columns: 1fr 1fr !important; }
        }"""

if OLD_MOBILE in code:
    code = code.replace(OLD_MOBILE, NEW_MOBILE)
    print("✅ Media query mobile replaced")
else:
    print("❌ OLD_MOBILE block not found — check whitespace")

# ─── 2. Tambah className ke elemen-elemen kunci ───

# Hero padding section — sudah ada class lp-hero-padding

# Floating cards wrapper
code = code.replace(
    'className="lp-float-wrap" style={{ position: \'relative\', zIndex: 3, marginTop: 50, marginBottom: -90, display: \'flex\', alignItems: \'flex-end\', justifyContent: \'center\', gap: 14, perspective: 1400, minHeight: 220, padding: \'0 24px\' }}',
    'className="lp-float-wrap" style={{ position: \'relative\', zIndex: 3, marginTop: 50, marginBottom: -90, display: \'flex\', alignItems: \'flex-end\', justifyContent: \'center\', gap: 14, perspective: 1400, minHeight: 220, padding: \'0 24px\' }}'
)
print("ℹ️  float-wrap class already exists")

# Card ke-3 (i===2) tambah className lp-float-card-mid
code = code.replace(
    '{i === 2 && false && (',
    '{i === 2 && ('
)
# Reset false flag kalau ada dari patch sebelumnya
old_card2 = "            >\n              {i === 2 && (\n"
new_card2 = "            className=\"lp-float-card-mid\"\n            >\n              {i === 2 && (\n"
if old_card2 in code:
    code = code.replace(old_card2, new_card2, 1)
    print("✅ lp-float-card-mid added to card wrapper")
else:
    # Coba pola lain
    code = code.replace(
        "style={{ animation: `lpFloat 5s ease-in-out ${_.delay}s infinite`, flexShrink: 0 }}\n            >\n              {i === 2",
        "className={i === 2 ? 'lp-float-card-mid' : ''}\n              style={{ animation: `lpFloat 5s ease-in-out ${_.delay}s infinite`, flexShrink: 0 }}\n            >\n              {i === 2"
    )
    print("✅ lp-float-card-mid added via className conditional")

# Hero CTA buttons wrapper
code = code.replace(
    "style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}",
    "className=\"lp-hero-btns\" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}"
)
print("✅ lp-hero-btns added")

# Hero social proof wrapper
code = code.replace(
    "style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}",
    "className=\"lp-hero-social\" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}"
)
print("✅ lp-hero-social added")

# Partners marquee wrapper
code = code.replace(
    "style={{ padding: '90px 0 50px', borderBottom: `1px solid ${C.line}`, overflow: 'hidden' }}",
    "className=\"lp-marquee-wrap lp-section-sm\" style={{ padding: '90px 0 50px', borderBottom: `1px solid ${C.line}`, overflow: 'hidden' }}"
)
print("✅ lp-marquee-wrap added")

# Bento right column wrapper
code = code.replace(
    "style={{ display: 'flex', flexDirection: 'column', gap: 18 }}",
    "className=\"lp-bento-right\" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}"
)
print("✅ lp-bento-right added")

# White-label phones wrapper
code = code.replace(
    "style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', overflow: 'hidden', padding: '10px 10px 20px' }}",
    "className=\"lp-wl-phones\" style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', overflow: 'hidden', padding: '10px 10px 20px' }}"
)
print("✅ lp-wl-phones added")

# Pricing card (gelap)
code = code.replace(
    "style={{ background: C.ink, color: '#fff', borderRadius: 28, padding: 40, position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}",
    "className=\"lp-price-card\" style={{ background: C.ink, color: '#fff', borderRadius: 28, padding: 40, position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}"
)
print("✅ lp-price-card added")

# Pricing number "10"
code = code.replace(
    "<span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1, color: C.accent }}>10</span>",
    "<span className=\"lp-price-num\" style={{ fontSize: 64, fontWeight: 800, lineHeight: 1, color: C.accent }}>10</span>"
)
print("✅ lp-price-num added")

# Kalkulator card (sembunyikan di mobile)
code = code.replace(
    "<Reveal delay={0.08}>\n              <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 28, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>",
    "<Reveal delay={0.08} className=\"lp-calc-hide\">\n              <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 28, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>"
)
print("✅ lp-calc-hide added to calculator")

# CTA box
code = code.replace(
    "style={{ background: `linear-gradient(165deg, ${C.primary}, ${C.primaryDark})`, color: '#fff', borderRadius: 32, padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}",
    "className=\"lp-cta-box\" style={{ background: `linear-gradient(165deg, ${C.primary}, ${C.primaryDark})`, color: '#fff', borderRadius: 32, padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}"
)
print("✅ lp-cta-box added")

# CTA buttons wrapper
code = code.replace(
    "style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}",
    "className=\"lp-cta-btns\" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}"
)
print("✅ lp-cta-btns added")

# Section padding — tambah lp-section ke semua section utama
sections_to_patch = [
    ("style={{ padding: '90px 0' }}>\n        <div style={{ maxWidth: 1180", "className=\"lp-section\" style={{ padding: '90px 0' }}>\n        <div style={{ maxWidth: 1180"),
    ("style={{ background: C.soft, padding: '90px 0' }}>\n        <div style={{ maxWidth: 1180", "className=\"lp-section\" style={{ background: C.soft, padding: '90px 0' }}>\n        <div style={{ maxWidth: 1180"),
    ("style={{ padding: '90px 0' }}>\n        <div style={{ maxWidth: 760", "className=\"lp-section\" style={{ padding: '90px 0' }}>\n        <div style={{ maxWidth: 760"),
    ("style={{ background: C.soft, padding: '90px 0' }}>\n        <div style={{ maxWidth: 760", "className=\"lp-section\" style={{ background: C.soft, padding: '90px 0' }}>\n        <div style={{ maxWidth: 760"),
]
for old, new in sections_to_patch:
    count = code.count(old)
    code = code.replace(old, new)
    print(f"✅ lp-section added ({count} occurrences): {old[:40]}...")

# Final CTA section
code = code.replace(
    "id=\"kontak\" style={{ padding: '90px 24px' }}",
    "id=\"kontak\" className=\"lp-section\" style={{ padding: '90px 24px' }}"
)
print("✅ lp-section added to kontak section")

# Inner max-width containers
code = code.replace(
    "style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}",
    "className=\"lp-inner\" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}"
)
print("✅ lp-inner added to all max-width containers")

with open(PATH, 'w') as f:
    f.write(code)

print("\n🎉 Patch selesai! Jalankan: pnpm --filter umrahme typecheck")
