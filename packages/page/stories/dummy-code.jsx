import React, { PureComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/dist/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #97A0AF;
  border-radius: 3px;
  margin-top: 20px;
`;

const Actions = styled.div`
  background: #DFE1E6;
  padding: 8px;
  + pre { margin-top: 0; background-color: transparent !important; }
`;

const Code = () => {
  const codeString = `export const gridSize = 8;

export const defaultColumns = 12;

export const spacing = {
  comfortable: (gridSize * 5),
  cosy: (gridSize * 2),
  compact: (gridSize * 0.5),
};

export const layout = ['fixed', 'fluid'];
`;
  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers="true"
      style={arduinoLight}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

export default class DummyCode extends PureComponent {
  render() {
    return (
      <Wrapper>
        <Actions>
          <p>main.js</p>
        </Actions>
        <Code />
      </Wrapper>
    );
  }
}
