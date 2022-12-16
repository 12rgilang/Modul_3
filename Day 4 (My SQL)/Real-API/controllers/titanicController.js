const db = require('./../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    // untuk mencari nama didalam database
    getName: async(req, res) => {

        try {
            // ambil value dari query params atau dari client
            let {name} = req.query
            console.log(name)

            // select query ke data base
            let getData = await query(`SELECT * FROM passenger WHERE Name LIKE "%${name}%" `)
            console.log(getData)

            // kirim response
            res.status(201).send({
                isError: false,
                message: "Get Data Success",
                data: getData
            })

        } catch (error) {
            error.message
            
        }
    },


    getSurvived: async(req, res) => {
        try {
            let survived = await query ('SELECT COUNT(*) as Total_passenger_Survived FROM passenger WHERE Survived = 1; ')

            res.status(201).send({
                isError: false,
                message: 'Get Data Survived Succcess',
                data: survived
            })
        } catch (error) {
            
        }

    },

    getGenderSurvived: async(req, res) => {
        try {
            let gender = await query('SELECT Sex, COUNT(*) as Total_Survived FROM passenger GROUP BY Sex, Survived HAVING Survived = 1;')

            res.status(201).send({
                isError: false,
                message: "Get Gender Data Survived",
                data: gender
            })
        } catch (error) {
            
        }
    },

    getSurvivedClass: async(req, res) => {
        try {
            let {pclass} = req.query
            console.log(pclass)

            let result = await query(`SELECT * FROM passenger WHERE Survived = 1 AND Pclass = ${pclass}`)

            res.status(201).send({
                isError: false,
                message: 'Get Survived by Class Success',
                data: result
            })
        } catch (error) {
            
        }
    }
}