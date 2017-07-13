/* eslint-disable import/no-extraneous-dependencies */
// @flow
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import styled from 'styled-components';
import FieldRange from '..';

const Container = styled.div`
  width: 500px;
`;

// We can't use storybook "action" here since it doesn't transpile Symbol and fails on IE
const onChange = (value) => {
  // eslint-disable-next-line no-console
  console.log('onChange', value);
};

storiesOf('FieldRange', {})
  .add('default', () => (
    <Container>
      <FieldRange value={20} min={0} max={100} onChange={onChange} />
    </Container>
  ));
