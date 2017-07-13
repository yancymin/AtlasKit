import styled from 'styled-components';
import CustomComponentProxy from '../components/CustomComponentProxy';

export default {
  custom: (styles) => {
    // Override pseudo-state specificity.
    // This is necessary because we don't know what DOM element the custom component will render.
    const component = styled(CustomComponentProxy)`&,&:hover,&:active,&:focus{${styles}}`;
    component.displayName = 'StyledCustomComponent';
    return component;
  },
  button: (styles) => {
    const component = styled.button`${styles}`;
    component.displayName = 'StyledButton';
    return component;
  },
  link: (styles) => {
    // Target the <a> here to override a:hover specificity.
    const component = styled.a`a&{ ${styles} }`;
    component.displayName = 'StyledLink';
    return component;
  },
  span: (styles) => {
    const component = styled.span`${styles}`;
    component.displayName = 'StyledSpan';
    return component;
  },
};
