import { useEffect, useState } from 'react'
import { LegalDocumentBody } from '../components/LegalDocumentBody.jsx'
import { SiteShell } from '../components/SiteShell.jsx'
import { useSiteLanguage } from '../context/LanguageContext.jsx'
import { termsOfUseByLang } from '../termsOfUseData.js'

export default function TermsOfUsePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language } = useSiteLanguage()
  const data = termsOfUseByLang[language]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [language])

  return (
    <SiteShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <main className="legal-page-main">
        <article className="legal-doc-card">
          <LegalDocumentBody data={data} titleId="terms-title" idPrefix="tu" />
        </article>
      </main>
    </SiteShell>
  )
}
