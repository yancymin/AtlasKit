import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import RemoveIcon from '@atlaskit/icon/glyph/cross';
import Button from '../styled/Remove';

export default class Remove extends PureComponent {
  static propTypes = {
    removeText: PropTypes.string.isRequired,
    isRounded: PropTypes.bool,
    onHoverChange: PropTypes.func,
    onRemoveAction: PropTypes.func,
  }

  onKeyPress = (e) => {
    const spacebarOrEnter = (e.key === ' ' || e.key === 'Enter');

    if (spacebarOrEnter) {
      e.stopPropagation();
      this.props.onRemoveAction();
    }
  }

  onMouseOver = () => {
    this.props.onHoverChange(true);
  };

  onMouseOut = () => {
    this.props.onHoverChange(false);
  }

  render() {
    const { isRounded, onRemoveAction, removeText } = this.props;

    return (
      <Button
        aria-label={removeText}
        isRounded={isRounded}
        onClick={onRemoveAction}
        onKeyPress={this.onKeyPress}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        type="button"
      >
        <RemoveIcon label={removeText} size="small" />
      </Button>
    );
  }
}
