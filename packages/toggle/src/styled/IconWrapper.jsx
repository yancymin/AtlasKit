import styled from 'styled-components';
import { getWidth, paddingUnitless } from './constants';

const iconPadding = `${paddingUnitless / 2}px`;

const getPadding = ({ isChecked }) => (isChecked
  ? `
    padding-left: ${iconPadding};
    padding-right: 0;
  `
  : `
    padding-left: 0;
    padding-right: ${iconPadding};
  `
);

export default styled.div`
  display: inline-flex;
  font-size: 10px;
  max-width: ${props => getWidth(props) / 2}px;
  ${getPadding}
`;
