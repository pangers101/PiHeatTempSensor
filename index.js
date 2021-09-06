let updateSensors = require('./lib/updateSensors.js');
let sensors;

let updateInterval = setInterval(() => {
  updateSensors()
    .then(sensArray => {
      console.log('SENSORS UPDATED:');
      console.log(JSON.stringify(sensArray));
    })
    .catch(e => {
      console.log(e);
      //throw new Error(e);
    });
}, 10000);
