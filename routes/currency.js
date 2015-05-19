var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var currencyPairs = require('../models/currencypairs.js');

/* GET currency. */
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

/* POST presets. */
router.post('/save', function(req, res, next) {
    console.log(req.body);
    currencyPairs.create(req.body, function (err, assignment) {
        if (err) return next(err);
        res.redirect('/');
    })
});

/* GET presets. */
router.get('/load', function (req, res, next) {
    currencyPairs.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = router;
