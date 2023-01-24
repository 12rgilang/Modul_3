const express = require('express')
const Router = express.Router()

// Import All Controller
const {studentsController} = require('./../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/get', studentsController.getAllStudents)
Router.post('/post', studentsController.postStudent)
Router.get('/test', studentsController.test)

module.exports = Router