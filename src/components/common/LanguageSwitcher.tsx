'use client';

import { Languages } from 'lucide-react';
import { type Locale, useI18n } from '@/i18n/I18nProvider';

const OPTIONS: Locale[] = ['tr', 'en'];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 p-1 text-xs text-white/70">
      <Languages size={14} className="ml-2 text-white/40" aria-hidden="true" />
      <span className="sr-only">{t('common.language')}</span>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`rounded-full px-2.5 py-1 font-semibold transition ${
            locale === option ? 'bg-white text-black' : 'hover:bg-white/10 hover:text-white'
          }`}
          aria-pressed={locale === option}
        >
          {t(`common.languages.${option}`)}
        </button>
      ))}
    </div>
  );
}
