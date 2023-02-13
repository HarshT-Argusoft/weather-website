const hbs = require('hbs');
const path = require('path');
const express = require('express');

const {forecast} = require('./utils/forecast')

const app = express();

//define paths for express config
const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(dirPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'ABC',
        data: {
            temperature: 28,
            feelslike: 26
        }
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can we help??',
        name: 'ABC'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "ABOUT ME",
        name: "ABC"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }

    const address = req.query.address;
    forecast(address, (error, {location, temperature, feelslike} = {}) => {
        if(error){
            return res.send({error})
        }else{
            res.send({
                location,
                temperature,
                feelslike
            })
        }
    })
    
    
})

app.get('*', (req, res) => {
    res.render('error',{
        errorMessage: 'Page not found',
        title: 'Error 404',
        name: 'ABC'
    })
})

app.listen(3000, () => {
    console.log('Listening...')
})