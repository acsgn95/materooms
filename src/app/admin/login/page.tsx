'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, setAdminSecret } from '@/lib/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await adminApi.verifySecret(password);
    if (ok) {
      setAdminSecret(password);
      router.push('/admin');
    } else {
      setError('Geçersiz şifre');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Paneli</h1>
        <p className="text-gray-400 text-sm mb-6">MateRooms yönetim arayüzü</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin şifresi"
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
