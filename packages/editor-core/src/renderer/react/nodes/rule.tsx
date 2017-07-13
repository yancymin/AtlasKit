import * as React from 'react';
import { PureComponent } from 'react';
import {
  akColorN30A,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const HR = styled.hr`
  border: none;
  background-color: ${akColorN30A};
  height: 2px;
  border-radius: 1px;
`;

export default class Rule extends PureComponent<{}, {}> {
  render() {
    return <HR />;
  }
}
