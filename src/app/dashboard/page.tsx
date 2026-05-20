'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { Plus, MessageSquare, Heart, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import { useAuthStore } from '@/store/authStore';
import { listListings } from '@/lib/listings';
import { ApiCallError } from '@/lib/api';
import type { Listing } from '@/types/api';

export default function DashboardPage() {
  const { t } = useI18n();
  const authUser = useAuthStore((s) => s.user);

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = {
    name: authUser?.profile?.full_name || 'MateRooms Kullanıcısı',
    phone: authUser?.phone || '',
    city: authUser?.profile?.city || '',
  };

  useEffect(() => {
    if (!authUser?.id) return;
    (async () => {
      try {
        const data = await listListings({ user_id: authUser.id, page_size: 20 });
        setListings(data);
      } catch (err) {
        const e = err as ApiCallError;
        setError(e.message || 'İlanlar yüklenemedi.');
      } finally {
        setLoading(false);
      }
    })();
  }, [authUser?.id]);

  const daysLeft = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);

  return (
    <div className="min-h-dvh bg-black">
      <DashboardHeader />

      <main className="container-main py-6 sm:py-10">
        <div className="border border-white/10 rounded-2xl p-5 sm:p-8 mb-8 sm:mb-10 bg-zinc-900/50 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-white mb-1">{t('dashboard.welcome', { name: user.name })}</h1>
            <p className="text-white/40 text-sm">{t('dashboard.subtitle', { city: user.city })}</p>
          </div>
          <Link href="/listings/create" className="btn-primary flex w-full items-center justify-center gap-2 sm:w-auto">
            <Plus size={18} /> {t('dashboard.createListing')}
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: t('dashboard.stats.activeListings'), value: loading ? '…' : listings.length, icon: <Plus size={20} />, color: 'text-secondary' },
            { label: t('dashboard.stats.newMessages'), value: 0, icon: <MessageSquare size={20} />, color: 'text-secondary' },
            { label: t('dashboard.stats.favorites'), value: 0, icon: <Heart size={20} />, color: 'text-secondary' },
          ].map((s) => (
            <div key={s.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                <span className={s.color}>{s.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                  <p className="text-white/40 text-sm">{user.phone}</p>
                </div>
                <Link href="/profile" className="btn-outline text-center text-sm px-4 py-2 sm:text-left">{t('dashboard.edit')}</Link>
              </div>
            </div>

            <div className="card">
              <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-white">{t('dashboard.stats.activeListings')}</h2>
                <Link href="/listings/create" className="btn-primary text-center text-sm px-4 py-2">{t('dashboard.newListing')}</Link>
              </div>

              {loading ? (
                <p className="text-white/40 text-sm">Yükleniyor...</p>
              ) : listings.length === 0 ? (
                <p className="text-white/40 text-sm">Henüz ilanınız yok. Üst butonla ilk ilanınızı oluşturun.</p>
              ) : (
                <div className="space-y-3">
                  {listings.map((l) => {
                    const days = daysLeft(l.expires_at);
                    return (
                      <Link key={l.id} href={`/listings/${l.id}`} className="block border border-white/10 rounded-xl p-4 hover:border-secondary/30 transition">
                        <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="font-medium text-white text-sm">{l.title}</h3>
                            <p className="text-white/40 text-xs mt-0.5">
                              {t('dashboard.listingMeta', { district: l.district, current: l.residents_current, total: l.residents_total })}
                            </p>
                          </div>
                          <p className="text-secondary font-bold sm:text-right">₺{(l.rent_per_person ?? l.rent_full).toLocaleString('tr-TR')}</p>
                        </div>
                        <div className="flex flex-col gap-2 text-xs text-white/40 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <span>{l.amenities.length} olanak · {l.listing_type}</span>
                          <span className={`flex items-center gap-1 sm:justify-end ${days <= 7 ? 'text-amber-400' : 'text-white/30'}`}>
                            {days <= 7 ? <AlertTriangle size={11} /> : <RefreshCw size={11} />}
                            {t('dashboard.daysLeft', { days })}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-white">{t('dashboard.lastMessages')}</h3>
                <Link href="/messages" className="text-secondary text-xs hover:underline">{t('dashboard.all')}</Link>
              </div>
              <p className="text-white/40 text-sm">Mesajlaşma yakında.</p>
            </div>

            <div className="card">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-5">{t('dashboard.quickActions')}</p>
              <div className="space-y-3">
                <Link href="/listings" className="btn-secondary flex w-full justify-center text-center text-sm py-2.5">{t('dashboard.searchListings')}</Link>
                <Link href="/verify" className="btn-secondary flex w-full justify-center text-center text-sm py-2.5">{t('dashboard.completeVerification')}</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
