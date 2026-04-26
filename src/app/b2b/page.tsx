'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Building2, BarChart3, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Başlangıç',
    price: '2.500',
    listings: 10,
    features: ['10 aktif ilan', 'Temel analitik', 'E-posta desteği'],
    cta: 'Hemen Başla',
    highlighted: false,
  },
  {
    name: 'Büyüme',
    price: '6.500',
    listings: 50,
    features: ['50 aktif ilan', 'Gelişmiş analitik', 'Öncelikli sıralama', 'Doğrulanmış kiracı havuzu', 'Öncelikli destek'],
    cta: 'En Popüler',
    highlighted: true,
  },
  {
    name: 'Kurumsal',
    price: 'Teklif Al',
    listings: -1,
    features: ['Sınırsız ilan', 'Tam analitik & raporlar', 'API erişimi', 'Özel hesap yöneticisi', 'SLA garantisi'],
    cta: 'Bize Ulaşın',
    highlighted: false,
  },
];

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-white/10 py-20">
          <div className="container-main text-center">
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">Kurumsal Çözümler</span>
            <h1 className="text-5xl font-serif font-light text-white mt-4 mb-4">Gayrimenkul Profesyonelleri için MateRooms</h1>
            <p className="text-xl text-white/40 max-w-2xl mx-auto mb-8">
              Toplu ilan yönetimi, doğrulanmış kiracı havuzu ve güçlü analitik araçlarla portföyünüzü büyütün.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#plans" className="btn-primary">Planları Gör</a>
              <Link href="/dashboard" className="btn-outline">Demo İste</Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-b border-white/10">
          <div className="container-main">
            <h2 className="text-3xl font-serif font-light text-white text-center mb-12">Kurumsal Avantajlar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Building2 size={32} className="text-secondary" />, title: 'Toplu İlan Yönetimi', desc: 'Tüm ilanlarınızı tek panelden oluşturun ve yönetin' },
                { icon: <Users size={32} className="text-secondary" />, title: 'Doğrulanmış Kiracı Havuzu', desc: 'KYC doğrulamalı, puanlı kiracı profillerine öncelikli erişim' },
                { icon: <Star size={32} className="text-amber-400" />, title: 'Öncelikli Sıralama', desc: 'İlanlarınız arama sonuçlarında üst sıralarda görünür' },
                { icon: <BarChart3 size={32} className="text-secondary" />, title: 'Analitik Dashboard', desc: 'İlan performansı, görüntüleme ve dönüşüm raporları' },
              ].map((f, i) => (
                <div key={i} className="card text-center">
                  <div className="flex justify-center mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="plans" className="py-16 border-b border-white/10">
          <div className="container-main">
            <h2 className="text-3xl font-serif font-light text-white text-center mb-4">Planlar & Fiyatlandırma</h2>
            <p className="text-white/40 text-center mb-12">İlan hacminize göre uygun planı seçin</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PLANS.map((plan) => (
                <div key={plan.name} className={`card flex flex-col relative ${plan.highlighted ? 'border-secondary shadow-[0_0_30px_rgba(232,25,44,0.15)]' : ''}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full" style={{ background: '#B91C2E' }}>
                      En Popüler
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.listings > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-secondary">₺{plan.price}</span>
                        <span className="text-white/40">/ay</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-secondary">{plan.price}</span>
                    )}
                    {plan.listings > 0 && (
                      <p className="text-sm text-white/40 mt-1">Maks. {plan.listings} ilan</p>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={plan.highlighted ? 'btn-primary w-full' : 'btn-outline w-full'}>
                    {plan.cta} <ArrowRight size={16} className="inline ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-main text-center">
            <h2 className="text-2xl font-semibold text-white mb-3">Hemen başlamak ister misiniz?</h2>
            <p className="text-white/40 mb-6">Uzmanlarımız size en uygun planı belirlemede yardımcı olsun</p>
            <a href="mailto:b2b@materooms.com" className="btn-primary inline-flex items-center gap-2">
              b2b@materooms.com ile İletişime Geç <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
