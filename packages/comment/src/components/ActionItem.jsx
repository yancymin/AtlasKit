import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';

export default class ActionItem extends PureComponent {
  static propTypes = {
    /** The content to render inside the action button. */
    children: PropTypes.node,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
  }

  render() {
    const { children, onClick, onFocus, onMouseOver } = this.props;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <span
        onClick={onClick}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
      >
        <Button
          appearance="subtle-link"
          spacing="none"
          type="button"
        >
          {children}
        </Button>
      </span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
