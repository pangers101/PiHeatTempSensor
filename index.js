const readBme280 = require('./bme280');
let ds18b20 = require('ds18b20');

let sensors = [
  {
    id: '28-0517c1fe23ff', 
    label: 'Outside',
    type: 'ds18b20'
  }, 
  {
    id: '28-05179039bfff', 
    label: 'Lounge',
    type: 'ds18b20'
  },
  {
    type: 'bme280',
    i2cAddress: 0x76,
    pressure: true,
    temperature: false 
  }
];

sensors.forEach(async (sensorObj) => {
  switch (sensorObj.type){
    case 'ds18b20':
      sensorObj.currentTemp = ds18b20.temperatureSync(sensorObj.id);
      break;
    case 'bme280':
      sensorObj.data = await readBme280(sensorObj.i2cAddress)();
      break;
  }
});

console.log(sensors);




const BME280 = require('bme280-sensor');

// The BME280 constructor options are optional.
// 
const options = {
  i2cBusNo   : 1, // defaults to 1
 // i2cAddress : BME280.BME280_DEFAULT_I2C_ADDRESS() // defaults to 0x77
  i2cAddress: 0x76
};

const bme280 = new BME280(options);

// Read BME280 sensor data, repeat
//
const readSensorData = () => {
  bme280.readSensorData()
    .then((data) => {
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // I'll also calculate some unit conversions for display purposes.
      //
      data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
      data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
 
      console.log(`data = ${JSON.stringify(data, null, 2)}`);
      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
};

// Initialize the BME280 sensor
//
bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded');
    readSensorData();
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));

