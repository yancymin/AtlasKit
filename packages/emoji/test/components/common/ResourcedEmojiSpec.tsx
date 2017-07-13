import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription } from '../../../src/types';
import Emoji from '../../../src/components/common/Emoji';
import EmojiPlaceholder from '../../../src/components/common/EmojiPlaceholder';
import ResourcedEmoji from '../../../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../../../src/api/EmojiResource';

import { MockEmojiResourceConfig } from '../../MockEmojiResource';
import { evilburnsEmoji, grinEmoji, getEmojiResourcePromise } from '../../TestData';

const findEmoji = component => component.find(Emoji);
const emojiVisible = (component) => findEmoji(component).length === 1;
const emojiVisibleById = (component, id) => emojiVisible(component) && findEmoji(component).prop('emoji').id === id;
const emojiPlaceHolderVisible = (component) => component.find(EmojiPlaceholder).length === 1;

describe('<ResourcedEmoji />', () => {
  it('should render emoji', () => {
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ shortName: 'shouldnotbeused', id: grinEmoji.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
    });
  });

  it('should not render a tooltip on hover if there is no showTooltip prop', () => {
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ shortName: 'shouldnotbeused', id: grinEmoji.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      component.simulate('mouseenter');
      expect(component.find('AKTooltip')).to.have.length(0);
    });
  });

  it('should render a tooltip on hover if showTooltip is set to true', () => {
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ shortName: 'shouldnotbeused', id: grinEmoji.id }}
      showTooltip={true}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      component.simulate('mouseenter');
      expect(component.find('AKTooltip')).to.have.length(1);
    });
  });

  it('should fallback to shortName if no id', () => {
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ shortName: grinEmoji.shortName }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
    });
  });


  it('should update emoji on shortName change', () => {
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ shortName: grinEmoji.shortName }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
      component.setProps({
        emojiId: { shortName: evilburnsEmoji.shortName },
      });

      return waitUntil(() => emojiVisibleById(component, evilburnsEmoji.id)).then(() => {
        expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(evilburnsEmoji.id);
      });
    });
  });

  it('unknown emoji', () => {
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ shortName: 'doesnotexist', id: 'doesnotexist' }}
    />);

    return waitUntil(() => !!resolver).then(() => {
      resolver();
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        expect(true, 'EmojiPlaceholder found').to.equal(true);
      });
    });
  });

  it('placeholder while loading emoji', () => {
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ shortName: grinEmoji.shortName, id: grinEmoji.id }}
    />);

    return waitUntil(() => !!resolver).then(() => {
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        resolver(resolverResult);
        return waitUntil(() => emojiVisible(component)).then(() => {
          expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
        });
      });
    });
  });

  it('placeholder should render a tooltip on hover if showTooltip is set to true', () => {
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ shortName: 'doesnotexist', id: 'doesnotexist' }}
      showTooltip={true}
    />);

    return waitUntil(() => !!resolver).then(() => {
      resolver();
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        component.simulate('mouseenter');
        expect(component.find('AKTooltip')).to.have.length(1);
      });
    });
  });
});
