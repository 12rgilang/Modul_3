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
const {webToken, createToken} = require('./../library/webToken');

// import transporter
const transporter  = require('../helpers/transporter');
const handlebars = require('handlebars')
const client = require('./../connection/rconn')
const axios = require('axios')

const fs = require('fs').promises;

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

        // step. 4.1 
        const template = await fs.readFile('./template/confirmation.html', 'utf-8') //kolom kedua untuk tipe file 'utf-8'
        const templateCompile = await handlebars.compile(template)
        const newTemplate = templateCompile({username, url:`http:localhost:3000/activation/${resCreateUsers.dataValues.id}` })
        await transporter.sendMail({
            from: 'Starbucks',
            to: email,
            subject: 'Account Activation',
            html: newTemplate
        })

        // step.5 kirim response
        await t.commit()
        res.status(201).send({
            isError: false,
            message : "Register Success",
            data: null
        })
        
       } catch (error) {
           await t.rollback()
           console.log(error)
       }

    },

    Login: async(req, res) => {
            // Step1. ambil value dari req.body
            let {username, password} = req.body

            // Step.2 Cari username dan password di database
            let findUsernameAndPassword = await users.findOne({
                where: {
                    username
                }
            })

            
            if(!findUsernameAndPassword){
                return res.status(401).send({
                    isError: true,
                    message: 'Username Not Found',
                    data: null
                })
            }

            let matchPassword = await hashMatch(password, findUsernameAndPassword.password)
            if(matchPassword === false ) 
            return res.status(404).send({
                isError: true,
                message: 'Password Not Found',
                data: null
            })

            const token = createToken({id: findUsernameAndPassword.id, username: findUsernameAndPassword.username})

            res.status(201).send({
                isError: false,
                message: 'Login Success',
                data: {token, username: findUsernameAndPassword.dataValues.username}
            })

    },

    keepLogin: (req, res) => {
        try {
            console.log(req.dataToken)

            // get data by user by id
            res.status(201).send({
                isError: false,
                message: 'Token Valid',
                data: req.dataToken.username
            })
        } catch (error) {
            
        }
    },
    
    activation: async(req, res) => {
        try {
            // step.1 ambil data dauri query
            let {id} = req.param.id
            
            // step.2 patch data
            let findActivation = await users.update(
                {status: "Confirmed"},
                {where:
                {
                    id
                }}
            )
            // step.3 kirim respon
            res.status(201).send({
                isError: false,
                message: "Activation Success!",
                data: null
            })
        } catch (error) {
            res.status(404).send({
                error: true,
                message: error.message ,
                data: null
            })
        }
    },

    getWithRedis: async(req, res) => {
        try {
            let {breed} = req.params

            let dataFromRedis = await client.get('dogs');
            dataFromRedis = JSON.parse(dataFromRedis)

            if(dataFromRedis.message.length){
                return res.status(201).send({
                    isError: false,
                    message: 'Get DAta From API SUcces!',
                    data: dataFromRedis.message
                })
            }

            let {data} = await axios.get(`http://dog.ceo/api/breed/${breed}/images`)

            client.setex('dogs', 10000, JSON.stringify(data))

            res.status(201).send({
                isError: false,
                message: 'GEt Data From API Success!',
                data: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}