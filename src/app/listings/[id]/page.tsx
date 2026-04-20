'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { VerificationBadges, ScoreBadge } from '@/components/common/DashboardHeader';
import { ArrowLeft, MapPin, Users, Calendar, Wifi, Sofa, WashingMachine, Wind, MessageSquare, Heart, Share2, Flag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ListingDetailPage() {
  const params = useParams();

  // Mock data — replace with API call using params.id
  const listing = {
    id: params.id,
    type: 'room_available',
    title: "Beşiktaş'ta 2+1 Ev — Arkadaş Aranıyor",
    description:
      "Ortaköy'de deniz manzaralı, 2+1 ferah dairede ev arkadaşı arıyoruz. Ev tamamen mobilyalı, internet dahil. Temiz, saygılı ve sosyal biri arıyoruz. Hafta sonları evde olabilirsiniz, misafir kabulü önceden haber vermek koşuluyla uygun.",
    city: 'İstanbul',
    district: 'Beşiktaş',
    neighborhood: 'Ortaköy',
    monthlyRent: { full: 15000, perPerson: 7500 },
    moveInDate: '2026-05-01',
    residents: { current: 1, total: 2 },
    houseRules: {
      smoking: false,
      pets: false,
      genderPreference: 'any',
      quietHours: { start: '23:00', end: '08:00' },
    },
    amenities: ['furnished', 'internet', 'washing_machine', 'balcony', 'ac'],
    photos: ['🏘️', '🛋️', '🛏️', '🚿'],
    expiresAt: '2026-06-20',
    createdAt: '2026-04-20',
  };

  const owner = {
    id: 'u1',
    name: 'Ahmet Yılmaz',
    age: 27,
    occupation: 'Yazılım Mühendisi',
    city: 'İstanbul',
    verificationBadges: ['phone_verified', 'id_verified'],
    flatmateScore: 720,
    bio: 'Çalışkan, temiz ve saygılı birisiyim. Evde düzen önemli.',
    memberSince: '2026-01-01',
  };

  const amenityLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    furnished: { label: 'Mobilyalı', icon: <Sofa size={16} /> },
    internet: { label: 'İnternet', icon: <Wifi size={16} /> },
    washing_machine: { label: 'Çamaşır Makinesi', icon: <WashingMachine size={16} /> },
    balcony: { label: 'Balkon', icon: <Wind size={16} /> },
    ac: { label: 'Klima', icon: <Wind size={16} /> },
  };

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/listings" className="flex items-center gap-2 text-gray-600 hover:text-dark mb-8">
          <ArrowLeft size={20} />
          İlanlara Dön
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="grid grid-cols-4 gap-2 h-64">
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-8xl">
                {listing.photos[0]}
              </div>
              {listing.photos.slice(1).map((p, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl flex items-center justify-center text-4xl"
                >
                  {p}
                </div>
              ))}
            </div>

            {/* Title & Actions */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full mb-2 inline-block">
                    {listing.type === 'room_available'
                      ? 'Oda Var'
                      : listing.type === 'looking_for_room'
                      ? 'Oda Arıyorum'
                      : 'Birlikte Ara'}
                  </span>
                  <h1 className="text-3xl font-bold">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MapPin size={16} className="text-primary" />
                    {listing.city} / {listing.district} / {listing.neighborhood}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-primary transition">
                    <Heart size={20} className="text-primary" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-primary transition">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:border-danger transition">
                    <Flag size={20} className="text-danger" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    ₺{listing.monthlyRent.perPerson?.toLocaleString('tr-TR')}
                  </p>
                  <p className="text-xs text-gray-600">Kişi Başı / Ay</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold">
                    <Users size={20} className="text-secondary" />
                    {listing.residents.current}/{listing.residents.total}
                  </div>
                  <p className="text-xs text-gray-600">Mevcut / Toplam Kişi</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold">
                    <Calendar size={20} className="text-success" />
                    {new Date(listing.moveInDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                  </div>
                  <p className="text-xs text-gray-600">Giriş Tarihi</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Ev Özellikleri</h2>
              <div className="grid grid-cols-3 gap-3">
                {listing.amenities.map((a) => {
                  const config = amenityLabels[a];
                  return config ? (
                    <div key={a} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium">
                      {config.icon}
                      {config.label}
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Ev Kuralları</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className={`flex items-center gap-2 p-3 rounded-lg ${listing.houseRules.smoking ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {listing.houseRules.smoking ? '🚬 Sigara İçilebilir' : '🚭 Sigara Yasak'}
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${listing.houseRules.pets ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {listing.houseRules.pets ? '🐾 Evcil Hayvan Uygun' : '🚫 Evcil Hayvan Yasak'}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-gray-700">
                  🌙 Sessiz Saat: {listing.houseRules.quietHours?.start} – {listing.houseRules.quietHours?.end}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 text-gray-700">
                  👥 Cinsiyet: {listing.houseRules.genderPreference === 'any' ? 'Fark Etmez' : listing.houseRules.genderPreference}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Owner & CTA */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="card sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary">
                  ₺{listing.monthlyRent.perPerson?.toLocaleString('tr-TR')}
                  <span className="text-base font-normal text-gray-600">/ay</span>
                </p>
                <p className="text-sm text-gray-600">Toplam kira: ₺{listing.monthlyRent.full.toLocaleString('tr-TR')}</p>
              </div>

              <Link href="/messages" className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                <MessageSquare size={20} />
                Mesaj Gönder
              </Link>
              <button className="btn-outline w-full">Favorilere Ekle</button>

              <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
                İlan {new Date(listing.expiresAt).toLocaleDateString('tr-TR')} tarihine kadar geçerli
              </div>
            </div>

            {/* Owner Card */}
            <div className="card">
              <h3 className="font-bold mb-4">İlan Sahibi</h3>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {owner.name[0]}
                </div>
                <div>
                  <p className="font-bold text-lg">{owner.name}</p>
                  <p className="text-sm text-gray-600">{owner.age} yaş · {owner.occupation}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(owner.memberSince).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })} üye
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <VerificationBadges badges={owner.verificationBadges} />
              </div>

              <div className="mb-4">
                <ScoreBadge score={owner.flatmateScore} />
              </div>

              {owner.bio && (
                <p className="text-sm text-gray-600 italic border-t pt-3">"{owner.bio}"</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
