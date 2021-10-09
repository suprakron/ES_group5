const mongoose = require("mongoose")   //ฐานข้อมูล

const schema = new mongoose.Schema({
    sensorId : {type : String, required: true}, //การสร้างตัวแปร
    windSpeed : {type : Number, required : true},
    timeStemp : {type : Date, default : Date.now()},minute : {type : Number, required : true}, day : {type : Number, required : true}, week : {type : Number, required : true}, mouth : {type : Number, required : true}   //สร้างตัวแปรขึ้นมาเพื่อให้มันเรียกใช้โดยใช้ตัวเลขในการเรียก type number เรียกใช้วัน แยกเป็น วัน วีค เดือน

})

const wind = mongoose.model("Wind", schema)
module.exports = wind //เก็บไว้ที่ตัวแปร