var $ = require('jquery');
var NewsList = require('./newsList');
var React  = require('react');

$.ajax({
  url: '/json/sample.json'
}).then(function(items) {
  React.render(<NewsList items={items}/>, $('#content')[0]);
});
