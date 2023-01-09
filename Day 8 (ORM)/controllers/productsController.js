// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const products = db.products
const products_image = db.products_image

module.exports = {
    menu: async(req, res) => {
        try {
            let findListMenu = await products.findAll({ attributes: ['name'],
                include: [{
                    model: products_image,
                    attributes: ['url']
                }]
            })
            
            res.status(201).send({findListMenu})
        } catch (error) {
            console.log(error.message)
        }
    }
}