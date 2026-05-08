import { Link } from 'react-router-dom'
import { useSiteLanguage } from '../context/LanguageContext.jsx'

export function SiteFooter() {
  const { t } = useSiteLanguage()

  return (
    <footer className="footer panel" id="contact">
      <div className="footer-intro">
        <h2>{t.footer.heading}</h2>
        <p>{t.footer.text}</p>
      </div>
      <div className="footer-grid">
        <div className="footer-col footer-col-contact">
          <h3>{t.footer.contactTitle}</h3>
          <div className="footer-contact-block">
            <p className="footer-contact-line">
              <span className="footer-contact-label">{t.contact.meta.websiteLabel}</span>{' '}
              <a href={t.contact.meta.websiteUrl} target="_blank" rel="noreferrer">
                {t.contact.meta.websiteDisplay}
              </a>
            </p>
            <p className="footer-contact-line">
              <span className="footer-contact-label">{t.contact.meta.phoneLabel}</span>{' '}
              <a href={`tel:${t.contact.meta.phoneTel}`}>{t.contact.meta.phoneDisplay}</a>
            </p>
            <p className="footer-contact-line">
              <span className="footer-contact-label">{t.contact.meta.emailLabel}</span>{' '}
              <a href={`mailto:${t.contact.meta.emailAddress}`}>{t.contact.meta.emailAddress}</a>
            </p>
            <p className="footer-contact-line">
              <span className="footer-contact-label">{t.contact.meta.locationLabel}</span>{' '}
              <span className="footer-contact-value">{t.contact.meta.locationValue}</span>
            </p>
          </div>
        </div>
        <div className="footer-col footer-col-links">
          <h3>{t.footer.companyLinksTitle}</h3>
          <nav className="footer-nav" aria-label={t.footer.companyLinksTitle}>
            {t.footer.companyLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-col footer-col-links">
          <h3>{t.footer.legalTitle}</h3>
          <nav className="footer-nav footer-nav-legal" aria-label={t.footer.legalTitle}>
            {t.footer.legalLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} {t.footer.copyright}
      </p>
    </footer>
  )
}
