import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AkBadge from '@atlaskit/badge';

export default class RandomBadge extends PureComponent {
  static propTypes = {
    theme: PropTypes.oneOf(['default', 'dark']),
  }

  static defaultProps = {
    theme: 'default',
  }

  render() {
    const badgeNumber = Math.random() > 0.3 ? (Math.round(Math.random() * 200)) : 0;

    return badgeNumber > 0 ?
      (<AkBadge
        appearance={Math.random() > 0.5 ? 'primary' : null}
        theme={this.props.theme}
        value={badgeNumber}
      />) : null;
  }
}

