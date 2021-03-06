const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Enter your location in the search box to get started!',
        name: 'Joey Steigelman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'My About Page!',
        aboutText: 'This is a weather app that uses Node.js, Express, and APIs from Mapbox and Weatherstack to retrieve location and weather data.',
        name: 'Joey Steigelman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is the help page. More updates coming soon.',
        name: 'Joey Steigelman',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a location.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error })
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error })
          }

          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })
      })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joey Steigelman',
        errorMessage: 'Oops! Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joey Steigelman',
        errorMessage: 'Oops! Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})