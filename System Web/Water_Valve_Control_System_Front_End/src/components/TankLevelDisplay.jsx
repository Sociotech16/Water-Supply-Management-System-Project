import React, { useEffect, useState } from "react";
import SumpCircle from "./SumpCircle";
import axios from "axios";
import "./styles/TankLevelDisplay.css";

export default function TankLevelDisplay({ valveState, onToggle }) {
  const [sensorData, setSensorData] = useState([
    { level: 0 },
    { level: 0 },
    { level: 0 },
  ]);

  const tankLabels = ["Main Sump", "Tank A", "Tank B"];

  useEffect(() => {
    async function fetchSensorData() {
      try {
        const res = await axios.get("http://localhost:3000/sensor_data");
        if (res.data.length > 0) {
          const latest = res.data[0];
          setSensorData([
            { level: latest.sensor1 },
            { level: latest.sensor2 },
            { level: latest.sensor3 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    }

    fetchSensorData();

    //Poll every 5 seconds for updates
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tank-level-display">
      {tankLabels.map((label, index) => {
        const valveKey = `valve${index + 1}`;
        return (
          <SumpCircle
            className="tank-circle"
            key={label}
            label={label}
            level={sensorData[index]?.level ?? 0}
          />
        );
      })}
    </div>
  );
}
