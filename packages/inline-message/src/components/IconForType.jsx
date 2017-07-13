import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import typesMapping, { types } from './types';
import IconWrapper from '../styled/IconForType';

export default class SelectedIconForType extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(types).isRequired,
  }

  render() {
    const {
      [this.props.type]: {
        icon: SelectedIcon,
        iconColor,
        iconSize,
      },
    } = typesMapping;

    return (
      <IconWrapper iconColor={iconColor}>
        <SelectedIcon
          label="Inline message icon"
          size={iconSize}
        />
      </IconWrapper>
    );
  }
}
