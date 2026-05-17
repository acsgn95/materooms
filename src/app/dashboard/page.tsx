'use client';

import { useState } from 'react';
import { DashboardHeader, ScoreBadge, VerificationBadges } from '@/components/common/DashboardHeader';
import { Plus, MessageSquare, Heart, TrendingUp, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const user = { name: 'Ahmet Yılmaz', phone: '+90 555 123 45 67', city: 'İstanbul', verificationBadges: ['phone_verified', 'id_verified'], flatmateScore: 720 };

  const [listings, setListings] = useState([
    { id: '1', title: "Beşiktaş'ta 2+1 Ev — Arkadaş Aranıyor", district: 'Beşiktaş', monthlyRent: { full: 15000, perPerson: 7500 }, residents: { current: 1, total: 2 }, messages: 3, views: 47, expiresAt: '2026-05-18' },
    { id: '2', title: "Şişli'de Oda Arıyorum", district: 'Şişli', monthlyRent: { full: 8000, perPerson: 8000 }, residents: { current: 0, total: 2 }, messages: 1, views: 12, expiresAt: '2026-06-19' },
  ]);

  const recentMessages = [
    { id: '1', user: 'Zeynep Kaya', message: "Beşiktaş'taki oda hakkında sorularım var", time: '2 saat önce', unread: true },
    { id: '2', user: 'Ali Demir', message: 'Oda hâlâ müsait mi? Ne zaman taşınabilirim?', time: '1 gün önce', unread: false },
  ];

  const renewListing = (id: string) => {
    setListings((prev) => prev.map((l) => {
      if (l.id !== id) return l;
      const d = new Date(); d.setDate(d.getDate() + 60);
      return { ...l, expiresAt: d.toISOString().split('T')[0] };
    }));
  };

  const daysLeft = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-10">
        {/* Welcome */}
        <div className="border border-white/10 rounded-2xl p-8 mb-10 bg-zinc-900/50 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-light text-white mb-1">Hoş Geldin, {user.name}</h1>
            <p className="text-white/40 text-sm">{user.city} · Güvenilir arkadaş bulmaya hazır mısın?</p>
          </div>
          <Link href="/listings/create" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> İlan Oluştur
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Aktif İlanlar', value: listings.length, icon: <Plus size={20} />, color: 'text-secondary' },
            { label: 'Yeni Mesajlar', value: recentMessages.filter(m => m.unread).length, icon: <MessageSquare size={20} />, color: 'text-secondary' },
            { label: 'Favoriler', value: 5, icon: <Heart size={20} />, color: 'text-secondary' },
            { label: 'Puanım', value: user.flatmateScore, icon: <TrendingUp size={20} />, color: 'text-secondary' },
          ].map((s) => (
            <div key={s.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                <span className={s.color}>{s.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <div className="card">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                  <p className="text-white/40 text-sm">{user.phone}</p>
                </div>
                <Link href="/profile" className="btn-outline text-sm px-4 py-2">Düzenle</Link>
              </div>
              <VerificationBadges badges={user.verificationBadges} />
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/verify" className="text-secondary text-sm hover:underline flex items-center gap-1">
                  Daha fazla doğrula <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Active listings */}
            <div className="card">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-white">Aktif İlanlar</h2>
                <Link href="/listings/create" className="btn-primary text-sm px-4 py-2">Yeni İlan</Link>
              </div>
              <div className="space-y-3">
                {listings.map((l) => {
                  const days = daysLeft(l.expiresAt);
                  return (
                    <div key={l.id} className="border border-white/10 rounded-xl p-4 hover:border-secondary/30 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-white text-sm">{l.title}</h3>
                          <p className="text-white/40 text-xs mt-0.5">{l.district} · {l.residents.current}/{l.residents.total} kişi</p>
                        </div>
                        <p className="text-secondary font-bold">₺{l.monthlyRent.perPerson?.toLocaleString('tr-TR')}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs text-white/40 border-t border-white/5 pt-3">
                        <span>{l.messages} mesaj · {l.views} görüntülenme</span>
                        <button onClick={() => renewListing(l.id)}
                          className={`flex items-center gap-1 transition ${days <= 7 ? 'text-amber-400 hover:text-amber-300' : 'text-white/30 hover:text-white/60'}`}>
                          {days <= 7 ? <AlertTriangle size={11} /> : <RefreshCw size={11} />}
                          {days}g kaldı
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Score */}
            <div className="card text-center">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Flatmate Puanı</p>
              <ScoreBadge score={user.flatmateScore} />
              <Link href="/scores" className="block mt-4 text-secondary text-sm hover:underline">Detaylar →</Link>
            </div>

            {/* Messages */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white">Son Mesajlar</h3>
                <Link href="/messages" className="text-secondary text-xs hover:underline">Tümü</Link>
              </div>
              <div className="space-y-2">
                {recentMessages.map((m) => (
                  <Link key={m.id} href="/messages"
                    className={`block p-3 rounded-lg border transition ${m.unread ? 'border-secondary/30 bg-secondary/5' : 'border-white/5 hover:border-white/10'}`}>
                    <p className="text-white text-sm font-medium">{m.user}</p>
                    <p className="text-white/40 text-xs truncate mt-0.5">{m.message}</p>
                    <p className="text-white/30 text-xs mt-1">{m.time}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-5">Hızlı İşlemler</p>
              <div className="space-y-3">
                <Link href="/listings" className="btn-secondary flex w-full justify-center text-center text-sm py-2.5">İlanları Ara</Link>
                <Link href="/verify" className="btn-secondary flex w-full justify-center text-center text-sm py-2.5">Doğrulamayı Tamamla</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
