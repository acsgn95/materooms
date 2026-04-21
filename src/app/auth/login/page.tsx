'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const login  = useAuthStore((s) => s.login);

  const [step, setStep]       = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone]     = useState('');
  const [otp, setOtp]         = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setStep('otp'); setLoading(false); }, 500);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = [...otp]; digits.forEach((d, i) => { next[i] = d; }); setOtp(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      login({ id: 'u1', phone, name: 'Ahmet Yılmaz', city: 'İstanbul', verificationBadges: ['phone_verified', 'id_verified'], flatmateScore: 720 }, 'mock-token-xyz');
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="h-0.5 bg-secondary" />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Link href="/" className="block text-center text-white font-bold tracking-[0.3em] text-xs uppercase mb-12 hover:text-secondary transition">
            MateRooms
          </Link>

          <h1 className="text-3xl font-serif font-light text-white mb-2">Hoş Geldin</h1>
          <p className="text-white/40 mb-8 text-sm">Hesabına giriş yap</p>

          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Telefon Numarası</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-white/30" size={18} />
                  <input type="tel" placeholder="+90 5XX XXX XXXX" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pl-10" required />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-40">
                {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
              </button>
              <p className="text-center text-sm text-white/40">
                Hesabın yok mu?{' '}
                <Link href="/auth/register" className="text-secondary hover:underline">Kaydol</Link>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Doğrulama Kodu</label>
                <p className="text-white/40 text-sm mb-4">{phone} numarasına gönderildi</p>
                <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                  {otp.map((d, i) => (
                    <input key={i} ref={(el) => { otpRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={1} value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="input-field text-center text-xl font-bold p-2" />
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading || otp.join('').length !== 6}
                className="btn-primary w-full disabled:opacity-40">
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>
              <button type="button" onClick={() => { setOtp(['','','','','','']); setStep('phone'); }}
                className="w-full text-secondary text-sm hover:underline">
                ← Geri Dön
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
