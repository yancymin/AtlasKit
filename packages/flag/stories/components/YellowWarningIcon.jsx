import React, { PureComponent } from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { akColorY300 } from '@atlaskit/util-shared-styles';

export default class YellowWarningIcon extends PureComponent {
  render() {
    return (
      <div style={{ color: akColorY300 }}>
        <WarningIcon label="Info" />
      </div>
    );
  }
}
