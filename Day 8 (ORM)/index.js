const express = require('express')
const app = express()
app.use(express.json())  // Body Parser: Mengambil data yang dikirimkan oleh client melalui body
const cors = require('cors')
app.use(cors())

const PORT = 2023

app.get('/', (req, res) => {
    req.statusCode(201).send(`<h2> wakwaw </h2>`)
})

// const {transactionRouter} = require('./routers')
const {usersRouter, productsRouter} = require('./routers')
app.use('/users', usersRouter)
app.use('/products', productsRouter)
// app.use('/product', transactionRouter)


app.listen(PORT, () => console.log(`API is running on port ${PORT}`))