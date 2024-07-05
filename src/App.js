import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [currentTime, setCurrentTime] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);
  const [startSession, setStartSession] = useState(false);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWNpcGllbnQiOiIrOTExMTAwMDAwMDExIiwiYm9keSI6IllvdXIgdmVyaWZpY2F0aW9uIGNvZGUgaXM6IDEyMzQ1Iiwic2VuZGVyIjoiKzkxMTEwMDAwMDAxMSIsImlhdCI6MTcyMDE5MDA0OCwiZXhwIjoxNzIwMTkwMTA4fQ.kUJoVFr9hIspF1gdEIKA-km1KctQvrBGJ-rRdBVqBvo";
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
    let timeInterval;
    let showAlert = true;
    if (startSession && currentTime) {
      interval = setInterval(() => {
        if (sessionTime < currentTime && showAlert === true) {
          showAlert = false;
          alert('Session Timed out');
        } else if (showAlert === false) {
          clearInterval(interval);
        }
      }, 2000);
      if (showAlert === true) {
        timeInterval = setInterval(() => {
          fetch("https://worldtimeapi.org/api/timezone/utc")
            .then((response) => response.json())
            .then((data) => {
              setCurrentTime(data.utc_datetime);
            })
            .catch((error) => {
              console.error("Error fetching time from the API:", error);
            });
        }, 20000);
      } else {
        clearInterval(timeInterval);
      }
    }
    () => {
      clearInterval(interval);
      clearInterval(timeInterval)
    };
  }, [startSession, currentTime]);

  return (
    <div>
      <h1>
        Decoded JWT Hello
      </h1>
    </div>
  );
}
