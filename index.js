const readBme280 = require('./bme280');
let ds18b20 = require('ds18b20');
(async () => {
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

  await sensors.forEach(async (sensorObj) => {
    switch (sensorObj.type){
      case 'ds18b20':
        sensorObj.currentTemp = await ds18b20.temperature(sensorObj.id);
        break;
      case 'bme280':
        sensorObj.data = await readBme280(sensorObj.i2cAddress);
        break;
    }
  });

  console.log(sensors);


})();
