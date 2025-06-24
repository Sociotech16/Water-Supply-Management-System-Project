import React from "react";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {valveNames.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
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
