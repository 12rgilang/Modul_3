const { sequelize } = require("./models");
const db = require("./models");

let products, category, size, room_image;

sequelize
	.authenticate()
	.then(() => {
		// create data in hotel
		db.products.bulkCreate([
			{
				name: "Americano",
				main_iamge: "https://www.starbucksathome.com/id/sites/default/files/2021-03/3-CaffeAmericano_LongShadow_Cream_1.png",
				
			},
			{
				name: "Cappucino",
				main_iamge: "https://www.starbucksathome.com/id/sites/default/files/styles/rdp_banner_image/public/2021-05/10032021_CAPPUCCINO_CS-min.png?itok=n_45xlrE",
			},
			{
				name: "Flat White",
				main_iamge: "https://www.starbucksathome.com/id/sites/default/files/styles/rdp_banner_image/public/2021-05/10032021_CAPPUCCINO_CS-min.png?itok=n_45xlrE",
			},
		], {validate: true});
	})
	.then((data) => {
		// insert data hotel_image
		return db.category.bulkCreate([
			{name: 0},
			{name: 0},
			{name: 0},
		], {validate: true});
	})
	.then((data) => {
		// insert data room
		return db.size.bulkCreate([
			{
				name: "single bed hotel 1",
				price: 300000,
				hotel_id: 1,
				available_Room: 20,
			},
		]);
	})
	.then((data) => {
		// insert data room
		return db.transaction.bulkCreate([
			{
				hotel_name:"Hotel JHL",
				hotel_location:"Serpong",
				room_name:"deluxe garden",
				price:3000000,
				total_room:2,
				checkin:"2022-12-20 14:00:00",
				checkout:"2022-12-21 12:00:00",
				status:"paid",
			},
			{
				hotel_name:"Hotel ibis",
				hotel_location:"Tangerang",
				room_name:"deluxe garden",
				price:3000000,
				total_room:2,
				checkin:"2022-12-20 14:00:00",
				checkout:"2022-12-21 12:00:00",
				status:"paid",
			}
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