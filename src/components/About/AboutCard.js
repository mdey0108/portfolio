import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi! I'm <span className="purple">Mahesh Kumar Dey</span>, from{" "}
            <span className="purple">Balrampur, Chhattisgarh, India</span> —
            yes, that's a real place, Google it. 🗺️
            <br />
            Currently surviving as a Software Engineer at{" "}
            <span className="purple">Cognizant, NewTown, Kolkata</span> — where
            I attend meetings for a living and occasionally write code.
            <br />
            Armed with a B.Tech in CSE from{" "}
            <span className="purple">CSIT Durg, Chhattisgarh</span> — the
            degree that convinced my parents this was a real career.
            <br />
            <br />
            When I'm not pretending to understand Jira tickets, I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Writing Quotes{" "}
              <span style={{ color: "#c770f0" }}>(wisdom no one asked for)</span>
            </li>
            <li className="about-activity">
              <ImPointRight /> Creating Memes{" "}
              <span style={{ color: "#c770f0" }}>(my true calling tbh)</span>
            </li>
            <li className="about-activity">
              <ImPointRight /> Editing Videos{" "}
              <span style={{ color: "#c770f0" }}>(I do own a laptop, after all)</span>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "वो शांत जैसे खेत, में शहर जैसा बावला ।<br />
            वो दूध जैसी सफेद, मैं चाय जैसा सांवला ।।"{" "}
          </p>
          <footer className="blockquote-footer">
            <a
              href="https://www.yourquote.in/mahesh-kumar-dey-n4et/quotes/"
              target="_blank"
              rel="noreferrer"
            >
              Mahesh
            </a>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
