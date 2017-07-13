import React from 'react';
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';

const Heading = styled.h3`
  font-size: 14px;
  margin: 10px 0;
`;

const Lozenges = styled.div`
  margin-bottom: 20px;
  max-width: 440px;
  display: flex;
  justify-content: space-between;
`;

const LozengeExamples = () => (
  <div>
    <div>
      <Heading>Subtle Lozenges</Heading>
      <Lozenges>
        <Lozenge>Default</Lozenge>
        <Lozenge appearance="success">Success</Lozenge>
        <Lozenge appearance="removed">Removed</Lozenge>
        <Lozenge appearance="inprogress">In Progress</Lozenge>
        <Lozenge appearance="new">New</Lozenge>
        <Lozenge appearance="moved">Moved</Lozenge>
      </Lozenges>
    </div>
    <div>
      <Heading>Bold Lozenges</Heading>
      <Lozenges>
        <Lozenge isBold>Default</Lozenge>
        <Lozenge appearance="success" isBold>Success</Lozenge>
        <Lozenge appearance="removed" isBold>Removed</Lozenge>
        <Lozenge appearance="inprogress" isBold>In Progress</Lozenge>
        <Lozenge appearance="new" isBold>New</Lozenge>
        <Lozenge appearance="moved" isBold>Moved</Lozenge>
      </Lozenges>
    </div>
    <div>
      <Heading>Overflowed Lozenge</Heading>
      <Lozenges>
        <Lozenge>Long text will be truncated after a point.</Lozenge>
      </Lozenges>
    </div>
  </div>
);

export default LozengeExamples;
