//application packages
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const app = express()

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/../views/layouts')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/../views'))

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.urlencoded({extended: true}))

module.exports = app