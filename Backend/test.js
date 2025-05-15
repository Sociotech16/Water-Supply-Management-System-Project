const axios = require("axios");

// Test Sensor Data Endpoint
axios.post("http://192.168.43.243:3000/sensor_data", { sensor1: 50, sensor2: 45, sensor3: 60 })
  .then(res => console.log(res.data))
  .catch(err => console.error("Error:", err));

// Test Valve Control
axios.post("http://192.168.43.243:3000/control", { valve1: "on", valve2: "off", valve3: "on", valve4: "off" })
  .then(res => console.log(res.data))
  .catch(err => console.error("Error:", err));

// Fetch Sensor Data
axios.get("http://192.168.43.243:3000/sensor_data")
  .then(res => console.log(res.data))
  .catch(err => console.error("Error:", err));

// Fetch Valve States
axios.get("http://192.168.43.243:3000/control")
  .then(res => console.log(res.data))
  .catch(err => console.error("Error:", err));
