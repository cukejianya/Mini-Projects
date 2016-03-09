var _ = require('lodash');
var $ = require('jquery');
var NewsList = require('./newsList');
var React = require('react');

$.ajax({
  url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  dataType: 'json'
}).then(function(stories) {
  var detailDefereds = _(stories.slice(0, 30)).map(function (itemId) {
    return $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json',
      dataType: 'json'
    });
  }).value();
  return $.when.apply($, detailDefereds);
}).then(function () {
  var items = _(arguments).map(function (argument) {
    return argument[0];
  }).value();

  React.render(<NewsList items={items}/>, $('#content')[0]);
});
