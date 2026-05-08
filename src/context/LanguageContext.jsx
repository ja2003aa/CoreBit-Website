import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { siteContent } from '../siteContent.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ar')

  useEffect(() => {
    const loc = siteContent[language]
    document.documentElement.lang = loc.htmlLang
    document.documentElement.dir = loc.dir
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: siteContent[language],
    }),
    [language],
  )
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useSiteLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useSiteLanguage must be used within LanguageProvider')
  }
  return ctx
}
