import './Projects.css';
import barGraphImg from '../image/bar-graph.png';

const projects = [
  {
    title: 'Online Grocery Store',
    period: "Feb '26",
    icon: '🛒',
    tags: ['Node.js', 'Express.js', 'MySQL', 'MongoDB Atlas', 'HTML', 'CSS', 'JavaScript', 'Google API'],
    github: 'https://github.com/Hemant9079',
    live: 'https://online-grocery-store-tau-tan.vercel.app',
    description: 'A full-stack grocery e-commerce platform with product browsing, cart management, and order placement.',
    points: [
      'Built a full-stack grocery e-commerce platform using Node.js with product browsing, cart, and order placement features.',
      'Integrated Google API for account verification and location-based delivery address functionality.',
      'Implemented payment gateway and database management using MySQL and MongoDB Atlas for efficient data handling.',
    ],
    gradient: 'from-emerald to-cyan',
    accentColor: '#00ffb2',
  },
  {
    title: 'Sorting Algorithm Visualizer',
    period: "Nov '25",
    icon: barGraphImg,
    iconIsImage: true,
    tags: ['Java', 'Java Swing', 'AWT'],
    github: 'https://github.com/Hemant9079',
    live: null,
    description: 'An interactive Java Swing tool that visually demonstrates and compares six widely used sorting algorithms in real time.',
    points: [
      'Created an interactive Java Swing tool that visually demonstrates and compares the behavior of six widely used sorting algorithms.',
      'Led the design of a clear, user-friendly interface enabling users to select algorithms and adjust array size.',
      'Integrated adjustable controls for animation speed and data volume, allowing learners to observe and analyze algorithm performance more effectively.',
    ],
    gradient: 'from-purple to-blue',
    accentColor: '#a78bfa',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      {/* Section heading */}
      <div className="projects__header">
        <span className="projects__prompt">{'>'}</span>
        <h2 className="projects__title">Projects</h2>
        <span className="projects__line" />
      </div>

      <div className="projects__grid">
        {projects.map((p, i) => (
          <article
            key={i}
            className="pcard"
            style={{ '--accent': p.accentColor }}
          >
            {/* Top strip */}
            <div className="pcard__strip" />

            {/* Header */}
            <div className="pcard__top">
              <div className="pcard__icon-wrap">
                {p.iconIsImage
                  ? <img src={p.icon} alt="icon" className="pcard__icon-img" />
                  : <span className="pcard__icon">{p.icon}</span>
                }
              </div>
              <div className="pcard__meta">
                <h3 className="pcard__name">{p.title}</h3>
                <span className="pcard__period">{p.period}</span>
              </div>
              <div className="pcard__links">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pcard__link-btn"
                  title="GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="pcard__link-btn pcard__link-btn--live"
                    title="Live Demo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="pcard__desc">{p.description}</p>

            {/* Bullet points */}
            <ul className="pcard__points">
              {p.points.map((pt, j) => (
                <li key={j} className="pcard__point">
                  <span className="pcard__bullet">▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="pcard__tags">
              {p.tags.map((tag) => (
                <span key={tag} className="pcard__tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
