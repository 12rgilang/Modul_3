// import Sequelize
const db = require('../sequelize/models')
const { Op } = require('sequelize')

module.exports = {
    signUp: async (req, res) => {
        let { username, email, password, role} = req.body;
        try {
            await db.user.create({username, email, password, role});
            return res.status(201).send({
                isError: false,
                message: "Register Success",
                data: null,
            })
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: "Something went wrong",
                data: error,
            })
        }
    },

    signIn: async(req, res) => {
        let { username, password} = req.query 
        try {
            let response = await db.user.findOne({
                where: {
                    [Op.and]: [{username}, {password}],
                },
            });
            return res.status(200).send({
                isError: false,
                message: "Login Success",
                data: { token: response.uuid},
            })
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: "Username/password not Found",
                data: error,
            })
            
        }
    }
}