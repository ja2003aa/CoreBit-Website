import { useEffect, useState } from 'react'
import { LegalDocumentBody } from '../components/LegalDocumentBody.jsx'
import { SiteShell } from '../components/SiteShell.jsx'
import { useSiteLanguage } from '../context/LanguageContext.jsx'
import { privacyPolicyByLang } from '../privacyPolicyData.js'

export default function PrivacyPolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language } = useSiteLanguage()
  const data = privacyPolicyByLang[language]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [language])

  return (
    <SiteShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <main className="legal-page-main">
        <article className="legal-doc-card">
          <LegalDocumentBody data={data} titleId="privacy-title" idPrefix="pp" />
        </article>
      </main>
    </SiteShell>
  )
}
