const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c3ae61a59e4e6ffd6f1aa73bab0d63e9&query=${latitude},${longitude}&units=f`
    
    request({ url, json: true}, (error, { body } ) =>{
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Location not found!', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}. The humidity is ${body.current.humidity}%.`)
        }
    })
}

module.exports = forecast