'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Search, MapPin, Users, Heart, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

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
  if (score >= 750) return { labelKey: 'gold', color: 'bg-amber-500/20 text-amber-400' };
  if (score >= 500) return { labelKey: 'good', color: 'bg-secondary/20 text-secondary' };
  if (score >= 250) return { labelKey: 'medium', color: 'bg-yellow-500/20 text-yellow-400' };
  return { labelKey: 'low', color: 'bg-red-500/20 text-red-400' };
};

const MOCK_LISTINGS: Listing[] = [
  { id: '1', type: 'room_available', title: '', city: '', district: '', neighborhood: '', monthlyRent: 7500, moveInDate: '2026-05-01', residents: { current: 1, total: 2 }, owner: '', ownerScore: 720, ownerVerified: true, gender: 'any', amenities: ['furnished', 'internet', 'ac'], createdAt: '2026-04-18' },
  { id: '2', type: 'looking_for_room', title: '', city: '', district: '', neighborhood: '', monthlyRent: 8000, moveInDate: '2026-06-01', residents: { current: 0, total: 2 }, owner: '', ownerScore: 680, ownerVerified: true, gender: 'female', amenities: ['internet', 'balcony'], createdAt: '2026-04-19' },
  { id: '3', type: 'room_available', title: '', city: '', district: '', neighborhood: '', monthlyRent: 6000, moveInDate: '2026-04-15', residents: { current: 2, total: 3 }, owner: '', ownerScore: 850, ownerVerified: true, gender: 'any', amenities: ['furnished', 'internet', 'washing_machine', 'balcony'], createdAt: '2026-04-15' },
  { id: '4', type: 'room_available', title: '', city: '', district: '', neighborhood: '', monthlyRent: 9500, moveInDate: '2026-05-15', residents: { current: 1, total: 2 }, owner: '', ownerScore: 720, ownerVerified: false, gender: 'female', amenities: ['furnished', 'internet'], createdAt: '2026-04-20' },
  { id: '5', type: 'looking_together', title: '', city: '', district: '', neighborhood: '', monthlyRent: 5000, moveInDate: '2026-06-01', residents: { current: 0, total: 2 }, owner: '', ownerScore: 590, ownerVerified: true, gender: 'male', amenities: ['internet'], createdAt: '2026-04-17' },
];

export default function ListingsPage() {
  const { locale, t } = useI18n();
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
    <div className="min-h-dvh bg-black">
      <DashboardHeader />

      <main className="container-main py-6 sm:py-8">
        <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">{t('listings.title')}</h1>
          <p className="text-white/40 text-sm">{t('listings.found', { count: filtered.length })}</p>
        </div>

        {/* Search Bar */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] lg:items-end">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.city')}</label>
              <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} className="input-field py-2">
                <option value="istanbul">{t('common.cities.istanbul')}</option>
                <option value="ankara">{t('common.cities.ankara')}</option>
                <option value="izmir">{t('common.cities.izmir')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.maxBudget')}</label>
              <input type="number" placeholder="20000" value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                className="input-field py-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.sort')}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="input-field py-2">
                <option value="newest">{t('listings.sort.newest')}</option>
                <option value="price_asc">{t('listings.sort.price_asc')}</option>
                <option value="price_desc">{t('listings.sort.price_desc')}</option>
                <option value="score">{t('listings.sort.score')}</option>
              </select>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-outline flex items-center justify-center gap-2 py-2">
              <SlidersHorizontal size={18} />
              {t('listings.filters.filters')}
              {(filters.type !== 'all' || filters.gender !== 'all' || filters.verifiedOnly || filters.moveInDate || filters.minScore) && (
                <span className="w-2 h-2 bg-secondary rounded-full" />
              )}
            </button>
            <button className="btn-primary flex items-center justify-center gap-2 py-2">
              <Search size={18} />
              {t('common.actions.search')}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-white/10 pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.type')}</label>
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="input-field py-2 text-sm">
                  <option value="all">{t('listings.filters.all')}</option>
                  <option value="room_available">{t('common.listingTypes.room_available')}</option>
                  <option value="looking_for_room">{t('common.listingTypes.looking_for_room')}</option>
                  <option value="looking_together">{t('common.listingTypes.looking_together')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.gender')}</label>
                <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })} className="input-field py-2 text-sm">
                  <option value="all">{t('common.gender.all')}</option>
                  <option value="male">{t('common.gender.male')}</option>
                  <option value="female">{t('common.gender.female')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.minBudget')}</label>
                <input type="number" placeholder="0" value={filters.minBudget}
                  onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.moveInDate')}</label>
                <input type="date" value={filters.moveInDate}
                  onChange={(e) => setFilters({ ...filters, moveInDate: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.minScore')}</label>
                <input type="number" placeholder="0" min="0" max="1000" value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                  className="input-field py-2 text-sm" />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input id="verifiedOnly" type="checkbox" checked={filters.verifiedOnly}
                  onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                  className="accent-secondary" />
                <label htmlFor="verifiedOnly" className="text-sm font-medium text-white/60 cursor-pointer">{t('listings.filters.verifiedOnly')}</label>
              </div>
              <div className="flex items-end">
                <button onClick={() => setFilters({ city: 'istanbul', district: '', minBudget: '', maxBudget: '', type: 'all', gender: 'all', moveInDate: '', verifiedOnly: false, minScore: '' })}
                  className="text-sm text-white/40 hover:text-white/70 underline">
                  {t('common.actions.clearFilters')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('listings.empty.title')}</h3>
            <p className="text-white/40 mb-6">{t('listings.empty.description')}</p>
            <button onClick={() => setFilters({ city: 'istanbul', district: '', minBudget: '', maxBudget: '', type: 'all', gender: 'all', moveInDate: '', verifiedOnly: false, minScore: '' })}
              className="btn-primary">{t('common.actions.clearFilters')}</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((listing) => {
              const band = scoreBand(listing.ownerScore);
              const isFav = favorites.has(listing.id);
              const listingDate = new Date(listing.moveInDate).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' });
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
                        {t(`common.listingTypes.${listing.type}`)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-base text-white mb-2 line-clamp-2">{t(`listings.mock.${listing.id}.title`)}</h3>
                      <div className="space-y-1.5 mb-3 text-sm text-white/50">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-secondary flex-shrink-0" />
                          {t(`listings.mock.${listing.id}.district`)} / {t(`listings.mock.${listing.id}.neighborhood`)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-white/40 flex-shrink-0" />
                          {listing.residents.current}/{listing.residents.total} {t('common.units.person')} · {t('listings.card.moveIn', { date: listingDate })}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {listing.amenities.slice(0, 3).map((a, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-white/5 text-white/50 rounded-full border border-white/10">{t(`common.amenities.${a}`)}</span>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-3 flex flex-col gap-3 mt-auto sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xl font-bold text-secondary">₺{listing.monthlyRent.toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')}<span className="text-sm font-normal text-white/40">{t('listings.card.perMonth')}</span></p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.color}`}>{t(`common.score.${band.labelKey}`)} {listing.ownerScore}</span>
                            {listing.ownerVerified && <span className="text-xs text-secondary font-semibold">{t('listings.card.verified')}</span>}
                          </div>
                        </div>
                        <span className="text-sm text-white/60 sm:text-right">{t(`listings.mock.${listing.id}.owner`)}</span>
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
