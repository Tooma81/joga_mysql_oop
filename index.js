//application packages
const express = require('express');
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const articleControllerClass = require('./controllers/article');
const articleController = new articleControllerClass()

const articleRoutes = require('./routes/articles');
app.use('/', articleRoutes);

const authorControllerClass = require('./controllers/author');
const authorController = new authorControllerClass()

console.log("Loading author routes...");
const authorRoutes = require('./routes/author');
console.log("Author routes module:", authorRoutes);
app.use('/', authorRoutes);

//app start point
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
})