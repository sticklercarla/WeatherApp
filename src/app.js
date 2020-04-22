const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Carla Stickler'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Carla Stickler'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hey there, this is the help page, do you need help?',
        title: 'Help',
        name: 'Carla Stickler'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                location: location,
                forcastData: forecastData
            })
        })
        
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Carla Stickler',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Carla Stickler',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// app.get('', (req, res) => {
//     res.send('<h1>WEATHER APP</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Carla',
//         age: 36
//     },
//     {
//         name: 'Adam',
//         age: 35
//     }
// ])
// })

// app.get('/about', (req, res)  => {
//     res.send('<h1>ABOUT PAGE</h1>')
// })