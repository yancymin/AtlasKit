import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import NothingWasFoundElement from '../styled/NothingWasFound';

export default class NothingWasFound extends PureComponent {
  static propTypes = {
    noMatchesFound: PropTypes.string,
  }

  render() {
    return (
      <NothingWasFoundElement>
        { this.props.noMatchesFound }
      </NothingWasFoundElement>
    );
  }
}
