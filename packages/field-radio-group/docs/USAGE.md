# RadioGroup

Provides a standard way to select a single option from a list.


## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

Import the component in your React app as follows:

```
import FieldRadioGroup from '@NAME@';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', isSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

ReactDOM.render(
  <FieldRadioGroup
    items={items}
    label="Pick your favourite color:"
  />,
  container);
```
