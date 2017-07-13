import React from 'react';
import { AkNavigationItemGroup, AkSearchResults } from '../../src';
import { PersonResult, RoomResult } from '../../src/components/js/results';
import { mountWithRootTheme } from './_theme-util';

const testData = [
  {
    title: 'Obi Wan\'s Conversations',
    items: [
      {
        resultId: '1',
        type: 'person',
        presenceMessage: 'On-call',
        presenceState: 'offline',
        name: 'Qui-Gon Jinn',
        mentionName: 'MasterQ',
      },
      {
        resultId: '2',
        type: 'person',
        name: 'Luke Skywalker',
        mentionName: 'lskywalker',
        presenceState: 'online',
      },
      {
        resultId: '3',
        type: 'room',
        name: 'Jedi Council [archived]',
        privacy: 'private',
      },
      {
        resultId: '4',
        type: 'room',
        name: 'Jawa Movie Night',
      },
    ],
  },
];

const testDataTwoGroups = [
  {
    title: 'Group A',
    items: [
      {
        resultId: '1',
        type: 'person',
        name: 'Qui-Gon Jinn',
      },
      {
        resultId: '2',
        type: 'person',
        name: 'Luke Skywalker',
      },
    ],
  },
  {
    title: 'Group B',
    items: [
      {
        resultId: '3',
        type: 'room',
        name: 'Room A',
      },
      {
        resultId: '4',
        type: 'room',
        name: 'Room B',
      },
    ],
  },
  {
    title: 'Group C',
    items: [],
  },
  {
    title: 'Group D',
  },
];

describe('Search Results', () => {
  let searchResultsWrapper;
  beforeEach(() => {
    searchResultsWrapper = mountWithRootTheme(
      <AkSearchResults onChange={() => {}} />
    );
  });

  it('should render a result group\'s title and items', () => {
    searchResultsWrapper.setProps({ results: testData });
    expect(searchResultsWrapper.find(PersonResult)).toHaveLength(2);
    expect(searchResultsWrapper.find(RoomResult)).toHaveLength(2);
    expect(searchResultsWrapper.text()).toEqual(expect.stringContaining('Obi Wan\'s Conversations'));
  });

  it('should render each group separately', () => {
    searchResultsWrapper.setProps({ results: testDataTwoGroups });
    expect(searchResultsWrapper
      .find(AkNavigationItemGroup)).toHaveLength(2);
  });

  it('should not render groups with no items', () => {
    searchResultsWrapper.setProps({ results: testDataTwoGroups });
    expect(searchResultsWrapper.text()).toEqual(expect.stringContaining('Group A'));
    expect(searchResultsWrapper.text()).toEqual(expect.stringContaining('Group B'));
    expect(searchResultsWrapper.text()).not.toEqual(expect.stringContaining('Group C'));
    expect(searchResultsWrapper.text()).not.toEqual(expect.stringContaining('Group D'));
  });
});
