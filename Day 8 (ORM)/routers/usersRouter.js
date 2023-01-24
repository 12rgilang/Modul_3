const express = require('express')
const Router = express.Router()

// import Controller
const {usersController} = require('./../controllers')
// import jwtVerify
const jwtVerify = require('./../middleware/decrypt')


Router.post('/register', usersController.register)
Router.post('/login', usersController.Login)
Router.post('/keep-login', jwtVerify, usersController.keepLogin )
Router.delete('/delete/:users_id', usersController.deleteUser)
// Router.patch('/activation/:id', usersController.activation)
// Router.get('/redis/:breed', usersController.getWithRedis)

module.exports = Router