import "./styles.css";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [currentTime, setCurrentTime] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);
  const [startSession, setStartSession] = useState(false);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwcm9rcmF5YSIsInN1YiI6InN1cHBsaWVydXNlcjhAZ21haWwuY29tfnFhLnByb2tyYXlhLmNvbSIsImF1ZCI6IndlYiIsImlhdCI6MTcyMDA2NjIxOSwiZXhwIjoxNzIwMDc1MjE5fQ.z81ynk27ff9OA_XhoR2WB9CeOhFiP73GBPxfe8rWNAjb9qy2EycOVk_y7bgfIRLjVYjjQCVg4lm1x936I06n9Q";
    const decoded = jwtDecode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    fetch("https://worldtimeapi.org/api/timezone/utc")
      .then((response) => response.json())
      .then((data) => {
        setCurrentTime(data.utc_datetime);
      })
      .catch((error) => {
        console.error("Error fetching time from the API:", error);
      });
    setSessionTime(expirationDate.toISOString());
    setStartSession(true);
  }, []);

  useEffect(() => {
    let interval;
    if (startSession) {
      interval = setInterval(() => {
        if (sessionTime <= currentTime) {
          console.log("hello");
        }
      }, 2000);
    }
    () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>
        Decoded JWT Hello
      </h1>
    </div>
  );
}
