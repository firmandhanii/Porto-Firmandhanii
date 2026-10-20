import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ui, type Lang, type Localized } from './translations'

const STORAGE_KEY = 'portfolio-lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Static UI strings for the active language */
  t: (typeof ui)[Lang]
  /** Pick the active-language value from a bilingual content field */
  l: <T>(value: Localized<T>) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'id' || stored === 'en') return stored
  return window.navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => setLang((prev) => (prev === 'en' ? 'id' : 'en')), [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: ui[lang],
      l: (field) => field[lang],
    }),
    [lang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
