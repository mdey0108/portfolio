import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: { value: 70, density: { enable: true, value_area: 1000 } },
          color: { value: ["#00ff88", "#00d4ff"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false },
          },
          size: {
            value: 2.5,
            random: true,
            anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 140,
            color: "#00ff88",
            opacity: 0.08,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.3 } },
            push: { particles_nb: 3 },
          },
        },
        retina_detect: true,
        background: { color: "transparent" },
      }}
    />
  );
}

export default Particle;
