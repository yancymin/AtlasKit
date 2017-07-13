import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkAvatar from '@atlaskit/avatar';

const wrapperStyle = {
  display: 'flex',
};

/* eslint-disable react/prefer-stateless-function */
export default class extends PureComponent {
  propTypes = {
    mention: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }
  render() {
    return (
      <div style={wrapperStyle}>
        <AkAvatar size="small" src={this.props.mention.avatarUrl} />
        <span>{this.props.mention.name}</span>
      </div>
    );
  }
}
