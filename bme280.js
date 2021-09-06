const BME280 = require('bme280-sensor');

// The BME280 constructor options are optional.
// 
module.exports = async function(address){
  const options = {
    i2cBusNo: 1, // defaults to 1
    i2cAddress: address || BME280.BME280_DEFAULT_I2C_ADDRESS() //default is 0x77
  };

  const bme280 = new BME280(options);

  try{
    await bme280.init();
    console.log('BME280 initialization succeeded');
    readSensor(bme280);
  }catch(e){
    console.error(`BME280 initialization failed: ${e} `);
  }
  
}



function readSensor(bme280){
  
    bme280.readSensorData()
      .then((data) => {
        return data;
        //console.log(`data = ${JSON.stringify(data, null, 2)}`);
        ////setTimeout(readSensorData, 2000);
      })
      .catch((err) => {
        console.log(`BME280 read error: ${err}`);
        //setTimeout(readSensorData, 2000);
      });
  
}