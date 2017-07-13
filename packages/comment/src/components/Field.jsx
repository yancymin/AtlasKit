import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Span } from '../styled/FieldStyles';

export default class CommentField extends PureComponent {
  static propTypes = {
    hasAuthor: PropTypes.bool,
    children: PropTypes.node,
    href: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
  }

  render() {
    const {
      children,
      hasAuthor,
      href,
      onClick,
      onFocus,
      onMouseOver,
    } = this.props;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (href ?
      <Anchor
        href={href}
        hasAuthor={hasAuthor}
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </Anchor>
    :
      <Span
        hasAuthor={hasAuthor}
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </Span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
