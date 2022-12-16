const express = require('express')
const app = express()
app.use(express.json())

const PORT = 5003

app.get('/', (req, res) => {
    res.status(201).send(`<h1>Tes</>`)
})

// Import Router
const {expenseRouter} = require('./routers')
app.use('/expense', expenseRouter)

app.listen(PORT, ()=> console.log(`API is running on port ${PORT}`))