import './Training.css';

const trainings = [
  {
    title: 'Summer Training Internship',
    organization: 'Lovely Professional University',
    period: "Jun'25 – Jul'25",
    icon: '🎓',
    badge: 'Completed',
    badgeColor: 'green',
    points: [
      <>Completed a structured <strong>Data Structures &amp; Algorithms</strong> training program to enhance problem-solving abilities and strengthen foundational coding skills.</>,
      <>Practiced and solved a wide range of coding challenges across <strong>arrays, strings, recursion, dynamic programming, and greedy techniques</strong> to improve logic and efficiency.</>,
      <>Maintained strong consistency throughout the training and successfully completed <strong>the full DSA curriculum</strong>, demonstrating improved analytical thinking and optimized coding approaches.</>,
    ],
  },
];

export default function Training() {
  return (
    <section id="training" className="training">
      {/* Section heading */}
      <div className="training__header">
        <span className="training__prompt">{'>'}</span>
        <h2 className="training__title">Training</h2>
        <span className="training__line" />
      </div>

      <div className="training__list">
        {trainings.map((t, i) => (
          <div key={i} className="training__card">
            {/* Card header */}
            <div className="training__card-header">
              <div className="training__card-left">
                <span className="training__icon">{t.icon}</span>
                <div>
                  <h3 className="training__card-title">{t.title}</h3>
                  <p className="training__org">{t.organization}</p>
                </div>
              </div>
              <div className="training__card-right">
                <span className="training__period">{t.period}</span>
                <span className={`training__badge training__badge--${t.badgeColor}`}>{t.badge}</span>
              </div>
            </div>

            {/* Bullet points */}
            <ul className="training__points">
              {t.points.map((pt, j) => (
                <li key={j} className="training__point">
                  <span className="training__bullet">▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
