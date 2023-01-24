const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { userRouter, busRouter } = require("./router");
app.use("/user", userRouter);
app.use("/bus", busRouter);

app.listen(5000, () => {
	console.log("connected to port 5000");
});
