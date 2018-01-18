var express = require('express');
var request = require('request');
var path = require('path');
var http = require('http');
var app = express();

//conf = require(__dirname + '/../' + path.normalize (process.env.CONF ? 'conf-localhost.json'));

conf = require(path.join(__dirname, '..', process.env.CONF || 'conf-localhost.json'))


// här proxas alla anrop mot `/*` vidare till kanbanflow
// request är lite magisk på det viset att man kan pipa en request till en response, och den kommer att se till att det bara funkar trots att det egentligen inte är rena strömmar det handlar om.

http.createServer(function (req, res) {
    console.log("Request is: ", req.url, req.path);
    app.get( '*', function(req, res) {
        console.log("Res is: ", res);
        request(conf.kbBaseUrl + req.url).pipe(res);
        console.log("Res2 is: ", res);
    });
    res.write(); //write a response to the client
    res.end(); //end the response
  }).listen(40400); //the server object listens on port 8080

