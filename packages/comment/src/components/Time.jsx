import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

export default class Time extends PureComponent {
  static propTypes = {
    /** The time of the comment. */
    children: PropTypes.node,
    /** The URL of the link. If not provided, the element will be rendered as text. */
    href: PropTypes.string,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
  }

  render() {
    const { children, href, onClick, onFocus, onMouseOver } = this.props;
    return (
      <Field
        href={href}
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </Field>
    );
  }
}
