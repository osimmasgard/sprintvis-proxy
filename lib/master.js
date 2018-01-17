var express = require('express');
var request = require('request');
var path = require('path');
var app = express();

//conf = require(__dirname + '/../' + path.normalize (process.env.CONF ? 'conf-localhost.json'));

conf = require(path.join(__dirname, '..', process.env.CONF || 'conf-localhost.json'))


// här proxas alla anrop mot `/*` vidare till kanbanflow
app.get( '/*', function(req, res) {
    request(conf.kbBaseUrl + req.path).pipe(res);
});