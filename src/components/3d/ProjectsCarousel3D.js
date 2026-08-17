import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineLoading } from "react-icons/ai";

// Dedicated metadata for the target 9 projects
const projectMetadata = {
  "med-app": {
    title: "MeD-App",
    desc: "A medicine delivery application designed to facilitate online order placements, prescription verification, real-time shipment tracking, and medical logistics.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    glowColor: "rgba(223, 184, 118, 0.45)", // Gold
  },
  "ai-chat-app": {
    title: "ai-chat-app",
    desc: "An intelligent conversational agent and chat application. Powered by advanced LLMs, it features real-time stream responses, contextual chat history memory, custom system prompts, and a highly polished glassmorphic UI.",
    tags: ["React", "LLM API", "Node.js", "Socket.io"],
    glowColor: "rgba(243, 229, 171, 0.45)", // Champagne
  },
  "gyaanguru.ai": {
    title: "gyaanguru.ai",
    desc: "An AI-driven personalized tutoring and learning assistant. Leverages large language models to explain complex topics, create quiz modules, and recommend custom learning roadmaps tailored to the student's progress.",
    tags: ["TypeScript", "Next.js", "LLM", "Education AI"],
    glowColor: "rgba(229, 193, 88, 0.45)", // Amber
  },
  "logkyakahenge": {
    title: "logkyakahenge",
    desc: "A smart, AI-powered log parser and analyzer. Automates reading and troubleshooting stack traces and batch execution logs, identifying root causes of system failures and suggesting direct code fixes.",
    tags: ["AI", "Log Analysis", "Automation", "Python"],
    glowColor: "rgba(197, 155, 39, 0.45)", // Bronze
  },
  "sas-manager-": {
    title: "SAS-manager-",
    desc: "An end-to-end sales and stock management dashboard. Designed for retail and inventory business flows, providing real-time item tracking, sales invoices, low-stock warnings, and historical revenue analytics.",
    tags: ["JavaScript", "Inventory", "Sales DB", "Analytics"],
    glowColor: "rgba(223, 184, 118, 0.45)", // Gold
  },
  "whoru": {
    title: "WhoRU",
    desc: "A social engineering and security demonstration tool designed to request and capture webcam or phone front-camera snapshots via link interaction.",
    tags: ["React", "Profile API", "OAuth2", "Security"],
    glowColor: "rgba(229, 193, 88, 0.45)", // Amber
  },
  "xml-cleaner": {
    title: "xml-cleaner",
    desc: "A utility application for sanitizing, formatting, and purifying XML files. Removes redundant tags, handles encoding issues, formats structure indentations, and prepares files for automated database ingestion pipelines.",
    tags: ["Java", "XML Parsing", "File I/O", "Utility"],
    glowColor: "rgba(197, 155, 39, 0.45)", // Bronze
  },
  "filevault-application": {
    title: "filevault-application",
    desc: "A high-security encrypted file storage and locker application. Protects sensitive documents using advanced AES-256 encryption, custom passwords, and safe decryptions.",
    tags: ["Java", "Security", "AES Cryptography", "Vault"],
    glowColor: "rgba(243, 229, 171, 0.45)", // Champagne
  },
  "api-automation": {
    title: "Api-Automation",
    desc: "A modular automation framework for RESTful API testing. Integrates automated request validation, payload checks, response time assertions, and test suite report generation.",
    tags: ["Python", "API Testing", "Automation", "PyTest"],
    glowColor: "rgba(223, 184, 118, 0.45)", // Gold
  },
};

const targetKeys = Object.keys(projectMetadata);

// Static backup fallback
const backupProjects = targetKeys.map((key) => ({
  ...projectMetadata[key],
  ghLink: `https://github.com/mdey0108/${key}`,
  demoLink: key === "ai-chat-app" ? "https://chatify-45.web.app/" : key === "gyaanguru.ai" ? "https://code-editor-react.web.app/" : "",
}));

export default function ProjectsCarousel3D() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/mdey0108/repos?sort=updated&per_page=35")
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API request failed");
        return res.json();
      })
      .then((data) => {
        // Map exactly the 9 requested target projects
        const mapped = targetKeys.map((key) => {
          const info = projectMetadata[key];
          const repo = data.find((r) => r.name.toLowerCase() === key.toLowerCase());

          return {
            title: info.title,
            desc: info.desc,
            tags: info.tags,
            ghLink: repo ? repo.html_url : `https://github.com/mdey0108/${key}`,
            demoLink: repo?.homepage || (key === "ai-chat-app" ? "https://chatify-45.web.app/" : key === "gyaanguru.ai" ? "https://code-editor-react.web.app/" : ""),
            glowColor: info.glowColor,
          };
        });

        setRepos(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("[Projects] GitHub API fetch failed, loading static target projects:", err);
        setRepos(backupProjects);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="projects-loader-container">
        <AiOutlineLoading className="loader-spin" />
        <span className="loader-text">SCANNING GITHUB REPOSITORIES... 📡</span>
      </div>
    );
  }

  return (
    <div className="projects-grid-container">
      {repos.map((project) => (
        <Tilt
          key={project.title}
          perspective={1200}
          glareEnable={true}
          glareMaxOpacity={0.12}
          scale={1.03}
          className="project-tilt-wrapper"
        >
          <div
            className="project-grid-card"
            style={{
              "--project-glow": project.glowColor,
            }}
          >
            {/* Content Body */}
            <div className="project-content">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.desc}</p>
              
              <div className="project-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-card-actions">
                <a
                  href={project.ghLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project-action-btn github-btn"
                >
                  <AiFillGithub /> GitHub
                </a>
              </div>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  );
}
