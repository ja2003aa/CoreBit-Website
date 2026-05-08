import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const services = [
    {
      title: 'UI/UX Design',
      description: 'تجربة استخدام واضحة ومقنعة تحول الزائر إلى عميل.',
    },
    {
      title: 'Web Development',
      description: 'مواقع سريعة وقابلة للتوسع ومبنية بمعايير تقنية قوية.',
    },
    {
      title: 'Mobile Apps',
      description: 'تطبيقات iOS وAndroid بأداء عالي وتجربة سلسة.',
    },
    {
      title: 'Brand System',
      description: 'هوية بصرية ونبرة اتصال متناسقة عبر كل نقاط التواصل.',
    },
  ]

  const process = [
    { step: '01', title: 'جلسة اكتشاف', text: 'نحلل السوق ونحدد الهدف التجاري بوضوح.' },
    { step: '02', title: 'تصميم التجربة', text: 'نرسم تجربة المستخدم والواجهات قبل التطوير.' },
    { step: '03', title: 'تطوير وتسليم', text: 'نبني المنتج على مراحل واضحة مع مراجعات ثابتة.' },
    { step: '04', title: 'تحسين مستمر', text: 'نقيس الأداء وننفذ تحسينات تحقق نتائج أفضل.' },
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="page" dir="rtl">
      <header className="topbar">
        <a className="brand" href="#" aria-label="CoreBit Home">
          <img className="brand-logo brand-logo-full" src="/corebit-logo-horizontal-wordmark.svg" alt="CoreBit" />
          <img className="brand-logo brand-logo-mark" src="/corebit-mark.svg" alt="CoreBit Icon" />
        </a>
        <button
          className="menu-btn"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="فتح القائمة"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#services">الخدمات</a>
          <a href="#work">الأعمال</a>
          <a href="#pricing">الباقات</a>
          <a href="#contact-form">التواصل</a>
          <a className="cta-link" href="#contact">
            ابدأ مشروعك
          </a>
        </nav>
      </header>

      <main>
        <section className="hero panel reveal">
          <div>
            <img
              className="hero-logo"
              src="/corebit-logo-horizontal-tagline.svg"
              alt="CoreBit Digital Product Studio"
            />
            <h1>نبني لك موقع أو تطبيق يرفع المبيعات ويعكس قوة البراند</h1>
            <p className="hero-text">
              CoreBit تساعد الشركات الناشئة والمتوسطة على تحويل الأفكار إلى منتجات
              رقمية جاهزة للنمو، من الاستراتيجية والتصميم إلى التطوير والإطلاق.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                احجز استشارة مجانية
              </a>
              <a href="#work" className="btn btn-secondary">
                استعرض أعمالنا
              </a>
            </div>
          </div>
        </section>

        <section className="section reveal" id="process">
          <div className="section-head">
            <h2>طريقة العمل</h2>
            <p>عملية منظمة تضمن الجودة والسرعة في نفس الوقت.</p>
          </div>
          <div className="process-grid">
            {process.map((item) => (
              <article className="process-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="services">
          <div className="section-head">
            <h2>الخدمات</h2>
            <p>حلول متكاملة من الفكرة إلى الإطلاق ثم التحسين المستمر.</p>
          </div>
          <div className="grid">
            {services.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="pricing">
          <div className="section-head">
            <h2>باقات العمل</h2>
            <p>ابدأ بالباقـة المناسبة، ثم طور منتجك على مراحل.</p>
          </div>
          <div className="grid pricing-grid">
            <article className="card">
              <h3>Launch</h3>
              <p>مناسبة للشركات في بداية الانطلاق.</p>
              <strong>موقع احترافي + هوية أساسية</strong>
            </article>
            <article className="card featured">
              <h3>Growth</h3>
              <p>للشركات اللي تبغى نمو أسرع وتجربة أقوى.</p>
              <strong>موقع/تطبيق + UX متقدم + تحليلات</strong>
            </article>
            <article className="card">
              <h3>Scale</h3>
              <p>للجهات اللي تحتاج بنية رقمية متكاملة.</p>
              <strong>منتج كامل + دعم مستمر + تحسينات شهرية</strong>
            </article>
          </div>
        </section>

      </main>

      <section className="section reveal" id="contact-form">
        <div className="section-head">
          <h2>أرسل متطلبات مشروعك</h2>
          <p>املأ النموذج وسيتواصل معك فريقنا خلال يوم عمل.</p>
        </div>
        <form className="contact-form panel" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="رقم الجوال (اختياري)"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="اكتب فكرة المشروع باختصار"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            required
          />
          <button className="btn btn-primary" type="submit">
            إرسال الطلب
          </button>
          {submitted && (
            <p className="success-message">تم استلام طلبك، بنرجع لك قريبًا.</p>
          )}
        </form>
      </section>

      <footer className="footer panel reveal" id="contact">
        <img
          className="footer-logo"
          src="/corebit-wordmark-tagline.svg"
          alt="CoreBit Digital Product Studio"
        />
        <h2>جاهزين نشتغل على مشروعك؟</h2>
        <p>أرسل فكرتك اليوم وخلال 48 ساعة توصلك خطة تنفيذ أولية واضحة.</p>
        <div className="hero-actions">
          <a href="mailto:hello@corebit.sa" className="btn btn-primary">
            hello@corebit.sa
          </a>
          <a href="tel:+966500000000" className="btn btn-secondary">
            +966 50 000 0000
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
