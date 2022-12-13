const express = require('express')
const Router = express.Router()

// import all Controller
const {productsController} = require('./../controllers') // akakn otomatis mengambil index.js pada controllers

Router.get('/get', productsController.getProducts)

module.exports = Router