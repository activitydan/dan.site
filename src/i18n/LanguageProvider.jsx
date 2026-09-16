import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './context';
import { translations, DEFAULT_LANG, LANGUAGES } from './translations';

const STORAGE_KEY = 'site-lang';

// Walks a dotted path, returning undefined rather than throwing on a gap, so
// a missing key falls through to the default language instead of crashing.
const resolve = (root, path) =>
  path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), root);

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : DEFAULT_LANG;
  } catch {
    // Private windows and blocked site data throw on access; the default is
    // a fine answer there, and the site must still render.
    return DEFAULT_LANG;
  }
};

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not being able to remember the choice is not worth breaking a render.
    }
    // Screen readers and translation tools pick pronunciation from this.
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'it' ? 'en' : 'it'));
  }, []);

  const t = useCallback(
    (path) => {
      const value = resolve(translations[lang], path);
      if (value !== undefined) return value;
      // An untranslated key should show the Italian copy, never a blank slot.
      const fallback = resolve(translations[DEFAULT_LANG], path);
      return fallback !== undefined ? fallback : path;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
