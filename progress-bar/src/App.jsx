import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="progress-container">
      <button onClick={() => setIsRunning(true)} disabled={isRunning} className="start-button">
        Start Progress
      </button>
      <div className="slider-container">
        <input type="range" min="0" max="100" value={progress} readOnly className="slider square-slider" />
        <div className="slider-percentage" style={{ left: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default App;
