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
    //console.log('BME280 initialization succeeded');
    let data = await bme280.readSensorData()
    return data;
  }catch(e){
    console.error(`BME280 initialization failed: ${e} `);
  }
  
}


