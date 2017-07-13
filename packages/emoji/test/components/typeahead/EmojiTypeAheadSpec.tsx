import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';

import { newEmojiRepository, standardBoomEmoji, atlassianBoomEmoji, getEmojiResourcePromise, mediaEmoji, blackFlagEmoji, openMouthEmoji } from '../../TestData';
import { isEmojiTypeAheadItemSelected, getEmojiTypeAheadItemById } from '../../emoji-selectors';

import EmojiTypeAhead, { defaultListLimit, Props, OnLifecycle } from '../../../src/components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadItem from '../../../src/components/typeahead/EmojiTypeAheadItem';
import EmojiPlaceholder from '../../../src/components/common/EmojiPlaceholder';
import { OptionalEmojiDescription, EmojiId, OnEmojiEvent } from '../../../src/types';
import { EmojiProvider } from '../../../src/api/EmojiResource';
import { Props as TypeAheadProps, State as TypeAheadState } from '../../../src/components/typeahead/EmojiTypeAhead';

function setupPicker(props?: Props): ReactWrapper<any, any> {
  return mount(
    <EmojiTypeAhead
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      query=""
      {...props}
    />
  );
}

const allEmojis = newEmojiRepository().all().emojis;

const leftClick = {
  button: 0,
};

const findEmojiItems = (component) => component.find(EmojiTypeAheadItem);
const itemsVisibleCount = (component) => findEmojiItems(component).length;
const itemsVisible = (component) => itemsVisibleCount(component) > 0;
const doneLoading = (component: ReactWrapper<TypeAheadProps, TypeAheadState>) => !component.state('loading');

