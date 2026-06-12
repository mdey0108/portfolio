import React, { Component } from "react";
import Portfolio from "./components/Portfolio";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
    console.error("Runtime Crash Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "40px",
          background: "#120a24",
          color: "#ff3b5c",
          fontFamily: "monospace",
          minHeight: "100vh",
          overflow: "auto"
        }}>
          <h1 style={{ color: "#00ff88" }}>⚛️ React Application Crashed</h1>
          <p style={{ color: "#fff", fontSize: "18px" }}>
            A runtime error occurred during rendering. Here are the details:
          </p>
          <div style={{
            background: "rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ff3b5c",
            marginBottom: "20px"
          }}>
            <strong style={{ fontSize: "16px" }}>Error:</strong> {this.state.error?.toString()}
          </div>
          <div style={{
            background: "rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #00d4ff",
            whiteSpace: "pre-wrap"
          }}>
            <strong>Component Stack:</strong>
            {this.state.errorInfo?.componentStack}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <GlobalErrorBoundary>
      <Portfolio />
    </GlobalErrorBoundary>
  );
}

export default App;
