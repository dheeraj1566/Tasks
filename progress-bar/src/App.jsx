// import { useState, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [progressBars, setProgressBars] = useState([]);
//   const [queue, setQueue] = useState([]);

//   useEffect(() => {
//     // Jab ek progress bar complete ho jaye aur queue me kuch ho, to next progress bar start ho
//     if (progressBars.length < 5 && queue.length > 0) {
//       const nextProgress = queue[0];
//       setQueue((prevQueue) => prevQueue.slice(1)); // Queue se hatao
//       addProgress(nextProgress); // Next progress bar start karo
//     }
//   }, [progressBars, queue]);

//   const startProgress = () => {
//     const newProgress = { id: Date.now(), percentage: 0 };

//     if (progressBars.length < 5) {
//       addProgress(newProgress);
//     } else {
//       setQueue((prevQueue) => [...prevQueue, newProgress]); // Queue me add karo
//     }
//   };

//   const addProgress = (newProgress) => {
//     setProgressBars((prev) => [...prev, newProgress]);

//     let interval = setInterval(() => {
//       setProgressBars((prevBars) =>
//         prevBars.map((bar) =>
//           bar.id === newProgress.id
//             ? { ...bar, percentage: bar.percentage + 5 }
//             : bar
//         )
//       );
//     }, 250);

//     setTimeout(() => {
//       clearInterval(interval);
//       setProgressBars((prevBars) => prevBars.filter((bar) => bar.id !== newProgress.id));
//     }, 5000);
//   };

//   return (
//     <div className="container">
//       <button className="start-btn" onClick={startProgress}>Start Progress</button>
//       <div className="progress-container">
//         {progressBars.map((bar) => (
//           <div key={bar.id} className="progress-bar">
//             <div className="progress" style={{ width: `${bar.percentage}%` }}>
//               {bar.percentage}%
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [progressBars, setProgressBars] = useState([]);
  const [queue, setQueue] = useState([]);
  const [lastBarCompleted, setLastBarCompleted] = useState(false);

  useEffect(() => {
    if (lastBarCompleted && queue.length > 0) {
      setLastBarCompleted(false); // Reset last bar completion
      setProgressBars([]); // Purane progress bars hatao
      setTimeout(() => {
        const nextBatch = queue.slice(0, 5); // Agle 5 bars lo
        setQueue((prevQueue) => prevQueue.slice(5)); // Queue se remove karo
        nextBatch.forEach(addProgress); // Naya batch start karo
      }, 500); // Thoda delay tak empty rakhne ke liye
    }
  }, [lastBarCompleted, queue]);

  const startProgress = () => {
    const newProgress = { id: Date.now(), percentage: 0 };

    if (progressBars.length < 5) {
      addProgress(newProgress);
    } else {
      setQueue((prevQueue) => [...prevQueue, newProgress]); // Queue me store karo
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
      setProgressBars((prevBars) => {
        const updatedBars = prevBars.filter((bar) => bar.id !== newProgress.id);
        if (updatedBars.length === 0) setLastBarCompleted(true); // Last bar completed check
        return updatedBars;
      });
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
