import styled from 'styled-components';

const Tabs = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;
  min-height: 0%; /* FF http://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox */
`;

export default Tabs;
