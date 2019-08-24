const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates')

app.set('view engine','hbs')
app.set('views', 'templates/views')
app.use(express.static('public'))
hbs.registerPartials('templates/partials')

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ekue Kpodar'
    })
})

app.get("/help/*", (req,res) => {
    res.send("Help article not found")
})

app.get("/weather", (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData ) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })


    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name: 'Ekue Kpodar'
    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    comsole.log(req.query.search)
    res.send({

    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpText: 'This is some helpful.',
        
    })
})

app.get("*", (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Ekue Kpodar',
        errorMessage: "Page Not Found"
    })
})

app.listen(3000, () =>{
    console.log('Serving app')
})