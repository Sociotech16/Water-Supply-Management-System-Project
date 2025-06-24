import React, { useEffect, useState } from "react";
import axios from "axios";
import ValveControlPanel from "../components/ValveControlPanel";
import TankLevelDisplay from "../components/TankLevelDisplay";
import WaterLevelChart from "../components/WaterLevelChart";

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
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Water Management Dashboard</h1>

      <ValveControlPanel valveState={valveState} onToggle={handleValveToggle} />

      <TankLevelDisplay
        sensorData={sensorData}
        valveState={valveState}
        onToggle={handleValveToggle}
      />

      <WaterLevelChart />
    </div>
  );
};

export default Dashboard;
