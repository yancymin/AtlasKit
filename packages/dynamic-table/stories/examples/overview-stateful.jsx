import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { action } from '@kadira/storybook';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head, rows } from './sample-data';

const Wrapper = styled.div`
  min-width: 600px;
`;

export default class extends PureComponent {
  render() {
    return (
      <Wrapper>
        <DynamicTable
          caption={caption}
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={action('onSort')}
          onSetPage={action('onSetPage')}
        />
      </Wrapper>
    );
  }
}
