import styled from 'styled-components';
import {
  akEditorTableBorderRadius,
  akEditorTableBorder,
  akEditorTableBorderSelected,
  akEditorTableToolbarSize
} from '../../../styles';
import {
  HeaderButtonDefault,
  InsertMarkerDefault,
  InsertButtonDefault,
  LineMarkerDefault,
} from '../styles';

// tslint:disable-next-line:variable-name
export const RowContainer = styled.div`
  position: absolute;
  top: 1px;
  left: -${akEditorTableToolbarSize - 1}px;
  width: ${akEditorTableToolbarSize}px;
  box-sizing: border-box;
`;
// tslint:disable-next-line:variable-name
export const RowInner = styled.div`
  display: flex;
  flex-direction: column;
  & > div:last-child button {
    border-bottom-left-radius: ${akEditorTableBorderRadius};
  }
`;
// tslint:disable-next-line:variable-name
export const RowControlsButtonWrap = styled.div`
  position: relative;
  margin-top: -1px;
  &:hover, &.active {
    z-index: 1;
  }
`;
// tslint:disable-next-line:variable-name
export const HeaderButton = styled(HeaderButtonDefault)`
  border-right: none;
  border-bottom: 1px solid ${akEditorTableBorder};
  height: 100%;
  width: ${akEditorTableToolbarSize - 1}px;

  &:hover, .active > &, .tableSelected & {
    border-right: 1px solid ${akEditorTableBorderSelected};
    width: ${akEditorTableToolbarSize}px;
  }
`;
// tslint:disable-next-line:variable-name
export const InsertRowButtonWrap = styled.div`
  position: absolute;
  bottom: -10px;
  left: -20px;
  height: 20px;
  width: 20px;
  z-index: 2;
  cursor: pointer;
  &:hover > div {
    display: flex;
  }
`;
// tslint:disable-next-line:variable-name
export const InsertRowMarker = styled(InsertMarkerDefault)`
  top: 7px;
  right: 3px;
`;
// tslint:disable-next-line:variable-name
export const InsertRowButtonInner = styled(InsertButtonDefault)`
  left: 5px;
`;
// tslint:disable-next-line:variable-name
export const RowLineMarker = styled(LineMarkerDefault)`
  height: 2px;
  top: 8px;
  left: 20px;
`;
