const request = require('request')

const forecast = (coord1, coord2, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a20fe3be251c6fb71f004e8a631c4182&query=' + coord1 + ',' + coord2 + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try again with a new location.', undefined)
        } else {
            // const message = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out."
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast