#include <ESP8266WiFi.h>
#include <Adafruit_NeoPixel.h>
#define PIN 12

const char* ssid = "";
const char* password = "";
const char* host = "";
const int port = 8080;  // port for the socket connection

WiFiClient socket;      // variable for the socket connection

int red;
int green;
int blue;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(5, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  //  Serial.begin(9600);
  //  Serial.setTimeout(10);
  
  pinMode(0, OUTPUT);
  socket.setTimeout(10);

  strip.begin();

  WiFi.begin(ssid, password);
  // wait for connection to network access point:
  while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    //blink pin 0 while connecting to wifi
    digitalWrite(0, HIGH);
    delay(200);
    digitalWrite(0, LOW);
  }
  // when connected to access point, acknowledge it:
  digitalWrite(0, LOW);

  if (socket.connected()) {   // if the socket's connected, disconnect
  } else {                    // if the socket's not connected,
    login();                  // login to the server
  }

}

boolean login() {
  socket.connect(host, port);   // attempt to connect

  while (!socket.connected()) { // While not connected, try again
    delay(1000);
    if (socket.connected()) {   // if you connected,
      socket.println("hello");  // say hello to the server
    } else {
      // if not connected, try again:
      //Serial.println("connection failed, trying again");
      socket.connect(host, port);
    }
  }
}

void loop() {
  for (int i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, strip.Color(red, green, blue));
    strip.show();
  }

  // Read the reply from server and print them to serial port:
  while (socket.available()) {
    //Serial.print("Got something");
    String input = socket.readString();
    //Serial.println(input);
    int commaIndex = input.indexOf(',');
    int secondCommaIndex = input.indexOf(',', commaIndex + 1);
    String redValue = input.substring(0, commaIndex);
    String greenValue = input.substring(commaIndex + 1, secondCommaIndex);
    String blueValue = input.substring( secondCommaIndex + 1);
    red = redValue.toInt();
    green = greenValue.toInt();
    blue = blueValue.toInt();
    strip.setPixelColor(0, strip.Color(red, green, blue));
    strip.show();
  }
}


