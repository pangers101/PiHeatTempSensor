'use strict';
let express = require('express');
let app = express();
let SSE = require('express-sse');

let updateSensors = require('./lib/updateSensors.js');
let sensors, sensArray, newSensString, currentSensString;

let updateInterval = setInterval(getSensors, 10000);

app.get('/getsensors', async (req, res, next) => {
  let showSensors = await updateSensors();
  res.json(showSensors);
})

app.listen(11013, (req, res) => {
  console.log('app started listening on 11013');
});

async function getSensors(){
  try{
    let sensArray = await updateSensors();
    console.log('CHECKING SENSORS...');
    newSensString = JSON.stringify(sensArray);
    if(newSensString !== currentSensString){
      console.log('SENSORS UPDATED');
      console.log(newSensString);
      //Send out SSE
      currentSensString = newSensString;
    }else{
      console.log('SENSORS THE SAME, DO NOTHING')
    }
  }catch(e){
    console.log(e);
    //throw new Error(e);
  }
}