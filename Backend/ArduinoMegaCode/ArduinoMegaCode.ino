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

long duration;
float distanceCm;
#define SOUND_SPEED 0.034

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

   // Ensure trigger pin starts LOW
  digitalWrite(TRIG1, LOW);
  digitalWrite(TRIG2, LOW);
  digitalWrite(TRIG3, LOW);
  delay(50);  // Give sensor time to settle
}

float measureWaterLevel(int TRIG_PIN, int ECHO_PIN) {
  long duration;
  float distanceCm;
  float distanceIn;

  // 1) Send a 10µs HIGH pulse to the trigger pin
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2) Read the time (in microseconds) for the echo to return
  // pulseIn() returns the length of the pulse in µs. We measure the time
  // from sending the ping until the echo is received.
  duration = pulseIn(ECHO_PIN, HIGH);

  // 3) Calculate distance:
  //   Sound speed in air ≈ 343 m/s → 29.1 µs per centimeter round-trip
  //   distance (cm) = (duration in µs) / 2 / 29.1
  distanceCm = (duration / 2.0) / 29.1;

  // 4) (Optional) Convert to inches: 1 inch ≈ 2.54 cm
  distanceIn = distanceCm / 2.54;
  return float(distanceCm);
}



// float measureWaterLevel(int trigPin, int echoPin){
//   digitalWrite(trigPin, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(trigPin, LOW);
 
//   duration = pulseIn(echoPin, HIGH);
  
//   distanceCm = duration * SOUND_SPEED/2;
//   return float(distanceCm);
// }


// int measureWaterLevel(int trigPin, int echoPin) {
//   digitalWrite(trigPin, LOW);
//   delayMicroseconds(2);
//   digitalWrite(trigPin, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(trigPin, LOW);

//   long duration = pulseIn(echoPin, HIGH);
//   return duration / 58; // Convert to cm
// }

// void loop() {
//   // Read ultrasonic sensor values
//   int level1 = measureWaterLevel(TRIG1, ECHO1);
//   int level2 = measureWaterLevel(TRIG2, ECHO2);
//   int level3 = measureWaterLevel(TRIG3, ECHO3);


void loop() {
  // Read ultrasonic sensor values
  int level1 = measureWaterLevel(TRIG1, ECHO1);
  int level2 = measureWaterLevel(TRIG2, ECHO2);
  int level3 = measureWaterLevel(TRIG3, ECHO3);

  // Send sensor data to ESP32
  Serial1.print("{\"sensor1\":");
  Serial1.print(level1);
  Serial1.print(",\"sensor2\":");
  Serial1.print(level2);
  Serial1.print(",\"sensor3\":");
  Serial1.print(level3);
  Serial1.println("}");

  // Display the sent sensor data on Serial Monitor
  Serial.print("Water Levels Sent -> Sensor 1: ");
  Serial.print(level1);
  Serial.print(", Sensor 2: ");
  Serial.print(level2);
  Serial.print(", Sensor 3: ");
  Serial.println(level3);

  // Listen for valve control commands from ESP32 and display on Serial Monitor
  if (Serial1.available()) {
    String receivedData = Serial1.readStringUntil('\n');
    
    // Print received data to Serial Monitor
    Serial.print("Received from ESP32: ");
    Serial.println(receivedData);

    if (receivedData.indexOf("\"valve1\":\"on\"") != -1) digitalWrite(VALVE1, HIGH);
    if (receivedData.indexOf("\"valve1\":\"off\"") != -1) digitalWrite(VALVE1, LOW);
    if (receivedData.indexOf("\"valve2\":\"on\"") != -1) digitalWrite(VALVE2, HIGH);
    if (receivedData.indexOf("\"valve2\":\"off\"") != -1) digitalWrite(VALVE2, LOW);
    if (receivedData.indexOf("\"valve3\":\"on\"") != -1) digitalWrite(VALVE3, HIGH);
    if (receivedData.indexOf("\"valve3\":\"off\"") != -1) digitalWrite(VALVE3, LOW);
    if (receivedData.indexOf("\"valve4\":\"on\"") != -1) digitalWrite(VALVE4, HIGH);
    if (receivedData.indexOf("\"valve4\":\"off\"") != -1) digitalWrite(VALVE4, LOW);
  } else {
    Serial.println("No data received from ESP32");
  }

  delay(5000);
}
