#!/usr/bin/node

var request = require('request');
var express = require('express');
var app = express();

SSLCertificateFile    /etc/letsencrypt/live/dev.oagov.com/cert.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/dev.oagov.com/privkey.pem

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/dev.oagov.com/cert.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/dev.oagov.com/privkey.pem')
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

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3334);
