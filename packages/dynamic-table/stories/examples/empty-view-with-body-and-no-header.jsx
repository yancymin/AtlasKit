import React, { PureComponent } from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';

export default class extends PureComponent {
  render() {
    return (
      <DynamicTableStateless
        emptyView={<h2>The table is empty and this is the empty view</h2>}
      />
    );
  }
}
