// import Sequelize
const {sequelize} = require('../sequelize/models')
const db = require('../sequelize/models')
const { Op } = require('sequelize')
const users = db.users

const {hashPassword, hashMatch} = require('./../library/hashPassword')

const {createToken} = require('./../library/webToken')

module.exports = {
    Register: async(req, res) => {
        const t = await sequelize.transaction()
        try {
            let {username, email, password} = req.body

            let response = await users.create({
                username, email, password: await hashPassword(password)
            })
            console.log(response)

            res.status(201).send({
                isError: false,
                message: "Register Success",
                data: null
            })
            t.commit()
        } catch (error) {
            t.rollback()
            res.status(404).send({
                isError: true,
                message: error.message ,
                data: null
            })
        }
    },

    Login: async(req, res) => {
        let {usernameOrEmail, password} = req.query
        try {
            let response = await users.findOne({
                where: {
                    [Op.or]: [{username: usernameOrEmail}, {email: usernameOrEmail}],
                }
            })

            if(!response) return res.status(404).send({
                isError: true,
                message: "Username and email not found",
                data: null
            })

            let hashMatchResult = await hashMatch(password, response.password)
            console.log(hashMatchResult)

            if(!hashMatchResult) return res.status(404).send({
                isError: true,
                message: "Password Not Match",
                data: null
            })


            return res.status(201).send({
                isError: false,
                message: "Login Success",
                data: {token: createToken({id: response.uuid})}
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    keepLogin: (req, res) => {
            console.log(req.headers.auth)

            // get data by user by id
            res.status(201).send({
                isError: false,
                message: 'Token Valid',
                data: req.headers.auth
            })
        } 
}