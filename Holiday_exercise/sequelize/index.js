// index ini digunakan unutk memanggil yang ada didalam models dan di transfer kedalam db

const {sequelize} = require("./models");

sequelize
    .authenticate()
    .then(() => {
        return console.log("Connected");
    })
    .then(() => {
        return sequelize.sync({ alter: true}); // ini untuk menggabungkan model dan memasukkan kedalam db
    })
    .then(() => {
        console.log("Database Sync");
    })
    .catch((err) =>{
        console.log(err);
    })