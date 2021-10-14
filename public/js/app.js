const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const locationTitle = document.querySelector('#location-title')
const locationTemp = document.querySelector('#location-temp')
const temperature = document.querySelector('#temperature')
const feelsLike = document.querySelector('#feels-like')
const windSpeed = document.querySelector('#wind-speed')
const rain = document.querySelector('#rain')
const windDir = document.querySelector('#wind-dir')
const pressure = document.querySelector('#pressure')
const cloudCover = document.querySelector('#cloud-cover')
const uvIndex = document.querySelector('#uv-index')
const weatherPanelData = document.querySelector('#weather-panel-data')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    const url = '/weather?address=' + location
    
    messageTwo.textContent = 'Loading...'

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }

            const message = data.forecast.weather_descriptions[0] + ". It is currently " + data.forecast.temperature + " degrees out. It feels like " + data.forecast.feelslike + " degrees out."

            messageTwo.textContent = 'Weather at a glance: ' + message
            locationTitle.textContent = data.location
            locationTemp.textContent = data.forecast.temperature + '°'
            temperature.textContent = data.forecast.temperature
            feelsLike.textContent = data.forecast.feelslike
            windSpeed.textContent = data.forecast.wind_speed + "km/h"
            rain.textContent = data.forecast.precip + "mm"
            windDir.textContent = data.forecast.wind_dir
            pressure.textContent = data.forecast.pressure
            cloudCover.textContent = data.forecast.cloudcover + '%'
            uvIndex.textContent = data.forecast.uv_index

            weatherPanelData.style.display = weatherPanelData.style.display = 'block';
            locationTemp.style.display = locationTemp.style.display = 'inline-flex';
        })
    })
})