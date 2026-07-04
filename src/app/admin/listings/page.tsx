'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminApi } from '@/lib/admin';

interface Listing {
  id: string;
  title: string;
  city: string;
  district: string;
  listing_type: string;
  rent_full: number;
  is_active: boolean;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  room_available: 'Oda Var',
  looking_for_room: 'Oda Arıyor',
  looking_together: 'Birlikte Arıyor',
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getListings(page, search);
      setListings(data.listings);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  async function handleToggle(id: string) {
    await adminApi.toggleListing(id);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;
    await adminApi.deleteListing(id);
    load();
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">İlanlar</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Başlık ile ara..."
          className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 w-64"
        />
        <span className="text-gray-400 text-sm self-center">{total} ilan</span>
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left px-4 py-3">Başlık</th>
              <th className="text-left px-4 py-3">Konum</th>
              <th className="text-left px-4 py-3">Tür</th>
              <th className="text-left px-4 py-3">Kira</th>
              <th className="text-left px-4 py-3">Durum</th>
              <th className="text-left px-4 py-3">Tarih</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">Yükleniyor...</td></tr>
            ) : listings.map((l) => (
              <tr key={l.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3 text-white max-w-xs truncate">{l.title}</td>
                <td className="px-4 py-3 text-gray-300">{l.city}, {l.district}</td>
                <td className="px-4 py-3 text-gray-300">{TYPE_LABELS[l.listing_type] || l.listing_type}</td>
                <td className="px-4 py-3 text-gray-300">{l.rent_full.toLocaleString('tr-TR')} ₺</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${l.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {l.is_active ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{new Date(l.created_at).toLocaleDateString('tr-TR')}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(l.id)} className="text-xs text-yellow-400 hover:text-yellow-300">
                      {l.is_active ? 'Durdur' : 'Aktifleştir'}
                    </button>
                    <button onClick={() => handleDelete(l.id)} className="text-xs text-red-400 hover:text-red-300">Sil</button>
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
