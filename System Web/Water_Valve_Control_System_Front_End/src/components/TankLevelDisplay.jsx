import React from "react";
import SumpCircle from "./SumpCircle";

export default function TankLevelDisplay({ sensorData, valveState, onToggle }) {
  const tankLabels = ["Main Sump", "Tank A", "Tank B"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
      {tankLabels.map((label, index) => {
        const valveKey = `valve${index + 1}`;
        return (
          <SumpCircle
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
