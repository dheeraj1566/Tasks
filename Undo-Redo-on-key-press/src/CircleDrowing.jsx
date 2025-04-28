import React, { useState, useEffect } from 'react';
import './circle.css';

const CircleDrawing = () => {
    const [circles, setCircles] = useState([]);
    const [undobtn, setUndobtn] = useState([]);
    const [redobtn, setRedobtn] = useState([]);

    const colors = ["red", "blue", "green", "black", "yellow", "pink", "orange", "purple", "brown", "lightgray"];

    function colorchange() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function handleClick(e) {
        if (e.target.tagName === "BUTTON") return;

        const x = e.clientX - e.target.offsetLeft - 12;
        const y = e.clientY - e.target.offsetTop - 10;

        const newCircle = {
            id: Date.now(),
            x,
            y,
            color: colorchange()
        };
        setCircles([...circles, newCircle]);
        setUndobtn([...undobtn, newCircle]);
        setRedobtn([]); 
    }

    function handleUndo() {
        if (undobtn.length > 0) {
            const lastCircle = undobtn[undobtn.length - 1]; 
            setRedobtn([lastCircle, ...redobtn]); 
            setCircles(circles.filter((circle) => circle.id !== lastCircle.id));
            setUndobtn(undobtn.slice(0, undobtn.length - 1)); 
        }
        console.log(undobtn)
    }

    function handleRedo() {
        if (redobtn.length > 0) {
            const lastRedo = redobtn[0]; 
            setCircles([...circles, lastRedo]); 
            setUndobtn([...undobtn, lastRedo]); 
            setRedobtn(redobtn.slice(1)); 
        }
        console.log(redobtn)
    }

    function handleKeyDown(e) {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            handleUndo();
        }
        if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            handleRedo();
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyDown);
        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [undobtn, redobtn, circles]);

    return (
        <div>
            <div
                id="circle"
                style={{ width: "100%", height: "100vh", position: "relative" }}
                onClick={handleClick}
            >
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        className="circle"
                        style={{
                            position: "absolute",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: circle.color,
                            left: `${circle.x}px`,
                            top: `${circle.y}px`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CircleDrawing;
