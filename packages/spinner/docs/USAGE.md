# Spinner

Spinners are used for showing a system process of unknown length going on that ends with the system displaying results to the user.

![Example spinner](https://i.imgur.com/jd0JSly.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

Import the component in your React app as follows:

```
import Spinner from '@NAME@';
ReactDOM.render(<Spinner />, container);
```

The spinner will display a loading in animation and then continue spinning until the `isCompleting` prop is set on it.

If this prop is set to true the spinner will begin playing the outro animation (approximately 300ms).

You can be notified once the animation is complete by hooking into the `onComplete` callback like so.

```js
import Spinner from '@NAME@';

// some flag that we will set once our long running task is complete
let loadingFinishedFlag = false;

function loadingFinished() {
  // show our loaded content, etc
}

// this would normally be in a component or an app
ReactDOM.render(<Spinner
  isCompleting={loadingFinishedFlag}
  onComplete={loadingFinished}
/>);
```

The result is a very smooth loading in and out animation that should feel seamless to the user.
