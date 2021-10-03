const Wind = require("../models/wind")

exports.render = async (req, res, next) => {
    res.render("index", { title: "dashboard" })
}

exports.getData = async (req, res, next) => {
    try {
        const result = await Wind.find();

        let data = result.map(function (e) {
            return {
                label: e.timeStemp,
                value: e.windSpeed.toString(),
            }
        })


        res.status(201).json({
            data: {
                result: data,
                message: "เรียบร้อยแล้ว...",
            },
        });


    } catch (error) {
        next(error)
    }
}

exports.AddData = async (req, res, next) => {
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
            message: "บันทึกข้อมูลสำเร็จ!!"
        })

    } catch (error) {
        next(error)
    }
}


