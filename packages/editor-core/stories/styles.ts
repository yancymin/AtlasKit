// import {
//   akEditorCodeBackground,
//   akEditorCodeBlockPadding,
//   akEditorCodeFontFamily,
// } from '../src/styles';

import {
  // akBorderRadius,
  akColorN40,
  akColorN300,
  akColorN800,
} from 'akutil-shared-styles';

import styled from 'styled-components';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  & .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 12px 20px;

    & blockquote {
      border-left: 4px solid ${akColorN40};
      color: ${akColorN300};

      &::before, &::after {
        content: none;
      }
      & > *:last-child {
        display: block;
      }
    }
  }

  & div.toolsDrawer {
    padding: 8px 16px;
    background: ${akColorN800};

    & label {
      display: flex;
      color: white;
      align-self: center;
      padding-right: 8px;
    }

    & > div {
      // padding: 4px 0;
    }

    & button {
      margin: 4px 0;
    }
  }

  & legend {
    margin: 8px 0;
  }
`;

    // & pre {
    //   font-family: ${akEditorCodeFontFamily};
    //   background: ${akEditorCodeBackground};
    //   padding: ${akEditorCodeBlockPadding};
    //   border-radius: ${akBorderRadius};
    // }
