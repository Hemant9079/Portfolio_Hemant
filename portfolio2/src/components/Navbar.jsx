import { useState, useEffect } from 'react';
import './Navbar.css';
import cvFile from '../GeneralCV.pdf';

const navLinks = [
  { id: 'home',          label: 'HOME' },
  { id: 'about',         label: 'ABOUT' },
  { id: 'training',      label: 'TRAINING' },
  { id: 'projects',      label: 'PROJECTS' },
  { id: 'skills',        label: 'SKILLS' },
  { id: 'certification', label: 'CERTIFICATION' },
  { id: 'contact',       label: 'CONTACT' },
];

export default function Navbar() {
  const [active, setActive]         = useState('home');
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'GeneralCV.pdf';
    link.click();
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      {/* ── Brand / Terminal logo ── */}
      <div className="navbar__brand">
        <span className="navbar__terminal-icon">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-cursor" />
        </span>
        <span className="navbar__brand-text">HK</span>
      </div>

      {/* ── Desktop Links ── */}
      <ul className="navbar__links">
        {navLinks.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`navbar__link ${active === id ? 'navbar__link--active' : ''}`}
              onClick={() => handleNavClick(id)}
            >
              {label}
              <span className="navbar__link-underline" />
            </button>
          </li>
        ))}
      </ul>

      {/* ── Download CV button ── */}
      <button className="navbar__cv-btn" onClick={handleDownloadCV}>
        <span className="navbar__cv-icon">↓</span>
        EXTRACT CV
      </button>

      {/* ── Hamburger (mobile) ── */}
      <button
        className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* ── Mobile drawer ── */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        {navLinks.map(({ id, label }) => (
          <button
            key={id}
            className={`navbar__drawer-link ${active === id ? 'navbar__drawer-link--active' : ''}`}
            onClick={() => handleNavClick(id)}
          >
            <span className="drawer-prompt">{'>'}</span> {label}
          </button>
        ))}
        <button className="navbar__cv-btn navbar__cv-btn--mobile" onClick={handleDownloadCV}>
          ↓ EXTRACT CV
        </button>
      </div>
    </nav>
  );
}
