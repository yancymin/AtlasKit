import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Heading from './Heading';

const style = {
  chrome: {
    padding: 20,
  },
};

export default class Chrome extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  }
  render() {
    const { children, title } = this.props;

    return (
      <div style={style.chrome}>
        <Heading>{title}</Heading>
        {children}
      </div>
    );
  }
}
