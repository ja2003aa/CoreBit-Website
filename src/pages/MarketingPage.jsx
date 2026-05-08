import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSiteLanguage } from '../context/LanguageContext.jsx'
import { SiteShell } from '../components/SiteShell.jsx'
export default function MarketingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const { t } = useSiteLanguage()

  useEffect(() => {
    const sectionIds = ['home', 'process', 'services', 'products', 'contact-form']

    const updateActiveSection = () => {
      const topbar = document.querySelector('.topbar')
      const topbarH = topbar ? topbar.getBoundingClientRect().height : 72
      // Match scroll-padding / sticky header: active = last section whose top passed this line
      const line = topbarH + 32

      let current = sectionIds[0]
      for (let i = 0; i < sectionIds.length; i += 1) {
        const el = document.getElementById(sectionIds[i])
        if (!el) {
          continue
        }
        const top = el.getBoundingClientRect().top
        if (top <= line) {
          current = sectionIds[i]
        }
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [])

  const location = useLocation()
  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return undefined
    }
    const id = location.hash.replace('#', '')
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return undefined
  }, [location.pathname, location.hash])

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const namePattern = /^[\p{L}\s'.-]{2,}$/u

  const validateContactForm = () => {
    const errors = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()
    const phone = formData.phone.trim()

    if (!name) {
      errors.name = t.contact.errors.nameRequired
    } else if (name.length < 2) {
      errors.name = t.contact.errors.nameShort
    } else if (!namePattern.test(name)) {
      errors.name = t.contact.errors.nameInvalid
    }

    if (!email) {
      errors.email = t.contact.errors.emailRequired
    } else if (!emailPattern.test(email)) {
      errors.email = t.contact.errors.emailInvalid
    }

    if (!message) {
      errors.message = t.contact.errors.messageRequired
    } else if (message.length < 15) {
      errors.message = t.contact.errors.messageShort
    } else if (message.length > 4000) {
      errors.message = t.contact.errors.messageLong
    }

    if (phone && !/^[\d\s+().-]{8,}$/.test(phone)) {
      errors.phone = t.contact.errors.phoneInvalid
    }

    return errors
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateContactForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
    setFormData({ name: '', email: '', phone: '', message: '' })
    setFormErrors({})
    setShowSuccessModal(true)
  }

  useEffect(() => {
    if (!showSuccessModal) {
      return undefined
    }
    const timer = window.setTimeout(() => {
      setShowSuccessModal(false)
    }, 4800)
    return () => window.clearTimeout(timer)
  }, [showSuccessModal])

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    setMenuOpen(false)
  }

  return (
    <SiteShell
      activeSection={activeSection}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      onNavSection={handleNavClick}
    >
      <div className="marketing-stack">
      <main>
        <section className="hero panel" id="home">
          <div>
            <h1>{t.hero.title}</h1>
            <p className="hero-text">{t.hero.text}</p>
            <div className="hero-actions">
              <Link to="/#contact-form" className="btn btn-primary">
                {t.hero.primaryCta}
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-head">
            <h2>{t.process.heading}</h2>
            <p>{t.process.subheading}</p>
          </div>
          <div className="process-grid">
            {t.process.items.map((item) => (
              <article className="process-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-head">
            <h2>{t.services.heading}</h2>
            <p>{t.services.subheading}</p>
          </div>
          <div className="grid">
            {t.services.items.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="products">
          <div className="section-head">
            <h2>{t.products.heading}</h2>
            <p>{t.products.subheading}</p>
          </div>
          <article className="card product-card">
            <h3>{t.products.zainaTitle}</h3>
            <p>{t.products.zainaBody}</p>
            <p className="product-note">{t.products.zainaNote}</p>
          </article>
        </section>

      </main>

      <section className="section contact-section" id="contact-form">
        <div className="contact-container">
          <div className="section-head contact-section-head">
            <h2>{t.contact.heading}</h2>
            <p>{t.contact.subheading}</p>
          </div>
          <div className="contact-card-shell">
            <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder={t.contact.fields.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  className={formErrors.name ? 'input-error' : ''}
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? 'err-name' : undefined}
                />
                {formErrors.name && (
                  <p id="err-name" className="field-error" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.fields.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className={formErrors.email ? 'input-error' : ''}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? 'err-email' : undefined}
                />
                {formErrors.email && (
                  <p id="err-email" className="field-error" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="form-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.contact.fields.phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  className={formErrors.phone ? 'input-error' : ''}
                  aria-invalid={Boolean(formErrors.phone)}
                  aria-describedby={formErrors.phone ? 'err-phone' : undefined}
                />
                {formErrors.phone && (
                  <p id="err-phone" className="field-error" role="alert">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  placeholder={t.contact.fields.message}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? 'input-error' : ''}
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? 'err-message' : undefined}
                />
                {formErrors.message && (
                  <p id="err-message" className="field-error" role="alert">
                    {formErrors.message}
                  </p>
                )}
              </div>
              <button className="btn btn-primary contact-submit" type="submit">
                {t.contact.submit}
              </button>
              <div className="contact-inline-details">
                <div className="contact-detail-item">
                  <span className="contact-detail-label">{t.contact.meta.emailLabel}</span>
                  <a className="contact-detail-link" href={`mailto:${t.contact.meta.emailAddress}`}>
                    {t.contact.meta.emailAddress}
                  </a>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">{t.contact.meta.phoneLabel}</span>
                  <a className="contact-detail-link" href={`tel:${t.contact.meta.phoneTel}`}>
                    {t.contact.meta.phoneDisplay}
                  </a>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">{t.contact.meta.locationLabel}</span>
                  <span className="contact-detail-value">{t.contact.meta.locationValue}</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">{t.contact.meta.websiteLabel}</span>
                  <a className="contact-detail-link" href={t.contact.meta.websiteUrl} target="_blank" rel="noreferrer">
                    {t.contact.meta.websiteDisplay}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>

      {showSuccessModal && (
        <div
          className="feedback-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
          aria-describedby="feedback-desc"
        >
          <div className="feedback-card">
            <h3 id="feedback-title">{t.contact.successTitle}</h3>
            <p id="feedback-desc">{t.contact.successMessage}</p>
          </div>
        </div>
      )}

      
    </SiteShell>
  )
}
