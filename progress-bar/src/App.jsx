import { useState } from "react";
import "./App.css";

const App = () => {
  const [progressBars, setProgressBars] = useState([]);
  const [queue, setQueue] = useState([]); // Extra progress bars yahan store honge

  const startProgress = () => {
    const newProgress = { id: Date.now(), percentage: 0 };

    if (progressBars.length < 5) {
      addProgress(newProgress);
    } else {
      setQueue((prevQueue) => [...prevQueue, newProgress]);
    }
  };

  const addProgress = (newProgress) => {
    setProgressBars((prev) => [...prev, newProgress]);

    let interval = setInterval(() => {
      setProgressBars((prevBars) =>
        prevBars.map((bar) =>
          bar.id === newProgress.id
            ? { ...bar, percentage: bar.percentage + 5 }
            : bar
        )
      );
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setProgressBars((prevBars) => prevBars.filter((bar) => bar.id !== newProgress.id));

      if (queue.length > 0) {
        const nextProgress = queue[0];
        // setQueue((prevQueue) => prevQueue.slice(1)); 
        addProgress(nextProgress);
      }
    }, 5000);
  };

  return (
    <div className="container">
      <button className="start-btn" onClick={startProgress}>Start Progress</button>
      <div className="progress-container">
        {progressBars.map((bar) => (
          <div key={bar.id} className="progress-bar">
            <div className="progress" style={{ width: `${bar.percentage}%` }}>
              {bar.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
