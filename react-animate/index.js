var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Demo = React.createClass({
  getInitialState: function () {
    return {start: 0};
  },
  componentDidMount: function () {
    this.interval = setInterval(this.count, 5000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  count: function () {
    this.setState({start: this.state.start + 1});
  },
  render: function () {
    console.log(111);
    var style;
    var nodes = [];
    var pos = 0;
    var colors = ['red', 'green', 'blue'];
    for (var i = this.state.start; i < this.state.start + 3; i++) {
      style = {
        left: pos * 100,
        background: colors[i % 3]
      };
      pos++;
      nodes.push(<div className="demo-item" style={style} key={i}></div>);
    }
    return (
      <ReactCSSTransitionGroup className="animate-wrapper" transitionName="demo">
        {nodes}
      </ReactCSSTransitionGroup>
    );
  }
});

React.render(
  <Demo />,
  document.getElementById('wrap')
);
