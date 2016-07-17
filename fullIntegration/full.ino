#include "application.h"
#include "Adafruit_Sensor.h"
#include "Adafruit_BNO055.h"
#include "Adafruit_BME280.h"
#include "TinyGPS.h"
#include "imumaths.h"

#define BME_SCK D4
#define BME_MISO D3
#define BME_MOSI D2
#define BME_CS D5

/* This driver reads raw data from the BNO055

   Connections
   ===========
   Connect SCL to analog 5
   Connect SDA to analog 4
   Connect VDD to 3.3V DC
   Connect GROUND to common ground

   History
   =======
   2015/MAR/03  - First release (KTOWN)
*/

/* Set the delay between fresh samples */
#define BNO055_SAMPLERATE_DELAY_MS (100)

Adafruit_BNO055 bno = Adafruit_BNO055();

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);

TinyGPS gps;
char szInfo[64];

/**************************************************************************/
/*
    Arduino setup function (automatically called at startup)
*/
/**************************************************************************/
void setup(void)
{
  Serial.begin(9600);
  Serial1.begin(9600);

  Serial.println("Orientation Sensor Raw Data Test"); Serial.println("");

  /* Initialise the sensor */
  while(!bno.begin())
  {
    /* There was a problem detecting the BNO055 ... check your connections */
    Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
  }

  while (!bme.begin()) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
  }

  delay(1000);

  /* Display the current temperature */
  int8_t temp = bno.getTemp();
  Serial.print("Current Temperature: ");
  Serial.print(temp);
  Serial.println(" C");
  Serial.println("");

  bno.setExtCrystalUse(true);

  Serial.println("Calibration status values: 0=uncalibrated, 3=fully calibrated");
}

/**************************************************************************/
/*
    Arduino loop function, called once 'setup' is complete (your own code
    should go here)
*/
/**************************************************************************/
void loop(void)
{
//bno055 IMU
  // Possible vector values can be:
  // - VECTOR_ACCELEROMETER - m/s^2
  // - VECTOR_MAGNETOMETER  - uT
  // - VECTOR_GYROSCOPE     - rad/s
  // - VECTOR_EULER         - degrees
  // - VECTOR_LINEARACCEL   - m/s^2
  // - VECTOR_GRAVITY       - m/s^2
  imu::Vector<3> euler = bno.getVector(Adafruit_BNO055::VECTOR_EULER);

  /* Display the floating point data */
  Serial.print("X:");
  Serial.print(euler.x());
  Serial.print(" Y:");
  Serial.print(euler.y());
  Serial.print(" Z:");
  Serial.print(euler.z());
  Serial.print(" ");

// pressure temp bme280
  Serial.print("temp:");
  Serial.print(bme.readTemperature());
  Serial.print(":*C ");

  Serial.print("pres:");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.print(":hPa ");

  Serial.print("alti:");
  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.print(":m ");

  Serial.print("humd:");
  Serial.print(bme.readHumidity());
  Serial.print(":% ");

// gps
    bool isValidGPS = false;
    
    for (unsigned long start = millis(); millis() - start < 1000;){
        // Check GPS data is available
        while (Serial1.available()){
            char c = Serial1.read();
            
            // parse GPS data
            if (gps.encode(c))
                isValidGPS = true;
        }
    }

    // If we have a valid GPS location then publish it
    if (isValidGPS){
        float lat, lon;
        unsigned long age;
    
        gps.f_get_position(&lat, &lon, &age);
        
        sprintf(szInfo, "lat:%.6f lon:%.6f", (lat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : lat), (lon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : lon));
	Serial.print(szInfo);
    } else {
        // Not a vlid GPS location, jsut pass 0.0,0.0
        // This is not correct because 0.0,0.0 is a valid GPS location, we have to pass a invalid GPS location
        // and check it at the client side
        sprintf(szInfo, "0.0,0.0");
	Serial.print(szInfo);
    }
  Serial.println();
  delay(1000);
}
