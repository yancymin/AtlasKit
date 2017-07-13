import styled from 'styled-components';
import { akColorR50, akColorN100, akColorR400 } from '@atlaskit/util-shared-styles';

export const AvatarRow = styled.div`
  align-items: baseline;
  display: flex;
  margin-top: 10px;
`;
export const AvatarCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
`;
export const AvatarColLabel = styled.div`
  align-items: center;
  background-color: #F4F5F7;
  border-radius: 0.33em;
  color: #344563;
  display: flex;
  font-size: 0.7em;
  font-weight: 500;
  height: 2.1em;
  justify-content: center;
  margin-top: 10px;
  padding: 0 1em;
  text-transform: uppercase;
`;

export const Wrapper = styled.div`
  padding: 2em;
`;

export const Note = styled.div`
  color: ${akColorN100};
  font-size: ${props => (props.size === 'large' ? '1.1em' : '0.8rem')};
  margin-top: 4px;
  margin-bottom: 6px;

  code {
    background-color: ${akColorR50};
    border-radius: 0.2em;
    color: ${akColorR400};
    font-size: 0.85em;
    line-height: 1.1;
    padding: 0.1em 0.4em;
  }
`;

export const DivPresence = styled.div`
  align-items: center;
  background-color: rebeccapurple;
  color: white;
  display: flex;
  font-size: 0.75em;
  font-weight: 500;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
`;
