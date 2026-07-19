'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { VerificationBadges, ScoreBadge } from '@/components/common/DashboardHeader';
import { ArrowLeft, MapPin, Users, Calendar, Wifi, Sofa, WashingMachine, Wind, MessageSquare, Heart, Share2, Flag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { getListing } from '@/lib/listings';
import { ApiCallError } from '@/lib/api';
import type { Listing } from '@/types/api';

const ListingDetailMap = dynamic(() => import('@/components/ListingDetailMap'), { ssr: false });

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const { locale, t } = useI18n();
  const dateLocale = locale === 'tr' ? 'tr-TR' : 'en-US';

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      try {
        const data = await getListing(params.id);
        setListing(data);
      } catch (err) {
        const e = err as ApiCallError;
        setError(e.message || 'İlan bulunamadı.');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  const amenityIcons: Record<string, React.ReactNode> = {
    furnished: <Sofa size={16} />,
    internet: <Wifi size={16} />,
    washing_machine: <WashingMachine size={16} />,
    balcony: <Wind size={16} />,
    ac: <Wind size={16} />,
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-black">
        <DashboardHeader />
        <main className="container-main py-12 text-center text-white/40">Yükleniyor...</main>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-dvh bg-black">
        <DashboardHeader />
        <main className="container-main py-12">
          <Link href="/listings" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
            <ArrowLeft size={20} />
            {t('listingDetail.back')}
          </Link>
          <div className="text-center py-12">
            <p className="text-white mb-2 text-xl">{error || 'İlan bulunamadı'}</p>
          </div>
        </main>
      </div>
    );
  }

  const ownerName = listing.owner?.full_name ?? '—';
  const ownerScore = listing.owner?.flatmate_score ?? 0;
  const ownerBadges = listing.owner?.verification_badges ?? [];
  const houseRules = listing.house_rules ?? {};
  const photos = listing.photos ?? [];

  return (
    <div className="min-h-dvh bg-black">
      <DashboardHeader />

      <main className="container-main py-6 sm:py-12">
        <Link href="/listings" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          {t('listingDetail.back')}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-auto sm:h-64">
              {photos.length > 0 ? (
                <>
                  <div className="col-span-2 sm:row-span-2 min-h-48 sm:min-h-0 bg-zinc-800 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photos[0].url} alt="" className="w-full h-full object-cover" />
                  </div>
                  {photos.slice(1, 5).map((p) => (
                    <div key={p.id} className="min-h-24 sm:min-h-0 bg-zinc-800 rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-2 sm:col-span-4 sm:row-span-2 min-h-48 bg-zinc-800 rounded-xl flex items-center justify-center text-7xl">
                  🏘️
                </div>
              )}
            </div>

            <div className="card">
              <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between sm:items-start">
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full mb-2 inline-block">
                    {t(`common.listingTypes.${listing.listing_type}`)}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-light text-white">{listing.title}</h1>
                  <div className="flex items-start gap-2 text-white/40 mt-2 text-sm sm:items-center">
                    <MapPin size={16} className="text-secondary" />
                    {listing.city}{listing.district ? ` / ${listing.district}` : ''}{listing.neighborhood ? ` / ${listing.neighborhood}` : ''}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-white/10 rounded-lg hover:border-secondary/50 transition">
                    <Heart size={20} className="text-white/60" />
                  </button>
                  <button className="p-2 border border-white/10 rounded-lg hover:border-white/30 transition">
                    <Share2 size={20} className="text-white/60" />
                  </button>
                  <button className="p-2 border border-white/10 rounded-lg hover:border-red-500/50 transition">
                    <Flag size={20} className="text-white/60" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 py-4 border-y border-white/10 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">
                    ₺{(listing.rent_per_person ?? listing.rent_full).toLocaleString(dateLocale)}
                  </p>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.rentPerPerson')}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                    <Users size={20} className="text-secondary" />
                    {listing.residents_current}/{listing.residents_total}
                  </div>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.residents')}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                    <Calendar size={20} className="text-secondary" />
                    {new Date(listing.move_in_date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })}
                  </div>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.moveIn')}</p>
                </div>
              </div>

              {listing.description && (
                <p className="mt-4 text-white/60 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              )}
            </div>

            {listing.amenities.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4">{t('listingDetail.sections.amenities')}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {listing.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg text-sm font-medium text-white/70">
                      <span className="text-secondary">{amenityIcons[a] ?? <Wifi size={16} />}</span>
                      {t(`common.amenities.${a}`)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">{t('listingDetail.sections.rules')}</h2>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className={`flex items-center gap-2 p-3 rounded-lg ${houseRules.smoking ? 'bg-red-500/10 text-red-400' : 'bg-secondary/10 text-secondary'}`}>
                  {houseRules.smoking ? t('listingDetail.rules.smokingAllowed') : t('listingDetail.rules.smokingForbidden')}
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${houseRules.pets ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-400'}`}>
                  {houseRules.pets ? t('listingDetail.rules.petsAllowed') : t('listingDetail.rules.petsForbidden')}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 text-white/60">
                  {t('listingDetail.rules.gender', { gender: t(`common.gender.${houseRules.gender_preference ?? 'any'}`) })}
                </div>
              </div>
            </div>

            {listing.latitude && listing.longitude && (
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-secondary" />
                  Konum
                </h2>
                <ListingDetailMap lat={listing.latitude} lng={listing.longitude} title={listing.title} />
                <p className="text-xs text-white/30 mt-2">Gösterilen konum yaklaşık olabilir.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card lg:sticky lg:top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-secondary">
                  ₺{(listing.rent_per_person ?? listing.rent_full).toLocaleString(dateLocale)}
                  <span className="text-base font-normal text-white/40">{t('listingDetail.cta.perMonth')}</span>
                </p>
                <p className="text-sm text-white/40">{t('listingDetail.cta.totalRent', { amount: listing.rent_full.toLocaleString(dateLocale) })}</p>
              </div>

              <Link href="/messages" className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                <MessageSquare size={20} />
                {t('listingDetail.cta.message')}
              </Link>
              <button className="btn-outline w-full">{t('listingDetail.cta.favorite')}</button>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30 text-center">
                {t('listingDetail.cta.validUntil', { date: new Date(listing.expires_at).toLocaleDateString(dateLocale) })}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-4">{t('listingDetail.sections.owner')}</h3>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center text-secondary text-2xl font-bold flex-shrink-0">
                  {ownerName[0]}
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{ownerName}</p>
                </div>
              </div>

              {ownerBadges.length > 0 && (
                <div className="mb-4">
                  <VerificationBadges badges={ownerBadges} />
                </div>
              )}

              <div className="mb-4">
                <ScoreBadge score={ownerScore} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
