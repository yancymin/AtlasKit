import styled from 'styled-components';
import {
  akGridSizeUnitless,
  akColorN800,
  akHelperMixins,
} from '@atlaskit/util-shared-styles';
import placeholderStyles from './placeholderStyles';

const AutocompleteWrapper = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  padding: 0 ${akGridSizeUnitless}px;
`;
AutocompleteWrapper.displayName = 'SingleSelectAutocompleteWrapper';

const AutocompleteInput = styled.input`
  background: none;
  border: 0;
  color: ${akColorN800};
  font-size: 14px;
  margin: 0;
  min-height: ${akGridSizeUnitless * 4.5}px;
  outline: 0;
  padding: 0;
  width: 100%;

  ${akHelperMixins.placeholder(placeholderStyles)}
`;
AutocompleteInput.displayName = 'SingleSelectAutocompleteInput';

export default AutocompleteInput;
export {
  AutocompleteInput,
  AutocompleteWrapper,
};
