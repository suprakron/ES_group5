const express = require("express")
const mongoose = require("mongoose")

const app = express()
const windrouter = require("./routers/index")

mongoose.connect("mongodb://localhost/wind").then(() => {console.log("db connect")}).catch((error) => {throw error})

app.use("/", windrouter)

app.listen(3000,() => {
    console.log("start server http://localhost:3000")
})
