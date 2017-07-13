import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Button from '@atlaskit/button';
import Pagination, { PaginationStateless } from '../../src';
import { pageRange } from '../../src/components/Stateless';
import { Ellipsis } from '../../src/styled';

import { name } from '../../package.json';

describe(name, () => {
  describe('stateless', () => {
    it('should not render when total is 0', () => {
      const wrapper = mount(<PaginationStateless total={0} current={0} />);
      expect(wrapper.find(Button).length).toBe(0);
    });

    it('should render pages and Prev/Next buttons when total is not 0', () => {
      const wrapper = mount(<PaginationStateless total={2} />);
      const buttons = wrapper.find(Button);
      expect(buttons.length).toBe(4);
      expect(buttons.at(0).text()).toBe('Prev');
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe('2');
      expect(buttons.at(3).text()).toBe('Next');
    });

    it('should render Prev button disabled when current in 1', () => {
      const wrapper = mount(<PaginationStateless total={3} />);
      const prevButton = wrapper.find(Button).at(0);
      expect(prevButton.prop('isDisabled')).toBe(true);
    });

    it('should render Next button disabled when current in 1', () => {
      const wrapper = mount(<PaginationStateless total={3} current={3} />);
      const nextButton = wrapper.find(Button).at(4);
      expect(nextButton.prop('isDisabled')).toBe(true);
    });

    it('should not render ellipsis with seven pages and page 1 selected', () => {
      const wrapper = shallow(<PaginationStateless total={7} />);
      const { length } = wrapper.find(Ellipsis);
      expect(length).toBe(0);
    });

    it('should render one ellipsis with 15 pages and page 1 selected', () => {
      const wrapper = shallow(<PaginationStateless total={15} />);
      const { length } = wrapper.find(Ellipsis);
      expect(length).toBe(1);
    });

    it('should render one ellipsis with 15 pages and page 14 selected', () => {
      const wrapper = shallow(<PaginationStateless total={15} current={14} />);
      const { length } = wrapper.find(Ellipsis);
      expect(length).toBe(1);
    });

    it('should render two ellipsis with 15 pages and page 8 selected', () => {
      const wrapper = shallow(<PaginationStateless total={15} current={8} />);
      const { length } = wrapper.find(Ellipsis);
      expect(length).toBe(2);
    });

    it('should invoke callback passed to onSetPage', () => {
      const onSetPage = spy();
      const wrapper = mount(<PaginationStateless total={3} current={2} onSetPage={onSetPage} />);
      const buttons = wrapper.find(Button);

      buttons.at(1).simulate('click');
      expect(onSetPage.calledOnce).toBe(true);
      expect(onSetPage.calledWith(1)).toBe(true);

      buttons.at(3).simulate('click');
      expect(onSetPage.calledTwice).toBe(true);
      expect(onSetPage.calledWith(3)).toBe(true);
    });

    describe('shouldn\'t invoke callback passed to onSetPage', () => {
      it('when clicked on active page', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <PaginationStateless
            total={3}
            current={2}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(2).simulate('click');
        expect(onSetPage.calledOnce).toBe(false);
      });

      it('when clicked on Prev and first page is active', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <PaginationStateless
            total={3}
            current={1}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(1).simulate('click');
        expect(onSetPage.calledOnce).toBe(false);
      });

      it('when clicked on Next and last page is active', () => {
        const onSetPage = spy();
        const wrapper = mount(
          <PaginationStateless
            total={3}
            current={3}
            onSetPage={onSetPage}
          />
            );
        const buttons = wrapper.find(Button);
        buttons.at(4).simulate('click');
        expect(onSetPage.calledOnce).toBe(false);
      });
    });
    describe('pageRange helper function', () => {
      it('should return correct range when less total pages than visible maximum', () => {
        const actual = pageRange(10, 3, 7);
        expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7]);
      });
      it('should return correct range when total pages equal to visible maximum', () => {
        const actual = pageRange(10, 8, 10);
        expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });
      it('should return correct range with 10 pages visible, 300 total pages and 150 selected', () => {
        const actual = pageRange(10, 150, 300);
        expect(actual).toEqual([1, '...', 147, 148, 149, 150, 151, 152, '...', 300]);
      });
      it('should throw exception if visible is less than 7', () => {
        let errorMessage;
        try {
          pageRange(6, 150, 300);
        } catch (ex) {
          errorMessage = ex.message;
        }
        expect(errorMessage).toBe('cannot create range with visible pages less than 7');
      });
      describe('with 10 pages visible, 15 total pages', () => {
        it('and page 1 selected', () => {
          const actual = pageRange(10, 1, 15);
          expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, '...', 15]);
        });
        it('and page 7 selected', () => {
          const actual = pageRange(10, 7, 15);
          expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, '...', 15]);
        });
        it('and page 8 selected', () => {
          const actual = pageRange(10, 8, 15);
          expect(actual).toEqual([1, '...', 5, 6, 7, 8, 9, 10, '...', 15]);
        });
        it('and page 9 selected', () => {
          const actual = pageRange(10, 9, 15);
          expect(actual).toEqual([1, '...', 8, 9, 10, 11, 12, 13, 14, 15]);
        });
        it('and page 15 selected', () => {
          const actual = pageRange(10, 15, 15);
          expect(actual).toEqual([1, '...', 8, 9, 10, 11, 12, 13, 14, 15]);
        });
      });
    });
  });

  describe('stateful', () => {
    describe('should change current page', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = mount(
          <Pagination
            total={10}
            defaultCurrent={3}
          />
        );
      });

      it('upon clicking on corresponding button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(2).simulate('click');
        expect(wrapper.state('current')).toBe(2);
        buttons = wrapper.find(Button);
        expect(buttons.at(2).prop('isDisabled')).toBe(true);
        expect(buttons.at(3).prop('isDisabled')).toBe(false);
      });

      it('upon clicking on Prev button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(0).simulate('click');
        expect(wrapper.state('current')).toBe(2);
        buttons = wrapper.find(Button);
        expect(buttons.at(2).prop('isDisabled')).toBe(true);
        expect(buttons.at(3).prop('isDisabled')).toBe(false);
      });

      it('upon clicking on Next button', () => {
        let buttons = wrapper.find(Button);
        buttons.at(7).simulate('click');
        expect(wrapper.state('current')).toBe(4);
        buttons = wrapper.find(Button);
        expect(buttons.at(4).prop('isDisabled')).toBe(true);
        expect(buttons.at(3).prop('isDisabled')).toBe(false);
      });
    });
  });
});
