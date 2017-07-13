import React, { PureComponent } from 'react';
import { DropdownMenuStateless as Dropdown } from '@atlaskit/dropdown-menu';

const dropdownItems = [
  { content: 'Sydney', type: 'radio' },
  { content: 'Canberra', type: 'radio' },
  { content: 'Melbourne', type: 'radio' },
  { content: 'Perth', type: 'radio' },
];

const StatelessMenuExample = class extends PureComponent {
  state = { isDropdownOpen: false, items: dropdownItems }

  render() {
    return (
      <Dropdown
        isOpen={this.state.isDropdownOpen}
        items={[{ heading: 'Cities', items: this.state.items }]}
        onOpenChange={(attrs) => {
          this.setState({ isDropdownOpen: attrs.isOpen });
        }}
        onItemActivated={(attrs) => {
          this.setState({
            items: this.state.items.map(i => (
              { ...i, isChecked: attrs.item.content === i.content }
            )),
          });
        }}
        triggerType="button"
      >
        Choose
      </Dropdown>
    );
  }
};

export default StatelessMenuExample;
