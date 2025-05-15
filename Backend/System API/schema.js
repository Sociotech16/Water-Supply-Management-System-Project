// Connect to MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("WaterManagement");
        const collection = database.collection("SensorReadings");

        // Example data structure for sensor readings
        const sampleReading = {
            timestamp: new Date(),
            sensor1: 50, // Replace with actual value
            sensor2: 45, // Replace with actual value
            sensor3: 60  // Replace with actual value
        };

        // Insert a sample document
        const result = await collection.insertOne(sampleReading);
        console.log(`New document inserted with _id: ${result.insertedId}`);

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
