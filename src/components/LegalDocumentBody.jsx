export function LegalDocumentBody({ data, titleId = 'legal-doc-title', idPrefix = 'ld' }) {
  if (!data) {
    return null
  }
  return (
    <>
      <header className="legal-card-head">
        <h1 id={titleId}>{data.title}</h1>
        <p className="legal-card-updated">{data.lastUpdated}</p>
      </header>
      {data.intro.map((paragraph, i) => (
        <p key={i} className="legal-card-intro">
          {paragraph}
        </p>
      ))}
      {data.sections.map((section) => (
        <div key={section.key} className="legal-card-block" role="region" aria-labelledby={`${idPrefix}-h-${section.key}`}>
          <h2 id={`${idPrefix}-h-${section.key}`} className="legal-card-h2">
            {section.title}
          </h2>
          {section.lead ? <p className="legal-card-lead">{section.lead}</p> : null}
          {section.subsections
            ? section.subsections.map((sub, j) => (
                <div key={`${section.key}-${j}`} className="legal-card-subblock">
                  <h3 className="legal-card-h3">{sub.title}</h3>
                  <p>{sub.body}</p>
                </div>
              ))
            : null}
          {section.paragraphs
            ? section.paragraphs.map((paragraph, k) => (
                <p key={k} className="legal-card-para">
                  {paragraph}
                </p>
              ))
            : null}
          {section.bullets ? (
            <ul className="legal-card-list">
              {section.bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
      <div className="legal-card-block legal-card-contact" role="region" aria-labelledby={`${idPrefix}-h-contact`}>
        <h2 id={`${idPrefix}-h-contact`} className="legal-card-h2">
          {data.contactBlock.title}
        </h2>
        <p className="legal-card-para">{data.contactBlock.lead}</p>
        <p className="legal-card-para legal-card-strong">{data.contactBlock.company}</p>
        <p className="legal-card-para">{data.contactBlock.location}</p>
        <p className="legal-card-para">
          <span className="legal-card-label">{data.contactBlock.emailLabel}</span>{' '}
          <a href={`mailto:${data.contactBlock.email}`} className="legal-card-link">
            {data.contactBlock.email}
          </a>
        </p>
        <p className="legal-card-para">
          <span className="legal-card-label">{data.contactBlock.websiteLabel}</span>{' '}
          <a href={data.contactBlock.websiteUrl} className="legal-card-link" target="_blank" rel="noreferrer">
            {data.contactBlock.website}
          </a>
        </p>
      </div>
    </>
  )
}
