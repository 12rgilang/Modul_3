const express = require('express')
const Router = express.Router()

// import Controller
const {usersController} = require('./../controllers')

Router.post('/register', usersController.register)
Router.post('/login', usersController.Login)

module.exports = Router