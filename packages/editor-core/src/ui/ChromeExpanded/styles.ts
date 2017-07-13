import styled from 'styled-components';
import {
  akEditorBlockquoteBorderColor,
  akEditorSubtleAccent,
  akEditorMentionSelected,
  akEditorTableCellSelected,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableFloatingControls,
} from '../../styles';
import {
  akBorderRadius,
  akGridSize,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

export const createNestedListStyles = (): any => {
  const styles = {};
  const listStyleTypes = ['decimal', 'lower-alpha', 'lower-roman'];
  let key = '';
  for (let i = 0; i < 9; i++) {
    styles[`${key} > li`] = {
      listStyleType: listStyleTypes[i % 3]
    };
    key += ' > li > ol';
  }
  return styles;
};

// tslint:disable-next-line:variable-name
export const Container = styled.div`
  background-color: white;
  border: 1px solid ${akEditorSubtleAccent};
  box-sizing: border-box;
  border-radius: ${akBorderRadius};

  /* Create a stacking context, so that the toolbar can be placed above the content */
  position: relative;

  &:focus {
    outline: none;
  }
`;

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  position: relative;

  & .ie11 {
    overflow: visible;
    word-wrap: break-word;
  }

  .ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    outline: none;
    padding: 12px 20px;
  }

  .ProseMirror ul, .ProseMirror ol {
    padding-left: 30px;
    cursor: default;
  }

  .ProseMirror blockquote {
    padding-left: ${akGridSizeUnitless * 2}px;
    border-left: 2px solid ${akEditorBlockquoteBorderColor};
    margin: ${akGridSizeUnitless * 1.5}px 0 0 0;
    margin-right: 0;

    [dir="rtl"] & {
      padding-left: 0;
      padding-right: ${akGridSizeUnitless * 2}px;
    }

    &:first-child {
      margin-top: 0;
    }

    &::before {
      content: "";
    }

    &::after {
      content: "";
    }
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror li {
    position: relative;
    /* Dont do weird stuff with marker clicks */
    pointer-events: none;

    > p:not(:first-child) {
      margin: 4px 0 0 0;
    }
  }
  .ProseMirror ol {
    ${createNestedListStyles()}
  }

  .ProseMirror li > * {
    pointer-events: auto
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-selectednode {
    outline: none;
  }

  .ProseMirror-selectednode:empty {
    outline: 2px solid #8cf;
  }

  .ProseMirror-selectednode .ak-mention {
    background: ${akEditorMentionSelected};
  }

  /* Make sure li selections wrap around markers */
  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }

  .ProseMirror blockquote table,
  .ProseMirror blockquote table:last-child {
    display: inline-table;
  }
  .ProseMirror table {
    border-collapse: collapse;
    margin: 20px 8px;
    width: auto;
    border: 1px solid ${akEditorTableBorder};

    & {
      * {
        box-sizing: border-box;
      }

      tbody {
        border-bottom: none;
      }
      th td {
        background-color: white;
        font-weight: normal;
      }
      th, td {
        min-width: 3em;
        vertical-align: top;
        border: 1px solid ${akEditorTableBorder};
        border-right-width: 0;
        border-bottom-width: 0;
        padding: 6px 10px;
        /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */
        background-clip: padding-box;

        & p {
          margin: 0;
        }
      }
      th {
        background-color: ${akEditorTableFloatingControls};
        font-weight: bold;
        text-align: left;
      }
      .selectedCell, .hoveredCell {
        position: relative;
        border-color: ${akEditorTableBorderSelected};
        border-width: 1px;
      }
      /* Give selected cells a blue overlay */
      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0; right: 0; top: 0; bottom: 0;
        background: ${akEditorTableCellSelected};
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
`;

// tslint:disable-next-line:variable-name
export const Footer = styled.div`
  font-size: 14px;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

// tslint:disable-next-line:variable-name
export const FooterActions = styled.div`
  display: flex;
  flex-grow: 1;
`;

// tslint:disable-next-line:variable-name
export const IconButton = styled.div`
  cursor: pointer;
  font-size: inherit;
  background: none;
  border: none;
  padding: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

// tslint:disable-next-line:variable-name
export const Toolbar = styled.div`
  align-items: flex-start;
  display: flex;
  height: 40px;
  padding: ${akGridSize} ${akGridSize} 0;
  position: relative;

  & > * {
    align-items: center;
    display: flex;
    margin-left: ${akGridSizeUnitless/2}px;
    /* Firefox|IE toolbar icons fix: https://product-fabric.atlassian.net/browse/ED-1787 */
    min-width: 0;

    &:first-child {
      margin-left: 0;
      margin-right: ${akGridSize};
    }
  }
`;

// tslint:disable-next-line:variable-name
export const SecondaryToolbar = styled.div`
  align-items: flex-start;
  display: flex;
`;
