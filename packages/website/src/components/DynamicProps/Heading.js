import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const style = {
  h1: {
    borderBottom: '1px solid #ddd',
    color: '#333',
    marginBottom: 10,
    paddingBottom: 10,
  },
  h2: {
    borderBottom: '1px solid #ddd',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  h3: {
    color: '#444',
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
};

export default class Heading extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.number,
  }
  static defaultProps = {
    type: 1,
  }
  render() {
    const { children, type } = this.props;
    const HeadingTag = `h${type}`;
    return <HeadingTag style={style[HeadingTag]}>{children}</HeadingTag>;
  }
}
