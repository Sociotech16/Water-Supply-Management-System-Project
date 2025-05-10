const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUrl = "mongodb://localhost:27017";
const dbName = "Water_Level_Data";

let valveState = { valve1: "off", valve2: "off", valve3: "off", valve4: "off" };

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const sensorCollection = db.collection("sensor_data");

    // Store sensor data
    app.post("/sensor_data", async (req, res) => {
      try {
        await sensorCollection.insertOne(req.body);
        res.status(200).send("Data saved");
      } catch (error) {
        res.status(500).send("Error saving data");
      }
    });

    // Handle valve control commands
    app.post("/control", (req, res) => {
      valveState = req.body; // Update valve states
      res.send({ status: "Valve updated", valves: valveState });
    });

    // ESP32 fetches valve state
    app.get("/control", (req, res) => {
      res.send(valveState);
    });

    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(error => console.error("MongoDB connection error:", error));
