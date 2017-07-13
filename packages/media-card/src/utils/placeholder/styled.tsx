/* tslint:disable:variable-name */
import styled from 'styled-components';

// MEDIA-TODO: Use an icon for &.fallback icon
export const PlaceholderWrapper = styled.div`
  display: flex;
  color: #cfd4db;
  height: 100%;
  justify-content: center;

  &.fallback {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAAg0lEQVR4Ae2WsQ0DQQgEKXkb4FzGZZRBF/9l3FVAbuPMer/ESnbGBBCNVhuBxDJFEbUVstR3FNmuS8zjApKvipvoDoKtgtz1EKTAkALT4VcJ3aE7dIfuwCVMvJn10h+rhTthApMSkOOPCePIeTzKwjnwYpy3AgEv8IfdnBHc+OeEfX+eRtkEbLrqLcMAAAAASUVORK5CYII=) no-repeat center;
    background-size: initial;
    width: 100%;
    height: 100%;
  }
`;
