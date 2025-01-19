import React, { useState, useEffect } from "react";

export function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((m) => {
              if (m === 59) {
                setHours((h) => h + 1);
                return 0;
              }
              return m + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Reset timer
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* Timer Display */}
      <div className="p-6 bg-white shadow-lg rounded-lg border-2 border-green-500 w-80">
        <h1 className="text-center text-xl font-semibold mb-4">TIMER</h1>
        <div className="flex justify-around items-center text-2xl font-mono mb-4">
          <div className="text-center">
            <p className="mb-1">{String(hours).padStart(2, "0")}</p>
            <p className="text-sm">Hours</p>
          </div>
          <div className="text-center">
            <p className="mb-1">{String(minutes).padStart(2, "0")}</p>
            <p className="text-sm">Minutes</p>
          </div>
          <div className="text-center">
            <p className="mb-1">{String(seconds).padStart(2, "0")}</p>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
        <div className="flex justify-around">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            onClick={() => setIsRunning(true)}
          >

            START
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
            onClick={() => setIsRunning(false)}
          >
            PAUSE
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            onClick={resetTimer}
          >
            RESET
          </button>
        </div>

        
      </div>
    </div>
  );
}
