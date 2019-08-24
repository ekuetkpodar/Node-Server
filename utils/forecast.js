const request = require("request");

const forecast = (longitude ,latitude , callback)  => {
    const url = `https://api.darksky.net/forecast/66a2adadca24e2b30825a2880bceee0c/${latitude},${longitude}`;
    request({url,json:true},(error,{body}) =>{
        if(error){
            callback('Unable to connect to weather service!' + undefined);
        }else if(body.error){
            callback("Unable to find location. Try another search" + undefined)
        }else{
            callback(undefined,body.currently.temperature)
        }
    })
};

module.exports = forecast;