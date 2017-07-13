import React from 'react';
import sinon from 'sinon';
import {
  AkQuickSearch,
  AkQuickSearchWithKeyboardControls,
  AkNavigationItem,
  AkSearch,
  AkSearchResults,
} from '../../src';
import { mountWithRootTheme } from './_theme-util';

const noOp = () => {};

describe('Quick Search', () => {
  const QsComponent = (
    <AkQuickSearch
      onSearchChange={noOp}
      onResultClick={noOp}
    />);

  const isInputFocused = wrapper =>
    wrapper.find('input').getDOMNode() === document.activeElement;

  it('should contain a Search component', () => {
    const wrapper = mountWithRootTheme(QsComponent);
    expect(wrapper.find(AkSearch)).toHaveLength(1);
  });

  it('should contain a SearchResults component', () => {
    const wrapper = mountWithRootTheme(QsComponent);
    expect(wrapper.find(AkSearchResults)).toHaveLength(1);
  });

  describe('<QuickSearchWithKeyboardControls />', () => {
    const kbTestResults = [{
      title: 'test group',
      items: [
        { resultId: '1', type: 'person', name: 'one' },
        { resultId: '2', type: 'person', name: 'two' },
        { resultId: '3', type: 'person', name: 'three' },
      ],
    }];

    describe('Props', () => {
      const QsKbComponent = (
        <AkQuickSearchWithKeyboardControls
          onSearchChange={noOp}
          onResultClick={noOp}
        />);

      let wrapper;
      let qsWrapper;
      beforeEach(() => {
        wrapper = mountWithRootTheme(QsKbComponent);
        qsWrapper = wrapper.find(AkQuickSearch);
      });

      it('should pass `results` through as-is', () => {
        wrapper.setProps({ results: kbTestResults });
        expect(qsWrapper.prop('results')).toEqual(kbTestResults);
      });
      it('should pass `selectedItemId` through', () => {
        wrapper.setProps({ selectedItemId: '13' });
        expect(qsWrapper.prop('selectedItemId')).toBe('13');
      });
      it('should set `isResultHoverStylesDisabled` to `true` by default', () => {
        expect(qsWrapper.prop('isResultHoverStylesDisabled')).toBe(true);
      });
      it('should pass `isResultHoverStylesDisabled` through', () => {
        wrapper.setProps({ isResultHoverStylesDisabled: false });
        expect(qsWrapper.prop('isResultHoverStylesDisabled')).toBe(false);
      });
      it('should pass through or wrap onSearchBlur callback props', () => {
        const blurSpy = sinon.spy();
        wrapper.setProps({ onSearchBlur: blurSpy });
        qsWrapper.prop('onSearchBlur')();
        expect(blurSpy.callCount).toBe(1);
      });
      it('should pass through or wrap onSearchKeyDown callback props', () => {
        const keyDownSpy = sinon.spy();
        wrapper.setProps({ onSearchKeyDown: keyDownSpy });
        qsWrapper.prop('onSearchKeyDown')({ key: null });
        expect(keyDownSpy.callCount).toBe(1);
      });
      it('should pass through or wrap onResultMouseEnter callback props', () => {
        const mouseEnterSpy = sinon.spy();
        wrapper.setProps({ onResultMouseEnter: mouseEnterSpy });
        qsWrapper.prop('onResultMouseEnter')();
        expect(mouseEnterSpy.callCount).toBe(1);
      });
      it('should pass through or wrap onResultMouseLeave callback props', () => {
        const mouseLeaveSpy = sinon.spy();
        wrapper.setProps({ onResultMouseLeave: mouseLeaveSpy });
        qsWrapper.prop('onResultMouseLeave')();
        expect(mouseLeaveSpy.callCount).toBe(1);
      });
    });

    describe('Interactions', () => {
      const onClickSpy = sinon.spy();
      const QsInteractionComponent = (
        <AkQuickSearchWithKeyboardControls
          onSearchChange={noOp}
          onResultClick={onClickSpy}
          results={kbTestResults}
        />);
      let wrapper;
      let searchInput;

      beforeEach(() => {
        wrapper = mountWithRootTheme(QsInteractionComponent);
        searchInput = wrapper.find(AkSearch).find('input');
      });

      afterEach(() => {
        onClickSpy.reset();
      });

      it('should select the first result by default', () => {
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should select the next result on DOWN keystroke', () => {
        wrapper.find(AkSearch).find('input').simulate('keydown', { key: 'ArrowDown' });
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('two');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should select the previous result on UP keystroke', () => {
        searchInput.simulate('keydown', { key: 'ArrowDown' });
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should wrap around to the top when traversing forward past the last result', () => {
        searchInput.simulate('keydown', { key: 'ArrowDown' });
        searchInput.simulate('keydown', { key: 'ArrowDown' });
        searchInput.simulate('keydown', { key: 'ArrowDown' });
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should wrap around to the end when traversing backward past the first result', () => {
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should trigger the onClick handler with the same parameters when a result is submitted via keyboards as when clicked', () => {
        searchInput.simulate('keydown', { key: 'Enter' });
        const paramsKeyboard = onClickSpy.args;
        onClickSpy.reset();
        wrapper.find(AkNavigationItem).at(0).find('button').simulate('click');
        expect(onClickSpy.args).toEqual(paramsKeyboard);
      });
      it('should run the onClick callback with the result\'s data on ENTER keystroke', () => {
        searchInput.simulate('keydown', { key: 'Enter' });
        expect(onClickSpy.callCount).toBe(1);
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should select the first result when query changes', () => {
        const newResults = [{
          title: 'test group',
          items: [
            { resultId: '1', type: 'person', name: 'four' },
            { resultId: '2', type: 'person', name: 'five' },
          ],
        }];
        wrapper.setProps({ results: newResults });
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('four');
        expect(isInputFocused(searchInput)).toBe(true);
      });
      it('should let mouseEnter override keyboard selection', () => {
        // First result is selected by default as established by previous test.
        // Mouse over the third result.
        wrapper.find(AkNavigationItem).at(2).find('InteractiveWrapper').simulate('mouseenter');
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
      });
      it('should clear selection onMouseLeave', () => {
        wrapper.find(AkNavigationItem).at(2).find('InteractiveWrapper').simulate('mouseleave');
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
      });
      it('should remove selection on search input blur', () => {
        searchInput.simulate('blur');
        expect(wrapper.find(AkNavigationItem)).toHaveLength(kbTestResults[0].items.length);
        expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
      });
    });
  });
});
