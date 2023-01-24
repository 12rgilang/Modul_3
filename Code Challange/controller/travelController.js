const {sequelize} = require('../sequelize/models')
const db = require('../sequelize/models')
const { Op} = require('sequelize')

 module.exports = {
     Search: async(req, res) => {
         let {date, from, to} = req.query
         if(date && from && to) {
            try {
              let searchResponse = await db.travel.findAll({
                  where: {
                      [Op.and]: [
                          {date},
                          {from},
                          {to}
                      ]
                  },
                  include: {
                      model: db.bus
                  }
              })

              return res.status(201).send({
                  isError: false,
                  message: "Get data Success",
                  data: searchResponse.map((value) => {
                      return {
                          bus: value.bus.armada,
                          from: value.from,
                          to: value.to,
                          price: value.price,
                          totalSeat: value.totalSeat
                      }
                  })
              })
            } catch (error) {
                return res.status(404).send({
                    isError: true,
                    message: "Data not found",
                    data: error.message
                })
            }
         }
     },

     Details: async(req, res) => {
         let id = req.params.id
         try {
             let data = await db.travel.findOne({
                 where: {
                     id
                    },
                    include: {
                        model: db.bus
                },
            })
             return res.status(200).send({
                 isError: false,
                 message: "Get hotel details",
                 data:
                 {
                    id: data.id,
                    bus: data.bus.armada,
                    from: data.from,
                    to: data.to,
                    price: data.price,
                    totalSeat: data.totalSeat,
                    date: data.date
                 }
             })
         } catch (error) {
             return res.status(404).send({
                 isError: true,
                 message: "Data Not Found",
                 data: null
             })
         }
     },

     Book: async(req, res) => {
        let {travel_name, total_seat, seat_number} = req.body
         try {
             let data = await db.transactions.create({travel_name, total_seat, seat_number })
             console.log(data)
             return res.status(201).send({
                 isError: false,
                 message: "Booking Success!",
                 data: data
             })
         } catch (error) {
             return res.status(404).send({
                 isError: true,
                 message: error.message,
                 data: error
             })
         }
     }
 }