import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object, // eslint-disable-line
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ScrollToTop);
