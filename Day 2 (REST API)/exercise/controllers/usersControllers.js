
const fs = require('fs')


module.exports = {
    getUsers: (req, res) => {
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        res.status(201).send({
            isError: false,
            message: 'Get Data Succes',
            data: getData.users
        })
    },

    loginUsers: (req, res) => {
        let body = req.body

        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        let datadb = {
            uid: '',
            username: '',
            email: '',
            role: ''
        }

        getData.users.forEach((value, index) => {
            if(value.username === body.username){
                datadb.uid = value.uid,
                datadb.username = value.username,
                datadb.email = value.email,
                data.role = value.role
            }
        })

        res.status(201).send({
            user:datadb
        })
    },

    postUsers: (req, res) => {
        let body = req.body
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))
        let uid = new Date()

        let generateId = getData.users.length === 0 ? 1 : getData.users[getData.users.length-1].id +1
        getData.users.push({id: generateId, uid: uid, ...body})
        fs.writeFileSync('./db/db.json', JSON.stringify(getData))


        res.status(201).send({
            uid: uid,
            username: body.username, 
            email: body.email
        })
    },

    updateUsers: (req, res) => {
        let id = parseInt(req.params.id)
        let body = req.body
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        getData.users.forEach((value, index) => {
            if(value.id === id){
                value.username = body.username
                value.email = body.email
            }
        })

        fs.writeFileSync('./db/db.json', JSON.stringify(getData))

        res.status(201).send({
            isError: false,
            message: "Update Data Success",
            data: null
        })
    },

    deleteUsers: (req, res) => {
        let id = parseInt(req.params.id)
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))
        let idx = null
        getData.users.forEach((value, index) => {
            if(value.id === id){
                idx = index
            }
        })

        if(idx === null) return req.status(401).send({
            isError: true,
            message: 'Id Not Found', 
            data: null
        })

        getData.users.splice(idx, 1)

        fs.writeFileSync('./db/db.json', JSON.stringify(getData))
        res.status(201).send({
            isError: false,
            message: "Delete Data Success",
            data: null
        })
    }
}