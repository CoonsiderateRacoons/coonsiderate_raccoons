var express = require('express');
// var db = require('../db');
var parser = require('body-parser');
var request = require('request');
var getDinner = require('../public/utils/dinnerSearchFunctions.js');

var app = express();
app.use(parser.json());
app.use(express.static('./../public'));

app.get('/random', function(req, res) {
  request('http://food2fork.com/api/search?key=cbac066753a4efb0561542a3a5c1a93b&q=' + "'" + getDinner() + "'" , function (err, response, body) { //find a random recipe
    var parsedBody = JSON.parse(response.body);
    var randomInt = Math.floor(Math.random() * 30);
    res.send(JSON.stringify(parsedBody.recipes[randomInt]));
  })
});
app.get('/specific', function(req, res) {
  var rId = req.url.split('=')[1] || 35382;
  console.log('rId', rId);
  request('http://food2fork.com/api/get?key=cbac066753a4efb0561542a3a5c1a93b&rId=' + rId, function (err, response, body) { //find a specific recipe
    var parsedBody = JSON.parse(response.body);
    console.log('Parsed body: ', parsedBody.recipe);
    res.send(JSON.stringify(parsedBody.recipe));
  })
})


var port = process.env.port || 3000;

app.listen(port, () => {
  console.log('now listening on port: ', port);
})
