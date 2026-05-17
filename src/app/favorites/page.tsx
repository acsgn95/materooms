'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Heart, MapPin, Users, Trash2 } from 'lucide-react';
import Link from 'next/link';

type FavListing = {
  id: string;
  title: string;
  district: string;
  neighborhood: string;
  monthlyRent: number;
  residents: { current: number; total: number };
  ownerScore: number;
  ownerVerified: boolean;
  savedAt: string;
};

const scoreBand = (s: number) => {
  if (s >= 750) return 'bg-amber-500/20 text-amber-400';
  if (s >= 500) return 'bg-secondary/20 text-secondary';
  if (s >= 250) return 'bg-yellow-500/20 text-yellow-400';
  return 'bg-red-500/20 text-red-400';
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavListing[]>([
    { id: '3', title: "Taksim'de Güzel Daire — 3 Kişilik", district: 'Beyoğlu', neighborhood: 'Taksim', monthlyRent: 6000, residents: { current: 2, total: 3 }, ownerScore: 850, ownerVerified: true, savedAt: '2026-04-19T10:00:00Z' },
    { id: '4', title: "Kadıköy'de Arkadaş Arıyorum", district: 'Kadıköy', neighborhood: 'Moda', monthlyRent: 9500, residents: { current: 1, total: 2 }, ownerScore: 720, ownerVerified: false, savedAt: '2026-04-18T14:00:00Z' },
  ]);

  const remove = (id: string) => setFavorites((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-light text-white">Favori İlanlar</h1>
            <span className="text-on-accent text-white text-sm font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #E8192C, #F7933A)' }}>{favorites.length}</span>
          </div>
          <Link href="/listings" className="btn-outline">İlanlara Geri Dön</Link>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={56} className="mx-auto text-white/10 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Henüz favori ilanın yok</h3>
            <p className="text-white/40 mb-6">İlan kartlarındaki kalp ikonuna tıklayarak ekleyebilirsin</p>
            <Link href="/listings" className="btn-primary">İlanları Keşfet</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {favorites.map((listing) => (
              <div key={listing.id} className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900 hover:border-secondary/30 transition">
                <Link href={`/listings/${listing.id}`} className="block">
                  <div className="bg-zinc-800 h-40 flex items-center justify-center text-6xl">
                    🏘️
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base text-white mb-2 line-clamp-2">{listing.title}</h3>
                    <div className="space-y-1.5 text-sm text-white/50 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-secondary" />
                        {listing.district} / {listing.neighborhood}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-white/40" />
                        {listing.residents.current}/{listing.residents.total} kişi
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-secondary">
                        ₺{listing.monthlyRent.toLocaleString('tr-TR')}
                        <span className="text-sm font-normal text-white/40">/ay</span>
                      </p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scoreBand(listing.ownerScore)}`}>
                        {listing.ownerScore} puan
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-4 pt-0 flex items-center justify-between border-t border-white/10">
                  <p className="text-xs text-white/30">
                    Kaydedildi: {new Date(listing.savedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                  </p>
                  <button onClick={() => remove(listing.id)}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 font-medium transition">
                    <Trash2 size={14} /> Kaldır
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
