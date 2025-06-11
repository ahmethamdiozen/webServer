const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/weatherstack")

const app = express()

// console.log(path.join(__dirname, '../public'))
const publicPath = path.join(__dirname, '../public')
// console.log(__filename)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Global değişkenler
app.locals.title = 'Hava Durumu Uygulaması'
app.locals.name = 'Ahmet Hamdi'

app.use(express.static(publicPath))


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a address term"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {sicaklik, hissedilen, hava, yagis} = {}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                latitude,
                longitude,
                sicaklik,
                hissedilen,
                yagis,
                hava
            })
        })
    })

    //res.render('weather')
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Ana Sayfa',
        name: 'Ahmet Hamdi'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})


app.get('*splat', (req, res) => {
    res.render('404 Not Found', {
        title: '404 Not Found',
        name: 'Ahmet Hamdi',
        errorMessage: 'Sayfa bulunamadı'
    })
})


app.get('/help/*splat', (req, res) => {
    res.render('HELP -- 404 Not Found', {
        title: '404 Not Found',
        name: 'Ahmet Hamdi',
        errorMessage: 'Sayfa bulunamadı'
    })
})


/*
app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>')
})

app.get('/help', (req, res) => {
    res.send(`
        <h1>Help</h1>
        <ul>
            <li><a href="http://localhost:3000/">App</a></li>
            <li><a href="http://localhost:3000/help">App/help</a></li>
            <li><a href="http://localhost:3000/about">App/about</a></li>
            <li><a href="http://localhost:3000/weather">App/weather</a></li>
        </ul>
    `);
});

app.get('/weather', (req, res) => {
    res.send({
        konum: "Bursa",
        hava: "10",
        hissedilen: "8",
        yagis: "false"
    })
})
*/
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})