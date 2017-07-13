import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ActionItem from './ActionItem';

export default class Edited extends PureComponent {
  static propTypes = {
    /** Content to render indicating that the comment has been edited. */
    children: PropTypes.node,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
  };

  render() {
    const { children, onClick, onFocus, onMouseOver } = this.props;
    return (
      <ActionItem
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        {children}
      </ActionItem>
    );
  }
}
