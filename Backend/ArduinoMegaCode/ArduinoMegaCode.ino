//#include <SoftwareSerial.h>

//SoftwareSerial espSerial(19, 18); // RX, TX

#define TRIG1 6
#define ECHO1 7
#define TRIG2 8
#define ECHO2 9
#define TRIG3 10
#define ECHO3 11

#define VALVE1 2
#define VALVE2 3
#define VALVE3 4
#define VALVE4 5

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
//  espSerial.begin(9600);

  // Initialize ultrasonic sensors
  pinMode(TRIG1, OUTPUT);
  pinMode(ECHO1, INPUT);
  pinMode(TRIG2, OUTPUT);
  pinMode(ECHO2, INPUT);
  pinMode(TRIG3, OUTPUT);
  pinMode(ECHO3, INPUT);

  // Initialize valve control pins
  pinMode(VALVE1, OUTPUT);
  pinMode(VALVE2, OUTPUT);
  pinMode(VALVE3, OUTPUT);
  pinMode(VALVE4, OUTPUT);
}

int measureWaterLevel(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  return duration / 58; // Convert to cm
}

void loop() {
  // Read ultrasonic sensor values
  int level1 = measureWaterLevel(TRIG1, ECHO1);
  int level2 = measureWaterLevel(TRIG2, ECHO2);
  int level3 = measureWaterLevel(TRIG3, ECHO3);

//  // Send sensor data to ESP32
//  espSerial.print("{\"sensor1\":");
//  espSerial.print(level1);
//  espSerial.print(",\"sensor2\":");
//  espSerial.print(level2);
//  espSerial.print(",\"sensor3\":");
//  espSerial.print(level3);
//  espSerial.println("}");

  // Send sensor data to ESP32
  Serial1.print("{\"sensor1\":");
  Serial1.print(level1);
  Serial1.print(",\"sensor2\":");
  Serial1.print(level2);
  Serial1.print(",\"sensor3\":");
  Serial1.print(level3);
  Serial1.println("}");

//  // Listen for valve control commands
//  if (espSerial.available()) {
//    String receivedData = espSerial.readStringUntil('\n');
//    if (receivedData.indexOf("\"valve1\":\"on\"") != -1) digitalWrite(VALVE1, HIGH);
//    if (receivedData.indexOf("\"valve1\":\"off\"") != -1) digitalWrite(VALVE1, LOW);
//    if (receivedData.indexOf("\"valve2\":\"on\"") != -1) digitalWrite(VALVE2, HIGH);
//    if (receivedData.indexOf("\"valve2\":\"off\"") != -1) digitalWrite(VALVE2, LOW);
//    if (receivedData.indexOf("\"valve3\":\"on\"") != -1) digitalWrite(VALVE3, HIGH);
//    if (receivedData.indexOf("\"valve3\":\"off\"") != -1) digitalWrite(VALVE3, LOW);
//    if (receivedData.indexOf("\"valve4\":\"on\"") != -1) digitalWrite(VALVE4, HIGH);
//    if (receivedData.indexOf("\"valve4\":\"off\"") != -1) digitalWrite(VALVE4, LOW);
//  }

  // Listen for valve control commands
  if (Serial1.available()) {
    String receivedData = Serial1.readStringUntil('\n');
    if (receivedData.indexOf("\"valve1\":\"on\"") != -1) digitalWrite(VALVE1, HIGH);
    if (receivedData.indexOf("\"valve1\":\"off\"") != -1) digitalWrite(VALVE1, LOW);
    if (receivedData.indexOf("\"valve2\":\"on\"") != -1) digitalWrite(VALVE2, HIGH);
    if (receivedData.indexOf("\"valve2\":\"off\"") != -1) digitalWrite(VALVE2, LOW);
    if (receivedData.indexOf("\"valve3\":\"on\"") != -1) digitalWrite(VALVE3, HIGH);
    if (receivedData.indexOf("\"valve3\":\"off\"") != -1) digitalWrite(VALVE3, LOW);
    if (receivedData.indexOf("\"valve4\":\"on\"") != -1) digitalWrite(VALVE4, HIGH);
    if (receivedData.indexOf("\"valve4\":\"off\"") != -1) digitalWrite(VALVE4, LOW);
  }
    else{
    Serial.print("no data from esp");
  }

  Serial.println(level1);
  Serial.println(level2);
  Serial.println(level3);

  delay(5000);
}
