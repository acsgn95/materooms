'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { VerificationBadges, ScoreBadge } from '@/components/common/DashboardHeader';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Ahmet Yılmaz',
    age: '27',
    gender: 'male',
    city: 'istanbul',
    neighborhood: 'Beşiktaş',
    occupation: 'Yazılım Mühendisi',
    budgetMin: '5000',
    budgetMax: '10000',
    bio: 'Çalışkan, temiz ve saygılı birisiyim. Evde düzen önemli.',
    sleepSchedule: 'normal',
    cleanlinessLevel: 'clean',
    smoking: false,
    pets: false,
    guests: 'sometimes',
    noiseTolerance: 'medium',
  });

  const verificationBadges = ['phone_verified', 'id_verified'];
  const flatmateScore = 720;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-light">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-dark mb-8">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        {saved && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg text-success font-semibold">
            ✓ Profil kaydedildi
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Avatar & Score */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="card text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                  {profile.name[0]}
                </div>
                {editing && (
                  <button className="absolute bottom-0 right-0 bg-white border-2 border-primary rounded-full p-1.5 hover:bg-primary/10 transition">
                    <Camera size={16} className="text-primary" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600 text-sm">{profile.occupation}</p>
              <p className="text-gray-500 text-sm">{profile.city === 'istanbul' ? 'İstanbul' : profile.city} · {profile.neighborhood}</p>
            </div>

            {/* Verification Badges */}
            <div className="card">
              <h3 className="font-bold mb-3">Doğrulama Durumu</h3>
              <VerificationBadges badges={verificationBadges} />
              <Link href="/verify" className="block mt-3 text-primary text-sm font-semibold hover:underline">
                → Daha fazla doğrula
              </Link>
            </div>

            {/* Score */}
            <div className="card text-center">
              <h3 className="font-bold mb-3">Flatmate Puanı</h3>
              <ScoreBadge score={flatmateScore} />
              <Link href="/scores" className="block mt-3 text-primary text-sm font-semibold hover:underline">
                → Puan detayları
              </Link>
            </div>
          </div>

          {/* Right — Edit Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Info */}
              <div className="card space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Temel Bilgiler</h2>
                  {!editing ? (
                    <button type="button" onClick={() => setEditing(true)} className="btn-outline">
                      Düzenle
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing(false)} className="btn-outline">
                        İptal
                      </button>
                      <button type="submit" className="btn-primary flex items-center gap-2">
                        <Save size={16} /> Kaydet
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Yaş</label>
                    <input
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                      min="18"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Cinsiyet</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Meslek</label>
                    <input
                      type="text"
                      value={profile.occupation}
                      onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Şehir</label>
                    <select
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="istanbul">İstanbul</option>
                      <option value="ankara">Ankara</option>
                      <option value="izmir">İzmir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Mahalle</label>
                    <input
                      type="text"
                      value={profile.neighborhood}
                      onChange={(e) => setProfile({ ...profile, neighborhood: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-1">
                    Hakkımda <span className="font-normal text-gray-500">(300 karakter)</span>
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!editing}
                    maxLength={300}
                    rows={3}
                    className="input-field resize-none disabled:bg-gray-50 disabled:cursor-default"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">{profile.bio.length}/300</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Min. Bütçe (₺)</label>
                    <input
                      type="number"
                      value={profile.budgetMin}
                      onChange={(e) => setProfile({ ...profile, budgetMin: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Max. Bütçe (₺)</label>
                    <input
                      type="number"
                      value={profile.budgetMax}
                      onChange={(e) => setProfile({ ...profile, budgetMax: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    />
                  </div>
                </div>
              </div>

              {/* Lifestyle Preferences */}
              <div className="card space-y-4">
                <h2 className="text-xl font-bold">Yaşam Tarzı Tercihleri</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Uyku Düzeni</label>
                    <select
                      value={profile.sleepSchedule}
                      onChange={(e) => setProfile({ ...profile, sleepSchedule: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="early">Erken Yatan</option>
                      <option value="normal">Normal</option>
                      <option value="late">Geç Yatan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Temizlik Düzeyi</label>
                    <select
                      value={profile.cleanlinessLevel}
                      onChange={(e) => setProfile({ ...profile, cleanlinessLevel: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="very_clean">Çok Titiz</option>
                      <option value="clean">Temiz</option>
                      <option value="relaxed">Esnek</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Misafir Kabulü</label>
                    <select
                      value={profile.guests}
                      onChange={(e) => setProfile({ ...profile, guests: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="often">Sık Sık</option>
                      <option value="sometimes">Ara Sıra</option>
                      <option value="rarely">Nadiren</option>
                      <option value="never">Hayır</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Gürültü Toleransı</label>
                    <select
                      value={profile.noiseTolerance}
                      onChange={(e) => setProfile({ ...profile, noiseTolerance: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-default"
                    >
                      <option value="low">Sessizlik Gerekli</option>
                      <option value="medium">Orta</option>
                      <option value="high">Esnek</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.smoking}
                      onChange={(e) => setProfile({ ...profile, smoking: e.target.checked })}
                      disabled={!editing}
                    />
                    <span className="text-sm font-medium">Sigara İçiyorum</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.pets}
                      onChange={(e) => setProfile({ ...profile, pets: e.target.checked })}
                      disabled={!editing}
                    />
                    <span className="text-sm font-medium">Evcil Hayvanım Var</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
