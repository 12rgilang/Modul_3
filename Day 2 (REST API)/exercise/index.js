const express = require('express')
const app = express()
app.use(express.json())



const PORT = 5002

app.get('/', (req, res) => {
    req.status(201).send(`<h1>Tes</>`)
})

const {usersRouter} = require('./routers')
app.use('/users', usersRouter)



app.listen(PORT, () => console.log(`API is Running on port ${PORT}`))