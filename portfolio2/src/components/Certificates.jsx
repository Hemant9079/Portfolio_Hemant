import './Certificates.css';

const certificates = [
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    period: "Oct '25",
    icon: '☁️',
    color: '#00e5ff',
    category: 'Cloud',
    driveLink: 'https://drive.google.com/file/d/1vmFENfot6xAg2EL0nNlP2tXbjVgaaQdi/view?usp=drive_link',
  },
  {
    title: 'Mastering Java for Application Development',
    issuer: 'Coursera',
    period: "Aug '25",
    icon: '☕',
    color: '#f59e0b',
    category: 'Programming',
    driveLink: 'https://drive.google.com/file/d/1R71fvOUBcws9hqoyeEC3o39v1YUaS4ZI/view?usp=drive_link',
  },
  {
    title: 'ChatGPT-4 Prompt Engineering: Generative AI & LLM',
    issuer: 'Infosys',
    period: "July '25",
    icon: '🤖',
    color: '#a78bfa',
    category: 'AI / ML',
    driveLink: 'https://drive.google.com/file/d/1kSs_QZr1SUUH5WyquoM3NXERg7UKClJR/view?usp=drive_link',
  },
];

export default function Certificates() {
  return (
    <section id="certification" className="certificates">
      {/* Section heading */}
      <div className="certificates__header">
        <span className="certificates__prompt">{'>'}</span>
        <h2 className="certificates__title">Certifications</h2>
        <span className="certificates__line" />
      </div>

      <div className="certificates__grid">
        {certificates.map((c, i) => (
          <div
            key={i}
            className="cert-card"
            style={{ '--cert-color': c.color }}
          >
            {/* Glow blob */}
            <div className="cert-card__glow" />

            {/* Category badge */}
            <span className="cert-card__category">{c.category}</span>

            {/* Icon */}
            <div className="cert-card__icon-wrap">
              <span className="cert-card__icon">{c.icon}</span>
            </div>

            {/* Title */}
            <h3 className="cert-card__title">{c.title}</h3>

            {/* Footer */}
            <div className="cert-card__footer">
              <span className="cert-card__issuer">
                <span className="cert-card__issuer-dot" />
                {c.issuer}
              </span>
              <span className="cert-card__period">{c.period}</span>
            </div>

            {/* Show Certificate button → opens Google Drive link */}
            <a
              href={c.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card__show-btn"
            >
              <span className="cert-card__show-btn-icon">🔍</span>
              Show Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
