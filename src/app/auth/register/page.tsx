'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, Mail, Phone } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

type AuthMethod = 'phone' | 'email';

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState<'contact' | 'otp' | 'profile'>('contact');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const photoRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    neighborhood: '',
    occupation: '',
    budgetMin: '',
    budgetMax: '',
    bio: '',
    sleepSchedule: '',
    cleanlinessLevel: '',
    smoking: false,
    pets: false,
    guests: '',
    noiseTolerance: '',
  });

  const steps = ['contact', 'otp', 'profile'];
  const stepIdx = steps.indexOf(step);
  const contactValue = authMethod === 'phone' ? phone : email;
  const contactTarget = authMethod === 'phone' ? `${phone} numarasına` : `${email} adresine`;

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp];
    digits.forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 500);
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep('profile');
      setLoading(false);
    }, 500);
  };

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({
        id: 'u1',
        phone: authMethod === 'phone' ? phone : '',
        email: authMethod === 'email' ? email : undefined,
        name: profile.name,
        city: profile.city,
        verificationBadges: authMethod === 'phone' ? ['phone_verified'] : [],
        flatmateScore: 0,
      }, 'mock-token-xyz');
      router.push('/dashboard');
    }, 500);
  };

  const resetToContactStep = () => {
    setOtp(['', '', '', '', '', '']);
    setStep('contact');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="h-0.5 bg-secondary" />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="block text-center text-white font-bold tracking-[0.3em] text-xs uppercase mb-10 hover:text-secondary transition">
            MateRooms
          </Link>

          <h1 className="text-3xl font-serif font-light text-white mb-2">Hoş Geldin</h1>
          <p className="text-white/40 text-sm mb-6">Güvenilir arkadaş bulmaya başla</p>

          <div className="flex gap-1.5 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors ${i <= stepIdx ? 'bg-secondary' : 'bg-white/10'}`} />
            ))}
          </div>

          {step === 'contact' && (
            <form onSubmit={submitContact} className="space-y-5">
              <div className="grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1">
                {(['phone', 'email'] as AuthMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setAuthMethod(method)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      authMethod === method ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {method === 'phone' ? 'Telefon' : 'E-posta'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
                  {authMethod === 'phone' ? 'Telefon Numarası' : 'E-posta Adresi'}
                </label>
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-800 px-4 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#E8192C]">
                  {authMethod === 'phone'
                    ? <Phone className="flex-shrink-0 text-white/30" size={18} />
                    : <Mail className="flex-shrink-0 text-white/30" size={18} />}
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={authMethod === 'phone' ? '+90 5XX XXX XXXX' : 'ornek@mail.com'}
                    value={contactValue}
                    onChange={(e) => authMethod === 'phone' ? setPhone(e.target.value) : setEmail(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent py-3 text-white placeholder:text-white/30 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-40">
                {loading ? 'Gönderiliyor...' : 'Kod Gönder'}
              </button>
              <p className="text-center text-sm text-white/40">
                Zaten hesabın var mı? <Link href="/auth/login" className="text-secondary hover:underline">Giriş Yap</Link>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={submitOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Doğrulama Kodu</label>
                <p className="text-white/40 text-sm mb-4">{contactTarget} gönderildi</p>
                <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="input-field text-center text-xl font-bold p-2"
                    />
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading || otp.join('').length !== 6} className="btn-primary w-full disabled:opacity-40">
                {loading ? 'Doğrulanıyor...' : 'Devam Et'}
              </button>
              <button type="button" onClick={resetToContactStep} className="w-full text-secondary text-sm hover:underline">
                ← Geri
              </button>
            </form>
          )}

          {step === 'profile' && (
            <form onSubmit={submitProfile} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <div className="flex flex-col items-center mb-2">
                <div
                  onClick={() => photoRef.current?.click()}
                  className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer overflow-hidden mb-2 hover:border-secondary transition"
                >
                  {photoPreview
                    ? <img src={photoPreview} alt="" className="w-full h-full object-cover" />
                    : <Camera size={24} className="text-white/30" />}
                </div>
                <button type="button" onClick={() => photoRef.current?.click()} className="text-secondary text-xs hover:underline">Fotoğraf Ekle</button>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setPhotoPreview(URL.createObjectURL(f));
                  }}
                  className="hidden"
                />
              </div>

              {[
                { label: 'Ad Soyad *', key: 'name', type: 'text', placeholder: 'Ahmet Yılmaz', required: true },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={(profile as unknown as Record<string, string>)[f.key]}
                    onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })}
                    className="input-field"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Yaş</label>
                  <input
                    type="number"
                    placeholder="25"
                    min="18"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Cinsiyet</label>
                  <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} className="input-field">
                    <option value="">Seç</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Şehir *</label>
                  <select value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className="input-field" required>
                    <option value="">Seç</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="ankara">Ankara</option>
                    <option value="izmir">İzmir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Meslek</label>
                  <input
                    type="text"
                    placeholder="Yazılım Mühendisi"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Min Bütçe ₺</label>
                  <input
                    type="number"
                    placeholder="5000"
                    value={profile.budgetMin}
                    onChange={(e) => setProfile({ ...profile, budgetMin: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Max Bütçe ₺</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={profile.budgetMax}
                    onChange={(e) => setProfile({ ...profile, budgetMax: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Hakkımda</label>
                <textarea
                  placeholder="Kendini kısaca tanıt..."
                  value={profile.bio}
                  maxLength={300}
                  rows={2}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="input-field resize-none"
                />
                <p className="text-xs text-white/30 text-right">{profile.bio.length}/300</p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Yaşam Tarzı</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Uyku', key: 'sleepSchedule', opts: [['early', 'Erken'], ['normal', 'Normal'], ['late', 'Geç']] },
                    { label: 'Temizlik', key: 'cleanlinessLevel', opts: [['very_clean', 'Çok Titiz'], ['clean', 'Temiz'], ['relaxed', 'Esnek']] },
                    { label: 'Misafir', key: 'guests', opts: [['often', 'Sık Sık'], ['sometimes', 'Ara Sıra'], ['rarely', 'Nadiren'], ['never', 'Hayır']] },
                    { label: 'Gürültü', key: 'noiseTolerance', opts: [['low', 'Sessiz'], ['medium', 'Orta'], ['high', 'Esnek']] },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs text-white/40 mb-1">{f.label}</label>
                      <select
                        value={(profile as unknown as Record<string, string>)[f.key]}
                        onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })}
                        className="input-field text-sm py-2"
                      >
                        <option value="">Seç</option>
                        {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="flex gap-6">
                  {[
                    ['smoking', 'Sigara'],
                    ['pets', 'Evcil Hayvan'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-white/60">
                      <input
                        type="checkbox"
                        checked={(profile as unknown as Record<string, boolean>)[key]}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.checked })}
                        className="accent-secondary"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading || !profile.name || !profile.city} className="btn-primary w-full disabled:opacity-40 mt-2">
                {loading ? 'Kaydediliyor...' : 'Başla'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
