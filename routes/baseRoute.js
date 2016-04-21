/**
 * Created by crell on 2016/4/10.
 */
var express = require('express');
var request = require('request');

var config = require('../config');
var router = express.Router();

router.post('/', function(req, res) {
    var url = req.baseUrl;
    var body = req.body;

    var options = {
        url: config.interface + url,
        method: 'POST',
        json:true,
        body: body
    };

    request(options, function (error, response, data) {
        if (!error) {
            res.json(data);
        }
    });

});

router.get('/', function(req, res) {
    var url = req.baseUrl;
    var body = req.body;

    var options = {
        url: config.interface + url,
        method: 'GET',
        json:true,
        body: body
    };

    request(options, function (error, response, data) {
        if (!error) {
            res.json(data);
        }
    });

});
module.exports = router;