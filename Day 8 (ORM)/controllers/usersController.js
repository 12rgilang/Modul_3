// import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize')

// TO generate UID
const { v4: uuidv4 } = require('uuid');

// import models
const db = require('./../models/index')
const users = db.users
const users_address = db.users_address

// impoort hashing
const {hashPassword,hashMatch} = require('./../library/hashPassword')

// import webToken
const {webToken} = require('./../library/webToken')

module.exports = {
    register: async(req, res) => {
        // To rollback transactions
        const t = await sequelize.transaction()
       try {
            // step.1 Ambil data dari req.body
        let {username, email, password} = req.body

        // Step2. Validasi inputan users
        if(!username.length || !email.length || !password.length) 
        return res.status(404).send({
            isError: true,
            message: 'Data Not Found',
            data: null
        })

        // step.3 check ke database, username & email nya exist
        let findUsernameAndEmail = await users.findOne({
            where: {
                [Op.and]: [
                    {username: username},
                    { email: email}
                ]
            }
        }, {transaction: t})
        if(findUsernameAndEmail){
            return res.status(404).send({
                isError: true,
                message: "Email or username already exist",
                data: null
            })
        }

        // step.4 simpan data kedalam database
        let resCreateUsers = await users.create({id: uuidv4(), username, email, password: await hashPassword(password)}, {transaction: t})
        console.log(resCreateUsers.dataValues.id)

        await users_address.create({receiver: 'gilang', address: 'Tangerang', phone_number: 62, users_id: resCreateUsers.dataValues.id}, {transaction: t})

        // step.5 kirim response
        await t.commit()
        res.status(201).send({
            isError: false,
            message : "Register Data Success",
            data: null
        })
        
       } catch (error) {
           console.log(error)
       }

    },

    Login: async(req, res) => {
        try {
            // Step1. 
            let {username, password} = req.body

            if(!username.length && !password.length)
            return res.status(404).send({
                isError: true,
                message: 'Data Not Found',
                data: null
            })


            let findUsernameAndPassword = await users.findOne({
                where: {
                    [Op.and]: [
                        {username: username},
                        {password: password}
                    ]
                }
            })
            console.log(findUsernameAndPassword)
            
            if(findUsernameAndPassword){
                return res.status(201).send({
                    isError: false,
                    message: 'Login success',
                    data: {id: findUsernameAndPassword.dataValues.id, username: findUsernameAndPassword.dataValues.username}
                })
            }
        } catch (error) {
            
        }
    }
}