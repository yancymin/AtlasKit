/* tslint:disable:variable-name */
import styled, {keyframes} from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: ${akGridSizeUnitless * 32}px;
  box-sizing: border-box;
  *, *:before, *:after {box-sizing: border-box;}
`;

export const SliderContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-top: ${akGridSizeUnitless}px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImageUploader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
const droppingAnimation = `
  border-color: #0e56c4;
  animation: ${spin} 8s linear infinite;
`;

export interface DragZoneProps {
  isDroppingFile: boolean;
}

export const DragZone = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  position: relative;
  border-radius: 100%;
  transition: background-color .3s cubic-bezier(0.215, 0.61, 0.355, 1);

  &:after {
    content: '';
    border: 2px dashed #d0d6d0;
    border-radius: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: border-color .3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  ${(props: DragZoneProps) => props.isDroppingFile && `
    background-color: #ddecfe;
    &:after {
      ${droppingAnimation}
    }
  ` || ''}
`;

export const DragZoneImage = styled.img`
  width: 100px;
`;

export const DragZoneText = styled.div`
  text-align: center;
`;
