'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import translations from './translations.json';

export type Locale = keyof typeof translations;
export type Messages = (typeof translations)['tr'];

const DEFAULT_LOCALE: Locale = 'tr';
const STORAGE_KEY = 'materooms-locale';
const LOCALES = Object.keys(translations) as Locale[];

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return Boolean(value && LOCALES.includes(value as Locale));
}

function readPath(source: Messages, key: string): unknown {
  return key.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function interpolate(value: string, variables?: Record<string, string | number>) {
  if (!variables) return value;

  return Object.entries(variables).reduce(
    (text, [name, replacement]) => text.split(`{${name}}`).join(String(replacement)),
    value
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo<I18nContextValue>(() => {
    const messages = translations[locale] as Messages;

    return {
      locale,
      messages,
      setLocale,
      t: (key, variables) => {
        const translated = readPath(messages, key);
        return typeof translated === 'string' ? interpolate(translated, variables) : key;
      },
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
