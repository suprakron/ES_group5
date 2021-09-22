const Wind = require("../models/wind")

exports.getData = async (req,res,next) => {
    try {
        const result = await Wind.find()

        res.status(201).json({
            result:result,
            message:"ดึงข้อมูลสำเร็จ!!"
        }) //รหัสให้มันทำเสร็จแล้ว แสดง


    } catch (error) {
        next(error)
    }
}

exports.AddData = async (req,res,next) => {
    try {
        const sensorId = Math.random()
        const windSpeed = Math.random()
        const timeStemp = Date.now()

        let wind = new Wind()
        wind.sensorId = sensorId
        wind.windSpeed = windSpeed
        wind.timeStemp = timeStemp

        await wind.save() //ทำที่ละ step ทำที่ละฟังก์ชัน

        res.status(201).json({
            message:"บันทึกข้อมูลสำเร็จ!!"
        })

    } catch (error) {
        next(error)
    }
}

