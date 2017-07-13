import React, { PureComponent } from 'react';
import HomeCircleIcon from '@atlaskit/icon/glyph/home-circle';
import {
  akColorB500,
  akColorB75,
} from '@atlaskit/util-shared-styles';

export default class Example extends PureComponent {
  render() {
    return (
      <div>
        <HomeCircleIcon primaryColor="rebeccapurple" secondaryColor="yellow" size="xlarge" />
        <HomeCircleIcon primaryColor={akColorB500} secondaryColor={akColorB75} size="xlarge" />
      </div>
    );
  }
}
