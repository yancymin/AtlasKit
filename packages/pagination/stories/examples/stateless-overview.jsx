import React, { PureComponent } from 'react';
import { PaginationStateless } from '@atlaskit/pagination';

export default class extends PureComponent {
  render() {
    return (
      <PaginationStateless
        current={4}
        total={10}
        onSetPage={page => console.log(page)}
      />
    );
  }
}
