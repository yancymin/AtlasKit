import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@atlaskit/avatar';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import WorldIcon from '@atlaskit/icon/glyph/world';

import PrivacyIconOuter from '../../styled/PrivacyIconOuter';
import ResultBase from './ResultBase';

const privacyIcons = {
  none: null,
  private: <LockFilledIcon label="Private group" size="small" />,
  public: <WorldIcon label="Public group" size="small" />,
};

const noOp = () => {};

// ===================================================================
// If adding a prop or feature that may be useful to all result types,
// add it to ResultBase instead
// ===================================================================

export default class RoomResult extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    isHoverStylesDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    isTabbingDisabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    privacy: PropTypes.oneOf(['none', 'private', 'public']),
    resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    topic: PropTypes.string,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isHoverStylesDisabled: false,
    isSelected: false,
    isTabbingDisabled: false,
    onClick: noOp,
    onMouseEnter: noOp,
    onMouseLeave: noOp,
    privacy: 'none',
  }

  getPrivacyIcon = key => (
    privacyIcons[key]
      ? <PrivacyIconOuter>{privacyIcons[key]}</PrivacyIconOuter>
      : null
  );

  getAvatar = () => (
    <Avatar
      src={this.props.avatarUrl}
      appearance="square"
      icon={this.getPrivacyIcon(this.props.privacy)}
    />
  )

  render() {
    const {
      isHoverStylesDisabled,
      isSelected,
      isTabbingDisabled,
      name,
      onClick,
      onMouseEnter,
      onMouseLeave,
      resultId,
      topic,
      type,
    } = this.props;
    return (
      <ResultBase
        icon={this.getAvatar()}
        isHoverStylesDisabled={isHoverStylesDisabled}
        isSelected={isSelected}
        isTabbingDisabled={isTabbingDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        resultId={resultId}
        subText={topic}
        text={name}
        type={type}
      />
    );
  }
}
