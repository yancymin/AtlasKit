import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { search } from '../../shared-variables';

const SearchBox = styled.div`
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  height: ${search.layout.height}px;
  margin-bottom: ${search.layout.margin.bottom}px;
`;

SearchBox.displayName = 'SearchBox';
export default SearchBox;
