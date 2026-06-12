import React, { useRef, useMemo, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* ── Error boundary ── */
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.warn("[FloatingGeometry] 3D crashed:", err); }
  render() { return this.state.hasError ? null : this.props.children; }
}

const shapes = [
  { geo: "torus",        size: 0.35, pos: [2.2, 1.3, -1.5], color: "#ff007a", speed: [0.4, 0.3, 0.2] },
  { geo: "dodecahedron", size: 0.38, pos: [-2.6, -0.9, -2], color: "#00f0ff", speed: [0.25, 0.5, 0.3] },
  { geo: "icosahedron",  size: 0.32, pos: [1.6, -1.6, -1], color: "#bd00ff", speed: [0.2, 0.2, 0.4] },
  { geo: "cone",         size: 0.36, pos: [-1.9, 1.9, -2.5], color: "#00f0ff", speed: [0.35, 0.15, 0.25] },
  { geo: "torus",        size: 0.30, pos: [3.2, -0.6, -3], color: "#bd00ff", speed: [0.15, 0.4, 0.3] },
  { geo: "icosahedron",  size: 0.24, pos: [-3.2, 0.6, -1.5], color: "#ff007a", speed: [0.45, 0.2, 0.1] },
];

function FloatingShape({ geo, size, pos, color, speed }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + offset;
    ref.current.rotation.x = t * speed[0];
    ref.current.rotation.y = t * speed[1];
    ref.current.rotation.z = t * speed[2];
    ref.current.position.y = pos[1] + Math.sin(t * 0.55 + offset) * 0.28;
  });

  return (
    <mesh ref={ref} position={pos}>
      {geo === "torus"        && <torusGeometry args={[size, 0.08, 8, 24]} />}
      {geo === "dodecahedron" && <dodecahedronGeometry args={[size]} />}
      {geo === "icosahedron"  && <icosahedronGeometry args={[size, 0]} />}
      {geo === "cone"         && <coneGeometry args={[size * 0.8, size * 1.5, 5]} />}
      <meshBasicMaterial color={color} wireframe opacity={0.24} transparent />
    </mesh>
  );
}

export default function FloatingGeometry({ style = {} }) {
  return (
    <CanvasErrorBoundary>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.75,
          ...style,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 56 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          resize={{ scroll: false }}
        >
          {shapes.map((s, i) => (
            <FloatingShape key={i} {...s} />
          ))}
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
