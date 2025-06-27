const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUrl = "mongodb://localhost:27017";
const dbName = "WaterManagement";  // Updated database name
const collectionName = "SensorReadings";  // Updated collection name
const automationRules = [];

let valveState = { valve1: "off", valve2: "off", valve3: "off", valve4: "off" };

async function connectDB() {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log("Connected to MongoDB");

    return client.db(dbName);
}

connectDB().then(db => {
    const sensorCollection = db.collection(collectionName);
    

    app.post("/automation_rules", async (req, res) => {
      try {
        const rules = req.body; // expect array
        const db = await connectDB();
        const col = db.collection("AutomationRules");
    
        await col.deleteMany({}); // Optional: clear old rules
        await col.insertMany(rules);
        res.send({ status: "Rules saved" });
      } catch (error) {
        res.status(500).send({ error: "Failed to save rules" });
      }
    });
    
    app.get("/automation_rules", async (req, res) => {
      try {
        const db = await connectDB();
        const col = db.collection("AutomationRules");
        const rules = await col.find().toArray();
        res.send(rules);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch rules" });
      }
    });
    

    // Store sensor data
    app.post("/sensor_data", async (req, res) => {
        try {
            const sensorData = {
                timestamp: new Date(),
                sensor1: req.body.sensor1,
                sensor2: req.body.sensor2,
                sensor3: req.body.sensor3
            };

            const result = await sensorCollection.insertOne(sensorData);
            res.status(200).send({ message: "Data saved", id: result.insertedId });
        } catch (error) {
            res.status(500).send({ error: "Error saving data" });
        }
    });

    app.get("/sensor_data", async (req, res) => {
      try {
          const data = await sensorCollection.find().sort({ timestamp: -1 }).toArray(); // Fetch all sensor readings
          res.status(200).send(data);
      } catch (error) {
          res.status(500).send({ error: "Error retrieving data" });
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
}).catch(error => console.error("MongoDB connection error:", error));
