const express = require("express")
const Router = express.Router()

const {userController} = require("../controller")

Router.post("/register", userController.signUp);
Router.get("/login", userController.signIn)

module.exports = Router;