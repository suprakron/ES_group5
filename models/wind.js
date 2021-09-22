const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    sensorId : {type : String, required: true},
    windSpeed : {type : Number, required : true},
    timeStemp : {type : Date, default : Date.now()}
})

const wind = mongoose.model("Wind", schema)

module.exports = wind