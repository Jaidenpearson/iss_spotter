const needle = require('needle');

const fetchMyIP = function() {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      const ip = response.body.ip;
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const { latitude, longitude } = response.body;
      return { latitude, longitude };
    });
};

const fetchISSFlyOverTimes = function(coords) {
  const { latitude, longitude } = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return needle('get', url)
    .then((response) => {
      return response.body.response;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes);
};

module.exports = { nextISSTimesForMyLocation };
