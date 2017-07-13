import styled from 'styled-components';
import { search } from '../../shared-variables';

const searchPadding = search.layout.padding;
const SearchInner = styled.div`
  padding: ${searchPadding.top}px ${searchPadding.side}px 0;
`;

SearchInner.displayName = 'SearchInner';
export default SearchInner;
