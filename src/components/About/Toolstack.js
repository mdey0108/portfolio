import React from "react";
import { SiVisualstudiocode, SiPostman, SiWindows, SiLinux, SiNotepadplusplus, SiOracle } from "react-icons/si";

const tools = [
  { icon: <SiWindows />,         name: "Windows",    joke: "Home of blue screens 💙" },
  { icon: <SiVisualstudiocode />, name: "VS Code",   joke: "My actual home. 47 extensions strong 🏠" },
  { icon: <SiPostman />,         name: "Postman",    joke: "Sending requests to APIs that ghost me 📬" },
  { icon: <SiLinux />,           name: "Linux",      joke: "sudo make this work 🐧" },
  { icon: <SiNotepadplusplus />, name: "Notepad++",  joke: "The OG, the legend 📝" },
  { icon: <SiOracle />,          name: "Oracle DB",  joke: "Praying to query gods daily 🙏" },
];

function Toolstack() {
  return (
    <div className="skills-grid">
      {tools.map((tool, i) => (
        <div key={i} className="tech-icon-wrap" title={`${tool.name} — ${tool.joke}`}>
          <div className="tech-icons">{tool.icon}</div>
          <span className="tech-label">{tool.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Toolstack;
