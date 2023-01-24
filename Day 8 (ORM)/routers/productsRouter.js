const express = require('express')
const Router = express.Router()

// Import All Controller
const {productsController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/', productsController.getProduct)
Router.get('/menu', productsController.menu)
Router.get('/category', productsController.getCategory)
Router.get('/detail/:id', productsController.getDetail)

module.exports = Router