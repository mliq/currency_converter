var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    var from = "USD";
    var to = "EUR";

    request('http://jsonrates.com/get/?from=' + from + '&to=' + to + '&apiKey=jr-5be588f08ecd7855e0c8266a4aeb7d36', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.
            res.send(body);
        }
    });

    //res.sendFile(path.resolve(__dirname, '../public/views/index.html'))
});

module.exports = router;
