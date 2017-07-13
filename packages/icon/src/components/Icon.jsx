import React, { PropTypes, PureComponent } from 'react';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

class Icon extends PureComponent {
  static propTypes = {
    /** Glyph to show by Icon component (not required when you import a glyph directly) */
    glyph: PropTypes.func.isRequired,
    /** String to apply as the SVG title element */
    label: PropTypes.string.isRequired,
    /** onClick handler for the icon element */
    onClick: PropTypes.func,
    /** For primary colour for icons */
    primaryColor: PropTypes.string,
    /** For secondary colour for 2-color icons. Set to inherit to control this via "fill" in CSS */
    secondaryColor: PropTypes.string,
    /** Control the size of the icon */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  }

  static defaultProps = {
    onClick: () => {},
    primaryColor: 'currentColor',
    secondaryColor: 'white',
  }

  render() {
    const {
      glyph: Glyph,
      onClick,
      primaryColor,
      secondaryColor,
      size,
      ...svgProps
    } = this.props;

    const wrapperStyles = {
      display: 'inline-block',
      lineHeight: 1,
      width: sizes[size],
      height: sizes[size],
      color: primaryColor,
      fill: secondaryColor,
    };

    const svgStyles = {
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      width: '100%',
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span onClick={onClick} style={wrapperStyles}>
        <Glyph title={this.props.label} style={svgStyles} role="img" {...svgProps} />
      </span>
    );
  }
}

const size = Object.keys(sizes).reduce((p, c) => Object.assign(p, { [c]: c }), {});

export { size };
export default Icon;
