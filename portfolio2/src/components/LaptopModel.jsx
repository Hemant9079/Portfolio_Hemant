import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export default function LaptopModel({ imageUrl }) {
  const groupRef = useRef();
  const screenGlowRef = useRef();

  // Load the user's image
  const screenTexture = useLoader(TextureLoader, imageUrl);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  // flipY = true (default) to correctly orient the image right-side up
  screenTexture.flipY = true;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;

  // ── Materials ──────────────────────────────────────────────────────────────
  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a1f2e',
    roughness: 0.2,
    metalness: 0.92,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15,
  }), []);

  const hingeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d1117',
    roughness: 0.3,
    metalness: 0.95,
  }), []);

  const bezelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#080c14',
    roughness: 0.4,
    metalness: 0.6,
  }), []);

  const keyboardMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0e1420',
    roughness: 0.85,
    metalness: 0.15,
  }), []);

  // Screen material — DoubleSide ensures image visible from correct angle
  const screenMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: screenTexture,
    side: THREE.DoubleSide,
    toneMapped: false,
  }), [screenTexture]);

  // Subtle screen glow material
  const screenGlowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffb2',
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
  }), []);

  // Apple-logo style backlit material
  const logoMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffb2',
    transparent: true,
    opacity: 0.4,
  }), []);

  // ── Animation: slow 720° anticlockwise rotation + gentle floating ─────────
  const rotationDuration = 30; // seconds for 720° — slow cinematic pace
  const totalRotation = Math.PI * 4; // 720° in radians

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Slow anticlockwise rotation (positive Y in Three.js)
      const rotationProgress = (t % rotationDuration) / rotationDuration;
      groupRef.current.rotation.y = rotationProgress * totalRotation;

      // Gentle floating bob
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08 - 0.1;
    }

    // Pulse the screen glow
    if (screenGlowRef.current) {
      screenGlowRef.current.material.opacity = 0.04 + Math.sin(t * 2) * 0.03;
    }
  });

  // ── Lid opening angle — ~110° for a wide-open realistic look
  const lidAngle = -1.2;

  return (
    <group ref={groupRef}>

      {/* ══ BASE (bottom chassis) ══ */}
      <mesh castShadow receiveShadow material={bodyMat}>
        <boxGeometry args={[3.4, 0.14, 2.2]} />
      </mesh>

      {/* Chamfered edge effect — thin bright strip */}
      <mesh position={[0, 0.071, 1.1]} material={bezelMat}>
        <boxGeometry args={[3.42, 0.005, 0.01]} />
      </mesh>

      {/* keyboard area */}
      <mesh position={[0, 0.075, 0.06]} castShadow material={keyboardMat}>
        <boxGeometry args={[3.0, 0.005, 1.8]} />
      </mesh>

      {/* Individual key rows for realism */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((z, i) => (
        <mesh key={`row-${i}`} position={[0, 0.078, z]} material={bezelMat}>
          <boxGeometry args={[2.8, 0.003, 0.08]} />
        </mesh>
      ))}

      {/* trackpad */}
      <mesh position={[0, 0.078, 0.58]} castShadow material={bezelMat}>
        <boxGeometry args={[0.9, 0.005, 0.58]} />
      </mesh>

      {/* ══ HINGE ══ */}
      <mesh
        position={[0, 0.07, -1.1]}
        rotation={[0, 0, Math.PI / 2]}
        material={hingeMat}
      >
        <cylinderGeometry args={[0.06, 0.06, 3.2, 24]} />
      </mesh>

      {/* ══ LID ══  pivot at the back edge */}
      <group position={[0, 0.07, -1.1]} rotation={[lidAngle, 0, 0]}>
        {/* Lid shell */}
        <mesh position={[0, 0, 1.1]} castShadow receiveShadow material={bodyMat}>
          <boxGeometry args={[3.4, 0.1, 2.2]} />
        </mesh>

        {/* Bezel (inner frame) — on the INNER face of the lid (-Y side) */}
        <mesh position={[0, -0.056, 1.1]} material={bezelMat}>
          <boxGeometry args={[3.2, 0.01, 2.0]} />
        </mesh>

        {/* ══ SCREEN — IMAGE ON INNER/FRONT FACE ══ 
            The -Y face of the lid is the inner/screen side (faces viewer when open).
            planeGeometry faces +Z by default. Rotate +90° on X so normal faces -Y.
            After the lid's rotation of -1.2, -Y points toward the viewer. */}
        <mesh
          position={[0, -0.066, 1.1]}
          rotation={[Math.PI / 2, 0, 0]}
          material={screenMat}
        >
          <planeGeometry args={[2.9, 1.82]} />
        </mesh>

        {/* Screen glow overlay */}
        <mesh
          ref={screenGlowRef}
          position={[0, -0.067, 1.1]}
          rotation={[Math.PI / 2, 0, 0]}
          material={screenGlowMat}
        >
          <planeGeometry args={[2.92, 1.84]} />
        </mesh>

        {/* Webcam dot — on inner face */}
        <mesh position={[0, -0.065, 0.12]} material={bezelMat}>
          <cylinderGeometry args={[0.042, 0.042, 0.02, 16]} />
        </mesh>

        {/* Webcam LED indicator — on inner face */}
        <mesh position={[0.08, -0.065, 0.12]} material={logoMat}>
          <sphereGeometry args={[0.012, 8, 8]} />
        </mesh>

        {/* Back of lid — subtle logo glow (on outer +Y face) */}
        <mesh position={[0, 0.056, 1.1]} rotation={[-Math.PI / 2, 0, 0]} material={logoMat}>
          <circleGeometry args={[0.2, 32]} />
        </mesh>
      </group>

      {/* ══ RUBBER FEET ══ */}
      {[
        [-1.5, -0.075, -1.0],
        [ 1.5, -0.075, -1.0],
        [-1.5, -0.075,  1.0],
        [ 1.5, -0.075,  1.0],
      ].map((pos, i) => (
        <mesh key={i} position={pos} material={bezelMat}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 10]} />
        </mesh>
      ))}

      {/* ══ UNDER-GLOW — subtle light beneath the laptop ══ */}
      <pointLight position={[0, -0.3, 0]} intensity={0.3} color="#00ffb2" distance={3} decay={2} />
    </group>
  );
}
