// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const products = db.products
const products_details = db.products_details
const category = db.category

module.exports = {
    menu: async(req, res) => {
        try {
            let findListMenu = await products.findAll()
            
            res.status(201).send({findListMenu})
        } catch (error) {
            console.log(error.message)
        }
    },

    getProduct: async(req, res) => {
        try {
            let body = req.query;
            let data = await products.findAll();
            return res.status(200).send({
                isError: false,
                message: 'get all product',
                data: data
            })
        } catch (error) {
            console.log(error)
        }
    },

    getCategory: async(req, res) => {
        try {
            let data = await category.findAll();
            return res.status(200).send({
                isError: false,
                message: 'get all category',
                data: data
            })
        } catch (error) {
            console.log(error)
        }
    },

    getDetail: async(req, res) => {
        try {
            let param = req.param.id;
            let data = await products.findAll({
                where: {
                    id: param
                }, include: ['size']
            })

            res.status(201).send({
                isError: false,
                message: 'get detail',
                data: data
            })
        } catch (error) {
            console.log(error)
        }
    },
}