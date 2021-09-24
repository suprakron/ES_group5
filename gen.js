var express = require('express')
var fs = require('fs');

var app = express()
app.use(express.static(__dirname));

var PORT = 3000


app.get('/', function (req, res) {
    res.render('index')
})


app.listen(PORT)
console.log('Server started at http://localhost:' + PORT);


var data = {}
data.usage = []

var auDate;
var auTime;

var lastDay;
for (let month = 1; month < 13; month++) {
    lastDay = [2, 4, 6, 9, 11].includes(month) ? 30 : 31;
    for (let day = 1; day <= lastDay; day++) {
        auDate = "2021-" + pad(month,2) + "-" + pad(day,2) + "T";
        for (let hour = 0; hour < 24; hour++) {
            for (let min = 0; min < 60; min += 15) {
                auTime = pad(hour, 2) + ":" + pad(min, 2) + ":57.575Z";
                var obj = {
                    timestamp: { "$date":auDate+ auTime },
                    sensor_id: 1,
                    electronic_usage: getRandomInt(20, 10)
                }
                data.usage.push(obj)
            }
        }
    }
} 


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



fs.writeFile("storage.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('complete');
}
);