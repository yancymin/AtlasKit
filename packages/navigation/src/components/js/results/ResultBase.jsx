import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AkNavigationItem } from '../../../../src';

// ==========================================================================================
// This class enforces a standard set of props and behaviour for all result types to support.
// All "-Result" components (PersonResult, RoomResult, etc.) should extend this class to-
// ensure consideration of these props.
// ==========================================================================================

export default class ResultBase extends PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    icon: PropTypes.node,
    isHoverStylesDisabled: PropTypes.bool,
    isSelected: PropTypes.bool.isRequired,
    isTabbingDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subText: PropTypes.string,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isHoverStylesDisabled: false,
    isSelected: false,
    isTabbingDisabled: false,
  }

  handleClick = () => this.props.onClick({
    resultId: this.props.resultId,
    type: this.props.type,
  });

  handleMouseEnter = () => this.props.onMouseEnter({
    resultId: this.props.resultId,
    type: this.props.type,
  });

  render() {
    const {
      caption,
      icon,
      isHoverStylesDisabled,
      isSelected,
      isTabbingDisabled,
      onMouseLeave,
      resultId,
      subText,
      text,
      type,
    } = this.props;
    return (
      <AkNavigationItem
        caption={caption}
        icon={icon}
        isSelected={isSelected}
        isHoverStylesDisabled={isHoverStylesDisabled}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={onMouseLeave}
        resultId={resultId}
        subText={subText}
        tabIndex={isTabbingDisabled ? -1 : null}
        text={text}
        type={type}
      />
    );
  }
}
