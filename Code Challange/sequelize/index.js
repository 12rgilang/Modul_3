// index ini digunakan unutk memanggil yang ada didalam models dan di transfer kedalam db

const {sequelize} = require("./models");

sequelize
    .authenticate()
    .then(() => {
        return console.log("Connected");
    })
    .then(() => {
        return sequelize.sync({ 
            force : false,
            alter: true,
            logging : console.log}); // ini untuk menggabungkan model dan memasukkan kedalam db
    })
    .then(() => {
        console.log("Database is Synchronized!");
    })
    .catch((err) =>{
        console.log(err, "Something Went Wrong with Database Update!");
    })