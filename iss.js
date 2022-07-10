let nextPasses;
const req = require('request');
let url = "https://api.ipify.org/?format=json";
const fetchMyIP = function(callback) {
  req(url, (error, resp, body) => {
    console.log(url);

    if (error) {
      console.log('REQUEST ERROR');
      callback(error, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, body);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let url = `http://ipwho.is/${ip}`;
  req(url, (error, resp, body) => {

    let parsedBody = JSON.parse(body);

    if (error || !parsedBody.success) {
      callback(error, parsedBody.message);
      return;
    }

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let longLat = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude

    };

    callback(error, longLat);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  let url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  req(url, (error, resp, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let parsedBody = JSON.parse(body);
    // console.log(nextPasses);
    let nextPasses = parsedBody.response;
    callback(error, nextPasses);
  });
  // console.log(passTimes)
  // let printPassTimes = function(passTimes) {
  //   for (const pass of passTimes) {
  //     const datetime = new Date(0);
  //     datetime.setUTCSeconds(pass.risetime);
  //     const duration = pass.duration;
  //     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  //   }
  // };
};




//   callback(null, nextPasses);
// };
// module.exports = { nextISSTimesForMyLocation, };
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, body) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    const ip = JSON.parse(body).ip;

    fetchCoordsByIP(ip, (error, body) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }

      fetchISSFlyOverTimes(body, (error, body) => {
        if (error) {
          console.log("It didn't work!", error.message);
          return;
        }
        callback(null, body);
      });
    });
  });



};
module.exports = { nextISSTimesForMyLocation };