var express = require('express')
var app = express();
var bodyparser = require('body-parser');
var path = require('path');

app.use(express.static(path.join(__dirname, 'view')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.post('/coords/', function(req, res) {
  console.dir(req.body);
  res.send('reverse');
})

app.listen(3000, function(){
  console.log('listening on *:3000');
});
