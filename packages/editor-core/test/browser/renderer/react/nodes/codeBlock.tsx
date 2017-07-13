import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import CodeBlock from '../../../../../src/renderer/react/nodes/codeBlock';
import { AkCodeBlock } from '@atlaskit/code';

describe('Renderer - React/Nodes/CodeBlock', () => {
  it('should render @atlaskit/code component', () => {
    const node = mount(<CodeBlock language="javascript">foo</CodeBlock>);
    expect(node.find(AkCodeBlock)).to.have.length(1);
  });
});
