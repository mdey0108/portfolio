import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Production Support Engineer",
          "Bug Creator & (Reluctant) Fixer 🐛",
          "Full Stack Dev_loafer 🛋️",
          "Corporate Mazdoor 👨‍💼",
          "Professional Meeting Survivor",
          "Google-Driven Developer 🔍",
          "Stack Overflow Copy-Paste Expert",
          "Friday 5PM Enthusiast 🎉",
          "Jira Ticket Philosopher 🧘",
          "404: Work-Life Balance Not Found",
          "git push --force && pray 🙏",
          "// TODO: write better code",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
      }}
    />
  );
}

export default Type;
