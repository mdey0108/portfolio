import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import Particle from "./Particle";
import NavBar from "./Navbar";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import BackToTop from "./BackToTop";
import CustomCursor from "./CustomCursor";
import Type from "./Home/Type";
import Techstack from "./About/Techstack";
import Toolstack from "./About/Toolstack";
import Touch from "./Projects/Touch";
import myImg from "../Assets/avatar.svg";
import laptopImg from "../Assets/about.png";
import pdf from "../Assets/MaheshKumarResume2.0.pdf";
import { ImPointRight } from "react-icons/im";
import {
  AiFillGithub, AiOutlineTwitter, AiFillInstagram, AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";

/* ─── Dev wisdom pool ─── */
const devWisdom = [
  '"It works on my machine" — a timeless classic 🖥️',
  '"I\'ll fix it tomorrow" — said every dev, every day 📅',
  '"It\'s not a bug, it\'s a feature" — patent pending 🐛✨',
  "Debugging: being the detective in a crime where you're also the murderer 🕵️",
  "99 bugs in the code... patch one... 127 bugs in the code 🎶",
  '"Just one more commit" *pushes at 2 AM* 🌙',
  "git push --force (just this once) 😅",
  "SELECT sanity FROM dev WHERE remaining > 0; — 0 rows returned 🗄️",
];

/* ─── Easter egg messages ─── */
const easterEggs = [
  "👀 Still clicking?",
  "🤔 Hmm...",
  "😂 OK keep going",
  "🎉 You found it! Achievement unlocked: Persistent Clicker",
  "🦄 There's nothing here. Go touch grass.",
];

const projects = [
  {
    emoji: "📋",
    color: "rgba(0,255,136,0.06)", border: "rgba(0,255,136,0.3)",
    title: "LogKyaKahenge",
    desc: "AI-based log analysis for batch jobs & enterprise apps. Reads logs so you don't have to — because nobody enjoys reading 10,000 lines of stack traces. 🔍",
    tags: ["AI", "Log Analysis", "Automation", "Batch Jobs"],
    github: "https://github.com/mdey0108/logkyakahenge",
  },
  {
    emoji: "🧠",
    color: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.3)",
    title: "GyaanGuru AI",
    desc: "Your personal AI learning guru — because asking your manager to explain things twice is awkward. TypeScript-powered, AI-driven learning platform. 🎓",
    tags: ["TypeScript", "AI", "LLM", "Education"],
    github: "https://github.com/mdey0108/gyaanguru.ai",
  },
  {
    emoji: "📦",
    color: "rgba(255,200,0,0.06)", border: "rgba(255,200,0,0.25)",
    title: "SAS Manager",
    desc: "Stock & Sales management system. My manager asked for an Excel sheet, I delivered a full web app. He didn't know the difference. 😎",
    tags: ["JavaScript", "Stock", "Sales", "Management"],
    github: "https://github.com/mdey0108/SAS-manager-",
  },
  {
    emoji: "📄",
    color: "rgba(255,0,110,0.06)", border: "rgba(255,0,110,0.25)",
    title: "ConvertToPDF",
    desc: "Spring Boot microservice converting non-PDF & TIFF files to PDF/TIFF format. Enterprise-grade file handling — because someone has to do the boring stuff. ☕",
    tags: ["Java", "Spring Boot", "PDF", "Microservice"],
    github: "https://github.com/mdey0108/converttopdf",
  },
  {
    emoji: "✍️",
    color: "rgba(160,100,255,0.07)", border: "rgba(160,100,255,0.28)",
    title: "Blog App",
    desc: "Full-featured blog writing platform built on Spring Boot. Write, publish, and pretend you'll post consistently. (Spoiler: you won't.) 📝",
    tags: ["Java", "Spring Boot", "REST API", "Blog"],
    github: "https://github.com/mdey0108/blog_app",
  },
  {
    emoji: "💻",
    color: "rgba(0,255,136,0.04)", border: "rgba(0,255,136,0.2)",
    title: "Dev Portfolio",
    desc: "You're staring at it right now. Cyberpunk React portfolio with confetti, easter eggs, neon cursor & zero meetings required to build. 🎉",
    tags: ["React", "CSS", "Bootstrap", "Web3Forms"],
    github: "https://github.com/mdey0108/portfolio",
    demo: "https://mdey0108.github.io/portfolio",
  },
];

