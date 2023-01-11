const express = require("express")
const Router = express.Router()

const {productsController} = require("../controller")

Router.post("upload", productsController.uploadFile)

module.exports = Router;