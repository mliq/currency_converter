var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

/* GET home page. */
router.get('/get', function (req, res, next) {
    var from = req.query.from;
    var to = req.query.to;
    console.log(req.query);
    request('http://jsonrates.com/get/?from=' + from + '&to=' + to + '&apiKey=jr-5be588f08ecd7855e0c8266a4aeb7d36', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });

});

module.exports = router;
