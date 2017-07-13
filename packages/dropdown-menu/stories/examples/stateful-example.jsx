import React, { PureComponent } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'radio' },
      { content: 'Canberra', type: 'radio' },
      { content: 'Melbourne', type: 'radio' },
      { content: 'Perth', type: 'radio' },
    ],
  },
];

const StatelessMenuOverview = class extends PureComponent {
  render() {
    return (<DropdownMenu
      items={simpleDropdownItems}
      onOpenChange={(attrs) => {
        console.log(attrs);
        this.setState({ isDropdownOpen: attrs.isOpen });
      }}
      onItemActivated={(attrs) => {
        console.log(attrs.item);
        this.setState({ isDropdownOpen: false });
      }}
      appearance="default"
      triggerType="button"
      position="right middle"
    >
      Choose
    </DropdownMenu>);
  }
};

export default (
  <StatelessMenuOverview />
);
