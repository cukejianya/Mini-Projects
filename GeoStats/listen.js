var express = require('express')
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var request = require('./server/request.js');

app.use(express.static(path.join(__dirname, 'view')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.post('/coords/', function(req, res) {
  request.convertCoords(req.body.lat, req.body.lng, req.body.type, function(err, result){
    res.end(JSON.stringify(result));
  });
})

app.listen(3000, function(){
  console.log('listening on *:3000');
});
