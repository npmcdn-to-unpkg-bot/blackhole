/***************************************************************************
  Adafruit invests time and resources providing this open source code,
  please support Adafruit andopen-source hardware by purchasing products
  from Adafruit!

  Written by Limor Fried & Kevin Townsend for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ***************************************************************************/

#define DEBUG_OUTPUT 

#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#include "TinyGPS.h"

#define BME_SCK D4
#define BME_MISO D3
#define BME_MOSI D2
#define BME_CS D5

#define SEALEVELPRESSURE_HPA (1013.25)

#define WIRE Wire

#include "Adafruit_Sensor.h"
#include "Adafruit_BNO055.h"
#include "imumaths.h"

Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);
Adafruit_BNO055 bno = Adafruit_BNO055(55);

TinyGPS gps;
char dataStr[64];
int sleep = 1000;
float lat, lon;
unsigned long age;

void setup() {
    Serial.begin(9600);
    Serial1.begin(9600);
    if (!bme.begin()) 
    {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
    }
    /* Initialise the sensor */
    if(!bno.begin())
    {
        Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    }
    delay(1000);
    bno.setExtCrystalUse(true);
}


void loop(void)
{
    /* Get a new sensor event */
    sensors_event_t event;
    bno.getEvent(&event);

    sprintf(dataStr, "{\"x\":\"%.7f\",\"y\":\"%.7f\",\"z\":\"%.7f\"}",  event.orientation.x,  event.orientation.y,  event.orientation.z);

    #if defined DEBUG_OUTPUT
        Serial.println( dataStr );
    #else
        Particle.publish("imu", dataStr);
    #endif

    sprintf(dataStr, "{\"temp\":\"%.7f\",\"pres\":\"%.7f\",\"alti\":\"%.7f\",\"humd\":\"%.7f\"}",  bme.readTemperature(), (bme.readPressure() / 100.0), bme.readAltitude(SEALEVELPRESSURE_HPA), bme.readHumidity() );

    #if defined DEBUG_OUTPUT
        Serial.println(dataStr);
    #else
        Particle.publish("imu", dataStr);
    #endif

    /** gps loop **/
    bool isValidGPS = false;

    for (unsigned long start = millis(); millis() - start < 1000;){
        // Check GPS data is available
        while (Serial1.available()){
            char c = Serial1.read();
            // parse GPS data
            if (gps.encode(c)){
                isValidGPS = true;
            }
        }
    }

    // If we have a valid GPS location then publish it
    if (isValidGPS)
    {
        gps.f_get_position(&lat, &lon, &age);
        sprintf(dataStr, "%.6f,%.6f", (lat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : lat), (lon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : lon));
        #if defined DEBUG_OUTPUT
            Serial.println(dataStr);
        #else
            Particle.publish("gps", dataStr);
        #endif
    }

    delay(sleep);
}
