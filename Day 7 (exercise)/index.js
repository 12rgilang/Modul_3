const express = require('express')
const app = express()
app.use(express.json())

const PORT = 2023

app.get('/', (req, res) => {
    req.statusCode(201).send(`<h2> wakwaw </h2>`)
})

const {transactionRouter} = require('./routers')
app.use('/product', transactionRouter)


app.listen(PORT, () => console.log(`API is running on port ${PORT}`))