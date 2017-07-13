import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import decamelize from 'decamelize';
import Chrome from './Chrome';
import Description from './Description';
import DynamicProps from './DynamicProps';
import Usage from './Usage';

export { DynamicProps };

export default class Readme extends PureComponent {
  static propTypes = {
    /** The component class/function described by the readme */
    component: PropTypes.func.isRequired,
    /** The source code of the component */
    componentSource: PropTypes.string.isRequired,
    /** A description of the component */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    /** A renderable example of the basic usage of the component */
    example: PropTypes.node.isRequired,
    /** The source code for the renderable example, displayed alongside the example */
    exampleSource: PropTypes.string.isRequired,
    /**
     * An optional overriding name, e.g. @atlaskit/util-readme.
     * Useful when props.component doesn't have a displayname attribute
     */
    name: PropTypes.string,
  }

  render() {
    const {
      example,
      exampleSource,
      component,
      componentSource,
      description,
      name,
    } = this.props;

    const displayName = name || component.displayName || 'Unknown';
    const displayNameDashed = displayName ? decamelize(displayName, '-') : '';

    return (
      <Chrome title={displayName}>
        <Description>{description}</Description>
        <Usage moduleName={displayNameDashed} source={exampleSource} example={example} />
        <DynamicProps componentSrc={componentSource} />
      </Chrome>
    );
  }
}
