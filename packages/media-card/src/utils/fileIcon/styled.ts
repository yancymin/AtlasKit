/* tslint:disable:variable-name */
import styled from 'styled-components';
import {size} from '../../styles';

export const FileTypeIcon = styled.div`
  float: left;
  margin-right: 6px;
  position: relative;
  top: 1px;

  &.audio {
    color: #8777D9;
  }

  &.doc {
    color: #0065ff;
  }

  &.image {
    color: #ffc400;
  }

  &.video {
    color: #ff7143;
  }

  &.unknown {
    color: #3dc7dc;
  }

  img {
    ${size('12px !important')}
  }
`;
