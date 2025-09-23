const app = require('./utils/app')

const articleRoutes = require('./routes/articles');
app.use('/', articleRoutes);

const authorRoutes = require('./routes/author');
app.use('/', authorRoutes);

const userRoutes = require('./routes/users');
app.use('/', userRoutes);

//app start point
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
})