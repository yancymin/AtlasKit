import styled from 'styled-components';
import { getProvided } from '../../theme/util';

const SearchInput = styled.input`
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  border: 0;
  color: ${({ theme }) => getProvided(theme).text};
  flex-grow: 1;
  font-size: 1.4em;
  outline: 0;
`;

SearchInput.displayName = 'SearchInput';
export default SearchInput;
