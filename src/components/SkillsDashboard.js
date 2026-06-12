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
    glowColor: "#00f0ff",
    glowColorRgb: "0, 240, 255",
    items: [
      { name: "Java", level: 92, color: "#ff007a", colorRgb: "255, 0, 122", icon: <DiJava /> },
      { name: "JavaScript", level: 90, color: "#00f0ff", colorRgb: "0, 240, 255", icon: <DiJavascript1 /> },
      { name: "Python", level: 80, color: "#bd00ff", colorRgb: "189, 0, 255", icon: <SiPython /> },
      { name: "TypeScript", level: 75, color: "#00ff7a", colorRgb: "0, 255, 122", icon: <SiTypescript /> },
      { name: "C/C++", level: 70, color: "#ffaa00", colorRgb: "255, 170, 0", icon: <CgCPlusPlus /> },
    ],
  },
  {
    title: "Frontend & UI",
    num: "02",
    icon: <BsCpu />,
    glowColor: "#ff007a",
    glowColorRgb: "255, 0, 122",
    items: [
      { name: "React.js", level: 85, color: "#00f0ff", colorRgb: "0, 240, 255", icon: <DiReact /> },
      { name: "HTML5", level: 90, color: "#ff5722", colorRgb: "255, 87, 34", icon: <FaHtml5 /> },
      { name: "CSS3 / Sass", level: 85, color: "#2196f3", colorRgb: "33, 150, 243", icon: <FaCss3Alt /> },
    ],
  },
  {
    title: "Backend & DB",
    num: "03",
    icon: <VscServerEnvironment />,
    glowColor: "#bd00ff",
    glowColorRgb: "189, 0, 255",
    items: [
      { name: "Spring Boot", level: 88, color: "#bd00ff", colorRgb: "189, 0, 255", icon: <SiSpringboot /> },
      { name: "Node.js", level: 80, color: "#ff007a", colorRgb: "255, 0, 122", icon: <DiNodejs /> },
      { name: "SQL / Databases", level: 85, color: "#00f0ff", colorRgb: "0, 240, 255", icon: <CiDatabase /> },
      { name: "MongoDB", level: 80, color: "#00ff7a", colorRgb: "0, 255, 122", icon: <SiMongodb /> },
    ],
  },
  {
    title: "Tools & DevOps",
    num: "04",
    icon: <BsTools />,
    glowColor: "#00ff7a",
    glowColorRgb: "0, 255, 122",
    items: [
      { name: "Git / GitHub", level: 90, color: "#ffffff", colorRgb: "255, 255, 255", icon: <DiGit /> },
      { name: "Docker", level: 70, color: "#00f0ff", colorRgb: "0, 240, 255", icon: <SiDocker /> },
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
