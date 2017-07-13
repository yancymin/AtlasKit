import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { OnEmojiEvent } from '@atlaskit/emoji';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../src/internal/emoji-button';
import Selector from '../src/internal/selector';
import { defaultReactions, isDefaultReaction } from '../src/internal/selector';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise } = emojiTestData.emojiTestData;

const { expect } = chai;

const renderSelector = (onSelection: OnEmojiEvent = () => {}) => {
  return <Selector emojiProvider={getEmojiResourcePromise()} onSelection={onSelection} />;
};

describe('@atlaskit/reactions/selector', () => {
  let clock;
  beforeEach(function () {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  it('should render default reactions', () => {
    const selector = shallow(renderSelector());
    const emojis = selector.find(EmojiButton);

    expect(emojis.length).to.equal(defaultReactions.length);

    emojis.forEach(emoji => {
      expect(isDefaultReaction(emoji.props().emojiId)).to.equal(true);
    });
  });

  it('should call "onSelection" on selection', () => {
    const onSelection = sinon.spy();
    const selector = mount(renderSelector(onSelection));
    selector.find(EmojiButton).first().simulate('mouseup', { button: 0 });

    clock.tick(500);
    expect(onSelection.called).to.equal(true);
  });

});
