import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Portfolio from "./components/Portfolio";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div id={load ? "no-scroll" : "scroll"}>
        <Portfolio />
      </div>
    </>
  );
}

export default App;
