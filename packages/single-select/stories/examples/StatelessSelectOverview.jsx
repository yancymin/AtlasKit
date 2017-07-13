import React, { PureComponent } from 'react';
import { StatelessSelect } from '@atlaskit/single-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
    ],
  },
];

const StatelessSelectOverview = class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSelectOpen: false,
    };
  }

  render() {
    return (<StatelessSelect
      items={selectItems}
      isOpen={this.state.isSelectOpen}
      onOpenChange={(attrs) => {
        this.setState({ isSelectOpen: attrs.isOpen });
      }}
      onSelected={(item) => {
        this.setState({ isSelectOpen: false, selectedItem: item });
      }}
      selectedItem={this.state.selectedItem}
      placeholder="Select all!"
      label="Choose your favourite"
    />);
  }
};

export default (
  <StatelessSelectOverview />
);
