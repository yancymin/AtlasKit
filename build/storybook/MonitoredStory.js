import React from 'react';
import Stats from 'stats.js';

const { requestAnimationFrame, cancelAnimationFrame } = window;
class MonitoredStory extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.rafFn = () => null; // noop
  }

  componentDidMount() {
    const stats = new Stats();
    stats.showPanel(0);
    this.stats.appendChild(stats.dom);

    const animate = () => {
      stats.begin();
      this.props.rafFn();
      stats.end();
      this.rafPointer = requestAnimationFrame(animate);
    };
    this.rafPointer = requestAnimationFrame(animate);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafPointer);
  }

  render() {
    return (
      <div ref={n => (this.stats = n)}>
        {this.props.children}
      </div>
    );
  }
}
MonitoredStory.displayName = 'MonitoredStory';
MonitoredStory.propTypes = {
  children: React.PropTypes.node.isRequired,
  rafFn: React.PropTypes.func,
};

export default MonitoredStory;
