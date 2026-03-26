import './Skills.css';

const skillGroups = [
  {
    label: 'Languages',
    icon: '💻',
    color: '#00e5ff',
    skills: ['C/C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    label: 'Frameworks & Libraries',
    icon: '⚛️',
    color: '#00ffb2',
    skills: ['HTML & CSS', 'ReactJS', 'NodeJS', 'Express', 'Tailwind CSS'],
  },
  {
    label: 'Tools & Platforms',
    icon: '🛠️',
    color: '#f59e0b',
    skills: ['SQL', 'Git', 'GitHub', 'Linux', 'Vercel', 'Docker', 'Render', 'MongoDB Atlas'],
  },
  {
    label: 'Core CS Fundamentals',
    icon: '🧠',
    color: '#a78bfa',
    skills: ['DBMS', 'OS', 'CN', 'SQL', 'OOPs'],
  },
  {
    label: 'Soft Skills',
    icon: '🤝',
    color: '#f472b6',
    skills: ['Problem Solving', 'Team Player', 'Time Management', 'Adaptability'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      {/* ── Header ── */}
      <div className="skills__header">
        <span className="skills__prompt">{'>'}</span>
        <h2 className="skills__title">Skills</h2>
        <span className="skills__line" />
      </div>

      {/* ── Cards grid ── */}
      <div className="skills__grid">
        {skillGroups.map((group, gi) => (
          <div
            key={gi}
            className="skill-card"
            style={{ '--sk-color': group.color }}
          >
            {/* 3-D glow orb */}
            <div className="skill-card__orb" />

            {/* Corner accent */}
            <div className="skill-card__corner" />

            {/* Header row */}
            <div className="skill-card__head">
              <span className="skill-card__icon">{group.icon}</span>
              <h3 className="skill-card__label">{group.label}</h3>
            </div>

            {/* Divider */}
            <div className="skill-card__divider" />

            {/* Pills */}
            <div className="skill-card__pills">
              {group.skills.map((s, si) => (
                <span key={si} className="skill-pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
