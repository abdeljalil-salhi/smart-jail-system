#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "3abdjlil";
const char* password = "fmfmfmfm";
const char* link = "http://172.20.10.7:8080/";

WiFiClient client;

void setup(void) {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop(void) {
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    Serial.print("I received: ");
    Serial.println(input);
    if (input == "1") {
      link = "http://172.20.10.7:8080/alarms/new/escape";
      HTTPClient http;
      http.begin(client, link);

      // Set headers and payload
      http.addHeader("Content-Type", "application/json");
      String payload = "{}";

      // Send the POST request
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println(response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    } else if (input == "5") {
      link = "http://172.20.10.7:8080/alarms/new/flame";
      HTTPClient http;
      http.begin(client, link);

      // Set headers and payload
      http.addHeader("Content-Type", "application/json");
      String payload = "{}";

      // Send the POST request
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println(response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    } else if (input == "3") {
      link = "http://172.20.10.7:8080/alarms/new/gas";
      HTTPClient http;
      http.begin(client, link);

      // Set headers and payload
      http.addHeader("Content-Type", "application/json");
      String payload = "{}";

      // Send the POST request
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println(response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    } else if (input == "6") {
      link = "http://172.20.10.7:8080/doors/close";
      HTTPClient http;
      http.begin(client, link);

      // Set headers and payload
      http.addHeader("Content-Type", "application/json");
      String payload = "{}";

      // Send the POST request
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println(response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    } else if (input == "7") {
      link = "http://172.20.10.7:8080/doors/open";
      HTTPClient http;
      http.begin(client, link);

      // Set headers and payload
      http.addHeader("Content-Type", "application/json");
      String payload = "{}";

      // Send the POST request
      int httpResponseCode = http.POST(payload);

      // Check for successful response
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String response = http.getString();
        Serial.println(response);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
  }
}