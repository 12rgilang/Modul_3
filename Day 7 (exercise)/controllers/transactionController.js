const db = require('./../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    getProduct : async(req, res) => {
        try {
            let searchBy = req.query
            let query1 = `SELECT * FROM products WHERE `
            let dataToSend = []
            for(let key in searchBy){
                query1 += `${key} = ? AND  `
                dataToSend.push(searchBy[key])
            }
            query1 = query1.split(' ') // menghasilkan array baru
            console.log(query1)
            query1 = query1.slice(0, -2).join(' ')
            console.log(query1)

            let result = await query(query1, dataToSend)

            res.status(201).send({
            isError: false,
            message: 'Get Data Success',
            data: result
        }) 
        } catch (error) {
            res.status(500).send({
                isError: true,
                message: 'Error on Server',
                data: null
            })
            
        }
    }
}