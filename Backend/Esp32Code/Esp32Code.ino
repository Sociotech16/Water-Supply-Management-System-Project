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
  //Serial.begin(115200);

  Serial.begin(9600);  // USB debug monitor
  Serial2.begin(9600, SERIAL_8N1, 16, 17);  // RX=16, TX=17

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
//   // Receive sensor data from Arduino Mega
//   if (Serial.available()) {
//     String jsonStr = Serial.readStringUntil('\n');

//     // Send sensor data to MongoDB via Node.js server
//     http.begin(client, sensorUrl);
//     http.addHeader("Content-Type", "application/json");
//     http.POST(jsonStr);
//     http.end();
//   }

  // Receive sensor data from Arduino Mega
  if (Serial2.available()) {
    String jsonStr = Serial.readStringUntil('\n');

    // Send sensor data to MongoDB via Node.js server
    http.begin(client, sensorUrl);
    http.addHeader("Content-Type", "application/json");
    http.POST(jsonStr);
    http.end();
  }
   else{
    Serial.print("no data from mega");
  }

  // // Fetch valve control commands from the React app
  // http.begin(client, controlUrl);
  // int httpResponseCode = http.GET();
  // if (httpResponseCode > 0) {
  //   String payload = http.getString();
  //   Serial.println(payload);  // Forward control command to Arduino Mega
  // }
  // http.end();


  
  // Fetch valve control commands from the React app
  http.begin(client, controlUrl);
  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    String payload = http.getString();
    Serial2.println(payload);  // Forward control command to Arduino Mega
  }
  else{
    Serial.print("no data from server");
  }
  http.end();


  delay(5000);
}
