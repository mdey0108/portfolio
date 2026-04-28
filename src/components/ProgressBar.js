import React, { useEffect, useState } from "react";

function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${width}%`,
        background: "linear-gradient(90deg, var(--green), var(--cyan))",
        zIndex: 9999,
        transition: "width 0.08s linear",
        borderRadius: "0 2px 2px 0",
        boxShadow: "0 0 8px rgba(0,255,136,0.6)",
      }}
    />
  );
}

export default ProgressBar;
