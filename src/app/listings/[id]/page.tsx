'use client';

import { DashboardHeader } from '@/components/common/DashboardHeader';
import { VerificationBadges, ScoreBadge } from '@/components/common/DashboardHeader';
import { ArrowLeft, MapPin, Users, Calendar, Wifi, Sofa, WashingMachine, Wind, MessageSquare, Heart, Share2, Flag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

export default function ListingDetailPage() {
  const params = useParams();
  const { locale, t } = useI18n();
  const dateLocale = locale === 'tr' ? 'tr-TR' : 'en-US';

  const listing = {
    id: params.id,
    type: 'room_available',
    monthlyRent: { full: 15000, perPerson: 7500 },
    moveInDate: '2026-05-01',
    residents: { current: 1, total: 2 },
    houseRules: {
      smoking: false,
      pets: false,
      genderPreference: 'any',
      quietHours: { start: '23:00', end: '08:00' },
    },
    amenities: ['furnished', 'internet', 'washing_machine', 'balcony', 'ac'],
    photos: ['🏘️', '🛋️', '🛏️', '🚿'],
    expiresAt: '2026-06-20',
    createdAt: '2026-04-20',
  };

  const owner = {
    id: 'u1',
    age: 27,
    verificationBadges: ['phone_verified', 'id_verified'],
    flatmateScore: 720,
    memberSince: '2026-01-01',
  };

  const amenityLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    furnished: { label: t('common.amenities.furnished'), icon: <Sofa size={16} /> },
    internet: { label: t('common.amenities.internet'), icon: <Wifi size={16} /> },
    washing_machine: { label: t('common.amenities.washing_machine'), icon: <WashingMachine size={16} /> },
    balcony: { label: t('common.amenities.balcony'), icon: <Wind size={16} /> },
    ac: { label: t('common.amenities.ac'), icon: <Wind size={16} /> },
  };
  const ownerName = t('listingDetail.mock.owner.name');
  const ownerBio = t('listingDetail.mock.owner.bio');
  const ownerOccupation = t('listingDetail.mock.owner.occupation');

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader />

      <main className="container-main py-12">
        <Link href="/listings" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition">
          <ArrowLeft size={20} />
          {t('listingDetail.back')}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="grid grid-cols-4 gap-2 h-64">
              <div className="col-span-2 row-span-2 bg-zinc-800 rounded-xl flex items-center justify-center text-8xl">
                {listing.photos[0]}
              </div>
              {listing.photos.slice(1).map((p, i) => (
                <div key={i} className="bg-zinc-800 rounded-xl flex items-center justify-center text-4xl">
                  {p}
                </div>
              ))}
            </div>

            {/* Title & Actions */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full mb-2 inline-block">
                    {t(`common.listingTypes.${listing.type}`)}
                  </span>
                  <h1 className="text-3xl font-serif font-light text-white">{t('listingDetail.mock.listing.title')}</h1>
                  <div className="flex items-center gap-2 text-white/40 mt-2">
                    <MapPin size={16} className="text-secondary" />
                    {t('listingDetail.mock.listing.city')} / {t('listingDetail.mock.listing.district')} / {t('listingDetail.mock.listing.neighborhood')}
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

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">
                    ₺{listing.monthlyRent.perPerson?.toLocaleString(dateLocale)}
                  </p>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.rentPerPerson')}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                    <Users size={20} className="text-secondary" />
                    {listing.residents.current}/{listing.residents.total}
                  </div>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.residents')}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                    <Calendar size={20} className="text-secondary" />
                    {new Date(listing.moveInDate).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' })}
                  </div>
                  <p className="text-xs text-white/40">{t('listingDetail.metrics.moveIn')}</p>
                </div>
              </div>

              <p className="mt-4 text-white/60 leading-relaxed">{t('listingDetail.mock.listing.description')}</p>
            </div>

            {/* Amenities */}
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">{t('listingDetail.sections.amenities')}</h2>
              <div className="grid grid-cols-3 gap-3">
                {listing.amenities.map((a) => {
                  const config = amenityLabels[a];
                  return config ? (
                    <div key={a} className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg text-sm font-medium text-white/70">
                      <span className="text-secondary">{config.icon}</span>
                      {config.label}
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">{t('listingDetail.sections.rules')}</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className={`flex items-center gap-2 p-3 rounded-lg ${listing.houseRules.smoking ? 'bg-red-500/10 text-red-400' : 'bg-secondary/10 text-secondary'}`}>
                  {listing.houseRules.smoking ? t('listingDetail.rules.smokingAllowed') : t('listingDetail.rules.smokingForbidden')}
                </div>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${listing.houseRules.pets ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-400'}`}>
                  {listing.houseRules.pets ? t('listingDetail.rules.petsAllowed') : t('listingDetail.rules.petsForbidden')}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 text-white/60">
                  {t('listingDetail.rules.quietHours', { start: listing.houseRules.quietHours?.start, end: listing.houseRules.quietHours?.end })}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 text-white/60">
                  {t('listingDetail.rules.gender', { gender: t(`common.gender.${listing.houseRules.genderPreference}`) })}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Owner & CTA */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="card sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-secondary">
                  ₺{listing.monthlyRent.perPerson?.toLocaleString(dateLocale)}
                  <span className="text-base font-normal text-white/40">{t('listingDetail.cta.perMonth')}</span>
                </p>
                <p className="text-sm text-white/40">{t('listingDetail.cta.totalRent', { amount: listing.monthlyRent.full.toLocaleString(dateLocale) })}</p>
              </div>

              <Link href="/messages" className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                <MessageSquare size={20} />
                {t('listingDetail.cta.message')}
              </Link>
              <button className="btn-outline w-full">{t('listingDetail.cta.favorite')}</button>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30 text-center">
                {t('listingDetail.cta.validUntil', { date: new Date(listing.expiresAt).toLocaleDateString(dateLocale) })}
              </div>
            </div>

            {/* Owner Card */}
            <div className="card">
              <h3 className="font-semibold text-white mb-4">{t('listingDetail.sections.owner')}</h3>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center text-secondary text-2xl font-bold flex-shrink-0">
                  {ownerName[0]}
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{ownerName}</p>
                  <p className="text-sm text-white/40">{t('listingDetail.owner.ageOccupation', { age: owner.age, occupation: ownerOccupation })}</p>
                  <p className="text-xs text-white/30 mt-1">
                    {t('listingDetail.owner.memberSince', { date: new Date(owner.memberSince).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long' }) })}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <VerificationBadges badges={owner.verificationBadges} />
              </div>

              <div className="mb-4">
                <ScoreBadge score={owner.flatmateScore} />
              </div>

              {ownerBio && (
                <p className="text-sm text-white/40 italic border-t border-white/10 pt-3">"{ownerBio}"</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
