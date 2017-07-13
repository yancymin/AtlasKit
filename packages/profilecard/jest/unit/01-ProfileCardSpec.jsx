import React from 'react';
import { shallow, mount } from 'enzyme';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@atlaskit/button';
import styles from '../../src/styles/profilecard.less';

import AkProfilecardResourced, { AkProfilecard, AkProfileClient } from '../../src';
import LoadingMessage from '../../src/components/LoadingMessage';
import ErrorMessage from '../../src/components/ErrorMessage';
import presences from '../../src/internal/presences';

describe('Profilecard', () => {
  it('should export default AkProfilecardResourced', () => {
    expect(AkProfilecardResourced).toBeInstanceOf(Object);
  });

  it('should export named AkProfilecard and AkProfileClient', () => {
    expect(AkProfilecard).toBeInstanceOf(Object);
    expect(AkProfileClient).toBeInstanceOf(Object);
  });

  describe('AkProfilecard', () => {
    it('should be possible to create a component', () => {
      const card = shallow(<AkProfilecard />);
      expect(card.length).toBeGreaterThan(0);
    });

    describe('fullName property', () => {
      const fullName = 'This is an avatar!';
      const card = shallow(<AkProfilecard fullName={fullName} />);

      it('should show the full name on the card if property is set', () => {
        const el = card.find(`.${styles.detailsFullname}`);
        expect(el.text()).toBe(fullName);
      });

      it('should not render a card if full name is not set', () => {
        card.setProps({ fullName: undefined });
        expect(card.children()).toHaveLength(0);
      });
    });

    describe('presence property', () => {
      describe('presence properties should render label', () => {
        const presenceWithoutNone = Object.keys(presences).filter(p => p !== 'none');

        presenceWithoutNone.forEach((presence) => {
          it(`should render label with content ${presence}`, () => {
            const card = mount(<AkProfilecard fullName="name" presence={presence} />);
            const el = card.find(`.${styles.presence}`);
            expect(el.length).toBeGreaterThan(0);
            expect(el.text()).toBe(presences[presence]);
          });
        });
      });

      it('should not render a presence label if property is not set', () => {
        const card = mount(<AkProfilecard fullName="name" />);
        const el = card.find(`.${styles.presence}`);
        expect(el.isEmpty()).toBe(true);
      });
    });

    describe('isLoading property', () => {
      it('should render the LoadingMessage component', () => {
        const card = mount(
          <AkProfilecard isLoading />
        );
        expect(card.find(LoadingMessage).length).toBe(1);
      });
    });

    describe('hasError property', () => {
      it('should render the ErrorMessage component', () => {
        const card = mount(
          <AkProfilecard hasError />
        );
        expect(card.find(ErrorMessage).length).toBe(1);
      });

      it('should render the ErrorMessage component with retry button if clientFetchProfile is provided', () => {
        const card = mount(
          <AkProfilecard hasError clientFetchProfile={() => {}} />
        );
        const errorComponent = card.find(ErrorMessage);
        expect(errorComponent.length).toBe(1);
        expect(errorComponent.find(CrossCircleIcon).length).toBe(1);
        expect(errorComponent.find(AkButton).length).toBe(1);
      });
    });

    describe('actions property', () => {
      const actions = [
        {
          label: 'one',
        },
        {
          label: 'two',
        },
        {
          label: 'three',
        },
      ];
      const card = shallow(<AkProfilecard fullName="name" actions={actions} />);

      it('should render an action button for every item in actions property', () => {
        const actionsWrapper = card.find(`.${styles.actionsWrapper}`);
        const buttonTexts = card.find('AkButton').children().map(node => node.text());

        expect(actionsWrapper.children()).toHaveLength(actions.length);
        expect(buttonTexts).toEqual(actions.map(action => action.label));
      });

      it('should call callback handler when action button is clicked', () => {
        const spy = jest.fn().mockImplementation(() => {}); // eslint-disable-line no-undef
        card.setProps({ actions: [{
          label: 'test',
          callback: spy,
        }] });
        const actionsWrapper = card.find(`.${styles.actionsWrapper}`);
        actionsWrapper.find('AkButton').first().simulate('click');
        expect(spy.mock.calls.length).toBe(1);
      });

      it('should not render any action buttons if actions property is not set', () => {
        card.setProps({ actions: undefined });
        const actionsWrapper = card.find(`.${styles.actionsWrapper}`);
        expect(actionsWrapper.children().length).toBe(0);
      });
    });
  });
});
