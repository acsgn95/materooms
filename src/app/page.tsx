import Link from "next/link";
import { Zap, ArrowRight, Shield, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col">

        {/* Teal top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-20" />

        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="#features" className="hover:text-white transition">Özellikler</Link>
            <Link href="#how" className="hover:text-white transition">Nasıl Çalışır</Link>
            <Link href="/b2b" className="hover:text-white transition">Kurumsal</Link>
          </div>

          {/* Centered logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-white font-bold tracking-[0.3em] text-sm uppercase">
            MateRooms
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/auth/login" className="text-white/80 hover:text-white transition font-medium">
              Giriş Yap
            </Link>
            <Link href="/auth/register"
              className="bg-secondary text-white px-5 py-2 rounded-full font-semibold hover:bg-cyan-500 transition text-sm">
              Kaydol
            </Link>
          </div>
        </nav>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex items-center px-8 md:px-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl text-white font-serif font-light leading-tight mb-8">
              Konaklamada yenilikçi deneyim
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-lg leading-relaxed">
              Doğrulanmış kimlik, güvenli ödemeler ve objektif puanlama sistemiyle Türkiye'nin en güvenilir flatmate platformu.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/register"
                className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition flex items-center gap-2">
                Hemen Başla <ArrowRight size={18} />
              </Link>
              <Link href="#features"
                className="border border-white/40 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition">
                Keşfet
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10">
          <div className="flex divide-x divide-white/10">
            {[
              { value: '340%', label: 'Kira Artışı (3 Yıl)' },
              { value: '1000+', label: 'İlk Kullanıcı' },
              { value: '3', label: 'Büyük Şehir' },
              { value: '%100', label: 'Doğrulanmış Üye' },
            ].map((s) => (
              <div key={s.label} className="flex-1 py-5 text-center">
                <div className="text-secondary text-2xl font-bold">{s.value}</div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="bg-black py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-4">Neden MateRooms?</p>
          <h2 className="text-4xl md:text-5xl text-white font-serif font-light mb-16 max-w-xl">
            Güven, tüm kararların merkezinde
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={28} />, title: 'Doğrulanmış Kimlik', desc: 'Telefon, TC Kimlik, yüz eşleştirmesi ve suç kaydı kontrolü ile çok katmanlı KYC.' },
              { icon: <Zap size={28} />, title: 'Güvenli Ödemeler', desc: 'İyzico altyapısıyla kira ve gider ödemeleri. Otomatik komisyon, anında transfer.' },
              { icon: <Star size={28} />, title: 'Flatmate Puanı', desc: 'Ödeme davranışından türetilen, manipüle edilemeyen taşınabilir itibar skoru.' },
            ].map((f) => (
              <div key={f.title} className="border border-white/10 rounded-2xl p-8 hover:border-secondary/50 transition">
                <div className="text-secondary mb-5">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how" className="bg-zinc-950 py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-4">Nasıl Çalışır?</p>
          <h2 className="text-4xl text-white font-serif font-light mb-16">Üç adımda başla</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Kaydol & Doğrula', desc: 'Telefon numaranla kaydol. TC kimliğini yükle, profilini tamamla.' },
              { step: '02', title: 'İlan Oluştur veya Ara', desc: 'Üç ilan tipinden birini seç. Filtrelerle ideal eşleşmeyi bul.' },
              { step: '03', title: 'Güvenle Taşın', desc: 'Doğrulanmış profiller, puan geçmişi ve güvenli ödeme altyapısıyla huzurla başla.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-6">
                <div className="text-secondary/30 text-5xl font-bold leading-none flex-shrink-0">{s.step}</div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section className="bg-black py-24 px-8 text-center border-t border-white/10">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">—</p>
        <h2 className="text-4xl md:text-5xl text-white/80 font-serif font-light mb-8">Contact Us</h2>
        <p className="text-white/40 mb-10">Sorularınız için bize ulaşın</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:hello@materooms.com"
            className="border border-white/20 text-white/70 px-8 py-3 rounded-full hover:border-secondary hover:text-secondary transition text-sm">
            hello@materooms.com
          </a>
          <Link href="/auth/register"
            className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition text-sm flex items-center justify-center gap-2">
            Platforma Katıl <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-10 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold tracking-[0.3em] text-sm uppercase">MateRooms</div>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition">Gizlilik</a>
            <a href="#" className="hover:text-white transition">Kullanıcı Sözleşmesi</a>
            <Link href="/b2b" className="hover:text-white transition">Kurumsal</Link>
          </div>
          <p className="text-white/30 text-sm">© 2026 MateRooms</p>
        </div>
      </footer>
    </div>
  );
}
