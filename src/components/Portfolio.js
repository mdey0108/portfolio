import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./Navbar";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import BackToTop from "./BackToTop";
import CustomCursor from "./CustomCursor";
import Type from "./Home/Type";
import Touch from "./Projects/Touch";
import pdf from "../Assets/MaheshKumarResume2.0.pdf";
import homeLogo from "../Assets/home-main.svg";
import laptopImg from "../Assets/about.png";
import Tilt from "react-parallax-tilt";
import { ImPointRight } from "react-icons/im";
import {
  AiFillGithub, AiOutlineTwitter, AiFillInstagram, AiOutlineDownload,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

import HeroScene from "./3d/HeroScene";
import FloatingGeometry from "./3d/FloatingGeometry";
import ProjectsCarousel3D from "./3d/ProjectsCarousel3D";
import SkillsDashboard from "./SkillsDashboard";

gsap.registerPlugin(ScrollTrigger);

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





/* ── CountUp stat item ── */
function StatItem({ num, label }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const isInf = num === "∞";
    const hasPlus = num.includes("+");
    const raw = parseFloat(num);
    if (isInf) return; // static
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: raw,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
        onUpdate() {
          if (ref.current) ref.current.textContent = Math.round(obj.val) + (hasPlus ? "+" : "");
        },
      });
    });
    return () => ctx.revert();
  }, [num]);
  return (
    <div className="stat-item">
      <div className="stat-number" ref={num === "∞" ? null : ref}>{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Hero name letter-by-letter reveal ── */
function HeroName() {
  return (
    <h1 className="hero-name gsap-hero-el">
      I'M <strong className="main-name">MAHESH KUMAR DEY</strong>
    </h1>
  );
}

/* ── Section heading reveal ── */
function SectionTitle({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, skewY: 2 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);
  return <h2 ref={ref} className={`section-title ${className}`}>{children}</h2>;
}

/* ── Timeline card with 3D slide-in ── */
function TimelineCard({ date, title, org, bullets, tags, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: -40, rotationY: -15, transformPerspective: 800 },
        {
          opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "power3.out", delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);
  return (
    <div className="timeline-item" ref={ref}>
      <div className="timeline-card timeline-card-3d">
        <div className="timeline-date">{date}</div>
        <div className="timeline-title">{title}</div>
        <div className="timeline-org">{org}</div>
        <ul className="timeline-desc">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        {tags && (
          <div className="timeline-tags">
            {tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══ MAIN PORTFOLIO COMPONENT ══ */
function Portfolio() {
  const [wisdomIdx,  setWisdomIdx]  = useState(0);
  const [showWisdom, setShowWisdom] = useState(false);

  const heroTextRef = useRef(null);
  const aboutCardRef = useRef(null);

  const nextWisdom = () => {
    setWisdomIdx((i) => (i + 1) % devWisdom.length);
    setShowWisdom(true);
  };

  /* ── Hero text entrance ── */
  useEffect(() => {
    if (!heroTextRef.current) return;
    const els = heroTextRef.current.querySelectorAll(".gsap-hero-el");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.1 }
    );
  }, []);

  /* ── About card reveal ── */
  useEffect(() => {
    if (!aboutCardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        aboutCardRef.current,
        { opacity: 0, x: -50, rotationY: -12, transformPerspective: 900 },
        {
          opacity: 1, x: 0, rotationY: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: aboutCardRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      /* paragraph stagger inside the card */
      const paras = aboutCardRef.current.querySelectorAll("p, .about-list li, .hindi-quote");
      gsap.fromTo(
        paras,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08, delay: 0.3,
          scrollTrigger: { trigger: aboutCardRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-wrap">
      <CustomCursor />
      <ProgressBar />
      <NavBar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section id="home" className="hero-section">
        <HeroScene />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="hero-row align-items-center">
            <Col md={7} className="hero-text" ref={heroTextRef}>
              <span className="hero-tag gsap-hero-el">
                software_engineer --org="Cognizant" --mode="surviving"
              </span>

              <h2 className="hero-greeting gsap-hero-el">
                Hi There!{" "}
                <span className="wave" role="img" aria-label="wave">👋🏻</span>
              </h2>

              <HeroName />

              <div className="hero-type gsap-hero-el"><Type /></div>

              <ul className="hero-socials gsap-hero-el">
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

              <div className="hero-actions gsap-hero-el">
                <a href={pdf} target="_blank" rel="noreferrer" className="btn-primary-custom">
                  <AiOutlineDownload /> Download Resume
                </a>
                <a href="#contact" className="btn-outline-custom">./contact.sh 💬</a>
              </div>

              <div className="hero-stats gsap-hero-el">
                {[
                  { num: "5+",  label: "Years Exp." },
                  { num: "10+", label: "Projects" },
                  { num: "∞",   label: "Bugs Created" },
                ].map(({ num, label }) => (
                  <StatItem key={label} num={num} label={label} />
                ))}
              </div>
            </Col>

            <Col md={5} className="hero-avatar text-center" style={{ paddingBottom: 20 }}>
              <Tilt>
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Tilt>
            </Col>
          </Row>
        </Container>
        <div className="scroll-indicator">
          <span>scroll</span><div className="scroll-dot" />
        </div>
      </section>

      {/* ══════════════════════════════
          ABOUT
      ══════════════════════════════ */}
      <section id="about" className="about-section" style={{ position: "relative" }}>
        <FloatingGeometry style={{ opacity: 0.35 }} />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <SectionTitle>Know Who <span className="green">I'M</span></SectionTitle>
          <Row className="align-items-center g-4">
            <Col md={7}>
              <div className="about-card about-card-3d" ref={aboutCardRef}>
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

                <button className="wisdom-btn" onClick={nextWisdom}>
                  {showWisdom ? "Another Dev Wisdom" : "Get Dev Wisdom"}
                </button>
                {showWisdom && <p className="wisdom-text">{devWisdom[wisdomIdx]}</p>}
              </div>
            </Col>
            <Col md={5} className="about-img-col text-center">
              <Tilt>
                <img 
                  src={laptopImg} 
                  alt="about" 
                  className="img-fluid" 
                  style={{ maxHeight: "350px" }} 
                />
              </Tilt>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════
          JOURNEY
      ══════════════════════════════ */}
      <section id="journey" className="journey-section" style={{ position: "relative", overflow: "hidden" }}>
        <FloatingGeometry style={{ opacity: 0.25 }} />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <SectionTitle>
            My <span className="green">Journey</span>
            <span className="section-hint"> — the corporate saga</span>
          </SectionTitle>
          <Row className="g-4">

            {/* Experience */}
            <Col md={6}>
              <h3 className="journey-col-title">💼 Work Experience</h3>
              <div className="timeline">
                <TimelineCard
                  delay={0}
                  date="Jan 2022 – Present · 4+ yrs"
                  title="Software Engineer"
                  org="Cognizant Technology Solutions · Kolkata"
                  bullets={[
                    "Production support for enterprise-level Java / Spring Boot applications",
                    "Developed & maintained RESTful APIs and microservices",
                    "Built React.js frontends and integrated with backend services",
                    "Handled incident management, root cause analysis, and L2/L3 support",
                    "Collaborated across cross-functional teams in agile sprints",
                    "Wrote Python scripts for automation and data processing",
                  ]}
                  tags={["Java", "Spring Boot", "React", "Python", "Oracle DB", "Git"]}
                />
                <TimelineCard
                  delay={0.15}
                  date="June 2021 – Dec 2021 · 7 mos"
                  title="Systems Engineer Trainee"
                  org="Infosys Limited"
                  bullets={[
                    "Completed Infosys Foundation Training Program in Java & enterprise technologies",
                    "Worked on Java-based enterprise application development modules",
                    "Trained in agile methodologies, SDLC, and software design patterns",
                    "Collaborated with cross-functional teams on internal delivery projects",
                  ]}
                  tags={["Java", "SQL", "Agile", "SDLC", "Spring"]}
                />
              </div>
            </Col>

            {/* Education */}
            <Col md={6}>
              <h3 className="journey-col-title">🎓 Education</h3>
              <div className="timeline">
                <TimelineCard
                  delay={0.05}
                  date="2016 – 2020"
                  title="B.Tech — Computer Science & Engineering"
                  org="CSIT Durg, Chhattisgarh (CSVTU affiliated)"
                  bullets={[
                    "Core subjects: DSA, DBMS, OS, Computer Networks, OOP",
                    "Developed multiple academic projects in Java & Python",
                    "Active participant in coding competitions and tech events",
                  ]}
                  tags={["Java", "Python", "C/C++", "DBMS", "Networking"]}
                />
                <TimelineCard
                  delay={0.2}
                  date="2014 – 2015"
                  title="Higher Secondary — Science (PCM)"
                  org="Balrampur, Chhattisgarh"
                  bullets={[
                    "Physics, Chemistry, Maths — where the real debugging began 🔬",
                  ]}
                />
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════
          SKILLS
      ══════════════════════════════ */}
      <section id="skills" className="skills-section" style={{ position: "relative" }}>
        <FloatingGeometry style={{ opacity: 0.25 }} />
        <Container style={{ position: "relative", zIndex: 2 }}>
          <SectionTitle>
            Professional <span className="green">Skillset</span>
            <span className="section-hint"> — core languages, frameworks, & tools</span>
          </SectionTitle>
          <SkillsDashboard />
        </Container>
      </section>

      {/* ══════════════════════════════
          PROJECTS
      ══════════════════════════════ */}
      <section id="projects" className="projects-section">
        <Container>
          <SectionTitle>
            Featured <span className="green">Projects</span>
            <span className="section-hint"> — 3D cylinder carousel</span>
          </SectionTitle>
          <ProjectsCarousel3D />
        </Container>
      </section>

      {/* ══════════════════════════════
          CONTACT
      ══════════════════════════════ */}
      <section id="contact" className="contact-section" style={{ position: "relative" }}>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <SectionTitle>Let's <span className="green">Connect</span></SectionTitle>
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
