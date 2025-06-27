import React, { useEffect, useState } from "react";
import axios from "axios";
import ValveControlPanel from "../components/ValveControlPanel";
import TankLevelDisplay from "../components/TankLevelDisplay";
import WaterLevelChart from "../components/WaterLevelChart";
import "../styles/Dashboard.css"; // Assuming you have a CSS file for styling

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [valveState, setValveState] = useState({
    valve1: "off",
    valve2: "off",
    valve3: "off",
    valve4: "off",
  });

  useEffect(() => {
    const fetchAll = () => {
      axios.get("http://192.168.43.243:3000/sensor_data")
        .then(res => setSensorData(res.data))
        .catch(err => console.error("Error fetching sensor data:", err));

      axios.get("http://192.168.43.243:3000/control")
        .then(res => setValveState(res.data))
        .catch(err => console.error("Error fetching valve state:", err));
    };

    fetchAll();
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleValveToggle = (valveKey) => {
    const newState = valveState[valveKey] === "on" ? "off" : "on";
    const updatedState = { ...valveState, [valveKey]: newState };

    axios.post("http://192.168.43.243:3000/control", updatedState)
      .then(() => setValveState(updatedState))
      .catch(err => console.error("Error updating valve state:", err));
  };

  return (
    <div className="dashboard-container">
      <h1 className="dash_h1">Water Management Dashboard</h1>
      <div className="valve-panel">
         <ValveControlPanel valveState={valveState} onToggle={handleValveToggle} />
      </div>
     <div className="tank-level">
       <TankLevelDisplay
        sensorData={sensorData}
      />

     </div>
     <div className="water-level-chart">
      <WaterLevelChart />

     </div>
      
    </div>
  );
};

export default Dashboard;
