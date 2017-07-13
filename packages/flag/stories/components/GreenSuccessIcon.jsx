import React, { PureComponent } from 'react';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { akColorG300 } from '@atlaskit/util-shared-styles';

export default class GreenSuccessIcon extends PureComponent {
  render() {
    return (
      <div style={{ color: akColorG300 }}>
        <SuccessIcon label="Info" />
      </div>
    );
  }
}
