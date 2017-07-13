import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import MentionNode from '../../../../../src/renderer/react/nodes/mention';
import Mention from '../../../../../src/ui/Mention';

describe('Renderer - React/Nodes/Mention', () => {
  it('should render UI mention component', () => {
    const mention = mount(<MentionNode id="abcd-abcd-abcd" text="@Oscar Wallhult"/>);
    expect(mention.find(Mention)).to.have.length(1);
  });

  it('should render with access level if prop exists', () => {
    const mention = mount(<MentionNode id="abcd-abcd-abcd" text="@Oscar Wallhult" accessLevel="APPLICATION"/>);
    expect(mention.find(Mention).prop('accessLevel')).to.equal('APPLICATION');
  });
});
