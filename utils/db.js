const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

connection.connect((err) =>  {
    if(err) throw err
    console.log('MySQL Server connected')
})

module.exports = connection