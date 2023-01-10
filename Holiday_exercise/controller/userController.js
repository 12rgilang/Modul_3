// import Sequelize
const {sequelize} = require('../sequelize/models')
const db = require('../sequelize/models')
const { Op } = require('sequelize')

// generate UID
const { v4: uuidv4 }= require('uuid');

// import web token
const {createToken} = require('./../library/webToken')

// import hsashing password
const {hashPassword, hashMatch} = require('./../library/hashPassword')


module.exports = {
    signUp: async (req, res) => {
        const t = await sequelize.transaction()
        try {
            // Step-1 Ngambil value req.body
            let {username, email, password, role} = req.body

            // Step-2
            await db.user.create({
                username, email, password: await hashPassword(password), role
            })
            // Step-3
            res.status(201).send({
                isError: false, 
                message: 'Register Success',
                data: null
            })

        } catch (error) {
            res.status(404).send({
                isError: true, 
                message: error.errors[0].message,
                data: null
            })
        }
    },

    signIn: async(req, res) => {
        let { usernameOrEmail, password} = req.query 
        try {
            let response = await db.user.findOne({
                where: {
                    [Op.or]: [{username: usernameOrEmail}, {email: usernameOrEmail}],
                },
            })
            
            if(!response) return res.status(404).send({
                isError: true,
                message: "Username and email not found",
                data: null
            })

            let hashMatchResult = await hashMatch(password, response.password)


            if(hashMatchResult === false ) return res.status(404).send({
                isError: true,
                message: "Password not Found",
                data: null,
            })
            
            // step.3 kirim response
            return res.status(201).send({
                isError: false,
                message: "Login Success",
                data: { token: createToken({id: response.uuid})},
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}