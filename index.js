const bme280 = require('bme280');
let ds18b20 = require('ds18b20');

ds18b20.sensors(function(err, ids) {
  // got sensor IDs ...
  console.log(ids);
});

bme280.open({ i2cAddress: 0x76 }).then(async sensor => {
  console.log(await sensor.read());
  await sensor.close();
}).catch(console.log);
