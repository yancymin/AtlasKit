import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/styles/docco';
import { akColorN0, akColorN20, akColorN30A } from '@atlaskit/util-shared-styles';

const halfGrid = 4;
const style = {
  code: {
    backgroundColor: akColorN20,
    boxShadow: `0 3px 4px 0 ${akColorN30A}`,
    padding: 3 * halfGrid,
  },
  codeExample: {
    backgroundColor: akColorN0,
  },
};

function getIndent(lines) {
  for (let a = 0; a < lines.length; a++) {
    const matches = lines[a].match(/^(\s*).+/);
    if (matches) {
      return matches[1].length;
    }
  }
  return 0;
}

function formatCode(code) {
  const lines = code.split('\n');
  const indent = getIndent(lines);
  return lines.map(line => line.substring(indent)).join('\n').trim();
}

export default class ReadmeCode extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string,
    language: PropTypes.string,
  }
  render() {
    const { children, code, language } = this.props;
    const { code: customStyle, codeExample } = style;
    return (
      <div style={{ marginTop: 3 * halfGrid }}>
        <SyntaxHighlighter
          customStyle={customStyle}
          language={language || 'jsx'}
          style={docco}
        >{formatCode(code || children)}</SyntaxHighlighter>
        {code ? <div style={{ ...customStyle, ...codeExample }}><h6 style={{ marginBottom: halfGrid }}>Code example: result</h6>{children}</div> : ''}
      </div>
    );
  }
}
