const express = require('express')
const Router = express.Router()

// import Controller
const {usersController} = require('./../controllers')
// import jwtVerify
const {tokenVerify} = require('./../middleware/verifyToken')

Router.post('/register', usersController.register)
Router.post('/login', usersController.Login)
Router.post('/keep-login', tokenVerify, usersController.keepLogin )
Router.patch('/activation/:id', usersController.activation)
ROuter.get('/redis/:redis', usersController.getWithRedis)

module.exports = Router