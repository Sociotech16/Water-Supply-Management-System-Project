import React, { useState } from "react";
import axios from "axios";
import "../styles/Automation.css";

export default function Automation() {
  const [rules, setRules] = useState([
    { valve: "valve1", trigger: "time", value: "", action: "on" }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { valve: "valve1", trigger: "time", value: "", action: "on" }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/automation_rules", rules);
      alert("Automation rules saved!");
    } catch (err) {
      console.error("Failed to save rules", err);
    }
  };

  return (
    <div className="automation-page">
      <h2>Valve Automation Rules</h2>
      {rules.map((rule, i) => (
        <div key={i} className="automation-form">
          <select value={rule.valve} onChange={e => handleChange(i, "valve", e.target.value)}>
            <option value="valve1">Valve 1</option>
            <option value="valve2">Valve 2</option>
            <option value="valve3">Valve 3</option>
            <option value="valve4">Valve 4</option>
          </select>

          <select value={rule.trigger} onChange={e => handleChange(i, "trigger", e.target.value)}>
            <option value="time">Time-based</option>
            <option value="level">Level-based</option>
          </select>

          {rule.trigger === "time" ? (
            <input
              type="number"
              placeholder="Time (minutes)"
              value={rule.value}
              onChange={e => handleChange(i, "value", e.target.value)}
            />
          ) : (
            <input
              type="number"
              placeholder="Level % (e.g. <30)"
              value={rule.value}
              onChange={e => handleChange(i, "value", e.target.value)}
            />
          )}

          <select value={rule.action} onChange={e => handleChange(i, "action", e.target.value)}>
            <option value="on">Open</option>
            <option value="off">Close</option>
          </select>
        </div>
      ))}

      <button onClick={addRule}>+ Add Rule</button>
      <button onClick={handleSubmit}>Save Rules</button>
    </div>
  );
}
