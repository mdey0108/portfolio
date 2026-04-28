import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const devWisdom = [
  "\"It works on my machine\" — a timeless classic 🖥️",
  "\"I'll fix it tomorrow\" — said every dev, every day 📅",
  "\"It's not a bug, it's a feature\" — the patent pending excuse 🐛✨",
  "Debugging: being the detective in a crime movie where you're also the murderer 🕵️",
  "99 little bugs in the code... take one down, patch it around... 127 little bugs in the code 🎶",
  "\"Just one more commit\" *pushes at 2 AM* 🌙",
  "A clean code is a happy code. My code is... let's say, expressive. 🎨",
  "Git blame? More like git shame. 😅",
];

function Home2() {
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [showWisdom, setShowWisdom] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  const handleWisdom = () => {
    setWisdomIndex((prev) => (prev + 1) % devWisdom.length);
    setShowWisdom(true);
    setWiggle(true);
    setTimeout(() => setWiggle(false), 600);
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              WELCOME TO <span className="purple">MY WORLD</span> OF CODE
            </h1>
            <p className="home-about-body">
              My journey into programming began with curiosity... and a severe
              lack of better options. Every line of code tells a story 💻
              <br />
              <br />
              My tech arsenal includes classics like{" "}
              <i>
                <b className="purple">C, Java, and Spring Boot</b>
              </i>{" "}
              — because why not carry legacy on your shoulders?
              <br />
              And I also dabble in cooler stuff like{" "}
              <i>
                <b className="purple">Python, JavaScript, and Generative AI</b>
              </i>{" "}
              so I can pretend I'm ahead of the curve.
              <br />
              <br />
              I'm passionate about{" "}
              <i>
                <b className="purple">
                  Full Stack Dev, Production Engineering,
                </b>{" "}
                and anything with the word{" "}
                <b className="purple">AI</b> in it (it sounds impressive at parties).
              </i>
              <br />
              <br />
              When not debugging (which is rare), I create content,{" "}
              <b className="purple">produce videos</b>, and share wisdom with my{" "}
              <i>
                <b className="purple">amazing network</b>
              </i>{" "}
              — basically I'm a developer with a social media addiction. 😄
            </p>

            {/* Interactive wisdom button */}
            <div style={{ marginTop: "1.5rem" }}>
              <button
                onClick={handleWisdom}
                style={{
                  background: "rgba(199, 112, 240, 0.15)",
                  border: "1.5px solid rgba(199, 112, 240, 0.5)",
                  color: "#c770f0",
                  padding: "0.5rem 1.4rem",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(199, 112, 240, 0.3)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 15px rgba(199,112,240,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(199, 112, 240, 0.15)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                💡 {showWisdom ? "Next Dev Wisdom" : "Get Dev Wisdom"}
              </button>

              {showWisdom && (
                <p
                  style={{
                    marginTop: "1rem",
                    color: "#e0c3ff",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    animation: wiggle ? "wisdomPop 0.5s ease" : "none",
                    background: "rgba(199,112,240,0.08)",
                    padding: "0.75rem 1.2rem",
                    borderRadius: "10px",
                    borderLeft: "3px solid #c770f0",
                  }}
                >
                  {devWisdom[wisdomIndex]}
                </p>
              )}
            </div>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
              (I reply faster than my PRs get merged 😅)
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/mdey0108/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="GitHub — where my code lives (and dies)"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/trdevloafer"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Twitter/X — hot takes & cold coffee"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/mdey0108/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="LinkedIn — professional me (I wear a shirt there)"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/dev_loafer/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  title="Instagram — where I post my best angles"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
