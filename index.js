const { nextISSTimesForMyLocation  } = require('./iss');

// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


// let longLat = {
//   latitude: '45.4215296',
//   longitude: '-75.6971931'
  
// };



// fetchMyIP((error, body) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   return JSON.parse(body).ip;
// });

// fetchCoordsByIP(ip, (error, body) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(body)
// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};




nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


