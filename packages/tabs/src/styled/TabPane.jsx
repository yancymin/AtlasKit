import styled from 'styled-components';

import { margin } from './constants';

const TabPaneDiv = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 0%; /* FF http://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox */
  padding-left: ${2 * margin}px;
  ${({ selected }) => (selected ? '' : 'display: none')}
`;

export default TabPaneDiv;
