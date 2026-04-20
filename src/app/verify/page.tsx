'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ArrowLeft, CheckCircle, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const verifications = [
    {
      id: 'phone',
      title: 'Telefon Doğrulaması',
      description: 'SMS ile doğrula',
      status: 'completed',
      badge: 'phone_verified',
      version: 'v1',
    },
    {
      id: 'id',
      title: 'Kimlik Doğrulaması',
      description: 'TC Kimlik kartı yükle',
      status: 'pending',
      badge: 'id_verified',
      version: 'v1',
    },
    {
      id: 'face',
      title: 'Yüz Doğrulaması',
      description: 'Canlı selfie ile doğrula — yakında',
      status: 'coming_soon',
      badge: 'face_verified',
      version: 'v2',
    },
    {
      id: 'photo',
      title: 'Fotoğraf Doğrulaması',
      description: 'Profil fotoğrafı eşleştirme — yakında',
      status: 'coming_soon',
      badge: 'photo_verified',
      version: 'v2',
    },
    {
      id: 'record',
      title: 'Suç Kaydı Kontrolü',
      description: 'e-Devlet adli sicil belgesi — yakında',
      status: 'coming_soon',
      badge: 'clean_record',
      version: 'v2',
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-dark mb-8">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">Doğrulama Adımları</h1>
          <p className="text-gray-600 mb-12">
            Profini doğrulayarak güvenilirliğini artır ve daha fazla olanağa erişebilirsin
          </p>

          {/* Verification Progress */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12">
            <h2 className="font-bold mb-4">Doğrulama İlerlemesi</h2>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">1 / 5 adım tamamlandı</p>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {verifications.map((verification) => (
              <div
                key={verification.id}
                className={`card transition-all ${
                  verification.status === 'completed'
                    ? 'bg-success/5 border-success/20'
                    : verification.status === 'coming_soon'
                    ? 'opacity-60'
                    : 'hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="pt-1">
                      {verification.status === 'completed' ? (
                        <CheckCircle className="text-success" size={24} />
                      ) : verification.status === 'coming_soon' ? (
                        <Lock className="text-gray-400" size={24} />
                      ) : (
                        <Clock className="text-warning" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{verification.title}</h3>
                        {verification.version === 'v2' && (
                          <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-semibold">
                            V2
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{verification.description}</p>
                      {verification.status === 'completed' && (
                        <p className="text-success text-sm mt-2 font-semibold">✓ Tamamlandı</p>
                      )}
                    </div>
                  </div>

                  {verification.status === 'pending' && (
                    <button className="btn-primary">
                      Doğrula
                    </button>
                  )}
                  {verification.status === 'coming_soon' && (
                    <span className="text-sm text-gray-400 font-medium px-4 py-3">Yakında</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Doğrulamanın Faydaları</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold mb-2">Daha Yüksek Görünürlük</h3>
                <p className="text-gray-600">
                  Doğrulanmış profiller arama sonuçlarında daha üstte görünür
                </p>
              </div>
              <div className="card">
                <h3 className="font-bold mb-2">Artan Güven</h3>
                <p className="text-gray-600">
                  Diğer kullanıcılar senin profine daha fazla güven duyar
                </p>
              </div>
              <div className="card">
                <h3 className="font-bold mb-2">Daha İyi Matchler</h3>
                <p className="text-gray-600">
                  Doğrulanmış kullanıcılar ile eşleşme ihtimalin artar
                </p>
              </div>
              <div className="card">
                <h3 className="font-bold mb-2">Anında Ödeme İzni</h3>
                <p className="text-gray-600">
                  Yüksek puanla ödeme esnekliğinden faydalanabilirsin
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
