import { SiteHeader } from './SiteHeader.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { useSiteLanguage } from '../context/LanguageContext.jsx'

export function SiteShell({ children, activeSection = null, menuOpen, setMenuOpen, onNavSection }) {
  const { t } = useSiteLanguage()
  return (
    <div className="page" dir={t.dir}>
      <SiteHeader
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNavSection={onNavSection}
      />
      {children}
      <SiteFooter />
    </div>
  )
}
