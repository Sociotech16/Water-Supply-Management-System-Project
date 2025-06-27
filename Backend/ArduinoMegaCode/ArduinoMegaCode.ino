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

#define SOUND_SPEED 0.034

long duration;
float distanceCm;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);

  // Initialize ultrasonic sensors
  pinMode(TRIG1, OUTPUT); pinMode(ECHO1, INPUT);
  pinMode(TRIG2, OUTPUT); pinMode(ECHO2, INPUT);
  pinMode(TRIG3, OUTPUT); pinMode(ECHO3, INPUT);

  // Initialize valve control pins
  pinMode(VALVE1, OUTPUT);
  pinMode(VALVE2, OUTPUT);
  pinMode(VALVE3, OUTPUT);
  pinMode(VALVE4, OUTPUT);

  // Ensure trigger pin starts LOW
  digitalWrite(TRIG1, LOW);
  digitalWrite(TRIG2, LOW);
  digitalWrite(TRIG3, LOW);
  delay(50);  // Allow sensors to settle
}

float measureWaterLevel(int TRIG_PIN, int ECHO_PIN) {
  long duration;
  float distanceCm;

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distanceCm = (duration / 2.0) / 29.1;

  return distanceCm;
}

// Map distance to water level percentage
int calculatePercentage(float distanceCm) {
  if (distanceCm <= 3) return 100;
  else if (distanceCm >= 15) return 0;
  else return int((15 - distanceCm) / (15 - 3) * 100);
}

void loop() {
  // Measure distances
  float d1 = measureWaterLevel(TRIG1, ECHO1);
  float d2 = measureWaterLevel(TRIG2, ECHO2);
  float d3 = measureWaterLevel(TRIG3, ECHO3);

  // Convert to percentage
  int level1 = calculatePercentage(d1);
  int level2 = calculatePercentage(d2);
  int level3 = calculatePercentage(d3);

  // Send sensor data to ESP32
  Serial1.print("{\"sensor1\":");
  Serial1.print(level1);
  Serial1.print(",\"sensor2\":");
  Serial1.print(level2);
  Serial1.print(",\"sensor3\":");
  Serial1.print(level3);
  Serial1.println("}");

  // Display on Serial Monitor
  Serial.print("Water Levels Sent -> Sensor 1: ");
  Serial.print(level1); Serial.print("%, Sensor 2: ");
  Serial.print(level2); Serial.print("%, Sensor 3: ");
  Serial.print(level3); Serial.println("%");

  // Handle incoming valve commands from ESP32
  if (Serial1.available()) {
    String receivedData = Serial1.readStringUntil('\n');
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
