import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AkCodeBlock } from '@atlaskit/code';
import CodeBlock from '../../../src/nodes/codeBlock';

describe('CodeBlock', () => {

  it('should render an AkCodeBlock component', () => {
    const component = shallow(<CodeBlock text="This is a code block" />);
    expect(component.find(AkCodeBlock).length).to.equal(1);
  });

});
