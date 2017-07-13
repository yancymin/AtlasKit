import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import RouterLinkComponent from './RouterLinkComponent';
import { AkContainerTitle } from '../../../src/index';
import nucleusLogo from '../../nucleus.png';

export default class RouterHeader extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
  }

  render() {
    return (
      <AkContainerTitle
        href={this.props.to}
        icon={<img alt="nucleus" src={nucleusLogo} />}
        linkComponent={RouterLinkComponent}
        text="AtlasCat"
      />
    );
  }
}
