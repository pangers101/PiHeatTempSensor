const BME280 = require('bme280-sensor');

// The BME280 constructor options are optional.
// 
module.exports = function(address){
  const options = {
    i2cBusNo: 1, // defaults to 1
    i2cAddress: address || BME280.BME280_DEFAULT_I2C_ADDRESS() //default is 0x77
  };

  const bme280 = new BME280(options);
  return initAndRead;
}

function initAndRead(){
  bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded');
    readSensor();
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));

}

function readSensor(){
  bme280.readSensorData()
    .then((data) => {
      
      data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
      data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);

      console.log(`data = ${JSON.stringify(data, null, 2)}`);
      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
}