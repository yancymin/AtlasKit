import styled from 'styled-components';

const DrawerMain = styled.div`
  // needed to fix sticky header on retina displays 🙃
  transform-style: preserve-3d;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  position: relative;
  width: 100%;
`;

DrawerMain.displayName = 'DrawerMain';
export default DrawerMain;
