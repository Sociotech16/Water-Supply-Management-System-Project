import React from "react";
import SumpCircle from "./SumpCircle";
import "./styles/TankLevelDisplay.css"; // Assuming you have a CSS file for styling

export default function TankLevelDisplay({ sensorData, valveState, onToggle }) {
  const tankLabels = ["Main Sump", "Tank A", "Tank B"];

  return (
    <div className="tank-level-display">
      { tankLabels.map((label, index) => {
        const valveKey = `valve${index + 1}`;
        return (
          <SumpCircle className="tank-circle"
            key={label}
            label={label}
            level={sensorData[index]?.level ?? 0}
            isOn={valveState[valveKey] === "on"}
            onToggle={() => onToggle(valveKey)}
          />
        );
      })}
    </div>
  );
}
