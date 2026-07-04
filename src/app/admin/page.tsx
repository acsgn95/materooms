'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin';

interface Stats {
  users: { total: number; active: number };
  listings: { total: number; active: number };
}

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getStats().then(setStats).catch(() => setError('Veriler yüklenemedi'));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!stats) return <p className="text-gray-400">Yükleniyor...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Toplam Kullanıcı" value={stats.users.total} />
        <StatCard label="Aktif Kullanıcı" value={stats.users.active} sub={`${stats.users.total - stats.users.active} pasif`} />
        <StatCard label="Toplam İlan" value={stats.listings.total} />
        <StatCard label="Aktif İlan" value={stats.listings.active} sub={`${stats.listings.total - stats.listings.active} pasif`} />
      </div>
    </div>
  );
}
