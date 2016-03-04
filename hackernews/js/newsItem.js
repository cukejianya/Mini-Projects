var $ = require('jquery');
var React = require('react');
var url = require('url');
var moment = require('moment');

var NewsItem = React.createClass({
  getCommentLink: function() {
    var commentText = 'discuss';
    if (this.props.item.kids && this.props.item.kids.length) {
      commentText = this.props.item.kids.length + ' comments';
    }

    return (
      <a href={'https://news.ycombintator.com/item?id=' + this.props.item.id}>{commentText}</a>
    );
  },
  getSubtext:function() {
    return (
      <div className="newsItem-subtext">
        {this.props.item.score} points by&nbsp;
        <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>
          {this.props.item.by}
        </a>&nbsp;
        {moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
      </div>
    )
  },
  getTitle: function() {
    return (
      <div className="newsItem-title">
        <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
        <span className="newsItem-domain">
          ({this.getDomain()})
        </span>
      </div>
    );
  },
  getDomain: function() {
    return url.parse(this.props.item.url).hostname;
  },
  render: function () {
    return (
      <div className="newsItem">
        {this.getTitle()}
        {this.getSubtext()}
      </div>
    );
  }
});

module.exports = NewsItem;
