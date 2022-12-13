const fs = require('fs')

module.exports = {
    getProducts: (req, res) => {
    // step 1 ambil data db.json
    let getData = JSON.parse(fs.readFileSync('./db/db.json'))

    // step. 2 kirim datanya dalam bentuk response
    res.status(201).send({
        isError: false,
        message: 'Get Data Success',
        data: getData
        })
    },

    postProducts: (req, res) => {
    // step.1 ambil data dari client
    let body = req.body
    // step.2 simpan ke db.json
    let getData = JSON.parse(fs.readFileSync('./db/db.json'))
    let generateId = getData.products.length === 0 ? 1 : getData.products[getData.products.length-1].id + 1
    getData.products.push({id: generateId, ...body})
    fs.writeFileSync('./db/db.json', JSON.stringify(getData))
    // step.3 kirim response
    res.status(201).send({
        isError: false,
        message: 'Post Data Success',
        data: null
        })
    },

    updateProducts: (req, res) => {
        // step.1 Ambil id dari params
    let id = parseInt(req.params.id)
    // step.2 ambil data dari body
    let body = req.body
    // step3. read data dari db.json
    let getData = JSON.parse(fs.readFileSync('./db/db.json'))
    // step.4 Manipulsai data
    let idx = null
    getData.products.forEach((value, index) => {
        if(value.id === id){
            value.name = body.name
            value.price = body.price 
        }
    })

    // step5. save db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(getData))

    // step.5 kirim response
    res.status(201).send({
        isError: false,
        message: "Update Data Success",
        data: null
        })
    },

    deleteProducts: (req, res) => {
        let id = parseInt(req.params.id)
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))
        let idx = null
        getData.products.forEach((value, index) => {
            if(value.id === id) {
                idx = index
            }
        })

        if(idx === null) return res.status(401).send({isError: true, message: 'Id Not Found', data: null})

        getData.products.splice(idx, 1)
    
        fs.writeFileSync('./db/db.json', JSON.stringify(getData))
    
        // step.5 kirim response
        res.status(201).send({
            isError: false,
            message: "Delete Data Success",
            data: null
        })
    }

}