'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { VerificationBadges } from '@/components/common/DashboardHeader';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getMe, updateMyProfile } from '@/lib/users';
import { ApiCallError } from '@/lib/api';

type ProfileForm = {
  full_name: string;
  age: string;
  gender: string;
  city: string;
  neighborhood: string;
  occupation: string;
  budget_min: string;
  budget_max: string;
  bio: string;
  sleep_schedule: string;
  cleanliness_level: string;
  smoking: boolean;
  pets: boolean;
  guests: string;
  noise_tolerance: string;
};

const EMPTY_FORM: ProfileForm = {
  full_name: '',
  age: '',
  gender: '',
  city: '',
  neighborhood: '',
  occupation: '',
  budget_min: '',
  budget_max: '',
  bio: '',
  sleep_schedule: '',
  cleanliness_level: '',
  smoking: false,
  pets: false,
  guests: '',
  noise_tolerance: '',
};

export default function ProfilePage() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const storeUser = useAuthStore((s) => s.user);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setAuth(me);
        setForm({
          full_name: me.profile?.full_name ?? '',
          age: me.profile?.age?.toString() ?? '',
          gender: me.profile?.gender ?? '',
          city: me.profile?.city ?? '',
          neighborhood: me.profile?.neighborhood ?? '',
          occupation: me.profile?.occupation ?? '',
          budget_min: me.profile?.budget_min?.toString() ?? '',
          budget_max: me.profile?.budget_max?.toString() ?? '',
          bio: me.profile?.bio ?? '',
          sleep_schedule: me.profile?.sleep_schedule ?? '',
          cleanliness_level: me.profile?.cleanliness_level ?? '',
          smoking: me.profile?.smoking ?? false,
          pets: me.profile?.pets ?? false,
          guests: me.profile?.guests ?? '',
          noise_tolerance: me.profile?.noise_tolerance ?? '',
        });
      } catch (err) {
        const e = err as ApiCallError;
        setError(e.message || 'Profil yüklenemedi.');
      } finally {
        setLoading(false);
      }
    })();
  }, [setAuth]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const updated = await updateMyProfile({
        full_name: form.full_name,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender || undefined,
        city: form.city || undefined,
        neighborhood: form.neighborhood || undefined,
        occupation: form.occupation || undefined,
        budget_min: form.budget_min ? Number(form.budget_min) : undefined,
        budget_max: form.budget_max ? Number(form.budget_max) : undefined,
        bio: form.bio || undefined,
        sleep_schedule: form.sleep_schedule || undefined,
        cleanliness_level: form.cleanliness_level || undefined,
        smoking: form.smoking,
        pets: form.pets,
        guests: form.guests || undefined,
        noise_tolerance: form.noise_tolerance || undefined,
      });
      setAuth(updated);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'Profil kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  const badges = storeUser?.profile?.verification_badges ?? [];
  const cityLabel = (() => {
    if (!form.city) return '';
    const map: Record<string, string> = { istanbul: 'İstanbul', ankara: 'Ankara', izmir: 'İzmir' };
    return map[form.city.toLowerCase()] ?? form.city;
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <DashboardHeader />
        <main className="container-main py-12 text-center text-white/40">Yükleniyor...</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          Geri Dön
        </Link>

        {saved && (
          <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary font-semibold">
            ✓ Profil kaydedildi
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="card text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center text-secondary text-4xl font-bold mx-auto">
                  {form.full_name ? form.full_name[0].toUpperCase() : '?'}
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white">{form.full_name || '—'}</h2>
              <p className="text-white/40 text-sm">{form.occupation || '—'}</p>
              <p className="text-white/30 text-sm">{cityLabel}{form.neighborhood ? ` · ${form.neighborhood}` : ''}</p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-3">Doğrulama Durumu</h3>
              {badges.length > 0 ? (
                <VerificationBadges badges={badges} />
              ) : (
                <p className="text-white/40 text-sm">Henüz doğrulama yok.</p>
              )}
              <Link href="/verify" className="block mt-3 text-secondary text-sm font-semibold hover:underline">
                → Daha fazla doğrula
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="card space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Temel Bilgiler</h2>
                  {!editing ? (
                    <button type="button" onClick={() => setEditing(true)} className="btn-outline">
                      Düzenle
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing(false)} className="btn-outline" disabled={saving}>İptal</button>
                      <button type="submit" className="btn-primary flex items-center gap-2 disabled:opacity-50" disabled={saving}>
                        <Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Ad Soyad</label>
                    <input type="text" value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Yaş</label>
                    <input type="number" value={form.age}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      disabled={!editing} min="18"
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Cinsiyet</label>
                    <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Meslek</label>
                    <input type="text" value={form.occupation}
                      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Şehir</label>
                    <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="istanbul">İstanbul</option>
                      <option value="ankara">Ankara</option>
                      <option value="izmir">İzmir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Mahalle</label>
                    <input type="text" value={form.neighborhood}
                      onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">
                    Hakkımda <span className="font-normal text-white/30">(300 karakter)</span>
                  </label>
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    disabled={!editing} maxLength={300} rows={3}
                    className="input-field resize-none disabled:opacity-50 disabled:cursor-default" />
                  <p className="text-xs text-white/30 mt-1 text-right">{form.bio.length}/300</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Min. Bütçe (₺)</label>
                    <input type="number" value={form.budget_min}
                      onChange={(e) => setForm({ ...form, budget_min: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Max. Bütçe (₺)</label>
                    <input type="number" value={form.budget_max}
                      onChange={(e) => setForm({ ...form, budget_max: e.target.value })}
                      disabled={!editing}
                      className="input-field disabled:opacity-50 disabled:cursor-default" />
                  </div>
                </div>
              </div>

              <div className="card space-y-4">
                <h2 className="text-xl font-semibold text-white">Yaşam Tarzı Tercihleri</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Uyku Düzeni</label>
                    <select value={form.sleep_schedule} onChange={(e) => setForm({ ...form, sleep_schedule: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="early">Erken Yatan</option>
                      <option value="normal">Normal</option>
                      <option value="late">Geç Yatan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Temizlik Düzeyi</label>
                    <select value={form.cleanliness_level} onChange={(e) => setForm({ ...form, cleanliness_level: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="very_clean">Çok Titiz</option>
                      <option value="clean">Temiz</option>
                      <option value="relaxed">Esnek</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Misafir Kabulü</label>
                    <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="often">Sık Sık</option>
                      <option value="sometimes">Ara Sıra</option>
                      <option value="rarely">Nadiren</option>
                      <option value="never">Hayır</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Gürültü Toleransı</label>
                    <select value={form.noise_tolerance} onChange={(e) => setForm({ ...form, noise_tolerance: e.target.value })}
                      disabled={!editing} className="input-field disabled:opacity-50 disabled:cursor-default">
                      <option value="">Seçin</option>
                      <option value="low">Sessizlik Gerekli</option>
                      <option value="medium">Orta</option>
                      <option value="high">Esnek</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-white/60">
                    <input type="checkbox" checked={form.smoking}
                      onChange={(e) => setForm({ ...form, smoking: e.target.checked })}
                      disabled={!editing} className="accent-secondary" />
                    Sigara İçiyorum
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-white/60">
                    <input type="checkbox" checked={form.pets}
                      onChange={(e) => setForm({ ...form, pets: e.target.checked })}
                      disabled={!editing} className="accent-secondary" />
                    Evcil Hayvanım Var
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
