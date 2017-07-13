import {
  akEditorSubtleAccent,
} from '../../styles';
import {
  akBorderRadius,
  akColorN50
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Input = styled.input`
  // Normal .className gets overridden by input[type=text] hence this hack to produce input.className
  input& {
    background-color: white;
    border: 1px solid ${akEditorSubtleAccent};
    border-radius: ${akBorderRadius};
    box-sizing: border-box;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;

    &:hover {
      border-color: ${akColorN50};
      cursor: pointer;
    }
  }
`;
