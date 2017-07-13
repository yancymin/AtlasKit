import React, { PureComponent } from 'react';
import Pagination from '@atlaskit/pagination';

export default class extends PureComponent {
  render() {
    return (
      <Pagination
        defaultCurrent={6}
        total={10}
        onSetPage={page => console.log(page)}
      />
    );
  }
}
