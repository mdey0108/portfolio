import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiJava, DiJavascript1, DiReact, DiNodejs, DiGit } from "react-icons/di";
import { SiPython, SiTypescript, SiSpringboot, SiDocker, SiMongodb } from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { CiDatabase } from "react-icons/ci";
import { BsCodeSlash, BsCpu, BsTools } from "react-icons/bs";
import { VscServerEnvironment } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Core Languages",
    num: "01",
    icon: <BsCodeSlash />,
    glowColor: "#dfb876",
    glowColorRgb: "223, 184, 118",
    items: [
      { name: "Java", level: 92, color: "#e5c158", colorRgb: "229, 193, 88", icon: <DiJava /> },
      { name: "JavaScript", level: 90, color: "#dfb876", colorRgb: "223, 184, 118", icon: <DiJavascript1 /> },
      { name: "Python", level: 80, color: "#c59b27", colorRgb: "197, 155, 39", icon: <SiPython /> },
      { name: "TypeScript", level: 75, color: "#f3e5ab", colorRgb: "243, 229, 171", icon: <SiTypescript /> },
      { name: "C/C++", level: 70, color: "#d4af37", colorRgb: "212, 175, 55", icon: <CgCPlusPlus /> },
    ],
  },
  {
    title: "Frontend & UI",
    num: "02",
    icon: <BsCpu />,
    glowColor: "#e5c158",
    glowColorRgb: "229, 193, 88",
    items: [
      { name: "React.js", level: 85, color: "#dfb876", colorRgb: "223, 184, 118", icon: <DiReact /> },
      { name: "HTML5", level: 90, color: "#c59b27", colorRgb: "197, 155, 39", icon: <FaHtml5 /> },
      { name: "CSS3 / Sass", level: 85, color: "#d4af37", colorRgb: "212, 175, 55", icon: <FaCss3Alt /> },
    ],
  },
  {
    title: "Backend & DB",
    num: "03",
    icon: <VscServerEnvironment />,
    glowColor: "#c59b27",
    glowColorRgb: "197, 155, 39",
    items: [
      { name: "Spring Boot", level: 88, color: "#d4af37", colorRgb: "212, 175, 55", icon: <SiSpringboot /> },
      { name: "Node.js", level: 80, color: "#dfb876", colorRgb: "223, 184, 118", icon: <DiNodejs /> },
      { name: "SQL / Databases", level: 85, color: "#e5c158", colorRgb: "229, 193, 88", icon: <CiDatabase /> },
      { name: "MongoDB", level: 80, color: "#f3e5ab", colorRgb: "243, 229, 171", icon: <SiMongodb /> },
    ],
  },
  {
    title: "Tools & DevOps",
    num: "04",
    icon: <BsTools />,
    glowColor: "#f3e5ab",
    glowColorRgb: "243, 229, 171",
    items: [
      { name: "Git / GitHub", level: 90, color: "#dfb876", colorRgb: "223, 184, 118", icon: <DiGit /> },
      { name: "Docker", level: 70, color: "#c59b27", colorRgb: "197, 155, 39", icon: <SiDocker /> },
    ],
  },
];

export default function SkillsDashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll(".skill-progress-bar");
    
    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-level") + "%";
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="skills-dashboard" ref={containerRef}>
      {skillCategories.map((cat, idx) => (
        <div
          key={idx}
          className="skill-category-card"
          style={{
            "--card-glow": cat.glowColor,
            "--card-glow-rgb": cat.glowColorRgb,
          }}
        >
          <div className="skill-category-header">
            <div className="skill-category-title-wrap">
              <span className="skill-category-icon">{cat.icon}</span>
              <h4 className="skill-category-title">{cat.title}</h4>
            </div>
            <span className="skill-category-num">{cat.num}</span>
          </div>

          <div className="skill-items-list">
            {cat.items.map((item, sIdx) => (
              <div
                key={sIdx}
                className="skill-progress-item"
                style={{
                  "--skill-color": item.color,
                  "--skill-color-rgb": item.colorRgb,
                }}
              >
                <div className="skill-info">
                  <div className="skill-name-wrap">
                    <span className="skill-icon-mini">{item.icon}</span>
                    <span className="skill-name">{item.name}</span>
                  </div>
                  <span className="skill-percentage">{item.level}%</span>
                </div>
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-bar"
                    data-level={item.level}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
