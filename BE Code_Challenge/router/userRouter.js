const express = require("express");
const { userController } = require("../controller");
const Route = express.Router();

Route.post("/register", userController.register);
Route.get("/login", userController.login);

module.exports = Route;
