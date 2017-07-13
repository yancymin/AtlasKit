import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';

import * as styles from '../../../src/components/picker/styles';
import EmojiList from '../../../src/components/picker/EmojiPickerList';
import { imageEmoji } from './../../TestData';

const emojis = [ imageEmoji ];

describe('<EmojiPickerList />', () => {
  describe('list', () => {
    it('should contain search ', () => {
      const wrapper = mount(<EmojiList
        emojis={emojis}
        showUploadOption={true}
      />);

      expect(wrapper.find(`.${styles.pickerSearch}`)).to.have.length(1);
    });
  });
});
