let fs = require('fs'),
    windModel = require('./wind');


exports.genData = () => {
    fs.readFile('new_storage.json', (err, data) => {
        for (let month = 1; month < 2; month++) {
            var lastDay = [2, 4, 6, 9, 11].includes(month) ? 30 : 31;
            for (let day = 1; day <= lastDay; day++) {
                var auDate = "2021-" + pad(month, 2) + "-" + pad(day, 2) + "T";
                for (let hour = 0; hour < 24; hour++) {
                    for (let min = 0; min < 60; min += 1) {
                        var auTime = pad(hour, 2) + ":" + pad(min, 2) + ":57.575Z";
                        var obj = {
                            timeStemp: auDate + auTime,
                            sensorId: 1,
                            windSpeed: getRandomInt(90, 10)
                        }
                        windModel(obj)
                            .save()
                            .catch((err) => {
                                console.log(err.message);
                            });
                    }
                }
            }
        }
        console.log("Success")
    });

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
}