'use client';

import Link from 'next/link';
import { Menu, X, Home, Plus, Search, Mail, User, LogOut, CreditCard, TrendingUp, Receipt } from 'lucide-react';
import { useState } from 'react';

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-main py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            RoomMate
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-primary transition">
              <Home size={20} />
              Dashboard
            </Link>
            <Link href="/listings" className="flex items-center gap-2 hover:text-primary transition">
              <Search size={20} />
              İlanlar
            </Link>
            <Link href="/listings/create" className="flex items-center gap-2 hover:text-primary transition">
              <Plus size={20} />
              İlan Oluştur
            </Link>
            <Link href="/messages" className="flex items-center gap-2 hover:text-primary transition">
              <Mail size={20} />
              Mesajlar
            </Link>
            <Link href="/payments" className="flex items-center gap-2 hover:text-primary transition">
              <CreditCard size={20} />
              Ödemeler
            </Link>
            <Link href="/expenses" className="flex items-center gap-2 hover:text-primary transition">
              <Receipt size={20} />
              Giderler
            </Link>
            <Link href="/scores" className="flex items-center gap-2 hover:text-primary transition">
              <TrendingUp size={20} />
              Puanım
            </Link>
            <Link href="/profile" className="flex items-center gap-2 hover:text-primary transition">
              <User size={20} />
              Profil
            </Link>
            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
              <LogOut size={20} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-4 border-t pt-4">
            <Link href="/dashboard" className="block py-2 hover:text-primary">Dashboard</Link>
            <Link href="/listings" className="block py-2 hover:text-primary">İlanlar</Link>
            <Link href="/listings/create" className="block py-2 hover:text-primary">İlan Oluştur</Link>
            <Link href="/messages" className="block py-2 hover:text-primary">Mesajlar</Link>
            <Link href="/payments" className="block py-2 hover:text-primary">Ödemeler</Link>
            <Link href="/expenses" className="block py-2 hover:text-primary">Giderler</Link>
            <Link href="/scores" className="block py-2 hover:text-primary">Puanım</Link>
            <Link href="/profile" className="block py-2 hover:text-primary">Profil</Link>
            <Link href="/verify" className="block py-2 hover:text-primary">Doğrulama</Link>
            <button className="block py-2 text-gray-600 hover:text-primary w-full text-left">Çıkış Yap</button>
          </nav>
        )}
      </div>
    </header>
  );
}

export function VerificationBadges({ badges }: { badges: string[] }) {
  const badgeConfig: Record<string, { label: string; color: string; icon: string }> = {
    phone_verified: { label: 'Telefon', color: 'bg-blue-100 text-blue-700', icon: '📱' },
    id_verified: { label: 'Kimlik', color: 'bg-green-100 text-green-700', icon: '🆔' },
    face_verified: { label: 'Yüz', color: 'bg-purple-100 text-purple-700', icon: '👤' },
    photo_verified: { label: 'Fotoğraf', color: 'bg-pink-100 text-pink-700', icon: '📸' },
    clean_record: { label: 'Temiz Sicil', color: 'bg-yellow-100 text-yellow-700', icon: '✅' },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const config = badgeConfig[badge];
        return (
          <span
            key={badge}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
          >
            {config.icon} {config.label}
          </span>
        );
      })}
    </div>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  let color = 'bg-red-100 text-red-700';
  let label = 'Kötü';

  if (score >= 750) {
    color = 'bg-amber-100 text-amber-700';
    label = 'Altın';
  } else if (score >= 500) {
    color = 'bg-green-100 text-green-700';
    label = 'İyi';
  } else if (score >= 250) {
    color = 'bg-yellow-100 text-yellow-700';
    label = 'Orta';
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${color}`}>
      <div className="text-2xl font-bold">{score}</div>
      <div>
        <div className="text-xs">Flatmate Puanı</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
}
