let updateSensors = require('./lib/updateSensors.js');
let sensors;

updateSensors()
  .then(sensArray => {
    console.log('SENSORS UPDATED:');
    console.log(sensArray);
  })
  .catch(e => {
    console.log(e);
    //throw new Error(e);
  });
