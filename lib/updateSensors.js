const readBme280 = require('./bme280');
let ds18b20 = require('ds18b20');
let { sensors } = require('../config');

module.exports = async (app) => {
 
    await Promise.all(sensors.map(async (sensorObj) => {
      let data;
      switch (sensorObj.type){
        case 'ds18b20':
          sensorObj.currentTemp = ds18b20.temperatureSync(sensorObj.id).toFixed(1);
          //sensorObj.timeStamp = new Date.now();
          break;
        case 'bme280':
          data = await readBme280(sensorObj.i2cAddress);
          //sensorObj[{ temperature_C: currentTemp, pressure_hPa: currentPressure }] =  await readBme280(sensorObj.i2cAddress);
          sensorObj.currentTemp = data.temperature_C.toFixed(1);
          sensorObj.currentPressure = data.pressure_hPa.toFixed(1);
          //sensorObj.timeStamp = new Date.now();
          break;
      }
    }));
    //console.log(sensors);
    
    app.locals.sensors = sensors;
    return sensors;
}
