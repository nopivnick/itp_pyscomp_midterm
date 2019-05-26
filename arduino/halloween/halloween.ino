/*
  Anna Oh and Noah Pivnick
  PhysComp 2301.003 (Tom Igoe)
  Halloween Midterm
  https://github.com/nopivnick/itp_team_halloween
*/

// Initialize pins
const int buttonPin = 7;    // The pin that reads the pushbutton
const int solenoidPin = 8;  // The pin that activates the solenoid

// Set initial button state
int lastButtonState = 0;

// Declare variable for the number of knocks
int knocks = 3;             // The number of knocks

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(solenoidPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read the state of the pushbutton value:
  int buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed:
  if (buttonState != lastButtonState) {
    delay(50);

    if (buttonState == HIGH) {
      Serial.write(buttonState);

      for (int i = 0; i < knocks; i++) {
        // Turn power to solenoid ON
        digitalWrite(solenoidPin, HIGH);
        // Serial.println("Solenoid is HIGH");
        delay(50);

        // Turn power to solenoid OFF
        digitalWrite(solenoidPin, LOW);
        // Serial.println("Solenoid is LOW");
        delay(750);
      }
    }

    if (buttonState == LOW) {
      Serial.write(buttonState);
    }
  }

  // save the current state as the last state, for next time through the loop
  lastButtonState = buttonState;
}

/*
      // Use this code to check solenoid is firing

      // Turn power to solenoid ON
      digitalWrite(solenoidPin, HIGH);
      Serial.println("Solenoid is HIGH");
      delay(200);

      // Turn power to solenoid OFF
      digitalWrite(solenoidPin, LOW);
      Serial.println("Solenoid is LOW");
      delay(100);
*/
