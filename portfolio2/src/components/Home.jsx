import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import LaptopModel from './LaptopModel';
import './Home.css';

// img.jpeg is displayed on the 3D laptop screen
import laptopImg from '../image/img.jpeg';

export default function Home() {
  return (
    <section id="home" className="home">

      {/* ── LEFT: text content ── */}
      <div className="home__content">
        <p className="home__greeting">
          <span className="home__prompt">{'>'}</span> Hello, World!
        </p>
        <h1 className="home__name">
          I'm <span className="home__highlight">Hemant</span>
        </h1>
        <h2 className="home__role">
          <span className="home__role-text" id="role-typewriter">Full‑Stack Developer</span>
        </h2>
        <p className="home__bio">
          Crafting modern web experiences with clean code,
          thoughtful architecture, and pixel‑perfect design.
        </p>

        <div className="home__cta">
          <a href="#projects" className="home__btn home__btn--primary">
            View Projects
          </a>
          <a href="#contact" className="home__btn home__btn--ghost">
            Contact Me
          </a>
        </div>

        {/* Terminal-style status bar */}
        <div className="home__status">
          <span className="status-dot status-dot--green" />
          <span className="home__status-text">Available for opportunities</span>
        </div>
      </div>

      {/* ── RIGHT: Three.js 3D laptop ── */}
      <div className="home__canvas-wrapper">
        {/* Glow ring behind the canvas */}
        <div className="home__glow" />

        <Canvas
          camera={{ position: [0, 2, 6], fov: 40 }}
          shadows
          dpr={[1, 2]}
          className="home__canvas"
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        >
          {/* Lighting — cinematic three-point setup */}
          <ambientLight intensity={0.3} />

          {/* Key light */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />

          {/* Fill light */}
          <directionalLight
            position={[-4, 3, 2]}
            intensity={0.6}
            color="#4488ff"
          />

          {/* Rim / back light */}
          <pointLight position={[-3, 4, -4]} intensity={1.5} color="#00ffb2" distance={12} />
          <pointLight position={[4, 2, -3]} intensity={1} color="#00e5ff" distance={10} />

          {/* Spotlight from above for dramatic highlight */}
          <spotLight
            position={[0, 8, 2]}
            angle={0.35}
            penumbra={1}
            intensity={1.5}
            color="#ffffff"
            castShadow
          />

          {/* Under-glow accent */}
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#00ffb2" distance={6} />

          {/* Stars background — dark space with subtle glowing particles */}
          <Stars radius={100} depth={60} count={3000} factor={4} fade speed={0.5} />

          {/* Environment for PBR reflections */}
          <Environment preset="night" />

          <Suspense fallback={null}>
            <LaptopModel imageUrl={laptopImg} />
          </Suspense>

          {/* Shadow catcher floor */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.15} />
          </mesh>

          {/* Mouse drag — horizontal only (no up/down tilt) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Canvas>

        {/* Floating label */}
        <div className="home__canvas-label">
          <span className="label-prompt">{'>'}</span> interact &amp; drag
        </div>
      </div>
    </section>
  );
}
