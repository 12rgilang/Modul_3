const express = require("express")
const app = express()
const cors = require("cors")

const PORT = 5000

app.use(express.json())
app.use(cors())
app.use('/Public', express.static('Public'))

const {userRouter, travelRouter} = require("./router")
app.use("/users", userRouter)
app.use("/bus", travelRouter)

app.listen(PORT, () => console.log(`API is running on port ${PORT}`))