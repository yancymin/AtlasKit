import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const SearchFieldBaseInner = styled.div`
  padding-right: ${2 * gridSize}px; /* pad search text from FieldBase's isLoading spinner */
  display: flex;
  flex-grow: 1;
`;

SearchFieldBaseInner.displayName = 'SearchFieldBaseInner';
export default SearchFieldBaseInner;