function Portfolio() {
  const [wisdomIdx,   setWisdomIdx]   = useState(0);
  const [showWisdom,  setShowWisdom]  = useState(false);
  const [eggCount,    setEggCount]    = useState(0);
  const [eggMsg,      setEggMsg]      = useState("");

  const nextWisdom = () => {
    setWisdomIdx((i) => (i + 1) % devWisdom.length);
    setShowWisdom(true);
  };

  const handleAvatarClick = () => {
    const next = eggCount + 1;
    setEggCount(next);
    setEggMsg(easterEggs[Math.min(next - 1, easterEggs.length - 1)]);
    if (next >= easterEggs.length) setTimeout(() => { setEggCount(0); setEggMsg(""); }, 3000);
  };

  return (
    <div className="portfolio-wrap">
      <CustomCursor />
      <ProgressBar />
      <NavBar />

      {/* ══ HERO ══ */}
      <section id="home" className="hero-section">
        <Particle />
        <Container>
          <Row className="hero-row align-items-center">
            <Col md={7} className="hero-text">
              <span className="hero-tag">software_engineer --org="Cognizant" --mode="surviving"</span>

              <h2 className="hero-greeting">
                Hi There!{" "}
                <span className="wave" role="img" aria-label="wave">👋🏻</span>
              </h2>
              <h1 className="hero-name">
                I'M <strong className="main-name">Mahesh Kumar Dey</strong>
              </h1>

              <div className="hero-type"><Type /></div>

              <ul className="hero-socials">
                {[
                  { href: "https://github.com/mdey0108/",           Icon: AiFillGithub,    title: "GitHub" },
                  { href: "https://x.com/trdevloafer",             Icon: AiOutlineTwitter, title: "Twitter" },
                  { href: "https://www.linkedin.com/in/mdey0108/", Icon: FaLinkedinIn,    title: "LinkedIn" },
                  { href: "https://www.instagram.com/dev_loafer/", Icon: AiFillInstagram, title: "Instagram" },
                ].map(({ href, Icon, title }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noreferrer"
                       className="social-icon-link" title={title}><Icon /></a>
                  </li>
                ))}
              </ul>

              <div className="hero-actions">
                <a href={pdf} target="_blank" rel="noreferrer" className="btn-primary-custom">
                  <AiOutlineDownload /> Download Resume
                </a>
                <a href="#contact" className="btn-outline-custom">./contact.sh 💬</a>
              </div>

              <div className="hero-stats">
                {[
                  { num: "3+", label: "Years Exp." },
                  { num: "10+", label: "Projects" },
                  { num: "∞",  label: "Bugs Created" },
                ].map(({ num, label }) => (
                  <div className="stat-item" key={label}>
                    <div className="stat-number">{num}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </Col>

            <Col md={5} className="hero-avatar">
              <div className="avatar-ring" onClick={handleAvatarClick} title="Click me 👀">
                <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={800}>
                  <img src={myImg} className="img-fluid" alt="Mahesh avatar"
                       style={{ maxHeight: "400px", cursor: "pointer" }} />
                </Tilt>
              </div>
              {eggMsg && <p className="easter-egg-msg">{eggMsg}</p>}
            </Col>
          </Row>
        </Container>
        <div className="scroll-indicator">
          <span>scroll</span><div className="scroll-dot" />
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="about-section">
        <Container>
          <h2 className="section-title">Know Who <span className="green">I'M</span></h2>
          <Row className="align-items-center g-4">
            <Col md={7}>
              <div className="about-card">
                <p>Hi! I'm <span className="green">Mahesh Kumar Dey</span>, from{" "}
                  <span className="green">Balrampur, Chhattisgarh</span> — a place so peaceful I had to move to
                  Kolkata just to raise my stress levels. 🗺️</p>
                <p>
                  Currently surviving as a Software Engineer at{" "}
                  <span className="green">Cognizant, NewTown, Kolkata</span> — attending stand-ups, writing
                  Jira comments, and <em>occasionally</em> writing actual code.</p>
                <p>Armed with a B.Tech in CSE from{" "}
                  <span className="green">CSIT Durg</span> — the degree that convinced my parents I wasn't
                  just "playing on the computer" all along. 🎓</p>
                <p style={{ marginTop: "1rem", color: "var(--text-dim)" }}>
                  When not pretending to understand Jira tickets:
                </p>
                <ul className="about-list">
                  <li><ImPointRight /> Writing Quotes <span className="purple-dim">(wisdom nobody asked for)</span></li>
                  <li><ImPointRight /> Creating Memes <span className="purple-dim">(my true calling, tbh)</span></li>
                  <li><ImPointRight /> Editing Videos <span className="purple-dim">(I do own a laptop, after all)</span></li>
                </ul>
                <blockquote className="hindi-quote">
                  "वो शांत जैसे खेत, में शहर जैसा बावला ।<br />वो दूध जैसी सफेद, मैं चाय जैसा सांवला ।।"
                  <footer>
                    <a href="https://www.yourquote.in/mahesh-kumar-dey-n4et/quotes/"
                       target="_blank" rel="noreferrer">— Mahesh</a>
                  </footer>
                </blockquote>
                <button className="wisdom-btn" onClick={nextWisdom}>
                  {showWisdom ? "Another Dev Wisdom" : "Get Dev Wisdom"}
                </button>
                {showWisdom && <p className="wisdom-text">{devWisdom[wisdomIdx]}</p>}
              </div>
            </Col>
            <Col md={5} className="about-img-col">
              <img src={laptopImg} alt="about" className="img-fluid about-img" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══ JOURNEY ══ */}
      <section id="journey" className="journey-section">
        <Container>
          <h2 className="section-title">
            My <span className="green">Journey</span>
            <span className="section-hint"> — the corporate saga</span>
          </h2>
          <Row className="g-4">

            {/* Experience */}
            <Col md={6}>
              <h3 className="journey-col-title">💼 Work Experience</h3>
              <div className="timeline">

                <div className="timeline-item">
                  <div className="timeline-card">
                    <div className="timeline-date">Nov 2021 – Present · 3+ yrs</div>
                    <div className="timeline-title">Software Engineer</div>
                    <div className="timeline-org">Cognizant Technology Solutions · Kolkata</div>
                    <ul className="timeline-desc">
                      <li>Production support for enterprise-level Java / Spring Boot applications</li>
                      <li>Developed & maintained RESTful APIs and microservices</li>
                      <li>Built React.js frontends and integrated with backend services</li>
                      <li>Handled incident management, root cause analysis, and L2/L3 support</li>
                      <li>Collaborated across cross-functional teams in agile sprints</li>
                      <li>Wrote Python scripts for automation and data processing</li>
                    </ul>
                    <div className="timeline-tags">
                      {["Java", "Spring Boot", "React", "Python", "Oracle DB", "Git"].map(t => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="timeline-item" style={{ marginTop: "1.4rem" }}>
                  <div className="timeline-card">
                    <div className="timeline-date">2020 – 2021 · Training / Internship</div>
                    <div className="timeline-title">Systems Engineer Trainee</div>
                    <div className="timeline-org">Infosys Limited</div>
                    <ul className="timeline-desc">
                      <li>Completed Infosys Foundation Training Program in Java & enterprise technologies</li>
                      <li>Worked on Java-based enterprise application development modules</li>
                      <li>Trained in agile methodologies, SDLC, and software design patterns</li>
                      <li>Collaborated with cross-functional teams on internal delivery projects</li>
                    </ul>
                    <div className="timeline-tags">
                      {["Java", "SQL", "Agile", "SDLC", "Spring"].map(t => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </Col>

            {/* Education */}
            <Col md={6}>
              <h3 className="journey-col-title">🎓 Education</h3>
              <div className="timeline">

                <div className="timeline-item">
                  <div className="timeline-card">
                    <div className="timeline-date">2017 – 2021</div>
                    <div className="timeline-title">B.Tech — Computer Science & Engineering</div>
                    <div className="timeline-org">CSIT Durg, Chhattisgarh (CSVTU affiliated)</div>
                    <ul className="timeline-desc">
                      <li>Core subjects: DSA, DBMS, OS, Computer Networks, OOP</li>
                      <li>Developed multiple academic projects in Java & Python</li>
                      <li>Active participant in coding competitions and tech events</li>
                    </ul>
                    <div className="timeline-tags">
                      {["Java", "Python", "C/C++", "DBMS", "Networking"].map(t => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="timeline-item" style={{ marginTop: "1.4rem" }}>
                  <div className="timeline-card">
                    <div className="timeline-date">2015 – 2017</div>
                    <div className="timeline-title">Higher Secondary — Science (PCM)</div>
                    <div className="timeline-org">Balrampur, Chhattisgarh</div>
                    <ul className="timeline-desc">
                      <li>Physics, Chemistry, Maths — where the real debugging began 🔬</li>
                    </ul>
                  </div>
                </div>

              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" className="skills-section">
        <Container>
          <h2 className="section-title">
            Professional <span className="green">Skillset</span>
            <span className="section-hint"> — hover for honest reviews</span>
          </h2>
          <Techstack />
          <p className="skills-sub-title">⚒ Daily Driver Tools</p>
          <Toolstack />
        </Container>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="projects-section">
        <Container>
          <h2 className="section-title">
            Featured <span className="green">Projects</span>
            <span className="section-hint"> — things I actually built</span>
          </h2>
          <Row className="g-4">
            {projects.map((p, i) => (
              <Col md={4} key={i}>
                <div className="project-card" style={{ "--card-bg": p.color, "--card-border": p.border }}>
                  <div className="project-emoji">{p.emoji}</div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <AiFillGithub /> GitHub
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="project-link project-link-demo">
                        <BsBoxArrowUpRight /> Live
                      </a>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="contact-section">
        <Container>
          <h2 className="section-title">Let's <span className="green">Connect</span></h2>
          <p className="contact-subtitle">
            Slide into my inbox — I reply faster than my PRs get reviewed 😅
          </p>
          <Touch />
        </Container>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default Portfolio;
