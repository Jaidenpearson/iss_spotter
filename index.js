const { fetchMyIP } = require('./iss')

fetchMyIP((error, response) => {
  if(error) {
    console.log('Error: ', error)
  } else {
    console.log('Response:', response.ip)
  }
})