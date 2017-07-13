import React, { PureComponent } from 'react';
import Pagination from '@atlaskit/pagination';

export default class extends PureComponent {
  render() {
    return (
      <Pagination
        total={10}
        defaultCurrent={4}
        i18n={{ prev: '← Пред', next: 'След →' }}
      />
    );
  }
}
