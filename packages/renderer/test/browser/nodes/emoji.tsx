import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';
import Emoji from '../../../src/nodes/emoji';

describe('Emoji', () => {

  const emojiProvider = Promise.resolve({} as EmojiProvider);

  it('should render "fallback" if there is no emojiProvider prop', () => {
    const component = shallow(<Emoji emojiId={{ shortName: ':anything:', fallback: 'fallback' }} />);
    const fallbackSpan = component.find('span');
    expect(fallbackSpan.length).to.equal(1);
    expect(fallbackSpan.text()).to.equal('fallback');
  });

  it('should render "fallback" if there is no emojiProvider prop and no fallback', () => {
    const component = shallow(<Emoji emojiId={{ shortName: ':anything:' }} />);
    const fallbackSpan = component.find('span');
    expect(fallbackSpan.length).to.equal(1);
    expect(fallbackSpan.text()).to.equal(':anything:');
  });

  it('should render a EmojiWrapper component if emojiProvider supplied', () => {
    const emojiId = { shortName: ':anything:', fallback: 'fallback', id: 'abc' };
    const component = shallow(<Emoji emojiId={emojiId} emojiProvider={emojiProvider}/>);
    const resourcedEmoji = component.find(ResourcedEmoji);
    expect(resourcedEmoji.length).to.equal(1);
    expect(resourcedEmoji.prop('emojiId')).to.deep.equal(emojiId);
    expect(resourcedEmoji.prop('emojiProvider')).to.equal(emojiProvider);
  });

});
