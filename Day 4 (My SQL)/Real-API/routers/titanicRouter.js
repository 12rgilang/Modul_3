const express = require('express')
const Router = express.Router()

const {titanicController} = require('./../controllers')

Router.get('/search-name', titanicController.getName)
Router.get('/survived', titanicController.getSurvived)
Router.get('/gender-survived', titanicController.getGenderSurvived)
Router.get('/survived-class', titanicController.getSurvivedClass)

module.exports = Router