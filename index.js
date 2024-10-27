const { fetchMyIP, fetchCoordsByIP } = require('./iss');

let IP = ''
let coordinates = {}


fetchMyIP((error, response) => {
  if (error) {
    console.log('Error: ', error);
  } else {
    IP = JSON.stringify(response);
  }
});

fetchCoordsByIP(IP, (response, error) => {
  if (error) {
    console.log(error);
  } else {
    coordinates = response
  }
});