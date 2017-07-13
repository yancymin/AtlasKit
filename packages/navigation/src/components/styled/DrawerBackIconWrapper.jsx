import styled from 'styled-components';

const DrawerBackIconWrapper = styled.div`
  /** This needs to be display flex to fix an IE11 bug with position: absolute and a display: flex parent */
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 100%;
`;

DrawerBackIconWrapper.displayName = 'DrawerBackIconWrapper';
export default DrawerBackIconWrapper;
