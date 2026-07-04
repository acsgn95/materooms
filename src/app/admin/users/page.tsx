'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi } from '@/lib/admin';

interface User {
  id: string;
  phone: string;
  full_name: string | null;
  city: string | null;
  is_active: boolean;
  verification_badges: string[];
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getUsers(page, search);
      setUsers(data.users);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  async function handleToggle(id: string) {
    await adminApi.toggleUser(id);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    await adminApi.deleteUser(id);
    load();
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Kullanıcılar</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Telefon ile ara..."
          className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 w-64"
        />
        <span className="text-gray-400 text-sm self-center">{total} kullanıcı</span>
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left px-4 py-3">Ad</th>
              <th className="text-left px-4 py-3">Telefon</th>
              <th className="text-left px-4 py-3">Şehir</th>
              <th className="text-left px-4 py-3">Rozet</th>
              <th className="text-left px-4 py-3">Durum</th>
              <th className="text-left px-4 py-3">Kayıt</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">Yükleniyor...</td></tr>
            ) : users.map((u) => (
              <tr key={u.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-white">{u.full_name || '—'}</td>
                <td className="px-4 py-3 text-gray-300">{u.phone}</td>
                <td className="px-4 py-3 text-gray-300">{u.city || '—'}</td>
                <td className="px-4 py-3 text-gray-300">{u.verification_badges.length > 0 ? u.verification_badges.join(', ') : '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${u.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {u.is_active ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{new Date(u.created_at).toLocaleDateString('tr-TR')}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(u.id)} className="text-xs text-yellow-400 hover:text-yellow-300">
                      {u.is_active ? 'Durdur' : 'Aktifleştir'}
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="text-xs text-red-400 hover:text-red-300">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-end">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-gray-800 text-gray-300 rounded disabled:opacity-50 text-sm">Önceki</button>
          <span className="text-gray-400 text-sm self-center">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-gray-800 text-gray-300 rounded disabled:opacity-50 text-sm">Sonraki</button>
        </div>
      )}
    </div>
  );
}
