'use strict';


  let express = require('express');
  let app = express();
  let SSE = require('express-sse');

  let updateSensors = require('./lib/updateSensors.js');
  let sensors, sensArray, newSensString, currentSensString;

  

  app.get('/getsensors', async (req, res, next) => {
    let showSensors = await updateSensors();
    res.json(showSensors);
  });

  var sse = new SSE(updateSensors().then((data) => data));
  

  app.get('/sensorstream', sse.init);
  let updateInterval = setInterval(getSensors, 10000);

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
