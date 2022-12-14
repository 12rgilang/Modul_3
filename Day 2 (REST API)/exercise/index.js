const express = require('express')
const app = express()
app.use(express.json())



const PORT = 5002

app.get('/', (req, res) => {
    req.status(201).send(`<h1>Tes</>`)
})

const {usersRouter, moviesRouter} = require('./routers')
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)



app.listen(PORT, () => console.log(`API is Running on port ${PORT}`))