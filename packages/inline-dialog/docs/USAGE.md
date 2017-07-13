# Inline Dialog

The Inline Dialog is a container for secondary content and controls that are displayed on user request.

![Example inline dialog](https://i.imgur.com/y4YJ27Y.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

`@NAME@` is a React component that can wrap content and then toggle the display of an aligned dialog box.

Example usage:

```js
import React, { PropTypes, PureComponent } from 'react';
import AKInlineDialog from '@NAME@';

class ButtonActivatedDialog extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    position: PropTypes.string,
  }

  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleOnClose = ({ isOpen }) => {
    this.setState({ isOpen });
  }

  render() {
    return (
      <AKInlineDialog
        content={this.props.content}
        position={this.props.position}
        isOpen={this.state.isOpen}
        onClose={this.handleOnClose}
      >
        <AKButton
          onClick={this.handleClick}
          iconBefore={<BitbucketAdminIcon />}
          isSelected
        />
      </AKInlineDialog>
    );
  }
}
```

This would allow you to use the `ButtonActivatedDialog` class to render something similar to the example gif above.
