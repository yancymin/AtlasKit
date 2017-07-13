import React, { PureComponent } from 'react';
import { AkFieldRadioGroup } from '@atlaskit/field-radio-group';

class StatelessRadioGroupExample extends PureComponent {
  state = {
    items: [
      { name: 'animal', value: 'cat', label: 'Cat', isSelected: true },
      { name: 'animal', value: 'dog', label: 'Dog' },
      { name: 'animal', value: 'sheep', label: 'Sheep' },
    ],
  }

  updateSelectedItem = (e) => {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.value === e.target.value) item.isSelected = true;
        else item.isSelected = false;
        return item;
      }),
    });
  }

  render() {
    return (
      <AkFieldRadioGroup
        label="Stateless Radio Group"
        items={this.state.items}
        onRadioChange={this.updateSelectedItem}
      />
    );
  }
}

export default StatelessRadioGroupExample;
