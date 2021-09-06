'use strict';
let express = require('express');
let app = express();
let SSE = require('express-sse');

let updateSensors = require('./lib/updateSensors.js');
let sensors, sensArray, newSensString, currentSensString;

let updateInterval = setInterval(async () => {
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
}, 10000);

app.get('/temps', () => {
  res.send('REACHED THE TEMPS');
})

app.listen(11013, () => {
  console.log('app started listening on 11013');
})