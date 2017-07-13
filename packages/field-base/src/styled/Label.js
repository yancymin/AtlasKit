import styled from 'styled-components';
import { labelColor, labelFontSize, labelLineHeight, grid } from './constants';

const LabelWrapper = styled.label`
  display: block;
`;

const inlineEditStyle = `
  padding-bottom: 0;
  padding-left: ${grid}px);
  padding-top: ${grid}px);
`;

const LabelInner = styled.div`
  color: ${labelColor};
  font-size: ${labelFontSize}px;
  font-weight: 600;
  line-height: ${labelLineHeight}
  padding: ${grid * 2.5}px 0 ${grid / 2}px 0;
  ${({ isHidden }) => (isHidden ? 'display: none' : '')}
  ${({ inlineEdit }) => (inlineEdit ? inlineEditStyle : '')}
  ${({ firstChild }) => (firstChild ? `padding-top: ${grid / 2}px` : '')}
`;

const RequiredIndicator = styled.span`
  padding-left: 2px;
`;

export {
  LabelWrapper,
  RequiredIndicator,
  LabelInner,
};
