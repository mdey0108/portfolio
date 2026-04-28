import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { DiJavascript1, DiReact, DiNodejs, DiGit, DiJava } from "react-icons/di";
import { SiPython, SiSpringboot } from "react-icons/si";
import { CiDatabase } from "react-icons/ci";

const techs = [
  { icon: <CgCPlusPlus />,   name: "C/C++",       joke: "Where segfaults live 💀" },
  { icon: <DiJavascript1 />, name: "JavaScript",   joke: "undefined is not a function 🙃" },
  { icon: <DiJava />,        name: "Java",          joke: "400 lines to print 'Hello World' 📝" },
  { icon: <SiSpringboot />,  name: "Spring Boot",   joke: "Java but somehow bearable ☕" },
  { icon: <SiPython />,      name: "Python",        joke: "import antigravity 🐍" },
  { icon: <DiNodejs />,      name: "Node.js",       joke: "JS on the server? Sure why not 🟢" },
  { icon: <DiReact />,       name: "React",         joke: "re-renders, therefore I am ⚛️" },
  { icon: <CiDatabase />,    name: "SQL/DB",         joke: "SELECT * FROM sanity — 0 rows 🗄️" },
  { icon: <DiGit />,         name: "Git",            joke: "git blame (it's always me) 🔀" },
];

function Techstack() {
  return (
    <div className="skills-grid">
      {techs.map((tech, i) => (
        <div key={i} className="tech-icon-wrap" title={`${tech.name} — ${tech.joke}`}>
          <div className="tech-icons">{tech.icon}</div>
          <span className="tech-label">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
