# FieldRange
> Component which renders a beautiful FieldRange and allows to subscribe to value changes. Substitute of the native input["range"] element

## Installation

```sh
npm install @NAME@
```

## Using the component

Use the component in your React app as follows:

```
import FieldRange from '@NAME@';

ReactDOM.render(
  <FieldRange value={20} min={0} max={100} onChange={(currentValue) => console.log(currentValue)} />,
container);
```
