import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const socials = [
  { href: "https://github.com/mdey0108/",             Icon: AiFillGithub,    title: "GitHub" },
  { href: "https://x.com/trdevloafer",               Icon: AiOutlineTwitter, title: "Twitter" },
  { href: "https://www.linkedin.com/in/mdey0108/",   Icon: FaLinkedinIn,    title: "LinkedIn" },
  { href: "https://www.instagram.com/dev_loafer/",   Icon: AiFillInstagram, title: "Instagram" },
];

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center gy-2">
          <Col md={4} className="footer-copywright">
            <h3>Crafted with ☕ by a Professional Meeting Attender</h3>
          </Col>
          <Col md={4} className="footer-copywright">
            <div className="footer-socials">
              {socials.map(({ href, Icon, title }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                   className="footer-icon-link" title={title}>
                  <Icon />
                </a>
              ))}
            </div>
            <h3 style={{ marginTop: "0.5rem" }}>© {year} Mahesh Kumar Dey</h3>
          </Col>
          <Col md={4} className="footer-copywright">
            <h3>Surviving Sprints Since 2021 🏃</h3>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
