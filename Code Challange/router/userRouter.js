const express = require('express')
const Router = express.Router()

const {userController} = require('../controller')
const jwtVerify = require('../middleware/decrypt')


Router.post('/register', userController.Register)
Router.get('/login', userController.Login)
Router.post('/keep-login', jwtVerify, userController.keepLogin )

module.exports = Router;