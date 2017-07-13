import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link, Text } from '../styled/Content';

export default class Content extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    isFocused: PropTypes.bool,
    isRemovable: PropTypes.bool,
    markedForRemoval: PropTypes.bool,
  }

  render() {
    const { children, href, isFocused, isRemovable, markedForRemoval } = this.props;
    const styledProps = { isFocused, isRemovable, markedForRemoval };

    return href ? (
      <Link {...styledProps} href={href} tabIndex="-1">
        {children}
      </Link>
    ) : (
      <Text {...styledProps}>{children}</Text>
    );
  }
}
