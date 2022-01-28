import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

import Background from "./images/background.jpg";
import TimerImage from "./images/timer_white.png";

export default function App() {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countNow = new Date();
    const countDownDate = new Date(
      countNow.getFullYear(),
      countNow.getMonth(),
      countNow.getDate() + 2
    ).getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div className="App">
      <div
        className="timer-container"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="timer">
          <header className="timer__header">
            <img className="timer__icon" alt="Small clock" src={TimerImage} />
            <h1>Countdown timer</h1>
            <h3>
              Countdown to a really special date. One you would never imagine
              unless you were told.
            </h3>
          </header>
          <div className="timer__body">
            <div>
              <p className="timer__date-time">{timerDays}</p>
              <p className="timer__date-time_small">
                <small>Days</small>
              </p>
            </div>
            <p className="timer__date-time">:</p>
            <div>
              <p className="timer__date-time">{timerHours}</p>

              <p className="timer__date-time_small">
                <small>Hours</small>
              </p>
            </div>
            <p className="timer__date-time">:</p>
            <div>
              <p className="timer__date-time">{timerMinutes}</p>

              <p className="timer__date-time_small">
                <small>Minutes</small>
              </p>
            </div>
            <p className="timer__date-time">:</p>
            <div>
              <p className="timer__date-time">{timerSeconds}</p>

              <p className="timer__date-time_small">
                <small>Seconds</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
