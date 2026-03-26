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
  return (
    <>
      <Navbar />

      <main className="main">
        {/* ── Home (with 3D laptop) ── */}
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
  );
}
