import { useEffect, useState } from "react";

export default function ClockDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // actualiza cada minuto

    return () => clearInterval(interval); // limpieza
  }, []);

  const formatTime = (date) => {
    const hoursRaw = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hoursRaw >= 12 ? "pm" : "am";
    const hours = (((hoursRaw + 11) % 12) + 1).toString(); // convierte a formato 12h

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} ${ampm} - ${day}-${month}-${year}`;
  };

  return <p className="fw-bold">{formatTime(currentTime)}</p>;
}
