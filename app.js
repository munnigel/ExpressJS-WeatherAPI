const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function (req, res) {
    console.log(req.body.cityInput);
    const query = req.body.cityInput;
    const apiKey = "60d83ccf2efe889de517fbb580608548";
    const url='https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&q=' + query + '&units=metric';

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
            res.write("<h1>Temperature is " + temp + " degree Celcius.</h1>");
            res.write("<div>Weather is " + weatherDescription + ".</div>");
            res.write("<img src='" + imageUrl + "' />");
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log('Server is running on port 3000');
})