const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Mengambil data yang dikirimkan oleh client melalui body

const PORT = 5005

app.get('/', (req, res) => {
    res.status(201).send('<h1>Welcome to JCWD-2302 API</h1>')
})

// Import Router
const {studentsRouter, titanicRouter} = require('./routers')
app.use('/students', studentsRouter)
app.use('/titanic', titanicRouter)

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))