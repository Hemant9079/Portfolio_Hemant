import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './About.css';

export default function About() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    let effect;
    window.THREE = THREE;
    import('vanta/dist/vanta.dots.min').then((mod) => {
      const DOTS = mod.default ?? mod;
      effect = DOTS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color2: 0x7e5228,
        backgroundColor: 0x111a33,
        size: 3.70,
        spacing: 31.00,
      });
      vantaEffect.current = effect;
    });
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={vantaRef}>
      {/* Section heading */}
      <div className="about__header">
        <span className="about__prompt">{'>'}</span>
        <h2 className="about__title">About Me</h2>
        <span className="about__line" />
      </div>

      <div className="about__grid">

        {/* ── LEFT: About me ── */}
        <div className="about__left">
          <div className="about__card">
            <h3 className="about__card-title">
              <span className="about__icon">👤</span> Who I Am
            </h3>
            <p className="about__bio">
              Hi, I'm <strong>Hemant Kumar</strong> — a passionate Full‑Stack Developer
              currently pursuing <strong>B.Tech in Computer Science &amp; Engineering</strong>
              at Lovely Professional University, Punjab.
            </p>
            <p className="about__bio">
              I love crafting modern web experiences with clean code, thoughtful architecture,
              and pixel‑perfect design. I'm driven by curiosity, consistency, and the joy of
              building things that make a real impact.
            </p>
            <p className="about__bio">
              Outside of code, I contribute to social causes through the
              <em> Humari Khwaish NGO</em> and have solved <strong>150+ DSA problems</strong>
              across LeetCode &amp; GFG.
            </p>

            {/* Contact chips */}
            <div className="about__contacts">
              <a href="mailto:hkumar954995@gmail.com" className="about__chip">
                <span>📧</span> hkumar954995@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/hemant-prajapat15/"
                target="_blank"
                rel="noreferrer"
                className="about__chip"
              >
                <span>🔗</span> LinkedIn
              </a>
              <a
                href="https://github.com/Hemant9079"
                target="_blank"
                rel="noreferrer"
                className="about__chip"
              >
                <span>🐙</span> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Education ── */}
        <div className="about__right">
          <div className="about__card">
            <h3 className="about__card-title">
              <span className="about__icon">🎓</span> Education
            </h3>

            <div className="about__timeline">

              {/* LPU */}
              <div className="about__edu-item">
                <div className="about__edu-dot" />
                <div className="about__edu-content">
                  <div className="about__edu-meta">
                    <span className="about__edu-period">Aug 2023 – Present</span>
                    <span className="about__edu-badge about__edu-badge--green">Current</span>
                  </div>
                  <h4 className="about__edu-degree">Bachelor of Technology</h4>
                  <p className="about__edu-school">
                    Lovely Professional University — Phagwara, Punjab
                  </p>
                  <p className="about__edu-detail">
                    Computer Science &amp; Engineering<br />
                    <strong>CGPA: 7.10</strong>
                  </p>
                </div>
              </div>

              {/* Intermediate */}
              <div className="about__edu-item">
                <div className="about__edu-dot" />
                <div className="about__edu-content">
                  <div className="about__edu-meta">
                    <span className="about__edu-period">Mar 2021 – May 2022</span>
                  </div>
                  <h4 className="about__edu-degree">Intermediate (12th)</h4>
                  <p className="about__edu-school">
                    Tagore Public Sr. Sec. School — Churu, Rajasthan
                  </p>
                  <p className="about__edu-detail">
                    PCM Stream · <strong>Percentage: 84%</strong>
                  </p>
                </div>
              </div>

              {/* Matriculation */}
              <div className="about__edu-item">
                <div className="about__edu-dot" />
                <div className="about__edu-content">
                  <div className="about__edu-meta">
                    <span className="about__edu-period">Mar 2019 – May 2020</span>
                  </div>
                  <h4 className="about__edu-degree">Matriculation (10th)</h4>
                  <p className="about__edu-school">
                    Tagore Public Sr. Sec. School — Churu, Rajasthan
                  </p>
                  <p className="about__edu-detail">
                    <strong>Percentage: 87%</strong>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
