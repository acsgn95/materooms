'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Search, MapPin, Users, Heart, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

type Listing = {
  id: string;
  type: 'room_available' | 'looking_for_room' | 'looking_together';
  title: string;
  city: string;
  district: string;
  neighborhood: string;
  monthlyRent: number;
  moveInDate: string;
  residents: { current: number; total: number };
  owner: string;
  ownerScore: number;
  ownerVerified: boolean;
  gender: 'male' | 'female' | 'any';
  amenities: string[];
  createdAt: string;
};

const scoreBand = (score: number) => {
  if (score >= 750) return { label: 'Altın', color: 'bg-amber-500/20 text-amber-400' };
  if (score >= 500) return { label: 'İyi', color: 'bg-secondary/20 text-secondary' };
  if (score >= 250) return { label: 'Orta', color: 'bg-yellow-500/20 text-yellow-400' };
  return { label: 'Düşük', color: 'bg-red-500/20 text-red-400' };
};

const typeLabels = {
  room_available: 'Oda Var',
  looking_for_room: 'Oda Arıyorum',
  looking_together: 'Birlikte Ara',
};

const MOCK_LISTINGS: Listing[] = [
  { id: '1', type: 'room_available', title: "Beşiktaş'ta 2+1 Ev — Arkadaş Aranıyor", city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Ortaköy', monthlyRent: 7500, moveInDate: '2026-05-01', residents: { current: 1, total: 2 }, owner: 'Ahmet Yılmaz', ownerScore: 720, ownerVerified: true, gender: 'any', amenities: ['Mobilyalı', 'İnternet', 'Klima'], createdAt: '2026-04-18' },
  { id: '2', type: 'looking_for_room', title: "Şişli'de Oda Arıyorum", city: 'İstanbul', district: 'Şişli', neighborhood: 'Merkez', monthlyRent: 8000, moveInDate: '2026-06-01', residents: { current: 0, total: 2 }, owner: 'Zeynep Kaya', ownerScore: 680, ownerVerified: true, gender: 'female', amenities: ['İnternet', 'Balkon'], createdAt: '2026-04-19' },
  { id: '3', type: 'room_available', title: "Taksim'de Güzel Daire — 3 Kişilik", city: 'İstanbul', district: 'Beyoğlu', neighborhood: 'Taksim', monthlyRent: 6000, moveInDate: '2026-04-15', residents: { current: 2, total: 3 }, owner: 'Ali Demir', ownerScore: 850, ownerVerified: true, gender: 'any', amenities: ['Mobilyalı', 'İnternet', 'Çamaşır Makinesi', 'Balkon'], createdAt: '2026-04-15' },
  { id: '4', type: 'room_available', title: "Kadıköy'de Arkadaş Arıyorum", city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Moda', monthlyRent: 9500, moveInDate: '2026-05-15', residents: { current: 1, total: 2 }, owner: 'Selin Çiçek', ownerScore: 720, ownerVerified: false, gender: 'female', amenities: ['Mobilyalı', 'İnternet'], createdAt: '2026-04-20' },
  { id: '5', type: 'looking_together', title: 'Ataşehir İçin Ev Arkadaşı Arıyorum', city: 'İstanbul', district: 'Ataşehir', neighborhood: 'Ataşehir', monthlyRent: 5000, moveInDate: '2026-06-01', residents: { current: 0, total: 2 }, owner: 'Mert Yıldız', ownerScore: 590, ownerVerified: true, gender: 'male', amenities: ['İnternet'], createdAt: '2026-04-17' },
];

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    city: 'istanbul',
    district: '',
    minBudget: '',
    maxBudget: '',
    type: 'all',
    gender: 'all',
    moveInDate: '',
    verifiedOnly: false,
    minScore: '',
  });
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'score'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = MOCK_LISTINGS.filter((l) => {
    if (filters.type !== 'all' && l.type !== filters.type) return false;
    if (filters.gender !== 'all' && l.gender !== filters.gender && l.gender !== 'any') return false;
    if (filters.minBudget && l.monthlyRent < Number(filters.minBudget)) return false;
    if (filters.maxBudget && l.monthlyRent > Number(filters.maxBudget)) return false;
    if (filters.verifiedOnly && !l.ownerVerified) return false;
    if (filters.minScore && l.ownerScore < Number(filters.minScore)) return false;
    if (filters.moveInDate && l.moveInDate > filters.moveInDate) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.monthlyRent - b.monthlyRent;
    if (sortBy === 'price_desc') return b.monthlyRent - a.monthlyRent;
    if (sortBy === 'score') return b.ownerScore - a.ownerScore;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif font-light text-white">İlanları Keşfet</h1>
          <p className="text-white/40 text-sm">{filtered.length} ilan bulundu</p>
        </div>

        {/* Search Bar */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-36">
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Şehir</label>
              <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} className="input-field py-2">
                <option value="istanbul">İstanbul</option>
                <option value="ankara">Ankara</option>
                <option value="izmir">İzmir</option>
              </select>
            </div>
            <div className="flex-1 min-w-36">
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Max Bütçe (₺)</label>
              <input type="number" placeholder="20000" value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                className="input-field py-2" />
            </div>
            <div className="flex-1 min-w-36">
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Sıralama</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="input-field py-2">
                <option value="newest">En Yeni</option>
                <option value="price_asc">Fiyat (Düşük→Yüksek)</option>
                <option value="price_desc">Fiyat (Yüksek→Düşük)</option>
                <option value="score">Doğrulama Seviyesi</option>
              </select>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-outline flex items-center gap-2 py-2">
              <SlidersHorizontal size={18} />
              Filtreler
              {(filters.type !== 'all' || filters.gender !== 'all' || filters.verifiedOnly || filters.moveInDate || filters.minScore) && (
                <span className="w-2 h-2 bg-secondary rounded-full" />
              )}
            </button>
            <button className="btn-primary flex items-center gap-2 py-2">
              <Search size={18} />
              Ara
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-white/10 pt-4 mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">İlan Türü</label>
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="input-field py-2 text-sm">
                  <option value="all">Tümü</option>
                  <option value="room_available">Oda Var</option>
                  <option value="looking_for_room">Oda Arıyorum</option>
                  <option value="looking_together">Birlikte Ara</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Cinsiyet Tercihi</label>
                <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })} className="input-field py-2 text-sm">
                  <option value="all">Fark Etmez</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Min Bütçe (₺)</label>
                <input type="number" placeholder="0" value={filters.minBudget}
                  onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">En Geç Taşınma</label>
                <input type="date" value={filters.moveInDate}
                  onChange={(e) => setFilters({ ...filters, moveInDate: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">Min Puan</label>
                <input type="number" placeholder="0" min="0" max="1000" value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input id="verifiedOnly" type="checkbox" checked={filters.verifiedOnly}
                  onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                  className="accent-secondary" />
                <label htmlFor="verifiedOnly" className="text-sm font-medium text-white/60 cursor-pointer">Sadece Doğrulanmış</label>
              </div>
              <div className="flex items-end">
                <button onClick={() => setFilters({ city: 'istanbul', district: '', minBudget: '', maxBudget: '', type: 'all', gender: 'all', moveInDate: '', verifiedOnly: false, minScore: '' })}
                  className="text-sm text-white/40 hover:text-white/70 underline">
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-white mb-2">Uygun ilan bulunamadı</h3>
            <p className="text-white/40 mb-6">Filtrelerini değiştirerek tekrar dene</p>
            <button onClick={() => setFilters({ city: 'istanbul', district: '', minBudget: '', maxBudget: '', type: 'all', gender: 'all', moveInDate: '', verifiedOnly: false, minScore: '' })}
              className="btn-primary">Filtreleri Temizle</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {filtered.map((listing) => {
              const band = scoreBand(listing.ownerScore);
              const isFav = favorites.has(listing.id);
              return (
                <Link key={listing.id} href={`/listings/${listing.id}`}
                  className="border border-white/10 rounded-xl overflow-hidden hover:border-secondary/30 transition group bg-zinc-900">
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative bg-zinc-800 h-44 flex items-center justify-center">
                      <span className="text-7xl">🏘️</span>
                      <button onClick={(e) => toggleFavorite(listing.id, e)}
                        className={`absolute top-3 right-3 bg-black/60 rounded-full p-2 transition ${isFav ? 'text-secondary' : 'text-white/40 opacity-0 group-hover:opacity-100'}`}>
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                      <span className="absolute top-3 left-3 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded-full">
                        {typeLabels[listing.type]}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-base text-white mb-2 line-clamp-2">{listing.title}</h3>
                      <div className="space-y-1.5 mb-3 text-sm text-white/50">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-secondary flex-shrink-0" />
                          {listing.district} / {listing.neighborhood}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-white/40 flex-shrink-0" />
                          {listing.residents.current}/{listing.residents.total} kişi · Giriş: {new Date(listing.moveInDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {listing.amenities.slice(0, 3).map((a, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-white/5 text-white/50 rounded-full border border-white/10">{a}</span>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-3 flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-xl font-bold text-secondary">₺{listing.monthlyRent.toLocaleString('tr-TR')}<span className="text-sm font-normal text-white/40">/ay</span></p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.color}`}>{band.label} {listing.ownerScore}</span>
                            {listing.ownerVerified && <span className="text-xs text-secondary font-semibold">✓ Doğrulanmış</span>}
                          </div>
                        </div>
                        <span className="text-sm text-white/60">{listing.owner}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
