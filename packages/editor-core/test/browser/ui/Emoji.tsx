import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';
import ProviderFactory from '../../../src/providerFactory';
import Emoji from '../../../src/ui/Emoji';

describe('Emoji', () => {

  const emojiProvider = Promise.resolve({} as EmojiProvider);

  it('should render "fallback" if there is no emojiProvider prop', () => {
    const component = mount(
      <Emoji
        allowTextFallback={true}
        shortName=":anything:"
        fallback="fallback"
      />
    );

    const fallbackSpan = component.find('span');
    expect(fallbackSpan.length).to.equal(1);
    expect(fallbackSpan.text()).to.equal('fallback');
  });

  it('should still render resourced emoji if allowTextFallback=true', () => {
    const component = mount(
      <Emoji
        shortName=":anything:"
        fallback="fallback"
      />
    );

    expect(component.find(ResourcedEmoji)).to.have.length(1);
  });

  it('should render "fallback" if there is no emojiProvider prop and no fallback', () => {
    const component = mount(
      <Emoji
        allowTextFallback={true}
        shortName=":anything:"
      />
    );

    const fallbackSpan = component.find('span');
    expect(fallbackSpan.length).to.equal(1);
    expect(fallbackSpan.text()).to.equal(':anything:');
  });

  it('should render a EmojiWrapper component if emojiProvider supplied', () => {
    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('emojiProvider', emojiProvider);

    const emojiId = { shortName: ':anything:', fallback: 'fallback', id: 'abc' };
    const component = mount(
      <Emoji
        providers={providerFactory}
        {...emojiId}
      />
    );

    const resourcedEmoji = component.find(ResourcedEmoji);
    expect(resourcedEmoji.length).to.equal(1);
    expect(resourcedEmoji.prop('emojiId')).to.deep.equal(emojiId);
    expect(resourcedEmoji.prop('emojiProvider')).to.equal(emojiProvider);
  });

});
