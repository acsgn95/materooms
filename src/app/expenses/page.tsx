'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Plus, ArrowRight, Lock, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const V2_ENABLED = false; // feature flag

type Expense = {
  id: string;
  description: string;
  totalAmount: number;
  myShare: number;
  paidBy: string;
  date: string;
  status: 'paid' | 'pending';
  category: 'internet' | 'electricity' | 'water' | 'cleaning' | 'other';
};

const categoryLabels: Record<string, string> = {
  internet: '📶 İnternet',
  electricity: '⚡ Elektrik',
  water: '💧 Su',
  cleaning: '🧹 Temizlik',
  other: '📦 Diğer',
};

export default function ExpensesPage() {
  const expenses: Expense[] = [
    { id: 'e1', description: 'Nisan İnternet Faturası', totalAmount: 400, myShare: 200, paidBy: 'Ahmet Yılmaz', date: '2026-04-10', status: 'paid', category: 'internet' },
    { id: 'e2', description: 'Nisan Elektrik Faturası', totalAmount: 620, myShare: 310, paidBy: 'Zeynep Kaya', date: '2026-04-12', status: 'pending', category: 'electricity' },
    { id: 'e3', description: 'Mart Temizlik', totalAmount: 300, myShare: 150, paidBy: 'Ahmet Yılmaz', date: '2026-03-20', status: 'paid', category: 'cleaning' },
  ];

  if (!V2_ENABLED) {
    return (
      <div className="min-h-screen bg-light">
        <DashboardHeader />
        <main className="container-main py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="card py-16">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={40} className="text-secondary" />
              </div>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">V2 — Yakında</span>
              <h1 className="text-3xl font-bold mt-4 mb-3">Ortak Gider Takibi</h1>
              <p className="text-gray-600 mb-8">
                Ev arkadaşlarınla fatura ve ortak giderleri kolayca böl, platform içinden ödeme iste.
                Tüm gider geçmişi ilerideki ev arkadaşlarına gösterilebilir.
              </p>
              <div className="grid grid-cols-2 gap-4 text-left mb-8">
                {[
                  { icon: '📊', text: 'Otomatik paylaşım hesaplama' },
                  { icon: '📱', text: 'Uygulama içi ödeme istekleri' },
                  { icon: '📋', text: 'Geçmiş gider raporları' },
                  { icon: '🔍', text: 'Şeffaf gider geçmişi' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-sm">
                    <span>{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
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

  const pendingTotal = expenses
    .filter((e) => e.status === 'pending')
    .reduce((sum, e) => sum + e.myShare, 0);

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Ortak Giderler</h1>
            <p className="text-gray-600 mt-1">Fatura ve ortak giderleri ev arkadaşlarınla böl</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Gider Ekle
          </button>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Bekleyen Ödeme</p>
            <p className="text-3xl font-bold text-warning">₺{pendingTotal.toLocaleString('tr-TR')}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Bu Ay Ödendi</p>
            <p className="text-3xl font-bold text-success">
              ₺{expenses.filter((e) => e.status === 'paid').reduce((s, e) => s + e.myShare, 0).toLocaleString('tr-TR')}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Toplam Gider</p>
            <p className="text-3xl font-bold">₺{expenses.reduce((s, e) => s + e.totalAmount, 0).toLocaleString('tr-TR')}</p>
          </div>
        </div>

        {/* Expense List */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Gider Listesi</h2>
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition">
                <div className="flex items-center gap-4">
                  {exp.status === 'paid' ? (
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                  ) : (
                    <Clock size={20} className="text-warning flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-sm">{exp.description}</p>
                    <p className="text-xs text-gray-500">
                      {categoryLabels[exp.category]} · Ödeyen: {exp.paidBy} ·{' '}
                      {new Date(exp.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="font-bold">₺{exp.myShare.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-gray-500">Toplam: ₺{exp.totalAmount.toLocaleString('tr-TR')}</p>
                  </div>
                  {exp.status === 'pending' && (
                    <button className="btn-primary text-sm px-4 py-2">Öde</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
