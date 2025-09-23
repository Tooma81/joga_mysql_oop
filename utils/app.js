//application packages
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const session = require('express-session')

const app = express()

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/../views/layouts')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/../views'))

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

module.exports = app