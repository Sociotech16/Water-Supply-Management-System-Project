import React from "react";
import "../styles/ValveControlPanel.css"; // Assuming you have a CSS file for styling
export default function ValveControlPanel({ valveState, onToggle }) {
  const valveNames = [
    { key: "valve1", label: "Feeder Valve to Tank A" },
    { key: "valve2", label: "Feeder Valve to Tank B" },
    { key: "valve3", label: "Outlet Valve for Tank A" },
    { key: "valve4", label: "Outlet Valve for Tank B" },
  ];

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Valve Control Panel</h2>
      <div className="valve-controls">
        {valveNames.map(({ key, label }) => (
          <div key={key} className="valve-control">
            <p>{label}</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={valveState[key] === "on"}
                onChange={() => onToggle(key)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
