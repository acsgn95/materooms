'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'materooms-demo-banner-dismissed';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 text-red-500 text-xs sm:text-sm">
      <div className="container-main py-2 flex items-center justify-between gap-3">
        <p>
          <strong className="uppercase tracking-wider">Demo</strong> · Bu bir test ortamıdır. Gerçek kimlik, finansal veya hassas veri girmeyiniz.
        </p>
        <button
          aria-label="Kapat"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, '1');
            setDismissed(true);
          }}
          className="text-red-500/70 hover:text-red-500 flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
