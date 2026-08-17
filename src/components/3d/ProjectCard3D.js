import React, { useRef, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function ProjectCard3D({ emoji, color, border, title, desc, tags, github, demo }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [cardStyle, setCardStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (flipped) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate values (+-12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    // Percentage for background glare tracking
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04) translateZ(15px)`,
      boxShadow: `${-rotateY * 2.2}px ${rotateX * 2.2}px 38px rgba(223, 184, 118, 0.28)`,
      transition: "transform 0.08s ease-out, box-shadow 0.08s ease-out",
    });

    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(243, 229, 171, 0.18) 0%, rgba(229, 193, 88, 0.08) 45%, rgba(0, 0, 0, 0) 75%)`,
    });
  };

  const handleMouseLeave = () => {
    if (flipped) return;
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
      transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.4s ease",
    });
  };

  return (
    <div
      className="project-card-3d-container"
      onClick={() => setFlipped((f) => !f)}
      title={flipped ? "Click to flip back" : "Click to flip!"}
    >
      <div
        ref={cardRef}
        className={`project-card-3d-inner ${flipped ? "flipped" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={!flipped ? cardStyle : {}}
      >
        {/* ── FRONT ── */}
        <div
          className="project-card-face project-card-front"
          style={{ "--card-bg": color, "--card-border": border }}
        >
          {/* Glare/Shine Effect */}
          <div className="card-glare" style={glareStyle} />
          
          <div className="project-emoji">{emoji}</div>
          <h3 className="project-title">{title}</h3>
          <p className="project-desc">{desc}</p>
          <div className="project-tags">
            {tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
          </div>
          <div className="flip-hint">
            <span>✦ click to flip</span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="project-card-face project-card-back"
          style={{ "--card-bg": color, "--card-border": border }}
        >
          <div className="back-glow-ring" />
          <h3 className="project-title back-title">{title}</h3>
          <p className="back-subtitle">Open Source · Personal Project</p>
          <div className="project-links back-links">
            <a href={github} target="_blank" rel="noreferrer" className="project-link" onClick={e => e.stopPropagation()}>
              <AiFillGithub /> View on GitHub
            </a>
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="project-link project-link-demo" onClick={e => e.stopPropagation()}>
                <BsBoxArrowUpRight /> Live Demo
              </a>
            )}
          </div>
          <div className="flip-hint">
            <span>✦ click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
