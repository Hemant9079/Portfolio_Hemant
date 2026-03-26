import { useState } from 'react';
import Landing from './components/Landing';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Training from './components/Training';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {/* Global 3-D starfield / orb background (fixed, behind everything) */}
      <ThreeBackground />

      {/* Landing page — shown first, disappears after user clicks "Enter Portfolio" */}
      {!entered && <Landing onEnter={() => setEntered(true)} />}

      {/* Main portfolio — revealed after landing */}
      {entered && (
        <>
          <Navbar />
          <main className="main">
            {/* ── Home (3D laptop) ── */}
            <Home />

            {/* ── About ── */}
            <About />

            {/* ── Training ── */}
            <Training />

            {/* ── Projects ── */}
            <Projects />

            {/* ── Certificates ── */}
            <Certificates />

            {/* ── Skills ── */}
            <Skills />

            {/* ── Contact ── */}
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
