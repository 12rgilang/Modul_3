const express = require('express')
const Router = express.Router()

// Import All Controller
const {productsController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/menu', productsController.menu)

module.exports = Router