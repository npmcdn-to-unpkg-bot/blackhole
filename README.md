# blackhole
compile:
  particle compile --target {firmware version number} electron {list of files to compile}
  
flash (note: device must be in udf mode):
  particle flash --sub {compiled binary}
  
Serial:
  particle monitor serial 
  
To put the device in UDF hold reset and mode for a few seconds, then lift your finger off of reset until the RGB LED is yellow. 
