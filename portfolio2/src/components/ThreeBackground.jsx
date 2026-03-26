/**
 * ThreeBackground
 * ─────────────────────────────────────────────────────────────
 * A fixed, full-viewport Three.js canvas that renders:
 *  • A dense star-field
 *  • Floating coloured orbs with slow drift
 *  • Subtle mouse-parallax rotation
 *
 * It sits behind all page content (z-index 0, position: fixed).
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 8;

    /* ── Stars ── */
    const STAR_COUNT = 3500;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const starPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#00e5ff'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#00ffb2'),
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120;
      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starCol[i * 3]     = c.r * (0.4 + Math.random() * 0.6);
      starCol[i * 3 + 1] = c.g * (0.4 + Math.random() * 0.6);
      starCol[i * 3 + 2] = c.b * (0.4 + Math.random() * 0.6);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ── Floating orbs (large blurry spheres) ── */
    const orbs = [];
    const orbColors = ['#00e5ff', '#00ffb2', '#a78bfa', '#f472b6', '#38bdf8'];
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.SphereGeometry(0.4 + Math.random() * 0.8, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(orbColors[i % orbColors.length]),
        transparent: true,
        opacity: 0.04 + Math.random() * 0.05,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6 - 2
      );
      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        pulse: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      orbs.push(mesh);
    }

    /* ── Thin grid of connection lines ── */
    const linePts = [];
    const N = 30;
    const linePositions = [];
    for (let i = 0; i < N; i++) {
      linePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 5 - 3
        )
      );
    }
    for (let a = 0; a < N; a++) {
      for (let b = a + 1; b < N; b++) {
        if (linePositions[a].distanceTo(linePositions[b]) < 7) {
          linePts.push(linePositions[a].clone(), linePositions[b].clone());
        }
      }
    }
    if (linePts.length) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({
        color: '#00e5ff',
        transparent: true,
        opacity: 0.045,
      });
      scene.add(new THREE.LineSegments(lineGeo, lineMat));
    }

    /* ── Mouse parallax ── */
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5);
      my = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouse);

    /* ── Resize handler ── */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Render loop ── */
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow star rotation for depth
      stars.rotation.y = elapsed * 0.012 + mx * 0.15;
      stars.rotation.x = elapsed * 0.005 + my * 0.08;

      // Orb drift + pulse opacity
      orbs.forEach((orb) => {
        orb.position.x += orb.userData.speedX;
        orb.position.y += orb.userData.speedY;
        orb.material.opacity = 0.04 + 0.035 * Math.sin(elapsed * 0.8 + orb.userData.pulse);
        // Wrap around bounds
        if (Math.abs(orb.position.x) > 10) orb.userData.speedX *= -1;
        if (Math.abs(orb.position.y) > 7)  orb.userData.speedY *= -1;
      });

      // Camera micro-drift
      camera.position.x += (mx * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (-my * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-bg" />;
}
