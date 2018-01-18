var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
var log = require('bog');

conf = require(path.join(__dirname, '..', process.env.CONF || 'conf-localhost.json'))
log.level(conf.loglevel);

// här proxas alla anrop mot `*` vidare till kanbanflow
// request är lite magisk på det viset att man kan pipa en request till en response, och den kommer att se till att det bara funkar trots att det egentligen inte är rena strömmar det handlar om. /Fredrik

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('*', function (req, res) {
    log.info("Request is: ", conf.kbBaseUrl + req.url);
    request(conf.kbBaseUrl + req.url, function (error, response, body) {
        log.debug("Body: ", body);
    }).pipe(res);
});

app.listen(40400);