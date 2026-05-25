import { Link } from 'react-router-dom'
import { useSiteLanguage } from '../context/LanguageContext.jsx'

export function SiteHeader({ activeSection = null, menuOpen, setMenuOpen, onNavSection }) {
  const { t, setLanguage } = useSiteLanguage()

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'))
    setMenuOpen(false)
  }

  const handleNavClick = (sectionId) => () => {
    onNavSection?.(sectionId)
    setMenuOpen(false)
  }

  const handleNavFocus = (sectionId) => () => {
    onNavSection?.(sectionId)
  }

  const navClass = (id) => (activeSection === id ? 'nav-link active' : 'nav-link')

  return (
    <header className="topbar">
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)} aria-label="CoreBit Home">
        <img className="brand-logo brand-logo-full" src="/corebit-logo-horizontal-wordmark.svg" alt="CoreBit" />
        <img className="brand-logo brand-logo-mark" src="/corebit-mark.svg" alt="CoreBit Icon" />
      </Link>
      <button
        className="menu-btn"
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={t.menuAriaLabel}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/#home"
          className={navClass('home')}
          onClick={handleNavClick('home')}
          onFocus={handleNavFocus('home')}
        >
          {t.nav.home}
        </Link>
        <Link
          to="/#process"
          className={navClass('process')}
          onClick={handleNavClick('process')}
          onFocus={handleNavFocus('process')}
        >
          {t.nav.process}
        </Link>
        <Link
          to="/#services"
          className={navClass('services')}
          onClick={handleNavClick('services')}
          onFocus={handleNavFocus('services')}
        >
          {t.nav.services}
        </Link>
        <Link
          to="/#products"
          className={navClass('products')}
          onClick={handleNavClick('products')}
          onFocus={handleNavFocus('products')}
        >
          {t.nav.products}
        </Link>
        <Link
          to="/#pricing"
          className={navClass('pricing')}
          onClick={handleNavClick('pricing')}
          onFocus={handleNavFocus('pricing')}
        >
          {t.nav.pricing}
        </Link>
        <Link
          to="/#contact-form"
          className={navClass('contact-form')}
          onClick={handleNavClick('contact-form')}
          onFocus={handleNavFocus('contact-form')}
        >
          {t.nav.contact}
        </Link>
      </nav>
      <button className="lang-btn lang-btn-edge" type="button" onClick={toggleLanguage}>
        {t.languageButton}
      </button>
    </header>
  )
}
