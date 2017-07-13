import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class RouterLinkComponent extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    onMouseDown: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const {
      href,
      children,
      onMouseDown,
      className,
    } = this.props;
    return (href ? <Link
      className={className}
      onMouseDown={onMouseDown}
      to={href}
    >{children}</Link> : children);
  }
}
