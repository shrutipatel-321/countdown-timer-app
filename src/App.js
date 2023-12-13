// App.js

import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import './App.css';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let countdown;

    if (isActive && !isPaused) {
      countdown = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isActive, isPaused, hours, minutes, seconds]);

  const handleInputChange = (e) => {
    const newHours = Math.floor(parseInt(e.target.value, 10) / 60);
    const newMinutes = parseInt(e.target.value, 10) % 60;

    setHours(isNaN(newHours) ? 0 : newHours);
    setMinutes(isNaN(newMinutes) ? 0 : newMinutes);
    setSeconds(0);
    setIsPaused(false);

    if (!isActive) {
      setIsActive(true);
    }
  };
//
  return (
    <div className="App">
      <label htmlFor="">Enter Minutes:</label>
      <input
        type="number"
        id="minutes"
        min="0"
        value={hours * 60 + minutes}
        onChange={handleInputChange}
      />
      <button onClick={() => setIsPaused(!isPaused)} disabled={!isActive}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </button>

      <div id="timer">{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</div>
    </div>
  );
}

export default App;
