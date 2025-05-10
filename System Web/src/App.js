import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [valveState, setValveState] = useState({
    valve1: "off",
    valve2: "off",
    valve3: "off",
    valve4: "off"
  });

  useEffect(() => {
    axios.get("http://192.168.43.243:3000/sensor_data")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
    
    axios.get("http://192.168.43.243:3000/control")
      .then(response => setValveState(response.data))
      .catch(error => console.error("Error fetching valve state:", error));
  }, []);

  const toggleValve = (valve, state) => {
    axios.post("http://192.168.43.243:3000/control", { ...valveState, [valve]: state })
      .then(() => setValveState(prev => ({ ...prev, [valve]: state })))
      .catch(error => console.error("Error updating valve:", error));
  };

  return (
    <div>
      <h1>Water Level Monitoring</h1>
      {data.map((entry, index) => <p key={index}>{JSON.stringify(entry)}</p>)}
      
      <h2>Valve Control</h2>
      {Object.keys(valveState).map(valve => (
        <button key={valve} onClick={() => toggleValve(valve, valveState[valve] === "on" ? "off" : "on")}>
          Toggle {valve} ({valveState[valve]})
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
