'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ScoresPage() {
  const score = {
    total: 720,
    components: {
      paymentRegularity: { value: 38, max: 40, weight: '40%', label: 'Ödeme Düzenliliği' },
      paymentPunctuality: { value: 16, max: 20, weight: '20%', label: 'Ödeme Zamanlaması' },
      disputeHistory: { value: 20, max: 20, weight: '20%', label: 'Uyuşmazlık Geçmişi' },
      verificationLevel: { value: 9, max: 15, weight: '15%', label: 'Doğrulama Seviyesi' },
      profileCompleteness: { value: 4, max: 5, weight: '5%', label: 'Profil Tamlığı' },
    },
    history: [
      { month: 'Kasım 2025', score: 640 },
      { month: 'Aralık 2025', score: 660 },
      { month: 'Ocak 2026', score: 680 },
      { month: 'Şubat 2026', score: 695 },
      { month: 'Mart 2026', score: 710 },
      { month: 'Nisan 2026', score: 720 },
    ],
  };

  const recentEvents = [
    { id: 'e1', type: 'positive', description: 'Nisan kirası zamanında ödendi', date: '2026-04-01', points: '+5' },
    { id: 'e2', type: 'positive', description: 'Mart kirası zamanında ödendi', date: '2026-03-01', points: '+5' },
    { id: 'e3', type: 'positive', description: 'Kimlik doğrulaması tamamlandı', date: '2026-02-10', points: '+15' },
    { id: 'e4', type: 'negative', description: 'Şubat kirası 2 gün geç ödendi', date: '2026-02-03', points: '-8' },
  ];

  const getBandInfo = (s: number) => {
    if (s >= 750) return { label: 'Altın', color: 'text-amber-400', border: 'border-amber-500/30', description: 'Anlık onay ilanlarına erişim hakkın var' };
    if (s >= 500) return { label: 'İyi', color: 'text-secondary', border: 'border-secondary/30', description: 'Güvenilir bir profil — çoğu ev sahibi onaylayacaktır' };
    if (s >= 250) return { label: 'Orta', color: 'text-yellow-400', border: 'border-yellow-500/30', description: 'Ödeme düzenliliğini artırarak puanını yükselt' };
    return { label: 'Düşük', color: 'text-red-400', border: 'border-red-500/30', description: 'Platform üzerinden ödeme zorunlu' };
  };

  const band = getBandInfo(score.total);
  const maxHistory = Math.max(...score.history.map((h) => h.score));

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/profile" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Profile Dön
        </Link>

        <h1 className="text-4xl font-serif font-light text-white mb-2">Flatmate Puanı</h1>
        <p className="text-white/40 mb-8">
          Puanın ödeme davranışına göre otomatik hesaplanır — manipüle edilemez
        </p>

        {/* Score Hero */}
        <div className={`card mb-8 border ${band.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-end gap-3 mb-2">
                <span className={`text-7xl font-bold ${band.color}`}>{score.total}</span>
                <span className="text-2xl text-white/30 mb-3">/ 1000</span>
              </div>
              <span className={`text-2xl font-bold ${band.color}`}>{band.label}</span>
              <p className="text-white/40 mt-2">{band.description}</p>
            </div>
            <TrendingUp size={64} className={`${band.color} opacity-30`} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-6">Puan Bileşenleri</h2>
            <div className="space-y-4">
              {Object.values(score.components).map((comp) => {
                const pct = (comp.value / comp.max) * 100;
                return (
                  <div key={comp.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-white">{comp.label}</span>
                      <span className="text-white/40">
                        {comp.value * (1000 / 100)}/{comp.max * (1000 / 100)} puan
                        <span className="text-white/25 ml-1">({comp.weight})</span>
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${pct >= 80 ? 'bg-secondary' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Score History */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-6">Son 6 Ay</h2>
            <div className="flex items-end gap-2 h-32">
              {score.history.map((h) => {
                const heightPct = (h.score / maxHistory) * 100;
                return (
                  <div key={h.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-white">{h.score}</span>
                    <div className="w-full bg-secondary rounded-t-md transition-all" style={{ height: `${heightPct}%` }} />
                    <span className="text-white/30" style={{ fontSize: '10px' }}>{h.month.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Son Puan Olayları</h2>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3">
                  {event.type === 'positive' ? (
                    <CheckCircle size={18} className="text-secondary flex-shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-sm text-white">{event.description}</p>
                    <p className="text-xs text-white/40">
                      {new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${event.type === 'positive' ? 'text-secondary' : 'text-red-400'}`}>
                  {event.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Appeals */}
        <div className="card border-amber-500/30">
          <h2 className="text-lg font-semibold text-white mb-2">Puan İtirazı</h2>
          <p className="text-white/40 text-sm mb-4">
            Bir puan olayının hatalı olduğunu düşünüyorsan 30 gün içinde itiraz edebilirsin.
            İnceleme tamamlandığında hatalı olay puan hesabından çıkarılır.
          </p>
          <button className="btn-outline border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
            İtiraz Başlat
          </button>
        </div>
      </main>
    </div>
  );
}
