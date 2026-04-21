import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-secondary mb-4">404</div>
        <h1 className="text-2xl font-serif font-light text-white mb-3">Sayfa Bulunamadı</h1>
        <p className="text-white/40 mb-8">
          Aradığın sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary">Dashboard'a Dön</Link>
          <Link href="/listings" className="btn-outline">İlanlara Bak</Link>
        </div>
      </div>
    </div>
  );
}
