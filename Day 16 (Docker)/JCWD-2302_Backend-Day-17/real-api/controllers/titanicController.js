const db = require('./../connection/conn')
const util = require('util') // Fix
const query = util.promisify(db.query).bind(db) // Fix

module.exports = {
    getByName: async(req, res) => {
        try {
            // Step-1 Ambil value dari query params
            let {name} = req.query
            console.log(name)

            // Step-2 Select query ke database
            let result = await query(`SELECT * FROM passengers WHERE Name LIKE "%${name}%"`)
            // Step-3 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Get Name Success',
                data: result
            })
        } catch (error) {
            
        }
    },

    getSurvived: async(req, res) => {
        try {
            let result = await query(`SELECT COUNT(*) as Total_Passengers_Survived FROM passengers WHERE Survived = 1;`)

            res.status(201).send({
                isError: false, 
                message: 'Get Survived Success',
                data: result
            })
        } catch (error) {
            
        }
    },

    getGenderSurvived: async(req, res) => {
        try {
            let result = await query(`SELECT Sex, COUNT(*) as Total_Survived FROM passengers GROUP BY Sex, Survived HAVING Survived=1;`)
            res.status(201).send({
                isError: false, 
                message: 'Get Gender Survived Success',
                data: result
            })
        } catch (error) {
            
        }
    },

    getSurvivedClass: async(req, res) => {
        try {
            let {pclass} = req.query 

            let result = await query(`SELECT * FROM passengers WHERE Survived = 1 AND Pclass = ${pclass}`)

            res.status(201).send({
                isError: false, 
                message: 'Get Survived by Class Success',
                data: result
            })
        } catch (error) {
            
        }
    }
}