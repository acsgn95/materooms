'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ScoreBadge, VerificationBadges } from '@/components/common/DashboardHeader';
import { Plus, MessageSquare, Bookmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    phone: '+90 555 123 45 67',
    city: 'İstanbul',
    verificationBadges: ['phone_verified', 'id_verified'],
    flatmateScore: 720,
  };

  // Mock listings
  const listings = [
    {
      id: '1',
      title: 'Besiktaş\'ta 2+1 Ev - Arkadaş Aranıyor',
      city: 'İstanbul',
      district: 'Beşiktaş',
      monthlyRent: { full: 15000, perPerson: 7500 },
      residents: { current: 1, total: 2 },
      moveInDate: '2026-05-01',
      messages: 3,
      views: 47,
    },
    {
      id: '2',
      title: 'Şişli\'de Oda Arıyorum',
      city: 'İstanbul',
      district: 'Şişli',
      monthlyRent: { full: 8000, perPerson: 8000 },
      residents: { current: 0, total: 2 },
      moveInDate: '2026-06-01',
      messages: 1,
      views: 12,
    },
  ];

  const recentMessages = [
    {
      id: '1',
      user: 'Zeynep Kaya',
      message: 'Beşiktaş\'taki oda hakkında sorularım var',
      time: '2 saat önce',
      unread: true,
    },
    {
      id: '2',
      user: 'Ali Demir',
      message: 'Oda hâlâ müsait mi? Ne zaman taşınabilirim?',
      time: '1 gün önce',
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white mb-12">
          <h1 className="text-4xl font-bold mb-2">Hoş Geldin, {user.name}!</h1>
          <p className="text-white/80">İstanbul'da güvenilir arkadaş bulmaya hazır mısın?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Aktif İlanlar</p>
                <p className="text-3xl font-bold">{listings.length}</p>
              </div>
              <Plus className="text-primary" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Yeni Mesajlar</p>
                <p className="text-3xl font-bold">
                  {recentMessages.filter((m) => m.unread).length}
                </p>
              </div>
              <MessageSquare className="text-secondary" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favori İlanlar</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <Bookmark className="text-success" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Puanın</p>
                <p className="text-3xl font-bold">{user.flatmateScore}</p>
              </div>
              <TrendingUp className="text-warning" size={32} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.phone}</p>
                </div>
                <Link href="/profile" className="btn-outline">
                  Profili Düzenle
                </Link>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Doğrulama Durumu</p>
                  <VerificationBadges badges={user.verificationBadges} />
                </div>
                <div className="pt-4 border-t">
                  <Link href="/verify" className="text-primary font-semibold hover:underline">
                    → Daha Fazla Doğrulama Adımı Tamamla
                  </Link>
                </div>
              </div>
            </div>

            {/* Active Listings */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Aktif İlanlar</h2>
                <Link href="/listings/create" className="btn-primary">
                  Yeni İlan Oluştur
                </Link>
              </div>

              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-dark hover:text-primary cursor-pointer">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {listing.city} - {listing.district}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ₺{listing.monthlyRent.full.toLocaleString('tr-TR')}
                        </p>
                        <p className="text-xs text-gray-600">
                          {listing.residents.current}/{listing.residents.total} kişi
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                      <span>{listing.messages} yeni mesaj</span>
                      <span>{listing.views} görüntülenme</span>
                      <span>Başlangıç: {new Date(listing.moveInDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Score Card */}
            <div className="card text-center">
              <h3 className="font-bold text-dark mb-4">Flatmate Puanı</h3>
              <ScoreBadge score={user.flatmateScore} />
              <p className="text-xs text-gray-600 mt-4">
                Ödeme düzenliliğiniz ve doğrulamanız temelinde hesaplanmıştır
              </p>
            </div>

            {/* Recent Messages */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-dark">Son Mesajlar</h3>
                <Link href="/messages" className="text-primary text-sm hover:underline">
                  Tümü
                </Link>
              </div>

              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg border ${
                      msg.unread
                        ? 'bg-primary/5 border-primary'
                        : 'bg-gray-50 border-gray-200'
                    } hover:border-primary transition cursor-pointer`}
                  >
                    <p className="font-semibold text-sm">{msg.user}</p>
                    <p className="text-xs text-gray-600 truncate">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-bold text-dark mb-4">Hızlı İşlemler</h3>
              <div className="space-y-2">
                <Link href="/listings" className="block btn-outline text-center">
                  İlanları Ara
                </Link>
                <Link href="/verify" className="block btn-secondary text-center">
                  Doğrulama Tamamla
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
