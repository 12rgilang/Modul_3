const express = require("express")
const Router = express.Router()

// Import Controller
const {productsController} = require("../controller")

// import Upload
const upload = require('./../middleware/upload')

Router.post("/upload", upload, productsController.uploadFile)

module.exports = Router;