import React from 'react'

export default class App extends React.Component {

  propTypes: {
    initialTimeRemaining: React.PropTypes.number.isRequired,
    interval: React.PropTypes.number,
    formatFunc: React.PropTypes.func,
    tickCallback: React.PropTypes.func,
    completeCallback: React.PropTypes.func
  }

  compMounted: false

  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: this.props.initialTimeRemaining,
      timeoutId: null,
      prevTime: null
    };
  }

  static get defaultProps() {
    return {
      interval: 1000,
      formatFunc: null,
      tickCallback: null,
      completeCallback: null
    };
  }

  componentDidMount() {
    this.compMounted = true;
    this.tick();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
    this.setState({prevTime: null, timeRemaining: newProps.initialTimeRemaining});
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining > 0 && this.compMounted) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.compMounted = false;
    clearTimeout(this.state.timeoutId);
  }

  tick() {
    let currentTime = Date.now();
    let dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    let interval = this.props.interval;

    // correct for small letiations in actual timeout time
    let timeRemainingInInterval = (interval - (dt % interval));
    let timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    let timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    let countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    if (this.compMounted) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick.bind(this), timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      });
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback(); }
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  }

  getFormattedTime(milliseconds) {
    return this.props.formatFunc(milliseconds);
  }

  render() {
    let timeRemaining = this.state.timeRemaining;

    return (
      <div className='timer'>
        {this.getFormattedTime(timeRemaining)}
      </div>
    );
  }
}
