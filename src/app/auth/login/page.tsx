'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

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
          <h1 className="text-3xl font-bold text-dark mb-2">Hoş Geldin</h1>
          <p className="text-gray-500 mb-8">Hesabına giriş yap</p>

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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Hesabın yok mu?{' '}
                <Link href="/auth/register" className="text-primary font-semibold hover:underline">
                  Kaydol
                </Link>
              </p>
            </form>
          )}

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
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
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
        </div>
      </div>
    </div>
  );
}
