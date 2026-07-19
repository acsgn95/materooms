'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { loginWithEmail } from '@/lib/auth';
import { ApiCallError } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = await loginWithEmail(email, password);
      setAuth(auth.user);
      router.push('/dashboard');
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'E-posta veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-black flex flex-col">
      <div className="h-0.5 bg-secondary" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="block text-center text-white font-bold tracking-[0.24em] text-xl sm:text-2xl uppercase mb-10 sm:mb-12 hover:text-secondary transition">
            MateRooms
          </Link>

          <h1 className="text-3xl font-serif font-light text-white mb-2">Hoş Geldin</h1>
          <p className="text-white/40 mb-8 text-sm">Hesabına giriş yap</p>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">E-posta</label>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-800 px-4 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#E8192C]">
                <Mail className="flex-shrink-0 text-white/30" size={18} />
                <input
                  type="email"
                  placeholder="ornek@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3 text-white placeholder:text-white/30 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Şifre</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                required
              />
              <div className="text-right mt-1">
                <Link href="/auth/reset-password" className="text-xs text-secondary hover:underline">Şifremi unuttum</Link>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-40">
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
            <p className="text-center text-sm text-white/40">
              Hesabın yok mu?{' '}
              <Link href="/auth/register" className="text-secondary hover:underline">Kayıt ol</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
