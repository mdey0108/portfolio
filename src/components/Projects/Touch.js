import React, { useState } from "react";

export default function Touch() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    
    setStatus("sending");
    const key = process.env.REACT_APP_WEB3FORMS_KEY || "YOUR_WEB3FORMS_KEY";

    if (key === "YOUR_WEB3FORMS_KEY") {
      // Mock successful transmission for local tests and demos
      console.warn(
        "[Touch.js] Web3Forms key is 'YOUR_WEB3FORMS_KEY'. Simulating successful transmission. " +
        "Please define process.env.REACT_APP_WEB3FORMS_KEY or create a .env file to enable actual email delivery."
      );
      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      }, 1500);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: key,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="contact-name">NAME</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className="form-control"
            placeholder="What do I call you?"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contact-email">EMAIL</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="form-control"
            placeholder="your@email.com (I won't spam, promise)"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contact-message">MESSAGE</label>
          <textarea
            id="contact-message"
            name="message"
            className="form-control"
            rows={5}
            placeholder="Tell me something... 'hire me', 'collab?', 'cool portfolio!' — all valid."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-button btn btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? "Transmitting... 📡"
            : status === "success"
            ? "✅ Message sent! I'll reply soon™"
            : status === "error"
            ? "❌ Something broke. Try again?"
            : "Send Message 🚀"}
        </button>
      </form>
    </div>
  );
}
