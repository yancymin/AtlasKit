import React from 'react';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import ModalDialog from '../src';

export default class ShowHideDemo extends React.PureComponent {
  state = {
    isOpen: false,
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <p style={{ padding: `${akGridSizeUnitless * 2}px` }}>
          <Button
            appearance="primary"
            onClick={this.toggleModal}
          >Toggle ze modal</Button>
        </p>
        <ModalDialog
          footer={
            <Button
              appearance="primary"
              onClick={this.toggleModal}
            >Close</Button>
          }
          header={
            <h3>Animation</h3>
          }
          isOpen={this.state.isOpen}
          onDialogDismissed={this.toggleModal}
        >
          <Lorem count="5" />
        </ModalDialog>
      </div>
    );
  }
}