describe('EmojiTypeAhead', () => {
  it('should display max emoji by default', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(defaultListLimit);
    });
  });

  it('should limit results to those matching "grin"', () => {
    const component = setupPicker({
      query: 'grin',
    } as Props);
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(2);
    });
  });

  it('should limit result to matching "ball"', () => {
    const component = setupPicker({
      query: 'ball',
    } as Props);
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(2);
    });
  });

  it('should change selection when navigating next', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectNext();

      expect(secondItemSelected()).to.equal(true);
    });
  });

  it('should change selection when navigating previous', () => {
    const component = setupPicker();
    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const lastItemSelected = () =>
        isEmojiTypeAheadItemSelected(component, allEmojis[defaultListLimit - 1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectPrevious();

      expect(lastItemSelected()).to.equal(true);
    });
  });

  it('should choose current selection when chooseCurrentSelection called', () => {
    let choseEmoji: OptionalEmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const secondItemSelected = () => isEmojiTypeAheadItemSelected(component, allEmojis[1].id);
      const chooseSecondItem = () => (choseEmoji && choseEmoji.id === allEmojis[1].id);
      expect(defaultEmojiShown()).to.equal(true);

      const instance = component.instance() as EmojiTypeAhead;
      instance.selectNext();
      expect(secondItemSelected()).to.equal(true);

      instance.chooseCurrentSelection();
      expect(chooseSecondItem()).to.equal(true);
    });
  });

  it('should choose clicked selection when item clicked', () => {
    let choseEmoji: OptionalEmojiDescription;

    const component = setupPicker({
      onSelection: (emojiId, emoji) => { choseEmoji = emoji; },
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const chooseThirdItem = () => (choseEmoji && choseEmoji.id === allEmojis[2].id);
      expect(defaultEmojiShown()).to.equal(true);

      const item = getEmojiTypeAheadItemById(component, allEmojis[2].id);
      item.simulate('mousedown', leftClick);
      expect(chooseThirdItem()).to.equal(true);
    });
  });

  it('should fire onOpen on initial display', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      expect(defaultEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened').to.equal(1);
      expect(onClose.callCount, 'closed').to.equal(0);
    });
  });

  it('should fire onOpen when first result shown', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
      query: 'zeroresults',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const noEmojiShown = () => findEmojiItems(component).length === 0;
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      expect(noEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened 1').to.equal(1);
      expect(onClose.callCount, 'closed 1').to.equal(1);
      component.setProps({ query: '' });

      return waitUntil(() => itemsVisible(component)).then(() => {
        expect(defaultEmojiShown()).to.equal(true);
        expect(onOpen.callCount, 'opened 2').to.equal(2);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
    });
  });

  it('should fire onClose when no matches', () => {
    const onOpen = sinon.spy();
    const onClose = sinon.spy();

    const component = setupPicker({
      onOpen: onOpen as OnLifecycle,
      onClose: onClose as OnLifecycle,
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const defaultEmojiShown = () => findEmojiItems(component).length === defaultListLimit;
      const noEmojiShown = () => findEmojiItems(component).length === 0;
      expect(defaultEmojiShown()).to.equal(true);
      expect(onOpen.callCount, 'opened 1').to.equal(1);
      expect(onClose.callCount, 'closed 1').to.equal(0);
      component.setProps({ query: 'zeroresults' });

      return waitUntil(() => !itemsVisible(component)).then(() => {
        expect(noEmojiShown(), 'no emoji shown').to.equal(true);
        expect(onOpen.callCount, 'opened 2').to.equal(1);
        expect(onClose.callCount, 'closed 2').to.equal(1);
      });
    });
  });

  it('should find two matches when querying "boom"', () => {
    const component = setupPicker({
      query: 'boom',
    } as Props);
    // Confirm initial state for later conflicting shortName tests
    return waitUntil(() => doneLoading(component)).then(() => {
      expect(findEmojiItems(component).length).to.equal(2);
    });
  });

  it('should highlight emojis by matching on id then falling back to shortName', () => {
    const component = setupPicker({
      query: 'boom',
    } as Props);
    const standardBoomId: EmojiId = {
      ...standardBoomEmoji
    };

    return waitUntil(() => doneLoading(component)).then(() => {
      const item = getEmojiTypeAheadItemById(component, standardBoomEmoji.id);
      item.prop('onMouseMove')(standardBoomId, standardBoomEmoji, item.simulate('mouseover'));
      expect(isEmojiTypeAheadItemSelected(component, standardBoomEmoji.id)).to.equal(true);
    });
  });

  it('should highlight correct emoji regardless of conflicting shortName', () => {
    const component = setupPicker({
      query: 'boom',
    } as Props);
    const atlassianBoomId: EmojiId = {
      ...atlassianBoomEmoji
    };

    return waitUntil(() => doneLoading(component)).then(() => {
      const item = getEmojiTypeAheadItemById(component, atlassianBoomEmoji.id);
      item.prop('onMouseMove')(atlassianBoomId, atlassianBoomEmoji, item.simulate('mouseover'));
      expect(isEmojiTypeAheadItemSelected(component, atlassianBoomEmoji.id)).to.equal(true);
    });
  });

  it('should render placeholder for unloaded media emoji', () => {
    const component = setupPicker({
      query: 'media',
    } as Props);
    return waitUntil(() => doneLoading(component)).then(() => {
      const emojiItems = findEmojiItems(component);
      expect(emojiItems.length).to.equal(1);
      const placeholders = emojiItems.find(EmojiPlaceholder);
      expect(placeholders.length).to.equal(1);
      const props = placeholders.get(0).props;
      expect(props.shortName, 'short name').to.equals(mediaEmoji.shortName);
    });
  });

  it('should retain selected match across search refinement', () => {
    const component = setupPicker({
      query: 'fla',
    } as Props);
    const blackFlagId: EmojiId = {
      ...blackFlagEmoji
    };

    return waitUntil(() => doneLoading(component)).then(() => {
      let item = getEmojiTypeAheadItemById(component, blackFlagId.id);
      item.prop('onMouseMove')(blackFlagId, blackFlagEmoji, item.simulate('mouseover'));
      expect(isEmojiTypeAheadItemSelected(component, blackFlagId.id)).to.equal(true);

      const itemCount = itemsVisibleCount(component);
      component.setProps({ query: 'flag_b' });

      return waitUntil(() => itemsVisibleCount(component) < itemCount).then(() => {
        expect(isEmojiTypeAheadItemSelected(component, blackFlagId.id)).to.equal(true);
      });
    });
  });

  it('should default to exact ascii selection first', () => {
    const component = setupPicker({
      query: ':O',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      expect(itemsVisibleCount(component) > 1, 'Items visible').to.equal(true);
      expect(isEmojiTypeAheadItemSelected(component, openMouthEmoji.id), 'Open mouth emoji should be selected').to.equal(true);
    });
  });

  it('should fire onSelection if a query ends in a colon and has an exact match with one emoji shortName', () => {
    const onSelection = sinon.spy();

    const component = setupPicker({
      onSelection: onSelection as OnEmojiEvent,
      query: ':grin:',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      expect(onSelection.callCount, 'selected 1').to.equal(1);
    });
  });

  it('should not fire onSelection if a query ends in a colon and more than one emoji has an exact shortName match', () => {
    const onSelection = sinon.spy();

    const component = setupPicker({
      onSelection: onSelection as OnEmojiEvent,
      query: ':boom:',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      expect(itemsVisibleCount(component) > 1, 'Multiple items match').to.equal(true);
      expect(onSelection.callCount, 'selected 0').to.equal(0);
    });
  });

  it('should not fire onSelection if a query ends in a colon and no emojis have an exact shortName match', () => {
    const onSelection = sinon.spy();

    const component = setupPicker({
      onSelection: onSelection as OnEmojiEvent,
      query: ':blah:',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      const noEmojiShown = () => findEmojiItems(component).length === 0;
      expect(noEmojiShown()).to.equal(true);
      expect(onSelection.callCount, 'selected 0').to.equal(0);
    });
  });

  it('should perform case insensitive exact shortName matching', () => {
    const onSelection = sinon.spy();

    const component = setupPicker({
      onSelection: onSelection as OnEmojiEvent,
      query: ':GRIN:',
    } as Props);

    return waitUntil(() => doneLoading(component)).then(() => {
      expect(onSelection.callCount, 'selected 1').to.equal(1);
    });
  });
});
