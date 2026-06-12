import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Mutable refs to prevent React state rerenders during mouse moves
  const mouseRef = useRef({
    x: -200,
    y: -200,
    lastX: -200,
    lastY: -200,
    ringX: -200,
    ringY: -200,
  });

  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Handle high DPI retina displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Spawns a particle
    const spawnParticle = (x, y) => {
      const colors = ["#ff007a", "#00f0ff", "#bd00ff"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 1.6;
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.25, // float slightly upward
        color: randomColor,
        size: 1.5 + Math.random() * 3,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.02,
      });

      if (particlesRef.current.length > 80) {
        particlesRef.current.shift();
      }
    };

    // Main animation loop (vanilla JS for 60fps speed)
    let animationId;
    const animate = () => {
      const mouse = mouseRef.current;
      const ring = ringRef.current;
      const dot = dotRef.current;

      // 1. Move Custom Cursor Rings via DOM Style (Lerp for fluid smoothness)
      if (ring && mouse.x !== -200) {
        // Init ring position if it was offscreen
        if (mouse.ringX === -200) {
          mouse.ringX = mouse.x;
          mouse.ringY = mouse.y;
        } else {
          mouse.ringX += (mouse.x - mouse.ringX) * 0.16;
          mouse.ringY += (mouse.y - mouse.ringY) * 0.16;
        }
        ring.style.transform = `translate3d(${mouse.ringX - 10}px, ${mouse.ringY - 10}px, 0)`;
      }

      if (dot && mouse.x !== -200) {
        dot.style.transform = `translate3d(${mouse.x - 3}px, ${mouse.y - 3}px, 0)`;
      }

      // 2. Spawn cursor trail on move
      if (mouse.x !== mouse.lastX || mouse.y !== mouse.lastY) {
        if (Math.random() < 0.38) {
          spawnParticle(mouse.x, mouse.y);
        }
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
      }

      // 3. Render Canvas Particles
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((p) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life > 0) {
          // Draw outer glow circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color + "28"; // 15% opacity hex
          ctx.fill();

          // Draw bright core circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      // Filter dead particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    // Mouse event handlers
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseDown = (e) => {
      // Spawn elegant click burst
      for (let i = 0; i < 14; i++) {
        spawnParticle(e.clientX, e.clientY);
      }
    };

    const onMouseOver = (e) => {
      const ring = ringRef.current;
      if (!ring) return;

      const isInteractive =
        ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest(".skills-3d-bubble") ||
        e.target.closest(".deck-card") ||
        e.target.closest(".social-icon-link");

      if (isInteractive) {
        ring.classList.add("cursor-hover");
      } else {
        ring.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      {/* ── Main Cursor Ring & Dot (DOM driven) ── */}
      <div className="custom-cursor-ring" ref={ringRef} style={{ transform: "translate3d(-200px, -200px, 0)" }} />
      <div className="custom-cursor-dot" ref={dotRef} style={{ transform: "translate3d(-200px, -200px, 0)" }} />

      {/* ── Stardust Overlay Canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999998,
        }}
      />
    </>
  );
}
