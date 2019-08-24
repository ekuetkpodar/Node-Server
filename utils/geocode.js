const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?access_token=pk.eyJ1IjoiZWt1ZXRrcG9kYXIiLCJhIjoiY2p3bGFsZjh2MDQ2bDQ5bXlkbm53bTlkeSJ9.9C_x8WTwAfx9r8Hzx5-MaQ&limit=1"

    request({url:url, json:true}, (error, response) => {
      if(error){
            console("Unable to connect to location services!", undefined)
      }else if(response.body.features.length ===0){
            console("Unable to find locations. Try another search.", undefined)
      }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
      }
    })
}

module.exports = geocode