// import Sequelize
const {sequelize} = require('../sequelize/models')

// import models
const db = require('../sequelize/models')
const products = db.products
const products_images = db.products_images
const {Op} = require('sequelize')

// import deleteFiles
const deleteFiles = require('../helpers/deleteFiles')


module.exports = {
    uploadFile: async(req, res) => {
        const t = await sequelize.transaction()
        try {
            console.log("tes")
            console.log(req.body.data)
            // step,1 ambil dari client
            let dataToUpload = JSON.parse(req.body.data)
            console.log(dataToUpload)
            // step 2 insert data to Products
            let postProducts = await products.create(dataToUpload, {transaction: t})
            let products_id = postProducts.dataValues.id

            // step 3 insert data to Products_Images
            let pathToUpload = []
            req.files.images.forEach(value => {
                pathToUpload.push({path: value.path, products_id: products_id})
            })

            let createProductsImages = await products_images.bulkCreate(pathToUpload, {transaction: t, ignoreDuplicates: true})
            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'Post Product Success!',
                data: null
            })
        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    
}