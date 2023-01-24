const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "mysql_server",
    user: "root",
    password: "password",
    database: "jcwd2302",
    port: 3306
  });

db.connect((err) => {
    if(err) return console.log('Error ' + err.message)

    console.log('Connected to Database')
})

module.exports = db