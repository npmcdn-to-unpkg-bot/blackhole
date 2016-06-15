#include "application.h"

void setup(){
	Serial.begin(9600);
	Serial1.begin(9600);
}

void loop(){
	char x = Serial1.read();
	Serial.println(int(x));
}
