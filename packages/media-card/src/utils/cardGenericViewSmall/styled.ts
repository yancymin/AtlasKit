/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, size, center, centerX, antialiased, ellipsis, borderRadius, spaceAround, easeOutExpo } from '../../styles';
import {
  akColorN20,
  akColorN70
} from '@atlaskit/util-shared-styles';

const imgSize = 32;

export const SmallCard = styled(Root)`
  ${borderRadius}
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: .8s background-color ${easeOutExpo};

  &:hover {
    background-color: ${akColorN20};

    .title {
      color: #0065FF;
    }
  }

  &.loading {
    background: transparent;
    box-shadow: none;
    cursor: default;

    .title, .size {
      ${borderRadius}
      color: transparent;
      background-color: ${akColorN20};
      height: 10px;
    }

    .size {
      width: 50%;
    }

    .info-wrapper {
      height: 100%;
    }

    .img-wrapper {
      box-shadow: none;
    }
  }

  .error-icon {
    height: 20px;
  }
`;

export const FileInfoWrapper = styled.div`
  ${spaceAround}
  ${size()}

  height: 100%;
  padding: 3px 0;
`;

export const Retry = styled.div`
  ${antialiased}
  ${ellipsis()}
  font-weight: bold;
  color: #0065FF;
  font-size: 12px;
  line-height: 15px;
  margin-top: 2px;
`;

export const ImgWrapper = styled.div`
  ${center}
  ${borderRadius}
  width: ${imgSize}px;
  height: 100%;
  overflow: hidden;
  position: relative;
  float: left;

  &.shadow {
    ${cardShadow}
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Error = styled.div`
  ${antialiased}
  ${ellipsis()}
  font-weight: bold;
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
`;

export const Title = styled.div`
  ${antialiased}
  ${ellipsis()}
  font-weight: bold;
  color: #091E42;
  font-size: 12px;
  line-height: 15px;
`;

export const Size = styled.div`
  ${ellipsis()}
  color: ${akColorN70};
  font-size: 12px;
  line-height: 15px;
  margin-top: 2px;
`;

export const RoundedBackground = styled.div`
  ${centerX}
  ${borderRadius}
  min-width: ${imgSize}px;
  height: inherit;
  overflow: hidden;
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding-left: 8px;
  position: relative;
  width: 0;
  flex: 1;
  overflow: hidden;
`;

export const LoadingWrapper = styled.div`
  ${center}
  ${size()}
  color: #cfd4db;
  background-color: ${akColorN20};
`;

export const PlaceholderSmallWrapper = styled.div`
  ${size(imgSize)}
  ${center}
  position: relative;

  .file-type-icon {
    position: absolute;

    span {${size(12)}}
  }
`;
