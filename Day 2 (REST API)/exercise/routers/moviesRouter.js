const express = require('express')
const Router = express.Router()

//  import all controller
const {moviesController} = require('./../controllers')

// import Auth

Router.get('/get', moviesController.getMoviesBy)





module.exports = Router