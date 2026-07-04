'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAdminSecret } from '@/lib/admin';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Kullanıcılar', icon: '👥' },
  { href: '/admin/listings', label: 'İlanlar', icon: '🏠' },
  { href: '/admin/system', label: 'Sistem', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  function handleLogout() {
    clearAdminSecret();
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-56 bg-gray-900 flex flex-col py-6 px-4 shrink-0">
        <div className="mb-8">
          <span className="text-red-500 font-bold text-lg">MateRooms</span>
          <span className="text-gray-400 text-xs block">Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-400 text-sm text-left px-3 py-2 transition"
        >
          Çıkış Yap
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
