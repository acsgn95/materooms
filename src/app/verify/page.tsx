'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { ArrowLeft, CheckCircle, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const verifications = [
    { id: 'phone', title: 'Telefon Doğrulaması', description: 'SMS ile doğrula', status: 'completed', version: 'v1' },
    { id: 'id', title: 'Kimlik Doğrulaması', description: 'TC Kimlik kartı yükle', status: 'pending', version: 'v1' },
    { id: 'face', title: 'Yüz Doğrulaması', description: 'Canlı selfie ile doğrula — yakında', status: 'coming_soon', version: 'v2' },
    { id: 'photo', title: 'Fotoğraf Doğrulaması', description: 'Profil fotoğrafı eşleştirme — yakında', status: 'coming_soon', version: 'v2' },
    { id: 'record', title: 'Suç Kaydı Kontrolü', description: 'e-Devlet adli sicil belgesi — yakında', status: 'coming_soon', version: 'v2' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-serif font-light text-white mb-2">Doğrulama Adımları</h1>
          <p className="text-white/40 mb-12">
            Profilini doğrulayarak güvenilirliğini artır ve daha fazla olanağa erişebilirsin
          </p>

          {/* Verification Progress */}
          <div className="border border-secondary/20 bg-secondary/5 rounded-xl p-8 mb-12">
            <h2 className="font-semibold text-white mb-4">Doğrulama İlerlemesi</h2>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '20%' }} />
            </div>
            <p className="text-sm text-white/40 mt-2">1 / 5 adım tamamlandı</p>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {verifications.map((v) => (
              <div key={v.id}
                className={`card transition-all ${
                  v.status === 'completed' ? 'border-secondary/30 bg-secondary/5' :
                  v.status === 'coming_soon' ? 'opacity-50' : 'hover:border-white/20'
                }`}>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="pt-1">
                      {v.status === 'completed' ? (
                        <CheckCircle className="text-secondary" size={24} />
                      ) : v.status === 'coming_soon' ? (
                        <Lock className="text-white/30" size={24} />
                      ) : (
                        <Clock className="text-amber-400" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-white">{v.title}</h3>
                        {v.version === 'v2' && (
                          <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full font-semibold">V2</span>
                        )}
                      </div>
                      <p className="text-white/40 text-sm">{v.description}</p>
                      {v.status === 'completed' && (
                        <p className="text-secondary text-sm mt-2 font-semibold">✓ Tamamlandı</p>
                      )}
                    </div>
                  </div>

                  {v.status === 'pending' && <button className="btn-primary">Doğrula</button>}
                  {v.status === 'coming_soon' && <span className="text-sm text-white/30 font-medium px-4 py-3">Yakında</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Doğrulamanın Faydaları</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Daha Yüksek Görünürlük', desc: 'Doğrulanmış profiller arama sonuçlarında daha üstte görünür' },
                { title: 'Artan Güven', desc: 'Diğer kullanıcılar senin profiline daha fazla güven duyar' },
                { title: 'Daha İyi Matchler', desc: 'Doğrulanmış kullanıcılar ile eşleşme ihtimalin artar' },
                { title: 'Anında Ödeme İzni', desc: 'Yüksek puanla ödeme esnekliğinden faydalanabilirsin' },
              ].map((b) => (
                <div key={b.title} className="card">
                  <h3 className="font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-white/40 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
