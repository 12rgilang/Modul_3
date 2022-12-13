const express = require('express')
const { deleteProducts } = require('../controllers/productsController')
const Router = express.Router()

// import all Controller
const {productsController} = require('./../controllers') // akakn otomatis mengambil index.js pada controllers

// import Auth
const Auth = require('./../middleware/authorization')

Router.get('/get', productsController.getProducts)
Router.post('/post', Auth, productsController.postProducts)
Router.patch('/update/:id', productsController.updateProducts)
Router.delete('/delete/:id', productsController.deleteProducts)


module.exports = Router