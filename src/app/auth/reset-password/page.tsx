'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { requestPasswordReset, confirmPasswordReset } from '@/lib/auth';
import { ApiCallError } from '@/lib/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccess('Eğer bu e-posta kayıtlıysa sıfırlama bağlantısı gönderildi.');
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmReset(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmPasswordReset(token!, password);
      setSuccess('Şifreniz güncellendi. Giriş yapabilirsiniz.');
      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'Geçersiz veya süresi dolmuş link.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center text-white font-bold tracking-[0.24em] text-xl uppercase mb-10 hover:text-secondary transition">
          MateRooms
        </Link>

        <h1 className="text-3xl font-serif font-light text-white mb-2">
          {token ? 'Yeni Şifre' : 'Şifremi Unuttum'}
        </h1>
        <p className="text-white/40 text-sm mb-8">
          {token ? 'Yeni şifrenizi girin.' : 'E-posta adresinize sıfırlama bağlantısı göndereceğiz.'}
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {!token ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full"
              required
            />
            <button type="submit" disabled={loading || !!success} className="btn-primary w-full disabled:opacity-40">
              {loading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
            </button>
            <p className="text-center text-sm text-white/40">
              <Link href="/auth/login" className="text-secondary hover:underline">Giriş sayfasına dön</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset} className="space-y-4">
            <input
              type="password"
              placeholder="Yeni şifre (en az 8 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              required
              minLength={8}
            />
            <button type="submit" disabled={loading || !!success} className="btn-primary w-full disabled:opacity-40">
              {loading ? 'Güncelleniyor...' : 'Şifremi Güncelle'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
