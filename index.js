'use strict';

let express = require('express');
let app = express();
let SSE = require('express-sse');

let updateSensors = require('./lib/updateSensors.js');
let sensors, sensArray, newSensString, currentSensString, sse;

app.get('/getsensors', async (req, res, next) => {
  let showSensors = (req['locals'] && req.locals['sensors']) ? req.locals.sensors : await updateSensors(req);
  res.json(showSensors);
});

//POPULATE BLANK SENSORSTREAM FIRST IN CASE NOT READY
app.get('/sensorstream', (req, res, next) => {
  next();
});
(async () => {
  let initialData = await updateSensors(app);
  sse = new SSE(JSON.stringify(initialData));
  app.get('/sensorstream', sse.init);
})();

let updateInterval = setInterval(getSensors, 10000, app);

app.listen(11013, (req, res) => {
  console.log('app started listening on 11013');
});

async function getSensors(app){
  try{
    let sensArray = await updateSensors(app);
    console.log('CHECKING SENSORS...');
    newSensString = JSON.stringify(sensArray);
    if(newSensString !== currentSensString){
      console.log('SENSORS UPDATED');
      console.log(newSensString);
      //Send out SSE
      sse.send(newSensString);
      currentSensString = newSensString;
    }else{
      console.log('SENSORS THE SAME, DO NOTHING')
    }
  }catch(e){
    console.log(e);
    //throw new Error(e);
  }
}
