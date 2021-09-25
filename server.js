const express = require("express")
const mongoose = require("mongoose")
let genData = require('./models/gen')

const windrouter = require("./routers/index")
// genData.genData()

mongoose.connect("mongodb://localhost/wind").then(() => {console.log("db connect")}).catch((error) => {throw error})
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public')) //สร้างโฟลเดอร์ไว้ใน public
app.use("/", windrouter)



app.listen(4000,() => {
    console.log("start server http://localhost:4000")
})

