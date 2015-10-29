#!/usr/bin/node

var request = require('request');
var express = require('express');
var app = express();

var apiUrl = 'http://gsa.gov';

app.use('/', function(req, res) {
    var url = apiUrl + req.url;
    request({
    	uri: url
    }, function(error, response, html) {
    	if (!error && response.statusCode == 200) {
            var json = JSON.parse(html)
        	res.header('Access-Control-Allow-Origin', '*').send(json);
    	}
    	else{
    		res.header('Access-Control-Allow-Origin', '*').status(404).send('404');
    	}
    })
});

app.listen(process.env.PORT || 3334);
