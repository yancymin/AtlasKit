import React from 'react';
import Avatar from '@atlaskit/avatar';

export const simpleDropdownItems = [
  {
    heading: 'Heading',
    items: [
      {
        content: 'Some text',
        href: '//atlassian.com',
        target: '_blank',
      },
      {
        content: 'Some text 2',
        href: '//atlassian.com',
        target: '_blank',
        isDisabled: true,
      },
      {
        content: 'Some text 4',
        href: '//atlassian.com',
        target: '_blank',
      },
    ],
  },
];

export const dropdownItemsWithGroups = [
  {
    heading: 'The first group',
    items: [
      {
        content: 'Some text 1',
      },
      {
        content: 'Some text 2',
        isDisabled: true,
      },
    ],
  },
  {
    heading: 'Second group',
    items: [
      {
        content: 'Some text 3',
      },
      {
        content: 'Some text 4',
      },
    ],
  },
];

export const simpleDropdownItemsWithAvatars = [
  {
    heading: '',
    items: [
      {
        content: 'Some text',
        elemBefore: <Avatar size="small" />,
      },
      {
        content: 'Some text 2',
        elemBefore: <Avatar size="small" />,
      },
      {
        content: 'Some text 4',
        elemBefore: <Avatar size="small" />,
      },
    ],
  },
];

export const simpleDropdownItemsWithCheckboxes = [
  {
    heading: 'Languages ',
    items: [
      {
        content: 'Javascript',
        type: 'checkbox',
      },
      {
        content: 'Java',
        type: 'checkbox',
      },
      {
        content: 'Ruby',
        type: 'checkbox',
      },
    ],
  },
];

export const simpleDropdownItemsWithRadio = [
  {
    heading: 'Languages ',
    items: [
      {
        content: 'Javascript',
        type: 'radio',
      },
      {
        content: 'Java',
        type: 'radio',
      },
    ],
  },
  {
    heading: 'Platforms ',
    items: [
      {
        content: 'Windows',
        type: 'radio',
      },
      {
        content: 'Mac',
        type: 'radio',
      },
    ],
  },
];

export const lotsOfItems = [
  {
    heading: '',
    items: [
      {
        content: 'Some text',
      },
      {
        content: 'Some text 2',
      },
      {
        content: 'Some text 3',
      },
      {
        content: 'Some text 4',
      },
      {
        content: 'Some text 5',
      },
      {
        content: 'Some text 6',
      },
      {
        content: 'Some text 7',
      },
      {
        content: 'Some text 8',
      },
      {
        content: 'Some text 9',
      },
      {
        content: 'Some text 10',
      },
      {
        content: 'Some text 11',
      },
    ],
  },
];

export const itemsWithTooltips = [
  {
    heading: 'Heading',
    items: [
      {
        content: 'Tooltip on the right',
        tooltipDescription: 'Oh, hello there!',
        tooltipPosition: 'right',
      },
      {
        content: 'Tooltip on the left',
        tooltipDescription: 'Oh, hello there!',
        tooltipPosition: 'left',
      },
      {
        content: 'Tooltip on the top',
        tooltipDescription: 'Oh, hello there!',
        tooltipPosition: 'top',
      },
      {
        content: 'Tooltip at the bottom',
        tooltipDescription: 'Oh, hello there!',
        tooltipPosition: 'bottom',
      },
    ],
  },
];
