import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Heading from './Heading';
import Description from './Description';
import Code from './Code';

export default class Usage extends PureComponent {
  static propTypes = {
    example: PropTypes.node,
    moduleName: PropTypes.string,
    source: PropTypes.string,
  }

  render() {
    const {
      example,
      moduleName,
      source,
    } = this.props;

    return (
      <div>
        <Heading type={2}>Usage</Heading>
        <Description>Installing:</Description>
        <Code language="bash">{`npm install ${moduleName}`}</Code>
        <Description>Example:</Description>
        <Code code={source}>
          {example}
        </Code>
      </div>
    );
  }
}
