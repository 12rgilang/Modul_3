const express = require('express')
const Router = express.Router()

//  import all controller
const {usersController} = require('./../controllers')

// import Auth
const Auth = require('./../middleware/authorization')

Router.get('/get', usersController.getUsers)
Router.get('/login', usersController.getUsers)
Router.post('/register', Auth, usersController.postUsers)
Router.patch('/update/:id', usersController.updateUsers)
Router.delete('/delete/:id', usersController.deleteUsers)



module.exports = Router