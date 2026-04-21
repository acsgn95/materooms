'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Bell, User, LogOut, Heart } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const MOCK_UNREAD_NOTIFS = 2;
const MOCK_UNREAD_MESSAGES = 1;

const NAV_LINKS = [
  { href: '/dashboard',        label: 'Dashboard' },
  { href: '/listings',         label: 'İlanlar' },
  { href: '/listings/create',  label: 'İlan Oluştur' },
  { href: '/messages',         label: 'Mesajlar',  badge: MOCK_UNREAD_MESSAGES },
  { href: '/payments',         label: 'Ödemeler' },
  { href: '/expenses',         label: 'Giderler' },
  { href: '/scores',           label: 'Puanım' },
  { href: '/favorites',        label: 'Favoriler' },
];

export function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const logout   = useAuthStore((s) => s.logout);

  const handleLogout = () => { logout(); router.push('/auth/login'); };

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? 'text-secondary' : 'text-white/60 hover:text-white'
    }`;

  return (
    <header className="bg-black border-b border-white/10 sticky top-0 z-40">
      {/* teal top line */}
      <div className="h-0.5 bg-secondary" />

      <div className="container-main py-3">
        <div className="flex items-center justify-between">

          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkClass(l.href)} relative`}>
                {l.label}
                {l.badge && l.badge > 0 && (
                  <span className="absolute -top-2 -right-3 w-4 h-4 bg-secondary text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link href="/dashboard"
            className="absolute left-1/2 -translate-x-1/2 text-white font-bold tracking-[0.3em] text-xs uppercase hidden lg:block">
            MateRooms
          </Link>
          {/* Mobile logo */}
          <Link href="/dashboard" className="text-white font-bold tracking-[0.3em] text-xs uppercase lg:hidden">
            MateRooms
          </Link>

          {/* Right icons */}
          <div className="hidden lg:flex items-center gap-3">
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
            <button onClick={handleLogout} className="text-white/60 hover:text-red-400 transition" title="Çıkış Yap">
              <LogOut size={19} />
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
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

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden mt-3 border-t border-white/10 pt-3 pb-2 space-y-1">
            {[...NAV_LINKS,
              { href: '/verify',        label: 'Doğrulama' },
              { href: '/notifications', label: 'Bildirimler' },
              { href: '/profile',       label: 'Profil' },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === l.href ? 'text-secondary bg-secondary/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}>
                {l.label}
              </Link>
            ))}
            <button onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
              Çıkış Yap
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export function VerificationBadges({ badges }: { badges: string[] }) {
  const config: Record<string, { label: string; icon: string }> = {
    phone_verified: { label: 'Telefon', icon: '📱' },
    id_verified:    { label: 'Kimlik',  icon: '🆔' },
    face_verified:  { label: 'Yüz',     icon: '👤' },
    photo_verified: { label: 'Fotoğraf',icon: '📸' },
    clean_record:   { label: 'Temiz Sicil', icon: '✅' },
  };
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => {
        const c = config[b];
        if (!c) return null;
        return (
          <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
            {c.icon} {c.label}
          </span>
        );
      })}
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  let color = 'border-red-500/30 text-red-400 bg-red-500/10';
  let label = 'Düşük';
  if (score >= 750) { color = 'border-amber-500/30 text-amber-400 bg-amber-500/10'; label = 'Altın'; }
  else if (score >= 500) { color = 'border-secondary/30 text-secondary bg-secondary/10'; label = 'İyi'; }
  else if (score >= 250) { color = 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'; label = 'Orta'; }

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border font-semibold ${color}`}>
      <div className="text-2xl font-bold">{score}</div>
      <div>
        <div className="text-xs opacity-70">Flatmate Puanı</div>
        <div className="text-sm font-bold">{label}</div>
      </div>
    </div>
  );
}
