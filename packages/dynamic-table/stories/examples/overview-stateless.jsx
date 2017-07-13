import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { action } from '@kadira/storybook';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { caption, head, rows } from './sample-data';

const Wrapper = styled.div`
  min-width: 600px;
`;

export default class extends PureComponent {
  render() {
    return (
      <Wrapper>
        <DynamicTableStateless
          caption={caption}
          head={head}
          rows={rows}
          rowsPerPage={10}
          page={3}
          isFixedSize
          sortKey="term"
          sortOrder="DESC"
          onSort={action('onSort')}
          onSetPage={action('onSetPage')}
        />
      </Wrapper>
    );
  }
}
