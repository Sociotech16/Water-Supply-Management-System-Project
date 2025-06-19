#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Sociotech";
const char* password = "sociotech";
const char* sensorUrl = "http://192.168.43.243:3000/sensor_data";
const char* controlUrl = "http://192.168.43.243:3000/control";

WiFiClient client;
HTTPClient http;

void setup() {
  Serial.begin(115200);  // USB debug monitor
  Serial2.begin(115200, SERIAL_8N1, 16, 17);  // ESP32 TX → Mega RX, ESP32 RX → Mega TX

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  // 🔹 Receive sensor data from Arduino Mega
  if (Serial2.available()) {
    String jsonStr = Serial2.readStringUntil('\n');
    
    if (jsonStr.length() > 0) {
      Serial.println("Received from Arduino Mega: " + jsonStr);

      // 🔹 Send sensor data to MongoDB via Node.js server
      http.begin(client, sensorUrl);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(jsonStr);

      if (httpResponseCode > 0) {
        Serial.println("Sensor Data Sent Successfully!");
      } else {
        Serial.print("Error Sending Sensor Data: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
  } else {
    Serial.println("❌ No sensor data from Mega");
  }

  delay(2000);

  // 🔹 Fetch valve control commands from the Node.js server
  http.begin(client, controlUrl);
  int httpResponseCode = http.GET();
  
  if (httpResponseCode > 0) {
    String payload = http.getString();
    Serial2.println(payload);  // Forward control command to Arduino Mega
    Serial.println("Received Valve Command: " + payload);
  } else {
    Serial.println("❌ No data from server");
  }
  
  http.end();
  delay(5000);
}
