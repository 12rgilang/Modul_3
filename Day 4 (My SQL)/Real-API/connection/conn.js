const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql_container',
    user: 'root',
    password: 'jcwd2302',
    database: 'jcwd_2302',
    port: 3306
});

db.connect((err) => {
    if(err) return console.log('Error' + err.message)

    console.log('Connected to Database')
})

module.exports = db