import React, { PureComponent } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import Button from '@atlaskit/button';

export default class InlineDialogExample extends PureComponent {
  state = {
    dialogOpen: true,
  }

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen })

  render() {
    return (
      <div style={{ height: '120px' }}>
        <InlineDialog
          content="The content of the dialog"
          isOpen={this.state.dialogOpen}
        >
          <Button onClick={this.toggleDialog}>Toggle Inline Dialog</Button>
        </InlineDialog>
      </div>
    );
  }
}
