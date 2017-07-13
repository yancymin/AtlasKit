import { akEditorPopupText } from '../../styles';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Input = styled.input`
  // Normal .className gets overridden by input[type=text] hence this hack to produce input.className
  input& {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-sizing: content-box;
    color: ${akEditorPopupText};
    flex-grow: 1;
    font-size: 13px;
    line-height: 20px;
    padding: 0;

    /* IE11 fixes */
    height: 20px;
    min-width: 145px;

    /* Hides IE10+ built-in [x] clear input button */
    &::-ms-clear {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${akEditorPopupText};
      opacity: 0.5;
    }
  }
`;
