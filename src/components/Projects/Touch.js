import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const loadingLines = [
  "Sending carrier pigeon... 🐦",
  "Bribing the internet gods... 🙏",
  "Waking up the server hamsters... 🐹",
  "Translating to binary... 01001000...",
  "Passing through 7 proxies... 🕵️",
];

function launchConfetti() {
  const colors = ["#00ff88", "#00d4ff", "#ff006e", "#ffffff", "#ffff00"];
  for (let i = 0; i < 90; i++) {
    const dot = document.createElement("div");
    const size = Math.random() * 8 + 4;
    dot.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-12px;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? "50%" : "3px"};
      z-index:99999;
      pointer-events:none;
      animation: confettiFall ${Math.random() * 2 + 1.5}s ease-in forwards;
      animation-delay:${Math.random() * 0.6}s;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 3500);
  }
}

function Touch() {
  const [result,    setResult]    = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadMsg,   setLoadMsg]   = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult("");
    setLoadMsg(loadingLines[Math.floor(Math.random() * loadingLines.length)]);

    const formData = new FormData(event.target);
    formData.append("access_key", "6fa4304d-4d85-4250-81cd-5b9b79b772ad");

    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method: "POST", body: formData, headers: { Accept: "application/json" },
      });
      const data = await res.json();

      if (data.success) {
        setResult("success");
        launchConfetti();
        event.target.reset();
      } else {
        setResult(data.message || "error");
      }
    } catch {
      setResult("network-error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAlert = () => {
    if (result === "success")
      return <Alert variant="success" className="mt-3">🎉 Message received! I'll reply faster than my PRs get reviewed.</Alert>;
    if (result === "network-error")
      return <Alert variant="danger" className="mt-3">📡 Network went AWOL. Check your connection and try again!</Alert>;
    if (result)
      return <Alert variant="danger" className="mt-3">😬 Something broke. Not my code, obviously. Try again?</Alert>;
    return null;
  };

  return (
    <Container className="contact-form-container py-4">
      <Form onSubmit={onSubmit} className="contact-form">
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Not 'Anonymous', please 🙏" required minLength={2} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" placeholder="your@email.com (pinky promise, no spam 🤙)" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone <span style={{ color: "var(--text-dim)", fontSize: "0.82em" }}>(optional)</span></Form.Label>
          <Form.Control type="tel" name="phone" placeholder="Digits only, like my bank balance 🙂" pattern="[0-9]*" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" rows={4}
            placeholder="Say hi, pitch a collab, or just share a meme 👋" required minLength={10} />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? loadMsg : "Send it! 🚀"}
        </Button>

        {getAlert()}
      </Form>
    </Container>
  );
}

export default Touch;