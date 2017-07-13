import React, { PureComponent } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import Button from '@atlaskit/button';

export default class InlineDialogExample extends PureComponent {
  state = {
    dialogOpen: true,
    dialogPosition: 'right top',
  }

  toggleDialog = () => this.setState({ dialogOpen: !this.state.dialogOpen })

  moveDialog = () => {
    const newPosition = this.state.dialogPosition === 'right top' ?
    'left top' : 'right top';
    this.setState({ dialogPosition: newPosition });
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <InlineDialog
            content={
              <div>
                <p>This dialog will shift sides.</p>
                <p>It will cover up part of the paragraph below.</p>
              </div>
            }
            isOpen={this.state.dialogOpen}
            position={this.state.dialogPosition}
            onContentClick={e => console.log('click happened', e)}
            onContentFocus={e => console.log('focus happened', e)}
            onContentBlur={e => console.log('blur happened', e)}
            onClose={e => console.log('close happened', e)}
          >
            <Button onClick={this.moveDialog}>Toggle Dialog Location</Button>
          </InlineDialog>
        </div>
        <p>Content after the whole inline dialog, demonstrating how it wraps</p>
      </div>
    );
  }
}
