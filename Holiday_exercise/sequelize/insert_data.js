const { sequelize } = require("./models");
const db = require("./models");

let hotel, room, hotel_image, room_image;

sequelize
	.authenticate()
	.then(() => {
		// create data in hotel
		db.hotel.bulkCreate([
			{
				name: "hotel 1",
				location: "location 1",
				price: 300000,
				availableRoom: 1,
			},
			{
				name: "hotel 2",
				location: "location 1",
				price: 400000,
				availableRoom: 2,
			},
			{
				name: "hotel 3",
				location: "location 2",
				price: 500000,
				availableRoom: 3,
			},
		]);
	})
	.then((data) => {
		// insert data hotel_image
		return db.hotel_image.bulkCreate([
			{ image: "image A1" },
			{ image: "image B1" },
			{ image: "image C1" },
			{ image: "image A2" },
			{ image: "image B2" },
			{ image: "image C2" },
			{ image: "image A3" },
			{ image: "image B3" },
			{ image: "image C3" },
		]);
	})
	.then((data) => {
		// insert data room
		return db.room.bulkCreate([
			{
				type: "single bed hotel 1",
				price: 300000,
				hotel_id: 1,
			},
			{
				type: "twin bed hotel 1",
				price: 400000,
				hotel_id: 1,
			},
			{
				type: "suite hotel 1",
				price: 600000,
				hotel_id: 1,
			},
			{
				type: "single bed hotel 2",
				price: 400000,
				hotel_id: 2,
			},
			{
				type: "twin bed hotel 2",
				price: 500000,
				hotel_id: 2,
			},
			{
				type: "suite hotel 2",
				price: 800000,
				hotel_id: 2,
			},
			{
				type: "single bed hotel 3",
				price: 500000,
				hotel_id: 3,
			},
			{
				type: "twin bed hotel 3",
				price: 600000,
				hotel_id: 3,
			},
			{
				type: "suite hotel 3",
				price: 1000000,
				hotel_id: 3,
			},
		]);
	})
	.then((data) => {
		// insert data room
		return db.room_image.bulkCreate([
			{
				image: "R img a1",
				room_id: 1,
			},
			{
				image: "R img b1",
				room_id: 1,
			},
			{
				image: "R img a2",
				room_id: 2,
			},
			{
				image: "R img b2",
				room_id: 2,
			},
			{
				image: "R img a3",
				room_id: 3,
			},
			{
				image: "R img b3",
				room_id: 3,
			},
			{
				image: "R img a4",
				room_id: 4,
			},
			{
				image: "R img b4",
				room_id: 4,
			},
			{
				image: "R img a5",
				room_id: 5,
			},
			{
				image: "R img b5",
				room_id: 5,
			},
			{
				image: "R img a6",
				room_id: 6,
			},
			{
				image: "R img b6",
				room_id: 6,
			},
			{
				image: "R img a7",
				room_id: 7,
			},
			{
				image: "R img b7",
				room_id: 7,
			},
			{
				image: "R img a8",
				room_id: 8,
			},
			{
				image: "R img b8",
				room_id: 8,
			},
			{
				image: "R img a9",
				room_id: 9,
			},
			{
				image: "R img b9",
				room_id: 9,
			},
		]);
	})
	.catch((error) => {
		console.log(error);
	});