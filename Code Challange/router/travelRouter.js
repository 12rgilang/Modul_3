const express = require("express")
const Router = express.Router()

const {travelController} = require("../controller")

const jwtVerify = require('./../middleware/decrypt')

Router.get("/search", travelController.Search)
Router.get("/details/:id", travelController.Details)
Router.post("/book", jwtVerify, travelController.Book)


module.exports = Router;