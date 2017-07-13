import React from 'react';
import Paginate from '@atlaskit/pagination';

const PaginationExample = () => (
  <div>
    <Paginate
      defaultCurrent={2}
      total={5}
      onSetPage={e => console.log('page changed', e)}
      i18n={{ prev: 'Previous', next: 'Next' }}
    />
  </div>
);

export default PaginationExample;
