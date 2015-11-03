var express = require('express')
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'view')));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});
