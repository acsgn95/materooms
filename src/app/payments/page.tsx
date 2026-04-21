'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { CreditCard, ArrowRight, Clock, CheckCircle, XCircle, Lock } from 'lucide-react';
import Link from 'next/link';

const V2_ENABLED = false;

export default function PaymentsPage() {
  const paymentHistory = [
    { id: 'p1', type: 'rent', description: "Beşiktaş Ev — Nisan 2026 Kirası", amount: 7500, commission: 112, date: '2026-04-01', status: 'completed' as const, method: 'card' },
    { id: 'p2', type: 'rent', description: "Beşiktaş Ev — Mart 2026 Kirası", amount: 7500, commission: 112, date: '2026-03-01', status: 'completed' as const, method: 'card' },
    { id: 'p3', type: 'expense', description: 'Ortak Fatura — İnternet + Elektrik', amount: 850, commission: 8, date: '2026-03-15', status: 'completed' as const, method: 'papara' },
  ];

  const statusConfig = {
    completed: { icon: <CheckCircle size={16} className="text-secondary" />, label: 'Tamamlandı', color: 'text-secondary' },
    pending: { icon: <Clock size={16} className="text-amber-400" />, label: 'Bekliyor', color: 'text-amber-400' },
    failed: { icon: <XCircle size={16} className="text-red-400" />, label: 'Başarısız', color: 'text-red-400' },
  };

  const methodLabels: Record<string, string> = {
    card: 'Kredi/Banka Kartı',
    transfer: 'Banka Havalesi',
    papara: 'Papara',
    bkm_express: 'BKM Express',
  };

  if (!V2_ENABLED) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardHeader />
        <main className="container-main py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="card py-16">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={40} className="text-secondary" />
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">V2 — Yakında</span>
              <h1 className="text-3xl font-serif font-light text-white mt-4 mb-3">Güvenli Kira Ödemeleri</h1>
              <p className="text-white/40 mb-8">
                İyzico Marketplace altyapısıyla kira ve gider ödemelerini platform üzerinden yönet.
                Geç ödeme takibi, otomatik komisyon ve ödeme geçmişi bir arada.
              </p>
              <div className="grid grid-cols-2 gap-4 text-left mb-8">
                {[
                  { icon: '💳', text: 'Kredi kartı, Papara, BKM Express' },
                  { icon: '🔒', text: 'PCI-DSS uyumlu altyapı' },
                  { icon: '🔄', text: 'Aylık otomatik ödeme' },
                  { icon: '📊', text: 'Ödeme geçmişi ve raporlar' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg text-sm text-white/60">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Dashboard'a Dön <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <h1 className="text-4xl font-serif font-light text-white mb-2">Ödemeler</h1>
        <p className="text-white/40 mb-8">Kira ve gider ödemelerini buradan yönet</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-white/40 text-sm mb-1">Bu Ay Ödenen</p>
            <p className="text-3xl font-bold text-secondary">₺7.500</p>
            <p className="text-xs text-white/30 mt-1">Komisyon: ₺112</p>
          </div>
          <div className="card">
            <p className="text-white/40 text-sm mb-1">Toplam Ödeme</p>
            <p className="text-3xl font-bold text-white">₺{(7500 * 4).toLocaleString('tr-TR')}</p>
            <p className="text-xs text-white/30 mt-1">4 aylık</p>
          </div>
          <div className="card">
            <p className="text-white/40 text-sm mb-1">Sonraki Ödeme</p>
            <p className="text-3xl font-bold text-amber-400">1 Mayıs</p>
            <p className="text-xs text-white/30 mt-1">₺7.500</p>
          </div>
        </div>

        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Kira Ödemesi Yap</h2>
              <p className="text-white/40 text-sm mt-1">İyzico güvencesiyle anlık ödeme</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <CreditCard size={20} />
              Ödeme Başlat
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-6">Ödeme Geçmişi</h2>
          <div className="space-y-3">
            {paymentHistory.map((payment) => {
              const status = statusConfig[payment.status];
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:border-secondary/30 transition">
                  <div className="flex items-center gap-4">
                    {status.icon}
                    <div>
                      <p className="font-semibold text-sm text-white">{payment.description}</p>
                      <p className="text-xs text-white/40">
                        {new Date(payment.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {' · '}{methodLabels[payment.method]}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₺{payment.amount.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-white/40">Komisyon: ₺{payment.commission}</p>
                    <p className={`text-xs font-semibold ${status.color}`}>{status.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
