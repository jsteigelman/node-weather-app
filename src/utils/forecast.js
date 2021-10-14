const request = require('request')

const forecast = (coord1, coord2, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=a20fe3be251c6fb71f004e8a631c4182&query=' + coord1 + ',' + coord2 + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=e8cf670cd359e60f1532d9c16c382432&query=' + coord1 + ',' + coord2 + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast