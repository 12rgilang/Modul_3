const{userRouter, hotelRouter} = require("./router")
const express = require("express")
const app = express()
const cors = require("cors")

const PORT = 7000

app.use(express.json())
app.use(cors())


app.use("/users", userRouter);
app.use("/hotels", hotelRouter)

app.listen(PORT, () => console.log(`API is running on port ${PORT}`))