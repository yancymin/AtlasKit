import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Size from '../styled/Size';

export default class Logo extends PureComponent {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
    /** The image component containing the product icon and logo text. Provided
    by the chosen logo. Should not be passed down. */
    children: PropTypes.node.isRequired,
    /** The size of the icon, uses the same sizing scheme as in @atlaskit/icon */
    size: PropTypes.string,
    /** Internal prop used for collapsing down to the product type. Provied by the
    chosen logo. Should not be passed down. */
    typeOffsetRatio: PropTypes.number,
  }

  static defaultProps = {
    size: 'medium',
    typeOffsetRatio: 0,
  }

  render() {
    const { collapseTo, size, typeOffsetRatio, children } = this.props;
    return (
      <Size
        collapseTo={collapseTo}
        size={size}
        typeOffsetRatio={typeOffsetRatio}
      >
        {children}
      </Size>
    );
  }
}
