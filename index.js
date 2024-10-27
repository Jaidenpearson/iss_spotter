const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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

// fetchISSFlyOverTimes((coordinates, (error, passes) => {
//   if(error) {
//     console.log('Error:', error)
//   } else {
//     console.log(passes)
//     }
//   }
// )
// )

fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});