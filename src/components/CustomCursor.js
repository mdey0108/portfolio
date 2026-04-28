import React, { useEffect, useState } from "react";

function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up   = () => setClicking(false);

    // Detect when hovering over interactive elements
    const overLink = (e) => setHovering(
      ["A", "BUTTON", "INPUT", "TEXTAREA"].includes(e.target.tagName)
    );

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overLink);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overLink);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${clicking ? "cursor-click" : ""} ${hovering ? "cursor-hover" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

export default CustomCursor;
