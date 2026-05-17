'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Bell, User, LogOut, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

const MOCK_UNREAD_NOTIFS = 2;
const MOCK_UNREAD_MESSAGES = 1;

const NAV_LINKS = [
  { href: '/dashboard', labelKey: 'dashboard' },
  { href: '/listings', labelKey: 'listings' },
  { href: '/listings/create', labelKey: 'createListing' },
  { href: '/messages', labelKey: 'messages', badge: MOCK_UNREAD_MESSAGES },
  { href: '/payments', labelKey: 'payments' },
  { href: '/expenses', labelKey: 'expenses' },
  { href: '/favorites', labelKey: 'favorites' },
];

const MOBILE_EXTRA_LINKS = [
  { href: '/verify', labelKey: 'verify' },
  { href: '/notifications', labelKey: 'notifications' },
  { href: '/profile', labelKey: 'profile' },
];

export function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const { t } = useI18n();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? 'text-secondary' : 'text-white/60 hover:text-white'
    }`;

  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-40">
      <div className="h-0.5 bg-secondary" />

      <div className="container-main py-3">
        <div className="flex items-center justify-between gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link href="/dashboard" className="text-white font-bold tracking-[0.3em] text-xs uppercase">
            {t('common.brand')}
          </Link>

          <nav className="hidden lg:flex min-w-0 items-center justify-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`${linkClass(link.href)} relative whitespace-nowrap`}>
                {t(`dashboardHeader.nav.${link.labelKey}`)}
                {link.badge && link.badge > 0 && (
                  <span className="absolute -top-2 -right-3 w-4 h-4 bg-secondary text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/notifications" className="relative text-white/60 hover:text-white transition">
              <Bell size={19} />
              {MOCK_UNREAD_NOTIFS > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-black text-xs rounded-full flex items-center justify-center font-bold">
                  {MOCK_UNREAD_NOTIFS}
                </span>
              )}
            </Link>
            <Link href="/favorites" className="text-white/60 hover:text-white transition">
              <Heart size={19} />
            </Link>
            <Link href="/profile" className="text-white/60 hover:text-white transition">
              <User size={19} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-red-400 transition"
              title={t('dashboardHeader.logout')}
            >
              <LogOut size={19} />
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <Link href="/notifications" className="relative text-white/60">
              <Bell size={20} />
              {MOCK_UNREAD_NOTIFS > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-black text-xs rounded-full flex items-center justify-center font-bold">
                  {MOCK_UNREAD_NOTIFS}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden mt-3 border-t border-white/10 pt-3 pb-2 space-y-1">
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-secondary bg-secondary/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(`dashboardHeader.nav.${link.labelKey}`)}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              {t('dashboardHeader.logout')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export function VerificationBadges({ badges }: { badges: string[] }) {
  const { t } = useI18n();
  const config: Record<string, { label: string; icon: string }> = {
    phone_verified: { label: t('common.badges.phone_verified'), icon: 'PHONE' },
    id_verified: { label: t('common.badges.id_verified'), icon: 'ID' },
    face_verified: { label: t('common.badges.face_verified'), icon: 'FACE' },
    photo_verified: { label: t('common.badges.photo_verified'), icon: 'PHOTO' },
    clean_record: { label: t('common.badges.clean_record'), icon: 'OK' },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const item = config[badge];
        if (!item) return null;

        return (
          <span
            key={badge}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
          >
            <span className="text-[10px] font-bold opacity-70">{item.icon}</span>
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const { t } = useI18n();
  let color = 'border-red-500/30 text-red-400 bg-red-500/10';
  let label = t('common.score.low');

  if (score >= 750) {
    color = 'border-amber-500/30 text-amber-400 bg-amber-500/10';
    label = t('common.score.gold');
  } else if (score >= 500) {
    color = 'border-secondary/30 text-secondary bg-secondary/10';
    label = t('common.score.good');
  } else if (score >= 250) {
    color = 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10';
    label = t('common.score.medium');
  }

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-semibold ${color}`}>
      <div className="text-2xl font-bold">{score}</div>
      <div>
        <div className="text-xs opacity-70">{t('common.score.title')}</div>
        <div className="text-sm font-bold">{label}</div>
      </div>
    </div>
  );
}
