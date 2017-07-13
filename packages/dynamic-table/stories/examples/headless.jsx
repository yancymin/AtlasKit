import React, { PureComponent } from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { rows } from './sample-data';

export default class extends PureComponent {
  render() {
    return (
      <DynamicTable
        rows={rows}
      />
    );
  }
}
