const express = require('express')
const Router = express.Router()

const {titanicController} = require('./../controllers')

Router.get('/search-name', titanicController.getByName)
Router.get('/survived-by-class', titanicController.getSurvivedClass)

module.exports = Router