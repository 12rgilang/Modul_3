const db = require('./../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    getAllStudents: async(req, res) => {
        try {
           let getData = await query('SELECT * FROM students')
           res.status(201).send({
               isError: false,
               message: 'Get Data Succes',
               data: getData
           })
        } catch (error) {
            
        }
    },

    postStudent: async(req, res) => {
        try {
            // step.1 ambil value dari req.body
            let body = req.body
            // step2. insert data to database
            await query('INSERT INTO students SET ?',body)
            
            // step.3 kiirim responsenya
            res.status(201).send({
                isError: false,
                message: 'Post Data Succeess',
                data: null
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    }
}