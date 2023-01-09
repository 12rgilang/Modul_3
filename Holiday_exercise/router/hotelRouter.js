const express = require("express")
const Router = express.Router()

const {hotelController} = require("../controller")

Router.get("/search", hotelController.searchHotel);
Router.get("/details/:id", hotelController.hotelDetails);
Router.post("/book", hotelController.bookHotelRoom)


module.exports = Router;