/* tslint:disable:variable-name */
import styled from 'styled-components';
import {
  akBorderRadius
} from '@atlaskit/util-shared-styles';

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${akBorderRadius};
`;

export const Image = styled.img`
  position: absolute;
  /* Is needed so image is not selected, when dragged */
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
`;

const Mask = styled.div`
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0 0 0 100px rgba(255,255,255,.5);
`;

export const RectMask = styled(Mask)`
  border-radius: ${akBorderRadius};
`;

export const CircularMask = styled(Mask)`
  border-radius: 500px;
`;

export const DragOverlay = styled.div`
  position: absolute;
  width: 100%;
  height:100%;
  cursor: move;
`;
