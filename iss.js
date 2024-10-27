const fetchMyIP = function(callback) {
  const needle = require('needle')
  needle.get('https://api.ipify.org?format=json', (error, response) => {
    if(!error && response.statusCode == 200) {
      callback(null, response.body)
    } else {
      callback(error, null)
    }
  })
  
}

module.exports = { fetchMyIP };