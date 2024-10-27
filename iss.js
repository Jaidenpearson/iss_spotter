const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response) => {
    if (!error && response.statusCode === 200) {
      callback(null, response.body.ip);
    } else {
      callback(error, null);
    }
  });
  
};

const fetchCoordsByIP = (IP, callback) => {
  const url = 'http://ipwho.is/';
  needle.get(url + IP, (error, response, body) => {
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    } else {
      console.log(error);
    }
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, { latitude, longitude });
    return;
  });
};

// const fetchISSFlyoverTimes = (coords, callback) => {
//   const latitude = coords.latitude
//   const longitude = coords.longitude
//   needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
//     if(error) {
//       callback(error, null)
//       return
//     }
//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//       return;
//     }
//     const overheads = body.response
//     callback(null, overheads)
//   })
// }

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = body.response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };