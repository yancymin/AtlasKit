import styled from 'styled-components';

const sizes = {
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
};

// Ratio used by the logo svg template
const outerLogoSize = 40;
const innerLogoSize = 30;
const logoIconRatio = outerLogoSize / innerLogoSize;

const logoSize = size => (`${sizes[size] * logoIconRatio}px`);

const scaledTypeOffset = ({ size, typeOffsetRatio }) => `-${sizes[size] * typeOffsetRatio}px`;

const logoWidth = ({ size, collapseTo }) => {
  if (collapseTo) {
    switch (collapseTo) { // eslint-disable-line default-case
      case 'icon':
        return logoSize(size);
      case 'type':
        return 'auto';
    }
  }
  return 'auto';
};

const Size = styled.div`
  color: inherit;
  display: inline-block;
  height: ${({ size }) => logoSize(size)};
  width: ${props => logoWidth(props)};

  > svg {
    height: 100%;
    display: inline-block;
    transform: ${props => (
      props.collapseTo === 'type' ? `translateX(${scaledTypeOffset(props)})` : 'none'
    )}
  }

  .logo-icon {
    opacity: ${({ collapseTo }) => (collapseTo === 'type' ? 0 : 1)};
  }

  .logo-type {
    opacity: ${({ collapseTo }) => (collapseTo === 'icon' ? 0 : 1)};
  }
`;

export default Size;
