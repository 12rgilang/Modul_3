const express = require('express')
const app = express()
app.use(express.json())

const PORT = 2022

app.get('/', (req, res) => {
    res.status(201).send(`<h1>Tes</h1>`)
})

// Import Router
const {titanicRouter} = require('./routers')
// app.use('/students', studentsRouter)
app.use('/titanic', titanicRouter)

app.listen(PORT, ()=> console.log(`API is running on port ${PORT}`))