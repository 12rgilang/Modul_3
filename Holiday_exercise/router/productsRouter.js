const express = require("express")
const Router = express.Router()

// Import Controller
const {productsController} = require("../controller")

// import Upload
const upload = require('./../middleware/upload')

Router.post("/upload", upload, productsController.uploadFile)
Router.delete("/delete/:products_id", productsController.deleteProducts)
Router.patch("/update/:products_images_id/", upload, productsController.updatePerImage)
Router.get("/get", productsController.getAllProducts)

module.exports = Router;