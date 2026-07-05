'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Search, MapPin, Users, Heart, SlidersHorizontal, List, Map } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { listListings } from '@/lib/listings';
import { ApiCallError } from '@/lib/api';
import type { Listing, ListingType } from '@/types/api';
import { CITY_NAMES } from '@/lib/cities';

const ListingsMap = dynamic(() => import('@/components/ListingsMap'), { ssr: false });

const scoreBand = (score: number | null) => {
  const s = score ?? 0;
  if (s >= 750) return { labelKey: 'gold', color: 'bg-amber-500/20 text-amber-400' };
  if (s >= 500) return { labelKey: 'good', color: 'bg-secondary/20 text-secondary' };
  if (s >= 250) return { labelKey: 'medium', color: 'bg-yellow-500/20 text-yellow-400' };
  return { labelKey: 'low', color: 'bg-red-500/20 text-red-400' };
};

type Filters = {
  city: string;
  district: string;
  minBudget: string;
  maxBudget: string;
  type: 'all' | ListingType;
  gender: 'all' | 'male' | 'female';
  moveInDate: string;
  verifiedOnly: boolean;
  minScore: string;
};

const INITIAL_FILTERS: Filters = {
  city: 'istanbul',
  district: '',
  minBudget: '',
  maxBudget: '',
  type: 'all',
  gender: 'all',
  moveInDate: '',
  verifiedOnly: false,
  minScore: '',
};

export default function ListingsPage() {
  const { locale, t } = useI18n();
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'score'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const search = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listListings({
        city: filters.city || undefined,
        listing_type: filters.type !== 'all' ? filters.type : undefined,
        budget_min: filters.minBudget ? Number(filters.minBudget) : undefined,
        budget_max: filters.maxBudget ? Number(filters.maxBudget) : undefined,
        page_size: 50,
      });
      setListings(data);
    } catch (err) {
      const e = err as ApiCallError;
      setError(e.message || 'İlanlar yüklenemedi.');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSorted = useMemo(() => {
    const filtered = listings.filter((l) => {
      const genderPref = (l.house_rules?.gender_preference || 'any') as string;
      const ownerScore = l.owner?.flatmate_score ?? 0;
      const ownerVerified = (l.owner?.verification_badges?.length || 0) > 0;

      if (filters.gender !== 'all' && genderPref !== filters.gender && genderPref !== 'any') return false;
      if (filters.verifiedOnly && !ownerVerified) return false;
      if (filters.minScore && ownerScore < Number(filters.minScore)) return false;
      if (filters.moveInDate && l.move_in_date > filters.moveInDate) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price_asc') return a.rent_full - b.rent_full;
      if (sortBy === 'price_desc') return b.rent_full - a.rent_full;
      if (sortBy === 'score') return (b.owner?.flatmate_score ?? 0) - (a.owner?.flatmate_score ?? 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [listings, filters, sortBy]);

  return (
    <div className="min-h-dvh bg-black">
      <DashboardHeader />

      <main className="container-main py-6 sm:py-8">
        <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">{t('listings.title')}</h1>
          <div className="flex items-center gap-3">
            <p className="text-white/40 text-sm">{t('listings.found', { count: filteredSorted.length })}</p>
            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${viewMode === 'list' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                <List size={15} /> Liste
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${viewMode === 'map' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                <Map size={15} /> Harita
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="card mb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto] lg:items-end">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.city')}</label>
              <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} className="input-field py-2">
                <option value="">Tüm Şehirler</option>
                {CITY_NAMES.map(city => (
                  <option key={city} value={city.toLowerCase()}>{city}</option>
                ))}
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
            <button onClick={search} disabled={loading} className="btn-primary flex items-center justify-center gap-2 py-2 disabled:opacity-50">
              <Search size={18} />
              {loading ? '...' : t('common.actions.search')}
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-white/10 pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.type')}</label>
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value as Filters['type'] })} className="input-field py-2 text-sm">
                  <option value="all">{t('listings.filters.all')}</option>
                  <option value="room_available">{t('common.listingTypes.room_available')}</option>
                  <option value="looking_for_room">{t('common.listingTypes.looking_for_room')}</option>
                  <option value="looking_together">{t('common.listingTypes.looking_together')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wider">{t('listings.filters.gender')}</label>
                <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value as Filters['gender'] })} className="input-field py-2 text-sm">
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
                <button onClick={() => setFilters(INITIAL_FILTERS)}
                  className="text-sm text-white/40 hover:text-white/70 underline">
                  {t('common.actions.clearFilters')}
                </button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/40">Yükleniyor...</div>
        ) : filteredSorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('listings.empty.title')}</h3>
            <p className="text-white/40 mb-6">{t('listings.empty.description')}</p>
            <button onClick={() => { setFilters(INITIAL_FILTERS); search(); }}
              className="btn-primary">{t('common.actions.clearFilters')}</button>
          </div>
        ) : viewMode === 'map' ? (
          <div style={{ height: '65vh' }}>
            <ListingsMap listings={filteredSorted as any} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSorted.map((listing) => {
              const band = scoreBand(listing.owner?.flatmate_score ?? null);
              const isFav = favorites.has(listing.id);
              const isVerified = (listing.owner?.verification_badges?.length || 0) > 0;
              const dateLabel = new Date(listing.move_in_date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' });
              const photoUrl = listing.photos[0]?.url;

              return (
                <Link key={listing.id} href={`/listings/${listing.id}`}
                  className="border border-white/10 rounded-xl overflow-hidden hover:border-secondary/30 transition group bg-zinc-900">
                  <div className="flex flex-col h-full">
                    <div className="relative bg-zinc-800 h-44 flex items-center justify-center overflow-hidden">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoUrl} alt={listing.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-7xl">🏘️</span>
                      )}
                      <button onClick={(e) => toggleFavorite(listing.id, e)}
                        className={`absolute top-3 right-3 bg-black/60 rounded-full p-2 transition ${isFav ? 'text-secondary' : 'text-white/40 opacity-0 group-hover:opacity-100'}`}>
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                      <span className="absolute top-3 left-3 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded-full">
                        {t(`common.listingTypes.${listing.listing_type}`)}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-base text-white mb-2 line-clamp-2">{listing.title}</h3>
                      <div className="space-y-1.5 mb-3 text-sm text-white/50">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-secondary flex-shrink-0" />
                          {listing.district}{listing.neighborhood ? ` / ${listing.neighborhood}` : ''}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-white/40 flex-shrink-0" />
                          {listing.residents_current}/{listing.residents_total} {t('common.units.person')} · {t('listings.card.moveIn', { date: dateLabel })}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {listing.amenities.slice(0, 3).map((a, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-white/5 text-white/50 rounded-full border border-white/10">{t(`common.amenities.${a}`)}</span>
                        ))}
                      </div>
                      <div className="border-t border-white/10 pt-3 flex flex-col gap-3 mt-auto sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xl font-bold text-secondary">₺{listing.rent_full.toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')}<span className="text-sm font-normal text-white/40">{t('listings.card.perMonth')}</span></p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${band.color}`}>{t(`common.score.${band.labelKey}`)} {listing.owner?.flatmate_score ?? 0}</span>
                            {isVerified && <span className="text-xs text-secondary font-semibold">{t('listings.card.verified')}</span>}
                          </div>
                        </div>
                        <span className="text-sm text-white/60 sm:text-right">{listing.owner?.full_name ?? '—'}</span>
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
