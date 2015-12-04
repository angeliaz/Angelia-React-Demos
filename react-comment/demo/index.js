var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentList = React.createClass({
  render: function () {
    var commmentNodes = this.props.data.map(function (item, index) {
      return (
        <Comment author={item.author} key={index}>{item.text}</Comment>
      )
    });
    return (
      <div className="commentList">
        {commmentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!author || !text) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';

  },
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsList: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      fail: function (xhr, status, err) {
        console.error(this.props.url, stauts, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    var comments = this.state.data;
    comments = comments.concat(comment);
    this.setState({data: comments});
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      dataType: 'json',
      data: comment,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function () {
        console.error(this.props.url, stauts, err.toString());
      }.bind(this)
    });
  },
  // getInitialState() 在组件的生命周期中仅执行一次，用于设置组件的初始化 state 。
  getInitialState: function () {
    return {data: []};
  },
  // componentDidMount 是一个组件渲染的时候被 React 自动调用的方法。
  // 动态更新界面的关键点就是调用 this.setState()
  componentDidMount: function () {
    this.loadCommentsList();
    setInterval(this.loadCommentsList, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('wrap')
);