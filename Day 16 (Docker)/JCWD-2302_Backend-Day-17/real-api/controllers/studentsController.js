const db = require('./../connection/conn')
const util = require('util') // Fix
const query = util.promisify(db.query).bind(db) // Fix

module.exports = {
    getAllStudents: async(req, res) => {
        try {
            let getData = await query('SELECT * FROM students')
            res.status(201).send({
                isError: false, 
                message: 'Get Data Success',
                data: getData
            })
        } catch (error) {
            
        }    
    },

    postStudent: async(req, res) => {
        try {
            // Step-1 Value dari req.body
            let body = req.body 
            
            // Step-2 Insert data to database
            await query('INSERT INTO students SET ?', body)

            // Step-3 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Post Data Success',
                data: null
            })
        } catch (error) {
            res.status(404).send({
                isError: true, 
                message: error.message,
                data: null
            })
        }
    },

    test: async(req, res) => {
        try {
            res.send('Rest API Docker Bosss!')
        } catch (error) {
            
        }
    }
}   