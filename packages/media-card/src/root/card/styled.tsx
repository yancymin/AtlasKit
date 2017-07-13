/* tslint:disable:variable-name */
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load-zz';
import {CardAppearance} from '../..';

export interface LazyLoadCardProps {
  onContentVisible: Function;
  throttle: number;
  appearance?: CardAppearance;
  wrapperClassName?: string;
}

export const LazyLoadCard = styled(LazyLoad)`
  ${({appearance}: LazyLoadCardProps) => `

  `}
`;
