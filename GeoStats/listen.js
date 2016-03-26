var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var request = require('./server/request.js');

var port = process.env.PORT || process.env.app_port || 8080;
app.use(express.static(path.join(__dirname, 'view')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.post('/coords/', function(req, res) {
  console.log("Data recieved");
  request.convertCoords(req.body.lat, req.body.lng, [req.body.type, req.body.place], function(err, result){
    console.log("Data sent: \n",result);
    res.end(JSON.stringify(result));
  });
});

app.listen(port, function(){
  console.log('listening on *:', port);
});
