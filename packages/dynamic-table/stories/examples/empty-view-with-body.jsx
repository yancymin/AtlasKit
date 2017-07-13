import React, { PureComponent } from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { head } from './sample-data';

export default class extends PureComponent {
  render() {
    return (
      <DynamicTableStateless
        head={head}
        emptyView={<h2>The table is empty and this is the empty view</h2>}
      />
    );
  }
}
