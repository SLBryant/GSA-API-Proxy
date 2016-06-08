#!/usr/bin/node
//var fs = require('fs');
var request = require('request');
var express = require('express');
var app = express();

var options = {
  //key: fs.readFileSync('/etc/letsencrypt/live/dev.oagov.com/cert.pem'),
  //cert: fs.readFileSync('/etc/letsencrypt/live/dev.oagov.com/privkey.pem')
};


var apiUrl = 'http://gsa.gov';

app.use('/proxy/', function(req, res) {
    var url = apiUrl + req.url;
    request({
    	uri: url
    }, function(error, response, html) {
    	if (!error && response.statusCode == 200) {
		var json = JSON.parse(html)
        	res.header('Access-Control-Allow-Origin', '*').json(json);
    	}
    	else{
    		res.header('Access-Control-Allow-Origin', '*').status(404).send('404');
    	}
    })
});

https.createServer(options, app).listen(3334);
