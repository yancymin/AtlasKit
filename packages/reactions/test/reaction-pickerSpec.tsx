import Button from '@atlaskit/button';
import { EmojiPicker } from '@atlaskit/emoji';
import { EditorMoreIcon } from '@atlaskit/icon';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import { ReactionPicker } from '../src';
import EmojiButton from '../src/internal/emoji-button';
import Selector from '../src/internal/selector';
import Trigger from '../src/internal/trigger';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise } = emojiTestData.emojiTestData;

const { expect } = chai;

const renderPicker = (onSelection: Function = () => {}, text?: string) => {
  return <ReactionPicker emojiProvider={getEmojiResourcePromise()} onSelection={onSelection} allowAllEmojis={true} text={text} />;
};

describe('@atlaskit/reactions/reaction-picker', () => {
  let clock;
  const animStub = window.cancelAnimationFrame;

  beforeEach(function () {
    window.cancelAnimationFrame = () => {};
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
    window.cancelAnimationFrame = animStub;
  });

  it('should render a trigger', () => {
    const picker = shallow(renderPicker());
    expect(picker.find(Trigger).length).to.equal(1);
  });

  it('should render selector when trigger is clicked', () => {
    const picker = mount(renderPicker());
    const trigger = picker.find(Trigger);
    trigger.simulate('mousedown', { button: 0 });
    expect(picker.find(Selector).length).to.equal(1);
  });

  it('should render emoji picker when "..." button is clicked', () => {
    const picker = mount(renderPicker());
    const trigger = picker.find(Trigger);
    trigger.simulate('mousedown', { button: 0 });
    const moreButton = picker.find(EditorMoreIcon);
    moreButton.simulate('mousedown', { button: 0 });
    expect(picker.find(EmojiPicker).length).to.equal(1);
  });

  it('should call "onSelection" when an emoji is seleted', () => {
    const onSelectionSpy = sinon.spy();
    const picker = mount(renderPicker(onSelectionSpy));
    const trigger = picker.find(Trigger);
    trigger.simulate('mousedown', { button: 0 });
    const selector = picker.find(Selector);
    selector.find(EmojiButton).first().simulate('mouseup', { button: 0 });

    clock.tick(500);
    expect(onSelectionSpy.called).to.equal(true);
  });

  it('should render a button if text-prop is set', () => {
    const picker = mount(renderPicker(() => {}, 'Like'));
    expect(picker.find(Button).length).to.equal(1);
  });

});
