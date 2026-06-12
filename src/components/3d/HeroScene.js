import React, { useRef, useMemo, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* ── Error boundary so Three.js crashes don't kill the whole page ── */
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.warn("[HeroScene] 3D canvas crashed:", err);
  }
  render() {
    if (this.state.hasError) return null; 
    return this.props.children;
  }
}

/* Helper function for linear RGB interpolation */
const lerpRGB = (r1, g1, b1, r2, g2, b2, t) => {
  return [
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t
  ];
};

/* ── Interactive Camera Parallax Hook Component ── */
function GalaxyCameraParallax() {
  useFrame((state) => {
    const pointer = state.pointer || state.mouse || { x: 0, y: 0 };
    const { x, y } = pointer; // Normalized device coordinates (-1 to 1)
    // Smoothly slide the camera around based on mouse position
    state.camera.position.x = state.camera.position.x + (x * 2.2 - state.camera.position.x) * 0.06;
    state.camera.position.y = state.camera.position.y + (y * 1.8 - state.camera.position.y) * 0.06;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Animated Logarithmic Spiral Galaxy ── */
function SpiralGalaxy({ count = 6000 }) {
  const ref = useRef();
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 22% of stars form a dense spherical galactic bulge
      if (Math.random() < 0.22) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.pow(Math.random(), 2.2) * 1.6; // dense center
        
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        // Core colors: White -> Bright Cyan
        const t = r / 1.6;
        const [rgbR, rgbG, rgbB] = lerpRGB(1.0, 1.0, 1.0, 0.0, 0.94, 1.0, t);
        col[i * 3]     = rgbR;
        col[i * 3 + 1] = rgbG;
        col[i * 3 + 2] = rgbB;
      } else {
        // 78% form two distinct spiral arms
        const r = 1.6 + Math.pow(Math.random(), 1.6) * 6.8; 
        const armsCount = 2;
        const armIndex = i % armsCount;
        const armAngle = (armIndex / armsCount) * Math.PI * 2;
        
        // Logarithmic spiral math: angle increases as radius increases
        const spiralFactor = 0.45;
        const angle = r * spiralFactor + armAngle;
        
        // Spread narrows as distance from center increases
        const spread = (1.1 / (r + 0.3));
        const randomX = (Math.random() - 0.5) * spread * r;
        const randomY = (Math.random() - 0.5) * spread * 0.7;
        const randomZ = (Math.random() - 0.5) * spread * r;

        pos[i * 3]     = Math.cos(angle) * r + randomX;
        pos[i * 3 + 1] = randomY;
        pos[i * 3 + 2] = Math.sin(angle) * r + randomZ;

        // Gradient color: Cyan -> Pink -> Violet
        let rgbR, rgbG, rgbB;
        if (r < 4.2) {
          const ratio = (r - 1.6) / 2.6;
          [rgbR, rgbG, rgbB] = lerpRGB(0.0, 0.94, 1.0, 1.0, 0.0, 0.48, ratio);
        } else {
          const ratio = Math.min((r - 4.2) / 4.2, 1);
          [rgbR, rgbG, rgbB] = lerpRGB(1.0, 0.0, 0.48, 0.54, 0.0, 1.0, ratio);
        }
        col[i * 3]     = rgbR;
        col[i * 3 + 1] = rgbG;
        col[i * 3 + 2] = rgbB;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      // Rotate the galaxy slowly
      ref.current.rotation.y += delta * 0.065;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        vertexColors
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.88}
      />
    </points>
  );
}

/* ── Glowing wireframe TorusKnot core ── */
function FloatingCore() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.16;
    meshRef.current.rotation.y = t * 0.22;
    meshRef.current.rotation.z = t * 0.08;
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.28 + 0.3;
  });
  return (
    <mesh ref={meshRef} position={[3.3, 0.3, -1]}>
      <torusKnotGeometry args={[0.72, 0.2, 100, 16]} />
      <meshBasicMaterial color="#ff007a" wireframe opacity={0.25} transparent />
    </mesh>
  );
}

/* ── Floating Dodecahedron accent ── */
function FloatingDodecahedron() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.z = t * 0.18;
    ref.current.position.y = Math.sin(t * 0.65 + 1) * 0.35 - 1.3;
  });
  return (
    <mesh ref={ref} position={[-3.8, -1.3, -1.8]}>
      <dodecahedronGeometry args={[0.55]} />
      <meshBasicMaterial color="#00f0ff" wireframe opacity={0.22} transparent />
    </mesh>
  );
}

/* ── Cosmic grid plane ── */
function GridPlane() {
  return (
    <gridHelper
      args={[40, 40, "rgba(189, 0, 255, 0.16)", "rgba(189, 0, 255, 0.05)"]}
      position={[0, -4.5, 0]}
    />
  );
}

/* ── The exported canvas wrapper ── */
export default function HeroScene() {
  return (
    <CanvasErrorBoundary>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 58 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          resize={{ scroll: false }}
        >
          <ambientLight intensity={0.25} />
          <GalaxyCameraParallax />
          <SpiralGalaxy />
          <FloatingCore />
          <FloatingDodecahedron />
          <GridPlane />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
