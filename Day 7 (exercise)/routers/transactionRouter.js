const express = require('express')
const Router = express.Router()


// import Controller
const {transactionController} = require('./../controllers')

Router.get('/search', transactionController.getProduct)


module.exports = Router