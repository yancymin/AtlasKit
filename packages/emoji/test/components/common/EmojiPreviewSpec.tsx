import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import * as styles from '../../../src/components/common/styles';
import EmojiPreview from '../../../src/components/common/EmojiPreview';
import ToneSelector from '../../../src/components/common/ToneSelector';
import Emoji from '../../../src/components/common/Emoji';
import EmojiPlaceholder from '../../../src/components/common/EmojiPlaceholder';
import { EmojiDescription, EmojiDescriptionWithVariations } from '../../../src/types';
import { imageEmoji, generateSkinVariation, mediaEmoji } from '../../TestData';

const baseEmoji = imageEmoji;

const emoji: EmojiDescription = {
  ...baseEmoji,
  generateSkinVariations: [
    generateSkinVariation(imageEmoji, 1),
    generateSkinVariation(imageEmoji, 2),
    generateSkinVariation(imageEmoji, 3),
    generateSkinVariation(imageEmoji, 4),
    generateSkinVariation(imageEmoji, 5),
  ],
};

const baseToneEmoji = {
  ...imageEmoji,
  id: 'raised_back_of_hand',
  shortName: ':raised_back_of_hand:',
  name: 'Raised back of hand',
};

const toneEmoji: EmojiDescriptionWithVariations = {
  ...baseToneEmoji,
  generateSkinVariations: [
    generateSkinVariation(baseToneEmoji, 1),
    generateSkinVariation(baseToneEmoji, 2),
    generateSkinVariation(baseToneEmoji, 3),
    generateSkinVariation(baseToneEmoji, 4),
    generateSkinVariation(baseToneEmoji, 5),
  ],
};

describe('<EmojiPreview />', () => {
  describe('preview', () => {
    it('should render an emoji preview if one is selected', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={emoji}
      />);

      expect(wrapper.find(`.${styles.preview}`), 'Preview rendered').to.have.length(1);
    });

    it('should not render the emoji preview if one is not selected', () => {
      const wrapper = shallow(<EmojiPreview />);

      expect(wrapper.find(`.${styles.preview}`), 'Preview not rendered').to.have.length(0);
    });
  });

  describe('tone', () => {
    it('should display tone selector after clicking on the tone button', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      wrapper.find('#toneSelectorButton').first().simulate('click');
      expect((wrapper).state('selectingTone')).to.equal(true);
      expect(wrapper.find(ToneSelector), 'ToneSelector in preview').to.have.length(1);
    });

    it('button should show current selected tone if provided', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        selectedTone={1}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji), 'Emoji in preview').to.have.length(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop, 'First has emoji prop').to.not.equal(undefined);
      expect(emoji1Prop.id, 'Emoji id').to.equal(emoji.id);
      expect(emoji1Prop.shortName, 'Emoji shortName').to.equal(emoji.shortName);
      const second = wrapper.find(Emoji).at(1);
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop, 'Second has emoji prop').to.not.equal(undefined);
      expect(emoji2Prop.id, 'Tone id').to.equal(toneEmoji.id);
      expect(emoji2Prop.shortName, 'Tone shortName').to.equal(toneEmoji.shortName);
    });

    it('button should show default tone if selected tone is not specified', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      expect(wrapper.find(Emoji), 'Emoji in preview').to.have.length(2);
      const first = wrapper.find(Emoji).first();
      const emoji1Prop = first.prop('emoji');
      expect(emoji1Prop.shortName, 'Emoji shortName').to.equal(emoji.shortName);
      expect(emoji1Prop.representation, 'Emoji skin variation').to.have.all.keys(emoji.representation as Object);
      const second = wrapper.find(Emoji).at(1);
      const emoji2Prop = second.prop('emoji');
      expect(emoji2Prop.shortName, 'Tone shortName').to.equal(toneEmoji.shortName);
      expect(emoji2Prop.representation, 'Tone skin variation').to.have.all.keys(toneEmoji.representation as Object);
    });

    it('should stop selecting tone when tone selected', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();
      instance.onToneSelected(1);

      expect(wrapper.state('selectingTone')).to.equal(false);
    });

    it('should pass onToneSelected to tone selector', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      expect(wrapper.find(ToneSelector).prop('onToneSelected')).to.equal(instance.onToneSelected);
    });

    it('should stop selecting tone on mouse leave', () => {
      const wrapper = mount(<EmojiPreview
        emoji={emoji}
        toneEmoji={toneEmoji}
      />);

      const instance = wrapper.instance() as EmojiPreview;
      instance.onToneButtonClick();

      wrapper.simulate('mouseLeave');
      expect(wrapper.state('selectingTone')).to.equal(false);
    });

    it('should render placeholder for unloaded media emoji', () => {
      const wrapper = shallow(<EmojiPreview
        emoji={mediaEmoji}
      />);

      const placeholders = wrapper.find(EmojiPlaceholder);
      expect(placeholders.length).to.equal(1);
      const props = placeholders.get(0).props;
      expect(props.shortName, 'short name').to.equals(mediaEmoji.shortName);
    });
  });
});
