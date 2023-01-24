const express = require("express");
const { busController } = require("../controller");
const { validateToken } = require("../lib/jwt");
const upload = require("../middleware/upload");
const Route = express.Router();

Route.get("/search", busController.search);
Route.get("/details/:id", busController.details);
Route.post("/book", validateToken, busController.book);
Route.patch("/payment", upload, busController.paymentProof);

module.exports = Route;
