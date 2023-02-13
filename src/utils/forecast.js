const request = require('postman-request');
// const http = require('http');

const forecast = (location, callback) => {
    const api = 'http://api.weatherstack.com/current?access_key=15262575cb82b7343bcda16433622bd5&query=';

    const url = api + location;

    request({ url , json: true}, (error, {body}) => {
    
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const location = body.location.name + ', ' + body.location.region + ', ' + body.location.country 
            callback(undefined,{
                location,
                temperature ,
                feelslike
            })
            
        }
    })
}

module.exports = {forecast};