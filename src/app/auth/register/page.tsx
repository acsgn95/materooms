'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    neighborhood: '',
    occupation: '',
    sleepSchedule: '',
    cleanlinessLevel: '',
    smoking: false,
    pets: false,
    guests: '',
    noiseTolerance: '',
  });

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      setStep('profile');
      setLoading(false);
    }, 500);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      window.location.href = '/dashboard';
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-dark mb-8">
          <ArrowLeft size={20} />
          Ana Sayfaya Dön
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-dark mb-2">RoomMate'ye Hoş Geldin</h1>
          <p className="text-gray-500 mb-8">Güvenilir arkadaş bulmaya başla</p>

          {/* Step 1: Phone Verification */}
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="+90 5XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  SMS ile doğrulama kodu göndereceğiz
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Zaten hesabın var mı?{' '}
                <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                  Giriş Yap
                </Link>
              </p>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Doğrulama Kodu
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  {phone} numarasına gönderilen kodu gir
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      placeholder="0"
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(''));
                      }}
                      className="input-field text-center text-2xl"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Doğrulanıyor...' : 'Devam Et'}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-primary text-sm font-semibold hover:underline"
              >
                ← Telefon Numarasını Değiştir
              </button>
            </form>
          )}

          {/* Step 3: Profile Setup */}
          {step === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Yaş
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    value={profileData.age}
                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    className="input-field"
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Cinsiyet
                  </label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Seç</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Şehir
                </label>
                <select
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Seç</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Meslek
                </label>
                <input
                  type="text"
                  placeholder="Yazılım Mühendisi"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <h3 className="font-semibold text-dark">Yaşam Tarzı Tercihleri</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">Uyku Düzeni</label>
                    <select
                      value={profileData.sleepSchedule}
                      onChange={(e) => setProfileData({ ...profileData, sleepSchedule: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Seç</option>
                      <option value="early">Erken Yatan</option>
                      <option value="normal">Normal</option>
                      <option value="late">Geç Yatan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">Temizlik</label>
                    <select
                      value={profileData.cleanlinessLevel}
                      onChange={(e) => setProfileData({ ...profileData, cleanlinessLevel: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Seç</option>
                      <option value="very_clean">Çok Titiz</option>
                      <option value="clean">Temiz</option>
                      <option value="relaxed">Esnek</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">Misafir Kabulü</label>
                    <select
                      value={profileData.guests}
                      onChange={(e) => setProfileData({ ...profileData, guests: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Seç</option>
                      <option value="often">Sık Sık</option>
                      <option value="sometimes">Ara Sıra</option>
                      <option value="rarely">Nadiren</option>
                      <option value="never">Hayır</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">Gürültü Toleransı</label>
                    <select
                      value={profileData.noiseTolerance}
                      onChange={(e) => setProfileData({ ...profileData, noiseTolerance: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Seç</option>
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
                      checked={profileData.smoking}
                      onChange={(e) => setProfileData({ ...profileData, smoking: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Sigara İçiyorum</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.pets}
                      onChange={(e) => setProfileData({ ...profileData, pets: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Evcil Hayvanım Var</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !profileData.name || !profileData.city}
                className="btn-primary w-full disabled:opacity-50 mt-6"
              >
                {loading ? 'Kaydediliyor...' : 'Profili Tamamla'}
              </button>
            </form>
          )}

          {/* Progress Indicator */}
          <div className="mt-8 flex gap-2">
            {['phone', 'otp', 'profile'].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step === s || (s === 'otp' && step === 'profile') || (s === 'phone' && step !== 'phone')
                    ? 'bg-primary'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Kaydol'a tıklayarak{' '}
          <a href="#" className="text-primary hover:underline">
            Kullanıcı Sözleşmesini
          </a>{' '}
          kabul etmiş olursun
        </p>
      </div>
    </div>
  );
}
