'use client';

import Link from 'next/link';
import { Zap, ArrowRight, Shield, Star } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nProvider';

export default function Home() {
  const { messages } = useI18n();
  const home = messages.home;
  const featureIcons = [
    <Shield key="shield" size={28} />,
    <Zap key="zap" size={28} />,
    <Star key="star" size={28} />,
  ];

  return (
    <div className="min-h-screen bg-black font-sans">
      <section className="relative min-h-screen flex flex-col">
        <div
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{ background: 'linear-gradient(90deg, #B91C2E 0%, #C8602A 100%)' }}
        />

        <HeroSlideshow />

        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="#features" className="hover:text-white transition">
              {home.nav.features}
            </Link>
            <Link href="#how" className="hover:text-white transition">
              {home.nav.how}
            </Link>
            <Link href="/b2b" className="hover:text-white transition">
              {home.nav.business}
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="MateRooms" className="h-72 object-contain" />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <LanguageSwitcher />
            <Link href="/auth/login" className="text-white/80 hover:text-white transition font-medium">
              {home.nav.login}
            </Link>
            <Link href="/auth/register" className="btn-primary !px-5 !py-2 !text-sm">
              {home.nav.register}
            </Link>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex items-center px-8 md:px-20">
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#C8602A' }}
            >
              {home.hero.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl text-white font-serif font-light leading-tight mb-8">
              {home.hero.title}
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-lg leading-relaxed">
              {home.hero.description}
            </p>
            <div className="flex gap-4">
              <Link href="/auth/register" className="btn-primary flex items-center gap-2">
                {home.hero.primaryCta} <ArrowRight size={18} />
              </Link>
              <Link
                href="#features"
                className="border border-white/40 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition"
              >
                {home.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10">
          <div className="flex divide-x divide-white/10">
            {home.stats.map((stat) => (
              <div key={stat.label} className="flex-1 py-5 text-center">
                <div className="text-2xl font-bold brand-gradient-text">{stat.value}</div>
                <div className="text-white/50 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-black py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C8602A' }}>
            {home.features.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl text-white font-serif font-light mb-16 max-w-xl">
            {home.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {home.features.items.map((feature, index) => (
              <div
                key={feature.title}
                className="border border-white/10 rounded-2xl p-8 transition hover:border-red-500/40"
                style={{ transition: 'border-color 0.2s' }}
              >
                <div className="mb-5 brand-gradient-text">{featureIcons[index]}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-zinc-950 py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C8602A' }}>
            {home.how.eyebrow}
          </p>
          <h2 className="text-4xl text-white font-serif font-light mb-16">{home.how.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {home.how.steps.map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="text-5xl font-bold leading-none flex-shrink-0 brand-gradient-text opacity-40">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-24 px-8 text-center border-t border-white/10">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">-</p>
        <h2 className="text-4xl md:text-5xl text-white/80 font-serif font-light mb-8">
          {home.contact.title}
        </h2>
        <p className="text-white/40 mb-10">{home.contact.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@materooms.com"
            className="border border-white/20 text-white/70 px-8 py-3 rounded-full hover:border-red-500/50 hover:text-white transition text-sm"
          >
            hello@materooms.com
          </a>
          <Link href="/auth/register" className="btn-primary text-sm flex items-center justify-center gap-2">
            {home.contact.cta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-10 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo.png" alt="MateRooms" className="h-72 object-contain" />
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition">
              {home.footer.privacy}
            </a>
            <a href="#" className="hover:text-white transition">
              {home.footer.terms}
            </a>
            <Link href="/b2b" className="hover:text-white transition">
              {home.footer.business}
            </Link>
          </div>
          <p className="text-white/30 text-sm">{home.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
