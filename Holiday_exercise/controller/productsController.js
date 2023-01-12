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

    deleteProducts: async(req, res) =>{
        const t = await sequelize.transaction()
        try {
            console.log('tes')
            // step .1 Ambil id products dari query params
            let products_id = parseInt(req.params.products_id);

            // Step 2 delete path images untuk kebutuhan delete filenya
            let findAllImagePath = await products_images.findAll({
                where: {
                    products_id
                }, 
                transaction: t
            })

            // Step-3 DElete data di table products_images where products_id = id params
            await products_images.destroy({
                where: {
                    products_id
                },
                transaction: t
            })


            // step.4 Delete data di table products where id = id params
            let productsDeleted = await products.destroy({
                where: {
                    id: products_id
                },
                transaction: t
            })
            
            // step 5 Delete files
            deleteFiles({images: findAllImagePath})

            // step. 6 response
            await t.commit()
            if (productsDeleted) {
                res.status(200).send({
                    isError: false,
                    message: 'Delete Product Success!',
                    data: null
                })
            } else {
                res.status(404).send({
                    isError: true,
                    message: 'Product Not Found!',
                    data: null
                })
            }

        } catch (error) {
            await t.rollback()
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
            
        }
    },

    updatePerImage: async(req, res) => {
        const t = await sequelize.transaction()
        try {
            // Step 1 ambil id products_images dari params 
            let products_images_id = parseInt(req.params.products_images_id)

            // Step-2 Ambil path image yang lama untuk kebutuhan delete image file yg lama
            let findOldPathImage = await products_images.findOne({
                where: {
                    id: products_images_id
                },
                transaction: t
            })

            if(!findOldPathImage) throw {message: 'Image Id Not Found'}

            let pathToDelete = []
            pathToDelete.push(findOldPathImage)

            // Step 3 Update image path yang lama dengan image path terbarunya
            await products_images.update(
                {path: req.files.images[0].path}, {
                    where: {
                        id: products_images_id
                    }
                }, {transaction: t})

                // Step 4 Delete image file yang lama
                deleteFiles({images: pathToDelete})

                await t.commit()
                // Step 5 kirim response
                res.status(201).send({
                    isError: false,
                    message: 'Update Products Success!',
                    data: null
                })
        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            res.status(401).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
        
    }
    
}