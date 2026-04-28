import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiFillGithub,
} from "react-icons/ai";
import { MdOutlineContactMail } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { VscCode } from "react-icons/vsc";

function NavBar() {
  const [isExpanded, setIsExpanded]       = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Sticky effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const navItems = [
    { href: "#home",     text: "Home",     Icon: AiOutlineHome },
    { href: "#about",    text: "About",    Icon: AiOutlineUser },
    { href: "#skills",   text: "Skills",   Icon: BsTools },
    { href: "#projects", text: "Projects", Icon: VscCode },
    { href: "#contact",  text: "Contact",  Icon: MdOutlineContactMail },
  ];

  return (
    <Navbar
      expanded={isExpanded}
      fixed="top"
      expand="md"
      className={isScrolled ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center text-brand">
          Mahesh<span className="brand-dot-dev">.Dev</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map(({ href, text, Icon }) => (
              <Nav.Item key={href}>
                <Nav.Link
                  href={href}
                  onClick={() => setIsExpanded(false)}
                  className={activeSection === href.slice(1) ? "nav-active" : ""}
                >
                  <Icon style={{ marginBottom: "2px" }} /> {text}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item>
              <Nav.Link
                href="https://github.com/mdey0108/"
                target="_blank"
                rel="noreferrer"
                className="github-btn"
                title="My GitHub — enter at own risk"
              >
                <AiFillGithub style={{ fontSize: "1.2em" }} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
