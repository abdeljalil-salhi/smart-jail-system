#include <Servo.h>

#define DEBUG_MODE 0

#define LIGHT_LEVEL 150
#define VIBRATION_LEVEL 700
#define GAS_LEVEL 300

Servo servo;

int PHOTOSYNTHESIS_PIN = A0;
int GASDETECTOR_PIN = A1;
int VIBRATION_PIN = A2;
int SERVO_PIN = 5;
int FLAMEDETECTOR_PIN = 6;
int LED_PIN = 7;
int BUZZER_PIN = 9;

bool ledActivated = false;
bool buzzerActivated = false;
bool isNight = false;
int vibrationsDetected = 0;

void setup(void)
{
  Serial.begin(115200);

  pinMode(PHOTOSYNTHESIS_PIN, INPUT);
  pinMode(GASDETECTOR_PIN, INPUT);
  pinMode(VIBRATION_PIN, INPUT);
  pinMode(FLAMEDETECTOR_PIN, INPUT);

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  isNight = (analogRead(PHOTOSYNTHESIS_PIN) < LIGHT_LEVEL);
}

void loop(void)
{
  int photosynthesis = analogRead(PHOTOSYNTHESIS_PIN);
  int gas = analogRead(GASDETECTOR_PIN);
  int vibration = analogRead(VIBRATION_PIN);
  int flame = digitalRead(FLAMEDETECTOR_PIN);

  if (DEBUG_MODE) {
    Serial.println("photosynthesis: " + String(photosynthesis));
    Serial.println("gas: " + String(gas));
    Serial.println("vibration: " + String(vibration));
    Serial.println("flame: " + String(flame));
    delay(1000);
  }

  /* ******************* START SYSTEM ******************** */
  bool normalState = (vibration < VIBRATION_LEVEL && flame == 1 && gas < GAS_LEVEL);
  if (!normalState) {
    if (vibration > VIBRATION_LEVEL) {
      vibrationsDetected++;
      if (vibrationsDetected == 4) {
        Serial.print("1");
        Serial.print("\n");
        digitalWrite(LED_PIN, HIGH), ledActivated = true;
        vibrationsDetected = 0;
      }
    }
    if (flame == 0) {
      Serial.print("5");
      Serial.print("\n");
    }
    if (gas > GAS_LEVEL) {
      Serial.print("3");
      Serial.print("\n");
    }
    delay(1000);
  }

  if (photosynthesis > LIGHT_LEVEL && isNight)
    digitalWrite(BUZZER_PIN, HIGH), buzzerActivated = true;
  else if (photosynthesis < LIGHT_LEVEL && !isNight) {
    isNight = true;
    Serial.print("6");
    Serial.print("\n");
  }
  /* ******************* SLEEP SYSTEM ******************** */
  if (buzzerActivated || ledActivated)
    delay(500);

  /* ******************** END SYSTEM ********************* */
  if (buzzerActivated) {
    digitalWrite(BUZZER_PIN, LOW), isNight = false;
    Serial.print("7");
    Serial.print("\n");
  }
  if (ledActivated)
    digitalWrite(LED_PIN, LOW);

  /* ***************************************************** */
  ledActivated = false, buzzerActivated = false;
}
