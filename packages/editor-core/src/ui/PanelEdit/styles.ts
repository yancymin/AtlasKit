import { akColorN400, akColorPrimary1, akColorN20 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import ToolbarButtonDefault from '../ToolbarButton';

// tslint:disable-next-line:variable-name
export const RemoveButtonWrapper = styled.span`
  border-left: 1px solid ${akColorN400};
  padding-left: 5px;
  margin-left: 5px;

  & :hover {
    background: ${akColorPrimary1};
    border-radius: 3px;
    color: ${akColorN20}
  }
`;

// tslint:disable-next-line:variable-name
export const ToolbarButton: any = styled(ToolbarButtonDefault)`
  margin: 5px 3px;
  display: inline-block;

  & :hover {
    background: ${akColorPrimary1};
    border-radius: 3px;
    color: ${akColorN20};
  }
`;

// tslint:disable-next-line:variable-name
export const ToolbarButtonSelected: any = styled(ToolbarButtonDefault)`
  margin: 5px 3px;
  display: inline-block;
  background: ${akColorPrimary1};
  border-radius: 3px;

  button {
    background: none !important;
  }
`;
