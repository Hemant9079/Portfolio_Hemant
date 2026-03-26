import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Landing.css';

export default function Landing({ onEnter }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  /* ── Three.js particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    /* -- Particle geometry -- */
    const COUNT = 4000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color('#00e5ff'),
      new THREE.Color('#00ffb2'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#f472b6'),
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* -- Connection lines -- */
    const lineMat = new THREE.LineBasicMaterial({ color: '#00e5ff', transparent: true, opacity: 0.06 });
    const lineGeo = new THREE.BufferGeometry();
    const linePos = [];
    const step = 100;
    for (let i = 0; i < COUNT; i += step) {
      for (let j = i + step; j < COUNT; j += step) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 4) {
          linePos.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePos.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    /* -- Mouse parallax -- */
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* -- Resize -- */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* -- Animation loop -- */
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = performance.now() * 0.0002;
      particles.rotation.y = t + mx * 0.3;
      particles.rotation.x = t * 0.4 + my * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    // Fade-in after mount
    setTimeout(() => setVisible(true), 80);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 800);
  };

  return (
    <div className={`landing ${visible ? 'landing--visible' : ''} ${leaving ? 'landing--leaving' : ''}`}>
      {/* 3-D particle background */}
      <canvas ref={canvasRef} className="landing__canvas" />

      {/* Radial gradient overlay */}
      <div className="landing__overlay" />

      {/* Content */}
      <div className="landing__content">
        <p className="landing__pre">
          <span className="landing__prompt">{'>'}</span>
          <span className="landing__blink">_</span>
          &nbsp;Hello, World!
        </p>

        <h1 className="landing__name">
          <span className="landing__name-first">Hemant</span>
          <span className="landing__name-last"> Kumar</span>
        </h1>

        <p className="landing__role">Full‑Stack Developer &amp; Problem Solver</p>

        <button className="landing__cta" onClick={handleEnter}>
          <span className="landing__cta-text">Enter Portfolio</span>
          <span className="landing__cta-arrow">→</span>
        </button>
      </div>

      {/* Animated corner accents */}
      <div className="landing__corner landing__corner--tl" />
      <div className="landing__corner landing__corner--tr" />
      <div className="landing__corner landing__corner--bl" />
      <div className="landing__corner landing__corner--br" />

      {/* Scroll hint */}
      <div className="landing__scroll-hint">
        <div className="landing__scroll-line" />
        <span>Scroll</span>
      </div>
    </div>
  );
}
