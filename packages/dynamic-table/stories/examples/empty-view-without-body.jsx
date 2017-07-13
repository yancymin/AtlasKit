import React, { PureComponent } from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { head } from './sample-data';

export default class extends PureComponent {
  render() {
    return <DynamicTableStateless head={head} />;
  }
}
